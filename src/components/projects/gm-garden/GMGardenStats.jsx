'use client';

import { motion } from 'framer-motion';
import { staggerItem } from './motion';

// Dark interstitial band carrying the hard numbers. Hairline rules top and
// bottom turn it into a deliberate panel rather than a plain colour block.
export default function GMGardenStats({ stats }) {
  const items = (stats?.items || []).filter(
    (item) => item && item.label && item.value !== undefined && item.value !== null && item.value !== ''
  );
  if (!items.length) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#211F1A] py-20 text-[#F7F4EC] md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A66B]/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A66B]/45 to-transparent"
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-2 gap-x-6 gap-y-14 px-6 md:grid-cols-4 md:px-10">
        {items.map((item, index) => (
          <motion.div key={item.label} className="relative text-center" {...staggerItem(index * 0.1, 14)}>
            {index > 0 && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-3 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-transparent via-[#C9A66B]/35 to-transparent md:block"
              />
            )}

            <p className="font-[family-name:var(--font-gm-serif,Georgia,serif)] text-[clamp(2.6rem,5vw,3.75rem)] font-light leading-none text-[#E7DCC3]">
              {item.value}
              {item.suffix && (
                <span className="ml-1.5 text-[0.45em] tracking-[0.08em] text-[#C9A66B]">{item.suffix}</span>
              )}
            </p>

            <span aria-hidden="true" className="mx-auto mt-6 block h-px w-8 bg-[#C9A66B]/40" />

            <p className="mt-6 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#C9A66B]">{item.label}</p>
            {item.description && (
              <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-relaxed text-[#F7F4EC]/60">
                {item.description}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
