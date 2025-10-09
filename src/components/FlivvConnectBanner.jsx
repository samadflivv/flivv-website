'use client';

import React from 'react';
import Link from 'next/link';

export default function FlivvConnectBanner() {
  const primary = '#006C35'; // KSA green
  const primaryLight = '#2b8a57';
  const primaryLighter = '#4da879';

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-br from-green-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 opacity-20 animate-pulse-slow">
          <div className="w-full h-full rounded-full" style={{ background: `radial-gradient(circle, ${primary} 0%, transparent 70%)` }}></div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 opacity-15 animate-pulse-slower">
          <div className="w-full h-full rounded-full" style={{ background: `radial-gradient(circle, ${primaryLight} 0%, transparent 70%)` }}></div>
        </div>
        
        {/* Floating Blobs */}
        <div className="absolute top-10 right-10 w-24 h-24 opacity-60 animate-float">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="banner-g1" x1="0%" x2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor={primaryLight} />
              </linearGradient>
            </defs>
            <path fill="url(#banner-g1)" d="M38.5,-52.7C50.7,-43.4,62.1,-33.1,66.9,-19.8C71.6,-6.4,69.6,9.1,62.6,22.8C55.6,36.5,43.7,48.4,29.2,55.3C14.6,62.1,-2.7,64,-18.2,59.2C-33.8,54.4,-47.6,43,-56.1,28.2C-64.6,13.5,-67.8,-4.8,-61.9,-22.8C-56,-40.8,-40.9,-58.5,-23.9,-63.6C-6.9,-68.6,11.8,-61.1,27.9,-52.3C44.1,-43.5,57.3,-33.4,38.5,-52.7Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="absolute bottom-10 left-10 w-20 h-20 opacity-50 animate-float-delayed">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="banner-g2" x1="0%" x2="100%">
                <stop offset="0%" stopColor={primaryLight} />
                <stop offset="100%" stopColor={primary} />
              </linearGradient>
            </defs>
            <path fill="url(#banner-g2)" d="M46.7,-70.7C61.8,-63.1,77.9,-53.4,80.9,-40.5C83.9,-27.7,73,-11.6,68.6,6.8C64.2,25.1,66.3,44.9,57.2,57.9C48.1,70.9,27.9,77.1,8.8,72.7C-10.3,68.4,-20.6,53.5,-34.3,40.1C-48.1,26.7,-65.3,14.9,-70.9,-0.1C-76.6,-15.1,-70.7,-31.8,-59.1,-40.1C-47.4,-48.3,-30.1,-48.1,-14.6,-53.5C0.9,-58.9,17.8,-69.9,46.7,-70.7Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: primary }}></div>
              <span className="text-sm font-semibold" style={{ color: primary }}>Exclusive Event</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-green-900 to-green-700 bg-clip-text text-transparent">
                KSA SALES EVENT 2025
              </span>
              <br />
              <span className="text-gray-800">Flivv Developers</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              Join Indian investors for an exclusive real estate journey across Saudi Arabia. 
              Explore high-growth opportunities in Dammam, Khobar, and Jeddah.
            </p>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: '📅', label: 'Oct 23-25, 2025' },
                { icon: '📍', label: 'Saudi Arabia' },
                { icon: '👥', label: 'Limited Seats' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/flivv-connect" 
                className="group relative overflow-hidden px-8 py-4 rounded-full font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center"
                style={{ 
                  background: `linear-gradient(135deg, ${primary}, ${primaryLight})`,
                }}
              >
                <span className="relative z-10">Explore Event Details</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Link>
              
              <button className="px-6 py-4 rounded-full font-medium border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg text-center"
                style={{ 
                  borderColor: primary,
                  color: primary,
                  background: 'transparent'
                }}
              >
                Download Brochure
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative animate-fade-in-up delay-200">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              {/* Preview Image - You can replace this with an actual screenshot */}
              <div className="aspect-video bg-gradient-to-br from-green-600 to-green-800 relative overflow-hidden">
                {/* Mock video preview */}
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                         style={{ background: `linear-gradient(135deg, ${primary}, ${primaryLight})` }}>
                      <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">Event Preview</p>
                    <p className="text-sm opacity-90">Click to watch full experience</p>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-white text-sm font-medium">🎥 Live Video</span>
                </div>
                <div className="absolute top-4 right-4 bg-red-500 rounded-lg px-3 py-1 animate-pulse">
                  <span className="text-white text-sm font-medium">● LIVE</span>
                </div>
              </div>
              
              {/* Bottom info bar */}
              <div className="bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">Flivv Connect Experience</h3>
                    <p className="text-sm text-gray-600">Saudi Arabia Real Estate Tour</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black" style={{ color: primary }}>23-25</div>
                    <div className="text-xs text-gray-500">OCT 2025</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-xl px-4 py-2 shadow-lg transform rotate-6">
              <span className="text-sm font-bold text-gray-900">Limited Seats</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-2 shadow-lg border transform -rotate-6">
              <span className="text-sm font-bold" style={{ color: primary }}>🇸🇦 KSA 2025</span>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up delay-300">
          {[
            { number: '3', label: 'Cities' },
            { number: '50+', label: 'Investors' },
            { number: '15+', label: 'Developers' },
            { number: '100M+', label: 'Investment Pool' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300">
              <div className="text-2xl md:text-3xl font-black mb-2" style={{ color: primary }}>
                {stat.number}
              </div>
              <div className="text-sm font-medium text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
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
            transform: translateY(30px);
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
      `}</style>
    </section>
  );
}