// components/ScrollVideo.jsx
'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ScrollVideoSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize GSAP and set up mobile detection
  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Setup scroll animation when video is loaded
  useEffect(() => {
    if (!videoRef.current || !containerRef.current || !isLoaded) return;
    
    const video = videoRef.current;
    const container = containerRef.current;
    
    // Create scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=100%",
        scrub: 0.2,
        pin: true,
        anticipatePin: 1,
        markers: false,
        onUpdate: self => {
          // Update video playback based on scroll progress
          const progress = self.progress;
          video.currentTime = video.duration * progress;
          
          // Update progress bar
          if (progressRef.current) {
            progressRef.current.style.width = `${progress * 100}%`;
          }
        }
      }
    });
    
    tl.to(video, { 
      currentTime: video.duration,
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoaded]);

  // Handle touch devices
  useEffect(() => {
    if (!videoRef.current) return;
    
    const isTouchDevice = () => {
      return ('ontouchstart' in window) || 
             (navigator.maxTouchPoints > 0) || 
             (navigator.msMaxTouchPoints > 0);
    };
    
    if (isTouchDevice()) {
      videoRef.current.play().then(() => {
        videoRef.current.pause();
      }).catch(e => {
        console.log("Touch device play/pause handling:", e);
      });
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-black relative">
      {/* Scroll progress indicator */}
      <div className="fixed top-16 left-0 right-0 h-1 z-50 bg-gray-700">
        <div 
          ref={progressRef}
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: '0%' }}
        />
      </div>
      
      {/* Video container */}
      <div 
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            ref={videoRef}
            className={`${isMobile ? 'h-full w-auto' : 'w-full h-auto'} max-w-none object-cover`}
            playsInline
            muted
            preload="auto"
            onLoadedMetadata={() => setIsLoaded(true)}
            onError={(e) => console.error("Video loading error", e)}
          >
            {/* Replace with your actual video URL */}
            <source src="/drone.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          
        </div>
        
        {/* Scroll hint */}
        {isLoaded && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <p className="mb-2 text-sm">Scroll to play video</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity
              }}
            >
              <svg 
                className="w-6 h-6 mx-auto" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </div>
      
      {/* Dummy content to enable scrolling */}
      <div className="relative top-[100vh] h-[700vh]"></div>
      
      {/* Gallery section */}
      <div className="relative top-[600vh] min-h-screen bg-gradient-to-b from-black to-gray-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <motion.div 
                key={i}
                className="aspect-square overflow-hidden rounded-xl group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-full h-full bg-gray-800 rounded-xl flex items-center justify-center">
                  <div className="text-gray-500 text-sm">Project {i+1}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <motion.button 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg text-lg transition-all duration-300"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              View All Projects
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollVideoSection;