'use client';

import React, { useEffect, useRef } from 'react';

const RivendellHeader = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden">
      {/* Sticky Background Wrapper */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url('/RFSherotestimg.jpg')`,
            position: 'sticky',
            top: 0,
          }}
        ></div>
      </div>

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

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 md:bg-black/10 z-0"></div>

      {/* Text Content */}
      <div className="relative z-20 h-full flex items-end justify-center px-2">
        <h1
          className="
            text-white text-center uppercase tracking-wider lg:font-[editorial]
            leading-[0.95] lg:leading-[0.85]
            lg:-mb-3 -mb-1.5 font-serif
            text-[36px] lg:text-[135px]
          "
        >
          Rivendell Farms
        </h1>
      </div>
    </section>
  );
};

export default RivendellHeader;
