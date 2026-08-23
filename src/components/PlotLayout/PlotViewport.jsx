'use client';

/**
 * Generic pan/zoom stage. Renders `children` (the actual SVG layout)
 * inside a CSS-transformed wrapper. The transform and gesture handlers
 * come from useZoomPan() in the parent — this component stays "dumb"
 * so it's reusable and easy to reason about.
 */
export default function PlotViewport({ viewportRef, transform, handlers, children }) {
  return (
    <div
      ref={viewportRef}
      data-plot-viewport="true"
      className="relative h-full w-full overflow-hidden touch-none select-none bg-gray-50"
      {...handlers}
    >
      <div
        className="h-full w-full origin-top-left"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
