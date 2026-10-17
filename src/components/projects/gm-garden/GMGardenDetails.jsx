'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { EASE_OUT, revealUp } from './motion';

// Essential plot details. A labelled definition table rather than a data dump —
// `<th scope="row">` on each label keeps the table meaningful to screen readers.
export default function GMGardenDetails({ details }) {
  if (!details) return null;
  const rows = (details.tableRows || []).filter((row) => row && row.label && row.value);
  const chips = (details.chips || []).filter(Boolean);

  if (!rows.length && !chips.length && !details.address) return null;

  return (
    <section id="plot-details" className="relative isolate bg-[#F7F4EC] py-24 md:py-36">
      <div className="mx-auto grid max-w-[1280px] items-start gap-14 px-6 md:grid-cols-12 md:px-10">
        <motion.div className="md:col-span-5 md:py-6" {...revealUp}>
          {details.eyebrow && (
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#9C7A3C]">{details.eyebrow}</p>
          )}
          {details.title && (
            <h2 className="mt-5 font-[family-name:var(--font-gm-serif,Georgia,serif)] text-[clamp(2.1rem,4.4vw,3.4rem)] text-balance leading-[1.08] tracking-[-0.01em] text-[#15140F]">
              {details.title}
            </h2>
          )}
          <span className="mt-9 block h-px w-14 bg-[#9C7A3C]" aria-hidden="true" />
          {details.description && (
            <p className="mt-9 text-base leading-[1.85] text-[#6E6A5E] md:text-lg">{details.description}</p>
          )}

          {details.address && (
            <div className="mt-10 border border-[#9C7A3C]/20 bg-white p-5">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#9C7A3C]">Site address</p>
              <p className="mt-3 text-sm leading-relaxed text-[#6E6A5E]">{details.address}</p>
            </div>
          )}

          {chips.length > 0 && (
            <ul className="mt-9 flex flex-wrap gap-3">
              {chips.map((chip, index) => (
                <motion.li
                  key={chip}
                  className="inline-flex items-center gap-2 border border-[#9C7A3C]/25 bg-white px-3.5 py-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#9C7A3C]"
                  initial={{ y: 10 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.07, ease: EASE_OUT }}
                >
                  <Check className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                  {chip}
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>

        {rows.length > 0 && (
          <motion.div className="md:col-span-6 md:col-start-7" {...revealUp}>
            <div className="overflow-hidden border border-[#9C7A3C]/25 bg-white">
              <div
                aria-hidden="true"
                className="h-px w-full bg-gradient-to-r from-[#9C7A3C]/60 via-[#9C7A3C]/20 to-transparent"
              />
              <table className="w-full border-collapse">
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row.label} className={index === rows.length - 1 ? '' : 'border-b border-[#9C7A3C]/15'}>
                      <th
                        scope="row"
                        className="w-36 bg-[#F7F4EC]/60 px-5 py-5 text-left align-top text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#9C7A3C] md:w-48 md:px-8 md:py-7"
                      >
                        {row.label}
                      </th>
                      <td className="px-5 py-5 align-top text-sm leading-relaxed text-[#15140F] md:px-8 md:py-7 md:text-base">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
