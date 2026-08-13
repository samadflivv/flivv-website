/**
 * NSHomesCompletedProject.jsx
 * ---------------------------------------------------------------------------
 * A premium "completed project" showcase page for NS Homes (Flivv Developers).
 *
 * Design direction
 *  NS Homes is a DTCP + RERA approved open-plot venture — the story here is
 *  surveyed land, legal precision and delivered infrastructure, not a glossy
 *  apartment-tower fantasy. The visual language borrows from land surveying:
 *  benchmark/coordinate markers, contour-line texture, and ledger-style
 *  statistics, set in an earthen palette (maroon / stone / ink)
 *  instead of the generic cream-and-terracotta real-estate default.
 *
 * Stack: React (JS only) + Tailwind CSS + Framer Motion + GSAP/ScrollTrigger
 *        + lucide-react icons, per the project brief.
 *
 * Integration notes
 *  - This component intentionally renders NO <nav> / <header> / <footer> —
 *    those already exist in the host project, as specified in the brief.
 *  - Requires: npm i framer-motion gsap lucide-react
 *  - Google Fonts (Fraunces / Inter / IBM Plex Mono) and the HubSpot embed
 *    script are injected client-side on mount.
 *  - All imagery is a deliberate placeholder system (labelled survey-style
 *    tiles) — swap <ImagePlaceholder> for real <img>/<picture> elements when
 *    final photography is ready; the tag/caption props map 1:1 to alt text.
 * ---------------------------------------------------------------------------
 */
'use client';
import React, { useEffect, useRef, useState, useId, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  Crosshair,
  CheckCircle2,
  Route,
  Droplets,
  Zap,
  Waves,
  TreePine,
  ShieldCheck,
  DoorOpen,
  Users,
  Ruler,
  Grid3x3,
  LayoutGrid,
  Recycle,
  Milestone,
  Building2,
  Home,
  MapPin,
  GraduationCap,
  Leaf,
  Train,
  Trophy,
  FlaskConical,
  Construction,
  Award,
  FileCheck2,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import NSHdevprogress from "./NSHdevprogress";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* =============================================================================
   DESIGN TOKENS
============================================================================= */

const GlobalStyle = () => (
  <style>{`
    .ns-homes-page {
      --ink: #1C1414;
      --ink-soft: #2A1B1B;
      --stone: #F3EFE4;
      --stone-soft: #E9E2CE;
      --maroon: #7A2033;
      --maroon-deep: #591825;
      --blush: #C98A96;
      --graphite: #26221E;
      --hairline: rgba(122,32,51,0.28);

      --font-display: 'Fraunces', 'Iowan Old Style', serif;
      --font-body: 'Inter', -apple-system, sans-serif;
      --font-mono: 'IBM Plex Mono', 'SFMono-Regular', monospace;

      background: var(--stone);
      color: var(--graphite);
      font-family: var(--font-body);
      position: relative;
    }

    .ns-homes-page .font-display { font-family: var(--font-display); }
    .ns-homes-page .font-mono { font-family: var(--font-mono); }

    .ns-homes-page ::selection { background: var(--maroon); color: var(--stone); }

    .ns-homes-page *:focus-visible {
      outline: 2px solid var(--maroon);
      outline-offset: 3px;
    }

    @media (prefers-reduced-motion: reduce) {
      .ns-homes-page * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }

    /* Editorial drop cap */
    .ns-editorial p.has-dropcap::first-letter {
      font-family: var(--font-display);
      font-size: 4.4rem;
      line-height: 0.78;
      float: left;
      padding-right: 0.55rem;
      padding-top: 0.35rem;
      color: var(--maroon);
      font-weight: 500;
    }

    /* Button shine sweep */
    .ns-btn-shine { position: relative; overflow: hidden; }
    .ns-btn-shine::after {
      content: "";
      position: absolute;
      top: 0; left: -60%;
      width: 40%; height: 100%;
      background: linear-gradient(115deg, transparent, rgba(255,255,255,0.35), transparent);
      transform: skewX(-18deg);
      transition: left 0.65s ease;
    }
    .ns-btn-shine:hover::after { left: 130%; }

    /* Neumorphic contact card (light) */
    .ns-neumorph {
      background: var(--stone);
      border-radius: 22px;
      box-shadow: 10px 10px 26px rgba(28,20,20,0.10), -10px -10px 22px rgba(255,255,255,0.75);
    }

    .ns-hairline { background: var(--hairline); }

    /* Contour texture: full strength on desktop, dialed back and less busy on
       small screens where the tight repeating pattern reads noisy rather
       than refined. */
    .ns-contour { opacity: var(--co, 0.12); }
    @media (max-width: 767px) {
      .ns-contour { opacity: calc(var(--co, 0.12) * 0.4); }
    }

    .ns-marquee-track { display: flex; width: max-content; animation: ns-marquee 34s linear infinite; }
    @keyframes ns-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    .ns-stamp {
      transform: rotate(-7deg);
      border: 1.5px solid var(--maroon);
      color: var(--maroon);
    }

    .ns-timeline-fill { transform-origin: left center; }

    .ns-scroll-cue { animation: ns-cue 2.2s ease-in-out infinite; }
    @keyframes ns-cue { 0%,100% { transform: translateY(0); opacity: .55; } 50% { transform: translateY(8px); opacity: 1; } }
  `}</style>
);

/* =============================================================================
   SMALL BUILDING BLOCKS
============================================================================= */

/** Subtle topographic contour-line texture — the page's recurring "surveyed
 *  land" signature, used behind hero, placeholders and dark sections. */
const ContourField = ({ opacity = 0.12, stroke = "var(--maroon)", className = "" }) => {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      className={`ns-contour absolute inset-0 h-full w-full pointer-events-none ${className}`}
      style={{ "--co": opacity }}
      viewBox="0 0 320 320"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id={`contour-${uid}`} width="110" height="90" patternUnits="userSpaceOnUse">
          <path d="M-10 22 Q17.5 0 45 22 T100 22 T155 22" fill="none" stroke={stroke} strokeWidth="0.8" />
          <path d="M-10 50 Q17.5 28 45 50 T100 50 T155 50" fill="none" stroke={stroke} strokeWidth="0.8" />
          <path d="M-10 78 Q17.5 56 45 78 T100 78 T155 78" fill="none" stroke={stroke} strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="320" height="320" fill={`url(#contour-${uid})`} />
    </svg>
  );
};

/** Signature "benchmark" eyebrow label — a surveyor's mark used to open
 *  every section, echoing the fact that every plot here was measured,
 *  registered and signed off. */
const PlotMarker = ({ code, children, tone = "onLight", color: colorOverride }) => {
  const color = colorOverride || (tone === "onLight" ? "var(--maroon-deep)" : "var(--blush)");
  return (
    <div className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color }}>
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border" style={{ borderColor: color }}>
        <Crosshair size={10} strokeWidth={2} />
      </span>
      <span>{code}</span>
      <span className="h-px w-6" style={{ background: color, opacity: 0.5 }} />
      <span>{children}</span>
    </div>
  );
};

/** Imagery system — renders a real photograph when `src` is provided, otherwise
 *  falls back to gradient + contour texture + caption tag. `tag` doubles as the
 *  alt-text source. */
const ImagePlaceholder = ({ tag, tone = "stone", aspect = "aspect-[4/3]", className = "", src }) => {
  const isInk = tone === "ink";
  return (
    <div
      role="img"
      aria-label={tag || "NS Homes site photograph placeholder"}
      className={`relative overflow-hidden rounded-[3px] ${aspect} ${className}`}
      style={{
        background: isInk
          ? "linear-gradient(150deg,#2A1B1B 0%,#150F0F 100%)"
          : "linear-gradient(150deg,#E9E2CE 0%,#DCD3B8 100%)",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={tag || "NS Homes site photograph"}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <>
          <ContourField opacity={isInk ? 0.16 : 0.22} stroke={isInk ? "#C98A96" : "#7A2033"} />
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon size={20} strokeWidth={1.25} style={{ color: isInk ? "var(--blush)" : "var(--maroon-deep)", opacity: 0.55 }} />
          </div>
        </>
      )}
      {tag && (
        <div
          className="font-mono absolute bottom-3 left-3 rounded-sm px-2 py-1 text-[10px] uppercase tracking-[0.14em]"
          style={{
            background: isInk ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.55)",
            color: isInk ? "var(--stone)" : "var(--graphite)",
            backdropFilter: "blur(2px)",
          }}
        >
          {tag}
        </div>
      )}
    </div>
  );
};

/** Live Google Maps embed for the site location, framed to match the rest
 *  of the placeholder imagery system (corner tag, hairline border). */
const LocationMap = ({
  src,
  directionsUrl,
  label = "Site Location",
  aspect = "aspect-[4/3] lg:aspect-[4/5]",
  className = "",
}) => (
  <div
    className={`relative overflow-hidden rounded-[3px] border ${aspect} ${className}`}
    style={{ borderColor: "rgba(122,32,51,0.3)" }}
  >
    <iframe
      title="NS Homes site location"
      src={src}
      className="absolute inset-0 h-full w-full"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
    <div
      className="font-mono pointer-events-none absolute left-3 top-3 rounded-sm px-2 py-1 text-[10px] uppercase tracking-[0.14em]"
      style={{ background: "rgba(28,20,20,0.55)", color: "var(--stone)", backdropFilter: "blur(2px)" }}
    >
      {label}
    </div>
    {directionsUrl && (
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-[10.5px] uppercase tracking-[0.12em] transition-colors duration-300 hover:bg-[var(--maroon-deep)]"
        style={{ background: "var(--maroon)", color: "var(--stone)" }}
      >
        Get Directions
        <ArrowUpRight size={11} strokeWidth={2} />
      </a>
    )}
  </div>
);

/** Scroll-reveal wrapper (Framer Motion), respects reduced-motion. */
const Reveal = ({ children, delay = 0, y = 22, className = "" }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const Chip = ({ icon: Icon, children, tone = "onDark" }) => (
  <span
    className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium"
    style={
      tone === "onDark"
        ? { borderColor: "rgba(243,239,228,0.28)", color: "var(--stone)", background: "rgba(255,255,255,0.05)" }
        : { borderColor: "rgba(122,32,51,0.35)", color: "var(--maroon-deep)", background: "rgba(122,32,51,0.07)" }
    }
  >
    {Icon && <Icon size={13} strokeWidth={2} />}
    {children}
  </span>
);

const StatRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between gap-4 py-4" style={{ borderBottom: "1px solid rgba(38,34,30,0.10)" }}>
    <div className="flex items-center gap-3">
      {Icon && <Icon size={15} strokeWidth={1.75} style={{ color: "var(--maroon-deep)" }} />}
      <span className="font-mono text-[12px] uppercase tracking-[0.13em]" style={{ color: "rgba(38,34,30,0.58)" }}>
        {label}
      </span>
    </div>
    <span className="font-display text-[17px]" style={{ color: "var(--graphite)" }}>
      {value}
    </span>
  </div>
);

const InfraCard = ({ icon: Icon, title, note, index }) => (
  <Reveal delay={(index % 4) * 0.07}>
    <div className="group relative h-full rounded-[6px] border p-6 transition-all duration-500 hover:-translate-y-1"
      style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
    >
      <div
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 group-hover:bg-[var(--maroon)]"
        style={{ borderColor: "rgba(243,239,228,0.35)", color: "var(--stone)" }}
      >
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <h4 className="font-display mb-1.5 text-[17px]" style={{ color: "var(--stone)" }}>{title}</h4>
      <p className="text-[13px] leading-relaxed" style={{ color: "var(--blush)" }}>{note}</p>
    </div>
  </Reveal>
);

const AmenityCard = ({ icon: Icon, title, note, index }) => (
  <Reveal delay={(index % 4) * 0.07}>
    <div className="group h-full rounded-[6px] border bg-white/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white/70"
      style={{ borderColor: "rgba(38,34,30,0.08)" }}
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500 group-hover:bg-[var(--maroon)]"
        style={{ background: "rgba(122,32,51,0.12)", color: "var(--maroon-deep)" }}
      >
        <Icon size={18} strokeWidth={1.75} className="transition-colors duration-500 group-hover:text-white" />
      </div>
      <h4 className="font-display mb-1.5 text-[16.5px]" style={{ color: "var(--graphite)" }}>{title}</h4>
      <p className="text-[13px] leading-relaxed" style={{ color: "rgba(38,34,30,0.62)" }}>{note}</p>
    </div>
  </Reveal>
);

const LandmarkRow = ({ icon: Icon, title, note, distance }) => (
  <div className="flex items-start gap-4 py-4" style={{ borderBottom: "1px solid rgba(243,239,228,0.10)" }}>
    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: "rgba(201,138,150,0.4)", color: "var(--blush)" }}>
      <Icon size={15} strokeWidth={1.75} />
    </div>
    <div className="flex-1">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h5 className="font-display text-[15.5px]" style={{ color: "var(--stone)" }}>{title}</h5>
        {distance && (
          <span className="font-mono rounded-sm px-2 py-0.5 text-[10.5px] tracking-[0.1em]" style={{ background: "var(--maroon)", color: "var(--stone)" }}>
            {distance}
          </span>
        )}
      </div>
      <p className="mt-0.5 text-[13px] leading-relaxed" style={{ color: "rgba(243,239,228,0.62)" }}>{note}</p>
    </div>
  </div>
);

/* =============================================================================
   DATA
============================================================================= */

const HERO_CHIPS = [
  { icon: Ruler, label: "11 Acres Delivered" },
  { icon: FileCheck2, label: "DTCP T.L.P. No. 335/2021/H" },
  { icon: Award, label: "RERA P024000005290" },
];

const OVERVIEW_STATS = [
  { icon: Ruler, label: "Total Land", value: "11 Acres" },
  { icon: Grid3x3, label: "Plot Sizes", value: "146 – 838 Sq.Yd" },
  { icon: FileCheck2, label: "DTCP Layout", value: "T.L.P. No. 335/2021/H" },
  { icon: Award, label: "RERA No.", value: "P024000005290" },
  { icon: MapPin, label: "Registration", value: "Ibrahimpatnam SRO" },
];

const HIGHLIGHTS = [
  { icon: Route, title: "Developed Road Network", note: "Internal roads cut, metalled and open across the full 11-acre layout." },
  { icon: Droplets, title: "24-Hour Water Supply", note: "Overhead tank and distribution lines active across every block." },
  { icon: Waves, title: "Underground Drainage", note: "Routed below grade rather than left to open channels." },
  { icon: Zap, title: "Electricity to Every Plot", note: "Power connections laid and energised ahead of handover." },
  { icon: TreePine, title: "Landscaped Green Spaces", note: "Planted buffers and open pockets built into the layout." },
  { icon: ShieldCheck, title: "Round-the-Clock Security", note: "A monitored perimeter and manned entrance, always on." },
  { icon: DoorOpen, title: "Grand Entrance Gate", note: "A single, secured point of arrival for the whole venture." },
];

const AMENITIES = [
  { icon: Ruler, title: "500 Ft. Road Facing", note: "Frontage directly on the main highway-facing stretch." },
  { icon: Milestone, title: "40 & 33 Ft. Roads", note: "Two internal road widths, engineered for through-traffic and access." },
  { icon: LayoutGrid, title: "Compound Wall", note: "A finished boundary wall enclosing the entire venture." },
  { icon: Compass, title: "100% Vastu-Compliant", note: "Every plot oriented to Vastu principles from the layout stage." },
  { icon: Zap, title: "Electricity Connections", note: "Individual plot-level power connections, ready to use." },
  { icon: Waves, title: "Drainage", note: "A complete underground drainage system across the site." },
  { icon: Droplets, title: "Overhead Water Tank", note: "Centralised storage feeding the venture's water network." },
  { icon: Recycle, title: "Water Harvesting Pit", note: "Rainwater capture built into the site's drainage design." },
];

const LOCATION_DOORSTEP = [
  { icon: Building2, title: "Amazon Data Center", note: "A major infrastructure neighbour, minutes from the venture's boundary.", distance: "Adjacent" },
  { icon: Route, title: "Srisailam Highway", note: "One of two highways meeting at the venture's 100 ft frontage.", distance: "On-road" },
  { icon: Route, title: "Nagarjuna Sagar Highway", note: "The second highway forming the same junction.", distance: "On-road" },
  { icon: FileCheck2, title: "Ibrahimpatnam SRO", note: "The sub-registrar's office handling on-site plot registration.", distance: "Nearby" },
];

const LOCATION_GROWTH = [
  { icon: GraduationCap, title: "Young India Skill University", note: "A proposed vocational-training campus planned along the corridor.", distance: "In development" },
  { icon: Leaf, title: "Future City", note: "An eco-focused, sustainability-led development planned nearby.", distance: "In development" },
  { icon: Construction, title: "Highway Widening — 62.5 km", note: "A proposed widening of the Hyderabad–Srisailam Highway by CSTD.", distance: "Proposed" },
  { icon: Train, title: "Metro Expansion to Kandukur", note: "A proposed Hyderabad Metro extension along the highway.", distance: "Proposed" },
];

const GALLERY_ITEMS = [
  { aspect: "aspect-[4/5]", src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH/gallery-01.jpg" },
  { aspect: "aspect-[4/3]", src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH/gallery-02.jpg" },
  { aspect: "aspect-[4/3]", src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH/gallery-03.jpg" },
  { aspect: "aspect-[4/5]", src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH/gallery-04.jpg" },
  { aspect: "aspect-[4/2]", src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH/Screenshot%202026-08-02%20145427.png" },
  { aspect: "aspect-[4/3]", src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH/gallery-06.jpg" },
  { aspect: "aspect-[4/5]", src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH/gallery-07.jpg" },
  { aspect: "aspect-[4/3]", src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH/gallery-08.jpg" },
  { aspect: "aspect-[4/3]", src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH/gallery-09.jpg" },
  { aspect: "aspect-[4/5]", src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH/gallery-10.jpg" },
  { aspect: "aspect-[4/3]", src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH/gallery-11.jpg" },
  { aspect: "aspect-[4/3]", src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH/gallery-12.jpg" },
];

const MILESTONES = [
  { code: "01", title: "Land Surveyed & DTCP Approved", note: "Layout T.L.P. No. 335/2021/H registered." },
  { code: "02", title: "RERA Registration Secured", note: "Registered under P024000005290." },
  { code: "03", title: "Roads & Compound Wall Built", note: "33/40 ft internal roads and full boundary enclosure." },
  { code: "04", title: "Water, Drainage & Power Connected", note: "Underground drainage, overhead tank, electricity live." },
  { code: "05", title: "Entrance & Green Spaces Finished", note: "Grand entrance gate and landscaped buffers completed." },
  { code: "06", title: "Handed Over to Residents", note: "Families registered to make it their future address." },
];

const COMPLETION_STATS = [
  { value: "11", label: "Acres Delivered" },
  { value: "100%", label: "DTCP & RERA Compliant" },
];

/* =============================================================================
   LIGHTBOX
============================================================================= */

const Lightbox = ({ items, index, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  if (index === null) return null;
  const item = items[index];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center p-6"
        style={{ background: "rgba(21,15,15,0.92)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button
          aria-label="Close gallery"
          onClick={onClose}
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-[var(--stone)] transition hover:bg-white/10"
        >
          <X size={18} />
        </button>
        <button
          aria-label="Previous image"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-[var(--stone)] transition hover:bg-white/10"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Next image"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-[var(--stone)] transition hover:bg-white/10"
        >
          <ChevronRight size={20} />
        </button>
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl"
        >
          <ImagePlaceholder tag={item.tag} tone="ink" aspect="aspect-[4/3]" className="shadow-2xl" src={item.src} />
          <p className="font-mono mt-4 text-center text-[12px] uppercase tracking-[0.16em]" style={{ color: "var(--blush)" }}>
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} — {item.tag}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* =============================================================================
   MAIN COMPONENT
============================================================================= */

export default function NSHomesCompletedProject() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const heroTextureRef = useRef(null);
  const timelineRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  /* Fonts + HubSpot embed script, loaded once on mount */
  useEffect(() => {
    if (!document.getElementById("ns-homes-fonts")) {
      const link = document.createElement("link");
      link.id = "ns-homes-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";
      document.head.appendChild(link);
    }
    if (!document.getElementById("hs-script-loader-21626983")) {
      const script = document.createElement("script");
      script.id = "hs-script-loader-21626983";
      script.src = "https://js-na2.hsforms.net/forms/embed/21626983.js";
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  /* GSAP: hero parallax + timeline fill-in */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      if (heroTextureRef.current && heroRef.current) {
        gsap.to(heroTextureRef.current, {
          yPercent: 22,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      if (timelineRef.current) {
        const fill = timelineRef.current.querySelector(".ns-timeline-fill");
        if (fill) {
          gsap.fromTo(
            fill,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 75%",
                end: "bottom 55%",
                scrub: true,
              },
            }
          );
        }
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollToId = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i === 0 ? GALLERY_ITEMS.length - 1 : i - 1));
  const nextImage = () => setLightboxIndex((i) => (i === GALLERY_ITEMS.length - 1 ? 0 : i + 1));
const shouldReduceMotion = useReducedMotion();
  return (
    <div ref={containerRef} className="ns-homes-page w-full overflow-x-hidden">
      <GlobalStyle />

      {/* ============================================================ HERO */}
<section ref={heroRef} className="relative flex min-h-[100svh] items-end overflow-hidden">
  {/* Layered gradient background */}
  <div ref={heroTextureRef} className="absolute inset-0">
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(165deg, #170F0F 0%, #1D1414 30%, #271918 56%, #34201F 78%, #3E2422 100%)" }}
    />
    <div className="absolute inset-0" style={{ background: "radial-gradient(65% 55% at 84% 6%, rgba(148,45,68,0.30), transparent 65%)" }} />
    <div className="absolute inset-0" style={{ background: "radial-gradient(55% 50% at 6% 96%, rgba(89,24,37,0.40), transparent 70%)" }} />
    <div className="absolute inset-0" style={{ background: "radial-gradient(120% 85% at 50% 105%, rgba(0,0,0,0.38), transparent 62%)" }} />
  </div>

  {/* Self-drawing skyline — viewBox trimmed so ground line sits flush with the section base;
      opacity boosted across every path for mobile legibility; drop-shadow glow active on mobile only */}
  <div
    className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] select-none [filter:drop-shadow(0_0_10px_rgba(201,138,150,0.28))] sm:h-[215px] md:h-[240px] md:[filter:none] xl:h-[280px]"
    aria-hidden="true"
  >
    <svg viewBox="0 0 1440 248" preserveAspectRatio="none" className="h-full w-full">

      {/* distant silhouette layer — depth backdrop, fade-in only */}
      <motion.path
        d="M40,248 L40,222 L70,222 L70,248 M130,248 L130,205 L165,205 L165,248 M235,248 L235,228 L268,228 L268,248 M310,248 L310,212 L346,212 L346,248 M470,248 L470,230 L500,230 L500,248 M565,248 L565,215 L598,215 L598,248 M780,248 L780,222 L812,222 L812,248 M935,248 L935,207 L972,207 L972,248 M1035,248 L1035,232 L1062,232 L1062,248 M1130,248 L1130,213 L1160,213 L1160,248 M1195,248 L1195,228 L1222,228 L1222,248 M1340,248 L1340,210 L1372,210 L1372,248 M1400,248 L1400,232 L1430,232 L1430,248"
        fill="none"
        stroke="rgba(201,138,150,0.20)"
        strokeWidth={1.1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.20 }}
        transition={{ duration: shouldReduceMotion ? 0 : 1, ease: "easeOut", delay: 0.15 }}
      />

      {/* ground line */}
      <motion.path
        d="M0,248 L1440,248"
        fill="none"
        stroke="rgba(201,138,150,0.30)"
        strokeWidth={1.2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.30 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1.4, ease: "easeOut", delay: 0.5 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.6, delay: 0.5 },
        }}
      />

      {/* left-edge cottages — completed, low-rise */}
      <motion.path
        d="M15,248 L15,222 L25,205 L35,222 L35,248 M35,248 L35,222 M35,222 L45,205 L55,222 L55,248 M20,235 L20,222 M30,235 L30,222 M40,235 L40,222 M50,235 L50,222"
        fill="none"
        stroke="rgba(201,138,150,0.30)"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.30 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1, ease: [0.65, 0, 0.35, 1], delay: 0.85 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.5, delay: 0.85 },
        }}
      />

      {/* scaffolded low-rise — under construction */}
      <motion.path
        d="M60,248 L60,150 L170,150 L170,248 M60,205 L170,205 M60,175 L170,175 M60,150 L90,205 M90,150 L60,205 M120,150 L150,205 M150,150 L120,205"
        fill="none"
        stroke="rgba(201,138,150,0.38)"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.38 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1.3, ease: [0.65, 0, 0.35, 1], delay: 1.15 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.6, delay: 1.15 },
        }}
      />

      {/* twin-gable townhouses — completed */}
      <motion.path
        d="M175,248 L175,208 L183,190 L191,208 L191,248 M191,208 L191,248 M191,208 L199,190 L207,208 L207,248 M179,225 L179,208 M187,225 L187,208 M195,225 L195,208 M203,225 L203,208"
        fill="none"
        stroke="rgba(201,138,150,0.34)"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.34 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1, ease: [0.65, 0, 0.35, 1], delay: 1.45 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.5, delay: 1.45 },
        }}
      />

      {/* diagrid parametric tower */}
      <motion.path
        d="M210,248 L210,110 L330,110 L330,248 M210,248 L330,110 M210,110 L330,248 M210,179 L330,179 M270,110 L270,248"
        fill="none"
        stroke="rgba(201,138,150,0.38)"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.38 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1.4, ease: [0.65, 0, 0.35, 1], delay: 1.75 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.6, delay: 1.75 },
        }}
      />

      {/* grid-facade mid-rise — completed */}
      <motion.path
        d="M340,248 L340,95 L410,95 L410,248 M340,120 L410,120 M340,145 L410,145 M340,170 L410,170 M340,195 L410,195 M340,220 L410,220 M352,248 L352,95 M375,248 L375,95 M398,248 L398,95"
        fill="none"
        stroke="rgba(201,138,150,0.38)"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.38 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1.3, ease: [0.65, 0, 0.35, 1], delay: 2.05 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.6, delay: 2.05 },
        }}
      />

      {/* tower crane — active construction, bolder stroke */}
      <motion.path
        d="M420,248 L420,60 M420,60 L560,60 M420,60 L370,60 M405,60 L420,40 L435,60 M362,60 L362,72 L378,72 L378,60 M540,60 L540,150 M528,150 L528,170 L552,170 L552,150 L528,150 M420,248 L405,225 L420,210 L435,225 L420,248"
        fill="none"
        stroke="rgba(201,138,150,0.58)"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.58 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1.6, ease: [0.65, 0, 0.35, 1], delay: 2.35 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.6, delay: 2.35 },
        }}
      />

      {/* building rising under the crane — exposed frame, uneven columns, incomplete top floor */}
      <motion.path
        d="M445,248 L445,175 M460,248 L460,160 M475,248 L475,150 M490,248 L490,145 M505,248 L505,150 M520,248 L520,160 M535,248 L535,175 M445,225 L535,225 M445,200 L535,200 M460,175 L505,175"
        fill="none"
        stroke="rgba(201,138,150,0.40)"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1.2, ease: [0.65, 0, 0.35, 1], delay: 2.6 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.5, delay: 2.6 },
        }}
      />

      {/* stepped ziggurat — tallest fixed tower */}
      <motion.path
        d="M600,248 L600,150 L625,150 L625,120 L650,120 L650,90 L675,90 L675,120 L700,120 L700,150 L725,150 L725,248"
        fill="none"
        stroke="rgba(201,138,150,0.38)"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.38 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1.3, ease: [0.65, 0, 0.35, 1], delay: 2.9 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.6, delay: 2.9 },
        }}
      />

      {/* small pitched-roof house — bridges ziggurat and dome */}
      <motion.path
        d="M730,248 L730,215 L742,196 L754,215 L754,248 M736,230 L736,215 M748,230 L748,215"
        fill="none"
        stroke="rgba(201,138,150,0.32)"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.32 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 0.9, ease: [0.65, 0, 0.35, 1], delay: 3.2 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.5, delay: 3.2 },
        }}
      />

      {/* geodesic dome */}
      <motion.path
        d="M760,248 L760,210 L880,210 L880,248 M760,210 A60,60 0 0,1 880,210 M780,210 L820,155 L860,210 M820,155 L820,210"
        fill="none"
        stroke="rgba(201,138,150,0.38)"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.38 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1.4, ease: [0.65, 0, 0.35, 1], delay: 3.5 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.6, delay: 3.5 },
        }}
      />

      {/* balcony mid-rise — completed, rooftop mechanical box */}
      <motion.path
        d="M880,248 L880,145 L915,145 L915,248 M890,145 L890,130 L905,130 L905,145 M880,172 L915,172 M880,196 L915,196 M880,220 L915,220 M887,248 L887,145 M908,248 L908,145"
        fill="none"
        stroke="rgba(201,138,150,0.38)"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.38 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1.1, ease: [0.65, 0, 0.35, 1], delay: 3.8 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.5, delay: 3.8 },
        }}
      />

      {/* chamfered angular tower */}
      <motion.path
        d="M920,248 L920,130 L950,100 L1000,100 L1020,140 L1020,248"
        fill="none"
        stroke="rgba(201,138,150,0.38)"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.38 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1.1, ease: [0.65, 0, 0.35, 1], delay: 4.1 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.6, delay: 4.1 },
        }}
      />

      {/* framework-only build — earliest development stage */}
      <motion.path
        d="M1025,248 L1025,165 M1040,248 L1040,150 M1055,248 L1055,170 M1025,225 L1055,225 M1030,200 L1050,200"
        fill="none"
        stroke="rgba(201,138,150,0.32)"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.32 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 0.9, ease: [0.65, 0, 0.35, 1], delay: 4.4 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.5, delay: 4.4 },
        }}
      />

      {/* solar-grid roof building */}
      <motion.path
        d="M1060,248 L1060,190 L1120,190 L1120,170 L1180,170 L1180,248 M1065,190 L1075,178 M1080,190 L1090,178 M1095,190 L1105,178 M1110,190 L1120,178 M1150,170 L1150,145 M1145,150 L1155,150 M1145,140 L1155,140"
        fill="none"
        stroke="rgba(201,138,150,0.38)"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.38 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1.2, ease: [0.65, 0, 0.35, 1], delay: 4.7 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.6, delay: 4.7 },
        }}
      />

      {/* signature tower — tallest silhouette, rooftop spire */}
      <motion.path
        d="M1190,248 L1190,70 L1250,70 L1250,248 M1190,100 L1250,100 M1190,130 L1250,130 M1190,160 L1250,160 M1190,190 L1250,190 M1190,220 L1250,220 M1202,248 L1202,70 M1214,248 L1214,70 M1226,248 L1226,70 M1238,248 L1238,70 M1220,70 L1220,50"
        fill="none"
        stroke="rgba(201,138,150,0.44)"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.44 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1.3, ease: [0.65, 0, 0.35, 1], delay: 5.0 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.6, delay: 5.0 },
        }}
      />

      {/* second crane, bookend */}
      <motion.path
        d="M1260,248 L1260,120 M1260,120 L1340,120 M1260,120 L1230,120 M1320,120 L1320,170 M1312,170 L1312,182 L1328,182 L1328,170"
        fill="none"
        stroke="rgba(201,138,150,0.58)"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.58 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1.3, ease: [0.65, 0, 0.35, 1], delay: 5.3 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.6, delay: 5.3 },
        }}
      />

      {/* building under the second crane — early framing stage */}
      <motion.path
        d="M1280,248 L1280,190 M1295,248 L1295,175 M1310,248 L1310,185 M1320,248 L1320,195 M1280,220 L1320,220"
        fill="none"
        stroke="rgba(201,138,150,0.38)"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.38 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1, ease: [0.65, 0, 0.35, 1], delay: 5.5 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.5, delay: 5.5 },
        }}
      />

      {/* right-edge low-rises — completed */}
      <motion.path
        d="M1350,248 L1350,220 L1375,220 L1375,248 M1358,248 L1358,220 M1367,248 L1367,220 M1385,248 L1385,205 L1412,205 L1412,248 M1392,248 L1392,205 M1400,248 L1400,205 M1405,248 L1405,205"
        fill="none"
        stroke="rgba(201,138,150,0.32)"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.32 }}
        transition={{
          pathLength: { duration: shouldReduceMotion ? 0 : 1, ease: [0.65, 0, 0.35, 1], delay: 5.8 },
          opacity: { duration: shouldReduceMotion ? 0 : 0.5, delay: 5.8 },
        }}
      />
    </svg>
  </div>

  {/* Completion stamp — unchanged */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8, rotate: -14 }}
    animate={{ opacity: 1, scale: 1, rotate: -7 }}
    transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="ns-stamp font-mono absolute right-6 top-24 hidden select-none rounded-sm px-4 py-2 text-[11px] tracking-[0.28em] md:right-14 md:top-28 md:block"
  >
    HANDED&nbsp;OVER
  </motion.div>

  {/* FCDA seal — DESKTOP/large-tablet only, absolute, unchanged design and position */}
  <motion.div
    initial={{ opacity: 0, scale: 0.82 }}
    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
    transition={{
      opacity: { duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] },
      scale: { duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] },
      y: { duration: 8, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut", delay: 1.7 },
    }}
    className="absolute right-6 top-1/2 hidden -translate-y-1/2 md:right-12 lg:right-24 lg:block xl:right-32"
  >
    <div className="relative h-80 w-80 xl:h-96 xl:w-96">
      <div
        className="absolute -inset-10 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,138,150,0.30) 0%, rgba(122,32,51,0.14) 45%, transparent 72%)" }}
      />

      <div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: "rgba(232,201,184,0.22)" }}
      />

      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: "rgba(232,201,184,0.55)" }}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: [0.88, 1.36], opacity: [0, 0.45, 0] }}
          transition={{
            scale: {
              duration: shouldReduceMotion ? 0 : 5.2,
              repeat: shouldReduceMotion ? 0 : Infinity,
              repeatType: "loop",
              ease: [0.16, 1, 0.3, 1],
              delay: shouldReduceMotion ? 0 : i * 2.6,
            },
            opacity: {
              duration: shouldReduceMotion ? 0 : 5.2,
              repeat: shouldReduceMotion ? 0 : Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              times: [0, 0.22, 1],
              delay: shouldReduceMotion ? 0 : i * 2.6,
            },
          }}
        />
      ))}

      <motion.svg
        viewBox="0 0 320 320"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: shouldReduceMotion ? 0 : 360 }}
        transition={{ duration: 90, repeat: shouldReduceMotion ? 0 : Infinity, ease: "linear" }}
      >
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i * 360) / 48;
          const major = i % 6 === 0;

          return (
            <line
              key={i}
              x1="160"
              y1={major ? "20" : "24"}
              x2="160"
              y2="30"
              stroke="rgba(232,201,184,0.45)"
              strokeWidth={major ? 1.4 : 0.8}
              strokeLinecap="round"
              transform={`rotate(${angle} 160 160)`}
            />
          );
        })}
      </motion.svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative h-56 w-56 rounded-full p-[3px] shadow-[0_18px_50px_rgba(0,0,0,0.45)] xl:h-64 xl:w-64"
          style={{ background: "linear-gradient(135deg, #E8C9B8 0%, #C98A96 30%, #F3EFE4 60%, #C98A96 85%, #E8C9B8 100%)" }}
          animate={{ scale: shouldReduceMotion ? 1 : [1, 1.03, 1] }}
          transition={{ duration: 6.5, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-full"
            style={{
              background: "radial-gradient(120% 120% at 32% 22%, #FCFAF2 0%, #F3ECD8 55%, #E5D8B8 100%)",
              boxShadow: "inset 0 3px 18px rgba(89,24,37,0.20), inset 0 -8px 26px rgba(89,24,37,0.14)",
            }}
          >
            <motion.div
              className="absolute inset-0 mix-blend-color-dodge"
              style={{
                background:
                  "linear-gradient(115deg, transparent 10%, rgba(243,225,184,0.55) 24%, rgba(227,199,214,0.5) 38%, rgba(201,138,150,0.45) 50%, rgba(232,201,184,0.55) 62%, transparent 78%)",
                backgroundSize: "260% 260%",
                opacity: 0.55,
              }}
              animate={{
                backgroundPosition: shouldReduceMotion ? "50% 50%" : ["0% 20%", "100% 80%", "0% 20%"],
              }}
              transition={{ duration: 11, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute inset-0"
              animate={{ rotate: shouldReduceMotion ? 0 : -360 }}
              transition={{ duration: 60, repeat: shouldReduceMotion ? 0 : Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <defs>
                  <path
                    id="fcdaRingPath"
                    d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
                  />
                </defs>

                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="rgba(122,32,51,0.22)"
                  strokeWidth="1"
                />

                <circle
                  cx="100"
                  cy="100"
                  r="66"
                  fill="none"
                  stroke="rgba(122,32,51,0.22)"
                  strokeWidth="1"
                />

                <text
                  fontSize="9"
                  letterSpacing="3"
                  fill="var(--maroon)"
                  className="font-mono font-medium uppercase"
                >
                  <textPath href="#fcdaRingPath" startOffset="0%">
                    Comes Under FCDA Limits &#8226; Comes Under FCDA Limits &#8226;
                  </textPath>
                </text>
              </svg>
            </motion.div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--maroon)"
                strokeWidth="1.5"
                className="mb-2"
              >
                <path d="M12 2l7 3v6c0 5-3.4 8.6-7 11-3.6-2.4-7-6-7-11V5l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>

              <span
                className="font-display text-[26px] leading-none tracking-wide"
                style={{ color: "var(--maroon)" }}
              >
                FCDA
              </span>

              <span
                className="mt-2 text-[9.5px] font-medium tracking-[0.3em]"
                style={{ color: "rgba(122,32,51,0.72)" }}
              >
                ZONE COMPLIANT
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>

  {/* Left content — hero copy, CTAs, then the in-flow mobile/tablet FCDA badge */}
  <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:px-10 md:pb-24">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <PlotMarker tone="onDark" color="var(--stone)">
        Completed Project · South Hyderabad
      </PlotMarker>
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="font-display mt-6 text-[15vw] leading-[0.92] tracking-tight md:text-[7.2rem]"
      style={{ color: "var(--stone)" }}
    >
      NS Homes
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35 }}
      className="mt-6 max-w-xl text-[16px] leading-relaxed md:text-[17px]"
      style={{ color: "rgba(243,239,228,0.78)" }}
    >
      11 acres. Fully delivered. An open-plot community on the 100 ft main road at the
      Srisailam–Nagarjuna Sagar highway junction, just minutes from the Amazon Data
      Center. Surveyed, registered and handed over under DTCP and RERA.
    </motion.p>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.55 }}
      className="mt-8 flex flex-wrap gap-2.5"
    >
      {HERO_CHIPS.map((c) => (
        <Chip key={c.label} icon={c.icon} tone="onDark">
          {c.label}
        </Chip>
      ))}
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      className="mt-11 flex flex-wrap items-center gap-4"
    >
      <button
        onClick={() => scrollToId("gallery")}
        className="ns-btn-shine rounded-full px-7 py-3.5 text-[13.5px] font-medium tracking-wide transition-transform duration-300 hover:-translate-y-0.5"
        style={{ background: "var(--maroon)", color: "var(--stone)" }}
      >
        View Gallery
      </button>

      <button
        onClick={() => scrollToId("overview")}
        className="group inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[13.5px] font-medium tracking-wide transition-colors duration-300 hover:bg-white/5"
        style={{ borderColor: "rgba(243,239,228,0.3)", color: "var(--stone)" }}
      >
        Explore Project
      </button>
    </motion.div>

    {/* =========================================================
        FCDA BADGE — MOBILE/TABLET ONLY

        IMPORTANT:
        Desktop FCDA badge above is untouched.

        Mobile change:
        - "Comes Under FCDA Limits" is now INSIDE the main cream coin.
        - It follows an internal circular path.
        - The text rotates around the central FCDA content.
        - Nothing is rendered outside the main circle.
        - Badge is slightly larger for mobile readability.
       ========================================================= */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.85,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative mt-10 mb-8 flex justify-center lg:hidden"
    >
      {/* Responsive mobile badge size */}
      <div className="relative h-56 w-56 sm:h-64 sm:w-64">

        {/* Soft glow */}
        <div
          className="absolute -inset-9 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(201,138,150,0.32) 0%, rgba(122,32,51,0.16) 45%, transparent 72%)",
          }}
        />

        {/* Outer subtle ring */}
        <div
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: "rgba(232,201,184,0.28)" }}
        />

        {/* Pulsing outer rings */}
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: "rgba(232,201,184,0.6)" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: [0.9, 1.25], opacity: [0, 0.5, 0] }}
            transition={{
              scale: {
                duration: shouldReduceMotion ? 0 : 5.2,
                repeat: shouldReduceMotion ? 0 : Infinity,
                repeatType: "loop",
                ease: [0.16, 1, 0.3, 1],
                delay: shouldReduceMotion ? 0 : i * 2.6,
              },
              opacity: {
                duration: shouldReduceMotion ? 0 : 5.2,
                repeat: shouldReduceMotion ? 0 : Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                times: [0, 0.22, 1],
                delay: shouldReduceMotion ? 0 : i * 2.6,
              },
            }}
          />
        ))}

        {/* Outer rotating tick marks */}
        <motion.svg
          viewBox="0 0 320 320"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: shouldReduceMotion ? 0 : 360 }}
          transition={{
            duration: 90,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "linear",
          }}
        >
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i * 360) / 40;
            const major = i % 5 === 0;

            return (
              <line
                key={i}
                x1="160"
                y1={major ? "14" : "20"}
                x2="160"
                y2="28"
                stroke="rgba(232,201,184,0.5)"
                strokeWidth={major ? 1.6 : 0.9}
                strokeLinecap="round"
                transform={`rotate(${angle} 160 160)`}
              />
            );
          })}
        </motion.svg>

        {/* MAIN CREAM FCDA COIN */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative h-[76%] w-[76%] rounded-full p-[2.5px] shadow-[0_14px_36px_rgba(0,0,0,0.45)]"
            style={{
              background:
                "linear-gradient(135deg, #E8C9B8 0%, #C98A96 30%, #F3EFE4 60%, #C98A96 85%, #E8C9B8 100%)",
            }}
            animate={{
              scale: shouldReduceMotion ? 1 : [1, 1.02, 1],
            }}
            transition={{
              duration: 6.5,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-full"
              style={{
                background:
                  "radial-gradient(120% 120% at 32% 22%, #FCFAF2 0%, #F3ECD8 55%, #E5D8B8 100%)",
                boxShadow:
                  "inset 0 3px 14px rgba(89,24,37,0.20), inset 0 -6px 18px rgba(89,24,37,0.14)",
              }}
            >

              {/* Moving light/reflection */}
              <motion.div
                className="absolute inset-0 mix-blend-color-dodge"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 10%, rgba(243,225,184,0.55) 24%, rgba(227,199,214,0.5) 38%, rgba(201,138,150,0.45) 50%, rgba(232,201,184,0.55) 62%, transparent 78%)",
                  backgroundSize: "260% 260%",
                  opacity: 0.55,
                }}
                animate={{
                  backgroundPosition: shouldReduceMotion
                    ? "50% 50%"
                    : ["0% 20%", "100% 80%", "0% 20%"],
                }}
                transition={{
                  duration: 11,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* =====================================================
                  MOBILE INTERNAL ROTATING FCDA TEXT

                  This is the key change.

                  The text is now INSIDE the cream coin,
                  just like the reference image.

                  It rotates around the FCDA center instead of
                  sitting outside the main circle.
                 ===================================================== */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: shouldReduceMotion ? 0 : -360,
                }}
                transition={{
                  duration: 60,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  ease: "linear",
                }}
              >
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    {/* Internal text path */}
                    <path
                      id="fcdaRingPathMobile"
                      d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
                    />
                  </defs>

                  {/* Inner decorative circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="rgba(122,32,51,0.18)"
                    strokeWidth="0.8"
                  />

                  {/* Central content boundary */}
                  <circle
                    cx="100"
                    cy="100"
                    r="58"
                    fill="none"
                    stroke="rgba(122,32,51,0.18)"
                    strokeWidth="0.8"
                  />

                  {/* Rotating text — now INSIDE the main circle */}
                  <text
                    fontSize="8.5"
                    letterSpacing="2.6"
                    fill="var(--maroon)"
                    className="font-mono font-medium uppercase"
                    opacity="0.9"
                  >
                    <textPath
                      href="#fcdaRingPathMobile"
                      startOffset="0%"
                    >
                      Comes Under FCDA Limits &#8226; Comes Under FCDA Limits &#8226;
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* CENTRAL FCDA CONTENT */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">

                {/* Shield icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--maroon)"
                  strokeWidth="1.6"
                  className="mb-1"
                >
                  <path d="M12 2l7 3v6c0 5-3.4 8.6-7 11-3.6-2.4-7-6-7-11V5l7-3z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>

                {/* FCDA */}
                <span
                  className="font-display text-[25px] leading-none tracking-wide sm:text-[28px]"
                  style={{ color: "var(--maroon)" }}
                >
                  FCDA
                </span>

                {/* Zone compliant */}
                <span
                  className="mt-2 text-[7.5px] font-medium tracking-[0.18em] sm:text-[8.5px] sm:tracking-[0.2em]"
                  style={{ color: "rgba(122,32,51,0.72)" }}
                >
                  ZONE COMPLIANT
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </div>

  <div
    className="ns-scroll-cue absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
    style={{ color: "var(--blush)" }}
    aria-hidden="true"
  >
    <div
      className="h-9 w-px"
      style={{ background: "currentColor", opacity: 0.5 }}
    />
  </div>
</section>

      {/* ============================================================ Progress Bar */}
      <NSHdevprogress/>

      {/* ======================================================= OVERVIEW */}
      <section id="overview" className="relative px-6 py-24 md:px-10 md:py-32" style={{ background: "var(--stone)" }}>
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <PlotMarker>Project Overview</PlotMarker>
              <h2 className="font-display mt-5 text-[2.4rem] leading-[1.05] md:text-[2.9rem]" style={{ color: "var(--graphite)" }}>
                11 acres,
                <br /><span className="italic" style={{ color: "var(--maroon-deep)" }}>precisely</span> delivered.
              </h2>
              <p className="mt-6 text-[15.5px] leading-relaxed" style={{ color: "rgba(38,34,30,0.72)" }}>
                NS Homes is an 11 acre open-plot venture set directly on the 100 ft main road
                connecting the Srisailam & Nagarjuna Sagar highways, a short stretch from the
                Amazon Data Center in South Hyderabad. Every plot ranges from 146 to 838 square yards,
                residential and commercial, was laid out, registered  and delivered under DTCP
                norms and RERA oversight, with the paperwork closed and the roads already carrying
                traffic.
              </p>
              <div className="mt-8 inline-flex items-center gap-2.5 rounded-full px-4 py-2" style={{ background: "rgba(122,32,51,0.10)" }}>
                <CheckCircle2 size={15} style={{ color: "var(--maroon-deep)" }} />
                <span className="font-mono text-[11.5px] uppercase tracking-[0.14em]" style={{ color: "var(--maroon-deep)" }}>
                  Status — Completed &amp; Handed Over
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <div className="rounded-[6px] border p-6" style={{ borderColor: "rgba(38,34,30,0.10)" }}>
                {OVERVIEW_STATS.map((s) => (
                  <StatRow key={s.label} {...s} />
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <ImagePlaceholder tag="Aerial Overview — NS Homes, 11 Acres" tone="stone" aspect="aspect-[16/12] lg:aspect-[14/10]" src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH/Screenshot%202026-08-02%20170950.png" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================== ABOUT */}
      <section className="relative px-6 py-24 md:px-10 md:py-32" style={{ background: "var(--stone-soft)" }}>
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <PlotMarker>About the Development</PlotMarker>
            <h2 className="font-display mt-5 text-[2.2rem] leading-tight md:text-[2.7rem]" style={{ color: "var(--graphite)" }}>
              Built for the long term
            </h2>
          </Reveal>

          <div className="ns-editorial mt-10 grid gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-8">
            <Reveal delay={0.1} className="md:col-span-1">
              <p className="has-dropcap text-[15.5px] leading-[1.85]" style={{ color: "rgba(38,34,30,0.78)" }}>
                NS Homes began as a plan on a surveyor's table and ended as a functioning
                neighbourhood. The venture's position is anchored to the Srisailam–Nagarjuna
                Sagar highway junction which was never incidental; it was the first decision
                built around.
              </p>
              <p className="mt-6 text-[15.5px] leading-[1.85]" style={{ color: "rgba(38,34,30,0.78)" }}>
                Construction followed DTCP layout norms end to end: internal roads were cut and
                metalled at 33 and 40 feet, drainage was routed underground rather than left to
                open channels and the compound wall was raised before a single plot changed
                hands. None of it was ornamental instead it was the groundwork a highway-facing venture
                of this scale needed to hold up over decades, not just at handover.
              </p>
            </Reveal>

            <div className="hidden w-px md:block" style={{ background: "rgba(122,32,51,0.25)" }} aria-hidden="true" />

            <Reveal delay={0.2} className="flex flex-col justify-between">
              <blockquote className="font-display border-l-2 pl-5 text-[19px] italic leading-snug" style={{ borderColor: "var(--maroon)", color: "var(--maroon-deep)" }}>
                A hundred feet of road frontage was the one asset time couldn't shrink —
                everything else was built to match it.
              </blockquote>
              <p className="mt-8 text-[15.5px] leading-[1.85]" style={{ color: "rgba(38,34,30,0.78)" }}>
                Vastu-aligned plotting, a monitored grand entrance and a security presence that
                runs around the clock round out a layout designed to feel finished, rather than
                merely sold.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====================================================== HIGHLIGHTS */}
      <section className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32" style={{ background: "linear-gradient(180deg,#1C1414,#2A1B1B)" }}>
        <ContourField opacity={0.06} stroke="#C98A96" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <PlotMarker tone="onDark" color="var(--stone)">Project Highlights</PlotMarker>
            <h2 className="font-display mt-5 text-[2.2rem] leading-tight md:text-[2.7rem]" style={{ color: "var(--stone)" }}>
              What's actually been delivered
            </h2>
            <p className="mt-4 text-[15px]" style={{ color: "var(--blush)" }}>
              Eight systems, each one signed off and running — not promised, delivered.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h, i) => (
              <InfraCard key={h.title} {...h} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================= AMENITIES */}
      <section className="relative px-6 py-24 md:px-10 md:py-32" style={{ background: "var(--stone)" }}>
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <PlotMarker>Amenities</PlotMarker>
            <h2 className="font-display mt-5 text-[2.2rem] leading-tight md:text-[2.7rem]" style={{ color: "var(--graphite)" }}>
              On-ground, not on paper
            </h2>
            <p className="mt-4 text-[15px]" style={{ color: "rgba(38,34,30,0.62)" }}>
              Every specification below is installed and operating across the venture today.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AMENITIES.map((a, i) => (
              <AmenityCard key={a.title} {...a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= LOCATION */}
      <section id="location" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32" style={{ background: "linear-gradient(180deg,#2A1B1B,#1C1414)" }}>
        <ContourField opacity={0.06} stroke="#C98A96" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <PlotMarker tone="onDark" color="var(--stone)">Location</PlotMarker>
            <h2 className="font-display mt-5 text-[2.2rem] leading-tight md:text-[2.7rem]" style={{ color: "var(--stone)" }}>
              Positioned at a highway junction
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--blush)" }}>
              NS Homes sits where the Srisailam and Nagarjuna Sagar highways meet. Inside a
              stretch of South Hyderabad that's been absorbing infrastructure investment for
              years where some of it has already been running past the venture's boundary wall, some of it
              still on the drawing board.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal delay={0.1} className="lg:col-span-6">
              <LocationMap
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2817.037783204565!2d78.59364616864376!3d17.040688934399736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDAyJzI2LjYiTiA3OMKwMzUnNDIuNSJF!5e1!3m2!1sen!2sus!4v1785073812478!5m2!1sen!2sus"
                directionsUrl="https://www.google.com/maps/search/?api=1&query=17.040688934399736,78.59364616864376"
                label="NS Homes — Site Location"
                aspect="aspect-[4/3] lg:aspect-[4/5]"
              />
            </Reveal>

            <div className="lg:col-span-6">
              <Reveal delay={0.15}>
                <h3 className="font-mono mb-1 text-[12px] uppercase tracking-[0.18em]" style={{ color: "#F3EFE4" }}>
                  On the Doorstep
                </h3>
                <div className="mb-8">
                  {LOCATION_DOORSTEP.map((l) => (
                    <LandmarkRow key={l.title} {...l} />
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <h3 className="font-mono mb-1 text-[12px] uppercase tracking-[0.18em]" style={{ color: "#F3EFE4" }}>
                  Growing Around It
                </h3>
                <div>
                  {LOCATION_GROWTH.map((l) => (
                    <LandmarkRow key={l.title} {...l} />
                  ))}
                </div>
                <p className="mt-5 text-[12.5px] leading-relaxed" style={{ color: "rgba(243,239,228,0.45)" }}>
                  The developments above are publicly announced or proposed projects in the wider
                  Srisailam Highway corridor.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== GALLERY */}
      <section id="gallery" className="relative px-6 py-24 md:px-10 md:py-32" style={{ background: "var(--stone)" }}>
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <PlotMarker>Gallery</PlotMarker>
            <h2 className="font-display mt-5 text-[2.2rem] leading-tight md:text-[2.7rem]" style={{ color: "var(--graphite)" }}>
              A walk through the site
            </h2>
            <p className="mt-4 text-[15px]" style={{ color: "rgba(38,34,30,0.62)" }}>
              Aerial passes, entrance to boundary — documented as the venture stands today.
            </p>
          </Reveal>

          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
            {GALLERY_ITEMS.map((g, i) => (
              <Reveal key={g.tag} delay={(i % 6) * 0.05}>
                <button
                  onClick={() => openLightbox(i)}
                  className="group block w-full text-left"
                  aria-label={`Open ${g.tag} in gallery viewer`}
                >
                  <div className="overflow-hidden rounded-[3px] transition-shadow duration-500 group-hover:shadow-2xl">
                    <div className="transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                      <ImagePlaceholder tone="stone" aspect={g.aspect} src={g.src} />
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== COMPLETION SHOWCASE */}
      <section className="relative px-6 py-24 md:px-10 md:py-32" style={{ background: "var(--stone-soft)" }}>
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <PlotMarker>Project Completion</PlotMarker>
            <h2 className="font-display mt-5 text-[2.2rem] leading-tight md:text-[2.7rem]" style={{ color: "var(--graphite)" }}>
              From survey to handover
            </h2>
          </Reveal>

          {/* Timeline */}
          <div ref={timelineRef} className="relative mt-16 hidden lg:block">
            <div className="absolute left-0 right-0 top-[22px] h-px" style={{ background: "rgba(38,34,30,0.14)" }} />
            <div className="ns-timeline-fill absolute left-0 right-0 top-[22px] h-px" style={{ background: "var(--maroon)" }} />
            <div className="grid grid-cols-6 gap-6">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.code} delay={i * 0.08}>
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border-2 font-mono text-[12px]"
                    style={{ borderColor: "var(--maroon)", background: "var(--stone-soft)", color: "var(--maroon-deep)" }}
                  >
                    {m.code}
                  </div>
                  <h4 className="font-display text-[15.5px] leading-snug" style={{ color: "var(--graphite)" }}>{m.title}</h4>
                  <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "rgba(38,34,30,0.6)" }}>{m.note}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Mobile stacked timeline */}
          <div className="mt-12 space-y-8 lg:hidden">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.code} delay={i * 0.06} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[11px]"
                    style={{ borderColor: "var(--maroon)", color: "var(--maroon-deep)" }}
                  >
                    {m.code}
                  </div>
                  {i < MILESTONES.length - 1 && <div className="mt-2 h-full w-px flex-1" style={{ background: "rgba(122,32,51,0.3)" }} />}
                </div>
                <div className="pb-2">
                  <h4 className="font-display text-[16px]" style={{ color: "var(--graphite)" }}>{m.title}</h4>
                  <p className="mt-1 text-[13.5px] leading-relaxed" style={{ color: "rgba(38,34,30,0.62)" }}>{m.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Stat strip */}
          <Reveal delay={0.15} className="mt-20 grid grid-cols-2 gap-6 border-t pt-12 sm:grid-cols-4" style={{ borderColor: "rgba(38,34,30,0.12)" }}>
            {COMPLETION_STATS.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="font-display text-[2.6rem] leading-none" style={{ color: "var(--maroon-deep)" }}>{s.value}</div>
                <div className="font-mono mt-2 text-[11px] uppercase tracking-[0.14em]" style={{ color: "rgba(38,34,30,0.55)" }}>{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* =========================================================== CONTACT */}
      <section id="contact" className="relative px-6 py-24 md:px-10 md:py-32" style={{ background: "var(--stone)" }}>
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <PlotMarker>Get in Touch</PlotMarker>
              <h2 className="font-display mt-5 text-[2.1rem] leading-tight md:text-[2.5rem]" style={{ color: "var(--graphite)" }}>
                Have questions about NS Homes?
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed" style={{ color: "rgba(38,34,30,0.72)" }}>
                Our team is happy to assist you and help you explore our completed and upcoming
                projects.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 space-y-5">
              <div className="flex items-center gap-3">
                <MapPin size={16} style={{ color: "var(--maroon-deep)" }} />
                <span className="text-[14px]" style={{ color: "rgba(38,34,30,0.75)" }}>Srisailam Highway, South Hyderabad</span>
              </div>
              <div className="flex items-center gap-3">
                <Award size={16} style={{ color: "var(--maroon-deep)" }} />
                <span className="text-[14px]" style={{ color: "rgba(38,34,30,0.75)" }}>RERA No. P024000005290</span>
              </div>
              <div className="flex items-center gap-3">
                <FileCheck2 size={16} style={{ color: "var(--maroon-deep)" }} />
                <span className="text-[14px]" style={{ color: "rgba(38,34,30,0.75)" }}>DTCP Layout T.L.P. No. 335/2021/H</span>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-8 text-[12.5px] leading-relaxed" style={{ color: "rgba(38,34,30,0.5)" }}>
              General enquiries only — for site-specific requests, our team will follow up
              directly.
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="ns-neumorph p-7 md:p-10">
                <div className="hs-form-frame" data-region="na2" data-form-id="1c0438af-3740-4231-98f2-ace8a45c047d" data-portal-id="21626983" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Lightbox items={GALLERY_ITEMS} index={lightboxIndex} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
    </div>
  );
}