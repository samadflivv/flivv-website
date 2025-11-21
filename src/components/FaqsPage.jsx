'use client';

import React, { useState, useRef } from "react";
// FIXED: Added useReducedMotion to the import list below
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";

// --- 1. ASSETS & CONFIG ---

// High-end moody architecture
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";
// A secondary image for the About section
const ABOUT_IMAGE_URL = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop";

const FAQS_DATA = [
  {
    id: "faq-1",
    question: "What defines your architectural philosophy?",
    answer:
      "We believe in 'Living Art'. Our philosophy merges functional minimalism with biophilic design, ensuring that every square foot serves both a purpose and an aesthetic desire. We don't just build spaces; we curate light, air, and flow.",
  },
  {
    id: "faq-2",
    question: "How do I schedule a private consultation?",
    answer:
      "Exclusivity is paramount. Use the request form below to initiate a dialogue. Our concierge team will vet your requirements and arrange a private viewing or a digital walkthrough tailored to your timezone.",
  },
  {
    id: "faq-3",
    question: "What is the legal framework of ownership?",
    answer:
      "Absolute transparency. All properties hold clear, unencumbered titles with full HMDA/RERA compliance. We provide a comprehensive 'Legal Dossier' prior to any financial commitment, allowing your counsel to verify every detail.",
  },
  {
    id: "faq-4",
    question: "Do you offer post-handover management?",
    answer:
      "Our relationship extends beyond the sale. We offer a 'White Glove' asset management service, handling leasing, maintenance, and concierge requests to ensure your asset appreciates without demanding your time.",
  },
];

// --- 2. UTILITY COMPONENTS ---

// Adds a cinematic film grain texture over the whole page
const GrainOverlay = () => (
  <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const AnimatedTitle = ({ text, className }) => {
  return (
    <h2 className={`overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className="block"
      >
        {text}
      </motion.span>
    </h2>
  );
};

// --- 3. CORE SECTIONS ---

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax Effects
  const yBg = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  const yText = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <header ref={ref} className="relative w-full h-[110vh] flex items-center justify-center overflow-hidden bg-[#0B0F19]">
      
      {/* Background Parallax Layer */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0"
      >
        <img
          src={HERO_IMAGE_URL}
          alt="Luxury Architecture"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/40 via-transparent to-[#0B0F19]" />
      </motion.div>

      {/* Text Content */}
      <motion.div 
        style={{ opacity: opacityText, y: yText }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="inline-block py-1 px-4 border border-white/20 rounded-full text-[10px] md:text-xs font-medium tracking-[0.3em] text-emerald-100/80 uppercase backdrop-blur-sm bg-white/5">
            Gulmohar Signature
          </span>
        </motion.div>
        
        <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[0.9] tracking-tight">
          Designed for <br />
          <span className="italic text-white/40">Perfection.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
          Unveiling the answers to your future legacy.
        </p>
      </motion.div>
    </header>
  );
};

const AccordionItem = ({ item, isOpen, onClick, index }) => {
  // This hook was missing in the previous import
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group border-b border-white/10 transition-all duration-500 ${isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"}`}
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full py-8 px-4 md:px-8 flex items-start md:items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-baseline gap-6">
           <span className={`font-mono text-xs text-white/30 transition-colors duration-300 ${isOpen ? "text-emerald-400/60" : ""}`}>
                0{index + 1}
           </span>
           <span
            className={`text-xl md:text-3xl font-serif transition-colors duration-300 ${
                isOpen ? "text-emerald-100" : "text-white/80 group-hover:text-white"
            }`}
            >
            {item.question}
            </span>
        </div>
        
        {/* Animated Icon */}
        <div className={`relative w-6 h-6 flex-shrink-0 ml-4 mt-1 md:mt-0 transition-transform duration-500 ${isOpen ? "rotate-45" : "rotate-0"}`}>
            <span className="absolute top-1/2 left-0 w-6 h-[1px] bg-white/40 group-hover:bg-white/80 transition-colors" />
            <span className="absolute top-0 left-1/2 h-6 w-[1px] bg-white/40 group-hover:bg-white/80 transition-colors" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.4, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { height: { duration: 0.3, ease: "easeInOut" }, opacity: { duration: 0.2 } },
            }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-14 md:pl-20 pr-8">
              <p className="text-base md:text-lg text-gray-400 font-light leading-loose max-w-3xl">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AboutSection = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0.5, 1], [0, -100]);

    return (
      <section className="relative py-32 px-6 md:px-12 bg-[#0B0F19] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: Image Composition */}
            <div className="relative">
                <motion.div 
                    style={{ y }}
                    className="relative z-10 overflow-hidden rounded-sm aspect-[4/5]"
                >
                    <img src={ABOUT_IMAGE_URL} alt="Interior Detail" className="w-full h-full object-cover" />
                    {/* Image Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
                </motion.div>
                
                {/* Decorative Border Element */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute -bottom-8 -left-8 w-full h-full border border-white/10 z-0 hidden md:block"
                />
            </div>

            {/* Right: Text Content */}
            <div>
                <div className="mb-8">
                     <span className="text-emerald-400/80 text-xs font-medium tracking-widest uppercase mb-4 block">Our Ethos</span>
                     <AnimatedTitle text="Constructing" className="text-5xl md:text-7xl font-serif text-white leading-none" />
                     <AnimatedTitle text="Elegance." className="text-5xl md:text-7xl font-serif text-white/50 italic leading-none" />
                </div>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-400 text-lg font-light leading-relaxed mb-10"
                >
                    We exist at the intersection of precision engineering and artistic intuition. 
                    Every project is a dialogue between the environment and the inhabitant, 
                    ensuring that our spaces do not just house people, but elevate their daily rituals.
                </motion.p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                    {[
                        { label: "Years Active", value: "22" },
                        { label: "Awards Won", value: "14" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 + (i * 0.1) }}
                        >
                            <div className="text-4xl font-serif text-white mb-2">{stat.value}</div>
                            <div className="text-xs text-white/40 tracking-widest uppercase">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </section>
    );
};

// --- 4. MAIN PAGE COMPONENT ---

const FaqsPage = () => {
  const [expandedId, setExpandedId] = useState("faq-1");

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="w-full bg-[#0B0F19] min-h-screen text-white relative font-sans selection:bg-emerald-900 selection:text-white">
      <GrainOverlay />
      
      <HeroSection />

      {/* FAQ SECTION */}
      <section className="relative z-20 -mt-32 pb-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Glassmorphism Card */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0B0F19]/80 backdrop-blur-2xl border border-white/10 rounded-t-3xl p-6 md:p-12 lg:p-20 shadow-2xl shadow-black"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                    <h3 className="text-emerald-400/80 font-medium tracking-widest uppercase text-xs mb-4">
                        Inquiries
                    </h3>
                    <h2 className="text-4xl md:text-5xl font-serif text-white">
                        Common Questions
                    </h2>
                </div>
                <p className="text-gray-400 text-sm md:text-base max-w-xs text-right hidden md:block">
                    Curated information for our prospective residents.
                </p>
            </div>

            <div className="space-y-0">
              {FAQS_DATA.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  index={index}
                  item={faq}
                  isOpen={expandedId === faq.id}
                  onClick={() => handleToggle(faq.id)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <AboutSection />
      
      {/* Footer Spacer for visuals */}
      <div className="h-32 bg-[#0B0F19]" />
    </main>
  );
};

export default FaqsPage;