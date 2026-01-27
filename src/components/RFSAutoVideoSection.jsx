'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function RFSAutoVideoSection() {
  // 🔒 hardcoded config (as requested)
  const SRC =
    'https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/RFS/0127(2).mp4';
  const SECTION_ID = 'ATvideo';
  const HEIGHT_CLASS = 'h-[50vh] sm:h-screen';

  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const videoRetryRef = useRef(0);

  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // 👀 Observe viewport
useEffect(() => {
  const wrapper = videoWrapperRef.current;
  if (!wrapper) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          // 👀 section visible → load once & resume playback
          setShouldLoadVideo(true);

          // resume if already loaded
          video.play().catch(() => {});
        } else {
          // 🚪 section out of view → pause (keep currentTime)
          if (!video.paused) {
            video.pause();
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(wrapper);
  return () => observer.disconnect();
}, []);


  // 🎥 Load & play when visible
  useEffect(() => {
    if (!shouldLoadVideo) return;

    const video = videoRef.current;
    if (!video) return;

    if (video.dataset.srcset === '1') {
      video.play().catch(() => {});
      return;
    }

    let cancelled = false;

    const tryLoad = async () => {
      try {
        video.src = SRC;
        video.preload = 'auto';
        video.muted = true;
        video.loop = true;
        video.playsInline = true;

        const onLoadedData = () => {
          setIsVideoLoaded(true);
          video.play().catch(() => {});
        };

        const onCanPlay = () => {
          setIsVideoLoaded(true);
        };

        const onError = () => {
          videoRetryRef.current += 1;
          if (videoRetryRef.current <= 2 && !cancelled) {
            const backoff = 400 * videoRetryRef.current;
            setTimeout(() => {
              try {
                video.load();
                video.play().catch(() => {});
              } catch (e) {}
            }, backoff);
          } else {
            setIsVideoLoaded(false);
          }
        };

        video.addEventListener('loadeddata', onLoadedData);
        video.addEventListener('canplay', onCanPlay);
        video.addEventListener('error', onError);

        video.load();
        await video.play().catch(() => {});
        video.dataset.srcset = '1';

        return () => {
          cancelled = true;
          video.removeEventListener('loadeddata', onLoadedData);
          video.removeEventListener('canplay', onCanPlay);
          video.removeEventListener('error', onError);
        };
      } catch (e) {
        setIsVideoLoaded(false);
      }
    };

    tryLoad();

    return () => {
      try {
        video.pause();
      } catch (e) {}
    };
  }, [shouldLoadVideo]);

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  return (
    <section
      id={SECTION_ID}
      className="relative w-full overflow-hidden bg-black"
    >
      <div
        ref={videoWrapperRef}
        className={`relative w-full ${HEIGHT_CLASS}`}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={handleVideoLoad}
          style={{
            opacity: isVideoLoaded ? 1 : 0,
            transition: 'opacity 300ms ease'
          }}
        />

        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading video...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
