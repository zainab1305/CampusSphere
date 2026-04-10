const express = require('express');
const Event = require('../models/Event');
const Bookmark = require('../models/Bookmark');
const { authMiddleware, isCollege, isStudent } = require('../middleware/auth');

const router = express.Router();

// Get registered events for current student
router.get('/registered', authMiddleware, isStudent, async (req, res) => {
  try {
    const events = await Event.find({ attendees: req.userId }).populate('createdBy', 'email role');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's created events
router.get('/user/events', authMiddleware, isCollege, async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.userId }).populate('createdBy', 'email role');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'email role');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'email role');
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create event (College only)
router.post('/', authMiddleware, isCollege, async (req, res) => {
  try {
    const { title, description, date, time, location, category, capacity, image } = req.body;

    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      capacity,
      image,
      createdBy: req.userId,
    });

    await event.save();
    await event.populate('createdBy', 'email role');

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update event
router.put('/:id', authMiddleware, isCollege, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.userId) {
      return res.status(403).json({ error: 'You can only edit your own events' });
    }

    Object.assign(event, req.body);
    await event.save();

    res.json({ message: 'Event updated successfully', event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete event
router.delete('/:id', authMiddleware, isCollege, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.userId) {
      return res.status(403).json({ error: 'You can only delete your own events' });
    }

    await Event.findByIdAndDelete(req.params.id);
    await Bookmark.deleteMany({ eventId: req.params.id });

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register for an event
router.post('/:id/register', authMiddleware, isStudent, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.attendees.some((attendeeId) => attendeeId.toString() === req.userId)) {
      return res.status(400).json({ error: 'You are already registered for this event' });
    }

    if (event.registered >= event.capacity) {
      return res.status(400).json({ error: 'Event is full' });
    }

    event.attendees.push(req.userId);
    event.registered += 1;
    await event.save();

    await event.populate('createdBy', 'email role');
    res.json({ message: 'Registration successful', event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel a registration
router.delete('/:id/register', authMiddleware, isStudent, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const attendeeIndex = event.attendees.findIndex(
      (attendeeId) => attendeeId.toString() === req.userId
    );

    if (attendeeIndex === -1) {
      return res.status(400).json({ error: 'You are not registered for this event' });
    }

    event.attendees.splice(attendeeIndex, 1);
    event.registered = Math.max(0, event.registered - 1);
    await event.save();

    await event.populate('createdBy', 'email role');
    res.json({ message: 'Registration cancelled', event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
