/**
 * lib/plotRepository.js
 *
 * Storage abstraction for plot data. Components never talk to
 * localStorage directly — they only see this repository interface:
 *
 *   getPlots(descriptors)              -> Promise<Record<id, Plot>>
 *   getPlot(id)                        -> Promise<Plot | null>
 *   updatePlot(id, patch)              -> Promise<Plot>
 *   updateMultiplePlots(ids, patch)    -> Promise<Record<id, Plot>>
 *   resetPlots(descriptors)            -> Promise<Record<id, Plot>>
 *
 * Swapping localStorage for a real database later means writing a new
 * adapter with the same five methods (see createApiPlotRepository stub
 * at the bottom) — nothing in the UI layer needs to change.
 */

import { hydratePlot } from '../data/plotDefaults';

const STORAGE_KEY = 'flivv:plot-inventory:v1';

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/** Reads the raw plot map from localStorage, tolerating missing/corrupt data. */
function readRawStore() {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (err) {
    console.warn('[plotRepository] Stored plot data was unreadable/corrupted. Starting fresh.', err);
    return {};
  }
}

/** Writes the raw plot map to localStorage. Returns false (not throws) on failure. */
function writeRawStore(store) {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    return true;
  } catch (err) {
    // Quota exceeded, private-browsing restrictions, etc.
    console.error('[plotRepository] Failed to persist plot data.', err);
    return false;
  }
}

function timestamp() {
  return new Date().toISOString();
}

/**
 * localStorage-backed implementation of the plot repository interface.
 */
export function createLocalStoragePlotRepository() {
  return {
    /**
     * @param {{id: string, plotNumber: string}[]} descriptors - plots detected in the SVG
     * @returns {Promise<Record<string, import('../data/plotDefaults').Plot>>}
     */
    async getPlots(descriptors) {
      const raw = readRawStore();
      const merged = {};
      let changed = false;

      descriptors.forEach(({ id, plotNumber }) => {
        if (raw[id]) {
          merged[id] = hydratePlot(id, plotNumber, raw[id]);
        } else {
          merged[id] = hydratePlot(id, plotNumber, null);
          changed = true; // a default record was created for a previously-unknown plot
        }
      });

      if (changed) writeRawStore(merged);
      return merged;
    },

    /** @returns {Promise<import('../data/plotDefaults').Plot | null>} */
    async getPlot(id) {
      const raw = readRawStore();
      return raw[id] ? hydratePlot(id, raw[id].plotNumber, raw[id]) : null;
    },

    /**
     * @param {string} id
     * @param {Partial<import('../data/plotDefaults').Plot>} patch
     */
    async updatePlot(id, patch) {
      const raw = readRawStore();
      const existing = raw[id] || {};
      const updated = {
        ...existing,
        ...patch,
        id,
        lastUpdated: timestamp(),
      };
      raw[id] = updated;
      writeRawStore(raw);
      return updated;
    },

    /**
     * @param {string[]} ids
     * @param {Partial<import('../data/plotDefaults').Plot>} patch
     */
    async updateMultiplePlots(ids, patch) {
      const raw = readRawStore();
      const now = timestamp();
      const changedPlots = {};
      ids.forEach((id) => {
        const existing = raw[id] || {};
        const updated = { ...existing, ...patch, id, lastUpdated: now };
        raw[id] = updated;
        changedPlots[id] = updated;
      });
      writeRawStore(raw);
      return changedPlots;
    },

    /**
     * Wipes all stored plot data and recreates clean defaults. Used by
     * the developer "reset demo data" control.
     * @param {{id: string, plotNumber: string}[]} descriptors
     */
    async resetPlots(descriptors) {
      const fresh = {};
      descriptors.forEach(({ id, plotNumber }) => {
        fresh[id] = hydratePlot(id, plotNumber, null);
      });
      writeRawStore(fresh);
      return fresh;
    },
  };
}

/**
 * Future backend stub — same interface, backed by an API instead of
 * localStorage. Not wired up anywhere yet; kept here so the migration
 * path is obvious when a real backend exists.
 *
 * function createApiPlotRepository(baseUrl) {
 *   return {
 *     async getPlots(descriptors) { ... fetch(`${baseUrl}/plots`) ... },
 *     async getPlot(id) { ... fetch(`${baseUrl}/plots/${id}`) ... },
 *     async updatePlot(id, patch) { ... fetch(`${baseUrl}/plots/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }) ... },
 *     async updateMultiplePlots(ids, patch) { ... fetch(`${baseUrl}/plots/bulk`, { method: 'PATCH', ... }) ... },
 *     async resetPlots(descriptors) { ... fetch(`${baseUrl}/plots/reset`, { method: 'POST' }) ... },
 *   };
 * }
 */

// Single shared instance used by the app today.
export const plotRepository = createLocalStoragePlotRepository();
