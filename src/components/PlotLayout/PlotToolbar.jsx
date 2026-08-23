'use client';

import { useState } from 'react';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'available', label: 'Available' },
  { value: 'sold', label: 'Sold' },
  { value: 'resale', label: 'Resale' },
  { value: 'mortgage', label: 'Mortgage' },
];

/**
 * @param {Object} props
 * @param {string} props.searchTerm
 * @param {(value: string) => void} props.onSearchChange
 * @param {string|null|undefined} props.searchResultId - undefined = searched, no match
 * @param {string} props.statusFilter
 * @param {(value: string) => void} props.onStatusFilterChange
 * @param {boolean} props.bulkMode
 * @param {() => void} props.onToggleBulkMode
 */
export default function PlotToolbar({
  searchTerm,
  onSearchChange,
  searchResultId,
  statusFilter,
  onStatusFilterChange,
  bulkMode,
  onToggleBulkMode,
}) {
  const [localValue, setLocalValue] = useState(searchTerm);
  const notFound = localValue.trim().length > 0 && searchResultId === undefined;

  function handleSubmit(e) {
    e.preventDefault();
    onSearchChange(localValue);
  }

  return (
    <div className="flex flex-col gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <form onSubmit={handleSubmit} className="relative w-full sm:w-64">
        <input
          type="text"
          inputMode="search"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder="Search plot number..."
          className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-800 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200"
        />
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          viewBox="0 0 16 16"
          fill="none"
        >
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        {notFound && (
          <p className="absolute left-0 top-full mt-1 text-xs text-red-500">No plot matches &ldquo;{localValue}&rdquo;.</p>
        )}
      </form>

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => {
          const active = statusFilter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => onStatusFilterChange(f.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                active
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          );
        })}
        <span className="mx-1 hidden h-5 w-px bg-gray-200 sm:block" />
        <button
          type="button"
          onClick={onToggleBulkMode}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
            bulkMode ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-200' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {bulkMode ? 'Exit select' : 'Select multiple'}
        </button>
      </div>
    </div>
  );
}
