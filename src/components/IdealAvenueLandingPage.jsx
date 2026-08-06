'use client';

import React, { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  BadgeCheck,
  Route,
  SignpostBig,
  Zap,
  Compass,
  Navigation,
  Home,
  DoorOpen,
  Droplets,
  MapPin,
  Clock,
  ArrowRight,
  ChevronDown,
  Ruler,
  Banknote,
  FileCheck,
} from "lucide-react";

/* ============================================================
   IDEAL AVENUE — completed HMDA-approved open-plot community
   Design tokens (from brief):
   primary #6B2A2A · secondary #8D3E3E · accent #D6B36A
   background #FCFAF7 · surface #F5F2EE · text #2B2B2B · dark #1D1616

   Signature concept: "The Corridor" — the project's whole identity
   is a 200 ft highway corridor between Kothur and Shadnagar, so a
   thin gold route-line tracks the reader's progress down the page,
   lighting up a marker as each section is reached — the page is
   read the way the highway is driven.

   Note on animation libraries: the brief specifies Framer Motion
   and GSAP. This file uses native IntersectionObserver + CSS
   transitions instead, so the component has zero external
   animation dependencies and drops into any React + Tailwind
   project as-is. If your project already has framer-motion / gsap
   installed, the <Reveal> wrapper and the corridor-progress hook
   below are the two spots to swap in — everything else is layout.
   ============================================================ */

const GRAIN_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`
)}`;

const SECTION_KEYS = [
  "overview",
  "highlights",
  "infrastructure",
  "location",
  "details",
  "investment",
];

/* ---------------- hooks ---------------- */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useCorridor(count) {
  const [active, setActive] = useState(-1);
  const indexRefs = useRef([]);
  const namedRefs = useRef({});

  const register = (i, key) => (el) => {
    indexRefs.current[i] = el;
    if (key) namedRefs.current[key] = el;
  };

  useEffect(() => {
    const observers = [];
    indexRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { threshold: 0, rootMargin: "-42% 0px -42% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (key) =>
    namedRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return { active, register, scrollTo };
}

/* ---------------- small building blocks ---------------- */

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <Tag
      ref={ref}
      className={`${className} transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
      }`}
      style={{ transitionDelay: reduced ? "0ms" : `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#8D3E3E] font-[var(--ia-mono)]">
      <span className="h-px w-6 bg-[#D6B36A]" />
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, className = "" }) {
  return (
    <Reveal className={className}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 font-[var(--ia-display)] text-[clamp(1.9rem,4vw,3rem)] leading-[1.12] text-[#1D1616] font-medium">
        {title}
      </h2>
    </Reveal>
  );
}

function PlaqueBadge({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#D6B36A]/50 bg-[#1D1616]/40 backdrop-blur-sm px-4 py-2 text-[12px] tracking-wide text-[#F5F2EE] font-[var(--ia-mono)]">
      <Icon size={14} className="text-[#D6B36A] shrink-0" />
      {children}
    </span>
  );
}

function FeatureCard({ icon: Icon, label, index, tone = "wine" }) {
  const dashed = tone === "blueprint";
  return (
    <Reveal delay={index * 70}>
      <div
        className={`group relative h-full rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1.5 ${
          dashed
            ? "border border-dashed border-[#6B2A2A]/30 bg-[#FCFAF7] hover:border-[#D6B36A] hover:shadow-[0_18px_40px_-24px_rgba(107,42,42,0.45)]"
            : "bg-[#F5F2EE] hover:shadow-[0_20px_45px_-24px_rgba(107,42,42,0.5)]"
        }`}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#6B2A2A] to-[#8D3E3E] text-[#D6B36A] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <Icon size={19} strokeWidth={1.75} />
        </div>
        <p className="mt-5 text-[15px] leading-snug text-[#2B2B2B] font-medium">
          {label}
        </p>
      </div>
    </Reveal>
  );
}

function SpecRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[#D6B36A]/20 py-2.5 last:border-b-0">
      <span className="text-[11px] uppercase tracking-[0.16em] text-[#D6B36A]/80 font-[var(--ia-mono)]">
        {label}
      </span>
      <span className="text-right text-[14px] text-[#F5F2EE] font-[var(--ia-mono)]">
        {value}
      </span>
    </div>
  );
}

function SpecCard({ heading, rows, index, stamp }) {
  return (
    <Reveal delay={index * 90}>
      <div className="relative h-full rounded-2xl bg-gradient-to-b from-[#2B1010] to-[#1D1616] p-7 shadow-[0_25px_60px_-30px_rgba(29,22,22,0.7)] ring-1 ring-[#D6B36A]/25">
        {stamp && (
          <span
            className="absolute right-4 top-4 rotate-[-8deg] rounded-sm border-2 border-dashed border-[#D6B36A] px-2 py-1 text-[10px] font-[var(--ia-mono)] uppercase tracking-widest text-[#D6B36A]"
          >
            {stamp}
          </span>
        )}
        <h3 className="font-[var(--ia-display)] text-[19px] text-[#F5F2EE]">{heading}</h3>
        <div className="mt-4">
          {rows.map((r) => (
            <SpecRow key={r.label} label={r.label} value={r.value} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- corridor progress rail ---------------- */

function CorridorRail({ active }) {
  return (
    <div className="pointer-events-none fixed left-8 top-1/2 z-40 hidden h-[50vh] -translate-y-1/2 lg:flex xl:left-12">
      <div className="relative w-px h-full bg-[#6B2A2A]/15">
        <div
          className="absolute left-0 top-0 w-px bg-[#D6B36A] transition-[height] duration-700 ease-out"
          style={{ height: `${((active + 1) / SECTION_KEYS.length) * 100}%` }}
        />
        <div className="absolute inset-0 flex flex-col justify-between">
          {SECTION_KEYS.map((key, i) => (
            <span
              key={key}
              className={`h-2 w-2 rounded-full border transition-colors duration-500 ${
                i <= active
                  ? "border-[#D6B36A] bg-[#D6B36A] shadow-[0_0_0_4px_rgba(214,179,106,0.18)]"
                  : "border-[#6B2A2A]/25 bg-[#FCFAF7]"
              }`}
              style={{ marginLeft: "-3.5px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- hero illustration ---------------- */

function HighwayArt() {
  const reduced = useReducedMotion();
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D1616" />
          <stop offset="55%" stopColor="#3A1B1B" />
          <stop offset="100%" stopColor="#6B2A2A" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="62%" r="42%">
          <stop offset="0%" stopColor="#D6B36A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#D6B36A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A2626" />
          <stop offset="100%" stopColor="#241111" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#sky)" />
      <ellipse cx="800" cy="560" rx="620" ry="260" fill="url(#glow)" />
      {/* distant ridge */}
      <path
        d="M0 560 L180 520 L360 548 L560 500 L780 535 L1020 495 L1260 540 L1440 512 L1600 545 L1600 900 L0 900 Z"
        fill="#1D1616"
        opacity="0.55"
      />
      {/* road */}
      <polygon points="700,900 900,900 830,560 770,560" fill="url(#road)" />
      <polygon points="700,900 900,900 830,560 770,560" fill="none" stroke="#D6B36A" strokeOpacity="0.12" />
      {/* centre dashes */}
      <g stroke="#D6B36A" strokeWidth="6" strokeLinecap="round" opacity="0.85">
        <g className={reduced ? "" : "ia-dash-run"}>
          {Array.from({ length: 9 }).map((_, i) => {
            const t = i / 8;
            const y = 900 - t * 340;
            const x = 800 - t * 2;
            const len = 26 - t * 18;
            return <line key={i} x1={x} y1={y} x2={x} y2={y - len} />;
          })}
        </g>
      </g>
    </svg>
  );
}

/* ============================================================
   Section components
   ============================================================ */

function Hero({ onExplore, onLocation }) {
  const badges = [
    { icon: BadgeCheck, label: "HMDA Approved" },
    { icon: Ruler, label: "From 165 Sq. Yd" },
    { icon: Banknote, label: "₹20,000 / Sq. Yd" },
    { icon: FileCheck, label: "L.P. No. 000103/LO/Plg/HMDA/2022" },
  ];
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#1D1616]">
      <HighwayArt />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1D1616] via-[#1D1616]/60 to-[#1D1616]/20" />

      {/* monogram */}
      <div className="absolute left-6 top-7 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#D6B36A]/50 sm:left-10 sm:top-10">
        <span className="font-[var(--ia-display)] text-[13px] tracking-widest text-[#D6B36A]">IA</span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 sm:px-10">
        <Reveal>
          <Eyebrow>
            <span className="text-[#D6B36A]">Ideal Avenue</span>
          </Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 max-w-3xl font-[var(--ia-display)] text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.08] text-[#FCFAF7]">
            Rediscover luxury on the{" "}
            <span className="text-[#D6B36A]">Old Bangalore Highway.</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-[#F5F2EE]/85">
            A premium HMDA-approved open-plot community between Kothur and
            Shadnagar, set directly on the 200 ft Old Bangalore Highway.
            Fifty-eight thoughtfully planned plots, starting from 165 square
            yards.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {badges.map((b) => (
              <PlaqueBadge key={b.label} icon={b.icon}>
                {b.label}
              </PlaqueBadge>
            ))}
          </div>
        </Reveal>

        <Reveal delay={380}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onLocation}
              className="inline-flex items-center gap-2 rounded-full border border-[#F5F2EE]/30 px-6 py-3 text-[13px] font-medium tracking-wide text-[#F5F2EE] transition-colors duration-300 hover:border-[#D6B36A] hover:text-[#D6B36A]"
            >
              View Location
              <MapPin size={15} />
            </button>
            <button
              onClick={onExplore}
              className="group inline-flex items-center gap-2 rounded-full bg-[#D6B36A] px-6 py-3 text-[13px] font-semibold tracking-wide text-[#1D1616] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Project
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[#F5F2EE]/50">
        <ChevronDown size={20} className="ia-bob" />
      </div>
    </section>
  );
}

function Overview({ setRef }) {
  return (
    <section ref={setRef} className="relative bg-[#FCFAF7] px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5" as="div">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-[#6B2A2A] to-[#1D1616]">
            <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full opacity-90">
              <defs>
                <pattern id="plotGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <rect width="50" height="50" fill="none" stroke="#D6B36A" strokeOpacity="0.22" />
                </pattern>
              </defs>
              <rect width="400" height="500" fill="url(#plotGrid)" />
              <line x1="0" y1="250" x2="400" y2="250" stroke="#D6B36A" strokeWidth="4" strokeDasharray="2 10" />
              <rect x="150" y="200" width="100" height="100" fill="#D6B36A" fillOpacity="0.85" />
            </svg>
            <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-[#1D1616]/70 px-4 py-3 backdrop-blur-sm">
              <span className="font-[var(--ia-mono)] text-[11px] uppercase tracking-[0.2em] text-[#D6B36A]">
                Completed · Sold Out
              </span>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading eyebrow="Project Overview" title="A finished address on a growing corridor." />
          <Reveal delay={120}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#2B2B2B]/85">
              Ideal Avenue sits on the wide 200 ft Old Bangalore Highway under
              the R1 zone, between Kothur and Shadnagar. The layout contained
              58 residential plots ranging from 165 to 500 square yards,
              delivered with clear HMDA approval and essential infrastructure
              in place. Gated, Vastu-aligned and positioned in one of South
              Hyderabad&rsquo;s steady investment stretches, this is a
              completed community with limited resale opportunities now
              available.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Highlights({ setRef }) {
  const items = [
    { icon: ShieldCheck, label: "Gated community with controlled access" },
    { icon: BadgeCheck, label: "Full HMDA approval" },
    { icon: Route, label: "CC roads throughout" },
    { icon: SignpostBig, label: "30 ft internal roads" },
    { icon: Zap, label: "Electricity and drainage connections" },
    { icon: Compass, label: "100% Vastu-compliant plotting" },
    { icon: Navigation, label: "Direct frontage on the 200 ft Old Bangalore Highway" },
    { icon: Home, label: "Designed for long-term ownership, not just short-term appreciation." },
  ];
  return (
    <section ref={setRef} className="relative bg-[#F5F2EE] px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Highlights" title="What defines Ideal Avenue" />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <FeatureCard key={it.label} icon={it.icon} label={it.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Infrastructure({ setRef }) {
  const items = [
    { icon: DoorOpen, label: "Gated entrance and compound" },
    { icon: Route, label: "Cement concrete internal roads" },
    { icon: Zap, label: "Electricity to plots" },
    { icon: Droplets, label: "Underground drainage" },
    { icon: SignpostBig, label: "30 ft wide internal roads" },
    { icon: Compass, label: "Vastu-oriented layout" },
  ];
  return (
    <section ref={setRef} className="relative bg-[#FCFAF7] px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="On-Ground Infrastructure" title="Infrastructure that is already in place" />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <FeatureCard key={it.label} icon={it.icon} label={it.label} index={i} tone="blueprint" />
          ))}
        </div>
        <Reveal delay={480}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-[var(--ia-display)] text-[17px] italic text-[#6B2A2A]/85">
            Everything required for a settled residential address was planned
            and executed as part of the original development.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function LocationSection({ setRef }) {
  const stops = [
    { time: "13 mins", place: "MSN Laboratories" },
    { time: "18 mins", place: "National Remote Sensing Centre" },
    { time: "20 mins", place: "SIBM University" },
    { time: "26 mins", place: "Kanha Shanti Vanam" },
    { time: "30 mins", place: "RGIA" },
  ];
  return (
    <section ref={setRef} className="relative bg-[#1D1616] px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Location"
          title="Between Kothur and Shadnagar — on the Old Highway"
          className="[&_h2]:text-[#F5F2EE]"
        />
        <Reveal delay={120}>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#F5F2EE]/75">
            Close enough to key employment, education and lifestyle nodes,
            yet set in a planned open-plot environment.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3" delay={80}>
            <div className="overflow-hidden rounded-3xl ring-1 ring-[#D6B36A]/25 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
              {/* Placeholder embed — swap the query for exact coordinates */}
              <iframe
                title="Ideal Avenue location"
                src="https://maps.google.com/maps?q=Kothur%20to%20Shadnagar%20Old%20Bangalore%20Highway&t=&z=12&ie=UTF8&iwloc=&output=embed"
                className="h-[380px] w-full grayscale-[15%] sm:h-[440px] lg:h-full lg:min-h-[420px]"
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>
          </Reveal>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-[#D6B36A]/20 bg-[#241111] p-2">
              {stops.map((s, i) => (
                <Reveal key={s.place} delay={i * 70}>
                  <div className="flex items-center gap-4 border-b border-[#D6B36A]/10 px-4 py-4 last:border-b-0">
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#D6B36A]/12 px-3 py-1 font-[var(--ia-mono)] text-[12px] text-[#D6B36A]">
                      <Clock size={12} />
                      {s.time}
                    </span>
                    <span className="flex-1 text-[14px] text-[#F5F2EE]/90">{s.place}</span>
                    <Navigation size={14} className="text-[#D6B36A]/60" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Details({ setRef }) {
  const cards = [
    {
      heading: "Layout",
      rows: [
        { label: "Total Plots", value: "58" },
        { label: "Plot Sizes", value: "165 – 500 Sq. Yd" },
        { label: "Approval", value: "HMDA L.P. No. 000103/LO/Plg/HMDA/2022" },
      ],
    },
    {
      heading: "Roads & Access",
      rows: [
        { label: "Main Road", value: "200 ft Old Bangalore Highway" },
        { label: "Internal Roads", value: "30 ft" },
      ],
    },
    {
      heading: "Status",
      rows: [{ label: "Project", value: "Sold Out" }],
      stamp: "Sold Out",
    },
  ];
  return (
    <section ref={setRef} className="relative bg-[#F5F2EE] px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Project Details" title="The essentials, clearly stated" />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <SpecCard key={c.heading} heading={c.heading} rows={c.rows} index={i} stamp={c.stamp} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Investment({ setRef }) {
  return (
    <section ref={setRef} className="relative overflow-hidden bg-gradient-to-b from-[#6B2A2A] to-[#1D1616] px-6 py-24 text-center sm:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D6B36A] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D6B36A] to-transparent" />
      <Reveal>
        <Eyebrow>
          <span className="text-[#D6B36A]">Investment</span>
        </Eyebrow>
      </Reveal>
      <Reveal delay={100}>
        <p className="mx-auto mt-6 max-w-xl font-[var(--ia-display)] text-[clamp(1.4rem,3vw,2rem)] leading-snug text-[#FCFAF7]">
          Project sold out. Limited resale opportunities may be available.
        </p>
      </Reveal>
    </section>
  );
}

/* ============================================================
   Root component
   ============================================================ */

export default function IdealAvenue() {
  const { active, register, scrollTo } = useCorridor(SECTION_KEYS.length);

  return (
    <div className="relative bg-[#FCFAF7] font-[var(--ia-body)] text-[#2B2B2B]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,450;9..144,560&family=Manrope:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        :root {
          --ia-display: 'Fraunces', serif;
          --ia-body: 'Manrope', sans-serif;
          --ia-mono: 'IBM Plex Mono', monospace;
        }
        @keyframes ia-dash-run { to { stroke-dashoffset: -80; } }
        .ia-dash-run { stroke-dasharray: 26 20; animation: ia-dash-run 4.5s linear infinite; }
        @keyframes ia-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        .ia-bob { animation: ia-bob 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ia-dash-run, .ia-bob { animation: none !important; }
        }
      `}</style>

      {/* grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[70] opacity-[0.045] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_SVG}")` }}
      />

      <CorridorRail active={active} />

      <Hero onExplore={() => scrollTo("overview")} onLocation={() => scrollTo("location")} />
      <Overview setRef={register(0, "overview")} />
      <Highlights setRef={register(1, "highlights")} />
      <Infrastructure setRef={register(2, "infrastructure")} />
      <LocationSection setRef={register(3, "location")} />
      <Details setRef={register(4, "details")} />
      <Investment setRef={register(5, "investment")} />
    </div>
  );
}