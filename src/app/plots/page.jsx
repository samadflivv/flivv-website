'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import PlotLayout from '../../components/PlotLayout/PlotLayout';
import PlotViewport from '../../components/PlotLayout/PlotViewport';
import PlotZoomControls from '../../components/PlotLayout/PlotZoomControls';
import PlotToolbar from '../../components/PlotLayout/PlotToolbar';
import PlotLegend from '../../components/PlotLayout/PlotLegend';
import PlotInfoPanel from '../../components/PlotLayout/PlotInfoPanel';
import PlotBottomSheet from '../../components/PlotLayout/PlotBottomSheet';
import PlotBulkBar from '../../components/PlotLayout/PlotBulkBar';
import PlotDevPanel from '../../components/PlotLayout/PlotDevPanel';
import PlotToast from '../../components/PlotLayout/PlotToast';
import { ToastProvider, useToast } from '../../hooks/useToast';
import { usePlotStore } from '../../hooks/usePlotStore';
import { useZoomPan } from '../../hooks/useZoomPan';
import { getElementBBox } from '../../lib/svgPlotUtils';

const SVG_URL = '/layout/project-layout.svg';

function UndoRedoControls({ canUndo, canRedo, onUndo, onRedo }) {
  const buttonClass =
    'flex h-9 items-center gap-1.5 rounded-lg bg-white px-3 text-xs font-medium text-gray-600 shadow-md ring-1 ring-gray-200 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white';

  return (
    <div className="absolute bottom-4 left-4 z-40 flex gap-2">
      <button type="button" className={buttonClass} onClick={onUndo} disabled={!canUndo}>
        ↶ Undo
      </button>
      <button type="button" className={buttonClass} onClick={onRedo} disabled={!canRedo}>
        ↷ Redo
      </button>
    </div>
  );
}

function PlotManagementScreen() {
  const toast = useToast();

  const viewportRef = useRef(null);
  const svgRootRef = useRef(null);
  const zoomPan = useZoomPan(viewportRef);

  const [plotDescriptors, setPlotDescriptors] = useState([]);
  const store = usePlotStore(plotDescriptors, toast);

  const [bulkMode, setBulkMode] = useState(false);
  const [bulkSelectedIds, setBulkSelectedIds] = useState(() => new Set());
  const [debugHighlight, setDebugHighlight] = useState(false);

  const handleSvgReady = useCallback((svgRoot) => {
    svgRootRef.current = svgRoot;
  }, []);

  const handleSaveSelected = useCallback(
    (patch) => {
      if (store.selectedPlotId) store.updatePlot(store.selectedPlotId, patch);
    },
    [store]
  );

  const handleToggleBulkSelect = useCallback((id) => {
    setBulkSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleApplyBulk = useCallback(
    (patch) => {
      store.updateMultiplePlots(Array.from(bulkSelectedIds), patch);
    },
    [store, bulkSelectedIds]
  );

  const handleToggleBulkMode = useCallback(() => {
    setBulkMode((v) => !v);
    setBulkSelectedIds(new Set());
  }, []);

  // Search -> select + zoom/pan to the matched plot.
  useEffect(() => {
    const id = store.searchResultId;
    if (!id || !svgRootRef.current) return;
    const el = svgRootRef.current.querySelector(`#${CSS.escape(id)}`);
    if (!el) return;
    const bbox = getElementBBox(el);
    if (!bbox) return;
    zoomPan.focusOnSvgPoint(svgRootRef.current, { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 });
    store.setSelectedPlotId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.searchResultId]);

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-4 py-3">
        <h1 className="text-lg font-semibold text-gray-900">Plot Inventory</h1>
        <p className="text-xs text-gray-500">Click any plot to view or update its status.</p>
      </header>

      <PlotToolbar
        searchTerm={store.searchTerm}
        onSearchChange={store.setSearchTerm}
        searchResultId={store.searchResultId}
        statusFilter={store.statusFilter}
        onStatusFilterChange={store.setStatusFilter}
        bulkMode={bulkMode}
        onToggleBulkMode={handleToggleBulkMode}
      />

      <PlotLegend />

      <div className="relative flex-1 overflow-hidden">
        <PlotViewport viewportRef={viewportRef} transform={zoomPan.transform} handlers={zoomPan.handlers}>
          <PlotLayout
            svgUrl={SVG_URL}
            plots={store.plots}
            selectedPlotId={store.selectedPlotId}
            onSelectPlot={store.setSelectedPlotId}
            onPlotsDetected={setPlotDescriptors}
            onSvgReady={handleSvgReady}
            statusFilter={store.statusFilter}
            matchesFilter={store.matchesFilter}
            bulkMode={bulkMode}
            bulkSelectedIds={bulkSelectedIds}
            onToggleBulkSelect={handleToggleBulkSelect}
            debugHighlight={debugHighlight}
          />
        </PlotViewport>

        <PlotZoomControls onZoomIn={zoomPan.zoomIn} onZoomOut={zoomPan.zoomOut} onReset={zoomPan.resetView} />

        <PlotDevPanel
          plotCount={plotDescriptors.length}
          descriptors={plotDescriptors}
          debugHighlight={debugHighlight}
          onToggleDebugHighlight={setDebugHighlight}
          onResetDemoData={store.resetAllPlots}
        />

        {!bulkMode && (
          <UndoRedoControls canUndo={store.canUndo} canRedo={store.canRedo} onUndo={store.undo} onRedo={store.redo} />
        )}

        {!bulkMode && (
          <>
            <PlotInfoPanel plot={store.selectedPlot} onSave={handleSaveSelected} onClose={() => store.setSelectedPlotId(null)} />
            <PlotBottomSheet plot={store.selectedPlot} onSave={handleSaveSelected} onClose={() => store.setSelectedPlotId(null)} />
          </>
        )}

        {bulkMode && (
          <PlotBulkBar
            selectedIds={bulkSelectedIds}
            onClear={() => setBulkSelectedIds(new Set())}
            onApply={handleApplyBulk}
            onExitBulkMode={handleToggleBulkMode}
          />
        )}
      </div>

      <PlotToast />
    </div>
  );
}

export default function PlotsPage() {
  return (
    <ToastProvider>
      <PlotManagementScreen />
    </ToastProvider>
  );
}
