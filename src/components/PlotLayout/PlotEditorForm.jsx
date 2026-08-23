'use client';

import { useEffect, useState } from 'react';
import { PLOT_STATUS, PLOT_STATUS_LABELS } from '../../data/plotDefaults';

const STATUS_OPTIONS = [PLOT_STATUS.AVAILABLE, PLOT_STATUS.SOLD, PLOT_STATUS.RESALE];

const STATUS_BUTTON_ACTIVE = {
  [PLOT_STATUS.AVAILABLE]: 'bg-gray-900 text-white',
  [PLOT_STATUS.SOLD]: 'bg-[#E05252] text-white',
  [PLOT_STATUS.RESALE]: 'bg-[#3B82F6] text-white',
};

/**
 * @param {Object} props
 * @param {import('../../data/plotDefaults').Plot} props.plot
 * @param {(patch: object) => void} props.onSave
 * @param {() => void} props.onCancel
 * @param {boolean} [props.compact] - tighter spacing for the mobile sheet
 */
export default function PlotEditorForm({ plot, onSave, onCancel, compact = false }) {
  const [status, setStatus] = useState(plot.status);
  const [mortgage, setMortgage] = useState(plot.mortgage);
  const [area, setArea] = useState(plot.area || '');
  const [notes, setNotes] = useState(plot.notes || '');

  // Reset local form state whenever a different plot is selected.
  useEffect(() => {
    setStatus(plot.status);
    setMortgage(plot.mortgage);
    setArea(plot.area || '');
    setNotes(plot.notes || '');
  }, [plot.id, plot.status, plot.mortgage, plot.area, plot.notes]);

  const isDirty =
    status !== plot.status || mortgage !== plot.mortgage || area !== (plot.area || '') || notes !== (plot.notes || '');

  function handleSave() {
    onSave({ status, mortgage, area, notes });
  }

  const gap = compact ? 'gap-3' : 'gap-4';

  return (
    <div className={`flex flex-col ${gap}`}>
      <div className="flex items-baseline justify-between">
        <h3 className="text-base font-semibold text-gray-900">Plot {plot.plotNumber}</h3>
        {plot.lastUpdated && (
          <span className="text-[11px] text-gray-400">
            Updated {new Date(plot.lastUpdated).toLocaleDateString()}
          </span>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-500">Status</label>
        <div className="flex gap-1.5">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setStatus(opt)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                status === opt ? STATUS_BUTTON_ACTIVE[opt] : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {PLOT_STATUS_LABELS[opt]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
        <div>
          <p className="text-sm font-medium text-gray-800">Mortgage</p>
          <p className="text-xs text-gray-500">Independent of sale status</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={mortgage}
          onClick={() => setMortgage((v) => !v)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${mortgage ? 'bg-gray-900' : 'bg-gray-300'}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              mortgage ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-500">Area (sq yd)</label>
        <input
          type="text"
          inputMode="decimal"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="e.g. 240"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-500">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={compact ? 2 : 3}
          placeholder="Optional internal notes..."
          className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
        />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!isDirty}
          className="flex-1 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
