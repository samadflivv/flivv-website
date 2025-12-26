// ProgressRoadmap.jsx
import React, { useMemo } from 'react'
import useSWR from 'swr'
import { motion } from 'framer-motion'

/* ---------- CONFIG: set these ---------- */
const SPREADSHEET_ID = '1PdnFzC_opkk_z9pn7Ba7o2TXH1h2qPeYAyNf-siGrOs'    // replace
const SHEET_NAME = 'gulmohar_homes'                    // replace if different
const REFRESH_INTERVAL = 20000                 // 20s polling (ms)
/* --------------------------------------- */


// GViz JSON fetcher (Google publishes this wrapper)
const gvizFetcher = async (url) => {
  const res = await fetch(url)
  const text = await res.text()

  // Extract JSON safely between the parentheses
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end === -1) {
    throw new Error('GViz JSON not found')
  }

  const jsonString = text.substring(start, end + 1)
  return JSON.parse(jsonString)
}

const GVIZ_URL =
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`


// helpers
const clamp = (n, a, b) => Math.max(a, Math.min(b, n))
const parseDateVal = (v) => {
  if (!v) return null

  // Case 1: already a Date object
  if (v instanceof Date) return v

  // Case 2: GViz Date(YYYY,MM,DD)
  if (typeof v === 'string' && v.startsWith('Date(')) {
    const nums = v.replace('Date(', '').replace(')', '').split(',').map(Number)
    if (nums.length >= 3) {
      const [y, m, d] = nums
      return new Date(y, m, d)
    }
  }

  // Case 3: normal date string
  const parsed = Date.parse(v)
  if (!isNaN(parsed)) return new Date(parsed)

  return null
}


export default function ProgressRoadmap() {
  const { data, error } = useSWR(GVIZ_URL, gvizFetcher, { refreshInterval: REFRESH_INTERVAL })

  const { items, lastUpdated } = useMemo(() => {
    if (!data?.table) return { items: [], lastUpdated: null }
    const cols = (data.table.cols || []).map(c => (c.label && c.label.trim()) || c.id || '')
    const rawRows = data.table.rows || []

    const rows = rawRows.map((r, idx) => {
      const obj = {}
      const cells = r.c || []
      cols.forEach((col, i) => {
        obj[col] = cells[i] ? cells[i].v : ''
      })

      // case-insensitive getters
      const get = (names) => {
        for (const n of names) {
          const match = Object.keys(obj).find(k => k.toLowerCase() === n.toLowerCase())
          if (match) return obj[match]
        }
        return undefined
      }

      const id = get(['id','ID']) ?? idx + 1
      const title = get(['activity','Activity','ACTIVITY','title','Title']) || `Task ${idx+1}`
      const startRaw = get(['start','Start','START'])
      const endRaw = get(['end','End','END'])
      const start = parseDateVal(startRaw)
      const end = parseDateVal(endRaw)
      const status = (get(['status','Status']) || 'planned').toString().toLowerCase()
      const desc = get(['description','Description']) || ''
      const progVal = get(['progress','Progress'])
      const progress = (progVal !== undefined && progVal !== '') ? clamp(Number(progVal), 0, 100) : null

      return { id, title, start, end, status, description: desc, progress }
    })
    // keep only rows with valid start & end (so computed progress works)
    const items = rows.filter(r => r.start && r.end)
    return { items, lastUpdated: new Date() }
  }, [data])

  if (error) return <div className="p-6 text-red-600">Failed to load milestones: {String(error.message)}</div>
  if (!data) return <div className="p-6">Loading milestones…</div>
  if (!items.length) return <div className="p-6 text-gray-600">No tasks found (check START & END columns).</div>

  // compute computed/progress and overall
  const today = new Date()
  const itemsWithProgress = items.map(it => {
    const computed = it.progress !== null
      ? it.progress
      : Math.round(clamp((today - it.start) / (it.end - it.start), 0, 1) * 100)
    return { ...it, computed }
  })
  const overall = Math.round(itemsWithProgress.reduce((s, it) => s + it.computed, 0) / itemsWithProgress.length)

  // color for status
  const statusClass = (st) => {
    if (st === 'completed') return 'text-green-600 bg-green-100'
    if (st === 'inprogress') return 'text-yellow-700 bg-yellow-100'
    if (st === 'delayed') return 'text-red-600 bg-red-100'
    return 'text-gray-700 bg-gray-100'
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-10" aria-labelledby="progress-roadmap">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 id="progress-roadmap" className="text-2xl font-semibold">Development Progress</h2>
          <p className="text-sm text-gray-500">Live from Google Sheets — updates automatically.</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-sm text-gray-500">Overall</div>
          <div className="w-40">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div className="h-3 rounded-full" initial={{ width: 0 }} animate={{ width: `${overall}%` }} transition={{ duration: .9 }} style={{ background: 'linear-gradient(90deg,#06b6d4,#3b82f6)' }} />
            </div>
            <div className="text-right text-xs mt-1 text-gray-600">{overall}%</div>
            <div className="text-right text-xs text-gray-400 mt-1">Updated: {lastUpdated?.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Desktop list */}
      <div className="hidden md:block space-y-4">
        {itemsWithProgress.map((it, idx) => (
          <div key={it.id} className="flex items-center gap-4 bg-white shadow-sm rounded-lg p-3">
            {/* left: title */}
            <div className="w-64">
              <div className="text-sm font-medium">{it.title}</div>
              <div className="text-xs text-gray-500">{it.start.toLocaleDateString()} — {it.end.toLocaleDateString()}</div>
            </div>

            {/* middle: progress bar */}
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-2">{it.description}</div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${it.computed}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.03 }}
                  className="h-4 rounded-full flex items-center px-3"
                  style={{ background: it.status === 'completed' ? 'linear-gradient(90deg,#10b981,#059669)' : 'linear-gradient(90deg,#60a5fa,#1e40af)' }}
                >
                  <div className="text-xs font-semibold text-white">{it.computed}%</div>
                </motion.div>
              </div>
            </div>

            {/* right: badge */}
            <div className="w-36 text-right">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusClass(it.status)}`}>{it.status}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-4">
        {itemsWithProgress.map((it, idx) => (
          <motion.article key={it.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-medium">{it.title}</div>
                <div className="text-xs text-gray-500">{it.start.toLocaleDateString()} — {it.end.toLocaleDateString()}</div>
                {it.description ? <div className="text-xs text-gray-500 mt-1">{it.description}</div> : null}
              </div>
              <div className="text-right">
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${statusClass(it.status)}`}>{it.status}</div>
                <div className="text-2xl font-bold mt-3 text-gray-700">{it.computed}%</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${it.computed}%` }} transition={{ duration: .8 }} className="h-4 rounded-full" style={{ background: 'linear-gradient(90deg,#34d399,#3b82f6)' }} />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* legend & note */}
      <div className="mt-6 text-xs text-gray-500 flex flex-wrap gap-4">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Completed</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400 inline-block" /> In progress</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-400 inline-block" /> Planned</div>
        <div className="ml-4 text-gray-400">Tip: edit Google Sheet → publish → changes appear on page within ~{REFRESH_INTERVAL/1000}s</div>
      </div>
    </section>
  )
}
