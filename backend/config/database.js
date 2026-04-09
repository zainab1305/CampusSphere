const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongodb_uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/campussphere';
    
    await mongoose.connect(mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
