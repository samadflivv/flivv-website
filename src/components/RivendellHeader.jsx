// 'use client';

// import React, { useEffect, useRef, useState } from 'react';

// const RivendellHeader = () => {
//   const videoRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isIOS, setIsIOS] = useState(false);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.play().catch(error => {
//         console.log("Video autoplay prevented:", error);
//       });
//     }

//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     // detect iOS (iPhone / iPad / iPod)
//     const ua = typeof navigator !== 'undefined' ? navigator.userAgent || navigator.vendor || '' : '';
//     const ios = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
//     setIsIOS(ios);

//     // Initial check
//     checkMobile();

//     // Add event listener for resize
//     window.addEventListener('resize', checkMobile);

//     // Cleanup
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // base style that applies generally; we'll override small pieces for iOS
//   const baseBackgroundStyle = {
//     backgroundImage: `url('/RFSherotestimg.jpg')`,
//     backgroundAttachment: isMobile ? 'fixed' : 'fixed', // preserved for non-iOS behavior
//     backgroundSize: isMobile ? 'cover' : 'cover',
//     backgroundColor: '#000',
//   };

//   // iOS-specific overrides: avoid fixed attachment and use contain so full image is visible
//   const iosOverrides = {
//     backgroundAttachment: 'scroll',      // don't use fixed on iOS
//     backgroundSize: 'cover',          // show whole image without heavy crop
//     backgroundPosition: 'center top',   // keep image aligned nicely
//     backgroundRepeat: 'no-repeat',
//   };

//   const finalBackgroundStyle = isIOS
//     ? { ...baseBackgroundStyle, ...iosOverrides }
//     : baseBackgroundStyle;

//   return (
//     <section
//       className="relative h-[90vh] md:h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden"
//       style={finalBackgroundStyle}
//     >
//       {/* Video Overlay */}
//       <div className="absolute inset-0 z-10">
//         <video
//           ref={videoRef}
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="w-full h-full object-cover opacity-30"
//           style={{ mixBlendMode: 'overlay' }}
//         >
//           <source src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/rfsfountainandrain.mp4" type="video/mp4" />
//         </video>
//       </div>

//       {/* Dark Overlay - Adjust opacity for mobile */}
//       <div className={`absolute inset-0 z-0 ${isMobile ? 'bg-black/20' : 'bg-black/10'}`}></div>

//       {/* Text Content */}
//       <div className="relative z-20 h-full flex items-end justify-center md:pb-0">
//         <h1 className="
//           text-white text-center uppercase tracking-wider 
//           leading-[0.85] font-serif
//           text-[35px] md:text-[80px] lg:text-[135px]
//           px-4 md:px-0
//           lg:-mb-3 -mb-1
//         ">
//           Rivendell Farms
//         </h1>
//       </div>

//       {/* Mobile-specific styling to ensure full image visibility */}
//       {isMobile && (
//         <style jsx>{`
//           section {
//             background-position: center top;
//             background-repeat: no-repeat;
//           }
//         `}</style>
//       )}
//     </section>
//   );
// };

// export default RivendellHeader;



'use client';

import React, { useEffect, useRef, useState } from 'react';

const RivendellHeader = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isVideoFixed, setIsVideoFixed] = useState(false);

  useEffect(() => {
    // Basic mobile detection
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // iOS detection
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent || navigator.vendor || '' : '';
    const ios = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    setIsIOS(ios);

    // Try autoplay (muted required)
    const tryPlay = async () => {
      if (!videoRef.current) return;
      try {
        videoRef.current.muted = true;
        await videoRef.current.play();
      } catch (err) {
        // ignore autoplay errors
      }
    };
    tryPlay();

    // Sticky emulation for non-iOS using IntersectionObserver
    const el = sectionRef.current;
    if (el && !ios) {
      const io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          const rect = entry.boundingClientRect;
          const shouldFix = rect.top <= 0 && rect.bottom > 0;
          setIsVideoFixed(Boolean(shouldFix));
        },
        { threshold: [0, 1] }
      );
      io.observe(el);
      return () => {
        io.disconnect();
        window.removeEventListener('resize', checkMobile);
      };
    } else {
      // iOS: just clean up the resize listener
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[90vh] md:h-screen w-full overflow-hidden"
      aria-label="Rivendell Farms hero"
      // create a stacking context on iOS so we can safely place the video behind with negative z-index
      style={isIOS ? { isolation: 'isolate' } : undefined}
    >
      {/*
        Video wrapper rules:
        - Non-iOS: fixed while section in view (isVideoFixed true). Keeps existing behaviour.
        - iOS: absolute positioned inside the section, placed behind content using negative z-index.
      */}
      <div
        className={
          !isIOS
            ? isVideoFixed
              ? 'fixed inset-0 w-full h-screen z-0'
              : 'relative w-full h-full'
            : 'absolute inset-0 w-full h-full'
        }
        // clickable text overlay must remain interactive, so prevent the wrapper from capturing pointer events
        style={isIOS ? { zIndex: -1 } : { pointerEvents: 'none' }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/rfsfountainandrain.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          draggable={false}
          // don't apply transforms to the video itself on iOS (we rely on negative z-index)
          style={
            isIOS
              ? {
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: -1,
                }
              : undefined
          }
        />
      </div>

      {/* Overlay: keep above video and below text */}
      <div
        className={`absolute inset-0 z-10 ${isMobile ? 'bg-black/50' : 'bg-black/50'} rfs-hero-overlay`}
        style={{
          // ensure overlay is a real layer
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          pointerEvents: 'none',
        }}
      />

      {/* Text Content - mobile centered, desktop unchanged */}
      <div
        className={`relative z-20 h-full flex ${isMobile ? 'items-center' : 'items-end'} justify-center md:pb-0 rfs-hero-text`}
        style={{
          pointerEvents: 'auto',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      >
        <h1
          className="
            text-white text-center uppercase tracking-wider 
            leading-[0.85] font-serif
            text-[55px] md:text-[80px] lg:text-[125px]
            px-4 md:px-0
            lg:-mb-3 -mb-1
          "
        >
          Rivendell Farms
        </h1>
      </div>

      {/* Mobile-specific CSS for crop/position */}
      {isMobile && (
        <style jsx>{`
          video { object-position: center top; }
        `}</style>
      )}
    </section>
  );
};

export default RivendellHeader;




