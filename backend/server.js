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
const primaryMongoUri = process.env.MONGO_URI;
const fallbackMongoUri = 'mongodb://127.0.0.1:27017/curajit';

const connectMongo = async () => {
  try {
    const uri = primaryMongoUri || fallbackMongoUri;
    if (!primaryMongoUri) {
      console.warn('⚠️ MONGO_URI not set. Attempting local MongoDB at', uri);
    }
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.log('❌ MongoDB Error:', error.message);
    if (primaryMongoUri) {
      console.warn('⚠️ Primary MongoDB URI failed, attempting local fallback...');
      try {
        await mongoose.connect(fallbackMongoUri);
        console.log('✅ MongoDB Connected via local fallback');
      } catch (fallbackError) {
        console.log('❌ Local MongoDB fallback failed:', fallbackError.message);
      }
    }
  }
};

connectMongo();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));