'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FineGrid, GrainOverlay } from './GMGardenAtmosphere';
import { EASE_OUT, revealUp } from './motion';

// Fourth section — immersive full-bleed image.
//
// Desktop: the image panel is exactly one viewport tall and `object-contain`, so
// the whole photograph is visible (never cropped) and any leftover space reads as
// deliberate letterboxing against the ink background.
// Mobile: the panel keeps the photograph's native 16:9 landscape proportions at a
// sensible height, again with no cropping.
export default function GMGardenImageStory({ story }) {
  if (!story || (!story.title && !story.description)) return null;
  const { eyebrow, title, description, imageAlt } = story;
  const image = story.primaryImage || story.secondaryImage;
  const hasImage = Boolean(image?.src);

  return (
    <section id="visual-story" className="relative isolate overflow-hidden bg-[#100F0A] py-24 text-[#F7F4EC] md:py-32">
      <FineGrid tone="dark" tile={96} className="-z-10 opacity-60" />
      <GrainOverlay className="-z-10" />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <motion.div className="mx-auto max-w-3xl text-center" {...revealUp}>
          {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#C9A66B]">{eyebrow}</p>}
          {title && (
            <h2 className="mt-5 font-[family-name:var(--font-gm-serif,Georgia,serif)] text-[clamp(2.1rem,4.4vw,3.4rem)] text-balance leading-[1.08] tracking-[-0.01em]">
              {title}
            </h2>
          )}
          <span aria-hidden="true" className="mx-auto mt-8 block h-px w-14 bg-[#C9A66B]" />
          {description && (
            <p className="mt-8 text-base leading-[1.85] text-[#F7F4EC]/70 md:text-lg">{description}</p>
          )}
        </motion.div>
      </div>

      <motion.figure
        className="relative mt-14 md:mt-20"
        initial={{ scale: 1.025 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
      >
        <div className="relative aspect-video w-full border-y border-[#C9A66B]/15 md:aspect-auto md:h-[100svh]">
          {hasImage ? (
            <Image
              src={image.src}
              alt={imageAlt || image.alt || ''}
              fill
              sizes="100vw"
              className="object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-[#C9A66B]">
                GM Garden — Photography Coming Soon
              </p>
            </div>
          )}
        </div>

        {imageAlt && (
          <figcaption className="mx-auto max-w-[1280px] px-6 pt-5 text-[0.7rem] uppercase tracking-[0.24em] text-[#F7F4EC]/45 md:px-10">
            {imageAlt}
          </figcaption>
        )}
      </motion.figure>
    </section>
  );
}
