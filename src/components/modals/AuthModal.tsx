import React from 'react';
import { X, Shield, Building2, User, KeyRound, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { userProfile, signInWithGoogle, switchPersona, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#241308] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-w-md w-full border-2 border-[#6c3b17] overflow-hidden">
        {/* Header */}
        <div className="bg-[#1b0d05] px-6 py-4 flex items-center justify-between text-[#fff4e0] border-b-2 border-[#43230e]">
          <div className="flex items-center gap-2.5">
            <KeyRound className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-base tracking-wide">Account &amp; Persona Switcher</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#a47a55] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Status */}
          <div className="bg-[#180c05] border border-[#43230e] rounded-xl p-4">
            <span className="text-[10px] uppercase tracking-wider text-[#a47a55] font-bold block mb-1">
              Active User Session
            </span>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[#fff4e0] text-sm">{userProfile?.displayName}</p>
                <p className="text-xs text-[#a47a55] font-mono">{userProfile?.email}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                userProfile?.role === 'admin'
                  ? 'bg-purple-950/80 text-purple-300 border border-purple-600/50'
                  : userProfile?.role === 'supplier'
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-600/50'
                  : 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/50'
              }`}>
                {userProfile?.role}
              </span>
            </div>
          </div>

          {/* Real Google Auth */}
          <div>
            <label className="text-xs font-bold text-[#ffd899] uppercase tracking-wider block mb-2">
              Sign In with Google Account
            </label>
            <button
              onClick={async () => {
                try {
                  await signInWithGoogle();
                  onClose();
                } catch (err: any) {
                  console.error('Google Sign-In:', err);
                }
              }}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#180c05] border border-[#522910] rounded-xl text-[#fbebd8] font-bold hover:bg-[#2b1509] hover:border-amber-600/60 transition-all shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Quick Demo Personas */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#ffd899] uppercase tracking-wider">
                Instant Test Personas
              </label>
              <span className="text-[11px] text-amber-400 font-medium">For Review &amp; Verification</span>
            </div>
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  switchPersona('admin');
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  userProfile?.role === 'admin'
                    ? 'border-amber-500 bg-[#3a1d0b] text-[#ffe1aa] font-medium'
                    : 'border-[#43230e] bg-[#180c05] hover:border-amber-600/50 text-[#dec2a2]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#291408] border border-[#522910] flex items-center justify-center text-amber-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#fff4e0]">Administrator (Hetvii Panchal)</div>
                    <div className="text-xs text-[#a47a55]">hetviipanchal11@gmail.com • Catalog &amp; Code approval</div>
                  </div>
                </div>
                {userProfile?.role === 'admin' && (
                  <span className="brass-plate text-xs px-2 py-0.5 rounded font-black">Active</span>
                )}
              </button>

              <button
                onClick={() => {
                  switchPersona('supplier');
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  userProfile?.role === 'supplier'
                    ? 'border-amber-500 bg-[#3a1d0b] text-[#ffe1aa] font-medium'
                    : 'border-[#43230e] bg-[#180c05] hover:border-amber-600/50 text-[#dec2a2]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#291408] border border-[#522910] flex items-center justify-center text-amber-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#fff4e0]">Verified Supplier (Rajkot)</div>
                    <div className="text-xs text-[#a47a55]">Shree Krishna Fasteners • Manage listings &amp; stock</div>
                  </div>
                </div>
                {userProfile?.role === 'supplier' && (
                  <span className="brass-plate text-xs px-2 py-0.5 rounded font-black">Active</span>
                )}
              </button>

              <button
                onClick={() => {
                  switchPersona('buyer');
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  userProfile?.role === 'user'
                    ? 'border-amber-500 bg-[#3a1d0b] text-[#ffe1aa] font-medium'
                    : 'border-[#43230e] bg-[#180c05] hover:border-amber-600/50 text-[#dec2a2]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#291408] border border-[#522910] flex items-center justify-center text-amber-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#fff4e0]">Buyer / Engineering Contractor</div>
                    <div className="text-xs text-[#a47a55]">Amit Sharma • Product search &amp; supplier quotes</div>
                  </div>
                </div>
                {userProfile?.role === 'user' && (
                  <span className="brass-plate text-xs px-2 py-0.5 rounded font-black">Active</span>
                )}
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-[#43230e] flex justify-end">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="text-xs text-[#a47a55] hover:text-red-400 transition-colors font-medium"
            >
              Reset Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
