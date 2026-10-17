'use client';

import { motion } from 'framer-motion';
import GMGardenBlueprintArt from './GMGardenBlueprintArt';
import { EASE_OUT, revealUp } from './motion';

// Second section. The previous version leaned on the hero photograph a second
// time; it now pairs the scarcity argument with an abstract site-plan drawing.
export default function GMGardenIntroduction({ introduction }) {
  if (!introduction) return null;
  const { eyebrow, title, description, highlights, art } = introduction;
  const paragraphs = (description || []).filter(Boolean);
  const highlightItems = (highlights || []).filter((item) => item && item.title);

  if (!title && !paragraphs.length && !highlightItems.length) return null;

  return (
    <section id="project-introduction" className="relative isolate bg-[#F7F4EC] py-24 md:py-36">
      <div className="mx-auto grid max-w-[1280px] items-start gap-16 px-6 md:grid-cols-12 md:px-10">
        <motion.div className="md:col-span-6 md:py-8" {...revealUp}>
          {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#9C7A3C]">{eyebrow}</p>}
          {title && (
            <h2 className="mt-5 font-[family-name:var(--font-gm-serif,Georgia,serif)] text-[clamp(2.1rem,4.4vw,3.4rem)] text-balance leading-[1.08] tracking-[-0.01em] text-[#15140F]">
              {title}
            </h2>
          )}
          <span className="mt-9 block h-px w-14 bg-[#9C7A3C]" aria-hidden="true" />

          <div className="mt-9 space-y-5 text-base leading-[1.85] text-[#6E6A5E] md:text-lg">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {highlightItems.length > 0 && (
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {highlightItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="border-t border-[#9C7A3C]/35 bg-white/70 p-5 pt-4"
                  initial={{ y: 14 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: EASE_OUT }}
                >
                  <p className="font-[family-name:var(--font-gm-serif,Georgia,serif)] text-lg text-[#9C7A3C]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-[#15140F]">{item.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#6E6A5E]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div className="md:col-span-5 md:col-start-8" {...revealUp}>
          <GMGardenBlueprintArt caption={art?.caption} meta={art?.meta} />
        </motion.div>
      </div>
    </section>
  );
}
