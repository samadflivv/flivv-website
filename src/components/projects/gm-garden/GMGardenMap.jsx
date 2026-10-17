'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { FineGrid, GrainOverlay } from './GMGardenAtmosphere';
import { revealUp } from './motion';

// Google Maps location section.
//
// This section is a permanent part of the page — do not remove or replace it in
// future redesigns. It requires `map.googleMapsEmbedUrl`; without it the section
// renders nothing.
export default function GMGardenMap({ map }) {
  if (!map?.googleMapsEmbedUrl) return null;
  const { eyebrow, title, description, address, googleMapsUrl, googleMapsEmbedUrl } = map;

  return (
    <section id="location-map" className="relative isolate overflow-hidden bg-[#100F0A] py-20 text-[#F7F4EC] md:py-28">
      <FineGrid tone="dark" tile={96} className="-z-10 opacity-70" />
      <GrainOverlay className="-z-10" />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <motion.div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between" {...revealUp}>
          <div className="max-w-2xl">
            {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#C9A66B]">{eyebrow}</p>}
            {title && (
              <h2 className="mt-5 font-[family-name:var(--font-gm-serif,Georgia,serif)] text-[clamp(2.1rem,4.4vw,3.4rem)] text-balance leading-[1.08] tracking-[-0.01em]">
                {title}
              </h2>
            )}
            {description && <p className="mt-6 text-base leading-[1.85] text-[#F7F4EC]/70">{description}</p>}
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end">
            {address && (
              <p className="flex items-start gap-2.5 text-sm leading-relaxed text-[#F7F4EC]/70 md:max-w-xs md:text-right">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A66B]" strokeWidth={1.6} aria-hidden="true" />
                <span>{address}</span>
              </p>
            )}
          </div>
        </motion.div>

        <motion.div className="mt-12 border border-[#C9A66B]/25 bg-[#1B1915] p-2 md:p-3" {...revealUp}>
          <div className="relative overflow-hidden">
            <iframe
              title={title || 'GM Garden Villas location map'}
              src={googleMapsEmbedUrl}
              className="h-[340px] w-full border-0 md:h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
