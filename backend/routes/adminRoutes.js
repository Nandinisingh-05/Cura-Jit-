const express = require('express');
const router = express.Router();
const {
  loginAdmin,
  getUsers,
  toggleBlockUser,
  deleteUser,
  getDoctors,
  verifyDoctor,
  getRecentAppointments,
  getAppointments,
  updateAppointmentStatus,
  getDashboardStats
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);

router.use(protect);
router.use(admin);

router.get('/users', getUsers);
router.put('/users/block/:id', toggleBlockUser);
router.delete('/users/:id', deleteUser);

router.get('/doctors', getDoctors);
router.put('/verify-doctor/:id', verifyDoctor);

router.get('/recent-appointments', getRecentAppointments);
router.get('/appointments', getAppointments);
router.put('/appointments/:id', updateAppointmentStatus);

router.get('/dashboard-stats', getDashboardStats);
router.get('/stats', getDashboardStats);

module.exports = router;
