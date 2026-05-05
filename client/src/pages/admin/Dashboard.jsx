import React, { useState, useEffect } from 'react';
import { getDashboardStats, getRecentAppointments } from '../../services/api';
import { Users, UserRound, CalendarCheck, TrendingUp, Loader2, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../../components/common/Card.jsx';
import toast from 'react-hot-toast';

const StatCard = ({ title, value, icon: Icon, color, trend, trendUp }) => (
  <div className="bg-white p-6 rounded-3xl border border-surface-100 shadow-soft hover:shadow-soft-lg transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {trend}
      </div>
    </div>
    <h3 className="text-surface-500 text-sm font-medium tracking-tight">{title}</h3>
    <p className="text-3xl font-bold text-surface-900 mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, appointmentsRes] = await Promise.all([
          getDashboardStats(),
          getRecentAppointments()
        ]);
        setStats(statsRes.data);
        setRecentAppointments(appointmentsRes.data);
      } catch (err) {
        toast.error('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <Loader2 className="animate-spin text-primary-600 mb-4" size={48} />
      <p className="text-surface-500 font-medium animate-pulse">Initializing Dashboard...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Platform Overview</h1>
          <p className="text-surface-500 text-sm">Real-time summary of all healthcare activities.</p>
        </div>
        <button className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-teal hover:bg-primary-700 transition-all active:scale-95">
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={stats?.totalPatients?.toLocaleString()}
          icon={Users}
          color="bg-blue-600"
          trend="+12.5%"
          trendUp={true}
        />
        <StatCard
          title="Active Doctors"
          value={stats?.totalDoctors?.toLocaleString()}
          icon={UserRound}
          color="bg-purple-600"
          trend="+5.2%"
          trendUp={true}
        />
        <StatCard
          title="Pending Approvals"
          value={stats?.pendingDoctors?.toLocaleString()}
          icon={CalendarCheck}
          color="bg-amber-600"
          trend={stats?.pendingDoctors > 0 ? 'Action needed' : 'All verified'}
          trendUp={stats?.pendingDoctors === 0}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats?.totalRevenue?.toLocaleString()}`}
          icon={DollarSign}
          color="bg-emerald-600"
          trend="+18.2%"
          trendUp={true}
        />
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8 bg-white border border-surface-100 shadow-soft">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-bold text-surface-900 tracking-tight">Appointment Trends</h3>
              <p className="text-sm text-surface-400">Weekly platform activity volume</p>
            </div>
            <div className="flex bg-surface-50 p-1 rounded-xl border border-surface-100">
              <button className="px-4 py-1.5 bg-white text-surface-900 shadow-sm rounded-lg text-xs font-bold">Week</button>
              <button className="px-4 py-1.5 text-surface-500 text-xs font-bold">Month</button>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.trends || []}>
                <defs>
                  <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    padding: '12px 16px'
                  }}
                  cursor={{ stroke: '#2563eb', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area
                  type="monotone"
                  dataKey="appointments"
                  stroke="#2563eb"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorApp)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-8 bg-white border border-surface-100 shadow-soft">
          <h3 className="text-lg font-bold text-surface-900 mb-8 tracking-tight">System Status</h3>
          <div className="space-y-6">
            {[
              { label: 'API Server', status: 'Online', color: 'bg-green-500' },
              { label: 'Database', status: 'Healthy', color: 'bg-green-500' },
              { label: 'File Storage', status: 'Normal', color: 'bg-green-500' },
              { label: 'Auth Service', status: 'Active', color: 'bg-green-500' },
              { label: 'Notifications', status: 'Online', color: 'bg-green-500' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-surface-50 rounded-2xl border border-surface-100">
                <span className="text-sm font-bold text-surface-700">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.color} animate-pulse`} />
                  <span className="text-xs font-bold text-surface-500 uppercase tracking-wider">{item.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-primary-600 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
            <h4 className="text-white font-bold relative z-10">Premium Support</h4>
            <p className="text-primary-100 text-xs mt-1 relative z-10">24/7 technical assistance for admins.</p>
            <button className="mt-4 bg-white text-primary-600 px-4 py-2 rounded-lg text-xs font-bold relative z-10 hover:bg-primary-50 transition-colors">
              Contact Support
            </button>
          </div>
        </Card>
      </div>

      {/* Recent Appointments */}
      <Card className="p-8 bg-white border border-surface-100 shadow-soft">
        <h3 className="text-lg font-bold text-surface-900 mb-6">Recent Appointments</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="border-b border-surface-200">
              <tr>
                <th className="pb-3 font-bold text-surface-500 uppercase tracking-wide">Patient</th>
                <th className="pb-3 font-bold text-surface-500 uppercase tracking-wide">Doctor</th>
                <th className="pb-3 font-bold text-surface-500 uppercase tracking-wide">Date</th>
                <th className="pb-3 font-bold text-surface-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {recentAppointments.length === 0 ? (
                <tr><td colSpan="4" className="py-8 text-center text-surface-500">No recent appointments</td></tr>
              ) : (
                recentAppointments.map((apt) => (
                  <tr key={apt._id} className="hover:bg-surface-50 transition-colors">
                    <td className="py-4 font-semibold text-surface-900">{apt.userId?.name}</td>
                    <td className="py-4 text-surface-600">{apt.doctorId?.name}</td>
                    <td className="py-4 text-surface-600">{apt.date}</td>
                    <td className="py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        apt.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-700'
                          : apt.status === 'cancelled'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
      </div>
  );
};

export default Dashboard;
