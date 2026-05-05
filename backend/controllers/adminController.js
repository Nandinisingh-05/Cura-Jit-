const User = require('../models/User');
const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');

// @desc    Admin Login
// @route   POST /api/admin/login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.role === 'admin' && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' })
    });
  } else {
    res.status(401).json({ message: 'Invalid admin credentials' });
  }
};

// @desc    Get all patients
// @route   GET /api/admin/users
const getUsers = async (req, res) => {
  const users = await User.find({ $or: [{ role: 'patient' }, { role: 'user' }] }).select('-password');
  res.json(users);
};

// @desc    Block/Unblock user
// @route   PUT /api/admin/users/block/:id
const toggleBlockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}` });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Get all doctors for admin approval
// @route   GET /api/admin/doctors
const getDoctors = async (req, res) => {
  const doctors = await User.find({ role: 'doctor' }).select('-password');
  const mapped = doctors.map((doc) => ({
    _id: doc._id,
    name: doc.name,
    email: doc.email,
    specialization: doc.specialization,
    experience: doc.experience,
    fee: doc.fee,
    isVerified: doc.isVerified,
    status: doc.isVerified ? 'approved' : 'pending',
    createdAt: doc.createdAt,
  }));
  res.json(mapped);
};

// @desc    Verify or reject doctor
// @route   PUT /api/admin/verify-doctor/:id
const verifyDoctor = async (req, res) => {
  const { id } = req.params;
  const { isVerified } = req.body;

  const doctor = await User.findOne({ _id: id, role: 'doctor' });
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }

  doctor.isVerified = Boolean(isVerified);
  await doctor.save();

  res.json({
    message: `Doctor ${doctor.isVerified ? 'approved' : 'rejected'}`,
    doctor: {
      _id: doctor._id,
      isVerified: doctor.isVerified,
      status: doctor.isVerified ? 'approved' : 'pending'
    }
  });
};

// @desc    Get recent appointments for admin
// @route   GET /api/admin/recent-appointments
const getRecentAppointments = async (req, res) => {
  const appointments = await Appointment.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('userId', 'name email')
    .populate('doctorId', 'name specialization');
  res.json(appointments);
};

// @desc    Get all appointments
// @route   GET /api/admin/appointments
const getAppointments = async (req, res) => {
  const appointments = await Appointment.find({})
    .populate('userId', 'name email')
    .populate('doctorId', 'name specialization');
  res.json(appointments);
};

// @desc    Update appointment status
// @route   PUT /api/admin/appointments/:id
const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    appointment.status = status;
    await appointment.save();
    res.json({ message: 'Appointment updated' });
  } else {
    res.status(404).json({ message: 'Appointment not found' });
  }
};

// @desc    Get stats for admin dashboard
// @route   GET /api/admin/dashboard-stats
const getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await User.countDocuments({ $or: [{ role: 'patient' }, { role: 'user' }] });
    const totalDoctors = await User.countDocuments({ role: 'doctor' });
    const pendingDoctors = await User.countDocuments({ role: 'doctor', isVerified: false });
    const activeUsers = await User.countDocuments({ isBlocked: false, role: { $in: ['patient', 'user', 'doctor'] } });
    const totalAppointments = await Appointment.countDocuments({});

    const approvedAppointments = await Appointment.find({ status: 'approved' }).populate('doctorId');
    const totalRevenue = approvedAppointments.reduce((acc, curr) => acc + (curr.doctorId?.fee || 0), 0);

    const rolesData = [
      { name: 'Patients', value: totalPatients },
      { name: 'Doctors', value: totalDoctors }
    ];

    const trends = [
      { name: 'Mon', appointments: 12, revenue: 1200 },
      { name: 'Tue', appointments: 19, revenue: 1900 },
      { name: 'Wed', appointments: 15, revenue: 1500 },
      { name: 'Thu', appointments: 22, revenue: 2200 },
      { name: 'Fri', appointments: 30, revenue: 3000 },
      { name: 'Sat', appointments: 10, revenue: 1000 },
      { name: 'Sun', appointments: 8, revenue: 800 },
    ];

    res.json({
      totalPatients,
      totalDoctors,
      pendingDoctors,
      activeUsers,
      totalAppointments,
      totalRevenue,
      rolesData,
      trends
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};

module.exports = {
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
};
