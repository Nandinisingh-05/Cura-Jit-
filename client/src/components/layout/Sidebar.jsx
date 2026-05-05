import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  ClipboardList, 
  CreditCard, 
  Settings, 
  LogOut,
  ShieldAlert,
  Rocket
} from 'lucide-react';

const Sidebar = ({ active = 'Dashboard' }) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Appointments', icon: Calendar, href: '/appointments' },
    { name: 'Doctors', icon: User, href: '/doctors' },
    { name: 'Medical Records', icon: ClipboardList, href: '/records' },
    { name: 'Payments', icon: CreditCard, href: '/payments' },
    { name: 'Emergency', icon: ShieldAlert, href: '/emergency', urgent: true },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-surface-100 hidden lg:flex flex-col z-40">
      <div className="p-6 flex items-center gap-2">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white">
          <Rocket size={24} />
        </div>
        <span className="text-xl font-bold text-surface-900">CuraJit</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
              ${active === item.name 
                ? 'bg-primary-50 text-primary-600' 
                : 'text-surface-500 hover:bg-surface-50 hover:text-surface-900'}
              ${item.urgent ? 'text-red-500 hover:bg-red-50 hover:text-red-600' : ''}
            `}
          >
            <item.icon size={20} />
            {item.name}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-surface-50 space-y-1">
        <a href="/settings" className="flex items-center gap-3 px-4 py-3 text-surface-500 hover:bg-surface-50 rounded-xl transition-all font-medium">
          <Settings size={20} />
          Settings
        </a>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
