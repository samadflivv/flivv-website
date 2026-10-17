'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { EASE_OUT, revealUp } from './motion';

// Location details, split into a sticky editorial column and a scrolling column
// of landmark groups.
//
// The sticky column is a normal grid item — because grid items stretch to the
// row height, it is exactly as tall as the (much taller) landmark column, so the
// inner panel has a containing block to travel inside. Below `md` the layout
// collapses to a plain stack and the sticky behaviour is switched off entirely.
export default function GMGardenLocation({ location, mapHref }) {
  const groups = (location?.groups || []).filter((group) => group && group.title && (group.items || []).length);
  const hasContent = Boolean(location && (groups.length || location.address || location.title || location.description));
  const [activeGroup, setActiveGroup] = useState(0);
  const groupRefs = useRef([]);

  // Highlights the landmark group currently under the reading line, which gives
  // the scroll progression a visible anchor on the sticky side.
  useEffect(() => {
    if (groups.length < 2) return undefined;
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = groupRefs.current.indexOf(entry.target);
            if (index !== -1) setActiveGroup(index);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    groupRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [groups.length]);

  if (!hasContent) return null;

  return (
    <section id="location-details" className="relative isolate bg-[#1B1915] py-24 text-[#F7F4EC] md:py-32">
      {/* The decorative glow needs clipping, but `overflow-hidden` must not sit on
          the section itself — an overflow-hidden ancestor turns the sticky column
          below into a no-op. Clipping happens in this sibling layer instead. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,166,107,0.14),transparent_65%)] blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <motion.div {...revealUp}>
                {location.eyebrow && (
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#C9A66B]">{location.eyebrow}</p>
                )}
                {location.title && (
                  <h2 className="mt-5 font-[family-name:var(--font-gm-serif,Georgia,serif)] text-[clamp(2.1rem,4.4vw,3.4rem)] text-balance leading-[1.08] tracking-[-0.01em]">
                    {location.title}
                  </h2>
                )}
                <span className="mt-9 block h-px w-14 bg-[#C9A66B]" aria-hidden="true" />
                {location.description && (
                  <p className="mt-9 text-base leading-[1.85] text-[#F7F4EC]/70 md:text-lg">{location.description}</p>
                )}

                {location.address && (
                  <div className="mt-10 border border-[#9C7A3C]/25 bg-[#F7F4EC]/5 p-5">
                    <p className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#C9A66B]">
                      <MapPin className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                      Site address
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#F7F4EC]/85">{location.address}</p>
                    {mapHref && (
                      <a
                        href={mapHref}
                        className="group mt-5 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#C9A66B] transition-colors duration-300 hover:text-[#E7DCC3]"
                      >
                        View on map
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </a>
                    )}
                  </div>
                )}

                {groups.length > 1 && (
                  <ol className="mt-10 hidden md:block">
                    {groups.map((group, index) => (
                      <li
                        key={group.title}
                        className={`flex items-center gap-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-colors duration-500 ${
                          index === activeGroup ? 'text-[#C9A66B]' : 'text-[#F7F4EC]/30'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-px transition-all duration-500 ${
                            index === activeGroup ? 'w-8 bg-[#C9A66B]' : 'w-4 bg-[#F7F4EC]/20'
                          }`}
                        />
                        {group.title}
                      </li>
                    ))}
                  </ol>
                )}
              </motion.div>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="space-y-6">
              {groups.map((group, index) => (
                <motion.article
                  key={group.title}
                  ref={(node) => {
                    groupRefs.current[index] = node;
                  }}
                  className={`border p-6 transition-colors duration-700 md:p-8 ${
                    index === activeGroup ? 'border-[#9C7A3C]/40 bg-[#F7F4EC]/[0.07]' : 'border-[#9C7A3C]/20 bg-[#F7F4EC]/5'
                  }`}
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-[family-name:var(--font-gm-serif,Georgia,serif)] text-2xl text-[#F7F4EC] md:text-[1.7rem]">
                      {group.title}
                    </h3>
                    <span className="shrink-0 font-[family-name:var(--font-gm-serif,Georgia,serif)] text-sm text-[#C9A66B]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <span aria-hidden="true" className="mt-5 block h-px w-full bg-[#9C7A3C]/20" />

                  <ul className="mt-6 space-y-4">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3.5 text-sm leading-relaxed text-[#F7F4EC]/75 md:text-base">
                        <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rotate-45 bg-[#C9A66B]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
