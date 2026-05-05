const Appointment = require('../models/Appointment');
const User = require('../models/User');

const createAppointment = async (req, res) => {
  const { doctorId, date, time } = req.body;

  if (!doctorId || !date || !time) {
    return res.status(400).json({ message: 'Doctor, date, and time are required.' });
  }

  try {
    const doctor = await User.findOne({ _id: doctorId, role: 'doctor', isVerified: true });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found or not approved yet.' });
    }

    const appointment = await Appointment.create({
      userId: req.user._id,
      doctorId,
      date,
      time,
      status: 'pending'
    });

    return res.status(201).json(appointment);
  } catch (error) {
    console.error('Create appointment error:', error);
    return res.status(500).json({ message: 'Server error while creating appointment.' });
  }
};

const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id })
      .populate('doctorId', 'name specialization fee');
    res.json(appointments);
  } catch (error) {
    console.error('Fetch patient appointments error:', error);
    res.status(500).json({ message: 'Server error while fetching appointments.' });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user._id })
      .populate('userId', 'name email');
    res.json(appointments);
  } catch (error) {
    console.error('Fetch doctor appointments error:', error);
    res.status(500).json({ message: 'Server error while fetching appointments.' });
  }
};

const listApprovedDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor', isVerified: true })
      .select('name email specialization experience fee isVerified');
    res.json(doctors);
  } catch (error) {
    console.error('Fetch doctors error:', error);
    res.status(500).json({ message: 'Server error while fetching doctors.' });
  }
};

module.exports = {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  listApprovedDoctors
};
