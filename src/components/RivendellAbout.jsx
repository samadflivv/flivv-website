'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RivendellAbout = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Ensure hidden at load
    gsap.set(".reveal-text p", { backgroundPositionY: "100%", force3D: true });

    const isMobile = window.innerWidth < 768;

    // Create a context for proper cleanup
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: Simple reveal from top to bottom without unrevealing
        gsap.to(".reveal-text p", {
          backgroundPositionY: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "top 20%",
            scrub: 4.5,
            markers: false,
            id: "rivendell-about-mobile" // Add ID for proper cleanup
          }
        });
      } else {
        // Desktop: keep existing behavior
        gsap.to(".reveal-text p", {
          backgroundPositionY: "0%",
          ease: "none",
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
            markers: false,
            id: "rivendell-about-desktop" // Add ID for proper cleanup
          }
        });
      }
    }, containerRef);

    // Debounced refresh on resize/orientation
    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
    };
    
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    return () => {
      // Proper cleanup
      ctx.revert();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      
      // Only kill ScrollTriggers created by this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.id && trigger.id.includes('rivendell-about')) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white overflow-x-hidden flex items-center justify-left relative lg:my-20 lg:px-[10%] px-4"
    >
      <div className="reveal-text relative w-full max-w-6xl">
        <p
          ref={textRef}
          className="text-black-reveal text-2xl md:text-3xl lg:text-5xl font-normal leading-normal"
        >
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

          /* reduce flicker / force compositor on mobile */
          will-change: background-position;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transform: translateZ(0);
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