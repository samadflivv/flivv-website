"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RFSlocationAndform = () => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const formRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Proper map src
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4110.256960828125!2d78.22177332680171!3d16.694725037444236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bca39a7a2eab109%3A0x61b450d51b1dcc9d!2sRivendell%20Farms!5e1!3m2!1sen!2sin!4v1755085626351!5m2!1sen!2sin";

  // GSAP parallax (scoped)
  useEffect(() => {
    if (!containerRef.current || !mapRef.current) return;

    // Use gsap.context to scope selectors and animations to this component
    const ctx = gsap.context(() => {
      // Animate map scale based on scroll progress (no pin)
      gsap.to(mapRef.current, {
        scale: 1.5,
        ease: "none",
        transformOrigin: "center center",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",   // when top of section hits bottom of viewport
          end: "bottom top",     // when bottom of section hits top of viewport
          scrub: 0.8,            // smooth scrubbed animation
          // no pin -> no sticky behaviour
          markers: false,
        },
      });
    }, containerRef); // scope to containerRef

    // cleanup only this context (reverts animations & ScrollTriggers created in context)
    return () => {
      ctx.revert();
    };
  }, []);

  // Load HubSpot form script once (keeps unchanged)
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
    <div ref={containerRef} className="min-h-screen bg-[#081C15] flex flex-col lg:flex-row">
      {/* Left Column - Google Maps (50% on desktop) */}
      <div className="w-full lg:w-[50%] h-[50vh] lg:h-screen relative overflow-hidden">
        <div ref={mapRef} className="w-full h-full relative transform-gpu">
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
       <div className="w-full lg:w-[50%] h-[50vh] lg:h-screen flex items-center justify-center p-4 lg:p-10 relative"> 
      <div ref={formRef} className="relative bg-[#D8F3DC] rounded-xl w-full z-10 shadow-xl/30 shadow-[#D8F3DC]" > 
      <div className="text-center"> <h2 className="text-5xl font-normal text-gray-800 pt-10">Visit Rivendell Farms</h2> </div> 
      {/* HubSpot form */} 
      <div className="hs-form-frame" 
      data-region="na1" 
      data-form-id="fe48d8bb-c0aa-41d3-8f45-a54c78e57d79" 
      data-portal-id="21626983" >
      </div> 
      </div> 
      </div>
    </div>
  );
};

export default RFSlocationAndform;
