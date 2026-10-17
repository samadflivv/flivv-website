'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import PlaceholderArt from './PlaceholderArt';

export default function GMGardenGallery({ gallery }) {
  const allImages = gallery?.images || [];
  const realImages = allImages.filter((image) => image && image.src);
  const [activeIndex, setActiveIndex] = useState(null);
  const touchStartX = useRef(null);
  const closeButtonRef = useRef(null);
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex((index) => (index === null ? null : (index + 1) % realImages.length)),
    [realImages.length]
  );
  const prev = useCallback(
    () => setActiveIndex((index) => (index === null ? null : (index - 1 + realImages.length) % realImages.length)),
    [realImages.length]
  );

  // Keyboard navigation, scroll lock and initial focus while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKey = (event) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') prev();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, next, prev]);

  // Hidden only when no gallery is configured at all.
  if (!allImages.length) return null;

  const active = activeIndex !== null ? realImages[activeIndex] : null;

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next();
      else prev();
    }
  };

  return (
    <section className="bg-white py-24 md:py-36">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          {gallery.eyebrow && (
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#9C7A3C]">{gallery.eyebrow}</p>
          )}
          {gallery.title && (
            <h2 className="mt-5 font-[family-name:var(--font-gm-serif,Georgia,serif)] text-4xl leading-[1.1] text-[#15140F] md:text-5xl">
              {gallery.title}
            </h2>
          )}
          {gallery.description && (
            <p className="mt-6 text-base leading-relaxed text-[#6E6A5E] md:text-lg">{gallery.description}</p>
          )}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {allImages.map((image, index) => {
            if (!image?.src) {
              return (
                <PlaceholderArt
                  key={`placeholder-${index}`}
                  aspect={index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}
                  tone="light"
                  label={index === 0 ? 'GM Garden — Gallery Coming Soon' : undefined}
                />
              );
            }
            const realIndex = realImages.indexOf(image);
            return (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(realIndex)}
                aria-label={`Open image ${realIndex + 1}${image.alt ? `: ${image.alt}` : ''}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden bg-[#F7F4EC] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9C7A3C]"
              >
                <Image
                  src={image.src}
                  alt={image.alt || ''}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-[#15140F]/0 transition-colors duration-500 group-hover:bg-[#15140F]/15" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Project image viewer"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#15140F]/95 p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close image viewer"
              className="absolute right-4 top-4 z-10 p-2 text-[#F7F4EC] hover:text-[#C9A66B] md:right-8 md:top-8"
            >
              <X className="h-7 w-7" strokeWidth={1.5} />
            </button>

            {realImages.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  prev();
                }}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-2 text-[#F7F4EC] hover:text-[#C9A66B] md:left-6"
              >
                <ChevronLeft className="h-9 w-9" strokeWidth={1.25} />
              </button>
            )}

            <div
              className="relative h-[75vh] w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0].clientX;
              }}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt || ''}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {realImages.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  next();
                }}
                aria-label="Next image"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-2 text-[#F7F4EC] hover:text-[#C9A66B] md:right-6"
              >
                <ChevronRight className="h-9 w-9" strokeWidth={1.25} />
              </button>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-[#E7DCC3]">
              <p>{`${activeIndex + 1} / ${realImages.length}`}</p>
              {active.caption && <p className="mt-1 text-[#F7F4EC]/80">{active.caption}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
