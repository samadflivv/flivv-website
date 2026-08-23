/**
 * svgPlotUtils.js
 *
 * Utilities for inspecting the master project-layout.svg and detecting
 * individual plot elements at runtime. Nothing here hardcodes a plot
 * count or a specific list of IDs — it queries the live SVG DOM so the
 * app automatically adapts if plots are added/removed/renumbered in the
 * source file.
 */

const PLOT_ID_PREFIX = 'plot-';

/**
 * Returns true if an element's id marks it as an individual, sellable
 * plot (as opposed to roads, parks, labels, or other site elements).
 */
export function isPlotElement(el) {
  if (!el || !el.id) return false;
  return el.id.startsWith(PLOT_ID_PREFIX);
}

/**
 * Given a mounted SVG root node (the <svg> element actually attached to
 * the document), find every plot element and return lightweight
 * descriptors for each. Only `path` elements (the plot hit-areas in the
 * source file) are considered; non-path elements that happen to share
 * the prefix are ignored defensively.
 *
 * @param {SVGSVGElement} svgRoot
 * @returns {{ id: string, plotNumber: string, element: SVGElement }[]}
 */
export function detectPlotElements(svgRoot) {
  if (!svgRoot) return [];

  const matches = svgRoot.querySelectorAll(`[id^="${PLOT_ID_PREFIX}"]`);
  const seen = new Set();
  const results = [];

  matches.forEach((el) => {
    if (el.tagName.toLowerCase() !== 'path') {
      console.warn(
        `[svgPlotUtils] Element #${el.id} matches the plot- prefix but is a <${el.tagName}>, not a <path>. Skipping.`
      );
      return;
    }
    if (seen.has(el.id)) {
      console.warn(`[svgPlotUtils] Duplicate plot id detected: "${el.id}". Only the first occurrence is used.`);
      return;
    }
    seen.add(el.id);
    results.push({
      id: el.id,
      plotNumber: plotNumberFromId(el.id),
      element: el,
    });
  });

  return results;
}

/**
 * Derives a human-readable plot number from an element id.
 * "plot-48" -> "48", "plot-89A" -> "89A"
 */
export function plotNumberFromId(id) {
  return id.startsWith(PLOT_ID_PREFIX) ? id.slice(PLOT_ID_PREFIX.length) : id;
}

/**
 * Builds a plot-number -> id lookup so search can accept whatever the
 * user types ("89a", "89A", "  48 ") and still resolve to the right
 * SVG element id.
 */
export function buildPlotNumberIndex(plotDescriptors) {
  const index = new Map();
  plotDescriptors.forEach(({ id, plotNumber }) => {
    index.set(normalizeSearchTerm(plotNumber), id);
  });
  return index;
}

export function normalizeSearchTerm(value) {
  return String(value || '').trim().toLowerCase();
}

/**
 * Computes the bounding box of an SVG element in the SVG's own
 * coordinate system (not screen pixels) — used to center/zoom the
 * viewport on a plot found via search.
 */
export function getElementBBox(el) {
  try {
    return el.getBBox();
  } catch (err) {
    // getBBox can throw if the element isn't laid out yet (e.g. display:none)
    return null;
  }
}
