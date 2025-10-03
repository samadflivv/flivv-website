'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import Footer from './Footer';

export default function FlivvConnectPage() {
  const primary = '#006C35'; // KSA green
  const primaryLight = '#2b8a57';

  const targetDate = new Date('2025-10-23T00:00:00Z');
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  // VIDEO
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false); // user-visible mute toggle (default unmuted)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // LIGHTBOX (gallery)
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // gallery images (12 slots -> 3 rows x 4 images)
  const imgs = [
    '/BoxcricketareaRFS.jpeg',
    '/images/event2.jpg',
    '/images/event3.jpg',
    '/images/event4.jpg',
    '/images/event5.jpg',
    '/images/event6.jpg',
    '/images/event7.jpg',
    '/images/event8.jpg',
    '/images/event9.jpg',
    '/images/event10.jpg',
    '/images/event11.jpg',
    '/images/event12.jpg',
  ];

  const row1 = imgs.slice(0, 4);
  const row2 = imgs.slice(4, 8);
  const row3 = imgs.slice(8, 12);

  // countdown updater
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  // Attempt to autoplay unmuted on load, fallback to muted if blocked.
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    let mounted = true;

    const tryPlay = async () => {
      try {
        vid.muted = false;
        setIsMuted(false);
        const p = vid.play();
        if (p && typeof p.then === 'function') await p;
        setAutoplayBlocked(false);
      } catch (e) {
        // unmuted autoplay blocked. fallback to muted autoplay and show enable button
        try {
          if (!mounted) return;
          vid.muted = false;
          setIsMuted(false);
          const p2 = vid.play();
          if (p2 && typeof p2.then === 'function') await p2;
          setAutoplayBlocked(true);
        } catch (e2) {
          setAutoplayBlocked(true);
        }
      }
    };

    tryPlay();

    // pause/play on entering/leaving viewport
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            try { vid.play().catch(() => {}); } catch (e) {}
          } else {
            try { vid.pause(); } catch (e) {}
          }
        });
      },
      { threshold: [0.5] }
    );

    obs.observe(sectionRef.current || vid);

    return () => {
      mounted = false;
      obs.disconnect();
      try { vid.pause(); } catch (e) {}
    };
  }, []);

 

  // Lightbox handlers
  const openLightbox = (row, i) => {
    const index = row * 4 + i;
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const prevLightbox = () => setLightboxIndex((idx) => (idx - 1 + 12) % 12);
  const nextLightbox = () => setLightboxIndex((idx) => (idx + 1) % 12);

  // lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  // small style helpers for visual polish
  const cardShadow = '0 30px 60px rgba(15, 23, 42, 0.08)';

  return (
    <div className="min-h-screen text-gray-900 bg-gradient-to-b from-white to-gray-50">
      {/* SECTION 1: VIDEO only */}
      <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          playsInline
          preload="auto"
        >
          <source src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/SAUDI%20WEBSITE%20(1).mp4" type="video/mp4" />
        </video>

        {/* If autoplay with sound was blocked, show a soft hint to enable audio (also user can use toggle above) */}
        {autoplayBlocked && (
          <div className="absolute bottom-6 left-6 z-30 bg-white/80 backdrop-blur rounded-md px-3 py-2 shadow">Autoplay with sound was blocked — tap Unmute to enable audio.</div>
        )}
      </section>

      {/* SECTION 2: Centered Card with green blobs (comes AFTER first section ends) */}
      <section className="py-20 px-4">
        {/* green blobs positioned behind the card for decorative effect */}
        <div className="absolute left-8 mt-4 w-44 h-44 opacity-90 pointer-events-none z-0" aria-hidden>
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="g1" x1="0%" x2="100%"><stop offset="0%" stopColor={primary} /><stop offset="100%" stopColor={primaryLight} /></linearGradient>
            </defs>
            <path fill="url(#g1)" d="M38.5,-52.7C50.7,-43.4,62.1,-33.1,66.9,-19.8C71.6,-6.4,69.6,9.1,62.6,22.8C55.6,36.5,43.7,48.4,29.2,55.3C14.6,62.1,-2.7,64,-18.2,59.2C-33.8,54.4,-47.6,43,-56.1,28.2C-64.6,13.5,-67.8,-4.8,-61.9,-22.8C-56,-40.8,-40.9,-58.5,-23.9,-63.6C-6.9,-68.6,11.8,-61.1,27.9,-52.3C44.1,-43.5,57.3,-33.4,38.5,-52.7Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="absolute right-8 mt-12 w-36 h-36 opacity-80 pointer-events-none z-0" aria-hidden>
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="g2" x1="0%" x2="100%"><stop offset="0%" stopColor={primaryLight} /><stop offset="100%" stopColor={primary} /></linearGradient>
            </defs>
            <path fill="url(#g2)" d="M46.7,-70.7C61.8,-63.1,77.9,-53.4,80.9,-40.5C83.9,-27.7,73,-11.6,68.6,6.8C64.2,25.1,66.3,44.9,57.2,57.9C48.1,70.9,27.9,77.1,8.8,72.7C-10.3,68.4,-20.6,53.5,-34.3,40.1C-48.1,26.7,-65.3,14.9,-70.9,-0.1C-76.6,-15.1,-70.7,-31.8,-59.1,-40.1C-47.4,-48.3,-30.1,-48.1,-14.6,-53.5C0.9,-58.9,17.8,-69.9,46.7,-70.7Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-white rounded-3xl p-10 md:p-16 mx-4 md:mx-0" style={{ boxShadow: cardShadow }}>
            <h3 className="text-5xl md:text-6xl font-extrabold text-center" style={{ color: primary }}>Flivv Sales Event </h3>
            <h2 className="text-4xl md:text-5xl text-center mt-2 font-bold text-gray-800">KSA 2025</h2>

            <p className="mt-6 text-center max-w-3xl mx-auto text-gray-600 text-lg">With over 200+ client based in KSA, it's our honor to come and present ourselves in person, meet and let everyone explore investment opportunities with Flivv</p>

            <div className="mt-8 flex items-center justify-center gap-6">
              <a href="#form" className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-medium shadow" style={{ background: `linear-gradient(90deg, ${primary}, ${primaryLight})` }}>
                Register Now
              </a>
              <a href="#destinations" className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-green-800 font-medium border" style={{ borderColor: primary + '22' }}>
                View Itinerary
              </a>
            </div>

            {/* countdown */}
            {/* <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[{label:'Days',val:timeLeft.days},{label:'Hours',val:timeLeft.hours},{label:'Minutes',val:timeLeft.minutes},{label:'Seconds',val:timeLeft.seconds}].map((u)=> (
                <div key={u.label} className="bg-white rounded-2xl p-6 shadow-md text-center">
                  <div className="text-4xl md:text-5xl font-extrabold text-gray-900">{pad(u.val)}</div>
                  <div className="mt-2 text-sm text-gray-500">{u.label}</div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* SECTION 3: About */}
      <section id="about" className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-semibold">About Flivv Connect</h3>
          <p className="mt-4 text-gray-700 text-lg">Flivv Developers is a real estate development firm dedicated to helping investors “invest wisely in real estate”. Flivv Connect: KSA 2025 will bring Indian investors to Saudi Arabia for curated site visits, workshops, and networking across Dammam, Khobar, and Jeddah.</p>
        </div>
      </section>

      {/* SECTION 4: Itinerary & Destinations (card style) */}
      <section id="destinations" className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-semibold text-center mb-8">Itinerary & Destinations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{city:'Dammam',date:'Oct 23, 2025',desc:'Exclusive site visits and developer presentations.'},{city:'Khobar',date:'Oct 24, 2025',desc:'Meet local experts and tour prime developments.'},{city:'Jeddah',date:'Oct 25, 2025',desc:'Workshops, networking events, and cultural tours.'}].map((d, idx) => (
              <article key={d.city} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ background: primary, color: '#fff' }}>{idx===0?'🕌':idx===1?'🌊':'🏙️'}</div>
                    <div>
                      <h4 className="text-xl font-semibold">{d.city}</h4>
                      <div className="text-sm text-gray-500">{d.date}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">Seats limited</div>
                </div>
                <p className="mt-4 text-gray-600">{d.desc}</p>
                <div className="mt-6 flex gap-3">
                  <a href="#form" className="px-4 py-2 rounded-md text-sm font-medium" style={{ background: `linear-gradient(90deg, ${primary}, ${primaryLight})`, color: '#fff' }}>Register</a>
                  <button className="px-4 py-2 rounded-md text-sm font-medium border border-gray-200">Learn more</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Event Gallery (3 rows x 4 images). Clicking opens lightbox with glassmorphism blur */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-semibold text-center mb-8">Event Gallery</h3>

          <div className="grid gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {row1.map((s, i) => (
                <div key={`r1-${i}`} className="rounded-lg overflow-hidden shadow hover:scale-105 transition-transform cursor-pointer" onClick={() => openIndex(i)}>
                  <img src={s} alt={`gallery-r1-${i}`} className="w-full h-44 md:h-56 object-cover" onClick={() => openIndex(i)} />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {row2.map((s, i) => (
                <div key={`r2-${i}`} className="rounded-lg overflow-hidden shadow hover:scale-105 transition-transform cursor-pointer" onClick={() => openIndex(4 + i)}>
                  <img src={s} alt={`gallery-r2-${i}`} className="w-full h-44 md:h-56 object-cover" onClick={() => openIndex(4 + i)} />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {row3.map((s, i) => (
                <div key={`r3-${i}`} className="rounded-lg overflow-hidden shadow hover:scale-105 transition-transform cursor-pointer" onClick={() => openIndex(8 + i)}>
                  <img src={s} alt={`gallery-r3-${i}`} className="w-full h-44 md:h-56 object-cover" onClick={() => openIndex(8 + i)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lightbox overlay */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md" onClick={closeLightbox} />
            <div className="relative z-20 max-w-[90vw] max-h-[90vh] p-4 flex items-center justify-center">
              <button onClick={closeLightbox} className="absolute top-3 right-3 z-30 bg-white/90 rounded-full px-3 py-2 shadow">✕</button>
              <button onClick={prevLightbox} className="absolute left-3 z-30 bg-white/90 rounded-full px-3 py-2 shadow">‹</button>
              <img src={imgs[lightboxIndex]} alt={`lightbox-${lightboxIndex}`} className="max-w-full max-h-[80vh] rounded-lg shadow-2xl object-contain" />
              <button onClick={nextLightbox} className="absolute right-3 z-30 bg-white/90 rounded-full px-3 py-2 shadow">›</button>
            </div>
          </div>
        )}

      </section>

      {/* SECTION 6: HubSpot form */}
      <section id="form" className="py-12 px-4">
        <div className="max-w-3xl mx-auto p-6 rounded-3xl shadow-2xl bg-white">
          <h4 className="text-2xl font-semibold text-center">Interested? Submit your details</h4>
          <p className="text-center text-gray-600 mt-2">We'll contact you with the event schedule, pricing, and travel support.</p>

          <Script id="hsforms" strategy="afterInteractive">
            {`(function() {
              var s = document.createElement('script');
              s.src = 'https://js.hsforms.net/forms/v2.js';
              document.head.appendChild(s);
              s.onload = function() {
                if(window.hbspt) {
                  hbspt.forms.create({
                    portalId: '21626983',
                    formId: '60910235-031b-47fe-8214-048ba1989721',
                    target: '#hubspot-form'
                  });
                }
              };
            })();`}
          </Script>

          <div id="hubspot-form" className="mt-6">
            <noscript>
              <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">Please enable JavaScript to view the registration form or contact info@flivvdevelopers.com</div>
            </noscript>
          </div>
        </div>
      </section>

      {/* SECTION 7: Why Attend */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-left">
          <h4 className="text-4xl font-semibold text-center">Why Attend</h4>
          <ul className="mt-6 grid grid-cols-1 gap-6 text-gray-700">
            <li className="flex items-start gap-4"><span className="text-4xl">📈</span><span className="text-xl font-medium">Learn about investment opportunities in the Saudi real estate market</span></li>
            <li className="flex items-start gap-4"><span className="text-4xl">🔍</span><span className="text-xl font-medium">Gain cutting-edge market insights and trends</span></li>
            <li className="flex items-start gap-4"><span className="text-4xl">🤝</span><span className="text-xl font-medium">Connect with real estate experts and fellow Indian investors</span></li>
            <li className="flex items-start gap-4"><span className="text-4xl">🎤</span><span className="text-xl font-medium">Participate in workshops and Q&amp;A sessions with industry leaders</span></li>
          </ul>
        </div>
      </section>

      {/* SECTION 8: Footer */}
      <Footer />

      <style jsx>{`
        .min-h-screen { min-height: 100vh; }
      `}</style>
    </div>
  );

  // helper to open correct index from grid click
  function openIndex(index) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }
}

// ---------- helpers ----------
function getTimeLeft(target) {
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime());
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

function pad(n) { return String(n).padStart(2, '0'); }
