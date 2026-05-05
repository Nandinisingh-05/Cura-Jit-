import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserRound, CalendarCheck, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Doctors', path: '/admin/doctors', icon: UserRound },
    { name: 'Appointments', path: '/admin/appointments', icon: CalendarCheck },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-white border-r border-surface-200 h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-surface-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
          C
        </div>
        <h1 className="text-xl font-bold text-surface-900">CuraJit Admin</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-600 font-bold'
                  : 'text-surface-600 hover:bg-surface-50'
              }`
            }
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-surface-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
