// EventCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Clock, Share2, ExternalLink } from 'lucide-react';
import { format, parseISO, formatDistanceToNow } from 'date-fns';
import ReactCountryFlag from 'react-country-flag';

const EventCard = ({ event, onClick, isActive, priority = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const eventDate = parseISO(event.start);
  const eventEnd = event.end ? parseISO(event.end) : null;
  
  const countryCode = event.country?.toLowerCase() || 'sa';
  
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

  const getTypeLabel = (type) => {
    const labels = {
      Workshop: 'Workshop',
      Lecture: 'Lecture',
      Meetup: 'Meetup',
      Conference: 'Conference',
      SalesSession: 'Sales Session'
    };
    return labels[type] || type;
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href + `?event=${event.id}`,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href + `?event=${event.id}`);
      // Show toast notification
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        border-l-4 ${getTypeColor(event.type)}
        bg-white p-6 cursor-pointer transition-all duration-300
        ${isActive ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${event.title}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Date Badge */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white flex flex-col items-center justify-center">
            <div className="text-2xl lg:text-3xl font-bold">
              {format(eventDate, 'd')}
            </div>
            <div className="text-xs lg:text-sm font-medium">
              {format(eventDate, 'MMM').toUpperCase()}
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
              <ReactCountryFlag 
                countryCode={countryCode}
                svg
                style={{ width: '16px', height: '16px' }}
              />
              {event.countryLabel || event.country}
            </span>
            
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(event.type).replace('border-l-', 'bg-')} bg-opacity-10 text-gray-700`}>
              {getTypeLabel(event.type)}
            </span>
            
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(eventDate, { addSuffix: true })}
            </span>
          </div>

          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
            {event.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
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
        </div>

        {/* Action Buttons */}
        <div className="flex lg:flex-col items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare(e);
            }}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100"
            aria-label="Share event"
          >
            <Share2 size={20} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (event.rsvpUrl) {
                window.open(event.rsvpUrl, '_blank', 'noopener,noreferrer');
              }
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            aria-label="Register for event"
          >
            Register
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;