'use client';

import React from 'react';
import Script from 'next/script';
import Footer from './Footer';

export default function FlivvConnectPage() {
  const primary = '#006C35'; // KSA green
  const primaryLight = '#2b8a57';
  const primaryLighter = '#4da879';

  return (
    <div className="min-h-screen text-gray-900 bg-gradient-to-b from-white to-gray-50">
      {/* NEW SECTION: Upcoming Riyadh Sales Meet - NOW AT TOP */}
      <section className="pt-20 md:pt-32 h-screen pb-12 md:pb-20 px-4 bg-gradient-to-b from-green-800 to-green-100">
  <div className="max-w-4xl mx-auto text-center">
    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-green-300 mb-8 animate-pulse shadow-lg">
      <div className="w-3 h-3 rounded-full bg-green-600"></div>
      <span className="text-sm font-bold text-green-800">NEW SALES MEET ANNOUNCEMENT</span>
    </div>
    
    <h3 className="text-3xl md:text-5xl font-black text-white mb-6">
      We're Coming Back to <span className="text-green-100">Riyadh</span>!
    </h3>
    
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-green-200 transform hover:scale-105 transition-transform duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h4 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Riyadh Sales Meet</h4>
          <p className="text-lg text-gray-600 mb-4">Join us for another exclusive investment opportunity</p>
          
          <div className="flex items-center justify-center md:justify-start gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-black text-green-700">28</div>
              <div className="text-sm text-gray-500">OCT</div>
              <div className="text-sm text-gray-500">2025</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">Tuesday</div>
              <div className="text-sm text-gray-500">Evening Session</div>
            </div>
          </div>
          
          <a 
            href="#form" 
            className="inline-block px-8 py-4 rounded-full font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
            style={{ 
              background: `linear-gradient(135deg, ${primary}, ${primaryLight})`,
            }}
          >
            Reserve Your Spot Now
          </a>
        </div>
        
        <div className="bg-green-100 rounded-2xl p-6 text-center border-2 border-green-200">
          <div className="text-4xl mb-4">🎯</div>
          <h5 className="font-bold text-green-800 mb-2">Limited Seats Available</h5>
          <p className="text-sm text-green-700">Early registration recommended</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* SECTION 2: Enhanced About */}
      <section id="about" className="py-12 md:py-20 px-4 bg-gradient-to-b from-white to-green-50/30">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-3 px-4 py-2 md:px-6 md:py-2 rounded-full bg-green-100 border border-green-200 mb-6 md:mb-8">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primary }}></div>
            <span className="text-xs md:text-sm font-semibold" style={{ color: primary }}>Our Journey</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-bold text-gray-900">About Flivv Developers</h3>
          <p className="mt-4 md:mt-6 text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            With over 14 years of experience in business, Flivv has built a strong reputation for reliability and service excellence. Over the past 4 years, <span className="font-semibold text-green-700"> Flivv Developers</span>. has successfully established a strong presence in the real estate sector. We specialize in the development and marketing of open plot projects, with focus on long-term real estate investment goals. With 10+ projects in our portfolio, we offer trustworthy companionship, backed by lifetime advisory and customer relationship management.
          </p>
        </div>
      </section>

      {/* SECTION 3: Itinerary & Destinations - All Completed */}
      <section id="destinations" className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 md:px-6 md:py-2 rounded-full bg-gray-100 border border-gray-200 mb-4">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <span className="text-xs md:text-sm font-semibold text-gray-600">Past Events</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900">Event Destinations Completed</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                city:'Al-Khobar', 
                date:'October 23, 2025', 
                day:'Thursday',
                status: 'completed',
                gradient: `linear-gradient(135deg, #9CA3AF, #6B7280)`
              },
              {
                city:'Riyadh', 
                date:'October 24, 2025', 
                day:'Friday',
                status: 'completed',
                gradient: `linear-gradient(135deg, #9CA3AF, #6B7280)`
              },
              {
                city:'Jeddah', 
                date:'October 25, 2025', 
                day:'Saturday',
                status: 'completed',
                gradient: `linear-gradient(135deg, #9CA3AF, #6B7280)`
              }
            ].map((d, idx) => (
              <article 
                key={d.city} 
                className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Background gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-5"
                  style={{ background: d.gradient }}
                ></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900">{d.city}</h4>
                        <div className="text-xs md:text-sm font-medium text-gray-500 mt-1">{d.date}</div>
                        <div className="text-xs md:text-sm font-medium text-gray-500 mt-1">{d.day}</div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      Completed
                    </div>
                  </div>
                  <div className="mt-6 md:mt-8">
                    <button 
                      className="w-full text-center px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl font-semibold text-gray-500 transition-all duration-300 text-sm md:text-base border-2 border-gray-300 cursor-not-allowed opacity-70"
                      disabled
                    >
                      Event Completed
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HUBSPOT FORM SECTION */}
      <section id="form" className="py-20 px-4">
        <div className="max-w-3xl mx-auto p-6 rounded-2xl md:rounded-3xl shadow-2xl bg-[#DBFCE7]">
          <h4 className="text-3xl md:text-4xl font-semibold text-center">Interested? RSVP to reserve your Seat</h4>
          <p className="text-center text-gray-600 mt-2 text-lg md:text-xl">Our team shall be connecting with you shortly.</p>

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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        /* Responsive improvements */
        @media (max-width: 768px) {
          .blob-svg-a, .blob-svg-b { display: none; }
        }
      `}</style>
    </div>
  );
}