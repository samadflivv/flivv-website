// components/UpcomingEventsHero.jsx
import { useEffect, useRef, useState } from 'react';

export default function UpcomingEventsHero() {
  const [formLoaded, setFormLoaded] = useState(false);
  const formContainerRef = useRef(null);

  // Load HubSpot embed script (if not already present)
  useEffect(() => {
    const embedSrc = 'https://js-na2.hsforms.net/forms/embed/21626983.js';
    if (typeof window === 'undefined') return;

    if (!document.querySelector(`script[src="${embedSrc}"]`)) {
      const script = document.createElement('script');
      script.src = embedSrc;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // Observe when the iframe is added to the hs-form-frame div
  useEffect(() => {
    if (!formContainerRef.current) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          const iframeAdded = Array.from(mutation.addedNodes).some(
            (node) => node.nodeName === 'IFRAME'
          );
          if (iframeAdded) {
            setFormLoaded(true);
            observer.disconnect();
          }
        }
      });
    });

    observer.observe(formContainerRef.current, {
      childList: true,
      subtree: false,
    });

    if (formContainerRef.current.querySelector('iframe')) {
      setFormLoaded(true);
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#350814] via-[#801233] to-[#871436] px-4 py-20 lg:py-15">
      
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Event Cards */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                Upcoming Events
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-[#b35e7c] rounded-full mt-6 mx-auto lg:mx-0" />
            </div>

            {/* Iftar Card */}
            <div className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#6d0e2a] to-[#b35e7c] text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Flivv's Iftar Event</h2>
                  <p className="text-white/80 text-lg mb-4">Join us for Iftar at Layali Al Falak</p>
                  <div className="space-y-2 text-white/70">
                    <p className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Layali Al Falak, Crowne Plaza, The Business Park, Doha
                    </p>
                    {/* Date line */}
                    <p className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Friday, 6th March 2026
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      5:30 PM – 8:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Suhoor Card */}
            <div className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#6d0e2a] to-[#b35e7c] text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Flivv's Suhoor Event</h2>
                  <p className="text-white/80 text-lg mb-4">Join us for Suhoor at Layali Al Falak</p>
                  <div className="space-y-2 text-white/70">
                    <p className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Layali Al Falak, Crowne Plaza, The Business Park, Doha
                    </p>
                    {/* Date line */}
                    <p className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Saturday, 7th March 2026
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      9:00 PM – 2:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - HubSpot Form (white background) */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 text-center">
              Register To Claim Your Voucher
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Secure your spot at our exclusive Ramadan gatherings.
            </p>

            <div className="relative min-h-[300px]">
              {/* Loading spinner (shown until iframe loads) */}
              {!formLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6d0e2a]"></div>
                  <p className="mt-2">Loading form...</p>
                </div>
              )}

              {/* HubSpot form container */}
              <div
                ref={formContainerRef}
                className="hs-form-frame w-full"
                data-region="na2"
                data-form-id="d3b56077-11fe-485c-98cd-677027236164"
                data-portal-id="21626983"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}