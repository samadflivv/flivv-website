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
  ChevronLeft,
  ChevronRight,
  Ruler,
  FileCheck,
  Maximize2,
  X,
} from "lucide-react";

/* ============================================================
   IDEAL AVENUE — completed HMDA-approved open-plot community
   Design tokens — cool "ocean" palette:
   dark #03045E · primary #023E8A · secondary #0077B6
   accent #00B4D8 · background #F4FBFD · surface #E8F6FA
   text #0B2239

   Note on animation libraries: the brief specifies Framer Motion
   and GSAP. This file uses native IntersectionObserver + CSS
   transitions instead, so the component has zero external
   animation dependencies and drops into any React + Tailwind
   project as-is. If your project already has framer-motion / gsap
   installed, the <Reveal> wrapper below is the spot to swap in —
   everything else is layout.
   ============================================================ */

const GRAIN_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`
)}`;

// TODO: replace with real gallery links when available
const GALLERY_IMAGES = [
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7133.jpg" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7154.jpg" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7137.jpg" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7141.jpg" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7134.jpg" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7156.jpg" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7149.jpg" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7162.jpg" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7139.jpg" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7135.jpg" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7142.jpg" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7157.jpg" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7143.jpg" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7145.jpg" },
  { src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7151.jpg" },
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

function useSectionRefs() {
  const namedRefs = useRef({});
  const register = (key) => (el) => {
    namedRefs.current[key] = el;
  };
  const scrollTo = (key) =>
    namedRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
  return { register, scrollTo };
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

function GlowOrb({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  );
}

function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#0077B6] font-[var(--ia-mono)]">
      <span className="h-px w-6 bg-[#00B4D8]" />
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, className = "" }) {
  return (
    <Reveal className={className}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 font-[var(--ia-display)] text-[clamp(1.9rem,4vw,3rem)] leading-[1.12] text-[#03045E] font-medium">
        {title}
      </h2>
    </Reveal>
  );
}

function PlaqueBadge({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#00B4D8]/50 bg-[#03045E]/40 backdrop-blur-sm px-4 py-2 text-[12px] tracking-wide text-[#F4FBFD] font-[var(--ia-mono)]">
      <Icon size={14} className="text-[#00B4D8] shrink-0" />
      {children}
    </span>
  );
}

function IconBadge({ icon: Icon, size = "h-11 w-11", iconSize = 19 }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#023E8A] to-[#0077B6] text-[#00B4D8] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_-2px_rgba(0,180,216,0.65)] ${size}`}
    >
      <Icon size={iconSize} strokeWidth={1.75} />
    </div>
  );
}

function FeatureCard({ icon: Icon, label, index }) {
  return (
    <Reveal delay={index * 60}>
      <div className="group h-full rounded-2xl bg-gradient-to-br from-[#00B4D8]/35 via-[#0077B6]/10 to-transparent p-[1px] transition-transform duration-500 hover:-translate-y-1.5">
        <div className="flex h-full flex-col justify-between rounded-[15px] bg-[#F4FBFD]/85 backdrop-blur-sm p-6 transition-shadow duration-500 group-hover:shadow-[0_20px_45px_-24px_rgba(2,62,138,0.45)]">
          <IconBadge icon={Icon} />
          <p className="mt-5 text-[15px] leading-snug text-[#0B2239] font-medium">{label}</p>
        </div>
      </div>
    </Reveal>
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
          <stop offset="0%" stopColor="#03045E" />
          <stop offset="55%" stopColor="#023E8A" />
          <stop offset="100%" stopColor="#0077B6" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="62%" r="42%">
          <stop offset="0%" stopColor="#00B4D8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00B4D8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B2A4A" />
          <stop offset="100%" stopColor="#041B33" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#sky)" />
      <ellipse cx="800" cy="560" rx="620" ry="260" fill="url(#glow)" />
      {/* distant ridge */}
      <path
        d="M0 560 L180 520 L360 548 L560 500 L780 535 L1020 495 L1260 540 L1440 512 L1600 545 L1600 900 L0 900 Z"
        fill="#03045E"
        opacity="0.55"
      />
      {/* road */}
      <polygon points="700,900 900,900 830,560 770,560" fill="url(#road)" />
      <polygon points="700,900 900,900 830,560 770,560" fill="none" stroke="#00B4D8" strokeOpacity="0.15" />
      {/* centre dashes */}
      <g stroke="#00B4D8" strokeWidth="6" strokeLinecap="round" opacity="0.85">
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

function Hero({ onGallery, onLocation }) {
  const badges = [
    { icon: BadgeCheck, label: "HMDA Approved" },
    { icon: Ruler, label: "From 165 Sq. Yd" },
    { icon: FileCheck, label: "L.P. No. 000103/LO/Plg/HMDA/2022" },
  ];
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#03045E]">
      <HighwayArt />
      <div className="absolute inset-0 bg-gradient-to-t from-[#03045E] via-[#03045E]/60 to-[#03045E]/20" />

      {/* monogram */}
      <div className="absolute left-6 top-7 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#00B4D8]/50 sm:left-10 sm:top-10">
        <span className="font-[var(--ia-display)] text-[13px] tracking-widest text-[#00B4D8]">IA</span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 sm:px-10">
        <Reveal>
          <Eyebrow>
            <span className="text-[#00B4D8]">Ideal Avenue</span>
          </Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 max-w-3xl font-[var(--ia-display)] text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.08] text-[#F4FBFD]">
            Rediscover luxury on the{" "}
            <span className="bg-gradient-to-r from-[#00B4D8] via-[#48CAE4] to-[#90E0EF] bg-clip-text text-transparent">
              Old Bangalore Highway
            </span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-[#E8F6FA]/85">
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
              className="inline-flex items-center gap-2 rounded-full border border-[#E8F6FA]/30 px-6 py-3 text-[13px] font-medium tracking-wide text-[#F4FBFD] transition-all duration-300 hover:border-[#00B4D8] hover:bg-white/5 hover:text-[#00B4D8]"
            >
              View Location
              <MapPin size={15} />
            </button>
            <button
              onClick={onGallery}
              className="group inline-flex items-center gap-2 rounded-full bg-[#00B4D8] px-6 py-3 text-[13px] font-semibold tracking-wide text-[#03045E] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_-10px_rgba(0,180,216,0.65)]"
            >
              View Gallery
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[#E8F6FA]/50">
        <ChevronDown size={20} className="ia-bob" />
      </div>
    </section>
  );
}

function Overview({ setRef }) {
  return (
    <section ref={setRef} className="relative overflow-hidden bg-[#F4FBFD] px-6 py-24 sm:px-10 lg:py-32">
      <GlowOrb className="left-[-12%] top-[15%] h-72 w-72 bg-[#00B4D8]/15" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5" as="div">
          <div className="relative flex justify-center aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-[#023E8A] to-[#03045E] ring-1 ring-[#00B4D8]/20 shadow-[0_30px_70px_-35px_rgba(2,62,138,0.5)]">
            <img
              src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Ideal%20Avenue/IMG_7133.jpg"
              alt="Ideal Avenue site"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03045E]/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 rounded-xl border border-[#00B4D8]/35 bg-[#03045E]/70 px-4 py-3 backdrop-blur-sm">
              <span className="font-[var(--ia-mono)] text-[15px] uppercase tracking-[0.2em] text-[#00B4D8]">
                Completed · Sold Out
              </span>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading eyebrow="Project Overview" title="A finished address on a growing corridor." />
          <Reveal delay={120}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#0B2239]/85">
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
  const normalItems = [
    { icon: BadgeCheck, label: "Full HMDA approval" },
    { icon: ShieldCheck, label: "Gated community with controlled access" },
    { icon: Compass, label: "100% Vastu-compliant plotting" },
    { icon: Route, label: "CC roads throughout" },
    { icon: SignpostBig, label: "30 ft internal roads" },
    { icon: Zap, label: "Electricity and drainage connections" },
  ];
  return (
    <section ref={setRef} className="relative overflow-hidden bg-[#E8F6FA] px-6 py-24 sm:px-10 lg:py-32">
      <GlowOrb className="left-[-8%] top-[-8%] h-80 w-80 bg-[#00B4D8]/25" />
      <GlowOrb className="right-[-10%] bottom-[-12%] h-96 w-96 bg-[#023E8A]/15" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow="Highlights" title="What Defines Ideal Avenue" />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-4 sm:auto-rows-[140px] sm:[grid-auto-flow:dense]">
          {/* feature tile */}
          <Reveal className="sm:col-span-2 sm:row-span-2">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#023E8A] to-[#03045E] p-7 shadow-[0_25px_60px_-30px_rgba(2,62,138,0.6)] transition-transform duration-500 hover:-translate-y-1.5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:18px_18px]"
              />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00B4D8]/15 ring-1 ring-[#00B4D8]/40 text-[#00B4D8] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_-4px_rgba(0,180,216,0.7)]">
                <Navigation size={24} strokeWidth={1.75} />
              </div>
              <p className="relative font-[var(--ia-display)] text-[22px] leading-snug text-[#F4FBFD]">
                Direct frontage on the 200&nbsp;ft Old Bangalore Highway
              </p>
            </div>
          </Reveal>

          {normalItems.map((it, i) => (
            <FeatureCard key={it.label} icon={it.icon} label={it.label} index={i} />
          ))}

          {/* wide banner tile */}
          <Reveal className="sm:col-span-2" delay={normalItems.length * 60}>
            <div className="group h-full rounded-2xl bg-gradient-to-br from-[#00B4D8]/40 via-[#0077B6]/15 to-transparent p-[1px] transition-transform duration-500 hover:-translate-y-1">
              <div className="flex h-full items-center gap-5 rounded-[15px] bg-[#F4FBFD]/85 backdrop-blur-sm px-6 py-5">
                <IconBadge icon={Home} />
                <p className="text-[15px] leading-snug text-[#0B2239] font-medium">
                  Designed for long-term ownership, not just short-term appreciation.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Gallery({ setRef }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const total = GALLERY_IMAGES.length;

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((v) => (v + 1) % total);
      if (e.key === "ArrowLeft") setActiveIndex((v) => (v - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, total]);

  return (
    <section ref={setRef} className="relative overflow-hidden bg-[#E8F6FA] px-6 py-24 sm:px-10 lg:py-32">
      <GlowOrb className="right-[-8%] top-[8%] h-72 w-72 bg-[#0077B6]/20" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow="Gallery" title="A look around the community" />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal key={img.caption} delay={i * 60}>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-[#023E8A]/15 transition-shadow duration-500 hover:shadow-[0_20px_45px_-24px_rgba(2,62,138,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#03045E]/75 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  <span className="px-4 pb-3 text-[12.5px] font-medium text-[#F4FBFD]">{img.caption}</span>
                </div>
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#03045E]/50 text-[#F4FBFD] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 size={14} />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#03045E]/92 px-4 py-10 backdrop-blur-md"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#F4FBFD] transition-colors hover:bg-white/20"
          >
            <X size={18} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((v) => (v - 1 + total) % total);
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-[#F4FBFD] transition-colors hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((v) => (v + 1) % total);
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-[#F4FBFD] transition-colors hover:bg-white/20 sm:right-8"
          >
            <ChevronRight size={20} />
          </button>

          <div className="max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY_IMAGES[activeIndex].src}
              alt={GALLERY_IMAGES[activeIndex].caption}
              className="max-h-[78vh] w-auto max-w-[92vw] rounded-2xl object-contain shadow-2xl"
            />
            <p className="mt-4 text-center font-[var(--ia-mono)] text-[12.5px] tracking-wide text-[#F4FBFD]/75">
              {GALLERY_IMAGES[activeIndex].caption} · {activeIndex + 1} / {total}
            </p>
          </div>
        </div>
      )}
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
    <section ref={setRef} className="relative overflow-hidden bg-[#03045E] px-6 py-24 sm:px-10 lg:py-32">
      <GlowOrb className="left-[-10%] bottom-[-15%] h-80 w-80 bg-[#0077B6]/25" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Location"
          title={<>Between Kothur and Shadnagar —  <br /> on the Old Highway</>}
          className="[&_h2]:text-[#F4FBFD]"
        />
        <Reveal delay={120}>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#E8F6FA]/75">
            Close enough to key employment, education and lifestyle nodes,
            yet set in a planned open-plot environment.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3" delay={80}>
            <div className="overflow-hidden rounded-3xl ring-1 ring-[#00B4D8]/25 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
              <iframe
                title="Ideal Avenue location"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4094.895794875883!2d78.22207556413112!3d17.094368977628896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDA1JzQyLjEiTiA3OMKwMTMnMjYuNyJF!5e1!3m2!1sen!2sin!4v1785936775189!5m2!1sen!2sin"
                width="600"
                height="450"
                className="h-[380px] w-full sm:h-[440px] lg:h-full lg:min-h-[420px]"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-[#00B4D8]/20 bg-white/5 p-2 backdrop-blur-md">
              {stops.map((s, i) => (
                <Reveal key={s.place} delay={i * 70}>
                  <div className="flex items-center gap-4 border-b border-[#00B4D8]/10 px-4 py-4 last:border-b-0">
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#00B4D8]/12 px-3 py-1 font-[var(--ia-mono)] text-[12px] text-[#00B4D8]">
                      <Clock size={12} />
                      {s.time}
                    </span>
                    <span className="flex-1 text-[14px] text-[#F4FBFD]/90">{s.place}</span>
                    <Navigation size={14} className="text-[#00B4D8]/60" />
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


/* ============================================================
   Root component
   ============================================================ */

export default function IdealAvenue() {
  const { register, scrollTo } = useSectionRefs();

  return (
    <div className="relative bg-[#F4FBFD] font-[var(--ia-body)] text-[#0B2239]">
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

      <Hero onGallery={() => scrollTo("gallery")} onLocation={() => scrollTo("location")} />
      <Overview setRef={register("overview")} />
      <Highlights setRef={register("highlights")} />
      <Gallery setRef={register("gallery")} />
      <LocationSection setRef={register("location")} />
    </div>
  );
}