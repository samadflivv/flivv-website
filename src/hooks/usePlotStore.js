'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { plotRepository } from '../lib/plotRepository';
import { normalizeSearchTerm } from '../lib/svgPlotUtils';

const UNDO_STACK_LIMIT = 30;

/**
 * Central plot data store. Owns:
 *  - the plots map (id -> Plot), loaded from the repository once the
 *    SVG has told us which plot ids exist
 *  - selection state
 *  - search + status/mortgage filter state
 *  - a bounded undo/redo history of status/mortgage/notes changes
 *
 * @param {{id: string, plotNumber: string}[]} plotDescriptors - detected from the SVG, empty until it mounts
 * @param {{ push: Function }} [toast] - optional toast API from useToast()
 */
export function usePlotStore(plotDescriptors, toast) {
  const [plots, setPlots] = useState({});
  const plotsRef = useRef({});
  useEffect(() => {
    plotsRef.current = plots;
  }, [plots]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPlotId, setSelectedPlotId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | available | sold | resale | mortgage

  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const [historyTick, setHistoryTick] = useState(0); // bump to force undo/redo button re-render

  const descriptorsKey = useMemo(
    () => plotDescriptors.map((d) => d.id).join(','),
    [plotDescriptors]
  );

  // Load (and auto-create defaults for) every detected plot once the SVG has mounted.
  useEffect(() => {
    if (plotDescriptors.length === 0) return;
    let cancelled = false;
    plotRepository.getPlots(plotDescriptors).then((loaded) => {
      if (!cancelled) {
        setPlots(loaded);
        setIsLoaded(true);
      }
    });
    return () => {
      cancelled = true;
    };
    // descriptorsKey intentionally used instead of plotDescriptors to avoid
    // re-loading on every render (the array reference is rebuilt each render).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descriptorsKey]);

  const pushHistory = useCallback((snapshotBefore) => {
    undoStack.current.push(snapshotBefore);
    if (undoStack.current.length > UNDO_STACK_LIMIT) undoStack.current.shift();
    redoStack.current = []; // a new change invalidates the redo trail
    setHistoryTick((t) => t + 1);
  }, []);

  /** Applies a status/mortgage/notes/area change to one plot, with undo support. */
  const updatePlot = useCallback(
    async (id, patch, { silent = false } = {}) => {
      const before = plotsRef.current[id];
      if (before) pushHistory({ type: 'single', before: { [id]: before } });

      const updated = await plotRepository.updatePlot(id, patch);
      setPlots((prev) => ({ ...prev, [id]: updated }));

      if (!silent && toast) {
        toast.push(`Plot ${updated.plotNumber} updated.`, { type: 'success' });
      }
      return updated;
    },
    [pushHistory, toast]
  );

  /** Applies the same status/mortgage patch to several plots at once (bulk editing). */
  const updateMultiplePlots = useCallback(
    async (ids, patch) => {
      const before = {};
      ids.forEach((id) => {
        if (plotsRef.current[id]) before[id] = plotsRef.current[id];
      });
      if (Object.keys(before).length) pushHistory({ type: 'bulk', before });

      const changed = await plotRepository.updateMultiplePlots(ids, patch);
      setPlots((prev) => ({ ...prev, ...changed }));

      if (toast) {
        toast.push(`${ids.length} plot${ids.length === 1 ? '' : 's'} updated.`, { type: 'success' });
      }
      return changed;
    },
    [pushHistory, toast]
  );

  const undo = useCallback(async () => {
    const entry = undoStack.current.pop();
    if (!entry) return;

    // Snapshot current values (for redo) before restoring the old ones.
    const redoBefore = {};
    Object.keys(entry.before).forEach((id) => {
      if (plotsRef.current[id]) redoBefore[id] = plotsRef.current[id];
    });
    redoStack.current.push({ type: entry.type, before: redoBefore });
    setHistoryTick((t) => t + 1);

    setPlots((prev) => ({ ...prev, ...entry.before }));

    // Persist each restored record individually (they can legitimately
    // differ per plot, so a single shared patch won't do).
    const ids = Object.keys(entry.before);
    await Promise.all(ids.map((id) => plotRepository.updatePlot(id, entry.before[id])));

    if (toast) toast.push('Change undone.', { type: 'info', duration: 2000 });
  }, [toast]);

  const redo = useCallback(async () => {
    const entry = redoStack.current.pop();
    if (!entry) return;

    const undoBefore = {};
    Object.keys(entry.before).forEach((id) => {
      if (plotsRef.current[id]) undoBefore[id] = plotsRef.current[id];
    });
    undoStack.current.push({ type: entry.type, before: undoBefore });
    setHistoryTick((t) => t + 1);

    setPlots((prev) => ({ ...prev, ...entry.before }));

    const ids = Object.keys(entry.before);
    await Promise.all(ids.map((id) => plotRepository.updatePlot(id, entry.before[id])));

    if (toast) toast.push('Change redone.', { type: 'info', duration: 2000 });
  }, [toast]);

  const resetAllPlots = useCallback(async () => {
    const fresh = await plotRepository.resetPlots(plotDescriptors);
    setPlots(fresh);
    undoStack.current = [];
    redoStack.current = [];
    setHistoryTick((t) => t + 1);
    if (toast) toast.push('Demo data reset.', { type: 'info' });
  }, [plotDescriptors, toast]);

  const plotList = useMemo(() => Object.values(plots), [plots]);

  const searchResultId = useMemo(() => {
    const term = normalizeSearchTerm(searchTerm);
    if (!term) return null;
    const found = plotList.find((p) => normalizeSearchTerm(p.plotNumber) === term);
    return found ? found.id : undefined; // undefined (not null) signals "searched but not found"
  }, [searchTerm, plotList]);

  const matchesFilter = useCallback(
    (plot) => {
      switch (statusFilter) {
        case 'available':
        case 'sold':
        case 'resale':
          return plot.status === statusFilter;
        case 'mortgage':
          return plot.mortgage === true;
        case 'all':
        default:
          return true;
      }
    },
    [statusFilter]
  );

  return {
    plots,
    plotList,
    isLoaded,
    selectedPlotId,
    setSelectedPlotId,
    selectedPlot: selectedPlotId ? plots[selectedPlotId] : null,
    searchTerm,
    setSearchTerm,
    searchResultId,
    statusFilter,
    setStatusFilter,
    matchesFilter,
    updatePlot,
    updateMultiplePlots,
    undo,
    redo,
    canUndo: undoStack.current.length > 0,
    canRedo: redoStack.current.length > 0,
    historyTick,
    resetAllPlots,
  };
}
