// AddEditEventModal.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Calendar, Clock, MapPin, Tag, Users, Globe } from 'lucide-react';
import CSVImportUtility from '../utils/CSVImportUtility';

const AddEditEventModal = ({ isOpen, onClose, onSave, onImportCSV }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    country: 'SA',
    countryLabel: 'KSA',
    city: '',
    venue: '',
    address: '',
    type: 'Workshop',
    tags: [],
    capacity: '',
    rsvpUrl: '',
    organizer: '',
    images: []
  });

  const [currentTag, setCurrentTag] = useState('');
  const [showCSVImport, setShowCSVImport] = useState(false);

  const eventTypes = [
    { value: 'Workshop', label: 'Workshop' },
    { value: 'Lecture', label: 'Lecture' },
    { value: 'Meetup', label: 'Meetup' },
    { value: 'Conference', label: 'Conference' },
    { value: 'SalesSession', label: 'Sales Session' },
    { value: 'Other', label: 'Other' }
  ];

  const countries = [
    { value: 'SA', label: 'Saudi Arabia (KSA)' },
    { value: 'QA', label: 'Qatar' },
    { value: 'OM', label: 'Oman' },
    { value: 'AE', label: 'UAE' },
    { value: 'BH', label: 'Bahrain' },
    { value: 'KW', label: 'Kuwait' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = () => {
    if (currentTag.trim() && !eventData.tags.includes(currentTag.trim())) {
      setEventData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setEventData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(eventData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Add New Event</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowCSVImport(false)}
                className={`px-4 py-2 rounded-lg ${!showCSVImport ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Manual Entry
              </button>
              <button
                onClick={() => setShowCSVImport(true)}
                className={`px-4 py-2 rounded-lg ${showCSVImport ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Upload size={18} className="inline mr-2" />
                CSV Import
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[70vh] p-6">
            {showCSVImport ? (
              <CSVImportUtility onImport={onImportCSV} />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={eventData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter event title"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Event Type *
                    </label>
                    <select
                      name="type"
                      value={eventData.type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {eventTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Calendar size={16} />
                      Start Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      name="start"
                      value={eventData.start}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Clock size={16} />
                      End Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      name="end"
                      value={eventData.end}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin size={20} />
                    Location Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Globe size={16} />
                        Country *
                      </label>
                      <select
                        name="country"
                        value={eventData.country}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {countries.map(country => (
                          <option key={country.value} value={country.value}>
                            {country.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={eventData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter city"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Venue *
                    </label>
                    <input
                      type="text"
                      name="venue"
                      value={eventData.venue}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter venue name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={eventData.address}
                      onChange={handleChange}
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Tag size={16} />
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {eventData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="hover:text-blue-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add a tag"
                    />
                    <button
                      type="button"
                      onClick={handleTagAdd}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Users size={16} />
                      Capacity
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={eventData.capacity}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Number of attendees"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Organizer *
                    </label>
                    <input
                      type="text"
                      name="organizer"
                      value={eventData.organizer}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Event organizer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    RSVP/Registration URL
                  </label>
                  <input
                    type="url"
                    name="rsvpUrl"
                    value={eventData.rsvpUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/register"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the event..."
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddEditEventModal;