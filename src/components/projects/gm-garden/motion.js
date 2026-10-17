// Shared framer-motion presets for GM Garden sections.
// Reveals only translate content; they never start hidden, so content stays visible
// before hydration and when JavaScript or animation is unavailable.

export const EASE_OUT = [0.22, 1, 0.36, 1];

export const revealUp = {
  initial: { y: 16 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, ease: EASE_OUT },
};

// Same reveal, tuned for tall sections where waiting for 25% visibility is too late.
export const revealUpLoose = {
  initial: { y: 24 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.9, ease: EASE_OUT },
};

/**
 * Builds a staggered reveal for one item in a list. Translate-only for the same
 * reason as `revealUp` — the item is never invisible if the script never runs.
 *
 * @param {number} delay - seconds to offset from its siblings
 * @param {number} [distance] - starting travel in px
 */
export function staggerItem(delay = 0, distance = 18) {
  return {
    initial: { y: distance },
    whileInView: { y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay, ease: EASE_OUT },
  };
}

/**
 * Draws an SVG path on when it scrolls into view. `pathLength` is safe to animate
 * even before hydration because a full path is the natural resting state.
 * Do not combine it with a hand-written `strokeDasharray` — framer-motion drives
 * the dash attributes itself whenever `pathLength` is present.
 */
export const drawIn = (delay = 0, duration = 1.8) => ({
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration, delay, ease: EASE_OUT },
});
