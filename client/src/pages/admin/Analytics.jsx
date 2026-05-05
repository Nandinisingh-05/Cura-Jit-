import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/api';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area 
} from 'recharts';
import { Loader2, TrendingUp, Users, Activity, DollarSign } from 'lucide-react';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <Loader2 className="animate-spin text-primary-600 mb-4" size={48} />
      <p className="text-surface-500 font-medium">Loading platform analytics...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Platform Analytics</h1>
          <p className="text-surface-500">In-depth performance metrics for CuraJit</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-soft-sm border border-surface-100 text-sm font-medium text-surface-600">
          Last 30 Days
        </div>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Growth Rate', value: '14.2%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg. Daily Users', value: '128', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Completion Rate', value: '92%', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Net Revenue', value: `$${stats?.totalRevenue?.toLocaleString()}`, icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-surface-100 shadow-soft-sm">
            <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-lg flex items-center justify-center mb-4`}>
              <item.icon size={20} />
            </div>
            <p className="text-sm font-medium text-surface-500">{item.label}</p>
            <p className="text-2xl font-bold text-surface-900 mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <div className="bg-white p-8 rounded-3xl border border-surface-100 shadow-soft-sm">
          <h3 className="text-lg font-bold text-surface-900 mb-6">Revenue Growth</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.trends}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution */}
        <div className="bg-white p-8 rounded-3xl border border-surface-100 shadow-soft-sm">
          <h3 className="text-lg font-bold text-surface-900 mb-6">User Base Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.rolesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats?.rolesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Appointment Volume */}
      <div className="bg-white p-8 rounded-3xl border border-surface-100 shadow-soft-sm">
        <h3 className="text-lg font-bold text-surface-900 mb-6">Weekly Appointment Volume</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats?.trends}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
              />
              <Bar dataKey="appointments" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
