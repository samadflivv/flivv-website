// app/api/events/route.js
import { readEvents, writeEvents } from '@/lib/events';
import { isPast, parseISO } from 'date-fns';

export async function GET() {
  try {
    const events = readEvents();
    
    // Filter out past events
    const currentDate = new Date();
    const upcomingEvents = events.filter(event => {
      try {
        const eventDate = parseISO(event.start);
        return !isPast(eventDate);
      } catch {
        return false;
      }
    });
    
    // Sort by date
    upcomingEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
    
    return new Response(JSON.stringify(upcomingEvents), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('GET error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request) {
  try {
    const eventData = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'start', 'country', 'city', 'venue', 'type'];
    for (const field of requiredFields) {
      if (!eventData[field]) {
        return new Response(JSON.stringify({ error: `Missing required field: ${field}` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // Validate date is not in the past
    const eventDate = new Date(eventData.start);
    if (isPast(eventDate)) {
      return new Response(JSON.stringify({ error: 'Event date cannot be in the past' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Read existing events
    const events = readEvents();
    
    // Create new event
    const newEvent = {
      ...eventData,
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublished: true,
      tags: eventData.tags || [],
      start: eventDate.toISOString(),
      end: eventData.end ? new Date(eventData.end).toISOString() : undefined,
      capacity: eventData.capacity ? parseInt(eventData.capacity) : undefined
    };
    
    // Add to events array
    events.push(newEvent);
    
    // Save to file
    writeEvents(events);
    
    return new Response(JSON.stringify(newEvent), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('POST error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create event' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}