import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as fbSignOut,
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserProfile, UserRole, AccountType } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isSupplier: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  // Fast persona switcher for testing and verification
  switchPersona: (role: 'admin' | 'supplier' | 'buyer') => void;
  updateLocalProfile: (profile: Partial<UserProfile>) => void;
}

const BOOTSTRAP_ADMIN_EMAIL = 'hetviipanchal11@gmail.com';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Default initial persona (starts as bootstrapped admin or guest)
  useEffect(() => {
    // Check local storage for quick persona override if any
    const savedPersona = localStorage.getItem('indus_active_persona');
    if (savedPersona === 'supplier') {
      applySupplierPersona();
      setLoading(false);
      return;
    } else if (savedPersona === 'buyer') {
      applyBuyerPersona();
      setLoading(false);
      return;
    } else if (savedPersona === 'admin') {
      applyAdminPersona();
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async fbUser => {
      setCurrentUser(fbUser);
      if (fbUser) {
        const isAdminUser = fbUser.email?.toLowerCase() === BOOTSTRAP_ADMIN_EMAIL.toLowerCase();
        try {
          const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data() as UserProfile;
            setUserProfile({
              ...data,
              role: isAdminUser ? 'admin' : data.role || 'user',
            });
          } else {
            const newProfile: UserProfile = {
              uid: fbUser.uid,
              displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Hardware Professional',
              email: fbUser.email || '',
              accountType: isAdminUser ? 'admin' : 'buyer',
              role: isAdminUser ? 'admin' : 'user',
              accountStatus: 'active',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            await setDoc(doc(db, 'users', fbUser.uid), newProfile);
            setUserProfile(newProfile);
          }
        } catch (err) {
          // Fallback local profile if offline or permission restricted
          setUserProfile({
            uid: fbUser.uid,
            displayName: fbUser.displayName || 'Authorized User',
            email: fbUser.email || '',
            accountType: isAdminUser ? 'admin' : 'buyer',
            role: isAdminUser ? 'admin' : 'user',
            accountStatus: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      } else {
        // Default to admin persona for immediate frictionless testing of all features
        applyAdminPersona();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const applyAdminPersona = () => {
    localStorage.setItem('indus_active_persona', 'admin');
    setUserProfile({
      uid: 'admin-hetvii-panchal',
      displayName: 'Hetvii Panchal (Admin)',
      email: BOOTSTRAP_ADMIN_EMAIL,
      accountType: 'admin',
      role: 'admin',
      accountStatus: 'active',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });
  };

  const applySupplierPersona = () => {
    localStorage.setItem('indus_active_persona', 'supplier');
    setUserProfile({
      uid: 'demo_user_rajkot',
      displayName: 'Rajesh Patel (Shree Krishna Fasteners)',
      email: 'sales@sample-shreekrishna-fasteners.in',
      accountType: 'supplier',
      supplierId: 'sup-rajkot-fasteners',
      role: 'supplier',
      accountStatus: 'active',
      createdAt: '2026-01-10T08:00:00.000Z',
      updatedAt: '2026-01-10T08:00:00.000Z',
    });
  };

  const applyBuyerPersona = () => {
    localStorage.setItem('indus_active_persona', 'buyer');
    setUserProfile({
      uid: 'buyer_contractor_1',
      displayName: 'Amit Sharma (Civil & ME Contractor)',
      email: 'amit.contractor@sample-construct.in',
      accountType: 'buyer',
      role: 'user',
      accountStatus: 'active',
      createdAt: '2026-01-20T10:00:00.000Z',
      updatedAt: '2026-01-20T10:00:00.000Z',
    });
  };

  const switchPersona = (role: 'admin' | 'supplier' | 'buyer') => {
    if (role === 'admin') applyAdminPersona();
    else if (role === 'supplier') applySupplierPersona();
    else applyBuyerPersona();
  };

  const updateLocalProfile = (profile: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...profile });
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    localStorage.removeItem('indus_active_persona');
  };

  const logout = async () => {
    await fbSignOut(auth);
    localStorage.removeItem('indus_active_persona');
    applyBuyerPersona();
  };

  const isAdmin = userProfile?.role === 'admin' || userProfile?.email?.toLowerCase() === BOOTSTRAP_ADMIN_EMAIL.toLowerCase();
  const isSupplier = userProfile?.role === 'supplier' || !!userProfile?.supplierId;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        isAdmin,
        isSupplier,
        signInWithGoogle,
        logout,
        switchPersona,
        updateLocalProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
