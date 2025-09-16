'use client';

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RFSForm from "./RFSForm";

gsap.registerPlugin(ScrollTrigger);

const RFSlocationAndform = () => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Proper map src
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4110.256960828125!2d78.22177332680171!3d16.694725037444236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bca39a7a2eab109%3A0x61b450d51b1dcc9d!2sRivendell%20Farms!5e1!3m2!1sen!2sin!4v1755085626351!5m2!1sen!2sin";

  // GSAP parallax with optimized ScrollTrigger
  useEffect(() => {
    if (!containerRef.current || !mapRef.current) return;

    const ctx = gsap.context(() => {
      // Create a more optimized animation
      const animation = gsap.to(mapRef.current, {
        scale: 2,
        ease: "none",
        transformOrigin: "center center",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5, // Reduced scrub value for smoother scrolling
          markers: false,
          id: "map-parallax", // Add ID for easier management
        },
      });

      // Refresh ScrollTrigger after a short delay to ensure proper calculations
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, containerRef);

    // Cleanup function
    return () => {
      ctx.revert();
      // Specifically kill the map parallax trigger
      ScrollTrigger.getById("map-parallax")?.kill();
    };
  }, []);

  // Handle scroll events to prevent conflicts
  useEffect(() => {
    const handleWheel = (e) => {
      // If we're in the map section and ScrollTrigger is active,
      // allow normal scrolling behavior
      if (containerRef.current && ScrollTrigger.isScrolling) {
        // Let the scroll happen naturally
        return;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Load HubSpot form script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/21626983.js";
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) document.head.removeChild(script);
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#081C15] flex flex-col lg:flex-row gap-10 lg:gap-0 pb-10 lg:pb-0">
      {/* Left Column - Google Maps (50% on desktop) */}
      <div className="w-full lg:w-[50%] h-[50vh] lg:h-screen relative overflow-hidden">
        <div ref={mapRef} className="w-full h-full relative transform-gpu will-change-transform">
          {!isMapLoaded && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center z-20">
              <div className="animate-pulse text-white text-center">
                <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p>Loading Rivendell Farms Map</p>
              </div>
            </div>
          )}

          <iframe
            src={mapUrl}
            title="Rivendell Farms Map"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsMapLoaded(true)}
          />
        </div>
      </div>

      {/* Right Column - HubSpot Form (50% on desktop) */}
       <div className="w-full lg:w-[50%] flex items-center justify-center p-4 lg:p-10 relative"> 
          <div className="w-full lg:w-full shadow-xl rounded-2xl" id="rfsctaform">
            <RFSForm/>
          </div>
      </div>
    </div>
  );
};

export default RFSlocationAndform;
