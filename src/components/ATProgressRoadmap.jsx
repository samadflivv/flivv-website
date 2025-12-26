import React, { useMemo } from 'react'
import useSWR from 'swr'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Clock, AlertCircle, Calendar, ArrowUpRight, ArrowRight } from 'lucide-react'

/* ======= CONFIG ======= */
const SPREADSHEET_ID = '1PdnFzC_opkk_z9pn7Ba7o2TXH1h2qPeYAyNf-siGrOs'
const SHEET_NAME = 'Airport_Town'
const REFRESH_INTERVAL = 20000 
/* ====================== */

const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`

const gvizFetcher = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Network error when fetching sheet')
  const text = await res.text()
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('GViz JSON not found')
  const json = text.substring(start, end + 1)
  return JSON.parse(json)
}

const parseDateVal = (v) => {
  if (v == null || v === '') return null
  if (v instanceof Date) return v
  const s = String(v).trim()
  if (s.startsWith('Date(') || s.startsWith('new Date(')) {
    const inside = s.replace(/^new Date\(/, '').replace(/^Date\(/, '').replace(/\)$/, '')
    const parts = inside.split(',').map(p => Number(p.trim())).filter(n => !isNaN(n))
    if (parts.length >= 3) return new Date(parts[0], parts[1], parts[2])
  }
  const parsed = Date.parse(s)
  return !isNaN(parsed) ? new Date(parsed) : null
}

const clamp = (n, a, b) => Math.max(a, Math.min(b, n))

export default function ATProgressRoadmap() {
  const { data, error } = useSWR(GVIZ_URL, gvizFetcher, { refreshInterval: REFRESH_INTERVAL })

  const { items, lastUpdated } = useMemo(() => {
    if (!data?.table) return { items: [], lastUpdated: null }
    const cols = (data.table.cols || []).map(c => (c.label && c.label.trim()) || c.id || '')
    const rawRows = data.table.rows || []

    const rows = rawRows.map((r, idx) => {
      const obj = {}
      const cells = r.c || []
      cols.forEach((col, i) => { obj[col] = cells[i] ? cells[i].v : '' })
      
      const get = (names) => {
        for (const n of names) {
          const key = Object.keys(obj).find(k => k.toLowerCase() === n.toLowerCase())
          if (key) return obj[key]
        }
        return undefined
      }

      return {
        id: get(['id', 'ID']) ?? idx + 1,
        title: (get(['activity', 'Activity', 'title']) || `Task ${idx + 1}`).toString(),
        start: parseDateVal(get(['start', 'Start', 'START', 'start date'])),
        end: parseDateVal(get(['end', 'End', 'END', 'end date'])),
        status: (get(['status', 'Status']) || 'planned').toString().toLowerCase(),
        progress: get(['progress', 'Progress']) !== undefined ? clamp(Number(get(['progress', 'Progress'])), 0, 100) : null
      }
    })
    return { items: rows, lastUpdated: new Date() }
  }, [data])

  if (error) return <div className="p-12 text-center text-rose-500 font-semibold">Connection Error. Please check your data source.</div>
  if (!data) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
      <p className="text-slate-400 font-medium animate-pulse">Syncing Gulmohar Homes Data...</p>
    </div>
  )

  const itemsWithProgress = items.map(it => {
    const computed = it.progress !== null ? it.progress : (it.start && it.end ? Math.round(clamp((new Date().getTime() - it.start.getTime()) / (it.end.getTime() - it.start.getTime()), 0, 1) * 100) : 0)
    return { ...it, computed }
  })

  const overall = Math.round(itemsWithProgress.reduce((s, it) => s + it.computed, 0) / itemsWithProgress.length)

  const getStatusUI = (st) => {
    const themes = {
      completed: { icon: <CheckCircle2 size={14}/>, color: 'bg-emerald-50 text-emerald-700 border-emerald-100', bar: 'bg-emerald-500' },
      inprogress: { icon: <Clock size={14}/>, color: 'bg-blue-50 text-blue-700 border-blue-100', bar: 'bg-indigo-600' },
      delayed: { icon: <AlertCircle size={14}/>, color: 'bg-rose-50 text-rose-700 border-rose-100', bar: 'bg-rose-500' }
    }
    return themes[st] || { icon: <Calendar size={14}/>, color: 'bg-slate-50 text-slate-600 border-slate-100', bar: 'bg-slate-400' }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 min-h-screen font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
        <div>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-2">
            <div className="h-1 w-6 bg-[#44312B] rounded-full" />
            <span className="text-[#44312B] font-bold tracking-widest text-[10px] uppercase">Real-Time Development Dashboard</span>
          </motion.div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Airport <span className="text-[#44312B]">Town</span></h1>
        </div>

        {/* COMPACT OVERALL PROGRESS */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-7 rounded-[2rem] shadow-xl shadow-indigo-100/40 border border-white min-w-[320px]">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Project Completion</span>
            <span className="text-3xl font-black text-slate-900">{overall}%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${overall}%` }} transition={{ duration: 1.5 }} className="h-full bg-[#44312B] rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* 4-COLUMN BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {itemsWithProgress.map((it, idx) => {
            const ui = getStatusUI(it.status)
            return (
              <motion.div 
                key={it.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-[2.2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border ${ui.color}`}>
                      {ui.icon} {it.status}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-800 leading-snug line-clamp-2 min-h-[3.5rem]">
                    {it.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* PROGRESS BAR */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-[#612437] uppercase tracking-widest">Progress</span>
                      <span className="text-slate-900">{it.computed}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${it.computed}%` }} className="h-full  rounded-full bg-[#44312B]" />
                    </div>
                  </div>

                  {/* VISIBLE DATES */}
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] text-slate-300 uppercase">Commencement</span>
                      <span className="flex items-center gap-1"><Calendar size={11} className="text-indigo-400"/> {it.start?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <ArrowRight size={14} className="text-slate-200" />
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-[9px] text-slate-300 uppercase">Target</span>
                      <span className="flex items-center gap-1 justify-end">{it.end?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} <Clock size={11} className="text-indigo-400"/></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  )
}