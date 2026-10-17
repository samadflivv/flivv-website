'use client';

import { motion } from 'framer-motion';
import { FineGrid } from './GMGardenAtmosphere';
import { drawIn } from './motion';

// A surveyed plot boundary, its dashed setback line and the division between
// the two halves of the site. Purely decorative geometry — every figure the
// page needs is stated in text elsewhere on the page.
const PLOT_OUTLINE = 'M 96 152 L 316 120 L 348 392 L 128 426 Z';
const SETBACK_OUTLINE = 'M 122 176 L 294 147 L 322 368 L 152 400 Z';
const DIVISION_LINE = 'M 205 137 L 238 408';

const CORNER_TICKS = [
  { d: 'M 96 152 l 16 0 m -16 0 l 0 16', delay: 1.1 },
  { d: 'M 316 120 l -16 0 m 16 0 l 0 16', delay: 1.25 },
  { d: 'M 348 392 l -16 0 m 16 0 l 0 -16', delay: 1.4 },
  { d: 'M 128 426 l 16 0 m -16 0 l 0 -16', delay: 1.55 },
];

/**
 * Abstract site-plan artwork standing in for photography in the introduction
 * section. Replaces the raw hero image so the second section reads as premium
 * design rather than a repeated photograph.
 */
export default function GMGardenBlueprintArt({ caption, meta }) {
  return (
    <figure className="relative aspect-[4/5] w-full overflow-hidden border border-[#9C7A3C]/25 bg-[#EFEAE0]">
      <FineGrid tone="light" tile={40} className="opacity-70" />
      <div aria-hidden="true" className="absolute inset-5 border border-[#9C7A3C]/20" />

      <svg viewBox="0 0 420 520" fill="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {/* Surveyor's arcs, anchored off the top-left corner */}
        {[100, 165, 240, 320].map((r, index) => (
          <circle key={r} cx="0" cy="0" r={r} stroke="#9C7A3C" strokeOpacity={0.16 - index * 0.025} strokeWidth="1" />
        ))}

        <motion.path d={PLOT_OUTLINE} stroke="#9C7A3C" strokeWidth="1.4" {...drawIn(0, 1.8)} />
        <path d={SETBACK_OUTLINE} stroke="#C9A66B" strokeWidth="1" strokeDasharray="4 7" strokeOpacity="0.85" />
        <motion.path d={DIVISION_LINE} stroke="#9C7A3C" strokeOpacity="0.45" strokeWidth="1" {...drawIn(0.7, 1)} />
        <motion.path
          d="M 205 137 L 238 408"
          stroke="#9C7A3C"
          strokeOpacity="0.45"
          strokeWidth="1"
          transform="rotate(90 222 272)"
          {...drawIn(0.9, 1)}
        />

        {CORNER_TICKS.map((tick) => (
          <motion.path key={tick.d} d={tick.d} stroke="#9C7A3C" strokeWidth="1" {...drawIn(tick.delay, 0.6)} />
        ))}

        {/* Plot centroid marker */}
        <motion.g {...drawIn(1.3, 0.8)}>
          <path d="M 218 268 l -8 0 m 8 0 l 8 0 m -8 -8 l 0 8 m 0 -8 l 0 -8" stroke="#9C7A3C" strokeWidth="1" />
          <circle cx="218" cy="268" r="3" fill="#9C7A3C" fillOpacity="0.5" />
        </motion.g>

        {/* North arrow */}
        <g transform="translate(348 62)">
          <path d="M 0 -22 L 8 8 L 0 2 L -8 8 Z" fill="#9C7A3C" fillOpacity="0.7" />
          <text
            x="0"
            y="26"
            textAnchor="middle"
            fontSize="11"
            letterSpacing="2"
            fill="#9C7A3C"
            fillOpacity="0.8"
            fontFamily="var(--font-gm-serif, Georgia, serif)"
          >
            N
          </text>
        </g>
      </svg>

      {/* Stacks on narrow phones: the two tracked-out lines do not fit side by
          side in a ~320px column. */}
      <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 border-t border-[#9C7A3C]/25 bg-[#F7F4EC]/90 px-5 py-4 backdrop-blur-sm sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        {caption && (
          <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#9C7A3C] sm:text-[0.7rem] sm:tracking-[0.24em]">
            {caption}
          </span>
        )}
        {meta && (
          <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#15140F]/55 sm:text-right sm:text-[0.7rem] sm:tracking-[0.24em]">
            {meta}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
