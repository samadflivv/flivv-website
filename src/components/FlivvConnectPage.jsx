'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import Footer from './Footer';

export default function FlivvConnectPage() {
  const primary = '#006C35'; // KSA green
  const primaryLight = '#2b8a57';
  const primaryLighter = '#4da879';

  const targetDate = new Date('2025-10-23T00:00:00Z');
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  // VIDEO
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);

  // countdown updater
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  // VIDEO PLAY/PAUSE BASED ON VIEWPORT VISIBILITY
  useEffect(() => {
    const vid = videoRef.current;
    const section = videoSectionRef.current;
    
    if (!vid || !section) return;

    // Set video attributes
    vid.muted = false;
    vid.volume = 1;
    vid.playsInline = true;
    vid.preload = "auto";

    // Intersection Observer to play when in viewport, pause when not
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section is in viewport - play video
            vid.play().catch(err => {
              console.log('Play failed, trying muted:', err);
              // If unmuted fails, try muted playback
              vid.muted = true;
              vid.play().catch(mutedErr => {
                console.log('Muted playback also failed:', mutedErr);
              });
            });
          } else {
            // Section is out of viewport - pause video
            vid.pause();
          }
        });
      },
      { 
        threshold: 0.5, // Play when 50% of section is visible
        rootMargin: '0px' 
      }
    );

    observer.observe(section);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen text-gray-900 bg-gradient-to-b from-white to-gray-50">
      {/* SECTION 1: VIDEO HERO SECTION WITH CONTROLS */}
      <section ref={videoSectionRef} className="relative w-full h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          controls
          controlsList="nodownload" // Removes download option
          loop
          playsInline
          preload="auto"
          muted={false}
        >
          <source src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/1002%20(1)(2).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* SECTION 2: Enhanced Centered Card */}
      <section className="py-12 md:py-20 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-20 -top-20 w-80 h-80 opacity-20 animate-pulse-slow">
            <div className="w-full h-full rounded-full" style={{ background: `radial-gradient(circle, ${primary} 0%, transparent 70%)` }}></div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-96 h-96 opacity-15 animate-pulse-slower">
            <div className="w-full h-full rounded-full" style={{ background: `radial-gradient(circle, ${primaryLight} 0%, transparent 70%)` }}></div>
          </div>
        </div>

        {/* Enhanced green blobs with animation */}
        <div className="absolute left-4 md:left-12 top-8 w-32 h-32 md:w-44 md:h-44 opacity-80 pointer-events-none z-0 animate-float" aria-hidden>
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="g1" x1="0%" x2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor={primaryLight} />
              </linearGradient>
            </defs>
            <path fill="url(#g1)" d="M38.5,-52.7C50.7,-43.4,62.1,-33.1,66.9,-19.8C71.6,-6.4,69.6,9.1,62.6,22.8C55.6,36.5,43.7,48.4,29.2,55.3C14.6,62.1,-2.7,64,-18.2,59.2C-33.8,54.4,-47.6,43,-56.1,28.2C-64.6,13.5,-67.8,-4.8,-61.9,-22.8C-56,-40.8,-40.9,-58.5,-23.9,-63.6C-6.9,-68.6,11.8,-61.1,27.9,-52.3C44.1,-43.5,57.3,-33.4,38.5,-52.7Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="absolute right-4 md:right-12 bottom-8 w-28 h-28 md:w-36 md:h-36 opacity-70 pointer-events-none z-0 animate-float-delayed" aria-hidden>
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="g2" x1="0%" x2="100%">
                <stop offset="0%" stopColor={primaryLight} />
                <stop offset="100%" stopColor={primary} />
              </linearGradient>
            </defs>
            <path fill="url(#g2)" d="M46.7,-70.7C61.8,-63.1,77.9,-53.4,80.9,-40.5C83.9,-27.7,73,-11.6,68.6,6.8C64.2,25.1,66.3,44.9,57.2,57.9C48.1,70.9,27.9,77.1,8.8,72.7C-10.3,68.4,-20.6,53.5,-34.3,40.1C-48.1,26.7,-65.3,14.9,-70.9,-0.1C-76.6,-15.1,-70.7,-31.8,-59.1,-40.1C-47.4,-48.3,-30.1,-48.1,-14.6,-53.5C0.9,-58.9,17.8,-69.9,46.7,-70.7Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-14 mx-4 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <h3 className="text-4xl md:text-6xl font-black text-center bg-gradient-to-r from-green-900 to-green-700 bg-clip-text text-transparent animate-fade-in-up">
              KSA SALES EVENT 2025 
            </h3>
            <h2 className="text-4xl md:text-6xl text-center mt-2 font-bold text-black animate-fade-in-up delay-100">
              Flivv Developers
            </h2>

            <p className="mt-4 md:mt-6 text-center max-w-3xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed animate-fade-in-up delay-200">
              With a growing client base of 200+ in KSA, we’re pleased to present Flivv Developers’ upcoming investment opportunities through new project launches.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-fade-in-up delay-300">
              <a 
                href="#form" 
                className="group relative overflow-hidden px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm md:text-base"
                style={{ 
                  background: `linear-gradient(135deg, ${primary}, ${primaryLight})`,
                }}
              >
                <span className="relative z-10">Book Your Seat</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </a>
            </div>

            {/* Enhanced countdown */}
            <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 animate-fade-in-up delay-400">
              {[
                {label:'Days', val:timeLeft.days, color: primary},
                {label:'Hours', val:timeLeft.hours, color: primaryLight},
                {label:'Minutes', val:timeLeft.minutes, color: primaryLighter},
                {label:'Seconds', val:timeLeft.seconds, color: '#6bbf8a'}
              ].map((u, index) => (
                <div 
                  key={u.label} 
                  className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div 
                    className="text-2xl md:text-5xl font-black transition-all duration-300 group-hover:scale-110"
                    style={{ color: u.color }}
                  >
                    {pad(u.val)}
                  </div>
                  <div className="mt-1 md:mt-2 text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {u.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Enhanced About */}
      <section id="about" className="py-12 md:py-20 px-4 bg-gradient-to-b from-white to-green-50/30">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-3 px-4 py-2 md:px-6 md:py-2 rounded-full bg-green-100 border border-green-200 mb-6 md:mb-8">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primary }}></div>
            <span className="text-xs md:text-sm font-semibold" style={{ color: primary }}>Our Journey</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-bold text-gray-900">About Flivv Developers</h3>
          <p className="mt-4 md:mt-6 text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            With over 10+ of experience in the IT industry, Flivv has built a strong reputation for reliability and service excellence. Over the past 3.5+ years, we have successfully diversified into the real estate sector as 
            <span className="font-semibold text-green-700"> Flivv Developers</span>.
            We specialize in the development and marketing of open plot projects, with focus on long-term real estate investment goals. With 5+ successful projects in our portfolio, we offer trustworthy companionship, backed by lifelong support and exceptional service.
          </p>
        </div>
      </section>

      {/* SECTION 4: Itinerary & Destinations */}
      <section id="destinations" className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 md:px-6 md:py-2 rounded-full bg-green-100 border border-green-200 mb-4">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primary }}></div>
              <span className="text-xs md:text-sm font-semibold" style={{ color: primary }}>Events Timeline</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900">Event Destinations Lineup</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                city:'Al-Khobar', 
                date:'October 23, 2025', 
                desc:'Meet local experts and tour prime developments in this coastal business center.',
                icon:'',
                gradient: `linear-gradient(135deg, ${primaryLight}, ${primary})`
              },
              {
                city:'Riyadh', 
                date:'October 24, 2025', 
                desc:'Exclusive site visits and developer presentations in the Eastern Province hub.',
                icon:'🏙️',
                gradient: `linear-gradient(135deg, ${primary}, #004a25)`
              },
              
              {
                city:'Jeddah', 
                date:'October 25, 2025', 
                desc:'Workshops, networking events, and cultural tours in the historic gateway.',
                icon:'🌊',
                gradient: `linear-gradient(135deg, ${primaryLighter}, ${primaryLight})`
              }
            ].map((d, idx) => (
              <article 
                key={d.city} 
                className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Background gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{ background: d.gradient }}
                ></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 md:gap-4">
                     
                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900">{d.city}</h4>
                        <div className="text-xs md:text-sm font-medium text-gray-500 mt-1">{d.date}</div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">
                      Limited Seats
                    </div>
                  </div>
                  <p className="mt-4 md:mt-6 text-gray-600 leading-relaxed text-sm md:text-base">{d.desc}</p>
                  <div className="mt-6 md:mt-8 flex gap-3">
                    <a 
                      href="#form" 
                      className="flex-1 text-center px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm md:text-base"
                      style={{ background: d.gradient }}
                    >
                      Register Your Seat
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HUBSPOT FORM SECTION */}
      <section id="form" className="py-12 px-4">
        <div className="max-w-3xl mx-auto p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl bg-[#DBFCE7]">
          <h4 className="text-2xl md:text-4xl font-semibold text-center">Interested? Submit your contact details</h4>
          <p className="text-center text-gray-600 mt-2 text-sm md:text-xl">Our team shall be reaching out to you soon for booking your seat!</p>

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

          <div id="hubspot-form" className="mt-4 md:mt-6">
            <noscript>
              <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">Please enable JavaScript to view the registration form or contact info@flivvdevelopers.com</div>
            </noscript>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .min-h-screen { min-height: 100vh; }

        /* Enhanced animations */
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-10px) rotate(3deg) scale(1.05); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(8px) rotate(-3deg) scale(1.03); }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }

        @keyframes pulse-slower {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 8s ease-in-out infinite;
        }

        /* Delay utilities */
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }

        /* Enhanced shadows */
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Responsive improvements */
        @media (max-width: 768px) {
          .blob-svg-a, .blob-svg-b { display: none; }
        }
      `}</style>
    </div>
  );
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