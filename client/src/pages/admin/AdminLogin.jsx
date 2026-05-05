import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { loginUser } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { admin, loginAdmin } = useAuth();

  if (admin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser({ email, password });
      if (data.role !== 'admin') {
        throw { response: { data: { message: 'Access denied. Admin credentials required.' } } };
      }
      loginAdmin(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-soft-xl overflow-hidden border border-surface-100">
        <div className="p-8 bg-primary-600 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold">Admin Portal</h1>
          <p className="text-primary-100">Secure Access for CuraJit Administrators</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          <div className="space-y-2">
            <label className="text-sm font-bold text-surface-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@curajit.com"
                className="w-full bg-surface-50 border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-surface-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-50 border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Login to Dashboard <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="p-6 bg-surface-50 border-t border-surface-100 text-center">
          <p className="text-xs text-surface-500">
            For security reasons, all actions are logged and audited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
