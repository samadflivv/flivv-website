"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, MapPin, ArrowRight, ShieldCheck, 
  Clock, Users, Check, Star, Building, Award, 
  Phone, Mail, ChevronRight, ArrowUpRight, Sparkles, 
  Zap, BarChart3, Landmark, Home, Briefcase, Eye, 
  Compass, FileText, DollarSign, CheckCircle, Navigation,
  Globe2, TrendingUp, Target, Layers, PresentationIcon, HelpCircle,
  Link,
  Speaker,
  Megaphone,
  SpeakerIcon,
  SeparatorHorizontal,
  Volume,
  LucideVolume1,
  LucideVolume2,
  SpeechIcon, Volume2
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
                    OMAN
                </h1>
                <h2 className="text-xl md:text-4xl font-light text-white tracking-[0.8em] pt-10 uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                        SALES EVENT’<span className="font-bold text-red-500">26</span>
                </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-20">
              <a href="#register" className="px-12 py-5 bg-red-600 text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all duration-500 rounded-sm">
                Request Invitation
              </a>
              {/* <a href="#schedule" className="px-12 py-5 border border-white/40 text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-white/10 backdrop-blur-md transition-all rounded-sm">
                View Schedule
              </a> */}
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
            Built on <span className="italic font-serif text-red-600">Trust,</span> <br /> 
            Focussed on <span className="italic font-serif text-red-600">Principles</span> 
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-10" />
          <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
            After our sales events, held in The Kingdom of <a href="/flivvksaevent" className='text-blue-600'>Saudi Arabia</a>, <a href="/flivvqatarevent" className='text-blue-600'>Qatar</a> and <a href="/flivvbahrainvisit" className='text-blue-600'>Bahrain</a>, Flivv developers now takes great pride to present ourselves, this time at your city - Muscat, Oman
          </p>
          <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
            It's our immense pleasure to host and welcome you and your family, with the same credibility and promising principles of assisting you, with clear and open heart, to get you a secured open plot land investment
          </p>
      </div>
    </section>
  );

  // ============================================
  // 3. ITINERARY (RESTORED PREVIOUS STICKY - Light Theme)
  // ============================================
  // const TimelineSection = () => {
  //   const events = [
  //     { date: "Feb 12", title: "Private Consultation", desc: "One-on-one strategy sessions with our lead portfolio managers.", time: "10:00 — 18:00" },
  //     { date: "Feb 14", title: "Grand Expo & Showcase", desc: "The official unveiling of 15+ premium Omani residential projects.", time: "09:00 — 17:00" },
  //     { date: "Feb 15", title: "Asset Acquisition", desc: "Final site verification and priority booking window for VIPs.", time: "10:00 — 16:00" }
  //   ];

  //   return (
  //     <section id="schedule" className="py-40 bg-gray-50 border-y border-gray-100">
  //       <div className="container mx-auto px-4 max-w-6xl">
  //         <div className="grid lg:grid-cols-12 gap-20">
  //           <div className="lg:col-span-5">
  //             <div className="sticky top-32">
  //               <h3 className="text-red-600 text-xs font-black tracking-[0.5em] uppercase mb-6 flex items-center gap-4">
  //                 <div className="w-8 h-[2px] bg-red-600" /> Itinerary Plan
  //               </h3>
  //               <h2 className="text-6xl md:text-8xl font-black text-black tracking-tighter mb-8 leading-none">
  //                 The <br /><span className="text-gray-300 font-serif italic">Curated</span> <br /> Days
  //               </h2>
  //               <p className="text-gray-400 text-lg font-light leading-relaxed max-w-sm">
  //                 Interactive sessions, project insights, and networking within the Sultanate’s most prestigious venues.
  //               </p>
  //             </div>
  //           </div>
  //           <div className="lg:col-span-7 space-y-24">
  //             {events.map((evt, i) => (
  //               <div key={i} className="group relative border-l-2 border-red-100 pl-12 py-2 hover:border-red-600 transition-all duration-700">
  //                 <div className="absolute left-[-9px] top-4 w-4 h-4 bg-white border-2 border-red-600 rounded-full group-hover:bg-red-600 transition-colors" />
  //                 <span className="text-red-600 font-mono text-sm font-bold tracking-widest">{evt.date}</span>
  //                 <div className="mt-4 mb-2 flex items-center justify-between">
  //                    <h4 className="text-3xl md:text-5xl font-bold text-black tracking-tight group-hover:text-red-600 transition-colors duration-500">{evt.title}</h4>
  //                 </div>
  //                 <div className="flex items-center gap-2 text-gray-400 font-mono text-xs uppercase tracking-widest mb-6">
  //                   <Clock className="w-3 h-3" /> {evt.time}
  //                 </div>
  //                 <p className="text-gray-500 text-lg font-light leading-relaxed max-w-lg">{evt.desc}</p>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // };

  // ============================================
  // 3. TIMELINE PLACEHOLDER (Temporary)
  // ============================================
  const TimelineSection = () => {
    return (
      <section id="schedule" className="py-40 bg-black border-y border-gray-100 relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
            <Calendar className="w-96 h-96 text-black" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-50 border border-red-100 rounded-full mb-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                <span className="text-red-600 text-[12px] font-black uppercase tracking-[0.3em]">Dates and Location</span>
            </div>

            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
                Scheduling  <span className="text-gray-400 font-serif italic">in</span> <br /> 
                Progress
            </h2>

            <div className="w-20 h-1 bg-red-600 mx-auto mb-10" />

            {/* Subtle Call to Action */}
            <div className="mt-16">
                <a 
                  href="#register" 
                  className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-red-600 group"
                >
                    <span className="w-12 h-[1px] bg-red-600 group-hover:w-20 transition-all duration-500" />
                    Confirm your RSVP
                </a>
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
            <h2 className="text-xl md:text-3xl font-light tracking-[0.3em] uppercase mb-12">We are jump-starting <span className="font-black">in</span></h2>
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
                <h2 className="text-5xl font-black mt-4 tracking-tighter">Event Highlights</h2>
            </div>
            
            {/* Adjusted to 4 columns for a more balanced Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                
                {/* 1. Large Featured Card (Elite Showcase) */}
                <div className="md:col-span-2 md:row-span-2 rounded-3xl p-12 flex flex-col justify-end relative overflow-hidden group border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700">
                    
                    {/* BACKGROUND IMAGE */}
                    <img 
                        src="/VaseemStage.jpg" 
                        alt="Summit Presentation"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* CINEMATIC OVERLAYS */}
                    {/* Tint Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* CONTENT LAYER */}
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-red-900/40">
                            <Volume2 className="w-7 h-7" />
                        </div>
                        <h3 className="text-4xl font-black mb-4 text-white">Public Addressing</h3>
                        <p className="text-white/70 text-lg font-light leading-relaxed max-w-md">
                            Led by our management chairpersons, the session opens with strategic insights into our organization, projects and long-term vision.
                        </p>
                    </div>
                </div>

                {/* 2. Smaller Card (Expert Keynotes) */}
                <div className="md:col-span-1 md:row-span-1 bg-red-600 rounded-3xl p-8 text-white flex flex-col justify-between group transition-all hover:bg-black shadow-lg">
                    <PresentationIcon className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Projects showcase</h3>
                        <p className="text-white/60 text-sm">Our projects are showcased with a clear vision to deliver value to your interest of investment.</p>
                    </div>
                </div>

                {/* 3. Smaller Card (Private Networking) */}
                <div className="md:col-span-1 md:row-span-1 bg-gray-50 rounded-3xl p-8 flex flex-col justify-between border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                    <Users className="w-8 h-8 text-red-600" />
                    <div>
                        <h3 className="text-2xl font-bold mb-2">1:1 Sales session</h3>
                        <p className="text-gray-400 text-sm">Private one-on-one discussions with our sales team looking to interact and discuss your investment goals and preferences.</p>
                    </div>
                </div>

                {/* 4. NEW: Wide Card (Q&A Session) */}
                <div className="md:col-span-2 md:row-span-1 bg-[#080808] text-white rounded-3xl p-8 flex items-center justify-between group border border-white/5 hover:border-red-600/50 transition-all shadow-2xl">
                    <div className="max-w-[70%]">
                        <div className="flex items-center gap-3 mb-3">
                            <HelpCircle className="w-6 h-6 text-red-600" />
                            <h3 className="text-2xl font-bold">Q&A Session</h3>
                        </div>
                        <p className="text-white/50 text-sm">An open Q&A session led by our Sales Team Lead, addressing project details and investment clarity.</p>
                    </div>
                    <div className="hidden sm:block">
                        <ArrowUpRight className="w-10 h-10 text-white/10 group-hover:text-red-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
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
               <h2 className="text-red-600 font-black tracking-[0.4em] uppercase mb-6 text-[10px]">About Flivv Developers</h2>
               <h3 className="text-6xl md:text-6xl font-black leading-none mb-10 tracking-tighter">Building Trust, <br /><span className="text-white/10">Delivering Value.</span></h3>
               <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
                   <div>
                       <span className="block text-4xl lg:text-5xl font-black text-red-600">14+</span>
                       <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Years of Trust</span>
                   </div>
                   <div>
                       <span className="block text-4xl lg:text-5xl font-black text-white">07</span>
                       <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Projects</span>
                   </div>
                   <div>
                       <span className="block text-4xl lg:text-5xl font-black text-white">500+</span>
                       <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Growing Customers</span>
                   </div>
               </div>
            </div>
            <div className="text-xl text-gray-400 font-light leading-relaxed space-y-8">
                <p>With over 14+ years of experience in business, Flivv has built a strong reputation for reliability and service excellence. Over the past <span className="text-white font-medium">4 years,</span> Flivv Developers has successfully established a strong presence in the real estate sector.</p>
                <p>We specialize in the development and marketing of open plot projects, with a focus on long-term real estate investment goals.</p>
                <div className="pt-6">
                    <a href="https://flivvdevelopers.com/about" className="flex items-center gap-4 text-white font-bold group">
                        <span className="w-12 h-[1px] bg-red-600 group-hover:w-20 transition-all" />
                        More About us
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
                    <h2 className="text-4xl font-black tracking-tighter mb-8 leading-none">Expression of<br />Interest.</h2>
                    <p className="text-red-100 font-light text-lg">We invite the Hyderabadi NRI to join us in Oman for an exclusive interaction building the strong relationships and trust we’ve established overtime across KSA, Qatar, and Bahrain.</p>
                </div>
                <div className="lg:w-3/5 p-12 md:p-20 bg-white">
                    <div id="hubspot-form-container">
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
        {/* <CustomComponentSection /> */}
        {/* <CountdownSection /> */}
        <HighlightsSection />
        <AboutFlivvSection />
        <RegistrationSection />
      </div>
    </SafeRender>
  );
}