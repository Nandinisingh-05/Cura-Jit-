const express = require('express');
const router = express.Router();
const { loginUser, registerPatient, registerDoctor, registerAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/auth/login — Unified login for all roles
router.post('/login', loginUser);

// POST /api/auth/register — Patient registration
router.post('/register', registerPatient);

// POST /api/auth/register-doctor — Doctor registration
router.post('/register-doctor', registerDoctor);

// POST /api/auth/register-admin — Admin registration
router.post('/register-admin', registerAdmin);

// GET /api/auth/me — Get current user (protected)
router.get('/me', protect, getMe);

module.exports = router;
