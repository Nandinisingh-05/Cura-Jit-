import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, Calendar, ShieldAlert, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PatientSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Doctors', path: '/doctors', icon: User },
    { name: 'Appointments', path: '/appointments', icon: Calendar },
    { name: 'Emergency', path: '/emergency', icon: ShieldAlert },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-surface-200 z-40 hidden lg:flex flex-col">
      <div className="p-6 border-b border-surface-100">
        <h2 className="text-xl font-bold text-surface-900">Patient Hub</h2>
        <p className="text-xs text-surface-500 mt-1">Health tools and bookings</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'}`
            }
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-surface-100">
        <button
          type="button"
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default PatientSidebar;
