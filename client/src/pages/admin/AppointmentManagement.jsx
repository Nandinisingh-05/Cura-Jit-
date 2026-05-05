import React, { useState, useEffect } from 'react';
import { getAppointments, updateAppointmentStatus } from '../../services/api';
import { Search, Calendar, User, Clock, CheckCircle, XCircle, Loader2, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchAppointments = async () => {
    try {
      const { data } = await getAppointments();
      setAppointments(data);
    } catch (err) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      toast.success(`Appointment ${status} successfully`);
      fetchAppointments();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const filteredAppointments = appointments.filter(app => 
    filterStatus === 'all' ? true : app.status === filterStatus
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Appointments</h1>
          <p className="text-surface-500 text-sm">Monitor and manage patient-doctor meetings</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={16} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-white border border-surface-200 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 shadow-soft-sm appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-surface-100 shadow-soft-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-50 border-b border-surface-100">
                <th className="px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin text-primary-600 mx-auto" size={32} />
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-surface-500">
                    No appointments matching the criteria.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((app) => (
                  <tr key={app._id} className="hover:bg-surface-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {app.userId?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-surface-900">{app.userId?.name || 'Unknown User'}</p>
                          <p className="text-xs text-surface-500">{app.userId?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                          {app.doctorId?.name?.charAt(0) || 'D'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-surface-900">{app.doctorId?.name || 'Unknown Doctor'}</p>
                          <p className="text-xs text-surface-500">{app.doctorId?.specialization}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs text-surface-700 font-medium">
                          <Calendar size={14} className="text-surface-400" />
                          {app.date}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-surface-500">
                          <Clock size={14} className="text-surface-400" />
                          {app.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        app.status === 'approved' 
                          ? 'bg-green-50 text-green-700 border border-green-100' 
                          : app.status === 'cancelled'
                          ? 'bg-red-50 text-red-700 border border-red-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {app.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleStatusUpdate(app._id, 'approved')}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                              title="Approve"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(app._id, 'cancelled')}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Cancel"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        {app.status === 'approved' && (
                           <button 
                            onClick={() => handleStatusUpdate(app._id, 'cancelled')}
                            className="text-xs text-red-600 font-bold hover:underline"
                           >
                            Cancel
                           </button>
                        )}
                      </div>
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

export default AppointmentManagement;
