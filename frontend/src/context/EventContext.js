import React, { createContext, useState, useCallback } from 'react';
import { mockEvents } from '../data/mockData';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(mockEvents);
  const [bookmarks, setBookmarks] = useState([]);

  const createEvent = useCallback((eventData) => {
    const newEvent = {
      id: Date.now().toString(),
      ...eventData,
      createdAt: new Date(),
    };
    setEvents((prev) => [...prev, newEvent]);
    return { success: true, event: newEvent };
  }, []);

  const getEventById = useCallback(
    (id) => {
      return events.find((event) => event.id === id);
    },
    [events]
  );

  const deleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
    return { success: true };
  }, []);

  const toggleBookmark = useCallback((eventId) => {
    if (bookmarks.includes(eventId)) {
      setBookmarks((prev) => prev.filter((id) => id !== eventId));
    } else {
      setBookmarks((prev) => [...prev, eventId]);
    }
  }, [bookmarks]);

  const isBookmarked = useCallback(
    (eventId) => {
      return bookmarks.includes(eventId);
    },
    [bookmarks]
  );

  const getBookmarkedEvents = useCallback(() => {
    return events.filter((event) => bookmarks.includes(event.id));
  }, [events, bookmarks]);

  const value = {
    events,
    bookmarks,
    createEvent,
    getEventById,
    deleteEvent,
    toggleBookmark,
    isBookmarked,
    getBookmarkedEvents,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
