import React, { useState, useEffect } from 'react';
import { getUsers, blockUser, deleteUser } from '../../services/api';
import { Search, MoreVertical, ShieldAlert, Trash2, Loader2, UserCheck, UserX } from 'lucide-react';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlock = async (id, isBlocked) => {
    const action = isBlocked ? 'unblock' : 'block';
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        await blockUser(id);
        toast.success(`User ${action}ed successfully`);
        fetchUsers();
      } catch (err) {
        toast.error('Action failed');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(id);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">User Management</h1>
          <p className="text-surface-500 text-sm">Manage platform access and user accounts</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
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
                <th className="px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider">Registered</th>
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
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-surface-500">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-surface-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface-100 text-surface-700 flex items-center justify-center font-bold shadow-soft-sm border border-white">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-surface-900">{user.name}</p>
                          <p className="text-xs text-surface-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-surface-600">
                      {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.isBlocked 
                          ? 'bg-red-50 text-red-700 border border-red-100' 
                          : 'bg-green-50 text-green-700 border border-green-100'
                      }`}>
                        {user.isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleBlock(user._id, user.isBlocked)}
                          className={`p-2 rounded-xl transition-all shadow-soft-sm border ${
                            user.isBlocked 
                              ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100' 
                              : 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100'
                          }`}
                          title={user.isBlocked ? 'Unblock' : 'Block'}
                        >
                          {user.isBlocked ? <UserCheck size={18} /> : <UserX size={18} />}
                        </button>
                        <button 
                          onClick={() => handleDelete(user._id)}
                          className="p-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-xl transition-all shadow-soft-sm"
                          title="Delete"
                        >
                          <Trash2 size={18} />
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

export default UserManagement;
