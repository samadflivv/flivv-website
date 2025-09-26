// components/HeroCtaWithVideo.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const RFSalesmeetcta = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const videoRef = useRef(null);
  
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.45, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }
    }
  };

  const videoVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };


  // place this inside the component (near other useEffect hooks)
useEffect(() => {
  const vid = videoRef.current;
  if (!vid) return;

  // required for autoplay policy
  vid.muted = true;
  vid.loop = true;
  vid.playsInline = true;
  vid.preload = "auto";

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // try to play when visible
          vid.play().catch(() => {
            // ignore play errors (autoplay policy etc.)
          });
        } else {
          // pause when out of view
          try { vid.pause(); } catch (e) {}
        }
      });
    },
    { threshold: 0.5 } // adjust how much must be visible to start
  );

  observer.observe(vid);

  return () => {
    observer.disconnect();
  };
}, []);


  return (
    <section className="relative overflow-hidden bg-white py-20 px-6 lg:px-12">
      {/* Main Container Box */}
      <motion.div 
        ref={containerRef}
        className="max-w-7xl mx-auto bg-[#081C15] rounded-3xl shadow-2xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Inner Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[600px]">
          
          {/* Left Column - Content */}
          <motion.div 
            className="lg:col-span-7 col-span-1 p-8 lg:p-12"
            variants={containerVariants}
          >
            {/* Optional Badge */}
            <motion.div variants={itemVariants} className="inline-block mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#74C69D]/20 text-[#74C69D] border border-green-500/30">
                Premium Farmland Project
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white"
            >
              Rivendell <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B7E4C7] to-[#40916C]">Farms</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg text-gray-300 max-w-xl leading-relaxed"
            >
              Be part of our biggest celebration yet at Rivendell Farms. Secure your unit amid lush, green, and serene countryside landscapes.
              <b> Only 25 units left!</b>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <motion.a
  href="#rfsctaform"  
  whileHover={{ 
    scale: shouldReduceMotion ? 1 : 1.03,
    backgroundColor: "#D8F3DC"
  }}
  whileTap={{ scale: 0.98 }}
  className="z-10 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#B7E4C7] text-black hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
>
  <span className="font-semibold">Book Your Visit Now ⚡</span>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
</motion.a>
              
            </motion.div>
            
{/* Date Section */}
<motion.div
  variants={itemVariants}
  className="mt-12 flex justify-center pt-8 border-t border-green-500/20"
>
  <h1 className="text-4xl sm:text-5xl font-extrabold text-[#D8F3DC] text-center animate-pulse">
    28<sup className="align-top text-3xl sm:text-5xl">th</sup> September, Sunday
  </h1>
</motion.div>

          </motion.div>

          {/* Right Column - Video */}
          <motion.div 
  className="lg:col-span-5 col-span-1 h-full"
  variants={videoVariants}
>
  <div className="relative h-full min-h-[400px] lg:min-h-[600px] bg-gradient-to-br from-green-900/50 to-teal-900/30">
    
    {/* Video Container */}
    <div className="absolute inset-4 lg:inset-8 rounded-2xl overflow-hidden bg-black/40">
      
      {/* Video Placeholder - direct autoplay loop when visible */}
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Video Player (muted, loop, playsInline, no controls, no poster) */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Rivendell%20Farms%20offers%20the%20perfect%20blend%20of%20investment%20and%20lifestyle.%20With%20thoughtfully%20designed.mp4" type="video/mp4" />
          <source src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Rivendell%20Farms%20offers%20the%20perfect%20blend%20of%20investment%20and%20lifestyle.%20With%20thoughtfully%20designed.mp4" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-1 -left-1 w-20 h-20 border-t-2 border-l-2 border-green-400/50 rounded-tl-2xl"></div>
      <div className="absolute -bottom-1 -right-1 w-20 h-20 border-b-2 border-r-2 border-teal-400/50 rounded-br-2xl"></div>
    </div>

    {/* Floating Elements */}
    <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
    <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-teal-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
  </div>
</motion.div>

        </div>

        {/* Background Pattern for the Box */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Green Glow Effect */}
        <div 
          ref={glowRef}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-32"
          style={{
            background: `radial-gradient(ellipse at center, rgba(16, 185, 129, 0.4) 0%, transparent 70%)`,
            opacity: shouldReduceMotion ? 0.2 : 0.3,
            animation: shouldReduceMotion ? 'none' : 'pulse-glow 6s ease-in-out infinite'
          }}
        />
      </motion.div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default RFSalesmeetcta;