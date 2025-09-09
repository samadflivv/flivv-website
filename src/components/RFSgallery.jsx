"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const RFSgallery = ({ rows }) => {
  const [lightbox, setLightbox] = useState({ open: false, src: "" });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openLightbox = (src) => setLightbox({ open: true, src });
  const closeLightbox = (e) => {
    if (e) e.stopPropagation();
    setLightbox({ open: false, src: "" });
  };

  // Sample rows
  const sampleRows = [
    ["/RFSbg.jpg", "/dream-home.jpg", "/poster.jpg", "/aboutmain.jpg", "/gallery5.jpg", "/gallery6.jpg"],
    ["/RFSbg.jpg", "/dream-home.jpg", "/poster.jpg", "/aboutmain.jpg", "/gallery5.jpg", "/gallery6.jpg"],
    ["/RFSbg.jpg", "/dream-home.jpg", "/poster.jpg", "/aboutmain.jpg", "/gallery5.jpg", "/gallery6.jpg"],
  ];
  const galleryRows = rows && rows.length ? rows : sampleRows;

  // Mobile auto-scroll refs
  const mobileContainers = useRef([]);
  const rafIds = useRef([]);
  const lastTimestamps = useRef([]);

  // Mobile speed (px per second) — tweak this value for faster/slower motion
  const MOBILE_SPEED_PX_PER_SEC = 50;

  // Start RAF auto-scroll for mobile (always runs — does NOT pause on touch)
  useEffect(() => {
    // cleanup any existing RAFs
    rafIds.current.forEach((id) => id && cancelAnimationFrame(id));
    rafIds.current = [];
    lastTimestamps.current = [];

    if (!isMobile) return;

    galleryRows.forEach((_, rowIndex) => {
      lastTimestamps.current[rowIndex] = 0;

      const step = (ts) => {
        const container = mobileContainers.current[rowIndex];
        if (!container) {
          rafIds.current[rowIndex] = requestAnimationFrame(step);
          return;
        }

        // Performance hints (set once)
        if (!container._rfs_initialized) {
          container._rfs_initialized = true;
          container.style.webkitOverflowScrolling = "touch";
          container.style.scrollBehavior = "auto";
          container.style.overflowAnchor = "none";
          container.style.willChange = "scroll-position, transform";
          container.style.scrollSnapType = "none";
        }

        if (!lastTimestamps.current[rowIndex]) lastTimestamps.current[rowIndex] = ts;
        const dt = (ts - lastTimestamps.current[rowIndex]) / 1000;
        lastTimestamps.current[rowIndex] = ts;

        // direction multiplier:
        // - For second row (index 1) we want left->right animation (scrollLeft should decrease),
        //   so use dir = -1. For other rows dir = +1.
        const dir = rowIndex === 1 ? -1 : 1;

        // Always advance scroll (do not pause on touch). Use fractional delta for smoothness.
        const delta = MOBILE_SPEED_PX_PER_SEC * dt * dir;
        container.scrollLeft += delta;

        // Seamless reset when scrolled past half (since items duplicated)
        const half = container.scrollWidth / 2;
        if (dir === 1) {
          if (container.scrollLeft >= half) {
            container.scrollLeft -= half;
          }
        } else {
          // dir === -1
          if (container.scrollLeft <= 0) {
            container.scrollLeft += half;
          }
        }

        rafIds.current[rowIndex] = requestAnimationFrame(step);
      };

      rafIds.current[rowIndex] = requestAnimationFrame(step);
    });

    return () => {
      rafIds.current.forEach((id) => id && cancelAnimationFrame(id));
      rafIds.current = [];
      lastTimestamps.current = [];
    };
    // rerun when switching between mobile/desktop or rows change
  }, [isMobile, galleryRows.length]);

  // render image item helper
  const renderItem = (src, i, mobileMode) => (
    <div key={`${src}-${i}`} className="relative group cursor-pointer flex-shrink-0">
      <div
        onClick={() => openLightbox(src)}
        className={mobileMode ? "w-52 h-36 rounded-xl lg:shadow-lg overflow-hidden" : "w-60 h-40 lg:w-96 lg:h-64 rounded-xl shadow-lg overflow-hidden"}
      >
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
          draggable={false}
        />
      </div>
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center pointer-events-none">
        <span className="text-white font-medium text-lg">View</span>
      </div>
    </div>
  );

  return (
    <section className="relative w-full py-16 overflow-hidden bg-white">
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl md:text-6xl font-normal text-black mb-4">Our Gallery</h2>
      </div>

      <div>
        {galleryRows.map((images, rowIndex) => {
          const doubled = [...images, ...images];

          if (isMobile) {
            // MOBILE: native scroll container; RAF always increments scrollLeft (auto-loop never stops).
            // second row (index 1) will be handled by RAF direction = -1
            return (
              <div key={rowIndex} className="relative w-full overflow-hidden py-4">
                <div
                  className="flex gap-4 px-4 overflow-x-auto touch-pan-x rfs-mobile-track"
                  ref={(el) => (mobileContainers.current[rowIndex] = el)}
                  style={{
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    paddingBottom: 2,
                  }}
                >
                  {doubled.map((src, i) => (
                    <div key={i} className="flex-shrink-0 mr-4">
                      {renderItem(src, i, true)}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          // DESKTOP: unchanged framer-motion auto-loop (you asked not to modify desktop)
          return (
            <div key={rowIndex} className="relative w-full overflow-hidden py-4">
              <motion.div
                className="flex gap-8 px-4"
                animate={{
                  x: rowIndex % 2 === 0 ? ["0%", "-100%"] : ["-100%", "0%"],
                }}
                transition={{
                  duration: rowIndex % 2 === 0 ? 40 : 50,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {doubled.map((src, i) => (
                  <div key={i} className="relative group cursor-pointer flex-shrink-0">
                    <div className="w-60 h-40 lg:w-96 lg:h-64 rounded-xl shadow-lg overflow-hidden" onClick={() => openLightbox(src)}>
                      <img
                        src={src}
                        alt={`Gallery image ${i + 1}`}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
                        draggable={false}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center pointer-events-none">
                      <span className="text-white font-medium text-lg">View</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <motion.div
          className="fixed inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/40 transition z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8 text-white" />
          </button>

          <motion.div
            className="relative max-w-5xl max-h-[85vh] w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.28 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <img src={lightbox.src} alt="Lightbox preview" className="w-full h-full object-contain rounded-lg shadow-2xl" />
          </motion.div>
        </motion.div>
      )}

      <style jsx>{`
        /* Hide mobile scrollbar nicely */
        .rfs-mobile-track::-webkit-scrollbar {
          display: none;
        }
        .rfs-mobile-track {
          -ms-overflow-style: none;
          scrollbar-width: none;
          /* make sure the inner track doesn't reflow while RAF adjusts scrollLeft */
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default RFSgallery;
