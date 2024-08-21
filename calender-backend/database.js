const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is loaded

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; // Get URI from environment variables
    if (!uri) {
      throw new Error('MONGO_URI is not defined');
    }
    await mongoose.connect(uri); // Remove deprecated options
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
