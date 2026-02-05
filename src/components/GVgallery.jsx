'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const allGalleryImages = [
    { id: 1, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/image1.jpg", alt: "" },
    { id: 2, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.46.58%20AM.jpeg", alt: "" },
    { id: 3, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.00%20AM.jpeg", alt: "" },
    { id: 4, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.46.59%20AM.jpeg", alt: "" },
    { id: 5, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.46.59%20AM%20(1).jpeg", alt: "" },
    { id: 6, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.46.59%20AM%20(2).jpeg", alt: "" },
    { id: 7, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.01%20AM.jpeg", alt: "" },
    { id: 8, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.01%20AM%20(1).jpeg", alt: "" },
    { id: 9, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.02%20AM.jpeg", alt: "" },
    { id: 10, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.03%20AM.jpeg", alt: "" },
    { id: 11, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.04%20AM.jpeg", alt: "" },
    { id: 12, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.05%20AM%20(1).jpeg", alt: "" },
    { id: 13, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.06%20AM.jpeg", alt: "" },
    { id: 14, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.06%20AM%20(2).jpeg", alt: "" },
    { id: 15, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.07%20AM.jpeg", alt: "" },
    { id: 16, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.08%20AM.jpeg", alt: "" },
    { id: 17, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.08%20AM%20(1).jpeg", alt: "" },
    { id: 18, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.09%20AM.jpeg", alt: "" },
    { id: 19, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.10%20AM.jpeg", alt: "" },
    { id: 20, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.13%20AM.jpeg", alt: "" },
    { id: 21, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.13%20AM%20(1).jpeg", alt: "" },
    { id: 22, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.14%20AM.jpeg", alt: "" },
    { id: 23, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/WhatsApp%20Image%202026-02-05%20at%2011.47.15%20AM.jpeg", alt: "" },
    { id: 24, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/image4.jpg", alt: "" },
    { id: 25, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/image5.jpg", alt: "" },
    { id: 26, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/image6.jpg", alt: "" },
    { id: 27, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/image7.jpg", alt: "" },
    { id: 27, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/image8.jpg", alt: "" },
    { id: 27, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/image10.jpg", alt: "" },
    { id: 27, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GV-gallery/image11.jpg", alt: "" }
  ];

  const [galleryId, setGalleryId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  // Set Page Title
  useEffect(() => {
    document.title = "Flivv Qatar Mega Sales Event 2025";
  }, []);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (galleryId != null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev || '';
      };
    }
  }, [galleryId]);

  // Gallery Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!galleryId) return;
      const images = allGalleryImages;
      const currentIndex = images.findIndex(img => img.id === galleryId);

      if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % images.length;
        setGalleryId(images[nextIndex].id);
      }
      if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setGalleryId(images[prevIndex].id);
      }
      if (e.key === 'Escape') setGalleryId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryId]);

  const openLightbox = (id) => setGalleryId(id);
  const closeLightbox = () => setGalleryId(null);
  const showMore = () => setVisibleCount(prev => Math.min(allGalleryImages.length, prev + 8));
  const currentImage = allGalleryImages.find(img => img.id === galleryId);

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 lg:px-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-normal text-6xl mb-6">Gallery</h2>
          {/* <p className="text-slate-600 max-w-2xl mx-auto">A curated selection of moments from our Qatar event.</p> */}
        </div>

        {/* Grid (2 rows x 4 cols initially) */}
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {allGalleryImages.slice(0, visibleCount).map((img) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.36 }}
                className="relative group cursor-pointer aspect-[4/5] overflow-hidden bg-gray-100"
                onClick={() => openLightbox(img.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(img.id); }}
                aria-label={`Open image ${img.id}`}
              >
                <img
                  src={img.src}
                  alt={img.alt || `Image ${img.id}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-serif text-sm italic translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {img.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {visibleCount < allGalleryImages.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={showMore}
              className="group flex items-center gap-3 px-8 py-3 border border-[#E509EF]/20 text-[#E509EF] rounded-full font-medium hover:bg-[#E509EF] hover:text-white transition-all duration-300"
              aria-label="Load more photos"
            >
              <span>View More Photos</span>
              <svg className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {galleryId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <div
                className="relative w-full h-full flex flex-col items-center justify-center p-4 max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-6 right-6 z-50 text-white/60 hover:text-white p-2"
                  aria-label="Close gallery"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Prev */}
                <button
                  className="absolute left-4 md:left-8 z-50 p-3 rounded-full bg-white/10 hover:bg-[#E509EF] text-white transition-all hidden md:block"
                  onClick={() => {
                    const currentIndex = allGalleryImages.findIndex(img => img.id === galleryId);
                    const prevIndex = (currentIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
                    setGalleryId(allGalleryImages[prevIndex].id);
                  }}
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Image */}
                <motion.img
                  key={galleryId}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.32 }}
                  src={currentImage?.src}
                  alt={currentImage?.alt || `Image ${galleryId}`}
                  className="max-h-[85vh] w-auto rounded shadow-2xl object-contain"
                />

                {/* Next */}
                <button
                  className="absolute right-4 md:right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-[#E509EF] text-white transition-all hidden md:block"
                  onClick={() => {
                    const currentIndex = allGalleryImages.findIndex(img => img.id === galleryId);
                    const nextIndex = (currentIndex + 1) % allGalleryImages.length;
                    setGalleryId(allGalleryImages[nextIndex].id);
                  }}
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Caption */}
                <p className="absolute bottom-8 text-white font-serif text-lg tracking-wide">
                  {currentImage?.alt}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}