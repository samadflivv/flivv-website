'use client';

import { useEffect } from 'react';

/**
 * Calls `onOutside` when the user clicks outside `ref`'s element — except
 * for clicks inside the plot layout viewport itself, which already manage
 * plot selection on their own (clicking a different plot, or clicking
 * empty layout space) and shouldn't be double-handled here.
 *
 * @param {React.RefObject<HTMLElement>} ref - the panel/sheet's root element
 * @param {() => void} onOutside
 * @param {boolean} [enabled]
 */
export function useClickOutsideDeselect(ref, onOutside, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    function handlePointerDown(e) {
      const panelEl = ref.current;
      if (!panelEl) return;
      if (panelEl.contains(e.target)) return; // click was inside the panel — ignore
      if (e.target.closest && e.target.closest('[data-plot-viewport]')) return; // layout handles itself
      onOutside();
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [ref, onOutside, enabled]);
}
