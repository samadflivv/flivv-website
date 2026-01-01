// components/EventCalendar.jsx
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Search, Plus, Calendar as CalendarIcon, MapPin, Clock, Users, ExternalLink, X, Edit, Trash2 } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, isToday, addMonths, subMonths, getDay, startOfWeek, endOfWeek, addDays, isPast } from 'date-fns';

// API base URL
const API_BASE = '/api/events';

export default function EventCalendar({ enableAdmin = true }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from API
  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(API_BASE, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }
      
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Calculate calendar days
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    
    return days.map(day => ({
      date: day,
      isCurrentMonth: isSameMonth(day, currentDate),
      isToday: isToday(day),
      isSelected: selectedDate && isSameDay(day, selectedDate),
      isPast: isPast(day) && !isToday(day),
      events: events.filter(event => {
        try {
          const eventDate = parseISO(event.start);
          return isSameDay(eventDate, day);
        } catch {
          return false;
        }
      })
    }));
  }, [currentDate, events, selectedDate]);

  // Filter events
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(event => 
        event.title?.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.organizer?.toLowerCase().includes(query) ||
        event.venue?.toLowerCase().includes(query) ||
        (event.tags && event.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Filter by selected date
    if (selectedDate) {
      result = result.filter(event => {
        try {
          return isSameDay(parseISO(event.start), selectedDate);
        } catch {
          return false;
        }
      });
    }

    return result;
  }, [events, searchQuery, selectedDate]);

  // Handlers
  const handleDateClick = useCallback((date) => {
    if (isPast(date) && !isToday(date)) return;
    setSelectedDate(date);
  }, []);

  const handleMonthChange = useCallback((direction) => {
    setCurrentDate(prev => 
      direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1)
    );
  }, []);

  const clearDateFilter = useCallback(() => {
    setSelectedDate(null);
  }, []);

  // Event CRUD operations
  const handleAddEvent = useCallback(async (eventData) => {
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create event');
      }

      await fetchEvents();
      setIsAddEventModalOpen(false);
    } catch (err) {
      console.error('Error creating event:', err);
      alert(err.message || 'Failed to create event. Please try again.');
    }
  }, [fetchEvents]);

  const handleEditEvent = useCallback(async (eventId, updates) => {
    try {
      const response = await fetch(`${API_BASE}/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update event');
      }

      await fetchEvents();
      setIsEditEventModalOpen(false);
      setEditingEvent(null);
    } catch (err) {
      console.error('Error updating event:', err);
      alert(err.message || 'Failed to update event. Please try again.');
    }
  }, [fetchEvents]);

  const handleDeleteEvent = useCallback(async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      await fetchEvents();
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Failed to delete event. Please try again.');
    }
  }, [fetchEvents]);

  const handleEditClick = useCallback((event) => {
    setEditingEvent(event);
    setIsEditEventModalOpen(true);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading events</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchEvents}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03045e] py-35 lg:px-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b lg:rounded-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Events Calendar</h1>
              {/* <p className="text-gray-600 mt-1">View and manage upcoming events</p> */}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {enableAdmin && (
                <button
                  onClick={() => setIsAddEventModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus size={20} />
                  Add Event
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Calendar */}
          <div className="lg:w-5/12">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => handleMonthChange('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-bold text-gray-900">
                  {format(currentDate, 'MMMM yyyy')}
                </h2>
                <button
                  onClick={() => handleMonthChange('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Week Days */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day) => (
                  <button
                    key={day.date.toString()}
                    onClick={() => handleDateClick(day.date)}
                    disabled={day.isPast}
                    className={`
                      relative h-12 md:h-14 rounded-lg flex flex-col items-center justify-center
                      transition-all duration-200
                      ${!day.isCurrentMonth ? 'text-gray-300' : day.isPast ? 'text-gray-400' : 'text-gray-900'}
                      ${day.isToday && !day.isSelected ? 'bg-blue-50 border border-blue-200' : ''}
                      ${day.isSelected ? 'bg-blue-600 text-white' : ''}
                      ${!day.isPast && !day.isSelected ? 'hover:bg-gray-100' : ''}
                      ${day.isPast ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    `}
                  >
                    <span className={`text-sm font-medium ${day.isSelected ? 'text-white' : ''}`}>
                      {format(day.date, 'd')}
                    </span>
                    
                    {/* Event Dots */}
                    {!day.isPast && day.events.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1 mt-1">
                        {day.events.slice(0, 3).map((event, idx) => (
                          <div
                            key={idx}
                            className="w-1.5 h-1.5 rounded-full bg-blue-500"
                          />
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Selected Date Info */}
              {selectedDate && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Selected Date</p>
                      <p className="font-medium">{format(selectedDate, 'MMMM d, yyyy')}</p>
                    </div>
                    <button
                      onClick={clearDateFilter}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Events List */}
          <div className="lg:w-7/12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Events Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Upcoming Events
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        ({filteredEvents.length} found)
                      </span>
                    </h2>
                    {selectedDate && (
                      <p className="text-sm text-gray-600 mt-1">
                        Showing events for {format(selectedDate, 'MMMM d, yyyy')}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Events List */}
              <div className="divide-y divide-gray-100">
                {filteredEvents.length === 0 ? (
                  <div className="p-12 text-center">
                    <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No events found</h3>
                    <p className="mt-2 text-gray-600">
                      {searchQuery || selectedDate
                        ? "Try adjusting your search or date filter"
                        : "No upcoming events scheduled"}
                    </p>
                    {enableAdmin && (
                      <button
                        onClick={() => setIsAddEventModalOpen(true)}
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Plus size={18} />
                        Add Your First Event
                      </button>
                    )}
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      enableAdmin={enableAdmin}
                      onEdit={() => handleEditClick(event)}
                      onDelete={() => handleDeleteEvent(event.id)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {isAddEventModalOpen && (
        <AddEditEventModal
          isOpen={isAddEventModalOpen}
          onClose={() => setIsAddEventModalOpen(false)}
          onSave={handleAddEvent}
          mode="add"
        />
      )}

      {/* Edit Event Modal */}
      {isEditEventModalOpen && editingEvent && (
        <AddEditEventModal
          isOpen={isEditEventModalOpen}
          onClose={() => {
            setIsEditEventModalOpen(false);
            setEditingEvent(null);
          }}
          onSave={(updates) => handleEditEvent(editingEvent.id, updates)}
          mode="edit"
          initialData={editingEvent}
        />
      )}
    </div>
  );
}

// Event Card Component
function EventCard({ event, enableAdmin, onEdit, onDelete }) {
  let eventDate;
  let eventEnd = null;
  
  try {
    eventDate = parseISO(event.start);
    if (event.end) {
      eventEnd = parseISO(event.end);
    }
  } catch {
    eventDate = new Date();
  }

  const getTypeColor = (type) => {
    const colors = {
      Workshop: 'border-l-purple-500',
      Lecture: 'border-l-blue-500',
      Meetup: 'border-l-green-500',
      Conference: 'border-l-red-500',
      SalesSession: 'border-l-orange-500',
      Other: 'border-l-gray-500'
    };
    return colors[type] || colors.Other;
  };

  const handleRedirect = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`border-l-4 ${getTypeColor(event.type)} bg-white p-6 hover:bg-gray-50 transition-colors`}>
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Date Badge */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">
              {format(eventDate, 'd')}
            </div>
            <div className="text-xs font-medium">
              {format(eventDate, 'MMM').toUpperCase()}
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="flex-grow">
          {/* Tags and Admin Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {event.countryLabel || event.country}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {event.type}
              </span>
            </div>
            
            {enableAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={onEdit}
                  className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit event"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={onDelete}
                  className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete event"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {event.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-2">
            {event.description}
          </p>

          {/* Details */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{event.venue}, {event.city}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>
                {format(eventDate, 'h:mm a')}
                {eventEnd && ` - ${format(eventEnd, 'h:mm a')}`}
              </span>
            </div>
            
            {event.capacity && (
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>{event.capacity} spots</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {event.rsvpUrl && (
              <button
                onClick={() => handleRedirect(event.rsvpUrl)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                Register Now
                <ExternalLink size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add/Edit Event Modal Component
function AddEditEventModal({ isOpen, onClose, onSave, mode = 'add', initialData = null }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    country: 'SA',
    countryLabel: 'KSA',
    city: '',
    venue: '',
    type: 'Workshop',
    tags: [],
    rsvpUrl: '',
    organizer: 'Flivv',
    capacity: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Helper to format date for datetime-local input
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Get current datetime for min attribute
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Initialize form
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        start: formatDateForInput(initialData.start),
        end: initialData.end ? formatDateForInput(initialData.end) : '',
        country: initialData.country || 'SA',
        countryLabel: initialData.countryLabel || 'KSA',
        city: initialData.city || '',
        venue: initialData.venue || '',
        type: initialData.type || 'Workshop',
        tags: initialData.tags || [],
        rsvpUrl: initialData.rsvpUrl || '',
        organizer: initialData.organizer || 'Flivv',
        capacity: initialData.capacity || ''
      });
    } else {
      // Set default date to tomorrow, 10 AM for add mode
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);
      
      const formattedDate = formatDateForInput(tomorrow.toISOString());
      
      setFormData({
        title: '',
        description: '',
        start: formattedDate,
        end: '',
        country: 'SA',
        countryLabel: 'KSA',
        city: '',
        venue: '',
        type: 'Workshop',
        tags: [],
        rsvpUrl: '',
        organizer: 'Flivv',
        capacity: ''
      });
    }
    setError('');
  }, [mode, initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Validate date is not in the past
      const startDate = new Date(formData.start);
      if (startDate < new Date()) {
        setError('Event date cannot be in the past');
        setIsSubmitting(false);
        return;
      }

      await onSave(formData);
    } catch (err) {
      console.error('Error saving event:', err);
      setError(err.message || 'Failed to save event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update country label when country changes
    if (name === 'country') {
      const countryLabels = {
        SA: 'KSA',
        QA: 'Qatar',
        OM: 'Oman',
        AE: 'UAE',
        BH: 'Bahrain',
        KW: 'Kuwait',
        Hyd: 'Hyderabad'
      };
      setFormData(prev => ({
        ...prev,
        countryLabel: countryLabels[value] || value
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {mode === 'add' ? 'Add New Event' : 'Edit Event'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
                disabled={isSubmitting}
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  placeholder="Enter event title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  placeholder="Describe the event..."
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    name="start"
                    value={formData.start}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    min={getCurrentDateTime()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="end"
                    value={formData.end}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    min={formData.start}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  >
                    <option value="SA">Saudi Arabia (KSA)</option>
                    <option value="QA">Qatar</option>
                    <option value="OM">Oman</option>
                    <option value="AE">UAE</option>
                    <option value="BH">Bahrain</option>
                    <option value="KW">Kuwait</option>
                    <option value="India">India</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="Enter city"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue *
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  placeholder="Enter venue name"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                >
                  <option value="Meetup">Sales Meet</option>
                  <option value="SalesSession">Sales Session</option>
                  <option value="Other">Event</option>
                </select>
              </div>

              {/* Capacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity (optional)
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  placeholder="Number of attendees"
                />
              </div>

              {/* RSVP URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration URL
                </label>
                <input
                  type="url"
                  name="rsvpUrl"
                  value={formData.rsvpUrl}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  placeholder="https://example.com/register"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {mode === 'add' ? 'Creating...' : 'Updating...'}
                  </>
                ) : (
                  mode === 'add' ? 'Create Event' : 'Update Event'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}