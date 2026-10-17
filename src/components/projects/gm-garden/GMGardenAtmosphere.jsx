'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Shared decorative primitives for the GM Garden page.
//
// Everything here is aria-hidden and pointer-events-none. These layers replace
// the stock photography the design brief asked us to remove, so the premium
// feel comes from light, geometry and texture instead of images.
//
// Performance notes: the grain is a single static SVG filter (rasterised once
// by the browser and reused), the arcs are static hairlines, and only the
// aurora blobs animate — with transform-only keyframes so they stay on the
// compositor and never repaint.
// ---------------------------------------------------------------------------

/**
 * Film-grain texture. Kept at a very low opacity so it reads as paper stock
 * rather than noise.
 */
export function GrainOverlay({ className = '', opacity = 0.055 }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity, mixBlendMode: 'overlay' }}
    >
      <filter id={`gm-grain-${uid}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#gm-grain-${uid})`} />
    </svg>
  );
}

/**
 * Hairline architectural grid. The default radial mask fades the lines out
 * towards the edges so the texture never competes with the content on top.
 *
 * @param {'light'|'dark'} tone - which surface the grid sits on
 * @param {number} tile - grid cell size in px
 */
export function FineGrid({ tile = 80, tone = 'dark', fade = 'radial', className = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const stroke = tone === 'dark' ? 'rgba(201, 166, 107, 0.16)' : 'rgba(156, 122, 60, 0.14)';
  const masked = fade === 'radial';

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern id={`gm-grid-${uid}`} width={tile} height={tile} patternUnits="userSpaceOnUse">
          <path d={`M ${tile} 0 L 0 0 0 ${tile}`} fill="none" stroke={stroke} strokeWidth="1" />
        </pattern>
        {masked && (
          <>
            <radialGradient id={`gm-grid-fade-${uid}`} cx="50%" cy="40%" r="72%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="65%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <mask id={`gm-grid-mask-${uid}`}>
              <rect width="100%" height="100%" fill={`url(#gm-grid-fade-${uid})`} />
            </mask>
          </>
        )}
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#gm-grid-${uid})`}
        mask={masked ? `url(#gm-grid-mask-${uid})` : undefined}
      />
    </svg>
  );
}

/**
 * Slow-drifting light field built from blurred radial gradients. Each blob runs
 * a 20-35s loop so the movement is felt rather than watched.
 */
export function AuroraField({ className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute -left-[18%] -top-[22%] h-[74vmax] w-[74vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,166,107,0.30),transparent_62%)] blur-[90px]"
        style={{ willChange: 'transform' }}
        animate={{ x: ['0%', '10%', '-5%', '0%'], y: ['0%', '8%', '-4%', '0%'], scale: [1, 1.14, 0.95, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[26%] -right-[14%] h-[62vmax] w-[62vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(122,98,48,0.34),transparent_64%)] blur-[80px]"
        style={{ willChange: 'transform' }}
        animate={{ x: ['0%', '-8%', '6%', '0%'], y: ['0%', '-7%', '5%', '0%'], scale: [1, 0.92, 1.1, 1] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[38%] top-[24%] hidden h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(231,220,195,0.13),transparent_66%)] blur-[70px] sm:block"
        style={{ willChange: 'transform' }}
        animate={{ x: ['0%', '6%', '-6%', '0%'], y: ['0%', '6%', '-4%', '0%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/**
 * Concentric surveyor's hairlines. Deliberately static: the rings are
 * rotation-invariant, so animating them buys nothing but a large extra
 * composited layer.
 */
export function HairlineArcs({ className = '' }) {
  const rings = [
    { r: 250, o: 0.13 },
    { r: 360, o: 0.1 },
    { r: 480, o: 0.075 },
    { r: 610, o: 0.055 },
  ];

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg viewBox="0 0 1200 1200" className="absolute inset-0 m-auto h-[150vmax] w-[150vmax]" fill="none">
        {rings.map((ring) => (
          <circle
            key={ring.r}
            cx="600"
            cy="600"
            r={ring.r}
            stroke="#C9A66B"
            strokeOpacity={ring.o}
            strokeWidth="1"
          />
        ))}
        <circle
          cx="600"
          cy="600"
          r="740"
          stroke="#C9A66B"
          strokeOpacity="0.05"
          strokeWidth="1"
          strokeDasharray="2 12"
        />
      </svg>
    </div>
  );
}
