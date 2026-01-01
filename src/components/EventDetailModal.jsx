// EventDetailModal.jsx
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar as CalendarIcon, Clock, Users, Share2, Download, ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import ReactCountryFlag from 'react-country-flag';

const EventDetailModal = ({ event, isOpen, onClose, onRegister }) => {
  const modalRef = useRef(null);
  const eventDate = parseISO(event.start);
  const eventEnd = event.end ? parseISO(event.end) : null;

  // Focus trap and ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
DTSTART:${format(eventDate, "yyyyMMdd'T'HHmmss")}
DTEND:${eventEnd ? format(eventEnd, "yyyyMMdd'T'HHmmss") : format(eventDate, "yyyyMMdd'T'HHmmss")}
LOCATION:${event.venue}, ${event.address || event.city}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateGoogleCalendarLink = () => {
    const start = format(eventDate, "yyyyMMdd'T'HHmmss");
    const end = eventEnd ? format(eventEnd, "yyyyMMdd'T'HHmmss") : start;
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.venue + (event.address ? ', ' + event.address : ''))}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal */}
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              {/* Hero Image */}
              {event.images && event.images.length > 0 && (
                <div className="h-64 lg:h-80 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                  <img
                    src={event.images[0]}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}

              <div className="p-6 lg:p-8">
                {/* Event Header */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                    <ReactCountryFlag 
                      countryCode={event.country.toLowerCase()}
                      svg
                      style={{ width: '20px', height: '20px' }}
                    />
                    {event.countryLabel || event.country}
                  </span>
                  
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
                    {event.type}
                  </span>
                  
                  {event.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title and Date */}
                <div className="mb-8">
                  <h2 id="modal-title" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {event.title}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={20} />
                      <span className="font-medium">
                        {format(eventDate, 'EEEE, MMMM d, yyyy')}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock size={20} />
                      <span className="font-medium">
                        {format(eventDate, 'h:mm a')}
                        {eventEnd && ` - ${format(eventEnd, 'h:mm a')}`}
                      </span>
                    </div>
                    
                    {event.capacity && (
                      <div className="flex items-center gap-2">
                        <Users size={20} />
                        <span className="font-medium">
                          {event.capacity} spots available
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Venue</h4>
                      <p className="text-gray-700">
                        {event.venue}
                        {event.address && `, ${event.address}`}
                        {event.city && `, ${event.city}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About This Event</h3>
                  <div 
                    className="prose prose-lg max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                </div>

                {/* Organizer */}
                {event.organizer && (
                  <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Organized by</h4>
                    <p className="text-lg text-gray-700">{event.organizer}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={generateICS}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Download size={18} />
                      Add to Calendar (.ics)
                    </button>
                    
                    <a
                      href={generateGoogleCalendarLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <CalendarIcon size={18} />
                      Google Calendar
                    </a>
                    
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: event.title,
                            text: event.description,
                            url: window.location.href
                          });
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Share2 size={18} />
                      Share
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={onClose}
                      className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                    >
                      Close
                    </button>
                    
                    <button
                      onClick={() => {
                        if (event.rsvpUrl) {
                          window.open(event.rsvpUrl, '_blank', 'noopener,noreferrer');
                        } else {
                          onRegister(event);
                        }
                      }}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
                    >
                      Register Now
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default EventDetailModal;