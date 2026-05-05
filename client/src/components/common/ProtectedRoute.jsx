import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute — wraps a route and enforces role-based access.
 *
 * Props:
 *   allowedRoles: string[] — list of roles that may access this route
 *   redirectTo?: string    — where to send unauthorised users (default: /login)
 *
 * Usage:
 *   <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
 *     <Route path="..." element={<AdminPage />} />
 *   </Route>
 */
const ProtectedRoute = ({ allowedRoles, redirectTo, children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-surface-50">
        <div className="w-14 h-14 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4" />
        <p className="text-surface-500 font-bold animate-pulse">Checking access…</p>
      </div>
    );
  }

  // Not logged in → send to login, remembering where they wanted to go
  if (!user) {
    return <Navigate to={redirectTo ?? '/login'} state={{ from: location }} replace />;
  }

  // Logged in but wrong role → send to their own dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const fallback =
      user.role === 'admin'  ? '/admin/dashboard'            :
      user.role === 'doctor' ? '/doctor/dashboard' :
      '/dashboard';
    return <Navigate to={fallback} replace />;
  }

  // Doctor is authenticated but still pending admin approval
  if (user.role === 'doctor' && !user.isVerified) {
    return <Navigate to="/doctor/pending" replace />;
  }

  return children ?? <>{children}</>;
};

export default ProtectedRoute;
