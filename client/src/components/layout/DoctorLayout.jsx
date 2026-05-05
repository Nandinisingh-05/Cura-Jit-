import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import DoctorSidebar from '../sidebar/DoctorSidebar.jsx';
import { useAuth } from '../../context/AuthContext';
import { Bell, Search, Settings } from 'lucide-react';

const DoctorLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-surface-50">
        <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== 'doctor') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-surface-50">
      <DoctorSidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <header className="h-20 bg-white border-b border-surface-200 sticky top-0 z-30 px-8 flex items-center justify-between">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
            <input
              type="text"
              placeholder="Search appointments, patients or availability..."
              className="w-full bg-surface-50 rounded-2xl pl-12 pr-4 py-3 border border-surface-200 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-2xl bg-surface-50 text-surface-600 hover:bg-surface-100 transition-all">
              <Bell size={20} />
            </button>
            <button className="p-2 rounded-2xl bg-surface-50 text-surface-600 hover:bg-surface-100 transition-all">
              <Settings size={20} />
            </button>
          </div>
        </header>
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
