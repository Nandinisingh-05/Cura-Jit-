const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Appointment = require('./models/Appointment');

dotenv.config();

const demoUsers = [
  {
    name: 'Demo Patient',
    email: 'patient@demo.com',
    password: 'Demo@12345',
    role: 'patient',
    isVerified: true,
    specialization: '',
    experience: '',
    fee: 0,
  },
  {
    name: 'Demo Doctor',
    email: 'doctor@demo.com',
    password: 'Demo@12345',
    role: 'doctor',
    isVerified: true,
    specialization: 'General Physician',
    experience: '8 years',
    fee: 500,
  },
  {
    name: 'Demo Admin',
    email: 'admin@demo.com',
    password: 'Demo@12345',
    role: 'admin',
    isVerified: true,
    specialization: '',
    experience: '',
    fee: 0,
  },
];

const upsertDemoUser = async (profile) => {
  const user = await User.findOne({ email: profile.email });

  if (!user) {
    return User.create(profile);
  }

  user.name = profile.name;
  user.role = profile.role;
  user.isVerified = profile.isVerified;
  user.isBlocked = false;
  user.specialization = profile.specialization;
  user.experience = profile.experience;
  user.fee = profile.fee;
  user.password = profile.password;
  return user.save();
};

const seedDemo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/curajit');

    const [patient, doctor, admin] = await Promise.all(demoUsers.map(upsertDemoUser));

    await Appointment.deleteMany({
      userId: patient._id,
      doctorId: doctor._id,
    });

    await Appointment.insertMany([
      {
        userId: patient._id,
        doctorId: doctor._id,
        date: '2026-05-06',
        time: '10:00 AM',
        status: 'approved',
      },
      {
        userId: patient._id,
        doctorId: doctor._id,
        date: '2026-05-09',
        time: '03:30 PM',
        status: 'pending',
      },
      {
        userId: patient._id,
        doctorId: doctor._id,
        date: '2026-04-28',
        time: '12:15 PM',
        status: 'cancelled',
      },
    ]);

    console.log('Demo profiles and dashboards data are ready.');
    console.log('');
    console.log('Patient: patient@demo.com / Demo@12345');
    console.log('Doctor:  doctor@demo.com / Demo@12345');
    console.log('Admin:   admin@demo.com / Demo@12345');
    console.log('');
    console.log(`Seeded patient: ${patient.name}`);
    console.log(`Seeded doctor: ${doctor.name}`);
    console.log(`Seeded admin: ${admin.name}`);
  } catch (error) {
    console.error('Error seeding demo data:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedDemo();
