const express = require('express');
const Bookmark = require('../models/Bookmark');
const Event = require('../models/Event');
const { authMiddleware, isStudent } = require('../middleware/auth');

const router = express.Router();

// Get user's bookmarks
router.get('/', authMiddleware, isStudent, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.userId }).populate('eventId');
    const events = bookmarks.map((b) => b.eventId);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add bookmark
router.post('/:eventId', authMiddleware, isStudent, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.status && event.status !== 'approved') {
      return res.status(400).json({ error: 'Only approved events can be bookmarked' });
    }

    let bookmark = await Bookmark.findOne({
      userId: req.userId,
      eventId: req.params.eventId,
    });

    if (bookmark) {
      await Bookmark.deleteOne({ _id: bookmark._id });
      return res.json({ message: 'Bookmark removed', bookmarked: false });
    }

    bookmark = new Bookmark({
      userId: req.userId,
      eventId: req.params.eventId,
    });

    await bookmark.save();
    res.status(201).json({ message: 'Event bookmarked', bookmark, bookmarked: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove bookmark
router.delete('/:eventId', authMiddleware, isStudent, async (req, res) => {
  try {
    const result = await Bookmark.deleteOne({
      userId: req.userId,
      eventId: req.params.eventId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    res.json({ message: 'Bookmark removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
