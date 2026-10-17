'use client';

// Branded placeholder used wherever a real photograph belongs.
// Renders a refined pattern instead of a blank or broken box, and is honest about
// being a placeholder rather than borrowing unrelated property photography.
export default function PlaceholderArt({ aspect = 'aspect-[4/5]', tone = 'light', label }) {
  const isDark = tone === 'dark';
  return (
    <div
      className={`relative w-full ${aspect} overflow-hidden ${isDark ? 'bg-[#211F1A]' : 'bg-[#EFEAE0]'}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <defs>
          <pattern id={`gm-diagonal-${tone}`} width="28" height="28" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="28" stroke={isDark ? '#3A372C' : '#D9CFB8'} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill={`url(#gm-diagonal-${tone})`} />
      </svg>
      <div className="absolute inset-6 border border-[#9C7A3C]/35" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#9C7A3C]" aria-hidden="true" />
      {label && (
        <p
          className={`absolute bottom-5 left-5 text-[0.65rem] font-medium uppercase tracking-[0.2em] ${
            isDark ? 'text-[#C9A66B]' : 'text-[#9C7A3C]'
          }`}
        >
          {label}
        </p>
      )}
    </div>
  );
}
