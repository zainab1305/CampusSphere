const express = require('express');
const Event = require('../models/Event');
const { authMiddleware, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware, isAdmin);

// Get all pending events for moderation
router.get('/events/pending', async (req, res) => {
  try {
    const events = await Event.find({ status: 'pending' })
      .populate('createdBy', 'email role')
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all events by moderation state
router.get('/events', async (req, res) => {
  try {
    const status = req.query.status;
    const query = status ? { status } : {};

    const events = await Event.find(query)
      .populate('createdBy', 'email role')
      .populate('verifiedBy', 'email role')
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve or reject event
router.patch('/events/:id/status', async (req, res) => {
  try {
    const { status, moderationNote } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Status must be approved or rejected' });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    event.status = status;
    event.moderationNote = moderationNote || '';
    event.verifiedBy = req.userId;
    event.verifiedAt = new Date();

    if (status === 'rejected') {
      event.attendees = [];
      event.registered = 0;
    }

    await event.save();
    await event.populate('createdBy', 'email role');
    await event.populate('verifiedBy', 'email role');

    res.json({ message: `Event ${status} successfully`, event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;