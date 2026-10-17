'use client';

import { motion } from 'framer-motion';
import { Building2, Compass, Leaf, MapPin, ShieldCheck, Sparkles, Star, Trees } from 'lucide-react';
import { EASE_OUT, revealUp } from './motion';

const iconMap = { Building2, Compass, Leaf, MapPin, ShieldCheck, Sparkles, Star, Trees };

export default function GMGardenBenefits({ benefits }) {
  if (!benefits) return null;
  const items = (benefits.items || []).filter((item) => item && item.title);
  if (!items.length) return null;
  const { eyebrow, title, description } = benefits;

  return (
    <section className="relative isolate bg-[#F7F4EC] py-24 md:py-36">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <motion.div className="mx-auto max-w-2xl text-center" {...revealUp}>
          {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#9C7A3C]">{eyebrow}</p>}
          {title && (
            <h2 className="mt-5 font-[family-name:var(--font-gm-serif,Georgia,serif)] text-[clamp(2.1rem,4.4vw,3.4rem)] text-balance leading-[1.08] tracking-[-0.01em] text-[#15140F]">
              {title}
            </h2>
          )}
          <span aria-hidden="true" className="mx-auto mt-8 block h-px w-14 bg-[#9C7A3C]" />
          {description && <p className="mt-8 text-base leading-[1.85] text-[#6E6A5E] md:text-lg">{description}</p>}
        </motion.div>

        {/* Hairline separators come from the grid gap showing the parent colour. */}
        <div className="mt-16 grid gap-px border border-[#9C7A3C]/20 bg-[#9C7A3C]/20 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <motion.article
                key={item.title}
                className="group bg-[#F7F4EC] p-8 transition-colors duration-500 hover:bg-white md:p-9"
                initial={{ y: 16 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: EASE_OUT }}
              >
                <div className="flex items-center justify-between">
                  <Icon
                    className="h-6 w-6 text-[#9C7A3C] transition-transform duration-500 group-hover:-translate-y-0.5"
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                  <span className="font-[family-name:var(--font-gm-serif,Georgia,serif)] text-2xl text-[#C9A66B]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mt-8 font-[family-name:var(--font-gm-serif,Georgia,serif)] text-xl text-[#15140F] md:text-2xl">
                  {item.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-5 block h-px w-8 bg-[#9C7A3C]/40 transition-all duration-500 group-hover:w-14"
                />
                {item.description && (
                  <p className="mt-5 text-sm leading-relaxed text-[#6E6A5E]">{item.description}</p>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
