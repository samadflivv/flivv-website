// MonthCalendarGrid.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, endOfWeek, isSameMonth, isToday, isSameDay } from 'date-fns';

const MonthCalendarGrid = ({ 
  currentDate, 
  days, 
  onDateClick, 
  onMonthChange,
  selectedDate 
}) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventDotColor = (type) => {
    const colors = {
      Workshop: 'bg-purple-500',
      Lecture: 'bg-blue-500',
      Meetup: 'bg-green-500',
      Conference: 'bg-red-500',
      SalesSession: 'bg-orange-500',
      Other: 'bg-gray-500'
    };
    return colors[type] || colors.Other;
  };

  return (
    <div className="calendar-grid">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onMonthChange('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h3 className="text-xl font-bold text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h3>
        
        <button
          onClick={() => onMonthChange('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <motion.button
            key={day.date.toString()}
            initial={false}
            animate={{
              scale: day.isSelected ? 1.05 : 1,
              backgroundColor: day.isSelected 
                ? 'rgb(59 130 246)' 
                : day.isToday 
                  ? 'rgb(239 246 255)' 
                  : 'transparent'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDateClick(day.date)}
            className={`
              relative h-14 rounded-lg flex flex-col items-center justify-center
              transition-all duration-200
              ${!day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
              ${day.isToday && !day.isSelected ? 'bg-blue-50' : ''}
              ${day.isSelected ? 'text-white' : ''}
              hover:bg-blue-50 hover:text-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            `}
            aria-label={`Select date ${format(day.date, 'MMMM d, yyyy')}`}
            aria-selected={day.isSelected}
            role="gridcell"
          >
            {/* Date Number */}
            <span className={`text-sm font-semibold ${day.isSelected ? 'text-white' : ''}`}>
              {format(day.date, 'd')}
            </span>
            
            {/* Today Indicator */}
            {day.isToday && !day.isSelected && (
              <div className="w-1 h-1 bg-blue-500 rounded-full mt-1" />
            )}
            
            {/* Event Dots */}
            {day.events.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1 mt-1">
                {day.events.slice(0, 3).map((event, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full ${getEventDotColor(event.type)}`}
                    title={event.type}
                  />
                ))}
                {day.events.length > 3 && (
                  <span className="text-xs text-gray-500">+{day.events.length - 3}</span>
                )}
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MonthCalendarGrid;