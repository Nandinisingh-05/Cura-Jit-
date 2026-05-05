# Walkthrough - CuraJit Admin Panel

I have successfully implemented a production-level Admin Panel for the CuraJit healthcare platform. The system is secure, responsive, and feature-rich.

## Features Implemented

### 1. Secure Authentication
- **JWT-based Login**: Admins can log in securely at `/admin/login`.
- **Protected Routes**: All admin pages are protected by a role-based authorization layer.
- **Persistence**: Admin session is persisted in `localStorage` with automatic token attachment in API headers.

### 2. Dashboard Overview
- **Real-time Stats**: Cards displaying Total Users, Active Doctors, Appointments, and Total Revenue.
- **Appointment Trends**: An interactive Area Chart showing weekly activity volume.
- **System Health**: A status monitor for backend services.

### 3. User Management
- **Full Control**: View all registered users in a polished table.
- **Actions**: Block/Unblock users and permanent deletion with confirmation dialogs.
- **Search**: Fast client-side search by name or email.

### 4. Doctor Verification
- **Application Review**: A dedicated interface to approve or reject new doctor registrations.
- **Status Badges**: Clear indicators for Pending, Approved, and Rejected states.
- **Specialization Tracking**: View doctor expertise and experience at a glance.

### 5. Appointment Management
- **Centralized Log**: View all platform appointments with patient and doctor details.
- **Status Updates**: Approve or Cancel appointments directly from the table.
- **Filtering**: Filter by status (Pending, Approved, Cancelled) to focus on specific tasks.

### 6. Platform Analytics
- **Growth Metrics**: Summary of growth rate, daily users, and completion rates.
- **Revenue Analytics**: Detailed area chart for revenue growth.
- **User Distribution**: Pie chart showing the ratio of Users to Doctors.

## Technical Highlights
- **Tech Stack**: React (Vite), Tailwind CSS, Node.js, Express, MongoDB.
- **UI Components**: Custom-built reusable components for tables, cards, and layouts.
- **Charts**: Recharts for high-performance, responsive data visualization.
- **Notifications**: Integrated `react-hot-toast` for real-time user feedback.
- **Responsive Design**: Fixed sidebar and flexible main content area optimized for all screen sizes.

## How to Test
1. **Seed Admin**: Run `node backend/seedAdmin.js` to create the default admin account.
2. **Login**: Go to `http://localhost:5173/admin/login`.
   - **Email**: `admin@curajit.com`
   - **Password**: `adminpassword123`
3. **Explore**: Navigate through the sidebar to view different management modules and analytics.
