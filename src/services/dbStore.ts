import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import {
  Category,
  Product,
  ProductAlias,
  Supplier,
  SupplierListing,
  ProductRequest,
  Report,
  AuditLog,
} from '../types';
import {
  SEED_CATEGORIES,
  SEED_PRODUCTS,
  SEED_ALIASES,
  SEED_SUPPLIERS,
  SEED_LISTINGS,
} from '../data/seedHardwareData';
import { formatIndusCode } from '../utils/codeGeneratorLogic';
import { evaluateDuplicateCandidate } from '../utils/matchingLogic';

// Local reactive storage state for instant hydration and offline resilience
class HardwareDbStore {
  private categories: Map<string, Category> = new Map();
  private products: Map<string, Product> = new Map();
  private aliases: Map<string, ProductAlias> = new Map();
  private suppliers: Map<string, Supplier> = new Map();
  private listings: Map<string, SupplierListing> = new Map();
  private requests: Map<string, ProductRequest> = new Map();
  private reports: Map<string, Report> = new Map();
  private auditLogs: AuditLog[] = [];
  private isInitialized = false;

  constructor() {
    this.hydrateFromSeed();
  }

  private hydrateFromSeed() {
    SEED_CATEGORIES.forEach(c => this.categories.set(c.id, c));
    SEED_PRODUCTS.forEach(p => this.products.set(p.id, p));
    SEED_ALIASES.forEach(a => this.aliases.set(a.id, a));
    SEED_SUPPLIERS.forEach(s => this.suppliers.set(s.id, s));
    SEED_LISTINGS.forEach(l => this.listings.set(l.id, l));
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    try {
      // Check if products exist in Firestore
      const snap = await getDocs(collection(db, 'products'));
      if (snap.empty) {
        // Sync seed data to Firestore so real queries work seamlessly
        console.log('Indus Code: Syncing seed database to Cloud Firestore...');
        await this.syncSeedToFirestore();
      } else {
        // Load from Firestore
        snap.forEach(d => {
          this.products.set(d.id, { id: d.id, ...d.data() } as Product);
        });

        // Load categories
        const catSnap = await getDocs(collection(db, 'categories'));
        catSnap.forEach(d => {
          this.categories.set(d.id, { id: d.id, ...d.data() } as Category);
        });

        // Load suppliers
        const supSnap = await getDocs(collection(db, 'suppliers'));
        supSnap.forEach(d => {
          this.suppliers.set(d.id, { id: d.id, ...d.data() } as Supplier);
        });

        // Load listings
        const listSnap = await getDocs(collection(db, 'supplierListings'));
        listSnap.forEach(d => {
          this.listings.set(d.id, { id: d.id, ...d.data() } as SupplierListing);
        });

        // Load aliases
        const aliasSnap = await getDocs(collection(db, 'productAliases'));
        aliasSnap.forEach(d => {
          this.aliases.set(d.id, { id: d.id, ...d.data() } as ProductAlias);
        });
      }
    } catch (err) {
      console.warn('Firestore initial sync encountered an issue, running with local seed cache:', err);
    } finally {
      this.isInitialized = true;
    }
  }

  private async syncSeedToFirestore() {
    try {
      for (const cat of SEED_CATEGORIES) {
        await setDoc(doc(db, 'categories', cat.id), cat);
      }
      for (const prod of SEED_PRODUCTS) {
        await setDoc(doc(db, 'products', prod.id), prod);
      }
      for (const sup of SEED_SUPPLIERS) {
        await setDoc(doc(db, 'suppliers', sup.id), sup);
      }
      for (const list of SEED_LISTINGS) {
        await setDoc(doc(db, 'supplierListings', list.id), list);
      }
      for (const alias of SEED_ALIASES) {
        await setDoc(doc(db, 'productAliases', alias.id), alias);
      }
      // Initialize sequence counter
      await setDoc(doc(db, 'counters', 'products'), { currentSeq: 10, updatedAt: new Date().toISOString() });
    } catch (err) {
      console.warn('Could not write seed to Firestore (may be offline or awaiting rules):', err);
    }
  }

  // --- Products ---
  public async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.status === 'approved');
  }

  public async getAllProductsAdmin(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  public async getProductById(id: string): Promise<Product | null> {
    return this.products.get(id) || null;
  }

  public async getProductByIndusCode(code: string): Promise<Product | null> {
    const clean = code.trim().toUpperCase();
    for (const prod of this.products.values()) {
      if (prod.indusCode === clean) return prod;
    }
    return null;
  }

  public async searchProducts(params: {
    query?: string;
    categoryId?: string;
    material?: string;
    grade?: string;
    state?: string;
    city?: string;
    pinCode?: string;
  }): Promise<{ product: Product; matchingListingsCount: number; minPrice?: number; maxPrice?: number }[]> {
    const all = Array.from(this.products.values()).filter(p => p.status === 'approved');
    const q = (params.query || '').trim().toLowerCase();

    // Exact code match check first
    if (q && q.startsWith('idc-')) {
      const match = all.filter(p => p.indusCode.toLowerCase().includes(q));
      return this.enrichSearchResults(match, params.state, params.city);
    }

    const filtered = all.filter(prod => {
      // Category filter
      if (params.categoryId && prod.categoryId !== params.categoryId) {
        return false;
      }

      // Material filter
      if (params.material) {
        const mat = String(prod.specifications?.material || '').toLowerCase();
        if (!mat.includes(params.material.toLowerCase())) return false;
      }

      // Grade filter
      if (params.grade) {
        const grd = String(prod.specifications?.grade || '').toLowerCase();
        if (!grd.includes(params.grade.toLowerCase())) return false;
      }

      // Text query match (canonicalName, description, MPN, aliases, standards)
      if (q) {
        const inName = prod.canonicalName.toLowerCase().includes(q);
        const inCode = prod.indusCode.toLowerCase().includes(q);
        const inDesc = (prod.description || '').toLowerCase().includes(q);
        const inMpn = (prod.manufacturerPartNumber || '').toLowerCase().includes(q);
        const inStandards = (prod.standards || []).some(s => s.toLowerCase().includes(q));

        // Check aliases
        const aliases = Array.from(this.aliases.values())
          .filter(a => a.productId === prod.id && a.status === 'approved')
          .map(a => a.alias.toLowerCase());
        const inAliases = aliases.some(a => a.includes(q));

        if (!inName && !inCode && !inDesc && !inMpn && !inStandards && !inAliases) {
          return false;
        }
      }

      return true;
    });

    return this.enrichSearchResults(filtered, params.state, params.city);
  }

  private enrichSearchResults(products: Product[], stateFilter?: string, cityFilter?: string) {
    return products.map(product => {
      // Find listings for this product
      let matchingListings = Array.from(this.listings.values()).filter(
        l => l.productId === product.id && l.listingStatus === 'approved'
      );

      // Location filtering if supplier state or city specified
      if (stateFilter || cityFilter) {
        matchingListings = matchingListings.filter(listing => {
          const sup = this.suppliers.get(listing.supplierId);
          if (!sup) return false;
          if (stateFilter && sup.state.toLowerCase() !== stateFilter.toLowerCase()) return false;
          if (cityFilter && sup.city.toLowerCase() !== cityFilter.toLowerCase()) return false;
          return true;
        });
      }

      const prices = matchingListings
        .map(l => l.price)
        .filter((p): p is number => typeof p === 'number' && p > 0);

      const minPrice = prices.length ? Math.min(...prices) : undefined;
      const maxPrice = prices.length ? Math.max(...prices) : undefined;

      return {
        product,
        matchingListingsCount: matchingListings.length,
        minPrice,
        maxPrice,
      };
    });
  }

  // --- Duplicate Detection ---
  public checkDuplicates(proposed: {
    name: string;
    categoryId: string;
    specifications?: Record<string, any>;
    mpn?: string;
  }) {
    const results = [];
    for (const existing of this.products.values()) {
      const aliases = Array.from(this.aliases.values())
        .filter(a => a.productId === existing.id)
        .map(a => a.alias);

      const match = evaluateDuplicateCandidate(proposed, {
        id: existing.id,
        indusCode: existing.indusCode,
        canonicalName: existing.canonicalName,
        categoryId: existing.categoryId,
        specifications: existing.specifications,
        manufacturerPartNumber: existing.manufacturerPartNumber,
        aliases,
      });

      if (match.score >= 35) {
        results.push(match);
      }
    }
    return results.sort((a, b) => b.score - a.score);
  }

  // --- Transactional Permanent Indus Code Generation ---
  public async allocateNextIndusCode(categoryPrefix: string): Promise<string> {
    try {
      const counterRef = doc(db, 'counters', 'products');
      let allocatedSeq = 1;

      await runTransaction(db, async transaction => {
        const counterDoc = await transaction.get(counterRef);
        if (!counterDoc.exists()) {
          allocatedSeq = 1;
          transaction.set(counterRef, { currentSeq: 1, updatedAt: new Date().toISOString() });
        } else {
          const current = counterDoc.data().currentSeq || 0;
          allocatedSeq = current + 1;
          transaction.update(counterRef, { currentSeq: allocatedSeq, updatedAt: new Date().toISOString() });
        }
      });

      return formatIndusCode(categoryPrefix, allocatedSeq);
    } catch (err) {
      console.warn('Firestore transaction fallback for sequence allocation:', err);
      // High-water mark calculation across all existing products
      let maxSeq = 10;
      for (const prod of this.products.values()) {
        const parts = prod.indusCode.split('-');
        if (parts.length === 3) {
          const num = parseInt(parts[2], 10);
          if (!isNaN(num) && num > maxSeq) maxSeq = num;
        }
      }
      return formatIndusCode(categoryPrefix, maxSeq + 1);
    }
  }

  // --- Product Requests & Admin Approval ---
  public async createProductRequest(req: Omit<ProductRequest, 'id' | 'createdAt' | 'updatedAt' | 'reviewStatus'>): Promise<ProductRequest> {
    const id = `req-${Date.now()}`;
    const newReq: ProductRequest = {
      ...req,
      id,
      reviewStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.requests.set(id, newReq);

    try {
      await setDoc(doc(db, 'productRequests', id), newReq);
    } catch (err) {
      console.warn('Failed saving request to Firestore, saved locally:', err);
    }
    return newReq;
  }

  public async getProductRequests(): Promise<ProductRequest[]> {
    return Array.from(this.requests.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  public async approveProductRequest(requestId: string, adminUser: { uid: string; email: string }, notes?: string): Promise<Product> {
    const req = this.requests.get(requestId);
    if (!req) throw new Error('Product request not found');

    const cat = this.categories.get(req.categoryId);
    const prefix = cat ? cat.codePrefix : 'GEN';

    // Concurrency safe transactional allocation
    const allocatedCode = await this.allocateNextIndusCode(prefix);

    const productId = `prod-${Date.now()}`;
    const newProduct: Product = {
      id: productId,
      indusCode: allocatedCode,
      canonicalName: req.proposedName,
      description: req.description,
      categoryId: req.categoryId,
      specifications: req.proposedSpecifications || {},
      primaryImageUrl: req.imageUrls?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      manufacturerPartNumber: req.manufacturerPartNumber,
      status: 'approved',
      createdBy: req.requestedBy,
      approvedBy: adminUser.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.products.set(productId, newProduct);
    req.reviewStatus = 'approved';
    req.allocatedIndusCode = allocatedCode;
    req.reviewedBy = adminUser.uid;
    req.reviewNotes = notes || 'Approved and assigned canonical Indus Code';
    req.updatedAt = new Date().toISOString();

    try {
      await setDoc(doc(db, 'products', productId), newProduct);
      await updateDoc(doc(db, 'productRequests', requestId), {
        reviewStatus: 'approved',
        allocatedIndusCode: allocatedCode,
        reviewedBy: adminUser.uid,
        reviewNotes: req.reviewNotes,
        updatedAt: req.updatedAt,
      });
      await this.logAudit({
        actorId: adminUser.uid,
        actorEmail: adminUser.email,
        action: 'APPROVE_PRODUCT_REQUEST',
        targetEntity: 'Product',
        targetId: productId,
        details: { indusCode: allocatedCode, name: req.proposedName },
      });
    } catch (err) {
      console.warn('Firestore update for approval:', err);
    }

    return newProduct;
  }

  public async rejectProductRequest(requestId: string, adminUser: { uid: string; email: string }, notes: string): Promise<void> {
    const req = this.requests.get(requestId);
    if (!req) throw new Error('Product request not found');
    req.reviewStatus = 'rejected';
    req.reviewedBy = adminUser.uid;
    req.reviewNotes = notes;
    req.updatedAt = new Date().toISOString();

    try {
      await updateDoc(doc(db, 'productRequests', requestId), {
        reviewStatus: 'rejected',
        reviewedBy: adminUser.uid,
        reviewNotes: notes,
        updatedAt: req.updatedAt,
      });
      await this.logAudit({
        actorId: adminUser.uid,
        actorEmail: adminUser.email,
        action: 'REJECT_PRODUCT_REQUEST',
        targetEntity: 'ProductRequest',
        targetId: requestId,
        details: { reason: notes },
      });
    } catch (err) {
      console.warn('Firestore update for rejection:', err);
    }
  }

  // --- Suppliers ---
  public async getSuppliers(): Promise<Supplier[]> {
    return Array.from(this.suppliers.values());
  }

  public async getSupplierById(id: string): Promise<Supplier | null> {
    return this.suppliers.get(id) || null;
  }

  public async getSupplierByUserId(uid: string): Promise<Supplier | null> {
    for (const sup of this.suppliers.values()) {
      if (sup.ownerUserId === uid) return sup;
    }
    return null;
  }

  public async registerSupplier(data: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt' | 'verificationStatus'>): Promise<Supplier> {
    const id = `sup-${Date.now()}`;
    const newSup: Supplier = {
      ...data,
      id,
      verificationStatus: 'pending', // Pending admin verification
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.suppliers.set(id, newSup);

    try {
      await setDoc(doc(db, 'suppliers', id), newSup);
      await this.logAudit({
        actorId: data.ownerUserId,
        actorEmail: data.email,
        action: 'REGISTER_SUPPLIER',
        targetEntity: 'Supplier',
        targetId: id,
        details: { businessName: data.businessName, city: data.city },
      });
    } catch (err) {
      console.warn('Firestore registration error:', err);
    }
    return newSup;
  }

  public async verifySupplier(supplierId: string, status: 'verified' | 'rejected', adminUser: { uid: string; email: string }, notes?: string): Promise<void> {
    const sup = this.suppliers.get(supplierId);
    if (!sup) throw new Error('Supplier not found');
    sup.verificationStatus = status;
    sup.verificationNotes = notes;
    sup.updatedAt = new Date().toISOString();

    try {
      await updateDoc(doc(db, 'suppliers', supplierId), {
        verificationStatus: status,
        verificationNotes: notes || '',
        updatedAt: sup.updatedAt,
      });
      await this.logAudit({
        actorId: adminUser.uid,
        actorEmail: adminUser.email,
        action: 'VERIFY_SUPPLIER',
        targetEntity: 'Supplier',
        targetId: supplierId,
        details: { status, notes },
      });
    } catch (err) {
      console.warn('Firestore verify supplier error:', err);
    }
  }

  // --- Supplier Listings ---
  public async getListingsForProduct(productId: string): Promise<{ listing: SupplierListing; supplier: Supplier }[]> {
    const results = [];
    for (const listing of this.listings.values()) {
      if (listing.productId === productId && listing.listingStatus === 'approved') {
        const sup = this.suppliers.get(listing.supplierId);
        if (sup) {
          results.push({ listing, supplier: sup });
        }
      }
    }
    return results;
  }

  public async getListingsForSupplier(supplierId: string): Promise<{ listing: SupplierListing; product: Product }[]> {
    const results = [];
    for (const listing of this.listings.values()) {
      if (listing.supplierId === supplierId) {
        const prod = this.products.get(listing.productId);
        if (prod) {
          results.push({ listing, product: prod });
        }
      }
    }
    return results;
  }

  public async createListing(listingData: Omit<SupplierListing, 'id' | 'createdAt' | 'updatedAt' | 'listingStatus'>): Promise<SupplierListing> {
    const id = `list-${Date.now()}`;
    const newListing: SupplierListing = {
      ...listingData,
      id,
      listingStatus: 'approved',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.listings.set(id, newListing);

    try {
      await setDoc(doc(db, 'supplierListings', id), newListing);
    } catch (err) {
      console.warn('Firestore listing write error:', err);
    }
    return newListing;
  }

  public async updateListing(id: string, updates: Partial<SupplierListing>): Promise<SupplierListing> {
    const existing = this.listings.get(id);
    if (!existing) throw new Error('Listing not found');

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.listings.set(id, updated);

    try {
      await updateDoc(doc(db, 'supplierListings', id), {
        ...updates,
        updatedAt: updated.updatedAt,
      });
    } catch (err) {
      console.warn('Firestore update listing error:', err);
    }
    return updated;
  }

  public async deleteListing(id: string): Promise<void> {
    this.listings.delete(id);
    try {
      await deleteDoc(doc(db, 'supplierListings', id));
    } catch (err) {
      console.warn('Firestore delete listing error:', err);
    }
  }

  // --- Categories ---
  public async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).filter(c => c.active);
  }

  // --- Reports ---
  public async submitReport(report: Omit<Report, 'id' | 'createdAt' | 'status'>): Promise<Report> {
    const id = `rep-${Date.now()}`;
    const newReport: Report = {
      ...report,
      id,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    this.reports.set(id, newReport);

    try {
      await setDoc(doc(db, 'reports', id), newReport);
    } catch (err) {
      console.warn('Firestore submit report error:', err);
    }
    return newReport;
  }

  public async getReports(): Promise<Report[]> {
    return Array.from(this.reports.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  public async updateReportStatus(id: string, status: Report['status'], adminEmail: string): Promise<void> {
    const rep = this.reports.get(id);
    if (!rep) return;
    rep.status = status;
    try {
      await updateDoc(doc(db, 'reports', id), { status });
      await this.logAudit({
        actorId: 'admin',
        actorEmail: adminEmail,
        action: 'UPDATE_REPORT_STATUS',
        targetEntity: 'Report',
        targetId: id,
        details: { status },
      });
    } catch (err) {
      console.warn('Firestore update report status error:', err);
    }
  }

  // --- Audit Logs ---
  public async logAudit(entry: Omit<AuditLog, 'id' | 'timestamp'>): Promise<void> {
    const id = `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const log: AuditLog = {
      ...entry,
      id,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(log);

    try {
      await setDoc(doc(db, 'auditLogs', id), log);
    } catch (err) {
      // Expected if non-admin or offline
    }
  }

  public async getAuditLogs(): Promise<AuditLog[]> {
    return this.auditLogs;
  }
}

export const dbStore = new HardwareDbStore();
