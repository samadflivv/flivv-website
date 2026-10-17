'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AuroraField, FineGrid, GrainOverlay, HairlineArcs } from './GMGardenAtmosphere';
import { EASE_OUT } from './motion';

// The hero carries no photography by design. Exclusivity is communicated with
// light, surveyor's hairlines and typography — which stays sharp on every screen
// and costs nothing in page weight.
export default function GMGardenHero({ hero }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  // Depth on scroll: the backdrop trails the content, and the content fades last.
  const artY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const artOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  if (!hero) return null;

  const { eyebrow, title, subtitle, tagline, description, ctaLabel, ctaTarget } = hero;
  const heroSubcopy = subtitle || tagline;

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#100F0A] px-6 pb-28 pt-36 text-center text-[#F7F4EC] md:pb-32 md:pt-44"
    >
      <motion.div aria-hidden="true" style={{ y: artY, opacity: artOpacity }} className="absolute inset-0 -z-10">
        <AuroraField />
        <FineGrid tone="dark" tile={88} />
        <HairlineArcs />
      </motion.div>

      {/* Vignette keeps the centre readable whatever the aurora is doing */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_28%,rgba(8,7,5,0.92)_100%)]"
      />
      <GrainOverlay className="-z-10" />

      <motion.div className="relative z-10 mx-auto w-full max-w-4xl" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div initial={{ y: 28 }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE_OUT }}>
          {eyebrow && (
            <div className="flex items-center justify-center gap-5">
              <span aria-hidden="true" className="h-px w-10 bg-[#C9A66B]/45 sm:w-16" />
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.42em] text-[#C9A66B] sm:text-xs">
                {eyebrow}
              </p>
              <span aria-hidden="true" className="h-px w-10 bg-[#C9A66B]/45 sm:w-16" />
            </div>
          )}

          {title && (
            <h1 className="mt-8 text-balance font-[family-name:var(--font-gm-serif,Georgia,serif)] text-[clamp(2.9rem,8vw,6.5rem)] font-normal leading-[0.98] tracking-[-0.015em]">
              {title}
            </h1>
          )}

          <div aria-hidden="true" className="mt-9 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#C9A66B]/40" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#C9A66B]" />
            <span className="h-px w-12 bg-[#C9A66B]/40" />
          </div>

          {heroSubcopy && (
            <p className="mt-8 font-[family-name:var(--font-gm-serif,Georgia,serif)] text-[clamp(1.35rem,3vw,2.1rem)] italic leading-snug text-[#E7DCC3]">
              {heroSubcopy}
            </p>
          )}

          {description && (
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-[1.85] text-[#F7F4EC]/70 md:text-[1.0625rem]">
              {description}
            </p>
          )}

          {ctaLabel && ctaTarget && (
            <div className="mt-10">
              <a
                href={ctaTarget}
                className="group relative isolate inline-flex items-center gap-4 overflow-hidden border border-[#C9A66B]/70 px-9 py-4 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-[#F7F4EC] transition-colors duration-500 hover:text-[#100F0A] sm:text-xs md:px-11"
              >
                {/* Gold wipe on hover, contained by the anchor's own stacking context. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-left scale-x-0 bg-[#C9A66B] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
                <span className="relative">{ctaLabel}</span>
                <span
                  aria-hidden="true"
                  className="relative inline-block h-px w-6 bg-current transition-all duration-500 group-hover:w-10"
                />
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>

      <a
        href="#project-introduction"
        aria-label="Scroll to project introduction"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="block h-14 w-px bg-gradient-to-b from-[#C9A66B]/0 via-[#C9A66B]/70 to-[#C9A66B]/0 motion-safe:animate-pulse" />
      </a>
    </section>
  );
}
