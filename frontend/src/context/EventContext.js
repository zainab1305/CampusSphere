import React, { createContext, useState, useCallback, useEffect, useContext } from 'react';
import { mockEvents } from '../data/mockData';
import apiClient from '../api/client';
import { AuthContext } from './AuthContext';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(mockEvents);
  const [bookmarks, setBookmarks] = useState([]);
  const [registeredEventIds, setRegisteredEventIds] = useState([]);
  const { user, isAuthenticated } = useContext(AuthContext);

  const normalizeEvent = useCallback((event) => {
    const eventId = event._id || event.id;

    return {
      ...event,
      id: eventId,
      date: event.date ? new Date(event.date).toISOString().slice(0, 10) : event.date,
    };
  }, []);

  const syncEvents = useCallback(
    (nextEvents) => {
      setEvents(nextEvents.map(normalizeEvent));
    },
    [normalizeEvent]
  );

  const replaceEvent = useCallback(
    (updatedEvent) => {
      const normalizedEvent = normalizeEvent(updatedEvent);
      setEvents((prev) =>
        prev.map((event) => (event.id === normalizedEvent.id ? normalizedEvent : event))
      );
      return normalizedEvent;
    },
    [normalizeEvent]
  );

  const loadEvents = useCallback(async () => {
    try {
      const { data } = await apiClient.get('/events');
      syncEvents(data);
      return data;
    } catch (error) {
      setEvents(mockEvents);
      return mockEvents;
    }
  }, [syncEvents]);

  const loadBookmarks = useCallback(async () => {
    if (!isAuthenticated || user?.role !== 'student') {
      setBookmarks([]);
      setRegisteredEventIds([]);
      return;
    }

    try {
      const [bookmarkResponse, registrationResponse] = await Promise.all([
        apiClient.get('/bookmarks'),
        apiClient.get('/events/registered'),
      ]);

      setBookmarks(bookmarkResponse.data.map((event) => event._id || event.id));
      setRegisteredEventIds(registrationResponse.data.map((event) => event._id || event.id));
    } catch (error) {
      setBookmarks([]);
      setRegisteredEventIds([]);
    }
  }, [isAuthenticated, user?.role]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  const createEvent = useCallback(
    async (eventData) => {
      try {
        const { data } = await apiClient.post('/events', eventData);
        const createdEvent = normalizeEvent(data.event);
        setEvents((prev) => [...prev.filter((event) => event.id !== createdEvent.id), createdEvent]);
        return { success: true, event: createdEvent };
      } catch (error) {
        const newEvent = {
          id: Date.now().toString(),
          ...eventData,
          registered: 0,
          createdAt: new Date().toISOString(),
        };
        setEvents((prev) => [...prev, newEvent]);
        return { success: true, event: newEvent, fallback: true };
      }
    },
    [normalizeEvent]
  );

  const updateEvent = useCallback(
    async (eventId, eventData) => {
      try {
        const { data } = await apiClient.put(`/events/${eventId}`, eventData);
        const updatedEvent = normalizeEvent(data.event);
        setEvents((prev) =>
          prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
        );
        return { success: true, event: updatedEvent };
      } catch (error) {
        return { success: false, message: error.response?.data?.error || 'Update failed' };
      }
    },
    [normalizeEvent]
  );

  const getEventById = useCallback(
    (id) => {
      return events.find((event) => event.id === id);
    },
    [events]
  );

  const deleteEvent = useCallback(async (id) => {
    try {
      await apiClient.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((event) => event.id !== id));
      setBookmarks((prev) => prev.filter((bookmarkId) => bookmarkId !== id));
      setRegisteredEventIds((prev) => prev.filter((eventId) => eventId !== id));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || 'Delete failed' };
    }
  }, []);

  const toggleBookmark = useCallback(async (eventId) => {
    try {
      const { data } = await apiClient.post(`/bookmarks/${eventId}`);
      setBookmarks((prev) => {
        if (data.bookmarked) {
          return prev.includes(eventId) ? prev : [...prev, eventId];
        }

        return prev.filter((id) => id !== eventId);
      });
      return { success: true, bookmarked: data.bookmarked };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || 'Bookmark failed' };
    }
  }, []);

  const isBookmarked = useCallback(
    (eventId) => {
      return bookmarks.includes(eventId);
    },
    [bookmarks]
  );

  const getBookmarkedEvents = useCallback(() => {
    return events.filter((event) => bookmarks.includes(event.id));
  }, [events, bookmarks]);

  const isRegistered = useCallback(
    (eventId) => {
      return registeredEventIds.includes(eventId);
    },
    [registeredEventIds]
  );

  const toggleRegistration = useCallback(
    async (eventId) => {
      try {
        const currentlyRegistered = registeredEventIds.includes(eventId);
        const response = currentlyRegistered
          ? await apiClient.delete(`/events/${eventId}/register`)
          : await apiClient.post(`/events/${eventId}/register`);

        replaceEvent(response.data.event);

        setRegisteredEventIds((prev) => {
          if (currentlyRegistered) {
            return prev.filter((id) => id !== eventId);
          }

          return prev.includes(eventId) ? prev : [...prev, eventId];
        });

        return { success: true, registered: !currentlyRegistered };
      } catch (error) {
        return { success: false, message: error.response?.data?.error || 'Registration failed' };
      }
    },
    [registeredEventIds, replaceEvent]
  );

  const value = {
    events,
    bookmarks,
    createEvent,
    updateEvent,
    getEventById,
    deleteEvent,
    toggleBookmark,
    isBookmarked,
    getBookmarkedEvents,
    isRegistered,
    toggleRegistration,
    loadEvents,
    loadBookmarks,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
