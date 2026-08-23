'use client';

import { useState } from 'react';
import { PLOT_STATUS, PLOT_STATUS_LABELS } from '../../data/plotDefaults';

const STATUS_OPTIONS = [PLOT_STATUS.AVAILABLE, PLOT_STATUS.SOLD, PLOT_STATUS.RESALE];

/**
 * @param {Object} props
 * @param {Set<string>} props.selectedIds
 * @param {() => void} props.onClear
 * @param {(patch: object) => void} props.onApply
 * @param {() => void} props.onExitBulkMode
 */
export default function PlotBulkBar({ selectedIds, onClear, onApply, onExitBulkMode }) {
  const [pendingPatch, setPendingPatch] = useState(null); // { label, patch } awaiting confirmation
  const count = selectedIds.size;

  function requestStatus(status) {
    setPendingPatch({ label: `mark ${count} plot${count === 1 ? '' : 's'} as ${PLOT_STATUS_LABELS[status]}`, patch: { status } });
  }

  function requestMortgage(mortgage) {
    setPendingPatch({
      label: `${mortgage ? 'flag' : 'unflag'} ${count} plot${count === 1 ? '' : 's'} as mortgage`,
      patch: { mortgage },
    });
  }

  function confirm() {
    if (!pendingPatch) return;
    onApply(pendingPatch.patch);
    setPendingPatch(null);
  }

  return (
    <div className="absolute inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      {pendingPatch ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-700">
            Apply <span className="font-medium">{pendingPatch.label}</span>?
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPendingPatch(null)}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirm}
              className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800"
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-800">{count} selected</span>
            <button type="button" onClick={onClear} className="text-xs text-gray-400 underline hover:text-gray-600">
              Clear
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                disabled={count === 0}
                onClick={() => requestStatus(opt)}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {PLOT_STATUS_LABELS[opt]}
              </button>
            ))}
            <button
              type="button"
              disabled={count === 0}
              onClick={() => requestMortgage(true)}
              className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Mortgage on
            </button>
            <button
              type="button"
              disabled={count === 0}
              onClick={() => requestMortgage(false)}
              className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Mortgage off
            </button>
            <span className="mx-1 h-4 w-px bg-gray-200" />
            <button
              type="button"
              onClick={onExitBulkMode}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
