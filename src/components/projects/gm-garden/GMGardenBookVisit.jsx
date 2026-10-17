'use client';

import { motion } from 'framer-motion';
import HubSpotForm from './HubSpotForm';
import { AuroraField, GrainOverlay } from './GMGardenAtmosphere';
import { revealUp } from './motion';

// Closing CTA. The HubSpot embed is untouched — only the surrounding surface
// changed, from a dimmed photograph to the same animated light field used by the
// hero, so the page opens and closes on one visual idea.
export default function GMGardenBookVisit({ bookVisit, hubspot }) {
  if (!bookVisit) return null;
  const { eyebrow, title, description, formHeading } = bookVisit;

  return (
    <section id="book-a-visit" className="relative isolate overflow-hidden bg-[#1B1915] py-24 text-[#F7F4EC] md:py-32">
      <AuroraField className="-z-10 opacity-70" />
      <GrainOverlay className="-z-10" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#C9A66B]/40 to-transparent"
      />

      <div className="relative mx-auto grid max-w-[1280px] items-start gap-16 px-6 md:grid-cols-12 md:px-10">
        <motion.div className="md:col-span-5 md:py-8" {...revealUp}>
          {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#C9A66B]">{eyebrow}</p>}
          {title && (
            <h2 className="mt-5 font-[family-name:var(--font-gm-serif,Georgia,serif)] text-[clamp(2.1rem,4.4vw,3.4rem)] text-balance leading-[1.08] tracking-[-0.01em]">
              {title}
            </h2>
          )}
          <span className="mt-9 block h-px w-14 bg-[#C9A66B]" aria-hidden="true" />
          {description && <p className="mt-9 text-base leading-[1.85] text-[#F7F4EC]/70 md:text-lg">{description}</p>}
        </motion.div>

        <motion.div className="md:col-span-6 md:col-start-7" {...revealUp}>
          <div className="border border-[#9C7A3C]/30 bg-[#F7F4EC] p-6 text-[#15140F] md:p-10">
            {formHeading && (
              <h3 className="font-[family-name:var(--font-gm-serif,Georgia,serif)] text-2xl text-[#15140F] md:text-3xl">
                {formHeading}
              </h3>
            )}
            <span aria-hidden="true" className="mt-5 block h-px w-12 bg-[#9C7A3C]" />
            <div className="mt-7">{hubspot && <HubSpotForm {...hubspot} />}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
