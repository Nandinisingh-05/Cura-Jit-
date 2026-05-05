const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('CuraJit Healthcare API is running...');
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/recommendRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));

// Database Connection
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err.message));