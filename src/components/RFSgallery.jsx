"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const RFSgallery = ({ rows }) => {
  const [lightbox, setLightbox] = useState({ open: false, src: '' });

  const openLightbox = (src) => {
    setLightbox({ open: true, src });
  };

  const closeLightbox = (e) => {
    if (e) e.stopPropagation();
    setLightbox({ open: false, src: '' });
  };

  // Sample data if no rows are provided
  const sampleRows = [
    [
      '/RFSbg.jpg',
      '/dream-home.jpg',
      '/poster.jpg',
      '/aboutmain.jpg',
      '/gallery5.jpg',
      '/gallery6.jpg',
    ],
    [
      '/RFSbg.jpg',
      '/dream-home.jpg',
      '/poster.jpg',
      '/aboutmain.jpg',
      '/gallery5.jpg',
      '/gallery6.jpg',
    ],
    [
      '/RFSbg.jpg',
      '/dream-home.jpg',
      '/poster.jpg',
      '/aboutmain.jpg',
      '/gallery5.jpg',
      '/gallery6.jpg',
    ]
  ];

  const galleryRows = rows || sampleRows;

  return (
    <section className="relative w-full py-16 overflow-hidden bg-white">
      
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-6xl font-normal text-black mb-4">Our Gallery</h2>
      </div>

      <div>
        {galleryRows.map((images, rowIndex) => (
          <div key={rowIndex} className="relative w-full overflow-x-hidden py-4">
           

            <motion.div
  className="flex gap-8 px-4"
  animate={{
    x: rowIndex % 2 === 0 ? ["0%", "-100%"] : ["-100%", "0%"], 
  }}
  transition={{
    duration: rowIndex % 2 === 0 ? 60 : 70,
    ease: "linear",
    repeat: Infinity,
  }}
>
  {[...images, ...images].map((src, i) => (
    <motion.div
      key={i}
      className="relative group cursor-pointer flex-shrink-0"
      onClick={() => openLightbox(src)}
    >
      <div className="w-96 h-64 rounded-xl shadow-lg overflow-hidden">
        <img
            src={src}
            alt={`Gallery image ${i + 1}`}
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center pointer-events-none">
          <span className="text-white font-medium text-lg">View</span>
        </div>
      </motion.div>
    ))}
  </motion.div>

            </div>
          ))}
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
          >
            <X className="w-8 h-8 text-white" />
          </button>
          <motion.div 
            className="relative max-w-5xl max-h-[85vh] w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt="Lightbox preview"
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default RFSgallery;