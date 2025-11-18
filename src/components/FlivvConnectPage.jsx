'use client';
import React, { useEffect, useRef, useState } from 'react';

// ----- CONFIG: update this if your manifest lives elsewhere -----
const MANIFEST_URL = "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/ksa-gallery/manifest.json";

// ----------------------------------------------------------------

// Intersection hook
function useInView({ root = null, rootMargin = '200px', threshold = 0 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.unobserve(el);
          }
        });
      },
      { root, rootMargin, threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);

  return [ref, inView];
}

function OptimizedThumbnail({ entry, alt, onOpen, sizes }) {
  const [ref, inView] = useInView({ rootMargin: "300px" });
  const [loaded, setLoaded] = useState(false);

  if (!entry) return null;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden w-full h-full"
      style={{
        backgroundImage: `url(${entry.placeholder})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {inView && (
        <picture>
          <source type="image/webp" srcSet={entry.variants.webp} />

          <img
            src={entry.low}
            srcSet={entry.variants.jpg}
            sizes={
              sizes ||
              "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
            alt={alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onClick={onOpen}
            className="w-full h-32 sm:h-48 object-cover block transition-opacity duration-200 cursor-pointer"
            style={{ opacity: loaded ? 1 : 1 }}
          />
        </picture>
      )}
    </div>
  );
}



const galleryData = {
  alkhobar: [
    { id: 1, src: '/images/alkhobar1.jpg', alt: 'Al Khobar Event 1' },
    { id: 2, src: '/images/alkhobar2.jpg', alt: 'Al Khobar Event 2' },
    { id: 3, src: '/images/alkhobar3.jpg', alt: 'Al Khobar Event 3' },
    { id: 4, src: '/images/alkhobar4.jpg', alt: 'Al Khobar Event 4' },
    { id: 5, src: '/images/alkhobar5.jpg', alt: 'Al Khobar Event 5' },
    { id: 6, src: '/images/alkhobar6.jpg', alt: 'Al Khobar Event 6' },
    { id: 7, src: '/images/alkhobar7.jpg', alt: 'Al Khobar Event 7' },
    { id: 8, src: '/images/alkhobar8.jpg', alt: 'Al Khobar Event 8' },
    { id: 9, src: '/images/alkhobar9.jpg', alt: 'Al Khobar Event 9' }
  ],
  riyadh: [
    { id: 1, src: '/images/riyadh1.jpg', alt: 'Riyadh Event 1' },
    { id: 2, src: '/images/riyadh2.jpg', alt: 'Riyadh Event 2' },
    { id: 3, src: '/images/riyadh3.jpg', alt: 'Riyadh Event 3' },
    { id: 4, src: '/images/riyadh4.jpg', alt: 'Riyadh Event 4' },
    { id: 5, src: '/images/riyadh5.jpg', alt: 'Riyadh Event 5' },
    { id: 6, src: '/images/riyadh6.jpg', alt: 'Riyadh Event 6' },
    { id: 7, src: '/images/riyadh7.jpg', alt: 'Riyadh Event 7' },
    { id: 8, src: '/images/riyadh8.jpg', alt: 'Riyadh Event 8' },
    { id: 9, src: '/images/riyadh9.jpg', alt: 'Riyadh Event 9' }
  ],
  jeddah: [
    { id: 1, src: '/images/jeddah1.jpg', alt: 'Jeddah Event 1' },
    { id: 2, src: '/images/jeddah2.jpg', alt: 'Jeddah Event 2' },
    { id: 3, src: '/images/jeddah3.jpg', alt: 'Jeddah Event 3' },
    { id: 4, src: '/images/jeddah4.jpg', alt: 'Jeddah Event 4' },
    { id: 5, src: '/images/jeddah5.jpg', alt: 'Jeddah Event 5' },
    { id: 6, src: '/images/jeddah6.jpg', alt: 'Jeddah Event 6' },
    { id: 7, src: '/images/jeddah7.jpg', alt: 'Jeddah Event 7' },
    { id: 8, src: '/images/jeddah8.jpg', alt: 'Jeddah Event 8' },
    { id: 9, src: '/images/jeddah9.jpg', alt: 'Jeddah Event 9' }
  ]
};

const cityContent = {
  alkhobar: { title: 'Al Khobar - KSA', stats: 'Venue : Voco Al Khobar by IHG' },
  riyadh: { title: 'Riyadh - KSA', stats: 'Venue : Riyadh Marriott Hotel' },
  jeddah: { title: 'Jeddah - KSA', stats: 'Venue : InterContinental Jeddah by IHG' }
};

export default function FlivvconnectPage() {
  const [manifest, setManifest] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState('');
  const [currentImage, setCurrentImage] = useState(null);

  const videoRef = useRef(null);

  // Video play/pause when in viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // try to play; muted + playsInline helps autoplay
            video.play().catch(() => {
              /* autoplay blocked — ok */
            });
          } else {
            try { video.pause(); } catch (e) {}
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Load manifest.json from CDN (or public path)
  useEffect(() => {
    let mounted = true;
    fetch(MANIFEST_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((m) => {
        if (!mounted) return;
        setManifest(m);
      })
      .catch((err) => {
        console.warn('Could not load manifest.json from', MANIFEST_URL, err);
        setManifest(null);
      });
    return () => (mounted = false);
  }, []);

  const openLightbox = (city, imageId) => {
    setCurrentCity(city);
    setCurrentImage(imageId);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentCity('');
    setCurrentImage(null);
  };

  const navigateLightbox = (direction) => {
    const currentImages = galleryData[currentCity] || [];
    let newIndex;
    if (direction === 'next') {
      newIndex = currentImage === currentImages.length ? 1 : currentImage + 1;
    } else {
      newIndex = currentImage === 1 ? currentImages.length : currentImage - 1;
    }
    setCurrentImage(newIndex);
  };

  const getCurrentImage = () => {
    if (!currentCity || !currentImage) return null;
    return galleryData[currentCity]?.find((img) => img.id === currentImage) || null;
  };

  const renderGrid = (cityKey) => (
    <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {galleryData[cityKey].map((image) => {
        const key = image.src.split('/').pop().split('.')[0];
        const entry = manifest ? manifest[key] : null;

        return (
          <div
            key={image.id}
            className="gallery-item bg-gray-100 rounded-lg sm:rounded-xl overflow-hidden shadow-md cursor-pointer relative group"
            onClick={() => openLightbox(cityKey, image.id)}
          >
            {entry ? (
              <OptimizedThumbnail entry={entry} alt={image.alt} onOpen={() => openLightbox(cityKey, image.id)} />
            ) : (
              // lightweight fallback — prevents downloading full local images
              <div className="w-full h-32 sm:h-48 bg-gray-100 flex items-center justify-center text-sm text-gray-400">
                Loading…
              </div>
            )}

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="fas fa-search-plus text-sm sm:text-base" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-start md:items-center justify-center px-4 md:px-8 lg:px-16 py-20 pt-40 gap-8 md:h-screen">
        <div className="absolute inset-0 bg-[#002200] z-0" />

        <div className="w-full md:w-1/2 mb-6 md:mb-0 relative z-10 px-4 text-justify">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-white leading-tight">
            KSA SALES EVENT 2025
          </h1>

          <h2 className="text-lg md:text-xl mb-4 text-green-100">Al Khobar, Riyadh, Jeddah</h2>

          <div className="w-20 md:w-24 h-1 bg-white mb-6 rounded-full" />

          <div className="space-y-3 text-white/90 text-base md:text-lg">
            <p>October 2025 marked a significant milestone for us — our very first International Sales Event in the Kingdom of Saudi Arabia. We were truly honored to host over 1,000 families across Al-Khobar, Riyadh, and Jeddah, and the experience was nothing short of remarkable.</p>
            <p>From the launch of our latest project, Gulmohar Homes, to the soft launch of our upcoming premium villa project in Tukkuguda, the response was overwhelmingly positive. The enthusiasm and trust shown by our guests inspired us to extend our stay in Riyadh, where we conducted exclusive 1:1 sales sessions to cater to the growing interest.</p>
            <p>A heartfelt thank you to everyone who showed up, believed in us, and became part of the Flivv Developers family, now 500+ strong and growing. We are committed to delivering excellence and upholding the trust placed in us by the wonderful people of the Kingdom of Saudi Arabia.</p>
          </div>
        </div>

        <div className="w-full md:w-2/5 mt-6 md:mt-0 flex justify-center relative z-10 px-4">
          <div className="relative w-full max-w-md">
            <div className="rounded-2xl shadow-2xl overflow-hidden aspect-[4/5] w-full bg-black max-h-[75vh]">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
              >
                <source src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/khobar%20riyadh%20website%204.3%20ratio.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section id="cities" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">Cities We Visited</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base">Our journey across the Kingdom of Saudi Arabia was met with tremendous success and enthusiasm. Explore the highlights from each city below.</p>

        {/* Al Khobar */}
        <div className="city-section mb-12 sm:mb-20 bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 p-4 sm:p-8">
            <div className="lg:col-span-3">
              <div className="md:sticky md:top-20 bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{cityContent.alkhobar.title}</h3>
                <div className="bg-green-50 border-l-4 border-green-500 p-3 sm:p-4 rounded-r-lg">
                  <p className="text-green-700 font-semibold text-sm sm:text-base"><i className="fas fa-users mr-2" />{cityContent.alkhobar.stats}</p>
                </div>
              </div>
            </div>

            {renderGrid('alkhobar')}
          </div>
        </div>

        {/* Riyadh (ensure content appears above images on mobile) */}
        <div className="city-section mb-12 sm:mb-20 bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 p-4 sm:p-8">
            <div className="lg:col-span-3 order-first lg:order-first">
              <div className="md:sticky md:top-20 bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{cityContent.riyadh.title}</h3>
                <div className="bg-green-50 border-l-4 border-green-500 p-3 sm:p-4 rounded-r-lg">
                  <p className="text-green-700 font-semibold text-sm sm:text-base"><i className="fas fa-users mr-2" />{cityContent.riyadh.stats}</p>
                </div>
              </div>
            </div>

            {renderGrid('riyadh')}
          </div>
        </div>

        {/* Jeddah */}
        <div className="city-section mb-12 sm:mb-20 bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 p-4 sm:p-8">
            <div className="lg:col-span-3">
              <div className="md:sticky md:top-20 bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{cityContent.jeddah.title}</h3>
                <div className="bg-green-50 border-l-4 border-green-500 p-3 sm:p-4 rounded-r-lg">
                  <p className="text-green-700 font-semibold text-sm sm:text-base"><i className="fas fa-users mr-2" />{cityContent.jeddah.stats}</p>
                </div>
              </div>
            </div>

            {renderGrid('jeddah')}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button className="absolute top-4 right-4 text-white text-3xl z-10 bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <button className="absolute left-2 sm:left-4 text-white text-2xl bg-black/50 hover:bg-black/70 p-3 sm:p-4 rounded-full z-10 transition-colors" onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}>
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div className="w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center">
              {getCurrentImage() && (() => {
                const current = getCurrentImage();
                const key = current.src.split('/').pop().split('.')[0];
                const entry = manifest ? manifest[key] : null;
                if (entry) {
                  return <img src={entry.original} alt={current.alt} className="max-w-full max-h-full object-contain" />;
                }
                return <img src={current.src} alt={current.alt} className="max-w-full max-h-full object-contain" />;
              })()}
            </div>
          </div>

          <button className="absolute right-2 sm:right-4 text-white text-2xl bg-black/50 hover:bg-black/70 p-3 sm:p-4 rounded-full z-10 transition-colors" onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}>
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          <div className="absolute bottom-4 text-white text-center w-full text-sm sm:text-base">{currentCity.charAt(0).toUpperCase() + currentCity.slice(1)} - Image {currentImage} of {galleryData[currentCity]?.length}</div>
        </div>
      )}
    </div>
  );
}
