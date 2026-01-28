"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, MapPin, ArrowRight, ShieldCheck, 
  Clock, Users, Check, Star, Building, Award, 
  Phone, Mail, ChevronRight, ArrowUpRight, Sparkles, 
  Zap, BarChart3, Landmark, Home, Briefcase, Eye, 
  Compass, FileText, DollarSign, CheckCircle, Navigation,
  Globe2, TrendingUp, Target, Layers, Mic, PresentationIcon
} from 'lucide-react';

// ============================================
// LUXURY UI ASSETS
// ============================================
const FloatingGrain = () => (
  <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-50 mix-blend-overlay" 
       style={{ 
         backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
         filter: 'contrast(120%)'
       }} 
  />
);

const SafeRender = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <div className="min-h-screen bg-white" />;
  return <>{children}</>;
};

export default function MuscatConclave() {
  
  // ============================================
  // 1. HERO SECTION - VIDEO BLEND MASK
  // ============================================
  const HeroSection = () => {
    const videoRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
      const video = videoRef.current;
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting ? video?.play().catch(() => {}) : video?.pause(),
        { threshold: 0.2 }
      );
      if (sectionRef.current) observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }, []);

    return (
      <section ref={sectionRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          style={{ filter: 'brightness(0.7) contrast(1.2)' }}
        >
          <source src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Oman-page/0107(1)%20(1).mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

        <div className="container relative z-10 mx-auto px-4 text-center">
            {/* Image Blend Text Effect */}
            <div className="relative inline-block">
                <h1 className="text-[18vw] md:text-[14rem] font-black leading-[0.8] tracking-tighter text-white mix-blend-overlay opacity-90 transition-transform duration-700 hover:scale-[1.02]">
                    MUSCAT
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-xl md:text-4xl font-light text-white tracking-[0.8em] uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                        THE <span className="font-bold text-red-500">SUMMIT</span> 2026
                    </h2>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-20">
              <a href="#register" className="px-12 py-5 bg-red-600 text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all duration-500 rounded-sm">
                Request Invitation
              </a>
              <a href="#schedule" className="px-12 py-5 border border-white/40 text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-white/10 backdrop-blur-md transition-all rounded-sm">
                View Schedule
              </a>
            </div>
        </div>
      </section>
    );
  };

  // ============================================
  // 2. INTRO LINES (White)
  // ============================================
  const IntroSection = () => (
    <section className="py-32 bg-white text-black">
      <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="text-red-600 font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">The Vision</span>
          <h2 className="text-4xl md:text-6xl font-medium leading-[1.1] mb-10 tracking-tight">
            Where Global <span className="italic font-serif text-red-600">Ambition</span> <br /> 
            Meets Omani Legacy.
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-10" />
          <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
            For three days, Muscat becomes the epicenter of high-stakes real estate investment. 
            An exclusive gathering designed for those who don't just follow trends, but set them.
          </p>
      </div>
    </section>
  );

  // ============================================
  // 3. ITINERARY (RESTORED PREVIOUS STICKY - Light Theme)
  // ============================================
  const TimelineSection = () => {
    const events = [
      { date: "Feb 12", title: "Private Consultation", desc: "One-on-one strategy sessions with our lead portfolio managers.", time: "10:00 — 18:00" },
      { date: "Feb 14", title: "Grand Expo & Showcase", desc: "The official unveiling of 15+ premium Omani residential projects.", time: "09:00 — 17:00" },
      { date: "Feb 15", title: "Asset Acquisition", desc: "Final site verification and priority booking window for VIPs.", time: "10:00 — 16:00" }
    ];

    return (
      <section id="schedule" className="py-40 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <h3 className="text-red-600 text-xs font-black tracking-[0.5em] uppercase mb-6 flex items-center gap-4">
                  <div className="w-8 h-[2px] bg-red-600" /> Itinerary
                </h3>
                <h2 className="text-6xl md:text-8xl font-black text-black tracking-tighter mb-8 leading-none">
                  The <br /><span className="text-gray-300 font-serif italic">Curated</span> <br /> Days
                </h2>
                <p className="text-gray-400 text-lg font-light leading-relaxed max-w-sm">
                  Strategic sessions, private viewings, and networking within the Sultanate’s most prestigious venues.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-24">
              {events.map((evt, i) => (
                <div key={i} className="group relative border-l-2 border-red-100 pl-12 py-2 hover:border-red-600 transition-all duration-700">
                  <div className="absolute left-[-9px] top-4 w-4 h-4 bg-white border-2 border-red-600 rounded-full group-hover:bg-red-600 transition-colors" />
                  <span className="text-red-600 font-mono text-sm font-bold tracking-widest">{evt.date}</span>
                  <div className="mt-4 mb-2 flex items-center justify-between">
                     <h4 className="text-3xl md:text-5xl font-bold text-black tracking-tight group-hover:text-red-600 transition-colors duration-500">{evt.title}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 font-mono text-xs uppercase tracking-widest mb-6">
                    <Clock className="w-3 h-3" /> {evt.time}
                  </div>
                  <p className="text-gray-500 text-lg font-light leading-relaxed max-w-lg">{evt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // ============================================
  // 4. CUSTOM COMPONENT SLOT (Black)
  // ============================================
  const CustomComponentSection = () => (
    <div className="bg-[#050505] py-20 relative">
        <div className="container mx-auto px-4">
            <div id="custom-component-wrapper" className="w-full border border-white/5 rounded-2xl min-h-[300px] flex items-center justify-center bg-white/[0.02] shadow-2xl">
                <div className="text-center">
                    <div className="w-12 h-12 border border-red-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-5 h-5 text-red-600" />
                    </div>
                    <p className="text-white/20 font-mono text-xs uppercase tracking-[0.5em]">Interactive Experience Placeholder</p>
                </div>
            </div>
        </div>
    </div>
  );

  // ============================================
  // 5. COUNTDOWN (Action Red)
  // ============================================
  const CountdownSection = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
      const calculateTimeLeft = () => {
        const eventDate = new Date('2026-02-13T09:00:00+04:00');
        const now = new Date();
        const difference = eventDate.getTime() - now.getTime();
        if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      };
      const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <section className="py-32 bg-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-xl md:text-3xl font-light tracking-[0.3em] uppercase mb-12">The Opportunity Window is <span className="font-black">Closing</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="group">
                        <div className="text-6xl md:text-9xl font-black tabular-nums tracking-tighter transition-transform group-hover:scale-110 duration-500">
                            {value.toString().padStart(2, '0')}
                        </div>
                        <div className="h-[2px] w-10 bg-white/30 mx-auto my-4" />
                        <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-70">{unit}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    );
  };

  // ============================================
  // 6. EVENT HIGHLIGHTS (White Bento)
  // ============================================
  const HighlightsSection = () => (
    <section className="py-32 bg-white text-black">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-20">
                <span className="text-red-600 font-black tracking-[0.4em] uppercase text-[10px]">What to Expect</span>
                <h2 className="text-5xl font-black mt-4 tracking-tighter">Summit Highlights</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
                {/* Large Featured Card */}
                <div className="shadow-xl md:col-span-2 md:row-span-2 bg-gray-50 rounded-3xl p-12 flex flex-col justify-end relative overflow-hidden group border border-gray-100 shadow-sm">
                    <div className="absolute top-12 right-12">
                        <Building className="w-32 h-32 text-red-600 duration-700" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-red-200">
                            <PresentationIcon className="w-7 h-7" />
                        </div>
                        <h3 className="text-4xl font-black mb-4">Elite Showcase</h3>
                        <p className="text-gray-500 text-lg font-light leading-relaxed max-w-md">Access 15+ ultra-luxury projects before they are released to the general public. Direct developer engagement on-site.</p>
                    </div>
                </div>

                {/* Smaller Card 1 */}
                <div className="bg-red-600 rounded-3xl p-10 text-white flex flex-col justify-between group transition-all hover:bg-black">
                    <Mic className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Expert Keynotes</h3>
                        <p className="text-white/60 text-sm">Economic outlooks and legal framework insights by industry giants.</p>
                    </div>
                </div>

                {/* Smaller Card 2 */}
                <div className="bg-gray-50 rounded-3xl p-10 flex flex-col justify-between border border-gray-100 shadow-xl transition-all">
                    <Users className="w-8 h-8 text-red-600" />
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Private Networking</h3>
                        <p className="text-gray-400 text-sm">Join the 1% in an intimate networking lounge environment.</p>
                    </div>
                </div>
            </div>
         </div>
      </section>
  );

  // ============================================
  // 7. ABOUT FLIVV (Deep Carbon)
  // ============================================
  const AboutFlivvSection = () => (
    <section className="py-32 bg-[#080808] text-white">
      <div className="container mx-auto px-4 max-w-7xl">
         <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
               <h2 className="text-red-600 font-black tracking-[0.4em] uppercase mb-6 text-[10px]">The Host Organization</h2>
               <h3 className="text-6xl md:text-8xl font-black leading-none mb-10 tracking-tighter">FLIVV <br /><span className="text-white/10">DEVELOPERS</span></h3>
               <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                   <div>
                       <span className="block text-5xl font-black text-red-600">14+</span>
                       <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Years of Trust</span>
                   </div>
                   <div>
                       <span className="block text-5xl font-black text-white">07</span>
                       <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Landmark Projects</span>
                   </div>
               </div>
            </div>
            <div className="text-xl text-gray-400 font-light leading-relaxed space-y-8">
                <p>Flivv Developers is more than a real estate firm; we are custodians of Omani investment growth. With over a decade of operational excellence, we specialize in high-yield open plot projects.</p>
                <p>Our philosophy is built on <span className="text-white font-medium">Lifetime Advisory</span>. We don't just sell assets; we build multi-generational relationships through absolute transparency.</p>
                <div className="pt-6">
                    <a href="#" className="flex items-center gap-4 text-white font-bold group">
                        <span className="w-12 h-[1px] bg-red-600 group-hover:w-20 transition-all" />
                        Explore Our Portfolio
                    </a>
                </div>
            </div>
         </div>
      </div>
    </section>
  );

  // ============================================
  // 8. FORM SECTION (White)
  // ============================================
  const RegistrationSection = () => {
    const formLoadedRef = useRef(false);
    useEffect(() => {
      if (formLoadedRef.current) return;
      const container = document.getElementById('hubspot-form-container');
      if (!container) return;
      container.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/v2.js';
      script.onload = () => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            portalId: '21626983',
            formId: '417fd073-67f4-4e82-90f6-20d056f919fa',
            target: '#hubspot-form-container'
          });
        }
      };
      document.body.appendChild(script);
      formLoadedRef.current = true;
    }, []);

    return (
      <section id="register" className="py-32 bg-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-gray-50 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col lg:flex-row">
                <div className="lg:w-2/5 p-12 md:p-20 bg-red-600 text-white">
                    <h2 className="text-5xl font-black tracking-tighter mb-8 leading-none">Register <br />Interest.</h2>
                    <p className="text-red-100 font-light text-lg mb-12">Attendance is strictly limited to 50 VIP guests to ensure privacy and personalized advisory.</p>
                    <div className="space-y-6">
                        {["Priority Project Access", "Complimentary Valuation", "Legal Consultation"].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                                <span className="font-bold text-xs uppercase tracking-widest">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-3/5 p-12 md:p-20 bg-white">
                    <div id="hubspot-form-container" className="min-h-[400px]">
                        <div className="flex flex-col items-center justify-center h-full py-20 text-gray-300">
                            <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
                            <p className="text-[10px] uppercase tracking-[0.4em]">Establishing Secure Connection</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    );
  };

  return (
    <SafeRender>
      <div className="min-h-screen bg-white selection:bg-red-600 selection:text-white font-sans text-black antialiased">
        <FloatingGrain />
        <HeroSection />
        <IntroSection />
        <TimelineSection />
        <CustomComponentSection />
        <CountdownSection />
        <HighlightsSection />
        <AboutFlivvSection />
        <RegistrationSection />
      </div>
    </SafeRender>
  );
}