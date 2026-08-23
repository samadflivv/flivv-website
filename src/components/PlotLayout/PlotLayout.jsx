'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { detectPlotElements } from '../../lib/svgPlotUtils';
import { PLOT_STATUS_COLORS } from '../../data/plotDefaults';
import styles from './PlotLayout.module.css';

const STATUS_FILL_OPACITY = 0.6;
const AVAILABLE_FILL = '#000000';
const AVAILABLE_FILL_OPACITY = 0.182979; // matches the source SVG's baseline overlay tint
const HATCH_PATTERN_ID = 'flivv-mortgage-hatch';
const DEFS_MARKER_ATTR = 'data-flivv-defs-injected';

/**
 * Ensures the mortgage hatch <pattern> exists in the SVG's <defs>, exactly
 * once, no matter how many times this effect runs (guards against
 * React StrictMode's double-invoke in development).
 */
function ensureHatchPatternDefs(svgRoot) {
  let defs = svgRoot.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svgRoot.insertBefore(defs, svgRoot.firstChild);
  }
  if (defs.getAttribute(DEFS_MARKER_ATTR) === 'true') return;

  const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
  pattern.setAttribute('id', HATCH_PATTERN_ID);
  pattern.setAttribute('patternUnits', 'userSpaceOnUse');
  pattern.setAttribute('width', '6');
  pattern.setAttribute('height', '6');
  pattern.setAttribute('patternTransform', 'rotate(45)');

  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('width', '6');
  bg.setAttribute('height', '6');
  bg.setAttribute('fill', 'transparent');

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', '0');
  line.setAttribute('y1', '0');
  line.setAttribute('x2', '0');
  line.setAttribute('y2', '6');
  line.setAttribute('stroke', '#374151');
  line.setAttribute('stroke-width', '2');
  line.setAttribute('stroke-opacity', '0.55');

  pattern.appendChild(bg);
  pattern.appendChild(line);
  defs.appendChild(pattern);
  defs.setAttribute(DEFS_MARKER_ATTR, 'true');
}

/** Sets the base status fill on a plot's own path (never touches geometry). */
function applyStatusFill(pathEl, status) {
  const color = PLOT_STATUS_COLORS[status];
  if (color) {
    pathEl.style.fill = color;
    pathEl.style.fillOpacity = String(STATUS_FILL_OPACITY);
  } else {
    // available (or unknown) falls back to the source file's original subtle tint
    pathEl.style.fill = AVAILABLE_FILL;
    pathEl.style.fillOpacity = String(AVAILABLE_FILL_OPACITY);
  }
}

/** Creates/removes the diagonal-hatch overlay clone that sits on top of a mortgaged plot. */
function syncHatchOverlay(pathEl, mortgage) {
  const overlayId = `${pathEl.id}__hatch`;
  const existing = pathEl.parentNode.querySelector(`#${CSS.escape(overlayId)}`);

  if (mortgage && !existing) {
    const clone = pathEl.cloneNode(false);
    clone.removeAttribute('style');
    clone.setAttribute('id', overlayId);
    clone.setAttribute('fill', `url(#${HATCH_PATTERN_ID})`);
    clone.setAttribute('stroke', 'none');
    clone.classList.add(styles.hatchOverlay);
    pathEl.insertAdjacentElement('afterend', clone);
  } else if (!mortgage && existing) {
    existing.remove();
  }
}

/**
 * @param {Object} props
 * @param {string} props.svgUrl - path to the master SVG under /public
 * @param {Record<string, import('../../data/plotDefaults').Plot>} props.plots
 * @param {string|null} props.selectedPlotId
 * @param {(id: string) => void} props.onSelectPlot - called with null to deselect
 * @param {(descriptors: {id: string, plotNumber: string}[]) => void} props.onPlotsDetected
 * @param {(svgRoot: SVGSVGElement) => void} [props.onSvgReady]
 * @param {string} props.statusFilter
 * @param {(plot: import('../../data/plotDefaults').Plot) => boolean} props.matchesFilter
 * @param {boolean} [props.bulkMode] - when true, clicks toggle bulk selection instead of opening the editor
 * @param {Set<string>} [props.bulkSelectedIds]
 * @param {(id: string) => void} [props.onToggleBulkSelect]
 * @param {boolean} [props.debugHighlight] - developer mode: outline every detected plot at once
 */
export default function PlotLayout({
  svgUrl,
  plots,
  selectedPlotId,
  onSelectPlot,
  onPlotsDetected,
  onSvgReady,
  statusFilter,
  matchesFilter,
  bulkMode = false,
  bulkSelectedIds,
  onToggleBulkSelect,
  debugHighlight = false,
}) {
  const hostRef = useRef(null);
  const elementsById = useRef(new Map()); // plot id -> <path> element
  const [loadState, setLoadState] = useState('loading'); // loading | ready | error
  const [tooltip, setTooltip] = useState(null); // { x, y, plotNumber, status, area } | null

  // 1. Fetch and inject the master SVG exactly once.
  useEffect(() => {
    let cancelled = false;

    fetch(svgUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${svgUrl}: ${res.status}`);
        return res.text();
      })
      .then((markup) => {
        if (cancelled || !hostRef.current) return;
        hostRef.current.innerHTML = markup;
        const svgRoot = hostRef.current.querySelector('svg');
        if (!svgRoot) throw new Error('No <svg> root found in the fetched markup.');

        ensureHatchPatternDefs(svgRoot);

        const descriptors = detectPlotElements(svgRoot);
        elementsById.current = new Map(descriptors.map((d) => [d.id, d.element]));
        descriptors.forEach(({ element }) => element.classList.add(styles.plotPath));

        if (typeof window !== 'undefined' && window.__FLIVV_DEBUG__) {
          console.info(`[PlotLayout] Detected ${descriptors.length} plot elements.`);
        }

        onPlotsDetected(descriptors.map(({ id, plotNumber }) => ({ id, plotNumber })));
        if (onSvgReady) onSvgReady(svgRoot);
        setLoadState('ready');
      })
      .catch((err) => {
        console.error('[PlotLayout] Could not load master SVG.', err);
        if (!cancelled) setLoadState('error');
      });

    return () => {
      cancelled = true;
    };
    // Intentionally runs only once per svgUrl — re-fetching on every plots/selection change would be wasteful.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgUrl]);

  // 2. Click delegation: identify the exact plot clicked, ignore everything else.
  const handleClick = useCallback(
    (e) => {
      const target = e.target.closest('[id]');
      const hitPlot = target && elementsById.current.has(target.id);

      if (bulkMode) {
        if (hitPlot) onToggleBulkSelect(target.id);
        return; // clicking empty space in bulk mode does nothing (selection stays until explicitly cleared)
      }

      if (hitPlot) {
        onSelectPlot(target.id);
      } else {
        onSelectPlot(null); // clicked empty layout / road / park / label area
      }
    },
    [onSelectPlot, bulkMode, onToggleBulkSelect]
  );

  // 3. Hover: desktop-only tooltip with plot number/status/area.
  const handlePointerOver = useCallback(
    (e) => {
      if (e.pointerType !== 'mouse') return;
      const target = e.target.closest('[id]');
      if (!target || !elementsById.current.has(target.id)) return;
      const plot = plots[target.id];
      if (!plot) return;
      setTooltip({
        x: e.clientX,
        y: e.clientY,
        plotNumber: plot.plotNumber,
        status: plot.status,
        area: plot.area,
      });
    },
    [plots]
  );

  const handlePointerMove = useCallback((e) => {
    if (e.pointerType !== 'mouse') return;
    setTooltip((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY } : prev));
  }, []);

  const handlePointerOut = useCallback((e) => {
    if (e.pointerType !== 'mouse') return;
    const related = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest('[id]') : null;
    if (!related || !elementsById.current.has(related.id)) setTooltip(null);
  }, []);

  // 4. Re-apply status fill + mortgage hatch whenever plot data changes.
  useEffect(() => {
    if (loadState !== 'ready') return;
    elementsById.current.forEach((pathEl, id) => {
      const plot = plots[id];
      if (!plot) return;
      applyStatusFill(pathEl, plot.status);
      syncHatchOverlay(pathEl, plot.mortgage);
    });
  }, [plots, loadState]);

  // 5. Toggle the "selected" class on exactly one plot at a time.
  useEffect(() => {
    if (loadState !== 'ready') return;
    elementsById.current.forEach((pathEl, id) => {
      pathEl.classList.toggle(styles.selected, id === selectedPlotId);
    });
  }, [selectedPlotId, loadState]);

  // 6b. Toggle the "bulkSelected" outline for every plot currently in the bulk selection.
  useEffect(() => {
    if (loadState !== 'ready') return;
    elementsById.current.forEach((pathEl, id) => {
      pathEl.classList.toggle(styles.bulkSelected, Boolean(bulkSelectedIds && bulkSelectedIds.has(id)));
    });
  }, [bulkSelectedIds, loadState]);

  // 6. Mute plots that don't match the active filter (never hides them).
  useEffect(() => {
    if (loadState !== 'ready') return;
    elementsById.current.forEach((pathEl, id) => {
      const plot = plots[id];
      const muted = statusFilter !== 'all' && plot && !matchesFilter(plot);
      pathEl.classList.toggle(styles.muted, Boolean(muted));
    });
  }, [statusFilter, plots, matchesFilter, loadState]);

  // 7. Developer mode: outline every detected plot boundary at once.
  useEffect(() => {
    if (loadState !== 'ready') return;
    elementsById.current.forEach((pathEl) => {
      pathEl.classList.toggle(styles.debugBoundary, debugHighlight);
    });
  }, [debugHighlight, loadState]);

  return (
    <div className="relative h-full w-full">
      <div
        ref={hostRef}
        className={styles.svgHost}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
      />

      {loadState === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 text-sm text-gray-500">
          Loading layout…
        </div>
      )}

      {loadState === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-white text-sm text-red-600">
          Couldn&apos;t load the project layout. Confirm project-layout.svg is in /public/layout/.
        </div>
      )}

      {tooltip && (
        <div className={styles.tooltip} style={{ left: tooltip.x, top: tooltip.y }}>
          <strong>Plot {tooltip.plotNumber}</strong>
          <br />
          {tooltip.status.charAt(0).toUpperCase() + tooltip.status.slice(1)}
          {tooltip.area ? ` · ${tooltip.area} sq yd` : ''}
        </div>
      )}
    </div>
  );
}
