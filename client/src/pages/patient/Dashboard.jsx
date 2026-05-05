import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CalendarCheck, Clock3, HeartPulse, ArrowRight } from 'lucide-react';
import { getApprovedDoctors, getMyAppointments } from '../../services/api';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await getApprovedDoctors();
        setDoctors(data);
      } catch (err) {
        toast.error('Unable to load available doctors.');
      } finally {
        setLoadingDoctors(false);
      }
    };

    const fetchAppointments = async () => {
      try {
        const { data } = await getMyAppointments();
        setAppointments(data);
      } catch (err) {
        toast.error('Unable to load appointments.');
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchDoctors();
    fetchAppointments();
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="p-8 bg-white border border-surface-100 shadow-soft">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-primary-600 font-bold">Patient Dashboard</p>
              <h1 className="mt-3 text-3xl font-bold text-surface-900">Find the right doctor and manage your care.</h1>
              <p className="mt-2 text-surface-500">Search specialists, book appointments, and view your health activity in one place.</p>
            </div>
            <div className="rounded-3xl bg-primary-50 p-5 text-primary-700">
              <HeartPulse size={36} />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Available Doctors', value: doctors.length, icon: CalendarCheck },
              { label: 'Upcoming Visits', value: appointments.filter((item) => item.status === 'pending').length, icon: Clock3 },
              { label: 'Active Bookings', value: appointments.length, icon: HeartPulse },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-surface-50 p-5 border border-surface-100">
                <div className="flex items-center gap-3 text-primary-600 mb-4">
                  <stat.icon size={20} />
                  <p className="text-sm font-semibold">{stat.label}</p>
                </div>
                <p className="text-3xl font-black text-surface-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8 bg-white border border-surface-100 shadow-soft">
          <h2 className="text-xl font-bold text-surface-900">Quick Actions</h2>
          <p className="text-surface-500 mt-2">Book a new appointment, review your history, or contact support.</p>
          <div className="mt-8 space-y-3">
            <Button onClick={() => navigate('/doctors')} className="w-full justify-between" variant="secondary">
              Search Doctors
              <ArrowRight size={18} />
            </Button>
            <Button onClick={() => navigate('/appointments')} className="w-full justify-between" variant="primary">
              Book Appointment
              <ArrowRight size={18} />
            </Button>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-surface-900">Search Doctors</h2>
            <p className="text-surface-500">Find verified specialists near you.</p>
          </div>
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or specialty"
              className="w-full rounded-3xl border border-surface-200 bg-white py-3 pl-12 pr-4 text-surface-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {loadingDoctors ? (
            <div className="col-span-3 rounded-3xl bg-white p-10 text-center border border-surface-100 shadow-soft">Loading available doctors...</div>
          ) : filteredDoctors.length === 0 ? (
            <div className="col-span-3 rounded-3xl bg-white p-10 text-center border border-surface-100 shadow-soft">No doctors match your search.</div>
          ) : (
            filteredDoctors.map((doctor) => (
              <Card key={doctor._id} className="p-6 border border-surface-100 hover:shadow-soft-lg transition-all">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-surface-900">{doctor.name}</h3>
                    <p className="text-sm text-primary-600 font-semibold">{doctor.specialization}</p>
                  </div>
                  <div className="text-right text-surface-500 text-sm">₹{doctor.fee}</div>
                </div>
                <p className="text-sm text-surface-500">{doctor.experience} experience</p>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Verified</span>
                  <Button size="sm" onClick={() => navigate('/appointments')}>Book Appointment</Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-surface-900">Appointment History</h2>
          <Button variant="secondary" onClick={() => navigate('/appointments')}>New Booking</Button>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-surface-100 bg-white shadow-soft">
          <table className="min-w-full text-left">
            <thead className="bg-surface-50 border-b border-surface-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-surface-500">Doctor</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-surface-500">Specialization</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-surface-500">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-surface-500">Time</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-surface-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {loadingAppointments ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-surface-500">Loading your appointments…</td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-surface-500">No appointments booked yet.</td>
                </tr>
              ) : (
                appointments.map((item) => (
                  <tr key={item._id} className="border-b border-surface-100 hover:bg-surface-50 transition-colors">
                    <td className="px-6 py-4 text-surface-900 font-semibold">{item.doctorId?.name}</td>
                    <td className="px-6 py-4 text-surface-500">{item.doctorId?.specialization}</td>
                    <td className="px-6 py-4 text-surface-500">{item.date}</td>
                    <td className="px-6 py-4 text-surface-500">{item.time}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        item.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : item.status === 'cancelled' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
