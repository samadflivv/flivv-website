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
export default function PlotBottomSheet({ plot, onSave, onClose }) {
  const sheetRef = useRef(null);
  useClickOutsideDeselect(sheetRef, onClose, Boolean(plot));

  if (!plot) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop — tapping it closes the sheet, same as clicking outside. */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} aria-hidden="true" />

      <div
        ref={sheetRef}
        data-plot-panel="true"
        className="absolute inset-x-0 bottom-0 max-h-[75vh] overflow-y-auto rounded-t-2xl border-t border-gray-200 bg-white p-4 pb-6 shadow-2xl animate-[slideUp_180ms_ease-out]"
      >
        {/* Swipe-friendly affordance + explicit close button */}
        <div className="mb-2 flex items-center justify-between">
          <span className="mx-auto block h-1.5 w-10 rounded-full bg-gray-300" />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>

        <PlotEditorForm plot={plot} onSave={onSave} onCancel={onClose} compact />
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(16px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
