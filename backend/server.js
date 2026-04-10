const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const User = require('./models/User');
const Event = require('./models/Event');
const { seedUsers, seedEvents } = require('./data/seedData');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/bookmarks', require('./routes/bookmarks'));

const seedDatabase = async () => {
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    await User.create(seedUsers);
    console.log('✅ Seeded demo users');
  }

  const eventCount = await Event.countDocuments();
  if (eventCount === 0) {
    const collegeUser = await User.findOne({ role: 'college' });

    if (!collegeUser) {
      throw new Error('College seed user missing');
    }

    const eventsToCreate = seedEvents.map((event) => ({
      ...event,
      createdBy: collegeUser._id,
    }));

    await Event.insertMany(eventsToCreate);
    console.log('✅ Seeded starter events');
  }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running! 🚀' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`✅ CampusSphere Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
