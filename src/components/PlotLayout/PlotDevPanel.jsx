'use client';

import { useState } from 'react';

/**
 * @param {Object} props
 * @param {number} props.plotCount
 * @param {{id: string, plotNumber: string}[]} props.descriptors
 * @param {boolean} props.debugHighlight
 * @param {(next: boolean) => void} props.onToggleDebugHighlight
 * @param {() => void} props.onResetDemoData
 */
export default function PlotDevPanel({ plotCount, descriptors, debugHighlight, onToggleDebugHighlight, onResetDemoData }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute left-4 top-4 z-40 text-xs">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-white/90 px-3 py-1.5 font-mono text-gray-500 shadow ring-1 ring-gray-200 hover:text-gray-700"
      >
        {plotCount} plots detected
      </button>

      {open && (
        <div className="mt-2 w-56 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={debugHighlight}
              onChange={(e) => onToggleDebugHighlight(e.target.checked)}
            />
            Highlight all plot boundaries
          </label>
          <button
            type="button"
            onClick={() => console.table(descriptors)}
            className="mt-2 w-full rounded border border-gray-200 py-1 text-gray-500 hover:bg-gray-50"
          >
            Log plot IDs to console
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all plot statuses, mortgage flags, and notes to defaults?')) {
                onResetDemoData();
              }
            }}
            className="mt-1.5 w-full rounded border border-red-200 py-1 text-red-500 hover:bg-red-50"
          >
            Reset demo data
          </button>
        </div>
      )}
    </div>
  );
}
