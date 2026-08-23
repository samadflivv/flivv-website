'use client';

export default function PlotZoomControls({ onZoomIn, onZoomOut, onReset }) {
  const buttonClass =
    'flex h-9 w-9 items-center justify-center rounded-lg bg-white text-gray-700 shadow-md ring-1 ring-gray-200 transition hover:bg-gray-50 active:scale-95';

  return (
    <div className="absolute bottom-4 right-4 z-40 flex flex-col gap-2">
      <button type="button" aria-label="Zoom in" className={buttonClass} onClick={onZoomIn}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <button type="button" aria-label="Zoom out" className={buttonClass} onClick={onZoomOut}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <button type="button" aria-label="Reset view" className={buttonClass} onClick={onReset}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M13.5 8A5.5 5.5 0 1 1 8 2.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M13.5 3.5v3.2h-3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
