const express = require('express');
const router = express.Router();
const { listApprovedDoctors } = require('../controllers/appointmentController');

router.get('/', listApprovedDoctors);

module.exports = router;
