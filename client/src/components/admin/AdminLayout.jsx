import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import { Bell, Search, Settings, HelpCircle, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminLayout = () => {
  const { admin, loading, logout } = useAuth();

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-surface-50">
      <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4" />
      <p className="text-surface-500 font-bold animate-pulse">CuraJit Security Check...</p>
    </div>
  );

  if (!admin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-screen bg-surface-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-surface-200 sticky top-0 z-30 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
              <input 
                type="text" 
                placeholder="Search analytics, patients, or reports..." 
                className="w-full bg-surface-50 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <button className="p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
                <Settings size={20} />
              </button>
            </div>

            <div className="h-8 w-px bg-surface-200 mx-2" />

            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-surface-900 group-hover:text-primary-600 transition-colors">{admin.name}</p>
                <p className="text-[10px] text-surface-500 font-bold uppercase tracking-widest">{admin.role}</p>
              </div>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-xl flex items-center justify-center text-white font-bold shadow-teal border-2 border-white transition-transform group-hover:scale-105">
                  {admin.name.charAt(0)}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="px-8 py-6 text-center text-surface-400 text-xs font-medium">
          &copy; {new Date().getFullYear()} CuraJit Healthcare Platform. All rights reserved. 
          <span className="mx-2">|</span>
          <Link to="#" className="hover:text-primary-600">Privacy Policy</Link>
          <span className="mx-2">|</span>
          <Link to="#" className="hover:text-primary-600">Terms of Service</Link>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
