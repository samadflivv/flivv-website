'use client';

import { useToast } from '../../hooks/useToast';

const TYPE_STYLES = {
  success: 'bg-gray-900 text-white',
  info: 'bg-gray-700 text-white',
  error: 'bg-red-600 text-white',
};

export default function PlotToast() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex flex-col items-center gap-2 sm:bottom-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-3 rounded-full px-4 py-2 text-sm shadow-lg ${
            TYPE_STYLES[t.type] || TYPE_STYLES.success
          }`}
        >
          <span>{t.message}</span>
          <button
            type="button"
            onClick={() => dismiss(t.id)}
            aria-label="Dismiss"
            className="text-white/70 transition hover:text-white"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
