// FiltersSidebar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';

const FiltersSidebar = ({ 
  filters, 
  availableFilters, 
  onFilterChange, 
  onClearFilters,
  selectedDate,
  onDateClick 
}) => {
  const hasActiveFilters = 
    filters.countries.length > 0 ||
    filters.cities.length > 0 ||
    filters.types.length > 0 ||
    filters.tags.length > 0 ||
    filters.dateRange !== 'all' ||
    selectedDate;

  const handleQuickDateRange = (days) => {
    onFilterChange('dateRange', days.toString());
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter size={20} />
          Filters
        </h3>
        
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <X size={16} />
            Clear all
          </button>
        )}
      </div>

      {/* Quick Date Filters */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Date Range</h4>
        <div className="flex flex-wrap gap-2">
          {['7', '30', '90', 'all'].map((days) => (
            <button
              key={days}
              onClick={() => handleQuickDateRange(days)}
              className={`
                px-3 py-1.5 text-sm rounded-lg transition-colors
                ${filters.dateRange === days 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {days === 'all' ? 'All Dates' : `Next ${days} Days`}
            </button>
          ))}
        </div>
      </div>

      {/* Countries Filter */}
      {availableFilters.countries && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Countries</h4>
          <div className="space-y-2">
            {availableFilters.countries.map(country => (
              <label key={country.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.countries.includes(country.value)}
                  onChange={() => onFilterChange('countries', country.value)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">
                  {country.label}
                </span>
                <span className="text-xs text-gray-400">
                  ({country.count})
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Event Types Filter */}
      {availableFilters.eventTypes && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Event Types</h4>
          <div className="space-y-2">
            {availableFilters.eventTypes.map(type => (
              <label key={type.value} className="flex items-center gap-3 cursor-pointer group">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: type.color }}
                />
                <input
                  type="checkbox"
                  checked={filters.types.includes(type.value)}
                  onChange={() => onFilterChange('types', type.value)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">
                  {type.label}
                </span>
                <span className="text-xs text-gray-400">
                  ({type.count})
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Cities Filter */}
      {availableFilters.cities && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Cities</h4>
          <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
            {availableFilters.cities.map(city => (
              <label key={city.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.cities.includes(city.value)}
                  onChange={() => onFilterChange('cities', city.value)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">
                  {city.label}
                </span>
                <span className="text-xs text-gray-400">
                  ({city.count})
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Tags Filter */}
      {availableFilters.tags && availableFilters.tags.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {availableFilters.tags.map(tag => (
              <button
                key={tag.value}
                onClick={() => onFilterChange('tags', tag.value)}
                className={`
                  px-3 py-1.5 text-sm rounded-full transition-colors
                  ${filters.tags.includes(tag.value)
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {tag.label}
                <span className="ml-1 text-xs opacity-75">
                  ({tag.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 pt-6 border-t border-gray-200"
        >
          <h4 className="text-sm font-medium text-gray-700 mb-3">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {filters.countries.map(country => {
              const countryData = availableFilters.countries?.find(c => c.value === country);
              return (
                <span
                  key={country}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {countryData?.label || country}
                  <button
                    onClick={() => onFilterChange('countries', country)}
                    className="hover:text-blue-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              );
            })}
            
            {filters.types.map(type => (
              <span
                key={type}
                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                {type}
                <button
                  onClick={() => onFilterChange('types', type)}
                  className="hover:text-purple-900"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            
            {filters.dateRange !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                Next {filters.dateRange} Days
                <button
                  onClick={() => onFilterChange('dateRange', 'all')}
                  className="hover:text-green-900"
                >
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FiltersSidebar;