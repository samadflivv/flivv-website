'use client';

import React, { useEffect, useRef, useState } from 'react';

const RivendellHeader = () => {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay prevented:", error);
      });
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // detect iOS (iPhone / iPad / iPod)
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent || navigator.vendor || '' : '';
    const ios = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    setIsIOS(ios);

    // Initial check
    checkMobile();

    // Add event listener for resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // base style that applies generally; we'll override small pieces for iOS
  const baseBackgroundStyle = {
    backgroundImage: `url('/RFSherotestimg.jpg')`,
    backgroundAttachment: isMobile ? 'fixed' : 'fixed', // preserved for non-iOS behavior
    backgroundSize: isMobile ? 'cover' : 'cover',
    backgroundColor: '#000',
  };

  // iOS-specific overrides: avoid fixed attachment and use contain so full image is visible
  const iosOverrides = {
    backgroundAttachment: 'scroll',      // don't use fixed on iOS
    backgroundSize: 'cover',          // show whole image without heavy crop
    backgroundPosition: 'center top',   // keep image aligned nicely
    backgroundRepeat: 'no-repeat',
  };

  const finalBackgroundStyle = isIOS
    ? { ...baseBackgroundStyle, ...iosOverrides }
    : baseBackgroundStyle;

  return (
    <section
      className="relative h-[90vh] md:h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden"
      style={finalBackgroundStyle}
    >
      {/* Video Overlay */}
      <div className="absolute inset-0 z-10">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
          style={{ mixBlendMode: 'overlay' }}
        >
          <source src="/graintexture.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay - Adjust opacity for mobile */}
      <div className={`absolute inset-0 z-0 ${isMobile ? 'bg-black/20' : 'bg-black/10'}`}></div>

      {/* Text Content */}
      <div className="relative z-20 h-full flex items-end justify-center md:pb-0">
        <h1 className="
          text-white text-center uppercase tracking-wider 
          leading-[0.85] font-serif
          text-[35px] md:text-[80px] lg:text-[135px]
          px-4 md:px-0
          lg:-mb-3 -mb-1
        ">
          Rivendell Farms
        </h1>
      </div>

      {/* Mobile-specific styling to ensure full image visibility */}
      {isMobile && (
        <style jsx>{`
          section {
            background-position: center top;
            background-repeat: no-repeat;
          }
        `}</style>
      )}
    </section>
  );
};

export default RivendellHeader;
