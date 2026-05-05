import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Calendar, Users, TrendingUp, LogOut, Clock3, CheckCircle, ShieldCheck } from 'lucide-react';
import { getDoctorAppointments } from '../../services/api';
import toast from 'react-hot-toast';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await getDoctorAppointments();
        setAppointments(data);
      } catch (err) {
        toast.error('Unable to load your appointments.');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const todayAppointments = appointments.filter((item) => item.status === 'pending').length;
  const confirmed = appointments.filter((item) => item.status === 'approved').length;

  return (
    <div className="min-h-screen bg-surface-50">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary-600">Doctor Dashboard</p>
            <h1 className="mt-3 text-3xl font-black text-surface-900">Welcome back, Dr. {user?.name?.split(' ')[0]}.</h1>
            <p className="mt-2 text-surface-500">Manage your schedule, patients, and clinic availability with confidence.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-surface-900">{user?.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">Verified doctor</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-3xl bg-surface-100 p-3 text-surface-600 hover:bg-surface-200 transition-all"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-10">
          {[
            { label: "Today's Appointments", value: todayAppointments, icon: Calendar, style: 'bg-blue-50 text-blue-600' },
            { label: 'Confirmed Visits', value: confirmed, icon: CheckCircle, style: 'bg-emerald-50 text-emerald-600' },
            { label: 'Active Patients', value: appointments.length || 0, icon: Users, style: 'bg-purple-50 text-purple-600' },
            { label: 'Clinic Hours', value: user?.experience || 'N/A', icon: TrendingUp, style: 'bg-amber-50 text-amber-600' }
          ].map((stat) => (
            <Card key={stat.label} className="p-6 rounded-3xl border border-surface-100 shadow-soft-sm">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className={`p-3 rounded-2xl ${stat.style} bg-opacity-20`}>
                  <stat.icon size={22} />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-surface-400">{stat.label}</span>
              </div>
              <p className="text-3xl font-black text-surface-900">{stat.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(360px,1fr)]">
          <Card className="p-6 rounded-3xl border border-surface-100 shadow-soft-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-surface-900">Today’s Schedule</h2>
                <p className="text-sm text-surface-500">A quick snapshot of today’s patient load.</p>
              </div>
              <span className="inline-flex rounded-full bg-primary-50 px-4 py-2 text-xs font-bold text-primary-700">{appointments.length} total</span>
            </div>
            {loading ? (
              <div className="py-16 text-center text-surface-500">Loading appointments...</div>
            ) : appointments.length === 0 ? (
              <div className="py-16 text-center text-surface-500">No appointments scheduled yet.</div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment._id} className="rounded-3xl border border-surface-100 p-5 hover:shadow-soft transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-lg font-bold text-surface-900">{appointment.userId?.name}</p>
                        <p className="text-sm text-surface-500">{appointment.date} · {appointment.time}</p>
                      </div>
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${
                        appointment.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-700'
                          : appointment.status === 'cancelled'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        <Clock3 size={14} /> {appointment.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-surface-500">Patient email: {appointment.userId?.email}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6 rounded-3xl border border-surface-100 shadow-soft-sm">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={24} className="text-primary-600" />
              <div>
                <h3 className="text-lg font-bold text-surface-900">Availability</h3>
                <p className="text-sm text-surface-500">Keep your schedule updated for patients.</p>
              </div>
            </div>
            <div className="space-y-4">
              {['08:00 AM - 12:00 PM', '01:00 PM - 05:00 PM', '06:00 PM - 09:00 PM'].map((slot) => (
                <div key={slot} className="rounded-3xl bg-surface-50 p-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-surface-700">{slot}</span>
                  <Button size="sm" variant="secondary">Manage</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
