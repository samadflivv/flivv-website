/**
 * data/plotDefaults.js
 *
 * The plot data model and the factory for default records. No plot is
 * ever assumed sold/resale/mortgaged just because it exists in the SVG —
 * every plot starts "available" until someone explicitly changes it.
 */

export const PLOT_STATUS = {
  AVAILABLE: 'available',
  SOLD: 'sold',
  RESALE: 'resale',
};

export const PLOT_STATUS_LABELS = {
  [PLOT_STATUS.AVAILABLE]: 'Available',
  [PLOT_STATUS.SOLD]: 'Sold',
  [PLOT_STATUS.RESALE]: 'Resale',
};

export const PLOT_STATUS_COLORS = {
  [PLOT_STATUS.SOLD]: '#E05252',
  [PLOT_STATUS.RESALE]: '#3B82F6',
};

/**
 * @typedef {Object} Plot
 * @property {string} id            - Exact SVG path id, e.g. "plot-48"
 * @property {string} plotNumber    - Human-readable number, e.g. "48" or "89A"
 * @property {string} area          - Plot area if known (freeform, e.g. "240")
 * @property {'available'|'sold'|'resale'} status
 * @property {boolean} mortgage
 * @property {string} notes
 * @property {string|null} lastUpdated - ISO timestamp of last change, or null
 */

/**
 * Creates a fresh default record for a plot detected in the SVG.
 * @param {string} id - the SVG element id (e.g. "plot-48")
 * @param {string} plotNumber - the human-readable number (e.g. "48")
 * @returns {Plot}
 */
export function createDefaultPlot(id, plotNumber) {
  return {
    id,
    plotNumber,
    area: '',
    status: PLOT_STATUS.AVAILABLE,
    mortgage: false,
    notes: '',
    lastUpdated: null,
  };
}

/**
 * Merges a stored record with defaults so older saved data that's
 * missing newer fields doesn't break the UI.
 */
export function hydratePlot(id, plotNumber, stored) {
  return {
    ...createDefaultPlot(id, plotNumber),
    ...(stored || {}),
    id, // id and plotNumber always come from the SVG, never from storage
    plotNumber,
  };
}
