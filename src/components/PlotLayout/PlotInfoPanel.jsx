'use client';

import { useRef } from 'react';
import { useClickOutsideDeselect } from '../../hooks/useClickOutside';
import PlotEditorForm from './PlotEditorForm';

/**
 * @param {Object} props
 * @param {import('../../data/plotDefaults').Plot|null} props.plot
 * @param {(patch: object) => void} props.onSave
 * @param {() => void} props.onClose
 */
export default function PlotInfoPanel({ plot, onSave, onClose }) {
  const panelRef = useRef(null);
  useClickOutsideDeselect(panelRef, onClose, Boolean(plot));

  if (!plot) return null;

  return (
    <div
      ref={panelRef}
      data-plot-panel="true"
      className="absolute right-4 top-4 z-50 hidden w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl md:block"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
      <PlotEditorForm plot={plot} onSave={onSave} onCancel={onClose} />
    </div>
  );
}
