import React, { useState, useEffect } from 'react';
import {
  Shield,
  Layers,
  Building2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Download,
  FileText,
  Clock,
  History,
  Check,
  X,
  Search,
  Filter,
} from 'lucide-react';
import { ProductRequest, Supplier, Report, AuditLog, Product } from '../types';
import { dbStore } from '../services/dbStore';
import { useAuth } from '../context/AuthContext';
import { IndusCodeBadge } from '../components/common/IndusCodeBadge';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { exportCatalogToCsv } from '../utils/exportCsv';

export const AdminDashboardPage: React.FC = () => {
  const { userProfile, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'requests' | 'suppliers' | 'reports' | 'audit'>('requests');

  const [requests, setRequests] = useState<ProductRequest[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Approval state
  const [approvalNotes, setApprovalNotes] = useState('');
  const [selectedRequestForReview, setSelectedRequestForReview] = useState<ProductRequest | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const loadAdminData = async () => {
    setLoading(true);
    await dbStore.initialize();
    const [reqs, sups, reps, logs, prods] = await Promise.all([
      dbStore.getProductRequests(),
      dbStore.getSuppliers(),
      dbStore.getReports(),
      dbStore.getAuditLogs(),
      dbStore.getAllProductsAdmin(),
    ]);
    setRequests(reqs);
    setSuppliers(sups);
    setReports(reps);
    setAuditLogs(logs);
    setProducts(prods);
    setLoading(false);
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleApproveRequest = async (req: ProductRequest) => {
    setProcessingId(req.id);
    try {
      await dbStore.approveProductRequest(
        req.id,
        {
          uid: userProfile?.uid || 'admin_hetvii',
          email: userProfile?.email || 'hetviipanchal11@gmail.com',
        },
        approvalNotes || 'Specifications reviewed and approved under Indus Code registry.'
      );
      setSelectedRequestForReview(null);
      setApprovalNotes('');
      await loadAdminData();
    } catch (err) {
      console.error('Approval failed:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectRequest = async (req: ProductRequest) => {
    setProcessingId(req.id);
    try {
      await dbStore.rejectProductRequest(
        req.id,
        {
          uid: userProfile?.uid || 'admin_hetvii',
          email: userProfile?.email || 'hetviipanchal11@gmail.com',
        },
        approvalNotes || 'Duplicate of existing canonical product or insufficient technical specification.'
      );
      setSelectedRequestForReview(null);
      setApprovalNotes('');
      await loadAdminData();
    } catch (err) {
      console.error('Rejection failed:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleVerifySupplier = async (supplierId: string, status: 'verified' | 'rejected') => {
    try {
      await dbStore.verifySupplier(
        supplierId,
        status,
        {
          uid: userProfile?.uid || 'admin_hetvii',
          email: userProfile?.email || 'hetviipanchal11@gmail.com',
        },
        status === 'verified' ? 'Business credentials and GST verified.' : 'Verification rejected.'
      );
      await loadAdminData();
    } catch (err) {
      console.error('Supplier verification error:', err);
    }
  };

  const handleExportCsv = () => {
    exportCatalogToCsv(products, 'indus_code_canonical_catalog.csv');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header - Workshop Governance Console */}
      <div className="bg-wood-panel rounded-2xl text-[#fff4e0] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-2 border-[#54290e] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#180c05] text-amber-400 border border-[#522910] flex items-center justify-center font-bold shadow-inner">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#fff4e0]">
              Platform Administration &amp; Registry Governance
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#d4b99f]">
            Authorized Administrator: <strong className="font-mono text-amber-400">{userProfile?.email}</strong>
          </p>
          <p className="text-xs text-[#a47a55]">
            Enforcing specification fidelity, transactional code generation, and supplier authenticity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleExportCsv}
            className="brass-plate inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl transition-all hover:brightness-110 shadow-md active:scale-95"
          >
            <Download className="w-4 h-4 text-[#1a0f00]" />
            <span>Export Catalog (CSV)</span>
          </button>
        </div>
      </div>

      {/* Carved Wooden Tabs */}
      <div className="flex border-b-2 border-[#43230e] gap-2 overflow-x-auto text-xs font-bold pb-0.5">
        <button
          onClick={() => setActiveTab('requests')}
          className={`py-3 px-5 flex items-center gap-2 transition-all rounded-t-xl ${
            activeTab === 'requests'
              ? 'bg-[#4a240d] text-[#ffe1aa] border-t-2 border-x-2 border-amber-500/60 shadow-md'
              : 'text-[#dec2a2] hover:text-white hover:bg-[#2c1509]'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>Product Requests ({requests.filter(r => r.reviewStatus === 'pending').length} Pending)</span>
        </button>

        <button
          onClick={() => setActiveTab('suppliers')}
          className={`py-3 px-5 flex items-center gap-2 transition-all rounded-t-xl ${
            activeTab === 'suppliers'
              ? 'bg-[#4a240d] text-[#ffe1aa] border-t-2 border-x-2 border-amber-500/60 shadow-md'
              : 'text-[#dec2a2] hover:text-white hover:bg-[#2c1509]'
          }`}
        >
          <Building2 className="w-4 h-4 text-amber-400" />
          <span>Supplier Verifications ({suppliers.filter(s => s.verificationStatus === 'pending').length} Pending)</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`py-3 px-5 flex items-center gap-2 transition-all rounded-t-xl ${
            activeTab === 'reports'
              ? 'bg-[#4a240d] text-[#ffe1aa] border-t-2 border-x-2 border-amber-500/60 shadow-md'
              : 'text-[#dec2a2] hover:text-white hover:bg-[#2c1509]'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Discrepancy Reports ({reports.filter(r => r.status === 'open').length} Open)</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`py-3 px-5 flex items-center gap-2 transition-all rounded-t-xl ${
            activeTab === 'audit'
              ? 'bg-[#4a240d] text-[#ffe1aa] border-t-2 border-x-2 border-amber-500/60 shadow-md'
              : 'text-[#dec2a2] hover:text-white hover:bg-[#2c1509]'
          }`}
        >
          <History className="w-4 h-4 text-amber-400" />
          <span>Audit Log ({auditLogs.length})</span>
        </button>
      </div>

      {/* Content based on Active Tab */}
      {loading ? (
        <div className="text-center py-16 text-[#c8a88a] text-sm animate-pulse">
          Loading governance records from secure master ledger...
        </div>
      ) : activeTab === 'requests' ? (
        /* Requests Section */
        <div className="bg-wood-panel rounded-2xl border-2 border-[#54290e] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#43230e]">
            <div>
              <h3 className="font-extrabold text-lg text-[#fff4e0]">
                Pending Product Identity Requests
              </h3>
              <p className="text-xs text-[#c8a88a] mt-0.5">
                Review proposed technical parameters. Approving will automatically invoke a transactionally unique Indus Code.
              </p>
            </div>
          </div>

          {requests.length === 0 ? (
            <p className="text-xs text-[#a47a55] py-8 text-center italic">
              No product requests submitted yet.
            </p>
          ) : (
            <div className="space-y-4">
              {requests.map(req => (
                <div
                  key={req.id}
                  className="p-5 rounded-xl border border-[#4d2810] bg-[#1c0d05] space-y-3 shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#fff4e0]">
                        {req.proposedName}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#2a1408] text-amber-400 border border-[#522910]">
                        {req.categoryId}
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                      req.reviewStatus === 'pending'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-600/50'
                        : req.reviewStatus === 'approved'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/50'
                        : 'bg-red-950/80 text-red-300 border border-red-600/50'
                    }`}>
                      {req.reviewStatus}
                    </span>
                  </div>

                  <p className="text-xs text-[#d4b99f]">
                    {req.description}
                  </p>

                  {/* Specifications */}
                  <div className="flex flex-wrap gap-1.5 text-[11px] text-[#dec2a2]">
                    {Object.entries(req.proposedSpecifications || {}).map(([k, v]) => (
                      <span key={k} className="bg-[#150a04] px-2.5 py-1 rounded border border-[#3d1f0d]">
                        <strong className="text-[#ffd899]">{k}:</strong> {String(v)}
                      </span>
                    ))}
                  </div>

                  {/* Duplicate candidates */}
                  {req.possibleMatches && req.possibleMatches.length > 0 && (
                    <div className="p-3.5 bg-[#2c160a] border border-amber-600/40 rounded-xl text-xs text-[#ffd899] space-y-1.5">
                      <div className="font-bold flex items-center gap-1.5 text-white">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Algorithm Matched Similar Existing Products:</span>
                      </div>
                      {req.possibleMatches.map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px] text-[#e8d5be]">
                          <span>
                            {m.canonicalName} (<strong className="font-mono text-amber-300">{m.indusCode}</strong>)
                          </span>
                          <span className="font-bold text-amber-400">{m.similarityScore}% match</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {req.allocatedIndusCode && (
                    <div className="pt-2 flex items-center gap-2 text-xs">
                      <span className="text-[#a47a55] font-semibold">Allocated Code:</span>
                      <IndusCodeBadge code={req.allocatedIndusCode} size="sm" />
                    </div>
                  )}

                  {/* Actions */}
                  {req.reviewStatus === 'pending' && (
                    <div className="pt-3 border-t border-[#3d1e0c] flex flex-wrap items-center justify-between gap-3">
                      <input
                        type="text"
                        value={approvalNotes}
                        onChange={e => setApprovalNotes(e.target.value)}
                        placeholder="Admin notes (e.g. Approved per IS 1364 specifications)..."
                        className="text-xs bg-[#150a04] border border-[#3d1f0d] rounded-xl p-2.5 text-[#fff4e0] placeholder-[#875d38] focus:outline-none focus:border-amber-500 flex-1 min-w-[200px]"
                      />

                      <div className="flex items-center gap-2">
                        <button
                          disabled={processingId === req.id}
                          onClick={() => handleRejectRequest(req)}
                          className="px-3.5 py-2 bg-[#33140a] hover:bg-[#481c0e] text-red-300 font-bold text-xs rounded-xl transition-colors border border-red-700/50 disabled:opacity-50"
                        >
                          Reject
                        </button>

                        <button
                          disabled={processingId === req.id}
                          onClick={() => handleApproveRequest(req)}
                          className="brass-plate px-4 py-2 font-black text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50 active:scale-95"
                        >
                          <Check className="w-3.5 h-3.5 text-[#1a0f00]" />
                          <span>Approve &amp; Assign Code</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : activeTab === 'suppliers' ? (
        /* Suppliers Section */
        <div className="bg-wood-panel rounded-2xl border-2 border-[#54290e] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#43230e]">
            <div>
              <h3 className="font-extrabold text-lg text-[#fff4e0]">
                Supplier Profile Authentications
              </h3>
              <p className="text-xs text-[#c8a88a] mt-0.5">
                Verify legitimate manufacturing factories and wholesalers before conferring verified status.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {suppliers.map(sup => (
              <div
                key={sup.id}
                className="p-5 rounded-xl border border-[#4d2810] bg-[#1c0d05] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h4 className="font-bold text-sm text-[#fff4e0]">{sup.businessName}</h4>
                    <VerificationBadge status={sup.verificationStatus} />
                  </div>
                  <p className="text-xs text-[#a47a55]">
                    {sup.city}, {sup.state} &bull; PIN: {sup.pinCode} &bull; GST: {sup.gstNumber || 'None'}
                  </p>
                  <p className="text-xs text-[#d4b99f] line-clamp-1 max-w-lg">
                    {sup.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {sup.verificationStatus !== 'verified' && (
                    <button
                      onClick={() => handleVerifySupplier(sup.id, 'verified')}
                      className="brass-plate px-4 py-2 font-black text-xs rounded-xl transition-all flex items-center gap-1 shadow-md active:scale-95"
                    >
                      <Check className="w-3.5 h-3.5 text-[#1a0f00]" />
                      <span>Mark Verified</span>
                    </button>
                  )}
                  {sup.verificationStatus !== 'rejected' && (
                    <button
                      onClick={() => handleVerifySupplier(sup.id, 'rejected')}
                      className="px-3.5 py-2 bg-[#2d1609] hover:bg-red-950/80 hover:text-red-300 text-[#dec2a2] font-semibold text-xs rounded-xl transition-colors border border-[#522910]"
                    >
                      <span>Revoke / Reject</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'reports' ? (
        /* Reports Section */
        <div className="bg-wood-panel rounded-2xl border-2 border-[#54290e] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#43230e]">
            <div>
              <h3 className="font-extrabold text-lg text-[#fff4e0]">
                User Specification &amp; Error Reports
              </h3>
              <p className="text-xs text-[#c8a88a] mt-0.5">
                Community feedback regarding incorrect thread pitch, false stock declarations, or duplicate codes.
              </p>
            </div>
          </div>

          {reports.length === 0 ? (
            <p className="text-xs text-[#a47a55] py-8 text-center italic">
              No reports filed.
            </p>
          ) : (
            <div className="space-y-4">
              {reports.map(rep => (
                <div key={rep.id} className="p-4 rounded-xl border border-[#4d2810] bg-[#1c0d05] space-y-2 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#fff4e0]">
                      Target: {rep.targetName}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#2a1408] text-[#ffd899] border border-[#522910]">
                      {rep.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#d4b99f]">
                    {rep.explanation}
                  </p>
                  <div className="text-[11px] text-[#a47a55]">
                    Reporter: {rep.reporterEmail} &bull; {new Date(rep.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Audit Log Section - Classic Workshop Ledger */
        <div className="bg-wood-panel rounded-2xl border-2 border-[#54290e] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#43230e]">
            <div>
              <h3 className="font-extrabold text-lg text-[#fff4e0]">
                Immutable Governance Audit Log
              </h3>
              <p className="text-xs text-[#c8a88a] mt-0.5">
                Permanent workshop ledger recording all code allocations, supplier verifications and status changes.
              </p>
            </div>
          </div>

          {auditLogs.length === 0 ? (
            <p className="text-xs text-[#a47a55] py-8 text-center italic">
              Audit logs are synchronized upon administrative actions.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-[#4c260f] rounded-xl overflow-hidden shadow-lg">
                <thead className="bg-[#120803] text-[#dec2a2] uppercase font-bold text-[11px] border-b-2 border-[#43230e]">
                  <tr>
                    <th className="px-4 py-3.5">Timestamp</th>
                    <th className="px-4 py-3.5">Actor</th>
                    <th className="px-4 py-3.5">Action</th>
                    <th className="px-4 py-3.5">Target</th>
                    <th className="px-4 py-3.5">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3d1e0c] font-mono text-[11px]">
                  {auditLogs.map((log, idx) => (
                    <tr key={log.id} className={`${idx % 2 === 0 ? 'bg-[#1e0f06]' : 'bg-[#160b04]'} hover:bg-[#2c160b] transition-colors`}>
                      <td className="px-4 py-3 text-[#a47a55] whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="px-4 py-3 text-[#fff4e0]">{log.actorEmail}</td>
                      <td className="px-4 py-3 font-bold text-amber-400">{log.action}</td>
                      <td className="px-4 py-3 text-[#dec2a2]">{log.targetEntity}: {log.targetId}</td>
                      <td className="px-4 py-3 text-[#c8a88a] truncate max-w-xs">
                        {JSON.stringify(log.details || {})}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
