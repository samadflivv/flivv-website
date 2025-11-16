'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GVLocationMapSection() {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Shared content (title, copy, button)
  const TextContent = () => (
    <div className="w-full">
      <h2 className="text-4xl sm:text-6xl font-normal sm:leading-16 text-gray-900 mb-4 text-left">
        Discover Home Away From Home at Shadnagar
      </h2>
      <p className="text-gray-600 text-lg mb-6 text-justify">
        Located in Nagulapalli, Shadnagar -- Gulmohar Villas is an ideal investment choice for those who are seeking beneficial open plot investments.
      </p>
      <div className="flex justify-start lg:justify-start">
        <a
          href="#GVcontact"
          className="inline-flex gap-2 bg-black text-white text-lg px-8 py-3 rounded-full"
        >
          Get Connected →
        </a>
      </div>
    </div>
  );

  return (
    <section className="w-full py-30 px-4 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Text side */}
        {isMobile ? (
          <TextContent />
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <TextContent />
          </motion.div>
        )}

        {/* Map side */}
        <div className="relative w-full lg:w-1/2 h-[400px] rounded-xl overflow-hidden shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.534606054884!2d78.20668971944175!3d17.10648153178975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbc9001a2afd3f%3A0x2a18974c072db71!2sGulmohar%20Villas%20Flivv%20Developers!5e1!3m2!1sen!2sin!4v1751550537416!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="rounded-xl border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Only animate pin on desktop */}
          {isMobile ? null : (
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}