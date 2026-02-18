'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Star, CheckCircle2, ArrowRight, MapPin, Building2, Users, Volume2, Presentation, HelpCircle, Plus, X } from 'lucide-react'; 

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

        <FadeIn delay={0.2}>
          <h2 className="text-4xl lg:text-5xl font-serif text-white leading-[0.95] tracking-tight mb-8">
             <span className="italic font-light text-white">Ramada Resort by Wyndham, Manama City Centre</span> 
          </h2>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Explore premium open-plot investment opportunities around Hyderabad. Connect with us in Manama and take the next step toward choosing Flivv’s projects as your preferred investment option.
          </p>
        </FadeIn>

        {/* <FadeIn delay={0.6} className="mt-10 flex flex-col md:flex-row gap-5 justify-center">
            <button onClick={() => document.getElementById('registration').scrollIntoView({behavior: 'smooth'})} className="group relative px-8 py-4 bg-[#CE1126] text-white rounded-none overflow-hidden transition-all hover:bg-[#a30d1d]">
                <div className="relative z-10 flex items-center gap-3 font-medium tracking-wide">
                    RESERVE YOUR SPOT <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </button>
        </FadeIn> */}
      </motion.div>
    </section>
  );
};

// const CountdownBar = () => {
//     const target = new Date("2025-12-05T19:30:00+03:00").getTime();
//     const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  
//     useEffect(() => {
//       const interval = setInterval(() => {
//         const now = new Date().getTime();
//         const distance = target - now;
//         if (distance > 0) {
//             setTimeLeft({
//                 d: Math.floor(distance / (1000 * 60 * 60 * 24)),
//                 h: Math.floor((distance / (1000 * 60 * 60)) % 24),
//                 m: Math.floor((distance / 1000 / 60) % 60),
//                 s: Math.floor((distance / 1000) % 60),
//             });
//         }
//       }, 1000);
//       return () => clearInterval(interval);
//     }, []);
  
//     return (
//       <div className="relative z-30 -mt-10 lg:-mt-24 px-6 mb-24">
//         <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-2xl flex flex-wrap md:flex-nowrap justify-between items-center gap-8">
//             <div>
//                 <p className="text-[#D4AF37] text-sm uppercase tracking-widest mb-1">Next Session Starts In</p>
//                 <p className="text-white/60 text-xs">Bahrain Local Time</p>
//             </div>
//             <div className="flex gap-8 md:gap-12 text-center">
//                 {Object.entries(timeLeft).map(([unit, val]) => (
//                     <div key={unit}>
//                         <span className="block text-4xl md:text-5xl font-serif text-white">{val < 10 ? `0${val}` : val}</span>
//                         <span className="text-xs text-white/40 uppercase tracking-widest">{unit}</span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//       </div>
//     );
// };

const AboutEvent = () => {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn>
                <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                    Invest Wisely in <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CE1126] to-[#D4AF37]">Real Estate.</span>
                </h2>
            </FadeIn>
            <FadeIn delay={0.2} className="space-y-6">
                <p className="text-gray-300 text-lg font-light leading-relaxed border-l-2 border-[#CE1126] pl-6">
                    Resuming our successful sales tour across the Kingdom of Saudi Arabia and Qatar, we are excited to visit Bahrain and present the best investment opportunities around Hyderabad.
                </p>
                <p className="text-gray-400 font-light leading-relaxed pl-6">
                    Having hosted more than 1,000+ families in each country, it is our pleasure and honor to assist you with safe, secure, and high-value land investment options backed by Flivv Developers.
                </p>
            </FadeIn>
        </section>
    );
};



const BAHRAIN_GALLERY = [
  { id: 1, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Bahrain-Event/WhatsApp%20Image%202025-12-18%20at%207.01.21%20PM.jpeg", alt: "" },
  { id: 2, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Bahrain-Event/WhatsApp%20Image%202025-12-18%20at%207.01.22%20PM%20(2).jpeg", alt: "" },
  { id: 3, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Bahrain-Event/WhatsApp%20Image%202025-12-18%20at%207.01.22%20PM.jpeg", alt: "" },
  { id: 4, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Bahrain-Event/WhatsApp%20Image%202025-12-18%20at%207.01.23%20PM%20(1).jpeg", alt: "" },
  { id: 5, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Bahrain-Event/WhatsApp%20Image%202025-12-18%20at%207.01.22%20PM%20(1).jpeg", alt: "" },
  { id: 6, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Bahrain-Event/WhatsApp%20Image%202025-12-18%20at%207.01.23%20PM%20(2).jpeg", alt: "" },
  { id: 7, src: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Bahrain-Event/WhatsApp%20Image%202025-12-18%20at%207.01.23%20PM.jpeg", alt: "" },
];

function GallerySection() {
  const [selectedImg, setSelectedImg] = React.useState(null);

  return (
    <section className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 border-l-4 border-[#CE1126] pl-6">
          <h3 className="text-3xl md:text-5xl font-serif text-white uppercase italic">Gallery</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {/* Image 1: Big Feature */}
          <div onClick={() => setSelectedImg(BAHRAIN_GALLERY[0].src)} className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl cursor-pointer">
            <img src={BAHRAIN_GALLERY[0].src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Gallery" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Plus className="text-white w-12 h-12" /></div>
          </div>

          {/* Standard Images 2-3 */}
          {[1, 2].map((idx) => (
            <div key={idx} onClick={() => setSelectedImg(BAHRAIN_GALLERY[idx].src)} className="relative group overflow-hidden rounded-xl cursor-pointer">
              <img src={BAHRAIN_GALLERY[idx].src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Gallery" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Plus className="text-white w-8 h-8" /></div>
            </div>
          ))}

          {/* Image 4: Tall Feature */}
          <div onClick={() => setSelectedImg(BAHRAIN_GALLERY[3].src)} className="md:row-span-2 relative group overflow-hidden rounded-xl cursor-pointer">
            <img src={BAHRAIN_GALLERY[3].src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Gallery" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Plus className="text-white w-8 h-8" /></div>
          </div>

          {/* Images 5-6 */}
          {[4, 5].map((idx) => (
            <div key={idx} onClick={() => setSelectedImg(BAHRAIN_GALLERY[idx].src)} className="relative group overflow-hidden rounded-xl cursor-pointer">
              <img src={BAHRAIN_GALLERY[idx].src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Gallery" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Plus className="text-white w-8 h-8" /></div>
            </div>
          ))}

          {/* Image 7: Wide Bottom Feature */}
          <div onClick={() => setSelectedImg(BAHRAIN_GALLERY[6].src)} className="md:col-span-2 relative group overflow-hidden rounded-xl cursor-pointer">
            <img src={BAHRAIN_GALLERY[6].src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Gallery" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Plus className="text-white w-8 h-8" /></div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out">
            <X className="absolute top-8 right-8 text-white w-10 h-10 cursor-pointer" />
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} src={selectedImg} className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


// const Highlights = () => {
//     const cards = [
//         { icon: Volume2, title: "Public Address"},
//         { icon: Presentation, title: "Projects Presentation"},
//         { icon: HelpCircle, title: "Q&A Session" },
//     ];

//     return (
//         <section className="py-20 px-6 bg-[#0a0a0a]">
//             <div className="max-w-7xl mx-auto">
//                 <div className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end">
//                     <h3 className="text-2xl font-serif text-white">Event Highlights</h3>
//                     <p className="text-[#D4AF37] text-sm hidden md:block">EXPERIENCE THE DIFFERENCE</p>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
//                     {cards.map((c, i) => (
//                         <FadeIn key={i} delay={i * 0.1} className="group bg-[#0F1115] p-10 hover:bg-[#161920] transition-colors border-r border-white/5 last:border-0">
//                             <c.icon className="text-[#CE1126] w-8 h-8 mb-6 group-hover:scale-110 transition-transform" />
//                             <h4 className="text-xl lg:text-2xl text-white mb-3 font-medium">{c.title}</h4>
//                         </FadeIn>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// const Schedule = () => {
//     const days = [
//         { date: "06", month: "DEC", title: "1:1 Sales Session", time: "04:00 PM to 11:00 PM", venue: "Venue : Ramada Resort by Wyndham, Manama City Centre" },
//     ];

//     return (
//         <section className="py-24 px-6 relative overflow-hidden">
//             {/* Background Accent */}
//             <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#CE1126] rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none"></div>

//             <div className="max-w-5xl mx-auto">
//                 <FadeIn className="text-center mb-16">
//                     <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Event Schedule</h2>
//                 </FadeIn>

//                 <div className="space-y-4">
//                     {days.map((day, i) => (
//                         <FadeIn key={i} delay={i * 0.1}>
//                             <div className="group relative flex items-center gap-6 md:gap-12 p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#CE1126]/30 transition-all duration-300">
//                                 <div className="flex flex-col items-center justify-center min-w-[80px]">
//                                     <span className="text-4xl md:text-5xl font-serif text-white group-hover:text-[#CE1126] transition-colors">{day.date}</span>
//                                     <span className="text-xs tracking-widest text-gray-500">{day.month}</span>
//                                 </div>
                                
//                                 <div className="w-px h-16 bg-white/10 hidden md:block"></div>
                                
//                                 <div className="flex-grow">
//                                     <h3 className="text-xl md:text-2xl text-white mb-2">{day.title}</h3>
//                                     <h2 className="text-base lg:text-xl text-gray-500 mb-1">{day.venue}</h2>
//                                     <p className="text-[#D4AF37] text-sm mb-1 font-medium">{day.time}</p>
//                                 </div>

//                                 <div className="hidden md:block">
//                                     <button onClick={() => document.getElementById('registration').scrollIntoView({behavior: 'smooth'})} className="px-6 py-2 border border-white/20 text-white text-sm rounded-full hover:bg-white hover:text-black transition-colors">
//                                         Book Slot
//                                     </button>
//                                 </div>
//                             </div>
//                         </FadeIn>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

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
                                With over 14+ years of experience in business, Flivv has built a strong reputation for reliability and service excellence. Over the past 4 years, Flivv Developers has successfully established a strong presence in the real estate sector.
                            </p>
                            <p>
                                We specialize in the development and marketing of open plot projects, with a focus on long-term real estate investment goals.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/10">
                            <div>
                                <Building2 className="text-[#D4AF37] mb-3" size={28} />
                                <h4 className="text-white text-xl font-serif">07 Projects</h4>
                                <p className="text-sm text-gray-500">Under Portfolio</p>
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
        // 1. Define the standard HubSpot V2 script source
        const scriptSrc = "//js.hsforms.net/forms/embed/v2.js";

        // 2. Helper to render the form safely
        const renderForm = () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    region: "na2",
                    portalId: "21626983",
                    formId: "85df73b8-ea56-459c-9eaa-4126006d1a3e",
                    target: '#hubspot-target'
                });
            }
        };

        // 3. Check if script is already present (prevents duplicates)
        if (document.querySelector(`script[src="${scriptSrc}"]`)) {
            renderForm();
            return;
        }

        // 4. Load the script if not present
        const script = document.createElement('script');
        script.src = scriptSrc;
        script.async = true;
        script.onload = renderForm;
        document.body.appendChild(script);

        // Cleanup isn't strictly necessary for the global script, 
        // and removing it can sometimes break re-renders in React Strict Mode.
    }, []);

    return (
        <section id="registration" className="py-24 px-6 bg-[#050505] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#CE1126] to-transparent"></div>
            
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-serif text-white mb-4">Secure Your Investment</h2>
                {/* <p className="text-gray-400">Register below for your preferred session type.</p> */}
            </div>

            <FadeIn>
                <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-sm shadow-2xl relative">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#F7F7F7]">
                        <div className="absolute bottom-0 left-0 w-full h-full bg-white rounded-tr-3xl"></div>
                    </div>
                    
                    {/* Form Container */}
                    <div id="hubspot-target">
                        {/* The form renders here */}
                    </div>
                </div>
            </FadeIn>
        </section>
    );
};

export default function LandingPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-slate-200 selection:bg-[#CE1126] selection:text-white font-sans">
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay" style={{ backgroundImage: `url(${ASSETS.texture})` }}></div>
            
        <Hero />
        {/* <CountdownBar /> */}
        <AboutEvent />
        <GallerySection />
        {/* <Highlights /> */}
        {/* <Schedule /> */}
        <AboutFlivv />
        <Registration />
    </main>
  );
}