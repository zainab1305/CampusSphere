const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
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
app.use('/api/admin', require('./routes/admin'));

const seedDatabase = async () => {
  let createdUsers = 0;
  for (const seedUser of seedUsers) {
    const existingUser = await User.findOne({ email: seedUser.email });
    if (existingUser) {
      continue;
    }

    await User.create(seedUser);
    createdUsers += 1;
  }

  if (createdUsers > 0) {
    console.log('✅ Seeded demo users');
  }

  const eventCount = await Event.countDocuments();
  const collegeUser = await User.findOne({ role: 'college' });

  if (!collegeUser) {
    throw new Error('College seed user missing');
  }

  if (eventCount === 0) {
    const eventsToCreate = seedEvents.map((event) => ({
      ...event,
      createdBy: collegeUser._id,
    }));

    await Event.insertMany(eventsToCreate);
    console.log('✅ Seeded starter events');
    return;
  }

  // Keep seeded event images in sync even when records already exist in MongoDB.
  for (const seedEvent of seedEvents) {
    await Event.updateOne(
      { title: seedEvent.title, createdBy: collegeUser._id },
      { $set: { image: seedEvent.image } }
    );
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
let server;
let isShuttingDown = false;

const shutdown = async (signal, onComplete) => {
  if (isShuttingDown) {
    if (onComplete) {
      onComplete();
    }
    return;
  }

  isShuttingDown = true;
  console.log(`🔄 Received ${signal}. Shutting down gracefully...`);

  try {
    if (server) {
      await new Promise((resolve) => {
        server.close(() => resolve());
      });
    }

    await mongoose.connection.close();
    console.log('✅ Server shutdown complete');
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
  } finally {
    if (onComplete) {
      onComplete();
      return;
    }

    process.exit(0);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    server = app.listen(PORT, () => {
      console.log(`✅ CampusSphere Backend running on port ${PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Stop the existing process and try again.`);
      } else {
        console.error('❌ Server error:', error);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

process.once('SIGUSR2', () => shutdown('SIGUSR2', () => process.kill(process.pid, 'SIGUSR2')));
process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));

startServer();
