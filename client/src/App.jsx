import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import DoctorListing from './pages/DoctorListing.jsx';
import AppointmentBooking from './pages/AppointmentBooking.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import EmergencySOS from './pages/EmergencySOS.jsx';
import Login from './pages/Login.jsx';
import PatientDashboard from './pages/patient/Dashboard.jsx';
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx';
import PendingApproval from './pages/doctor/PendingApproval.jsx';

// Admin Pages
import AdminLayout from './components/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/Dashboard.jsx';
import UserManagement from './pages/admin/UserManagement.jsx';
import DoctorManagement from './pages/admin/DoctorManagement.jsx';
import AppointmentManagement from './pages/admin/AppointmentManagement.jsx';
import Analytics from './pages/admin/Analytics.jsx';

import { AuthProvider } from './context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import DoctorLayout from './components/layout/DoctorLayout.jsx';
import PatientLayout from './components/layout/PatientLayout.jsx';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Router>
        <div className="App font-sans">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />

            <Route element={<ProtectedRoute allowedRoles={['patient', 'user']}><PatientLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<PatientDashboard />} />
              <Route path="/doctors" element={<DoctorListing />} />
              <Route path="/appointments" element={<AppointmentBooking />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/emergency" element={<EmergencySOS />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['doctor']}><DoctorLayout /></ProtectedRoute>}>
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/appointments" element={<DoctorDashboard />} />
              <Route path="/doctor/availability" element={<DoctorDashboard />} />
              <Route path="/doctor/pending" element={<PendingApproval />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/doctors" element={<DoctorManagement />} />
              <Route path="/admin/appointments" element={<AppointmentManagement />} />
              <Route path="/admin/analytics" element={<Analytics />} />
            </Route>

            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
