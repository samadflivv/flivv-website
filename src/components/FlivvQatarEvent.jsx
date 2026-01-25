'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import Footer from './Footer';


// --- DATA CONSTANTS ---

const allGalleryImages = [
  { id: 1, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A6670%20(4).jpg", alt: "" },
  { id: 2, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7409.jpg", alt: "" },
  { id: 3, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A6611.jpg", alt: "" },
  { id: 4, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A6679.jpg", alt: "" },
  { id: 5, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A6686%20(1).jpg", alt: "" },
  { id: 6, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7028.jpg", alt: "" },
  { id: 7, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7038.jpg", alt: "" },
  { id: 8, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A6973.jpg", alt: "" },
  { id: 9, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7076.jpg", alt: "" },
  { id: 10, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7114.jpg", alt: "" },
  { id: 11, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7133.jpg", alt: "" },
  { id: 12, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7175.jpg", alt: "" },
  { id: 13, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7181.jpg", alt: "" },
  { id: 14, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7183.jpg", alt: "" },
  { id: 15, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7223.jpg", alt: "" },
  { id: 16, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7140.jpg", alt: "" },
  { id: 17, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7145.jpg", alt: "" },
  { id: 18, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7153.jpg", alt: "" },
  { id: 19, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7162.jpg", alt: "" },
  { id: 20, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7169.jpg", alt: "" },
  { id: 21, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7173.jpg", alt: "" },
  { id: 22, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7268.jpg", alt: "" },
  { id: 23, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7278.jpg", alt: "" },
  { id: 24, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7290.jpg", alt: "" },
  { id: 25, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7329.jpg", alt: "" },
  { id: 26, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7318.jpg", alt: "" },
  { id: 27, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7385.jpg", alt: "" },
  { id: 28, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7446.jpg", alt: "" },
  { id: 29, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7612.jpg", alt: "" },
  { id: 30, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7616.jpg", alt: "" },
  { id: 31, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A6827.jpg", alt: "" },
  { id: 32, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A6893.jpg", alt: "" },
  
];

// const scheduleDays = [
//   {
//     date: "Nov 28, 2025",
//     day: "Friday",
//     title: "1:1 Sales Session",
//     highlight: false
//   },

// ];

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 } // Increased amount for smoother viewport detection
};

const staggerChildren = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { staggerChildren: 0.15 },
  viewport: { once: true }
};

const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  transition: { duration: 0.6 },
  viewport: { once: true }
};

// --- MAIN COMPONENT ---

export default function FlivvQatarEvent() {
  const [galleryId, setGalleryId] = useState(null);
  const [isHubSpotLoading, setIsHubSpotLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  // Set Page Title
  useEffect(() => {
    document.title = "Flivv Qatar Mega Sales Event 2025";
  }, []);

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

// REPLACE your existing HubSpot useEffect with this:
// Add this useEffect (replace any other HubSpot logic if using this)
useEffect(() => {
  const embedSrc = 'https://js-na2.hsforms.net/forms/embed/21626983.js';
  if (typeof window === 'undefined') return;

  if (!document.querySelector(`script[src="${embedSrc}"]`)) {
    const s = document.createElement('script');
    s.src = embedSrc;
    s.defer = true;
    s.onload = () => setIsHubSpotLoading(false);
    s.onerror = () => {
      console.error('Failed to load HubSpot embed script');
      setIsHubSpotLoading(false);
    };
    document.body.appendChild(s);
  } else {
    // script already present
    setIsHubSpotLoading(false);
  }
}, []);




  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#8A1538] selection:text-white">
      {/* Global Styles for specific overrides */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        
        /* Removed scroll-behavior: smooth to fix scroll lag */
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        .hero-gradient {
          background: linear-gradient(135deg, #4a0418 0%, #8A1538 50%, #2b0610 100%);
        }
        
        /* HubSpot Override Styles */
        .hs-form-field { margin-bottom: 1.5rem; }
        .hs-input, .hs-select { 
          width: 100%; 
          padding: 12px; 
          border-radius: 8px; 
          border: 1px solid #e2e8f0;
          transition: border-color 0.3s;
        }
        .hs-input:focus, .hs-select:focus {
            border-color: #8A1538;
            outline: none;
            box-shadow: 0 0 0 3px rgba(138, 21, 56, 0.1);
        }
        .hs-button {
          background-color: #8A1538 !important;
          color: white !important;
          padding: 12px 32px !important;
          border-radius: 8px !important;
          font-weight: 600 !important;
          width: 100% !important;
          border: none !important;
          cursor: pointer !important;
          transition: background-color 0.3s;
        }
        .hs-button:hover { background-color: #6A102B !important; }

        /* Custom Clip Path for CTA section */
        .clip-path-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
          height: 80%; /* Only cover the top 80% of the section */
          z-index: 0;
        }

      `}</style>

      {/* ========================================
        1. HERO SECTION (Schedule is now here)
        ========================================
      */}
      <section className="relative min-h-[50vh] flex flex-col justify-center items-center pt-40 py-20 px-4 hero-gradient overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFD700] rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-[#ffffff] rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-5 leading-tight">
              Qatar Sales Trip <br/><span className="italic font-light opacity-90">2025</span>
            </h1>

            {/* <h2 className="text-4xl lg:text-6xl  font-bold text-white mb-5 leading-tight">
             Sales Meet, 2nd Jan <br/><span className="font-light opacity-90">Holiday Inn, Doha</span>
             <br/><span className="font-light text-4xl opacity-90">The Business Park | Meeting Room-2</span>
            </h2> */}
            
            {/* <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto mb-16">
              Join us for 1:1 Sales Meets in <strong className='font-bold'>Crowne Plaza Doha</strong>  - The Business Park
            </p> */}
          </motion.div>

          {/* Schedule Cards displayed as Hero Content */}
          {/* <motion.div 
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {scheduleDays.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`
                  relative rounded-2xl p-8 backdrop-blur-md border transition-all duration-300 group cursor-pointer
                  ${item.highlight 
                    ? 'bg-white/15 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-[1.02]' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'}
                `}
              >
                {item.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#D4AF37] text-[#4a0418] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Opening Day
                  </div>
                )}
                
                <div className="text-white/60 text-sm font-medium tracking-widest uppercase mb-2">{item.day}</div>
                <div className={`text-2xl md:text-3xl font-bold mb-2 ${item.highlight ? 'text-white' : 'text-white/90'}`}>
                  {item.date}
                </div>
                <div className="h-0.5 w-12 bg-white/20 mx-auto my-4 group-hover:w-24 transition-all duration-300"></div>
                <p className="text-white/80 font-medium text-lg">{item.title}</p>
                
                <div className="mt-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#registration" className="text-white text-sm border-b border-white/50 pb-0.5 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">
                    Reserve Seat &rarr;
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div> */}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
              <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto"></div>
          </motion.div>
        </div>
      </section>
   

      {/* ========================================
        2. LOCATION / VENUE SECTION (Image removed, Map placeholder added)
        ========================================
      */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto">
            
            <motion.div 
              className="lg:w-1/2"
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h4 className="text-[#8A1538] font-bold tracking-wider uppercase mb-3 text-sm">The Venue</h4>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                Crowne Plaza Doha,<br/>The Business Park
              </h2>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="bg-[#8A1538]/10 p-3 rounded-full text-[#8A1538]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Location</h3>
                    <p className="text-gray-600">Crowne Plaza Doha - The Business Park</p>
                    <p className="text-gray-500 text-sm">Airport Road, Doha, Qatar</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="bg-[#8A1538]/10 p-3 rounded-full text-[#8A1538]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Date & Time</h3>
                    <p className="text-gray-600">November 28th - 29th, 2025</p>
                    <p className="text-gray-500 text-sm">04:00 PM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            
            <motion.div 
              className="lg:w-1/2 w-full"
              variants={scaleIn}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl lg:h-[500px] bg-gray-100 border-4 border-[#8A1538]">
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <svg className="w-20 h-20 text-[#8A1538] mb-4 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">View Venue on Map</h3>
                  <p className="text-gray-600 mb-6 max-w-xs">Click below to get directions to Crowne Plaza Doha - The Business Park.</p>
                  <a 
                    href="https://www.google.com/maps/search/Crowne+Plaza+Doha+-+The+Business+Park/@25.263884,51.527357,15z" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-[#8A1538] text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-[#6A102B] transition-colors"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section> */}


   {/* ========================================
        3. THANKS / KSA SUCCESS SECTION (Now with Image)
        ========================================
      */}
      <section className="py-24 bg-[#F9FAFB] relative overflow-hidden">
        {/* Subtle patterned background */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 transform origin-top-right opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
             
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="mb-6 flex justify-start">
                <span className="w-16 h-1 bg-[#8A1538]"></span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">
                A Heartfelt <span className="text-[#8A1538]">Thank You</span>
              </h2>
              
              <div className="space-y-8 text-lg md:text-xl text-gray-600 leading-relaxed font-light text-justify">
                <p>
                  Our journey here has been nothing short of extraordinary. Arriving in a country where we initially had only a few acquaintances, we were unsure of what to expect. Yet Qatar welcomed us with warmth, consistency, and overwhelming support. Every single day we hosted, you showed up for us — and that has meant the world.
                </p>
                <p>
                  From the preparations and travel to arriving and settling in, this entire experience has been deeply meaningful. We are truly grateful to everyone who attended the main event on <strong className='font-bold'>20th November,</strong> to those who continue to support us, and to all who are becoming part of this growing family.
                </p>
                <p className="italic text-gray-500 text-base border-l-4 border-[#8A1538] pl-6 py-2 bg-gray-50 rounded-r-lg">
                  "Your encouragement strengthens our commitment to building long-lasting relationships and delivering even more value through our work."
                </p>
              </div>
            </motion.div>

            {/* Image Content */}
            <motion.div 
                variants={scaleIn}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.2 }}
                className="order-1 lg:order-2 w-full"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] group">
                <img
                  src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7175.jpg" 
                  alt="Highlights from our Saudi Arabia Event Success"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('bg-gray-400', 'flex', 'items-center', 'justify-center'); }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ========================================
        4. GALLERY SECTION
        ========================================
      */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 lg:px-20">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-bold text-5xl mb-6">
              Gallery
            </h2>
          </div>

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {allGalleryImages.slice(0, visibleCount).map((img) => (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative group cursor-pointer aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100"
                  onClick={() => setGalleryId(img.id)}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7C1332]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-serif text-lg italic translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {img.alt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* "Load More" Button - Uses allGalleryImages.length now */}
          {visibleCount < allGalleryImages.length && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setVisibleCount(prev => prev + 8)}
                className="group flex items-center gap-2 px-8 py-3 border border-[#7C1332]/30 text-[#7C1332] rounded-full font-medium hover:bg-[#7C1332] hover:text-white transition-all duration-300"
              >
                <span>View More Photos</span>
                <svg className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
          )}

          {/* Gallery Lightbox */}
          <AnimatePresence>
            {galleryId && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center"
                onClick={() => setGalleryId(null)}
              >
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4" onClick={e => e.stopPropagation()}>
                  
                  {/* Close Button */}
                  <button onClick={() => setGalleryId(null)} className="absolute top-6 right-6 z-50 text-white/50 hover:text-white p-2">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>

                  {/* Prev Button */}
                  <button className="absolute left-4 md:left-8 z-50 p-3 rounded-full bg-white/10 hover:bg-[#7C1332] text-white transition-all hidden md:block"
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentIndex = allGalleryImages.findIndex(img => img.id === galleryId);
                      const prevIndex = (currentIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
                      setGalleryId(allGalleryImages[prevIndex].id);
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                  </button>

                  {/* Image */}
                  <motion.img 
                    key={galleryId}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    src={allGalleryImages.find(img => img.id === galleryId)?.src} 
                    className="max-h-[85vh] w-auto rounded shadow-2xl object-contain"
                  />

                  {/* Next Button */}
                  <button className="absolute right-4 md:right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-[#7C1332] text-white transition-all hidden md:block"
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentIndex = allGalleryImages.findIndex(img => img.id === galleryId);
                      const nextIndex = (currentIndex + 1) % allGalleryImages.length;
                      setGalleryId(allGalleryImages[nextIndex].id);
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                  </button>
                  
                  <p className="absolute bottom-8 text-white font-serif text-xl tracking-wide">
                     {allGalleryImages.find(img => img.id === galleryId)?.alt}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>


      {/* ========================================
        5. OUR JOURNEY SECTION
        ========================================
      */}
      <section id="about" className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <motion.div
               variants={fadeInUp}
               initial="initial"
               whileInView="whileInView"
               viewport={{ once: true, amount: 0.2 }}
             >
               <h3 className="text-[#8A1538] font-bold uppercase tracking-widest mb-4">Our Legacy</h3>
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">About Flivv Developers</h2>
               <div className="w-16 h-1 bg-gray-300 mb-8"></div>
               <div className="space-y-6 text-gray-600 leading-relaxed text-lg text-justify">
                 <p>
                   With over <strong>14+ years</strong> of experience in business, Flivv has built a strong reputation for reliability and service excellence.
                 </p>
                 <p>
                   Over the past 4 years, we have successfully established a strong presence in the real estate sector, specializing in the development and marketing of open plot projects focused on long-term investment goals.
                 </p>
                 <p>
                   With <span className="text-[#8A1538] font-bold">07 projects</span> in our portfolio, we offer trustworthy companionship, backed by lifetime advisory and customer relationship management.
                 </p>
               </div>
             </motion.div>
             
             <motion.div
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, amount: 0.2 }}
               transition={{ duration: 0.8 }}
               className="relative"
             >
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#8A1538]/5 rounded-full blur-3xl -z-10"></div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4 mt-8">
                   <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-[#8A1538] hover:shadow-xl transition-shadow">
                     <div className="text-4xl font-bold text-[#8A1538] mb-2">14+</div>
                     <div className="text-gray-600 text-sm">Years of Experience</div>
                   </div>
                   <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-gray-800 hover:shadow-xl transition-shadow">
                     <div className="text-4xl font-bold text-gray-800 mb-2">07</div>
                     <div className="text-gray-600 text-sm">Projects</div>
                   </div>
                 </div>
                 <div className="space-y-4">
                   <div className="bg-[#8A1538] p-6 rounded-2xl shadow-lg text-white h-48 flex flex-col justify-end hover:shadow-xl transition-shadow">
                     <div className="text-2xl font-serif font-bold mb-2">Trust & Excellence</div>
                   </div>
                 </div>
               </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
        6. CTA / REGISTRATION SECTION
        ========================================
      */}
      <section id="registration" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[#8A1538] clip-path-diagonal"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-gray-900 p-8 lg:p-12 text-white flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl lg:text-4xl font-serif font-bold mb-6">Get in touch with us</h3>
                  <img className='w-full rounded-xl' src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7318.jpg" alt="" />
                </div>
            </div>

            <div className="md:w-1/2 p-8 md:p-12 bg-white">
                
<div id="hubspot-embed-root">
  <div
    className="hs-form-frame"
    data-region="na2"
    data-form-id="d3b56077-11fe-485c-98cd-677027236164"
    data-portal-id="21626983"
  ></div>
</div>

            </div>

          </div>
        </div>
      </section>

    <Footer/>
    </div>
  );
}