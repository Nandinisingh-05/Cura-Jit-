const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

const formatUserResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  specialization: user.specialization,
  experience: user.experience,
  fee: user.fee,
  isVerified: user.isVerified,
  token: generateToken(user),
});

/**
 * @desc  Unified Login — returns { token, role } for all user types
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'Your account has been blocked. Contact support.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.role === 'doctor' && !user.isVerified) {
      return res.status(403).json({ message: 'Your account is under review by admin.' });
    }

    return res.json(formatUserResponse(user));
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

/**
 * @desc  Register a patient
 * @route POST /api/auth/register
 * @access Public
 */
const registerPatient = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'patient',
      isVerified: true
    });

    return res.status(201).json(formatUserResponse(user));
  } catch (error) {
    console.error('Patient registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * @desc  Register a doctor
 * @route POST /api/auth/register-doctor
 * @access Public
 */
const registerDoctor = async (req, res) => {
  const { name, email, password, specialization, experience, fee } = req.body;

  if (!name || !email || !password || !specialization || !experience) {
    return res.status(400).json({ message: 'All doctor fields are required.' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'doctor',
      specialization,
      experience,
      fee: fee || 0,
      isVerified: false
    });

    return res.status(201).json({
      message: 'Doctor registration received. Your account is under review by admin.',
      doctor: {
        _id: user._id,
        name: user.name,
        email: user.email,
        specialization: user.specialization,
        experience: user.experience,
        role: user.role,
        isVerified: user.isVerified,
      }
    });
  } catch (error) {
    console.error('Doctor registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * @desc  Register an admin
 * @route POST /api/auth/register-admin
 * @access Public, optionally guarded by ADMIN_SETUP_KEY
 */
const registerAdmin = async (req, res) => {
  const { name, email, password, setupKey } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }

  if (process.env.ADMIN_SETUP_KEY && setupKey !== process.env.ADMIN_SETUP_KEY) {
    return res.status(403).json({ message: 'Invalid admin setup key.' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'admin',
      isVerified: true
    });

    return res.status(201).json(formatUserResponse(user));
  } catch (error) {
    console.error('Admin registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * @desc  Get current authenticated user profile
 * @route GET /api/auth/me
 * @access Private
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginUser, registerPatient, registerDoctor, registerAdmin, getMe };
