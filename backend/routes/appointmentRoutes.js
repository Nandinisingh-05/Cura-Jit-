const express = require('express');
const router = express.Router();
const { protect, patient, doctor } = require('../middleware/authMiddleware');
const {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments
} = require('../controllers/appointmentController');

router.use(protect);

router.post('/', patient, createAppointment);
router.get('/', patient, getPatientAppointments);
router.get('/doctor', doctor, getDoctorAppointments);

module.exports = router;
