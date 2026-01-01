// hooks/useEventsData.js
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'calendar_events';
const SAMPLE_EVENTS = [
  {
    id: 'evt-ksa-001',
    title: 'Flivv KSA Sales Session - Dammam',
    description: 'Join Flivv for exclusive investor sessions in Dammam. Meet the team and explore investment opportunities.',
    start: new Date(Date.now() + 86400000 * 5).toISOString(),
    country: 'SA',
    countryLabel: 'KSA',
    city: 'Dammam',
    venue: 'VOCO Hotel',
    type: 'SalesSession',
    tags: ['Investment', 'Networking'],
    rsvpUrl: 'https://example.com/rsvp/ksa',
    images: [],
    organizer: 'Flivv',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Make sure this is a default export
export default function useEventsData() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Hydrate on client side only
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const processed = parsed.map(event => ({
          ...event,
          start: new Date(event.start).toISOString(),
          end: event.end ? new Date(event.end).toISOString() : undefined,
          createdAt: new Date(event.createdAt).toISOString(),
          updatedAt: new Date(event.updatedAt).toISOString()
        }));
        setEvents(processed);
      } else {
        setEvents(SAMPLE_EVENTS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_EVENTS));
      }
    } catch (err) {
      console.error('Error loading events:', err);
      setError(err);
      setEvents(SAMPLE_EVENTS);
    } finally {
      setIsLoading(false);
      setHasHydrated(true);
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    if (hasHydrated && events.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }
  }, [events, hasHydrated]);

  const generateEventId = useCallback(() => {
    if (typeof window === 'undefined') return 'temp-id';
    return `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const addEvent = useCallback((eventData) => {
    const newEvent = {
      ...eventData,
      id: generateEventId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublished: true,
      tags: eventData.tags || [],
      images: eventData.images || [],
      start: new Date(eventData.start).toISOString(),
      end: eventData.end ? new Date(eventData.end).toISOString() : undefined
    };

    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  }, [generateEventId]);

  const updateEvent = useCallback((eventId, updates) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { 
              ...event, 
              ...updates, 
              updatedAt: new Date().toISOString(),
              start: updates.start ? new Date(updates.start).toISOString() : event.start,
              end: updates.end ? new Date(updates.end).toISOString() : event.end
            }
          : event
      )
    );
  }, []);

  const deleteEvent = useCallback((eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  }, []);

  const refreshEvents = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setEvents(parsed);
      }
    } catch (err) {
      console.error('Error refreshing events:', err);
    }
  }, []);

  return {
    events,
    isLoading,
    error,
    hasHydrated,
    addEvent,
    updateEvent,
    deleteEvent,
    refreshEvents
  };
}

// Alternative: If you want to export as named export, use this instead:
// export { useEventsData };