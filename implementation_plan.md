# Implementation Plan - CuraJit Admin Panel

Build a comprehensive, secure, and modern Admin Panel for the CuraJit healthcare platform.

## Proposed Changes

### Backend

#### [MODIFY] [adminController.js](file:///c:/Users/NANDANI%20SINGH/OneDrive/Desktop/New%20folder/backend/controllers/adminController.js)
- Enhance `getStats` to include role distribution data for the pie chart.
- Ensure error handling is consistent.

### Frontend

#### [MODIFY] [tailwind.config.js](file:///c:/Users/NANDANI%20SINGH/OneDrive/Desktop/New%20folder/client/tailwind.config.js)
- Add missing shadows (`soft-sm`, `soft-md`) to ensure UI consistency.

#### [NEW] [Analytics.jsx](file:///c:/Users/NANDANI%20SINGH/OneDrive/Desktop/New%20folder/client/src/pages/admin/Analytics.jsx)
- Dedicated page for platform analytics.
- Includes line chart for appointment trends.
- Includes pie chart for user/doctor distribution.
- Key metrics summary.

#### [MODIFY] [Dashboard.jsx](file:///c:/Users/NANDANI%20SINGH/OneDrive/Desktop/New%20folder/client/src/pages/admin/Dashboard.jsx)
- Polish the dashboard layout.
- Add a summary version of charts.
- Improve "Recent Activity" feed.

#### [MODIFY] [DoctorManagement.jsx](file:///c:/Users/NANDANI%20SINGH/OneDrive/Desktop/New%20folder/client/src/pages/admin/DoctorManagement.jsx)
- Ensure approval/rejection flow is smooth with confirmation dialogs.
- Add status badges and better table styling.

#### [MODIFY] [AppointmentManagement.jsx](file:///c:/Users/NANDANI%20SINGH/OneDrive/Desktop/New%20folder/client/src/pages/admin/AppointmentManagement.jsx)
- Implement status updates (Approve/Cancel).
- Add filtering by status.

#### [MODIFY] [App.jsx](file:///c:/Users/NANDANI%20SINGH/OneDrive/Desktop/New%20folder/client/src/App.jsx)
- Point the `/admin/analytics` route to the new `Analytics.jsx` page.

## Verification Plan

### Automated Tests
- Manual verification using the browser.
- Check API responses for stats, users, doctors, and appointments.
- Verify JWT protection by attempting to access admin routes without a token.

### Manual Verification
- Login as admin.
- Navigate through all sidebar links.
- Perform a "Block" action on a user and verify status change.
- Approve a doctor and verify status change.
- Cancel an appointment and verify status change.
- View charts on Analytics and Dashboard pages.
