// EventsList.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';
import { useInView } from 'framer-motion';

const EventsList = ({ events, onEventClick, activeEventId }) => {
  const containerRef = useRef(null);
  
  // Scroll to active event if it's not in view
  useEffect(() => {
    if (activeEventId && containerRef.current) {
      const activeElement = containerRef.current.querySelector(`[data-event-id="${activeEventId}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeEventId]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="divide-y divide-gray-100"
    >
      {events.map((event, index) => {
        const isActive = event.id === activeEventId;
        const ref = useRef(null);
        const isInView = useInView(ref, { margin: "-50px 0px -50px 0px" });

        return (
          <motion.div
            key={event.id}
            ref={ref}
            variants={itemVariants}
            data-event-id={event.id}
            className={`
              relative transition-all duration-300
              ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'}
              ${isInView ? 'opacity-100' : 'opacity-60'}
            `}
          >
            <EventCard
              event={event}
              onClick={() => onEventClick(event.id)}
              isActive={isActive}
              priority={index < 3} // Lazy load images after first 3
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default EventsList;