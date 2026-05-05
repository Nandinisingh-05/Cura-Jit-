const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'User no longer exists' });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

const doctor = (req, res, next) => {
  if (req.user && req.user.role === 'doctor') {
    if (!req.user.isVerified) {
      return res.status(403).json({ message: 'Doctor account is not verified yet' });
    }
    return next();
  }
  return res.status(401).json({ message: 'Not authorized as a doctor' });
};

const patient = (req, res, next) => {
  if (req.user && (req.user.role === 'patient' || req.user.role === 'user')) {
    return next();
  }
  return res.status(401).json({ message: 'Not authorized as a patient' });
};

module.exports = { protect, admin, doctor, patient };
