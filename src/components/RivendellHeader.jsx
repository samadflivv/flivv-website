'use client';

import React, { useEffect, useRef } from 'react';

const RivendellHeader = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video plays correctly
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <section
      className="relative h-[90vh] md:h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url('/RFSherotestimg.jpg')`,
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Video Overlay */}
      <div className="absolute inset-0 z-10">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-3 0" // Adjust opacity as needed
          style={{ mixBlendMode: 'overlay' }} // Experiment with blend modes
        >
          <source src="/graintexture.mp4" type="video/mp4" />
          {/* Add additional sources for better browser compatibility if needed */}
          {/* <source src="/graintexture.webm" type="video/webm" /> */}
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10 z-0"></div>

      {/* Text Content */}
      <div className="relative z-20 h-full flex items-end justify-center">
        <h1 className="
          text-white text-center uppercase tracking-wider lg:font-[editorial]
          leading-[0.85] lg:-mb-4 -mb-1 font-serif
          text-[35px] lg:text-[135px]
        ">
          Rivendell Farms
        </h1>
      </div>
    </section>
  );
};

export default RivendellHeader;