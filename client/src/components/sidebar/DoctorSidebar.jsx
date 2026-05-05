import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MonitorPlay, CalendarCheck, Clock4, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DoctorSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/doctor/dashboard', icon: MonitorPlay },
    { name: 'Appointments', path: '/doctor/appointments', icon: CalendarCheck },
    { name: 'Availability', path: '/doctor/availability', icon: Clock4 },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-surface-200 z-40 hidden lg:flex flex-col">
      <div className="p-6 border-b border-surface-100">
        <h2 className="text-xl font-bold text-surface-900">Doctor Panel</h2>
        <p className="text-xs text-surface-500 mt-1">Verified providers only</p>
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

export default DoctorSidebar;
