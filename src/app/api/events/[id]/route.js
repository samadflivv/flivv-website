// app/api/events/[id]/route.js
import { readEvents, writeEvents } from '@/lib/events';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updates = await request.json();
    
    // Read existing events
    const events = readEvents();
    
    // Find event index
    const eventIndex = events.findIndex(event => event.id === id);
    
    if (eventIndex === -1) {
      return new Response(JSON.stringify({ error: 'Event not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Update event
    const updatedEvent = {
      ...events[eventIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
      start: updates.start ? new Date(updates.start).toISOString() : events[eventIndex].start,
      end: updates.end ? new Date(updates.end).toISOString() : events[eventIndex].end
    };
    
    events[eventIndex] = updatedEvent;
    
    // Save to file
    writeEvents(events);
    
    return new Response(JSON.stringify(updatedEvent), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('PUT error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update event' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Read existing events
    const events = readEvents();
    
    // Filter out the event to delete
    const filteredEvents = events.filter(event => event.id !== id);
    
    if (filteredEvents.length === events.length) {
      return new Response(JSON.stringify({ error: 'Event not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Save to file
    writeEvents(filteredEvents);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete event' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}