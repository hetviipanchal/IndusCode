export type BusinessType = 'manufacturer' | 'wholesaler' | 'distributor' | 'retailer';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';
export type ProductStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'archived';
export type StockStatus = 'in_stock' | 'limited_stock' | 'out_of_stock' | 'contact_supplier';
export type ListingStatus = 'pending' | 'approved' | 'rejected' | 'paused' | 'archived';
export type UserRole = 'user' | 'supplier' | 'admin';
export type AccountType = 'buyer' | 'supplier' | 'admin';

export interface Product {
  id: string;
  indusCode: string; // e.g. IDC-FST-000001
  canonicalName: string;
  description: string;
  categoryId: string;
  subcategoryId?: string;
  specifications: Record<string, string | number | boolean>;
  primaryImageUrl?: string;
  additionalImages?: string[];
  manufacturerName?: string;
  manufacturerPartNumber?: string;
  externalIdentifiers?: string[];
  standards?: string[]; // e.g. IS 1363, ISO 4014, DIN 931
  variantOf?: string;
  status: ProductStatus;
  createdBy?: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductAlias {
  id: string;
  productId: string;
  alias: string;
  language?: string;
  region?: string;
  aliasType: 'local_name' | 'trade_name' | 'synonym' | 'abbreviation';
  submittedBy?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  codePrefix: string; // 3 capital letters, e.g. FST, PIP, BRG
  description: string;
  parentCategoryId?: string;
  iconName?: string;
  specificationSchema?: {
    requiredFields: string[];
    allowedUnits: Record<string, string[]>;
  };
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  ownerUserId: string;
  businessName: string;
  businessType: BusinessType;
  description: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district?: string;
  state: string;
  pinCode: string;
  serviceAreas?: string[];
  logoUrl?: string;
  websiteUrl?: string;
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
  gstNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierListing {
  id: string;
  supplierId: string;
  productId: string;
  variantId?: string;
  sellerProductName?: string;
  sellerPartNumber?: string;
  price?: number;
  currency: string; // default "INR"
  unitOfSale: string; // "piece", "box", "kg", "metre", "pack"
  minimumOrderQuantity: number;
  stockStatus: StockStatus;
  stockQuantity?: number;
  packagingDetails?: string;
  listingStatus: ListingStatus;
  lastStockUpdatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  accountType: AccountType;
  supplierId?: string;
  role: UserRole;
  accountStatus: 'active' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface ProductRequest {
  id: string;
  requestedBy: string;
  requesterEmail?: string;
  proposedName: string;
  description: string;
  categoryId: string;
  proposedSpecifications: Record<string, any>;
  manufacturerPartNumber?: string;
  imageUrls?: string[];
  possibleMatches?: {
    indusCode: string;
    canonicalName: string;
    similarityScore: number;
  }[];
  reviewStatus: 'pending' | 'approved' | 'rejected';
  reviewNotes?: string;
  reviewedBy?: string;
  allocatedIndusCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  reportType: 'incorrect_specs' | 'duplicate_record' | 'suspicious_supplier' | 'misleading_listing';
  targetType: 'product' | 'supplier' | 'listing';
  targetId: string;
  targetName: string;
  reporterId?: string;
  reporterEmail: string;
  explanation: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorEmail: string;
  action: string;
  targetEntity: string;
  targetId: string;
  details?: Record<string, any>;
  timestamp: string;
}
