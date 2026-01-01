// lib/events.js
import fs from 'fs';
import path from 'path';

const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dir = path.dirname(eventsFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Read events from file
export const readEvents = () => {
  try {
    ensureDataDirectory();
    
    if (!fs.existsSync(eventsFilePath)) {
      // Create initial empty events array (NO SAMPLE EVENTS)
      const initialEvents = [];
      fs.writeFileSync(eventsFilePath, JSON.stringify(initialEvents, null, 2));
      return initialEvents;
    }
    
    const fileData = fs.readFileSync(eventsFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading events:', error);
    return [];
  }
};

// Write events to file
export const writeEvents = (events) => {
  try {
    ensureDataDirectory();
    fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing events:', error);
    return false;
  }
};