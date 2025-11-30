'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Clock, Calendar, Star, CheckCircle2, ArrowRight, MapPin, Building2, Users } from 'lucide-react';


const ASSETS = {
  heroBg: "/charles-adrien-fournier-lDxs85UO7lU-unsplash.jpg", // Bahrain skyline
  texture: "https://grainy-gradients.vercel.app/noise.svg", // Subtle noise overlay
  flivvOffice: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7133.jpg" 
};

const COLORS = {
  bahrainRed: "#CE1126",
  gold: "#D4AF37", 
  dark: "#050505",
  charcoal: "#0F1115",
  text: "#E2E8F0"
};

// --- ANIMATION UTILS ---
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
        <img src={ASSETS.heroBg} alt="Bahrain" className="w-full h-full object-cover scale-110" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-20">
        <FadeIn>
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#CE1126] animate-pulse"></span>
            <span className="text-xs uppercase tracking-[0.2em] text-white/90">Exclusive Event</span>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.95] tracking-tight mb-8">
            Flivv <span className="italic font-light text-[#D4AF37]">in</span> Bahrain
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the pinnacle of real estate investment. Join us for exclusive sales sessions and premium land opportunities.
          </p>
        </FadeIn>

        <FadeIn delay={0.6} className="mt-10 flex flex-col md:flex-row gap-5 justify-center">
            <button onClick={() => document.getElementById('registration').scrollIntoView({behavior: 'smooth'})} className="group relative px-8 py-4 bg-[#CE1126] text-white rounded-none overflow-hidden transition-all hover:bg-[#a30d1d]">
                <div className="relative z-10 flex items-center gap-3 font-medium tracking-wide">
                    RESERVE YOUR SPOT <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </button>
        </FadeIn>
      </motion.div>
    </section>
  );
};

const CountdownBar = () => {
    // Set target to Dec 4th, 2025 (Sample date based on prompt)
    const target = new Date("2025-12-04T09:00:00").getTime();
    const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = target - now;
        if (distance > 0) {
            setTimeLeft({
                d: Math.floor(distance / (1000 * 60 * 60 * 24)),
                h: Math.floor((distance / (1000 * 60 * 60)) % 24),
                m: Math.floor((distance / 1000 / 60) % 60),
                s: Math.floor((distance / 1000) % 60),
            });
        }
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="relative z-30 -mt-24 px-6 mb-24">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-2xl flex flex-wrap md:flex-nowrap justify-between items-center gap-8">
            <div>
                <p className="text-[#D4AF37] text-sm uppercase tracking-widest mb-1">Next Session Starts In</p>
                <p className="text-white/60 text-xs">Bahrain Local Time</p>
            </div>
            <div className="flex gap-8 md:gap-12 text-center">
                {Object.entries(timeLeft).map(([unit, val]) => (
                    <div key={unit}>
                        <span className="block text-4xl md:text-5xl font-serif text-white">{val < 10 ? `0${val}` : val}</span>
                        <span className="text-xs text-white/40 uppercase tracking-widest">{unit}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
};

const AboutEvent = () => {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn>
                <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                    An Invitation to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CE1126] to-[#D4AF37]">Excellence.</span>
                </h2>
            </FadeIn>
            <FadeIn delay={0.2} className="space-y-6">
                <p className="text-gray-300 text-lg font-light leading-relaxed border-l-2 border-[#CE1126] pl-6">
                    Unlock a world of premium real estate opportunities. The Flivv Bahrain Sales Sessions are meticulously designed for discerning investors seeking clarity, trust, and high returns.
                </p>
                <p className="text-gray-400 font-light leading-relaxed pl-6">
                    Whether you are an NRI looking to reconnect with your roots or a local investor seeking strong asset appreciation, our founders and experts are here to guide you through every legal and financial nuance.
                </p>
            </FadeIn>
        </section>
    );
};

const Highlights = () => {
    const cards = [
        { icon: Users, title: "1:1 Founder Access", desc: "Private consultations with Flivv leadership to discuss bespoke investment strategies." },
        { icon: Star, title: "Exclusive Inventory", desc: "Access premium plots and projects not available to the general public." },
        { icon: CheckCircle2, title: "Legal Transparency", desc: "Full documentation review and approval briefings on the spot." },
    ];

    return (
        <section className="py-20 px-6 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end">
                    <h3 className="text-2xl font-serif text-white">Event Highlights</h3>
                    <p className="text-[#D4AF37] text-sm hidden md:block">EXPERIENCE THE DIFFERENCE</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                    {cards.map((c, i) => (
                        <FadeIn key={i} delay={i * 0.1} className="group bg-[#0F1115] p-10 hover:bg-[#161920] transition-colors border-r border-white/5 last:border-0">
                            <c.icon className="text-[#CE1126] w-8 h-8 mb-6 group-hover:scale-110 transition-transform" />
                            <h4 className="text-xl text-white mb-3 font-medium">{c.title}</h4>
                            <p className="text-gray-400 font-light text-sm leading-relaxed">{c.desc}</p>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Schedule = () => {
    const days = [
        { date: "04", month: "DEC", title: "1:1 Sales Sessions", desc: "Private bookings & Portfolio Review", time: "10:00 AM - 6:00 PM" },
        { date: "05", month: "DEC", title: "The Main Event", desc: "Keynote Presentation & Dinner", time: "7:00 PM - 10:00 PM" },
        { date: "06", month: "DEC", title: "Highlights & Closing", desc: "Final Q&A and Site Briefings", time: "10:00 AM - 2:00 PM" },
    ];

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#CE1126] rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none"></div>

            <div className="max-w-5xl mx-auto">
                <FadeIn className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Event Schedule</h2>
                    <p className="text-gray-400">Join us at the InterContinental Regency Bahrain</p>
                </FadeIn>

                <div className="space-y-4">
                    {days.map((day, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div className="group relative flex items-center gap-6 md:gap-12 p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#CE1126]/30 transition-all duration-300">
                                <div className="flex flex-col items-center justify-center min-w-[80px]">
                                    <span className="text-4xl md:text-5xl font-serif text-white group-hover:text-[#CE1126] transition-colors">{day.date}</span>
                                    <span className="text-xs tracking-widest text-gray-500">{day.month}</span>
                                </div>
                                
                                <div className="w-px h-16 bg-white/10 hidden md:block"></div>
                                
                                <div className="flex-grow">
                                    <h3 className="text-xl md:text-2xl text-white mb-1">{day.title}</h3>
                                    <p className="text-[#D4AF37] text-sm mb-1 font-medium">{day.time}</p>
                                    <p className="text-gray-400 text-sm font-light">{day.desc}</p>
                                </div>

                                <div className="hidden md:block">
                                    <button className="px-6 py-2 border border-white/20 text-white text-sm rounded-full hover:bg-white hover:text-black transition-colors">
                                        Book Slot
                                    </button>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AboutFlivv = () => {
    return (
        <section className="py-20 px-6 bg-[#0F1115]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                
                {/* Image Side */}
                <div className="lg:col-span-5 relative">
                    <FadeIn>
                        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                            <img src={ASSETS.flivvOffice} alt="Flivv Developers Office" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute bottom-0 left-0 bg-[#CE1126] text-white p-6 w-3/4">
                                <p className="font-serif text-3xl">14+</p>
                                <p className="text-xs uppercase tracking-widest mt-1">Years of Excellence</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Text Side */}
                <div className="lg:col-span-7">
                    <FadeIn delay={0.2}>
                        <h2 className="text-sm text-[#CE1126] tracking-widest uppercase font-bold mb-4">About Flivv Developers</h2>
                        <h3 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
                            Building Trust, <br/> Delivering <span className="text-gray-500">Value.</span>
                        </h3>
                        
                        <div className="space-y-6 text-gray-300 font-light leading-relaxed text-lg">
                            <p>
                                With over 14 years of experience in business, Flivv has built a strong reputation for reliability and service excellence. Over the past 4 years, Flivv Developers has successfully established a strong presence in the real estate sector.
                            </p>
                            <p>
                                We specialize in the development and marketing of open plot projects, with a focus on long-term real estate investment goals.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/10">
                            <div>
                                <Building2 className="text-[#D4AF37] mb-3" size={28} />
                                <h4 className="text-white text-xl font-serif">10+ Projects</h4>
                                <p className="text-sm text-gray-500">Successfully Delivered</p>
                            </div>
                            <div>
                                <Users className="text-[#D4AF37] mb-3" size={28} />
                                <h4 className="text-white text-xl font-serif">Lifetime Advisory</h4>
                                <p className="text-sm text-gray-500">Customer Relationship</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

const Registration = () => {
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//js-na2.hsforms.net/forms/embed/21626983.js";
        script.defer = true;
        script.onload = () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    region: "na2",
                    portalId: "21626983",
                    formId: "85df73b8-ea56-459c-9eaa-4126006d1a3e",
                    target: '#hubspot-target',
                    // This CSS removes the default HubSpot background to match our theme
                    css: '' 
                });
            }
        };
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); }
    }, []);

    return (
        <section id="registration" className="py-24 px-6 bg-[#050505] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#CE1126] to-transparent"></div>
            
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-serif text-white mb-4">Secure Your Investment</h2>
                <p className="text-gray-400">Register below for your preferred session type.</p>
            </div>

            <FadeIn>
                <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-sm shadow-2xl relative">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#F7F7F7]">
                        <div className="absolute bottom-0 left-0 w-full h-full bg-white rounded-tr-3xl"></div>
                    </div>
                    
                    {/* Form Container */}
                    <div id="hubspot-target" className="min-h-[400px]">
                        {/* The form renders here. 
                            NOTE: In HubSpot settings, set "Form Style" to "Raw HTML" 
                            or ensure background is transparent for best results. 
                        */}
                    </div>
                </div>
            </FadeIn>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-black text-white/30 py-12 text-center text-sm border-t border-white/5">
        <p className="mb-2 uppercase tracking-widest font-semibold text-white/50">Flivv Developers</p>
        <p>&copy; {new Date().getFullYear()} All Rights Reserved. Bahrain Sales Sessions.</p>
    </footer>
);

export default function LandingPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-slate-200 selection:bg-[#CE1126] selection:text-white font-sans">
        {/* Global Texture Overlay for Film Grain Effect */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay" style={{ backgroundImage: `url(${ASSETS.texture})` }}></div>
            
        <Hero />
        <CountdownBar />
        <AboutEvent />
        <Highlights />
        <Schedule />
        <AboutFlivv />
        <Registration />
        <Footer />
    </main>
  );
}