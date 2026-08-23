'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_SCALE = 1; // "fit to screen" is scale 1
const MAX_SCALE = 6;
const WHEEL_ZOOM_SENSITIVITY = 0.0018;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Pan/zoom for the plot viewport, implemented purely as a CSS transform
 * (translate + scale) on a wrapper div around the real, unmodified SVG.
 *
 * Because the SVG itself is never resized or re-viewBox'd, every plot
 * <path> keeps its exact on-screen hit area at every zoom level — the
 * browser resolves clicks against the transformed element the same way
 * it would for any other CSS-scaled DOM node, so no manual coordinate
 * math is needed to keep clicks accurate.
 *
 * @param {React.RefObject<HTMLElement>} containerRef - the viewport's outer bounding box
 */
export function useZoomPan(containerRef) {
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const dragState = useRef(null); // { startX, startY, originX, originY } while dragging
  const pinchState = useRef(null); // { startDistance, startScale, midpoint } while pinching

  const setScaleAroundPoint = useCallback((nextScaleRaw, pointClientX, pointClientY) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const nextScale = clamp(nextScaleRaw, MIN_SCALE, MAX_SCALE);

    setTransform((prev) => {
      // Keep the point under the cursor/fingers stationary while scaling.
      const px = pointClientX - rect.left;
      const py = pointClientY - rect.top;
      const scaleRatio = nextScale / prev.scale;
      const nextX = px - scaleRatio * (px - prev.x);
      const nextY = py - scaleRatio * (py - prev.y);
      return clampPan({ scale: nextScale, x: nextX, y: nextY }, rect);
    });
  }, [containerRef]);

  function clampPan(next, rect) {
    // Prevent panning the layout completely out of view — allow generous
    // slack so users can still inspect edge plots comfortably.
    const slackX = rect.width * (next.scale - 1) + rect.width * 0.4;
    const slackY = rect.height * (next.scale - 1) + rect.height * 0.4;
    return {
      scale: next.scale,
      x: clamp(next.x, -slackX, slackX),
      y: clamp(next.y, -slackY, slackY),
    };
  }

  const zoomIn = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setScaleAroundPoint(transform.scale * 1.4, rect.left + rect.width / 2, rect.top + rect.height / 2);
  }, [containerRef, transform.scale, setScaleAroundPoint]);

  const zoomOut = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setScaleAroundPoint(transform.scale / 1.4, rect.left + rect.width / 2, rect.top + rect.height / 2);
  }, [containerRef, transform.scale, setScaleAroundPoint]);

  const resetView = useCallback(() => {
    setTransform({ scale: 1, x: 0, y: 0 });
  }, []);

  /** Centers and zooms on a specific point given in the SVG's own coordinate system. */
  const focusOnSvgPoint = useCallback(
    (svgRoot, svgPoint, targetScale = 2.5) => {
      const container = containerRef.current;
      if (!container || !svgRoot) return;
      const rect = container.getBoundingClientRect();
      const svgRect = svgRoot.getBoundingClientRect();
      // svgRect already reflects the current transform, so back it out to
      // find where this SVG point sits at scale 1 relative to the container.
      const currentScale = transform.scale;
      const baseWidth = svgRect.width / currentScale;
      const baseHeight = svgRect.height / currentScale;
      const svgViewBox = svgRoot.viewBox?.baseVal;
      if (!svgViewBox || !svgViewBox.width) return;

      const ratioX = svgPoint.x / svgViewBox.width;
      const ratioY = svgPoint.y / svgViewBox.height;

      // Position (in container-local, untransformed coordinates) of the target point.
      const baseLeft = (svgRect.left - rect.left - transform.x) / currentScale;
      const baseTop = (svgRect.top - rect.top - transform.y) / currentScale;
      const targetXBase = baseLeft + ratioX * baseWidth;
      const targetYBase = baseTop + ratioY * baseHeight;

      const nextScale = clamp(targetScale, MIN_SCALE, MAX_SCALE);
      const nextX = rect.width / 2 - targetXBase * nextScale;
      const nextY = rect.height / 2 - targetYBase * nextScale;
      setTransform(clampPan({ scale: nextScale, x: nextX, y: nextY }, rect));
    },
    [containerRef, transform]
  );

  // --- Mouse wheel zoom (desktop) ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    function onWheel(e) {
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * WHEEL_ZOOM_SENSITIVITY);
      setScaleAroundPoint(transform.scale * factor, e.clientX, e.clientY);
    }

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [containerRef, transform.scale, setScaleAroundPoint]);

  // --- Mouse drag to pan (desktop) ---
  const onPointerDown = useCallback(
    (e) => {
      if (e.pointerType === 'touch') return; // touch handled separately (pinch + single-finger pan)
      dragState.current = { startX: e.clientX, startY: e.clientY, originX: transform.x, originY: transform.y };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [transform.x, transform.y]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!dragState.current) return;
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      const rect = containerRef.current?.getBoundingClientRect();
      setTransform((prev) =>
        rect
          ? clampPan({ scale: prev.scale, x: dragState.current.originX + dx, y: dragState.current.originY + dy }, rect)
          : prev
      );
    },
    [containerRef]
  );

  const onPointerUp = useCallback((e) => {
    dragState.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {
      // no-op: capture may already be released
    }
  }, []);

  // --- Touch: pinch-zoom + single-finger pan (mobile) ---
  const onTouchStart = useCallback(
    (e) => {
      if (e.touches.length === 2) {
        const [t1, t2] = e.touches;
        const distance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        pinchState.current = { startDistance: distance, startScale: transform.scale };
        dragState.current = null;
      } else if (e.touches.length === 1) {
        const t = e.touches[0];
        dragState.current = { startX: t.clientX, startY: t.clientY, originX: transform.x, originY: transform.y };
        pinchState.current = null;
      }
    },
    [transform.scale, transform.x, transform.y]
  );

  const onTouchMove = useCallback(
    (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      if (e.touches.length === 2 && pinchState.current) {
        e.preventDefault();
        const [t1, t2] = e.touches;
        const distance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const midX = (t1.clientX + t2.clientX) / 2;
        const midY = (t1.clientY + t2.clientY) / 2;
        const nextScale = pinchState.current.startScale * (distance / pinchState.current.startDistance);
        setScaleAroundPoint(nextScale, midX, midY);
      } else if (e.touches.length === 1 && dragState.current) {
        e.preventDefault();
        const t = e.touches[0];
        const dx = t.clientX - dragState.current.startX;
        const dy = t.clientY - dragState.current.startY;
        setTransform((prev) =>
          clampPan({ scale: prev.scale, x: dragState.current.originX + dx, y: dragState.current.originY + dy }, rect)
        );
      }
    },
    [containerRef, setScaleAroundPoint]
  );

  const onTouchEnd = useCallback((e) => {
    if (e.touches.length === 0) {
      dragState.current = null;
      pinchState.current = null;
    }
  }, []);

  const isPanning = dragState.current !== null;

  return {
    transform,
    zoomIn,
    zoomOut,
    resetView,
    focusOnSvgPoint,
    isPanning,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
