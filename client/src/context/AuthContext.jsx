import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

/**
 * Unified AuthContext for CuraJit.
 *
 * Stores a single `user` object: { _id, name, email, role, token }
 * Role is one of: 'user' (patient) | 'doctor' | 'admin'
 *
 * Role → dashboard map
 *   admin   → /admin
 *   doctor  → /doctor/dashboard
 *   user    → /dashboard
 */

const STORAGE_KEY = 'curajit_user';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  /** Call this after a successful /api/auth/login response */
  const login = useCallback((userData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  }, []);

  /** Also accept legacy admin-only key for backward compat during migration */
  const loginAdmin = useCallback((adminData) => {
    const payload = { ...adminData, role: 'admin' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    // Keep legacy key in sync so old AdminLayout still works
    localStorage.setItem('adminInfo', JSON.stringify(payload));
    setUser(payload);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('adminInfo'); // clean up legacy key
    setUser(null);
  }, []);

  /** Convenience booleans */
  const isAdmin   = user?.role === 'admin';
  const isDoctor  = user?.role === 'doctor';
  const isPatient = user?.role === 'patient' || user?.role === 'user';

  /** Returns the correct home route for the current user's role */
  const getDashboardPath = useCallback((role) => {
    const r = role ?? user?.role;
    if (r === 'admin') return '/admin/dashboard';
    if (r === 'doctor') return '/doctor/dashboard';
    return '/dashboard';
  }, [user]);

  // Back-compat: AdminLayout reads { admin } from context
  const admin = isAdmin ? user : null;

  return (
    <AuthContext.Provider value={{
      user, admin, loading,
      isAdmin, isDoctor, isPatient,
      login, loginAdmin, logout,
      getDashboardPath,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
