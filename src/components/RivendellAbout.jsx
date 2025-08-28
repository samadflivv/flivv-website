'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const RivendellAbout = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Set up the vertical scroll animation
    gsap.to(".reveal-text p", {
      backgroundPositionY: "0%",
      stagger: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        markers: false,
      }
    });

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen bg-white overflow-x-hidden flex items-center justify-left relative my-20 px-[10%]">
      {/* Text reveal section */}
      <div className="reveal-text relative w-full max-w-6xl">
        <p ref={textRef} className="text-black-reveal text-2xl md:text-3xl lg:text-5xl font-normal leading-normal">
          Rivendell Farms is an exclusive farmland project by Flivv Developers located in Jadcherla, 
          at Thimmajipet, 4 kilometers away from Thimmajipet Police Station, Nagarkurnool district highway. 
          Immerse yourself in the tranquil beauty of nature and lush landscapes while also getting the 
          pleasure of organic farming right from your very own property at your doorstep. This project 
          spans 15 acres of open farmland. It consists of 109 plots, each plot measuring 3 Guntas 
          (equivalent to 363 Square Yards).
        </p>
      </div>

      <style jsx global>{`
        .text-black-reveal {
          background: linear-gradient(
            to bottom,
            #1b4332 50%,
            #adb5bd 50%
          );
          background-size: 100% 200%;
          background-position-y: 100%;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          padding: 20px;
          line-height: 1.4;
        }
        
        @media (max-width: 768px) {
          .text-black-reveal {
            font-size: 1.5rem;
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default RivendellAbout;