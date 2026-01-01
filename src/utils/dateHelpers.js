// utils/dateHelpers.js
import { 
  format, 
  parseISO, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  addMonths,
  subMonths,
  differenceInDays,
  isWithinInterval
} from 'date-fns';

// Format date for display
export const formatEventDate = (dateString, formatString = 'PPP') => {
  try {
    return format(parseISO(dateString), formatString);
  } catch {
    return 'Invalid date';
  }
};

// Format time range
export const formatTimeRange = (startString, endString = null) => {
  const start = parseISO(startString);
  let formatted = format(start, 'h:mm a');
  
  if (endString) {
    const end = parseISO(endString);
    formatted += ` - ${format(end, 'h:mm a')}`;
  }
  
  return formatted;
};

// Get month grid days
export const getMonthDays = (date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  return eachDayOfInterval({ start: monthStart, end: monthEnd });
};

// Check if event is upcoming
export const isUpcoming = (eventDateString) => {
  const eventDate = parseISO(eventDateString);
  return eventDate >= new Date();
};

// Get events for specific day
export const getEventsForDay = (events, day) => {
  return events.filter(event => 
    isSameDay(parseISO(event.start), day)
  );
};

// Get event type color
export const getEventTypeColor = (type) => {
  const colors = {
    Workshop: '#8B5CF6',
    Lecture: '#3B82F6',
    Meetup: '#10B981',
    Conference: '#EF4444',
    SalesSession: '#F59E0B',
    Other: '#6B7280'
  };
  return colors[type] || colors.Other;
};

// Get country flag emoji
export const getCountryFlag = (countryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

// Generate ICS file content for single event
export const generateICSForEvent = (event) => {
  const start = format(parseISO(event.start), "yyyyMMdd'T'HHmmss");
  const end = event.end 
    ? format(parseISO(event.end), "yyyyMMdd'T'HHmmss")
    : start;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Flivv//Events Calendar//EN
BEGIN:VEVENT
UID:${event.id}
DTSTAMP:${format(new Date(), "yyyyMMdd'T'HHmmss'Z'")}
DTSTART:${start}
DTEND:${end}
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
LOCATION:${event.venue}, ${event.city}, ${event.countryLabel}
URL:${window.location.origin}/events/${event.id}
END:VEVENT
END:VCALENDAR`;
};

// Generate Google Calendar link
export const generateGoogleCalendarLink = (event) => {
  const start = format(parseISO(event.start), "yyyyMMdd'T'HHmmss");
  const end = event.end 
    ? format(parseISO(event.end), "yyyyMMdd'T'HHmmss")
    : start;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: `${event.venue}, ${event.city}, ${event.countryLabel}`,
    ctz: 'UTC'
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Calculate days until event
export const daysUntilEvent = (eventDateString) => {
  const eventDate = parseISO(eventDateString);
  const today = new Date();
  return differenceInDays(eventDate, today);
};

// Filter events by date range
export const filterEventsByDateRange = (events, range) => {
  const now = new Date();
  let endDate;

  switch (range) {
    case '7':
      endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      break;
    case '30':
      endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      break;
    case '90':
      endDate = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
      break;
    default:
      return events;
  }

  return events.filter(event => {
    const eventDate = parseISO(event.start);
    return eventDate >= now && eventDate <= endDate;
  });
};