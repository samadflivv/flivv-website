'use client';

import { useEffect, useRef } from 'react';

export default function Herosection() {
  const SRC =
    'https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Video%20Project%201.mp4';

  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);

  // Play with audio on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // ✅ React's `muted` JSX prop is buggy — set it via DOM ref
    // otherwise the browser sees it as unmuted and blocks autoplay entirely
    video.muted = true;

    video.play()
      .then(() => {
        // Playing (muted) — unmute immediately for audio
        video.muted = true;
        video.volume = 1;
      })
      .catch(() => {
        // Browser still blocked — video stays muted/silent
      });
  }, []);

  // Pause when scrolled out, resume when back in view
  useEffect(() => {
    const wrapper = videoWrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="ATvideo" className="relative w-full overflow-hidden bg-black">
      <div ref={videoWrapperRef} className="relative w-full h-[50vh] sm:h-screen">
        <video
          ref={videoRef}
          src={SRC}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          playsInline
          preload="auto"
        />
      </div>
    </section>
  );
}