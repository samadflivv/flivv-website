/**
 * NSH20LandingPage.jsx
 * ---------------------------------------------------------------------------
 * Premium landing page for NS Homes 2.0 — Phase II of the NS Homes project,
 * same Srisailam–Nagarjuna Sagar highway corridor near Mirkhanpet.
 *
 * Design direction
 *  Same family as the NS Homes page (maroon-led, editorial, benchmark-style
 *  eyebrow labels) but its own personality: this is an active listing, not a
 *  completed-project archive, so the palette leans into a warmer, gold-lit
 *  "premium launch" register — dark maroon grounds, a champagne-gold accent,
 *  and a faceted "gem/diamond" signature motif (Phase II growth, premium
 *  plots) in place of NS Homes' surveyor contour lines.
 *
 * Stack: React (JS only) + Tailwind CSS + Framer Motion + GSAP/ScrollTrigger
 *        + lucide-react icons, per the project brief.
 *
 * Integration notes
 *  - Renders NO <nav> / <header> / <footer> — already exist in the host app.
 *  - Requires: npm i framer-motion gsap lucide-react
 *  - Google Maps iframe reuses the exact NS Homes embed (same coordinates —
 *    NSH 2.0 sits on the same corridor). Swap `MAP_EMBED_SRC` for a
 *    satellite-specific embed URL if you'd like a different map style.
 *  - HubSpot script/div reuse the identical NS Homes implementation.
 *  - All imagery is a placeholder system (see NS Homes component for the
 *    same convention) — swap <ImagePlaceholder> for real <img> when ready.
 * ---------------------------------------------------------------------------
 */
'use client';
import React, { useEffect, useRef, useState, useId, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Gem,
  Home,
  Building2,
  MapPin,
  Route,
  Milestone,
  LayoutGrid,
  ShieldCheck,
  Zap,
  Waves,
  Droplets,
  Recycle,
  Ruler,
  TreePine,
  Construction,
  Award,
  FileCheck2,
  Users,
  Train,
  GraduationCap,
  Leaf,
  FlaskConical,
  IndianRupee,
  Phone,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import NSH2devprogress from "./NSH2devprogress";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3408.2975980067113!2d78.593447809335!3d17.04015278663694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1786102914807!5m2!1sen!2sin";
const MAP_DIRECTIONS_URL = "https://www.google.com/maps/search/?api=1&query=17.040526936388343, 78.59330550748554";
const OVERVIEW_IMAGE =
  "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH2/Screenshot%202026-08-02%20193355.png";

/* =============================================================================
   DESIGN TOKENS
============================================================================= */

const GlobalStyle = () => (
  <style>{`
    .nsh2-page {
      --primary: #5A1E2A;
      --secondary: #7B2C3B;
      --accent: #C89B63;
      --accent-deep: #A67C42;
      --bg: #FFFDF9;
      --surface: #F8F4F3;
      --dark: #23161A;
      --dark-soft: #33202A;
      --text: #2A2A2A;
      --hairline: rgba(200,155,99,0.32);

      --font-display: 'Fraunces', 'Iowan Old Style', serif;
      --font-body: 'Inter', -apple-system, sans-serif;
      --font-mono: 'IBM Plex Mono', 'SFMono-Regular', monospace;

      background: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      position: relative;
    }

    .nsh2-page .font-display { font-family: var(--font-display); }
    .nsh2-page .font-mono { font-family: var(--font-mono); }
    .nsh2-page ::selection { background: var(--accent); color: var(--dark); }
    .nsh2-page *:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

    @media (prefers-reduced-motion: reduce) {
      .nsh2-page * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }

    .nsh2-editorial p.has-dropcap::first-letter {
      font-family: var(--font-display);
      font-size: 4.2rem;
      line-height: 0.78;
      float: left;
      padding-right: 0.5rem;
      padding-top: 0.3rem;
      color: var(--accent-deep);
      font-weight: 500;
    }

    .nsh2-btn-shine { position: relative; overflow: hidden; }
    .nsh2-btn-shine::after {
      content: "";
      position: absolute;
      top: 0; left: -60%;
      width: 40%; height: 100%;
      background: linear-gradient(115deg, transparent, rgba(255,255,255,0.4), transparent);
      transform: skewX(-18deg);
      transition: left 0.65s ease;
    }
    .nsh2-btn-shine:hover::after { left: 130%; }

    /* Glassmorphic contact card with a soft maroon glow behind it */
    .nsh2-glass {
      position: relative;
      background: rgba(255,253,249,0.6);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--hairline);
      border-radius: 26px;
      box-shadow: 0 30px 70px -25px rgba(90,30,42,0.35);
    }
    .nsh2-glass::before {
      content: "";
      position: absolute;
      inset: -30% -20% auto -20%;
      height: 60%;
      background: radial-gradient(50% 100% at 50% 0%, rgba(90,30,42,0.25), transparent 70%);
      filter: blur(10px);
      z-index: -1;
      pointer-events: none;
    }

    .nsh2-hairline { background: var(--hairline); }

    /* Contour/facet texture — dimmed on mobile so it reads as a quiet
       finish rather than a busy pattern on small screens. */
    .nsh2-texture { opacity: var(--to, 0.1); }
    @media (max-width: 767px) {
      .nsh2-texture { opacity: calc(var(--to, 0.1) * 0.4); }
    }

    @keyframes nsh2-float {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(14px, -22px); }
    }
    @keyframes nsh2-float-rev {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-18px, 16px); }
    }
    @keyframes nsh2-sheen {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    .nsh2-sheen {
      background-size: 200% 200%;
      animation: nsh2-sheen 9s ease-in-out infinite alternate;
    }

    .nsh2-scroll-cue { animation: nsh2-cue 2.2s ease-in-out infinite; }
    @keyframes nsh2-cue { 0%, 100% { transform: translateY(0); opacity: .5; } 50% { transform: translateY(8px); opacity: 1; } }

    .nsh2-zoom-frame { transition: transform 0.9s cubic-bezier(0.22,1,0.36,1); }
    .nsh2-zoom-frame-wrap:hover .nsh2-zoom-frame { transform: scale(1.06); }

    /* Fine grain — a cheap SVG noise layer for a filmic, premium finish on
       dark sections. Kept extremely subtle. */
    .nsh2-grain {
      position: absolute; inset: 0; pointer-events: none; opacity: 0.05; mix-blend-mode: overlay;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
    }

    /* Bento highlight cards — gradient hairline border that lights up on
       hover instead of a flat solid border. */
    .nsh2-bento {
      position: relative;
      background: rgba(255,255,255,0.035);
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.08);
      transition: border-color 0.5s ease, transform 0.5s ease, background 0.5s ease;
    }
    .nsh2-bento:hover {
      border-color: rgba(200,155,99,0.5);
      background: rgba(255,255,255,0.06);
      transform: translateY(-4px);
    }
    .nsh2-bento-index {
      font-family: var(--font-display);
      position: absolute;
      right: 14px;
      top: 4px;
      font-size: 4.2rem;
      line-height: 1;
      color: rgba(255,253,249,0.05);
      pointer-events: none;
      font-style: italic;
    }

    /* Amenity "badge" tiles — a playful sticker feel, distinct from the
       highlight cards above. */
    .nsh2-badge {
      position: relative;
      background: var(--bg);
      border: 1.5px solid rgba(90,30,42,0.14);
      border-radius: 18px;
      transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.45s ease, box-shadow 0.45s ease;
    }
    .nsh2-badge:hover {
      transform: translateY(-6px) rotate(-1.2deg);
      border-color: var(--accent);
      box-shadow: 0 22px 40px -20px rgba(90,30,42,0.28);
    }

    /* Horizontal gallery reel */
    .nsh2-reel-track { scrollbar-width: none; -ms-overflow-style: none; }
    .nsh2-reel-track::-webkit-scrollbar { display: none; }

    /* Dark CTA band accents */
    .nsh2-cta-glow {
      position: absolute;
      border-radius: 999px;
      filter: blur(70px);
      pointer-events: none;
    }
  `}</style>
);

/* =============================================================================
   SIGNATURE BACKGROUND MOTIFS
============================================================================= */

/** Faceted "gem" texture — repeating rotated-square outlines. NSH 2.0's
 *  signature pattern, standing in for NS Homes' contour lines: a premium,
 *  cut-stone rhythm for an active, aspirational listing. */
const FacetField = ({ opacity = 0.1, stroke = "var(--accent)", className = "" }) => {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      className={`nsh2-texture absolute inset-0 h-full w-full pointer-events-none ${className}`}
      style={{ "--to": opacity }}
      viewBox="0 0 300 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id={`facet-${uid}`} width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect x="8" y="8" width="44" height="44" fill="none" stroke={stroke} strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="300" height="300" fill={`url(#facet-${uid})`} />
    </svg>
  );
};

/** Concentric "expansion rings" — used sparingly in the hero to signal
 *  Phase II growing outward from the original NS Homes footprint. */
const ExpansionRings = ({ opacity = 0.16, stroke = "var(--accent)", className = "" }) => (
  <svg className={`absolute pointer-events-none ${className}`} style={{ opacity }} viewBox="0 0 600 600" aria-hidden="true">
    {[70, 130, 190, 250, 310, 370].map((r) => (
      <circle key={r} cx="600" cy="0" r={r} fill="none" stroke={stroke} strokeWidth="1" />
    ))}
  </svg>
);

/** Fine grain — subtle filmic noise for dark sections. */
const Grain = () => <div className="nsh2-grain" aria-hidden="true" />;

/* =============================================================================
   SMALL BUILDING BLOCKS
============================================================================= */

/** Signature eyebrow label — a rotated "gem" mark opening every section. */
const PhaseMark = ({ code, children, tone = "onLight", color: colorOverride }) => {
  const color = colorOverride || (tone === "onLight" ? "var(--primary)" : "var(--accent)");
  return (
    <div className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color }}>
      <span className="inline-flex h-5 w-5 rotate-45 items-center justify-center rounded-[3px] border" style={{ borderColor: color }}>
        <Gem size={10} strokeWidth={2} className="-rotate-45" />
      </span>
      <span>{code}</span>
      <span className="h-px w-6" style={{ background: color, opacity: 0.5 }} />
      <span>{children}</span>
    </div>
  );
};

/** Placeholder imagery — gradient + facet texture + caption tag. Swap for a
 *  real <img> when photography/renders are ready; `tag` maps to alt text.
 *  Pass `src` to render a real image instead of the placeholder pattern. */
const ImagePlaceholder = ({ tag, src, tone = "surface", aspect = "aspect-[4/3]", className = "" }) => {
  const isDark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={tag || "NSH 2.0 placeholder image"}
      className={`relative overflow-hidden rounded-[4px] ${aspect} ${className}`}
      style={{
        background: isDark
          ? "linear-gradient(150deg,#33202A 0%,#1D1216 100%)"
          : "linear-gradient(150deg,#F8F4F3 0%,#EDE3DF 100%)",
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={tag || "NSH 2.0 image"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={80}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <>
          <FacetField opacity={isDark ? 0.14 : 0.16} stroke={isDark ? "#C89B63" : "#5A1E2A"} />
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon size={20} strokeWidth={1.25} style={{ color: isDark ? "var(--accent)" : "var(--primary)", opacity: 0.5 }} />
          </div>
        </>
      )}
      {!src && tag && (
        <div
          className="font-mono absolute bottom-3 left-3 rounded-sm px-2 py-1 text-[10px] uppercase tracking-[0.14em]"
          style={{
            background: isDark ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.6)",
            color: isDark ? "var(--bg)" : "var(--text)",
            backdropFilter: "blur(2px)",
          }}
        >
          {tag}
        </div>
      )}
    </div>
  );
};

/** Live Google Maps embed, styled to match the rest of the page. */
const LocationMap = ({ src, directionsUrl, label = "Site Location", className = "" }) => (
  <div className={`relative h-full w-full overflow-hidden rounded-[6px] border ${className}`} style={{ borderColor: "var(--hairline)" }}>
    <iframe
      title="NSH 2.0 site location"
      src={src}
      className="absolute inset-0 h-full w-full"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
    <div
      className="font-mono pointer-events-none absolute left-3 top-3 rounded-sm px-2 py-1 text-[10px] uppercase tracking-[0.14em]"
      style={{ background: "rgba(35,22,26,0.6)", color: "var(--bg)", backdropFilter: "blur(2px)" }}
    >
      {label}
    </div>
    {directionsUrl && (
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-[10.5px] uppercase tracking-[0.12em] transition-colors duration-300 hover:bg-[var(--secondary)]"
        style={{ background: "var(--primary)", color: "var(--bg)" }}
      >
        Get Directions
        <ArrowUpRight size={11} strokeWidth={2} />
      </a>
    )}
  </div>
);

/** Pins the map section and gently zooms it (1 → ~1.08) while the person
 *  scrolls through it, then releases to continue scrolling — desktop only,
 *  disabled on touch/mobile widths to keep scroll behaviour simple there. */
const MapZoomStage = ({ children }) => {
  const stageRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          innerRef.current,
          { scale: 1 },
          {
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top top",
              end: "+=450",
              scrub: true,
              pin: true,
              pinSpacing: true,
            },
          }
        );
      }, stageRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={stageRef} className="relative">
      <div ref={innerRef} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
};

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
        ? { borderColor: "rgba(255,253,249,0.28)", color: "var(--bg)", background: "rgba(255,255,255,0.06)" }
        : { borderColor: "rgba(200,155,99,0.4)", color: "var(--primary)", background: "rgba(200,155,99,0.1)" }
    }
  >
    {Icon && <Icon size={13} strokeWidth={2} />}
    {children}
  </span>
);

/** Scroll-triggered counting number for the Overview stats. */
const AnimatedStat = ({ value, prefix = "", suffix = "", decimals = 0, label }) => {
  const numRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !numRef.current) return;
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: numRef.current, start: "top 88%", once: true },
        onUpdate: () => {
          if (numRef.current) numRef.current.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
        },
      });
    });
    return () => ctx.revert();
  }, [value, prefix, suffix, decimals]);

  return (
    <div>
      <div className="font-display text-[2.5rem] leading-none" style={{ color: "var(--primary)" }}>
        <span ref={numRef}>{prefix}0{suffix}</span>
      </div>
      <div className="font-mono mt-2 text-[10.5px] uppercase tracking-[0.13em]" style={{ color: "rgba(42,42,42,0.55)" }}>{label}</div>
    </div>
  );
};

const SpecRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 py-2.5" style={{ borderBottom: "1px solid rgba(42,42,42,0.08)" }}>
    <span className="font-mono text-[11.5px] uppercase tracking-[0.1em]" style={{ color: "rgba(42,42,42,0.55)" }}>{label}</span>
    <span className="font-display text-right text-[15px]" style={{ color: "var(--text)" }}>{value}</span>
  </div>
);

const SpecCard = ({ icon: Icon, title, rows, index }) => (
  <Reveal delay={(index % 3) * 0.08}>
    <div className="h-full rounded-[8px] border bg-white/70 p-6" style={{ borderColor: "rgba(200,155,99,0.25)" }}>
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "rgba(90,30,42,0.08)", color: "var(--primary)" }}>
        <Icon size={17} strokeWidth={1.75} />
      </div>
      <h4 className="font-display mb-3 text-[16.5px]" style={{ color: "var(--text)" }}>{title}</h4>
      <div>{rows.map((r) => <SpecRow key={r.label} {...r} />)}</div>
    </div>
  </Reveal>
);

const HighlightCard = ({ icon: Icon, title, note, index, featured = false }) => {
  if (featured) {
    return (
      <Reveal>
        <div className="nsh2-bento group relative overflow-hidden p-7 md:p-9">
          <span className="nsh2-bento-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full blur-3xl" style={{ background: "rgba(200,155,99,0.16)" }} />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 group-hover:bg-[var(--accent)]" style={{ borderColor: "rgba(200,155,99,0.5)", color: "var(--accent)" }}>
                <Icon size={24} strokeWidth={1.75} className="transition-colors duration-500 group-hover:text-[var(--dark)]" />
              </div>
              <h4 className="font-display text-[1.7rem] leading-tight md:text-[2rem]" style={{ color: "var(--bg)" }}>{title}</h4>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed md:text-right" style={{ color: "rgba(255,253,249,0.62)" }}>{note}</p>
          </div>
        </div>
      </Reveal>
    );
  }
  return (
    <Reveal delay={(index % 3) * 0.07}>
      <div className="nsh2-bento group relative h-full overflow-hidden p-6">
        <span className="nsh2-bento-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div className="relative">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 group-hover:bg-[var(--accent)]" style={{ borderColor: "rgba(200,155,99,0.5)", color: "var(--accent)" }}>
            <Icon size={18} strokeWidth={1.75} className="transition-colors duration-500 group-hover:text-[var(--dark)]" />
          </div>
          <h4 className="font-display mb-1.5 text-[17px]" style={{ color: "var(--bg)" }}>{title}</h4>
          <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,253,249,0.62)" }}>{note}</p>
        </div>
      </div>
    </Reveal>
  );
};

const AmenityCard = ({ icon: Icon, title, note, index }) => (
  <Reveal delay={(index % 4) * 0.06}>
    <div className="nsh2-badge group flex h-full flex-col items-center gap-3 p-6 text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
        style={{ background: "rgba(90,30,42,0.08)", color: "var(--primary)" }}
      >
        <Icon size={22} strokeWidth={1.6} />
      </div>
      <h4 className="font-display text-[15.5px]" style={{ color: "var(--text)" }}>{title}</h4>
      <p className="text-[12.5px] leading-relaxed" style={{ color: "rgba(42,42,42,0.58)" }}>{note}</p>
    </div>
  </Reveal>
);

const LandmarkRow = ({ icon: Icon, title, note, distance }) => (
  <div className="flex items-start gap-4 py-4" style={{ borderBottom: "1px solid rgba(255,253,249,0.1)" }}>
    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: "rgba(200,155,99,0.4)", color: "var(--accent)" }}>
      <Icon size={15} strokeWidth={1.75} />
    </div>
    <div className="flex-1">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h5 className="font-display text-[15.5px]" style={{ color: "var(--bg)" }}>{title}</h5>
        {distance && (
          <span className="font-mono rounded-sm px-2 py-0.5 text-[10.5px] tracking-[0.1em]" style={{ background: "var(--accent)", color: "var(--dark)" }}>
            {distance}
          </span>
        )}
      </div>
      <p className="mt-0.5 text-[13px] leading-relaxed" style={{ color: "rgba(255,253,249,0.6)" }}>{note}</p>
    </div>
  </div>
);

/** Horizontal "reel" gallery — pinned and GSAP-driven on desktop (vertical
 *  scroll translates into horizontal motion through the strip), and a plain
 *  native swipe/scroll-snap strip on mobile so touch scrolling stays simple
 *  and predictable there. Deliberately not a masonry grid. */
const GalleryReel = ({ items, onOpen }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const track = trackRef.current;
        if (!track) return;
        const distance = track.scrollWidth - track.parentElement.offsetWidth;
        if (distance > 0) {
          gsap.to(track, {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${distance + window.innerHeight * 0.25}`,
              scrub: true,
              pin: true,
              pinSpacing: true,
              invalidateOnRefresh: true,
            },
          });
        }
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [items.length]);

  return (
    <div ref={sectionRef} className="relative">
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="nsh2-reel-track flex gap-5 overflow-x-auto pb-3 lg:overflow-visible lg:pb-0"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((g, i) => (
            <button
              key={g.tag}
              onClick={() => onOpen(i)}
              className="nsh2-zoom-frame-wrap group relative block shrink-0 text-left"
              style={{ width: "min(76vw, 380px)", scrollSnapAlign: "start" }}
              aria-label={`Open ${g.tag} in gallery viewer`}
            >
              <div className="overflow-hidden rounded-[10px] transition-shadow duration-500 group-hover:shadow-2xl">
                <div className="nsh2-zoom-frame">
                  <ImagePlaceholder tag={g.tag} src={g.src} tone={i % 3 === 0 ? "dark" : "surface"} aspect="aspect-[3/4]" />
                </div>
              </div>
              {/* <div
                className="flex items-end justify-between"
                style={{
                  color: "var(--bg)",
                  backdropFilter: "blur(2px)",
                  position: "absolute",
                  background: "linear-gradient(0deg,rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)",
                  left: 0,
                  bottom: 0,
                  right: 0,
                  height: 10,
                  padding: 20,
                  fontSize: 36,
                  fontFamily: "'Fraunces'",
                  textTransform: "capitalize",
                  letterSpacing: 0,
                }}
              >
                <span>{g.tag}</span>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div> */}
            </button>
          ))}
        </div>
      </div>
      <p className="font-mono mt-6 text-[11px] uppercase tracking-[0.14em] lg:hidden" style={{ color: "rgba(42,42,42,0.4)" }}>
        Swipe to browse →
      </p>
    </div>
  );
};

/* =============================================================================
   DATA
============================================================================= */

const HERO_CHIPS = [
  { icon: Ruler, label: "4 Acres" },
  { icon: LayoutGrid, label: "54 Plots" },
  { icon: Milestone, label: "From 165 Sq. Yd" },
  { icon: FileCheck2, label: "DTCP T.L.P. 58/2024/HRO/H1" },
];

const HIGHLIGHTS = [
  { icon: LayoutGrid, title: "Infrastructure", note: "DTCP-compliant roads, drainage and utilities built into the plan." },
  { icon: Route, title: "Roads", note: "33 ft internal BT roads engineered across the full four-acre layout." },
  { icon: MapPin, title: "Premium Location", note: "On the same highway stretch as NS Homes, near Mirkhanpet." },
  { icon: Award, title: "Developer Track Record", note: "The same team that delivered Phase 1 is on the ground again." },
  { icon: Zap, title: "Utilities", note: "Electricity, drainage, overhead tank and harvesting provisions planned from day one." },
  { icon: Train, title: "Connectivity", note: "Minutes from Amazon Data Center, on a corridor with clear expansion underway." },
  { icon: TreePine, title: "Green Environment", note: "Open, landscaped pockets designed into the layout, not left as afterthoughts." },
];

const AMENITIES = [
  { icon: Ruler, title: "500 ft. Facing", note: "Frontage on the same main road stretch as NS Homes." },
  { icon: Milestone, title: "33 ft. Roads", note: "Internal roads engineered for smooth, everyday access." },
  { icon: LayoutGrid, title: "Compound Wall", note: "A finished boundary enclosing the full four-acre layout." },
  { icon: ShieldCheck, title: "Security", note: "A monitored, secured perimeter across the venture." },
  { icon: Zap, title: "Electricity", note: "Plot-level power connections built into the plan." },
  { icon: Waves, title: "Drainage", note: "A complete underground drainage network." },
  { icon: Droplets, title: "Overhead Water Tank", note: "Centralised storage feeding the site's water supply." },
  { icon: Recycle, title: "Water Harvesting Pit", note: "Rainwater capture designed into the layout." },
];

const LOCATION_DOORSTEP = [
  { icon: Building2, title: "Amazon Data Center", note: "A 48-acre facility minutes away, keeping the corridor busy and connected.", distance: "Nearby" },
  { icon: Route, title: "Srisailam Highway", note: "The same 100 ft main road NS Homes fronts.", distance: "On-road" },
  { icon: Route, title: "Nagarjuna Sagar Highway", note: "The second highway forming the same junction.", distance: "On-road" },
  { icon: FileCheck2, title: "Ibrahimpatnam SRO", note: "The sub-registrar's office handling plot registration.", distance: "Nearby" },
];

const LOCATION_GROWTH = [
  { icon: GraduationCap, title: "Young India Skill University", note: "A proposed vocational-training campus planned along the corridor.", distance: "In development" },
  { icon: Leaf, title: "Future City", note: "An eco-focused, sustainability-led development planned nearby.", distance: "In development" },
  { icon: Construction, title: "Highway Widening — 62.5 km", note: "A proposed widening of the Hyderabad–Srisailam Highway by CSTD.", distance: "Proposed" },
  { icon: Train, title: "Metro Expansion to Kandukur", note: "A proposed Hyderabad Metro extension along the highway.", distance: "Proposed" },
];

const GALLERY_ITEMS = [
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH2/Screenshot%202026-08-02%20193344.png", aspect: "aspect-[4/5]" },
  {  src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH2/IMG_0734-transformed-e1733912114633.jpg", aspect: "aspect-[4/3]" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH2/IMG_0732-e1733906468575.jpg", aspect: "aspect-[4/3]" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH2/Gallery-0.2.jpg", aspect: "aspect-[4/5]" },
  {  src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH2/Gallery-0.3.jpg", aspect: "aspect-[4/3]" },
  {  src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH2/Gallery-0.4.jpg", aspect: "aspect-[4/3]" },
  {  src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH2/Gallery-0.7.jpg", aspect: "aspect-[4/5]" },
  {  src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH2/Gallery-0.6.jpg", aspect: "aspect-[4/3]" },
  {  src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH2/Gallery-0.5.jpg", aspect: "aspect-[4/3]" },
  {  src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/NSH2/ns2.jpeg", aspect: "aspect-[4/5]" },
];

const SPEC_CARDS = [
  {
    icon: LayoutGrid,
    title: "Layout Specifications",
    rows: [
      { label: "Total Land", value: "4 Acres" },
      { label: "No. of Plots", value: "54" },
      { label: "Plot Sizes", value: "From 165 Sq. Yd" },
      { label: "Approval", value: "DTCP T.L.P. No. 58/2024/HRO/H1" },
    ],
  },
  {
    icon: Route,
    title: "Road Details",
    rows: [
      { label: "Internal Roads", value: "33 Ft." },
      { label: "Frontage", value: "500 Ft. on Main Road" },
    ],
  },
  {
    icon: Zap,
    title: "Infrastructure & Utilities",
    rows: [
      { label: "Electricity", value: "Included" },
      { label: "Underground Drainage", value: "Included" },
      { label: "Overhead Water Tank", value: "Included" },
      { label: "Water Harvesting", value: "Included" },
      { label: "Security & Maintenance", value: "Included" },
    ],
  },
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
        style={{ background: "rgba(23,15,17,0.94)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button aria-label="Close gallery" onClick={onClose} className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-[var(--bg)] transition hover:bg-white/10">
          <X size={18} />
        </button>
        <button aria-label="Previous image" onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 md:left-8 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-[var(--bg)] transition hover:bg-white/10">
          <ChevronLeft size={20} />
        </button>
        <button aria-label="Next image" onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 md:right-8 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-[var(--bg)] transition hover:bg-white/10">
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
          <ImagePlaceholder tag={item.tag} src={item.src} tone="dark" aspect="aspect-[4/3]" className="shadow-2xl" />
          <p className="font-mono mt-4 text-center text-[12px] uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
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

export default function NSH20LandingPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const heroTextureRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  
  useEffect(() => {
    if (!document.getElementById("nsh2-fonts")) {
      const link = document.createElement("link");
      link.id = "nsh2-fonts";
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      if (heroTextureRef.current && heroRef.current) {
        gsap.to(heroTextureRef.current, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
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

  return (
    <div ref={containerRef} className="nsh2-page w-full overflow-x-hidden">
      <GlobalStyle />

      {/* ============================================================ HERO */}
      <section
  ref={heroRef}
  className="relative flex min-h-[100svh] items-end overflow-hidden"
  style={{
    background:
      "linear-gradient(165deg,#23161A 0%,#33202A 55%,#5A1E2A 100%)",
  }}
>
  {/* =========================================================
      HERO BACKGROUND
     ========================================================= */}
  <div ref={heroTextureRef} className="absolute inset-0">
    <div
      className="nsh2-sheen absolute inset-0"
      style={{
        background:
          "radial-gradient(60% 60% at 30% 20%, rgba(200,155,99,0.16), transparent 60%)",
      }}
    />

    <ExpansionRings
      opacity={0.14}
      className="right-0 top-0 h-[70%] w-[70%]"
    />

    <div
      className="absolute h-56 w-56 rounded-full blur-3xl"
      style={{
        background: "rgba(200,155,99,0.25)",
        top: "14%",
        left: "8%",
        animation: "nsh2-float 11s ease-in-out infinite",
      }}
    />

    <div
      className="absolute h-72 w-72 rounded-full blur-3xl"
      style={{
        background: "rgba(123,44,59,0.35)",
        bottom: "10%",
        right: "12%",
        animation: "nsh2-float-rev 13s ease-in-out infinite",
      }}
    />
  </div>

  {/* =========================================================
      MAIN HERO CONTENT
     ========================================================= */}
  <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:px-10 md:pb-24">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <PhaseMark code="NSH-2.0" tone="onDark">
        Mirkhanpet, South Hyderabad
      </PhaseMark>
    </motion.div>

    {/* =====================================================
        HEADING
       ===================================================== */}
    <motion.h1
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="font-display mt-6 text-[13vw] leading-[0.94] tracking-tight md:text-[6.4rem]"
      style={{ color: "var(--bg)" }}
    >
      NS Homes{" "}
      <span
        className="italic"
        style={{ color: "var(--accent)" }}
      >
        2.0
      </span>
    </motion.h1>

    {/* =====================================================
        DESCRIPTION
       ===================================================== */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.35,
      }}
      className="mt-6 max-w-xl text-[16px] leading-relaxed md:text-[17px]"
      style={{ color: "rgba(255,253,249,0.8)" }}
    >
      54 residential plots across four fresh acres, extending the NS Homes
      address onto the same Srisailam–Nagarjuna Sagar Highway corridor —
      DTCP approved and open for investment.
    </motion.p>

    {/* =====================================================
        HERO CHIPS
       ===================================================== */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.55,
      }}
      className="mt-8 flex flex-wrap gap-2.5"
    >
      {HERO_CHIPS.map((c) => (
        <Chip
          key={c.label}
          icon={c.icon}
          tone="onDark"
        >
          {c.label}
        </Chip>
      ))}
    </motion.div>

    {/* =====================================================
        CTA BUTTONS
       ===================================================== */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.7,
      }}
      className="mt-11 flex flex-wrap items-center gap-4"
    >
      <button
        onClick={() => scrollToId("overview")}
        className="nsh2-btn-shine rounded-full px-7 py-3.5 text-[13.5px] font-medium tracking-wide transition-transform duration-300 hover:-translate-y-0.5"
        style={{
          background: "var(--accent)",
          color: "var(--dark)",
        }}
      >
        Explore Project
      </button>

      <button
        onClick={() => scrollToId("gallery")}
        className="group inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[13.5px] font-medium tracking-wide transition-colors duration-300 hover:bg-white/5"
        style={{
          borderColor: "rgba(255,253,249,0.3)",
          color: "var(--bg)",
        }}
      >
        View Gallery

        {/* Optional icon */}
        {/* 
        <ArrowUpRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
        */}
      </button>
    </motion.div>

    {/* =========================================================
        FCDA — MOBILE VERSION

        Completely different design from the previous circular seal.

        Mobile:
        - Comes after buttons
        - Remains in normal document flow
        - No absolute positioning
        - No overlap with menu/content
        - Large enough to read clearly
       ========================================================= */}
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.75,
        delay: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mt-9 flex w-full justify-start lg:hidden"
    >
      <div
        className="relative w-full max-w-[390px] overflow-hidden rounded-[18px] border p-[1px]"
        style={{
          borderColor: "rgba(200,155,99,0.5)",
          background:
            "linear-gradient(135deg, rgba(200,155,99,0.55), rgba(255,253,249,0.12), rgba(200,155,99,0.35))",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[17px] px-4 py-4 sm:px-5 sm:py-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(35,22,26,0.96), rgba(50,30,39,0.96))",
          }}
        >
          {/* Technical grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(200,155,99,1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(200,155,99,1) 1px, transparent 1px)
              `,
              backgroundSize: "22px 22px",
            }}
          />

          {/* Animated scan line */}
          <motion.div
            className="pointer-events-none absolute left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(200,155,99,0.7), transparent)",
            }}
            animate={{
              top: ["0%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "linear",
            }}
          />

          <div className="relative flex items-center gap-4">
            {/* FCDA MONOGRAM */}
            <div className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center sm:h-[84px] sm:w-[84px]">
              {/* Corner brackets */}
              <span
                className="absolute left-0 top-0 h-3 w-3 border-l border-t"
                style={{
                  borderColor: "var(--accent)",
                }}
              />

              <span
                className="absolute right-0 top-0 h-3 w-3 border-r border-t"
                style={{
                  borderColor: "var(--accent)",
                }}
              />

              <span
                className="absolute bottom-0 left-0 h-3 w-3 border-b border-l"
                style={{
                  borderColor: "var(--accent)",
                }}
              />

              <span
                className="absolute bottom-0 right-0 h-3 w-3 border-b border-r"
                style={{
                  borderColor: "var(--accent)",
                }}
              />

              {/* Vertical technical line */}
              <div
                className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(200,155,99,0.25), transparent)",
                }}
              />

              {/* FCDA text */}
              <motion.span
                className="relative z-10 font-display text-[23px] tracking-[0.06em] sm:text-[26px]"
                style={{
                  color: "var(--accent)",
                }}
                animate={{
                  opacity: shouldReduceMotion
                    ? 1
                    : [0.75, 1, 0.75],
                }}
                transition={{
                  duration: 3,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              >
                FCDA
              </motion.span>
            </div>

            {/* Vertical divider */}
            <div
              className="h-14 w-px shrink-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(200,155,99,0.65), transparent)",
              }}
            />

            {/* CONTENT */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-[8px] font-medium uppercase tracking-[0.22em]"
                  style={{
                    color: "rgba(255,253,249,0.48)",
                  }}
                >
                  FCDA / ZONING STATUS
                </span>

                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: "var(--accent)",
                    boxShadow:
                      "0 0 8px rgba(200,155,99,0.7)",
                  }}
                />
              </div>

              <div
                className="mt-1 text-[20px] font-medium tracking-wide sm:text-[15px]"
                style={{
                  color: "rgba(255,253,249,0.92)",
                }}
              >
                Comes under FCDA limits
              </div>
            </div>
          </div>

          {/* Bottom technical metadata */}
          <div
            className="relative mt-4 flex items-center justify-between border-t pt-3"
            style={{
              borderColor: "rgba(200,155,99,0.16)",
            }}
          >
            <span
              className="font-mono text-[7px] uppercase tracking-[0.2em]"
              style={{
                color: "rgba(255,253,249,0.38)",
              }}
            >
              NSH 2.0 / FCDA
            </span>

            <span
              className="font-mono text-[7px] uppercase tracking-[0.2em]"
              style={{
                color: "rgba(200,155,99,0.7)",
              }}
            >
              DEVELOPMENT PHASE
            </span>
          </div>
        </div>
      </div>
    </motion.div>


   {/* =========================================================
    FCDA — DESKTOP VERSION

    Large architectural information panel.
    Vertically centered with the hero content.
   ========================================================= */}
<motion.div
  initial={{
    opacity: 0,
    x: 35,
  }}
  animate={{
    opacity: 1,
    x: 0,
  }}
  transition={{
    duration: 0.9,
    delay: 0.95,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="absolute right-8 top-1/2 hidden w-[380px] -translate-y-1/2 lg:block xl:right-12"
>
  <div
    className="relative overflow-hidden border"
    style={{
      borderColor: "rgba(200,155,99,0.4)",
      background:
        "linear-gradient(135deg, rgba(35,22,26,0.82), rgba(90,30,42,0.48))",
      backdropFilter: "blur(14px)",
    }}
  >
    {/* =====================================================
        TOP HEADER
       ===================================================== */}
    <div
      className="flex items-center justify-between border-b px-7 py-4"
      style={{
        borderColor: "rgba(200,155,99,0.2)",
      }}
    >
      <span
        className="font-mono text-[9px] uppercase tracking-[0.3em]"
        style={{
          color: "rgba(255,253,249,0.48)",
        }}
      >
        FCDA / ZONING STATUS
      </span>

      <span
        className="font-mono text-[9px]"
        style={{
          color: "rgba(200,155,99,0.75)",
        }}
      >
        02
      </span>
    </div>

    {/* =====================================================
        MAIN CONTENT
       ===================================================== */}
    <div className="relative px-7 py-8">
      {/* Architectural corner frame */}
      <div
        className="pointer-events-none absolute left-5 top-5 h-14 w-14 border-l border-t"
        style={{
          borderColor: "rgba(200,155,99,0.5)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-5 right-5 h-14 w-14 border-b border-r"
        style={{
          borderColor: "rgba(200,155,99,0.5)",
        }}
      />

      {/* =================================================
          FCDA + CROSSHAIR
         ================================================= */}
      <div className="flex items-center justify-between gap-6">
        <div>
          <motion.div
            className="font-display text-[68px] leading-[0.82] tracking-[-0.045em]"
            style={{
              color: "var(--accent)",
            }}
            animate={{
              opacity: shouldReduceMotion
                ? 1
                : [0.84, 1, 0.84],
            }}
            transition={{
              duration: 4,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            FCDA
          </motion.div>

          <div
            className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em]"
            style={{
              color: "rgba(255,253,249,0.62)",
            }}
          >
            Zone Compliant
          </div>
        </div>

        {/* Technical crosshair */}
        <div className="relative h-[82px] w-[82px] shrink-0">
          <div
            className="absolute left-1/2 top-0 h-full w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(200,155,99,0.55), transparent)",
            }}
          />

          <div
            className="absolute left-0 top-1/2 h-px w-full"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(200,155,99,0.55), transparent)",
            }}
          />

          <div
            className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              borderColor: "rgba(200,155,99,0.65)",
            }}
          />

          <motion.div
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "var(--accent)",
              boxShadow:
                "0 0 12px rgba(200,155,99,0.8)",
            }}
            animate={{
              scale: shouldReduceMotion
                ? 1
                : [1, 1.8, 1],
              opacity: shouldReduceMotion
                ? 1
                : [0.65, 1, 0.65],
            }}
            transition={{
              duration: 2.5,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* =================================================
          MAIN FCDA MESSAGE
         ================================================= */}
      <div
        className="my-7 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(200,155,99,0.55), rgba(200,155,99,0.05))",
        }}
      />

      <div>
        <div
          className="font-mono text-[9px] uppercase tracking-[0.25em]"
          style={{
            color: "rgba(255,253,249,0.4)",
          }}
        >
          ZONING INFORMATION
        </div>

        <div
          className="mt-2 text-[21px] font-medium leading-tight tracking-wide"
          style={{
            color: "rgba(255,253,249,0.94)",
          }}
        >
          Comes under FCDA limits
        </div>

       </div>

      {/* =================================================
          DEVELOPMENT STATUS
         ================================================= */}
      <div
        className="mt-7 flex items-center justify-between border-t pt-5"
        style={{
          borderColor: "rgba(200,155,99,0.18)",
        }}
      >
        <div>
          <div
            className="font-mono text-[8px] uppercase tracking-[0.22em]"
            style={{
              color: "rgba(255,253,249,0.36)",
            }}
          >
            PROJECT STATUS
          </div>

          <div
            className="mt-1.5 text-[14px] font-medium"
            style={{
              color: "rgba(255,253,249,0.88)",
            }}
          >
            Development Phase
          </div>
        </div>

        {/* Simple status indicator — no "verified" */}
        <div className="flex items-center gap-2">
          <motion.span
            className="h-2 w-2 rounded-full"
            style={{
              background: "var(--accent)",
              boxShadow:
                "0 0 10px rgba(200,155,99,0.7)",
            }}
            animate={{
              opacity: shouldReduceMotion
                ? 1
                : [0.45, 1, 0.45],
            }}
            transition={{
              duration: 2,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />

          <span
            className="font-mono text-[8px] uppercase tracking-[0.18em]"
            style={{
              color: "rgba(200,155,99,0.72)",
            }}
          >
            IN PROGRESS
          </span>
        </div>
      </div>
    </div>

    {/* =====================================================
        BOTTOM REFERENCE STRIP
       ===================================================== */}
    <div
      className="flex items-center justify-between border-t px-7 py-3"
      style={{
        borderColor: "rgba(200,155,99,0.17)",
        background: "rgba(0,0,0,0.14)",
      }}
    >
      <span
        className="font-mono text-[8px] uppercase tracking-[0.24em]"
        style={{
          color: "rgba(255,253,249,0.32)",
        }}
      >
        NS HOMES 2.0
      </span>

      <span
        className="font-mono text-[8px] uppercase tracking-[0.24em]"
        style={{
          color: "rgba(200,155,99,0.55)",
        }}
      >
        FCDA
      </span>
    </div>
  </div>
</motion.div>
  </div>

  {/* =========================================================
      SCROLL CUE
     ========================================================= */}
  <div
    className="nsh2-scroll-cue absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
    style={{
      color: "var(--accent)",
    }}
    aria-hidden="true"
  >
    <div
      className="h-9 w-px"
      style={{
        background: "currentColor",
        opacity: 0.5,
      }}
    />
  </div>
</section>

      {/* ============================================================ Progress */}
      {/* <NSH2devprogress/> */}

      {/* ======================================================= OVERVIEW */}
      <section id="overview" className="relative px-6 py-24 md:px-10 md:py-32" style={{ background: "var(--bg)" }}>
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <PhaseMark>Project Overview</PhaseMark>
              <h2 className="font-display mt-5 text-[2.3rem] leading-[1.05] md:text-[2.8rem]" style={{ color: "var(--text)" }}>
                The next phase,
                <br /><span className="italic" style={{ color: "var(--primary)" }}>same address.</span>
              </h2>
              <p className="mt-6 text-[15.5px] leading-relaxed" style={{ color: "rgba(42,42,42,0.72)" }}>
                NS Homes 2.0 is the natural extension of a community that is already living. Four
                new acres of residential plots, starting at 165 square yards, sit on the same 100
                ft main road near the Amazon Data Center.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed" style={{ color: "rgba(42,42,42,0.72)" }}>
                The layout is DTCP-approved, with roads, electricity and drainage designed in from
                the start. Same corridor. Same standards. Fresh opportunity.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 rounded-[8px] border p-6" style={{ borderColor: "rgba(200,155,99,0.25)" }}>
              <SpecRow label="DTCP Layout" value="T.L.P NO. 58/2024/HRO/H1" />
              <SpecRow label="Registration" value="Ibrahimpatnam SRO" />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <ImagePlaceholder tag="NSH 2.0 — Site Overview" src={OVERVIEW_IMAGE} tone="surface" aspect="aspect-[16/12] lg:aspect-[18/10]" />
            </Reveal>
            {/* <Reveal delay={0.2} className="mt-10 grid grid-cols-2 gap-8 rounded-[8px] border p-8 sm:grid-cols-4" style={{ borderColor: "rgba(200,155,99,0.2)", background: "var(--surface)" }}>
              <AnimatedStat value={4} suffix=" Ac" label="Total Area" />
              <AnimatedStat value={54} label="Total Plots" />
              <AnimatedStat value={165} suffix="+" label="Sq.Yd. Starting" />
              <AnimatedStat value={20000} prefix="₹" label="Starting / Sq.Yd." />
            </Reveal> */}
          </div>
        </div>
      </section>

      {/* ====================================================== HIGHLIGHTS */}
      <section className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32" style={{ background: "#23161A" }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(38% 45% at 85% 8%, rgba(200,155,99,0.14), transparent 60%), radial-gradient(45% 40% at 6% 92%, rgba(123,44,59,0.35), transparent 65%), linear-gradient(180deg,#23161A,#33202A)",
          }}
        />
        <Grain />
        <FacetField opacity={0.04} stroke="#C89B63" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <PhaseMark tone="onDark">Project Highlights</PhaseMark>
              <h2 className="font-display mt-5 text-[2.2rem] leading-tight md:text-[2.7rem]" style={{ color: "var(--bg)" }}>
                Seven reasons it's an easy phase to join
              </h2>
            </div>
            <span className="font-mono hidden text-[12px] tracking-[0.14em] sm:block" style={{ color: "rgba(255,253,249,0.4)" }}>
              01 — 07
            </span>
          </Reveal>

          <div className="mt-12 space-y-5">
            <HighlightCard {...HIGHLIGHTS[0]} index={0} featured />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {HIGHLIGHTS.slice(1).map((h, i) => (
                <HighlightCard key={h.title} {...h} index={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================= AMENITIES */}
      <section className="relative px-6 py-24 md:px-10 md:py-32" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-xl text-center">
            <PhaseMark>Amenities</PhaseMark>
            <h2 className="font-display mt-5 text-[2.2rem] leading-tight md:text-[2.7rem]" style={{ color: "var(--text)" }}>
              Everything NS Homes proved out, again
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-5">
            {AMENITIES.map((a, i) => (
              <AmenityCard key={a.title} {...a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= LOCATION */}
      <section id="location" className="relative overflow-hidden px-6 pt-24 md:px-10 md:pt-32" style={{ background: "linear-gradient(180deg,#23161A,#2A1B20)" }}>
        <div className="relative mx-auto max-w-7xl pb-24 md:pb-32">
          <Reveal className="max-w-2xl">
            <PhaseMark tone="onDark">Location</PhaseMark>
            <h2 className="font-display mt-5 text-[2.2rem] leading-tight md:text-[2.7rem]" style={{ color: "var(--bg)" }}>
              Growing in the same address
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "rgba(255,253,249,0.68)" }}>
              NS Homes 2.0 sits on the same Srisailam–Nagarjuna Sagar Highway corridor as Phase 1,
              in a stretch of South Hyderabad attracting steady infrastructure investment.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "rgba(255,253,249,0.68)" }}>
              Close to the Amazon Data Center, with clear links to the Outer Ring Road and
              proposed regional developments around Mucherla and Kandukur.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <MapZoomStage>
                  <LocationMap src={MAP_EMBED_SRC} directionsUrl={MAP_DIRECTIONS_URL} label="NSH 2.0 — Site Location" className="aspect-[4/3] lg:aspect-auto lg:h-[520px]" />
                </MapZoomStage>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <h3 className="font-mono mb-1 text-[12px] uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>On the Doorstep</h3>
                <div className="mb-8">
                  {LOCATION_DOORSTEP.map((l) => <LandmarkRow key={l.title} {...l} />)}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <h3 className="font-mono mb-1 text-[12px] uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>Corridor Growth</h3>
                <div>
                  {LOCATION_GROWTH.map((l) => <LandmarkRow key={l.title} {...l} />)}
                </div>
                <p className="mt-5 text-[12.5px] leading-relaxed" style={{ color: "rgba(255,253,249,0.42)" }}>
                  The developments above are publicly announced or proposed regional projects,
                  included as area context rather than guarantees attached to NSH 2.0.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== GALLERY */}
      <section id="gallery" className="relative px-6 py-24 md:px-10 md:py-32" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <PhaseMark>Gallery</PhaseMark>
              <h2 className="font-display mt-5 text-[2.2rem] leading-tight md:text-[2.7rem]" style={{ color: "var(--text)" }}>
                Site progress, in pictures
              </h2>
            </div>
            {/* <span className="font-mono hidden text-[12px] tracking-[0.14em] sm:block" style={{ color: "rgba(42,42,42,0.4)" }}>
              Scroll to move through the reel →
            </span> */}
          </Reveal>
        </div>

        <div className="mx-auto max-w-7xl px-0 md:px-4">
          <GalleryReel items={GALLERY_ITEMS} onOpen={openLightbox} />
        </div>
      </section>

      {/* =================================================== SPECIFICATIONS */}
      <section className="relative px-6 py-24 md:px-10 md:py-32" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <PhaseMark>Project Specifications</PhaseMark>
            <h2 className="font-display mt-5 text-[2.2rem] leading-tight md:text-[2.7rem]" style={{ color: "var(--text)" }}>
              The details, in one place
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SPEC_CARDS.map((s, i) => <SpecCard key={s.title} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* =========================================================== CONTACT */}
      <section id="contact" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32" style={{ background: "linear-gradient(165deg,#23161A 0%,#33202A 55%,#5A1E2A 100%)" }}>
        <Grain />
        <div className="nsh2-cta-glow h-72 w-72" style={{ background: "rgba(200,155,99,0.22)", top: "-6%", left: "-4%" }} />
        <div className="nsh2-cta-glow h-96 w-96" style={{ background: "rgba(123,44,59,0.4)", bottom: "-12%", right: "-6%" }} />

        <div className="relative mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <PhaseMark tone="onDark">Get in Touch</PhaseMark>
            <h2 className="font-display mt-5 text-[2.4rem] leading-[1.05] md:text-[3.2rem]" style={{ color: "var(--bg)" }}>
              Let's plan your visit to <span className="italic" style={{ color: "var(--accent)" }}>NSH 2.0</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[15.5px] leading-relaxed" style={{ color: "rgba(255,253,249,0.7)" }}>
              For any queries you may have about NS Homes 2.0, please fill out the form below and
              our team will reach out to you.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Chip icon={MapPin} tone="onDark">Mirkhanpet, Srisailam Highway</Chip>
            <Chip icon={FileCheck2} tone="onDark">DTCP T.L.P. 58/2024/HRO/H1</Chip>
          </Reveal>

  

          <Reveal delay={0.2} className="mx-auto mt-14 max-w-2xl">
            <div className="nsh2-glass p-7 md:p-10">
              <div className="hs-form-frame" data-region="na2" data-form-id="1c0438af-3740-4231-98f2-ace8a45c047d" data-portal-id="21626983" />
            </div>
          </Reveal>
        </div>
      </section>

      <Lightbox items={GALLERY_ITEMS} index={lightboxIndex} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
    </div>
  );
}