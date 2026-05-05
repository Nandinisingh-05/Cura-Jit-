import React, { useState, useEffect } from 'react';
import { getDoctors, verifyDoctor } from '../../services/api';
import { Search, CheckCircle, XCircle, Eye, Loader2, Award, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDoctors = async () => {
    try {
      const { data } = await getDoctors();
      setDoctors(data);
    } catch (err) {
      toast.error('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleApprove = async (id) => {
    try {
      await verifyDoctor(id, true);
      toast.success('Doctor approved!');
      fetchDoctors();
    } catch (err) {
      toast.error('Failed to approve doctor');
    }
  };

  const handleReject = async (id) => {
    try {
      await verifyDoctor(id, false);
      toast.success('Doctor rejected');
      fetchDoctors();
    } catch (err) {
      toast.error('Failed to reject doctor');
    }
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Doctor Verification</h1>
          <p className="text-surface-500 text-sm">Review and approve healthcare providers</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-surface-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500 shadow-soft-sm transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-surface-100 shadow-soft-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-50 border-b border-surface-100">
                <th className="px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider">Doctor Information</th>
                <th className="px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider">Experience & Fee</th>
                <th className="px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin text-primary-600 mx-auto" size={32} />
                  </td>
                </tr>
              ) : filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-surface-500">
                    No doctors found.
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((doc) => (
                  <tr key={doc._id} className="hover:bg-surface-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-lg shadow-soft-sm">
                          {doc.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-surface-900">{doc.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Briefcase size={12} className="text-primary-500" />
                            <span className="text-xs text-surface-600 font-medium">{doc.specialization}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-surface-900 font-medium">{doc.experience} Experience</p>
                      <p className="text-xs text-surface-500 font-bold mt-1">₹{doc.fee} / session</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight ${
                        doc.isVerified
                          ? 'bg-green-50 text-green-700 border border-green-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          doc.isVerified ? 'bg-green-500' : 'bg-amber-500'
                        }`} />
                        {doc.isVerified ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {!doc.isVerified && (
                          <>
                            <button
                              onClick={() => handleApprove(doc._id)}
                              className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-xl transition-all shadow-soft-sm"
                              title="Approve"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => handleReject(doc._id)}
                              className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all shadow-soft-sm"
                              title="Reject"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        <button className="p-2 text-surface-400 hover:text-surface-900 hover:bg-surface-100 rounded-xl transition-all">
                          <Eye size={18} />
                        </button>
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

export default DoctorManagement;
