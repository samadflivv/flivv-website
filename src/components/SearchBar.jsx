// SearchBar.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from 'lodash';

const SearchBar = ({ value, onChange, placeholder = "Search events..." }) => {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Debounced search
  const debouncedOnChange = useCallback(
    debounce((searchValue) => {
      onChange(searchValue);
    }, 300),
    [onChange]
  );

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    debouncedOnChange(localValue);
    return () => debouncedOnChange.cancel();
  }, [localValue, debouncedOnChange]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  const handleRecentSearch = (searchTerm) => {
    setLocalValue(searchTerm);
    onChange(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear();
      e.target.blur();
    }
  };

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('event-search-history');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save to recent searches
  useEffect(() => {
    if (value.trim() && !recentSearches.includes(value)) {
      const newSearches = [value, ...recentSearches.slice(0, 4)];
      setRecentSearches(newSearches);
      localStorage.setItem('event-search-history', JSON.stringify(newSearches));
    }
  }, [value]);

  return (
    <div className="relative w-full max-w-md">
      <div className={`
        relative flex items-center border rounded-xl transition-all duration-200
        ${isFocused 
          ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20' 
          : 'border-gray-300 hover:border-gray-400'
        }
      `}>
        <Search 
          className={`absolute left-3 ${isFocused ? 'text-blue-500' : 'text-gray-400'}`} 
          size={20} 
        />
        
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-transparent outline-none text-gray-900 placeholder-gray-500"
          aria-label="Search events"
        />
        
        <AnimatePresence>
          {localValue && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Search Suggestions */}
      <AnimatePresence>
        {isFocused && recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearch(search)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 group"
                >
                  <Search size={16} className="text-gray-400 group-hover:text-blue-500" />
                  <span className="text-gray-700 group-hover:text-blue-600">{search}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;