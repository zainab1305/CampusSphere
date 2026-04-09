const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Ensure unique bookmarks (one bookmark per user per event)
bookmarkSchema.index({ userId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
