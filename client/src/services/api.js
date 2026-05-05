import axios from 'axios';

const STORAGE_KEY = 'curajit_user';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach JWT from unified storage key (falls back to legacy adminInfo)
API.interceptors.request.use((req) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('adminInfo');
    if (stored) {
      const { token } = JSON.parse(stored);
      if (token) req.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore parse errors
  }
  return req;
});

// ── Auth ──────────────────────────────────────────────────────────────────────
/** Unified login for all roles. Returns { _id, name, email, role, token } */
export const loginUser  = (data) => API.post('/auth/login', data);
export const registerPatient = (data) => API.post('/auth/register', data);
export const registerDoctor  = (data) => API.post('/auth/register-doctor', data);
export const getMe      = ()     => API.get('/auth/me');

// ── Admin ─────────────────────────────────────────────────────────────────────
/** Legacy admin login (still works via /api/admin/login) */
export const adminLogin = (data) => API.post('/admin/login', data);

export const getDashboardStats = () => API.get('/admin/dashboard-stats');
export const getUsers   = ()     => API.get('/admin/users');
export const blockUser  = (id)   => API.put(`/admin/users/block/${id}`);
export const deleteUser = (id)   => API.delete(`/admin/users/${id}`);

export const getDoctors           = ()          => API.get('/admin/doctors');
export const verifyDoctor         = (id, approved) => API.put(`/admin/verify-doctor/${id}`, { isVerified: approved });
export const getRecentAppointments = ()         => API.get('/admin/recent-appointments');

export const getAppointments      = ()          => API.get('/admin/appointments');
export const updateAppointmentStatus = (id, status) => API.put(`/admin/appointments/${id}`, { status });

// ── Patient / Doctor ───────────────────────────────────────────────────────────
export const getApprovedDoctors   = ()          => API.get('/doctors');
export const createAppointment    = (data)      => API.post('/appointments', data);
export const getMyAppointments    = ()          => API.get('/appointments');
export const getDoctorAppointments = ()         => API.get('/appointments/doctor');

export default API;
