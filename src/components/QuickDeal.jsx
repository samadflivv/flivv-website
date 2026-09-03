'use client';
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MapPin, CheckCircle2, ArrowUpRight, X, Compass } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA — edit only this array to add / update deals                  */
/* ------------------------------------------------------------------ */

const DEALS = [
  {
    id: "jalpally",
    projectName: "Jalpally",
    dealTitle: "Jalpally — Plots Available",
    description: [
      "Jalpally is a rapidly growing urban municipality located on the southern division of Hyderabad. Known for its strategic location, Jalpally has emerged as one of the best real estate investment destinations near Shamshabad, offering the potential for up to 2x returns over a 5-year period.",
      "Whether you are looking for low-investment open plots or long-term capital appreciation driven by major infrastructure developments, Jalpally presents an ideal opportunity for every home builder and property investor.",
    ],
    descriptionSections: [
      {
        title: "Key Highlights & Amenities",
        items: [
          "Peaceful Living Environment: Surrounded by scenic surroundings and offering a serene, calm atmosphere.",
          "Thriving Neighborhood: Situated near existing residential colonies, rapidly expanding semi-urban housing, villas and spacious farmhouses.",
          "100% Clear Title Plots: Features Gram Panchayat (GP) approved layouts with the Layout Regularization Scheme (LRS) fully paid, ensuring hassle-free ownership.",
        ],
      },
      {
        title: "Prime Connectivity & Strategic Location",
        intro:
          "Jalpally offers seamless connectivity to key commercial hubs and easy transit networks across Hyderabad:",
        items: [
          "Rajiv Gandhi International Airport (Shamshabad): 20-minute drive",
          "Outer Ring Road (ORR): 12-minute drive",
          "PVNR Expressway: 18-minute drive",
        ],
      },
    ],
    plotLabel: "AVAILABLE PLOTS",
    availablePlots: [
      { plotNumber: "Plot No. 1", area: "419 Sq. Yd." },
      { plotNumber: "Plot No. 7", area: "117 Sq. Yd." },
      { plotNumber: "Plot No. 8", area: "118 Sq. Yd." },
      { plotNumber: "Plot No. 33", area: "400 Sq. Yd." },
      { plotNumber: "Plot No. 34", area: "147 Sq. Yd." },
      { plotNumber: "Plot No. 43", area: "333 Sq. Yd." },
      { plotNumber: "Plot No. 45", area: "308 Sq. Yd." },
      { plotNumber: "Plot No. 46", area: "803 Sq. Yd." },
      { plotNumber: "Plot No. 46A", area: "345 Sq. Yd." },
    ],
    locationHighlights: [
      "Near RGIA, Shamshabad",
      "Near PVNR Expressway",
      "Near Hyderabad ORR",
    ],
    projectHighlights: [
      "Gated Layout Options",
      "Independent House Plots",
      "Semi-Urban scenic setting",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4098.660461216072!2d78.44324678810361!3d17.274968217617037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDE2JzI5LjMiTiA3OMKwMjYnMzYuNCJF!5e1!3m2!1sen!2sin!4v1787658046656!5m2!1sen!2sin",
  },
  {
    id: "mothighanapur",
    projectName: "Mothighanapur",
    dealTitle: "Mothighanapur — Farm Plots",
    description:
      "A NALA-converted farmland project by Flivv Developers in Mothighanapur, a Gram Panchayat in Balanagar Mandal, Mahabubnagar district, within Hyderabad's expanding South corridor. The 2-acre layout is divided into 10 individual plots of 1,000 sq. yards each, with direct access from a 50 ft. main road and 30 ft. internal roads. A one-time payment option is available, structured as a long-term hold of 5–10 years.",
    plotLabel: "AVAILABLE PLOTS",
    availablePlot: { plotNumber: "10 Plots", area: "1,000 Sq. Yd. each" },
    locationHighlights: [
      "12 km from Shadnagar",
      "3.5 km from NH-44",
      "53 km from Aramghar",
    ],
    projectHighlights: [
      "Registry in sq. yards",
      "50 ft. Main Road Access",
      "30 ft. Internal Roads",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2048.5261487305042!2d78.16350566101266!3d16.999482906602857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDU5JzU1LjciTiA3OMKwMDknNTAuMyJF!5e1!3m2!1sen!2sin!4v1787646320051!5m2!1sen!2sin",
  },
  {
    id: "airport-town-1041",
    projectName: "Airport Town",
    dealTitle: "Airport Town",
    description:
      "One of our most strategically located projects, just 2 km from Bangalore Highway (NH-44) in the R1 zone, GP layout. Location is close to Kothur town and everyday essentials — built for both ready-to-construct homes and long-term investment.",
    availablePlot: { plotNumber: "Plot No. 8", area: "1,041 Sq. Yd." },
    locationHighlights: [
      "19 km from RGIA",
      "28 km from Aramghar",
      "2 km from NH-44",
      "2 km from Kothur Town",
    ],
    projectHighlights: [
      "30 ft. Internal Roads",
      "Electricity",
      "Two way access",
      "Beside the Park",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3090.2755095124735!2d78.31039251464864!3d17.133868721197903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDA4JzAyLjEiTiA3OMKwMTgnNDAuMiJF!5e1!3m2!1sen!2sin!4v1787646542586!5m2!1sen!2sin",
  },
  {
    id: "airport-drive",
    projectName: "Airport Drive",
    dealTitle: "Airport Drive",
    description:
      "Situated in Nandigama Mandal, Ranga Reddy District, roughly 50 km south of Hyderabad near Kothur — a fast-growing corridor along NH-44 with seamless connectivity to the Outer Ring Road and Rajiv Gandhi International Airport. The area is emerging as a major hub for warehousing, logistics and industrial development, alongside a rising base of residential layouts and gated communities.",
    availablePlot: { plotNumber: "Plot No. 569", area: "995 Sq. Yd." },
    locationHighlights: [
      "Near NH-44 Highway",
      "Close to Shadnagar",
      "Near ORR & RGIA Airport",
      "~50 km South of Hyderabad",
    ],
    projectHighlights: [
      "Logistics & Industrial Hub",
      "Growing Residential Layouts",
      "Highway Corridor Access",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2439.8411708896315!2d78.31330079773414!3d17.128530872852682!2m3!1f0!2f0!3f0!3m2!1m1!2zMTfCsDA3JzQzLjUiTiA3OMKwMTgnNDkuMiJF!5e1!3m2!1sen!2sin!4v1787658166154!5m2!1sen!2sin",
  },
];

/* ------------------------------------------------------------------ */
/*  HUBSPOT — see the long comment above HubSpotFormFrame for why      */
/*  this is built the way it is.                                       */
/* ------------------------------------------------------------------ */

const HUBSPOT_PORTAL_ID = "21626983";
const HUBSPOT_REGION = "na2";
const HUBSPOT_FORM_ID = "f9316b20-4e64-4844-8a13-cbd7682fbb38";

const HUBSPOT = {
  portalId: HUBSPOT_PORTAL_ID,
  region: HUBSPOT_REGION,
  formId: HUBSPOT_FORM_ID,
  scriptSrc: `https://js-${HUBSPOT_REGION}.hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}.js`,
};

/* ------------------------------------------------------------------ */
/*  STYLE TOKENS — premium dark theme with gold accents                */
/* ------------------------------------------------------------------ */

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

    .qd-root {
      --bg: #11100E;
      --surface: #1E1C18;
      --ink: #F2EEE5;
      --ink-soft: #C9C0B2;
      --ink-faint: #8A7E6A;
      --accent: #D4AF37;
      --accent-deep: #B8942A;
      --forest: #2A2721;
      --forest-tint: #3A3630;
      --line: #3D3830;
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      color: var(--ink);
      background:
        radial-gradient(ellipse 70% 55% at 18% -5%, rgba(212,175,55,0.12), transparent 60%),
        radial-gradient(ellipse 60% 50% at 100% 105%, rgba(42,53,39,0.15), transparent 60%),
        radial-gradient(ellipse 55% 45% at 50% 35%, rgba(212,175,55,0.06), transparent 70%),
        var(--bg);
      position: relative;
    }
    .qd-root::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(242,238,229,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(242,238,229,0.04) 1px, transparent 1px);
      background-size: 64px 64px;
      -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, black, transparent 75%);
      mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, black, transparent 75%);
      pointer-events: none;
    }

    .qd-nav-gradient {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 220px;
      background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0) 100%);
      pointer-events: none;
      z-index: 1;
    }
    @media (max-width: 640px) {
      .qd-nav-gradient { height: 150px; }
    }

    .qd-section {
      padding: 168px 0 100px;
      position: relative;
    }
    @media (max-width: 640px) {
      .qd-section { padding: 118px 0 72px; }
    }

    .qd-font-display { font-family: 'Fraunces', ui-serif, Georgia, serif; }
    .qd-font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

    .qd-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.18em;
      color: var(--accent);
    }
    .qd-eyebrow-line {
      width: 28px;
      height: 1px;
      background: repeating-linear-gradient(90deg, var(--accent) 0 4px, transparent 4px 8px);
    }

    .qd-card {
      position: relative;
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 26px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.4), 0 12px 32px -12px rgba(0,0,0,0.6);
      overflow: hidden;
      transition: transform 0.45s cubic-bezier(.22,.68,0,1), box-shadow 0.45s cubic-bezier(.22,.68,0,1), border-color 0.45s ease;
    }
    .qd-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent) 0%, #E8D08A 50%, var(--accent) 100%);
      opacity: 0.9;
      z-index: 1;
    }
    .qd-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 1px 2px rgba(0,0,0,0.5), 0 28px 48px -20px rgba(0,0,0,0.7);
      border-color: #5A4F3A;
    }

    .qd-grid {
      display: grid;
      grid-template-columns: 42% 58%;
      min-height: 460px;
    }
    @media (max-width: 1024px) {
      .qd-grid { grid-template-columns: 1fr; min-height: 0; }
    }

    .qd-map-wrap {
      position: relative;
      background: var(--forest-tint);
      min-height: 320px;
    }
    @media (max-width: 1024px) {
      .qd-map-wrap { min-height: 260px; }
    }
    .qd-map-wrap iframe { display: block; width: 100%; height: 100%; position: absolute; inset: 0; }

    .qd-map-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      pointer-events: none;
      background: rgba(0,0,0,0.75);
      color: #F2EEE5;
      backdrop-filter: blur(4px);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 7px 12px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      z-index: 2;
    }

    .qd-content { padding: 40px 40px 36px; display: flex; flex-direction: column; }
    @media (max-width: 640px) { .qd-content { padding: 28px 22px 26px; } }

    .qd-deal-label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      align-self: flex-start;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: var(--accent);
      background: rgba(212,175,55,0.12);
      border: 1px solid rgba(212,175,55,0.25);
      padding: 6px 12px;
      border-radius: 999px;
      margin-bottom: 18px;
    }
    .qd-deal-label::before {
      content: '';
      width: 6px; height: 6px; border-radius: 999px;
      background: var(--accent);
      flex-shrink: 0;
    }

    .qd-heading {
      font-size: clamp(24px, 2.4vw, 32px);
      line-height: 1.15;
      font-weight: 500;
      color: var(--ink);
      margin-bottom: 14px;
    }

    .qd-description {
      color: var(--ink-soft);
      font-size: 15px;
      line-height: 1.7;
      max-width: 58ch;
      margin-bottom: 8px;
    }
    .qd-description p { margin: 0 0 12px; }
    .qd-description p:last-child { margin-bottom: 0; }

    .qd-subsection {
      max-width: 58ch;
      margin-top: 22px;
      padding-top: 18px;
      border-top: 1px solid var(--line);
    }
    .qd-subsection-title {
      font-size: 16.5px;
      font-weight: 500;
      color: var(--ink);
      margin-bottom: 10px;
    }
    .qd-subsection-intro {
      font-size: 14px;
      color: var(--ink-soft);
      line-height: 1.6;
      margin: 0 0 10px;
    }
    .qd-subsection-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 9px;
    }
    .qd-subsection-item {
      display: flex;
      align-items: flex-start;
      gap: 11px;
      font-size: 14px;
      line-height: 1.65;
      color: var(--ink-soft);
    }
    .qd-subsection-bullet {
      flex-shrink: 0;
      width: 7px;
      height: 7px;
      margin-top: 7px;
      background: var(--accent);
      transform: rotate(45deg);
      border-radius: 1px;
    }
    .qd-subsection-item-label { color: var(--ink); font-weight: 600; }

    .qd-stamp {
      display: flex;
      align-items: center;
      gap: 18px;
      border: 1.5px dashed rgba(212,175,55,0.3);
      background: rgba(212,175,55,0.06);
      border-radius: 16px;
      padding: 16px 20px;
      margin-bottom: 28px;
      position: relative;
      overflow: hidden;
    }
    .qd-stamp-icon {
      flex-shrink: 0;
      width: 38px; height: 38px;
      border-radius: 999px;
      background: var(--surface);
      border: 1px solid rgba(212,175,55,0.3);
      display: flex; align-items: center; justify-content: center;
      transform: rotate(-8deg);
      color: var(--accent);
    }
    .qd-stamp-label {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: var(--accent);
      margin-bottom: 3px;
    }
    .qd-stamp-value {
      font-size: 17px;
      font-weight: 600;
      color: var(--ink);
    }
    .qd-stamp-sep { color: var(--ink-faint); margin: 0 10px; }

    .qd-stamp-multi { align-items: flex-start; }
    .qd-stamp-multi-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 6px 22px;
      margin-top: 8px;
      width: 100%;
    }
    .qd-stamp-chip {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
      font-size: 13px;
      white-space: nowrap;
      min-width: 0;
    }
    .qd-stamp-chip-num { font-weight: 600; color: var(--ink); flex-shrink: 0; }
    .qd-stamp-chip-area {
      color: var(--ink-soft);
      font-size: 12.5px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (max-width: 640px) {
      .qd-stamp-multi-grid { grid-template-columns: 1fr; gap: 10px; }
      .qd-stamp-chip {
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        white-space: normal;
      }
      .qd-stamp-chip-area { overflow: visible; text-overflow: clip; }
    }
    @media (max-width: 480px) {
      .qd-stamp { padding: 13px 14px; gap: 12px; }
      .qd-stamp-icon { width: 32px; height: 32px; }
    }

    .qd-highlights {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 30px;
      padding-top: 22px;
      border-top: 1px solid var(--line);
    }
    @media (max-width: 560px) {
      .qd-highlights { grid-template-columns: 1fr; }
    }
    .qd-highlight-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: var(--ink-faint);
      margin-bottom: 12px;
    }
    .qd-highlight-item {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      font-size: 14px;
      color: var(--ink-soft);
      line-height: 1.5;
      margin-bottom: 9px;
    }
    .qd-highlight-item svg { flex-shrink: 0; margin-top: 2px; }
    .qd-highlight-item.location svg { color: var(--accent); }
    .qd-highlight-item.project svg { color: var(--accent); }

    .qd-cta {
      margin-top: auto;
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--accent);
      color: #11100E;
      font-size: 14.5px;
      font-weight: 600;
      padding: 14px 24px;
      border-radius: 999px;
      border: none;
      cursor: pointer;
      transition: transform 0.25s ease, background 0.25s ease;
    }
    .qd-cta:hover { background: #E8D08A; }
    .qd-cta:active { transform: scale(0.97); }
    .qd-cta:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    @media (max-width: 640px) { .qd-cta { width: 100%; justify-content: center; } }

    /* ---- modal ---- */
    .qd-modal-backdrop {
      position: fixed; inset: 0; z-index: 100;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
    }
    .qd-modal {
      width: 100%;
      max-width: 520px;
      max-height: 90vh;
      overflow: auto;
      background: var(--surface);
      border-radius: 22px;
      border: 1px solid var(--line);
      box-shadow: 0 40px 80px -24px rgba(0,0,0,0.8);
      position: relative;
      padding: 32px 32px 28px;
    }
    @media (max-width: 640px) {
      .qd-modal { width: calc(100% - 0px); padding: 26px 20px 22px; }
    }
    .qd-modal-close {
      position: absolute; top: 18px; right: 18px;
      width: 34px; height: 34px;
      border-radius: 999px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(255,255,255,0.06);
      border: 1px solid var(--line);
      color: var(--ink-soft);
      cursor: pointer;
    }
    .qd-modal-close:hover { background: rgba(255,255,255,0.12); color: var(--ink); }
    .qd-modal-close:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

    .qd-modal-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.1em;
      color: var(--accent);
      margin-bottom: 8px;
    }
    .qd-modal-heading {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 6px;
    }
    .qd-modal-project {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 13.5px;
      color: var(--ink-soft);
      background: rgba(212,175,55,0.08);
      border: 1px solid rgba(212,175,55,0.2);
      padding: 5px 12px;
      border-radius: 999px;
      margin-bottom: 22px;
    }
    .qd-hs-form-target { min-height: 220px; }
    .qd-hs-loading {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 12px;
      min-height: 180px;
      color: var(--ink-faint);
      font-size: 13.5px;
      text-align: center;
      padding: 0 8px;
    }
    .qd-hs-loading span { max-width: 340px; line-height: 1.6; }
    .qd-hs-spinner {
      width: 22px; height: 22px;
      border-radius: 999px;
      border: 2.5px solid var(--line);
      border-top-color: var(--accent);
      animation: qd-spin 0.8s linear infinite;
    }
    @keyframes qd-spin { to { transform: rotate(360deg); } }
    .qd-hs-retry {
      background: none;
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 8px 16px;
      color: var(--ink-soft);
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
    }
    .qd-hs-retry:hover { background: rgba(255,255,255,0.06); color: var(--ink); }

    @media (prefers-reduced-motion: reduce) {
      .qd-card, .qd-cta { transition: none !important; }
      .qd-hs-spinner { animation: none; }
    }
  `}</style>
);

/* ------------------------------------------------------------------ */
/*  DEAL CARD                                                           */
/* ------------------------------------------------------------------ */

function QuickDealCard({ deal, index, onSelect, prefersReducedMotion }) {
  return (
    <motion.article
      className="qd-card"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 0.68, 0, 1] }}
      aria-labelledby={`${deal.id}-heading`}
    >
      <div className="qd-grid">
        <div className="qd-map-wrap">
          <span className="qd-map-badge">
            <MapPin size={12} aria-hidden="true" />
            View Location
          </span>
          {deal.mapEmbedUrl ? (
            <iframe
              src={deal.mapEmbedUrl}
              title={`Map location for ${deal.projectName}`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ border: 0 }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--ink-faint)",
                fontSize: 13,
              }}
            >
              Map coming soon
            </div>
          )}
        </div>

        <div className="qd-content">
          <span className="qd-deal-label">QUICK DEAL</span>

          <h3 id={`${deal.id}-heading`} className="qd-heading qd-font-display">
            {deal.dealTitle}
          </h3>

          <div className="qd-description">
            {(Array.isArray(deal.description) ? deal.description : [deal.description]).map(
              (para, i) => (
                <p key={i}>{para}</p>
              )
            )}
          </div>

          {deal.descriptionSections?.map((section, si) => (
            <div className="qd-subsection" key={si}>
              <div className="qd-subsection-title qd-font-display">{section.title}</div>
              {section.intro && <p className="qd-subsection-intro">{section.intro}</p>}
              <ul className="qd-subsection-list">
                {section.items.map((item, ii) => {
                  const colonIdx = item.indexOf(":");
                  const label = colonIdx > -1 ? item.slice(0, colonIdx) : null;
                  const rest = colonIdx > -1 ? item.slice(colonIdx + 1).trim() : item;
                  return (
                    <li className="qd-subsection-item" key={ii}>
                      <span className="qd-subsection-bullet" aria-hidden="true" />
                      <span>
                        {label && <strong className="qd-subsection-item-label">{label}:</strong>}{" "}
                        {rest}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {!deal.hidePlotBox && (
  <>
    {deal.id === "jalpally" ? (
      // Simplified plot display for Jalpally
      <div className="qd-stamp" style={{ marginTop: '24px' }}>
        <div className="qd-stamp-icon">
          <Compass size={18} aria-hidden="true" />
        </div>
        <div>
          <div className="qd-stamp-label">{deal.plotLabel || "AVAILABLE PLOTS"}</div>
          <div className="qd-stamp-value" style={{ fontSize: '20px' }}>
            9 plots available
          </div>
        </div>
      </div>
    ) : (
      // Existing plot display logic for other deals
      deal.availablePlots ? (
        <div className="qd-stamp qd-stamp-multi" style={{ marginTop: '24px' }}>
          <div className="qd-stamp-icon">
            <Compass size={18} aria-hidden="true" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="qd-stamp-label">
              {deal.plotLabel || "AVAILABLE PLOTS"} ({deal.availablePlots.length})
            </div>
            <div className="qd-stamp-multi-grid">
              {deal.availablePlots.map((p, i) => (
                <div className="qd-stamp-chip qd-font-mono" key={i}>
                  <span className="qd-stamp-chip-num">{p.plotNumber}</span>
                  <span className="qd-stamp-chip-area">{p.area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="qd-stamp" style={{ marginTop: '24px' }}>
          <div className="qd-stamp-icon">
            <Compass size={18} aria-hidden="true" />
          </div>
          <div>
            <div className="qd-stamp-label">{deal.plotLabel || "AVAILABLE PLOT"}</div>
            <div className="qd-stamp-value qd-font-mono">
              {deal.availablePlot.plotNumber}
              <span className="qd-stamp-sep">·</span>
              {deal.availablePlot.area}
            </div>
          </div>
        </div>
      )
    )}
  </>
)}

          <div className="qd-highlights">
            <div>
              <div className="qd-highlight-title">LOCATION PERKS</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {deal.locationHighlights.map((item, i) => (
                  <li className="qd-highlight-item location" key={i}>
                    <MapPin size={14} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="qd-highlight-title">HIGHLIGHTS</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {deal.projectHighlights.map((item, i) => (
                  <li className="qd-highlight-item project" key={i}>
                    <CheckCircle2 size={14} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            type="button"
            className="qd-cta"
            onClick={() => onSelect(deal)}
            aria-label={`Get deal details for ${deal.projectName}`}
          >
            Get Deal Details
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  HUBSPOT FORM                                                        */
/*  Loading mechanism (remove-and-reinject the embed script whenever    */
/*  the popup opens, so the .hs-form-frame div is always in the DOM     */
/*  before the script's own scan runs) is unchanged from the version    */
/*  that fixed the popup not opening at all.                            */
/*                                                                       */
/*  Added below: a listener for HubSpot's documented "Global Form       */
/*  Events" postMessage — the closest thing to a real onFormReady       */
/*  callback that still works for a form rendered inside a cross-origin */
/*  iframe (which is what this embed type uses; the classic             */
/*  hbspt.forms.create({ onFormReady }) callback isn't available for    */
/*  this specific form, see the note in project history). HubSpot's own */
/*  community reports say this postMessage event can fire inconsistently*/
/*  for the embed-script method specifically, so it supplements the     */
/*  existing DOM watcher rather than replacing it — whichever signal    */
/*  arrives first marks the form ready.                                 */
/* ------------------------------------------------------------------ */

function HubSpotFormFrame({ projectName }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let timeoutId;
    setStatus("loading");

    function markReady() {
      if (cancelled) return;
      setStatus("ready");
      observer.disconnect();
      window.removeEventListener("message", handleMessage);
      if (timeoutId) window.clearTimeout(timeoutId);
    }

    const observer = new MutationObserver(() => {
      if (container.querySelector("iframe")) markReady();
    });
    observer.observe(container, { childList: true, subtree: true });

    // HubSpot's documented Global Form Events: the form iframe posts
    // this message to the parent window once it has rendered.
    // https://developers.hubspot.com/docs/reference/api/library/forms#global-form-events
    const handleMessage = (event) => {
      const data = event.data;
      if (
        data &&
        data.type === "hsFormCallback" &&
        data.eventName === "onFormReady" &&
        (!data.id || data.id === HUBSPOT.formId)
      ) {
        markReady();
      }
    };
    window.addEventListener("message", handleMessage);

    document
      .querySelectorAll('script[data-qd-hs-script]')
      .forEach((s) => s.remove());

    const script = document.createElement("script");
    script.src = HUBSPOT.scriptSrc;
    script.defer = true;
    script.setAttribute("data-qd-hs-script", "true");
    script.addEventListener("error", () => {
      console.error(
        "[QuickDeals] HubSpot embed script failed to load from",
        HUBSPOT.scriptSrc,
        "— check for an ad-blocker or a site CSP header blocking hsforms.net."
      );
      if (!cancelled) setStatus("script-error");
    });
    document.body.appendChild(script);

    timeoutId = window.setTimeout(() => {
      if (cancelled) return;
      if (container.querySelector("iframe")) {
        markReady();
      } else {
        console.warn(
          "[QuickDeals] HubSpot script loaded but no form iframe appeared.",
          "Double-check the portalId/formId, and that this domain is",
          "approved under HubSpot → Marketing → Forms → this form →",
          "Options → embed settings."
        );
        setStatus("timeout");
      }
    }, 9000);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("message", handleMessage);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [retryCount]);

  const retry = () => setRetryCount((c) => c + 1);

  return (
    <>
      <div
        ref={containerRef}
        className="hs-form-frame qd-hs-form-target"
        data-region={HUBSPOT.region}
        data-form-id={HUBSPOT.formId}
        data-portal-id={HUBSPOT.portalId}
        style={{ display: status === "ready" ? "block" : "none" }}
      />
      {status === "loading" && (
        <div className="qd-hs-loading">
          <div className="qd-hs-spinner" aria-hidden="true" />
          <span>Loading form…</span>
        </div>
      )}
      {status === "script-error" && (
        <div className="qd-hs-loading">
          <span>
            The form script couldn't load — this is usually an ad-blocker
            or a Content-Security-Policy header on this site blocking
            hsforms.net.
          </span>
          <button type="button" className="qd-hs-retry" onClick={retry}>
            Retry
          </button>
        </div>
      )}
      {status === "timeout" && (
        <div className="qd-hs-loading">
          <span>
            The form script loaded, but the form didn't appear. In
            HubSpot, check that this site's domain is approved under this
            form's embed settings, and that the Portal ID / Form ID are
            correct.
          </span>
          <button type="button" className="qd-hs-retry" onClick={retry}>
            Retry
          </button>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  MODAL SHELL                                                         */
/* ------------------------------------------------------------------ */

function DealFormModal({ deal, onClose, prefersReducedMotion }) {
  const closeRef = useRef(null);
  const projectName = deal?.projectName ?? "";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const originalUrl = window.location.href;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("project", projectName);
      window.history.replaceState(null, "", url);
    } catch (e) {
      /* URL prefill is best-effort */
    }

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      try {
        window.history.replaceState(null, "", originalUrl);
      } catch (e) {
        /* noop */
      }
    };
  }, [onClose, projectName]);

  return (
    <motion.div
      className="qd-modal-backdrop"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <motion.div
        className="qd-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="qd-modal-heading"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.3, ease: [0.22, 0.68, 0, 1] }}
      >
        <button
          ref={closeRef}
          type="button"
          className="qd-modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={16} aria-hidden="true" />
        </button>

        <span className="qd-modal-chip">QUICK DEAL</span>
        <h2 id="qd-modal-heading" className="qd-modal-heading qd-font-display">
          Get Deal Details
        </h2>
        <span className="qd-modal-project">
          <MapPin size={13} aria-hidden="true" />
          Enquiring about {projectName}
        </span>

        <HubSpotFormFrame projectName={projectName} />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN SECTION COMPONENT                                              */
/* ------------------------------------------------------------------ */

export default function QuickDeals() {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!document.querySelector("script[data-qd-hs-preload]")) {
      const script = document.createElement("script");
      script.src = HUBSPOT.scriptSrc;
      script.defer = true;
      script.setAttribute("data-qd-hs-preload", "true");
      document.body.appendChild(script);
    }
  }, []);

  const handleSelect = (deal) => setSelectedDeal(deal);
  const handleClose = () => setSelectedDeal(null);

  return (
    <div className="qd-root">
      <Styles />
      <div className="qd-nav-gradient" aria-hidden="true" />
      <section id="quick-deals" className="qd-section">
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="qd-eyebrow">
              <span className="qd-eyebrow-line" />
              LIMITED-TIME OPPORTUNITIES
              <span className="qd-eyebrow-line" />
            </span>
            <h2
              className="qd-font-display"
              style={{
                fontSize: "clamp(34px, 4.2vw, 52px)",
                fontWeight: 500,
                margin: "18px 0 16px",
                color: "var(--ink)",
              }}
            >
              QUICK DEALS
            </h2>
            <p
              style={{
                maxWidth: 560,
                margin: "0 auto",
                color: "var(--ink-soft)",
                fontSize: 16,
                lineHeight: 1.7,
              }}
            >
              Exclusive plot opportunities available for a limited time. Explore
              the latest deals and register your interest before they are gone.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {DEALS.map((deal, i) => (
              <QuickDealCard
                key={deal.id}
                deal={deal}
                index={i}
                onSelect={handleSelect}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedDeal && (
          <DealFormModal
            deal={selectedDeal}
            onClose={handleClose}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      </AnimatePresence>
    </div>
  );
}