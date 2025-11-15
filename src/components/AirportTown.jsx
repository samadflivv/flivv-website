'use client';

import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Icons (using simple outline icons)
const MapPin = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const Home = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const CheckCircle = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Road = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>;
const Shield = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const Document = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const ArrowRight = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;

gsap.registerPlugin && gsap.registerPlugin(ScrollTrigger);

export default function AirportTown() {
  const heroBgRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const [activeImage, setActiveImage] = useState(0);

  // Enhanced gallery images with better descriptions
  const galleryImages = [
    { src: "https://source.unsplash.com/1200x800/?modern,architecture", title: "Master Plan Overview" },
    { src: "https://source.unsplash.com/1200x800/?landscape,development", title: "Plot Layout" },
    { src: "https://source.unsplash.com/1200x800/?construction,site", title: "Infrastructure Development" },
    { src: "https://source.unsplash.com/1200x800/?road,modern", title: "30ft Internal Roads" },
    { src: "https://source.unsplash.com/1200x800/?aerial,view", title: "Aerial Perspective" },
    { src: "https://source.unsplash.com/1200x800/?security,camera", title: "Security Features" }
  ];

  useEffect(() => {
    // GSAP Parallax for hero background
    try {
      gsap.to(heroBgRef.current, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: heroBgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    } catch (e) {
      // fail gracefully
    }

    // Floating animation for decorative elements
    floatingElementsRef.current.forEach((el) => {
      gsap.to(el, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });

    // Enhanced animations for cards
    gsap.from(".feature-card", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 80%",
        end: "bottom 20%",
      }
    });

    // Load HubSpot script (deferred)
    if (typeof window !== "undefined" && !window.hbspt) {
      const s = document.createElement("script");
      s.src = "https://js.hsforms.net/forms/v2.js";
      s.defer = true;
      document.head.appendChild(s);
    }

    // Cleanup ScrollTriggers on unmount
    return () => {
      try {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      } catch (e) {}
    };
  }, []);

  const addToFloating = (el) => {
    if (el && !floatingElementsRef.current.includes(el)) {
      floatingElementsRef.current.push(el);
    }
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.1 }
  };

  return (
    <>

      {/* Enhanced Background with subtle gradient */}
      <div className="min-h-screen w-full font-sans antialiased bg-gradient-to-br from-[#e0dfd8] via-[#f0efe8] to-[#e8e7e0]" style={{ color: "#44312b" }}>
        
        {/* Enhanced HERO SECTION */}
        <section className="relative overflow-hidden h-screen flex items-center justify-center">
          {/* Dynamic Background with multiple layers */}
          <div
            ref={heroBgRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "linear-gradient(rgba(68,49,43,0.15), rgba(68,49,43,0.15)), url('https://source.unsplash.com/1920x1080/?luxury,real-estate,modern')",
            }}
          />
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#e0dfd8]/40 via-transparent to-[#44312b]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#e0dfd8] via-transparent to-transparent" />

          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/10 rounded-full"
                style={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Limited Plots Available</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                  style={{ color: "#44312b" }}
                >
                  Airport <span className="bg-gradient-to-r from-[#44312b] to-[#8b7355] bg-clip-text text-transparent">Town</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-xl text-[#44312b]/90 leading-relaxed max-w-2xl"
                >
                  Airport Town by Flivv Developers is a premium, R1-zone project just 2 km from Bangalore Highway (NH-44). With only 36 plots, 30 ft internal roads, and quality development by Flivv, it offers strong residential and investment value. The GP layout is HMDA-approved under LRS, making it ideal for both construction and long-term returns. Plot sizes start at 200 sq. yards. Close to Kothur town and daily conveniences, Airport Town is perfectly placed for future growth.
                </motion.p>

                {/* Enhanced CTA Buttons */}
                <motion.div 
                  className="mt-12 flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.a 
                    href="#contact" 
                    className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl text-lg font-semibold overflow-hidden"
                    style={{ backgroundColor: "#44312b", color: "#e0dfd8" }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Inquire Now
                      <ArrowRight />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8b7355] to-[#44312b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                  
                  <motion.a 
                    href="#gallery" 
                    className="group inline-flex items-center justify-center px-8 py-4 rounded-2xl text-lg font-medium border-2 backdrop-blur-sm"
                    style={{ borderColor: "#44312b", color: "#44312b", backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(68,49,43,0.05)" }}
                  >
                    <span className="flex items-center gap-2">
                      Virtual Tour
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Enhanced Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="hidden lg:block"
              >
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="p-2 rounded-full bg-[#44312b]/10">
                      <CheckCircle />
                    </div>
                    Quick Glance 
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { icon: <Home />, label: "No. Of Units", value: "36", suffix: "Only" },
                      { icon: <Document />, label: "Plot Sizes", value: "200+", suffix: "sq. yards" },
                      { icon: <Road />, label: "Infrastructure", value: "30", suffix: "ft internal" },
                      { icon: <Shield />, label: "Approval", value: "HMDA GP", suffix: "LRS" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-2xl hover:bg-[#44312b]/5 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-xl bg-[#44312b]/10">
                            {item.icon}
                          </div>
                          <div>
                            <div className="font-semibold">{item.label}</div>
                            <div className="text-sm text-gray-600">{item.suffix}</div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold" style={{ color: "#44312b" }}>
                          {item.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.a 
                    href="#contact" 
                    className="w-full mt-6 inline-flex items-center justify-center py-4 rounded-2xl font-semibold transition-all"
                    style={{ backgroundColor: "#44312b", color: "#e0dfd8" }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    Get Brochure
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              className="w-6 h-10 border-2 rounded-full border-[#44312b] flex justify-center"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-1 h-3 bg-[#44312b] rounded-full mt-2" />
            </motion.div>
          </motion.div>
        </section>

        {/* SECOND SECTION - Showcase */}
        <motion.section 
          id="showcase" 
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20"
          {...fadeInUp}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Large interactive mock-up / site-plan */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="rounded-3xl overflow-hidden shadow-2xl relative bg-white/90 backdrop-blur-sm border border-white/20"
                whileHover={{ y: -5 }}
              >
                <img 
                  src="https://source.unsplash.com/1200x900/?site-plan,real-estate" 
                  alt="Airport Town site plan" 
                  className="w-full object-cover h-96 md:h-[450px] transition-transform duration-700 hover:scale-105" 
                />
                <div className="absolute left-6 bottom-6 bg-[#44312b] text-[#e0dfd8] px-4 py-3 rounded-xl shadow-lg">
                  <div className="text-sm font-semibold">Exclusive - Only 36 Plots</div>
                  <div className="text-xs mt-1">Plot sizes from 200 sq. yards</div>
                </div>
              </motion.div>

              {/* Feature highlights */}
              <motion.div 
                className="mt-8 grid grid-cols-2 gap-4"
                variants={staggerChildren}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                {[
                  { title: "Infrastructure", desc: "CC roads, street lighting & concealed drainage", icon: <Road /> },
                  { title: "Connectivity", desc: "Quick access to NH-44 and RGIA", icon: <MapPin /> }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUp}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-[#44312b] to-[#8b7355] text-white">
                        {item.icon}
                      </div>
                      <div className="text-lg font-semibold" style={{ color: "#44312b" }}>{item.title}</div>
                    </div>
                    <div className="text-gray-600 ml-14">{item.desc}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: Info panels & CTAs */}
            <div className="order-1 lg:order-2 flex flex-col gap-6">
              <motion.div 
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-bold flex items-center gap-2" style={{ color: "#44312b" }}>
                  <CheckCircle />
                  Why Airport Town?
                </h3>
                <p className="mt-4 text-gray-700 leading-relaxed">Airport Town, strategically positioned on the Kothur–Penjerla road, stands out as one of the most promising investment opportunities, thanks to its proximity to the city and being just 19 km from the airport. With Flivv’s developmental enhancements, the project is poised to deliver impressive and reliable returns for investors in the coming years!</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "HMDA Approved", desc: "GP Layout under LRS", icon: <Shield /> },
                    { title: "Ready to Construct", desc: "No long delays", icon: <Home /> }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="p-4 rounded-xl flex items-start gap-3 bg-gradient-to-br from-[#44312b] to-[#8b7355] text-white shadow-lg"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      {item.icon}
                      <div>
                        <div className="text-sm font-semibold">{item.title}</div>
                        <div className="text-xs mt-1 opacity-90">{item.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex gap-4">
                  <motion.a 
                    href="#contact" 
                    className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
                    style={{ backgroundColor: "#44312b", color: "#e0dfd8" }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    Check Availability
                    <ArrowRight />
                  </motion.a>
                  <motion.a 
                    href="#gallery" 
                    className="px-6 py-3 rounded-xl font-medium border-2 flex items-center gap-2 transition-all"
                    style={{ borderColor: "#44312b", color: "#44312b" }}
                    whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(68,49,43,0.05)" }}
                  >
                    View Photos
                  </motion.a>
                </div>
              </motion.div>

              {/* Investment Snapshot */}
              <motion.div 
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h4 className="text-xl font-semibold flex items-center gap-2" style={{ color: "#44312b" }}>
                  <Document />
                  Investment Snapshot
                </h4>
                <div className="mt-6 grid grid-cols-3 gap-6">
                  {[
                    { value: "36", label: "Plots" },
                    { value: "200+", label: "sq. yards" },
                    { value: "24/7", label: "Security" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      <div className="text-3xl font-bold bg-gradient-to-br from-[#44312b] to-[#8b7355] bg-clip-text text-transparent">{item.value}</div>
                      <div className="text-sm text-gray-600 mt-1">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-gray-600">Nearby conveniences, growing connectivity corridors, and proximity to RGIA make this project well-positioned for both appreciation and owner-use.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* FEATURE GRID */}
        <motion.section 
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 features-section"
          {...fadeInUp}
        >
          <motion.h3 
            className="text-3xl font-bold mb-12 text-center"
            style={{ color: "#44312b" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Project Highlights
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              { title: "30 ft Internal Roads", desc: "Wide internal carriageways for smooth drive & planning", icon: <Road /> },
              { title: "CC Roads", desc: "Durable cement concrete paving for low maintenance", icon: <Document /> },
              { title: "Electricity", desc: "Reliable electrical infrastructure & street lighting", icon: <CheckCircle /> },
              { title: "24/7 Security", desc: "Gated, patrolled, and secure community", icon: <Shield /> },
              { title: "HMDA Approved", desc: "GP layout under LRS — legal and ready", icon: <Shield /> },
              { title: "Close to Kothur", desc: "Daily essentials within short distance", icon: <MapPin /> },
            ].map((f, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="feature-card bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 group"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#44312b] to-[#8b7355] w-fit mb-6 group-hover:scale-110 transition-transform duration-300 text-white">
                  {f.icon}
                </div>
                <div className="text-xl font-semibold mb-3" style={{ color: "#44312b" }}>{f.title}</div>
                <div className="text-gray-700 leading-relaxed">{f.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* LOCATION + MAP */}
        <motion.section 
          id="map" 
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 bg-white/50 backdrop-blur-sm rounded-3xl"
          {...fadeInUp}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: "#44312b" }}>
                <MapPin />
                Location & Connectivity
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed">Airport Town sits strategically near major connectivity hubs — making it suitable for both long-term investment and owners who want quick travel access.</p>

              <ul className="space-y-4 mb-8">
                {[
                  "19 Km from Rajiv Gandhi International Airport (RGIA)",
                  "28 Km from Aramghar",
                  "2 Km from NH-44 (Bangalore Highway)",
                  "2 Km from Kothur Town"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-3 text-gray-700"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#44312b] to-[#8b7355]" />
                    {item}
                  </motion.li>
                ))}
              </ul>

              <div className="flex gap-4">
                <motion.a 
                  href="#contact" 
                  className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
                  style={{ backgroundColor: "#44312b", color: "#e0dfd8" }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Speak to Sales
                  <ArrowRight />
                </motion.a>
                <motion.a 
                  href="#gallery" 
                  className="px-6 py-3 rounded-xl font-medium border-2 flex items-center gap-2 transition-all"
                  style={{ borderColor: "#44312b", color: "#44312b" }}
                  whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(68,49,43,0.05)" }}
                >
                  Explore Gallery
                </motion.a>
              </div>
            </motion.div>

            <motion.div 
              className="w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
            >
              <iframe
                title="Airport Town map"
                src="https://www.google.com/maps?q=Kothur+India&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* CTA SECTION */}
        <motion.section 
          className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div 
            className="bg-gradient-to-br from-[#44312b] to-[#8b7355] text-[#e0dfd8] p-12 rounded-3xl shadow-2xl"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Secure Your Plot?</h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">Only 36 exclusive plots available. Don't miss this opportunity to invest in a premium location with strong growth potential.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="#contact" 
                className="px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg"
                style={{ backgroundColor: "#e0dfd8", color: "#44312b" }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                Book Site Visit
                <ArrowRight />
              </motion.a>
              <motion.a 
                href="tel:+91XXXXXXXXXX"
                className="px-8 py-4 rounded-xl font-medium border-2 flex items-center justify-center gap-2 transition-all"
                style={{ borderColor: "#e0dfd8", color: "#e0dfd8" }}
                whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(224,223,216,0.1)" }}
              >
                Call Now
              </motion.a>
            </div>
          </motion.div>
        </motion.section>

        {/* Enhanced GALLERY SECTION */}
        <motion.section 
          id="gallery" 
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20"
          {...fadeInUp}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-br from-[#44312b] to-[#8b7355] bg-clip-text text-transparent">Project Gallery</h3>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">High-resolution visuals help buyers visualize the potential of their investment. Each plot offers unique opportunities for construction and design.</p>
          </motion.div>

          {/* Main Gallery Image */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 border border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img 
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
              <h3 className="text-2xl font-bold text-white mb-2">{galleryImages[activeImage].title}</h3>
              <div className="flex items-center gap-2 text-white/80">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>{activeImage + 1} of {galleryImages.length}</span>
              </div>
            </div>
          </motion.div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((image, index) => (
              <motion.button
                key={index}
                className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border-2 ${
                  activeImage === index ? 'border-[#44312b] scale-105' : 'border-transparent hover:scale-105'
                }`}
                whileHover={{ y: -4 }}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={image.src}
                  alt={image.title}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* CONTACT FORM */}
        <motion.section 
          id="contact" 
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20"
          {...fadeInUp}
        >
          <motion.div 
            className="bg-gradient-to-br from-[#44312b] to-[#8b7355] text-[#e0dfd8] rounded-3xl p-8 md:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-2 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <h3 className="text-3xl font-bold mb-6">Register Your Interest</h3>
              <p className="text-lg mb-8 opacity-90">Fill the short form and our sales team will contact you with brochure, pricing & plot availability.</p>

              <ul className="space-y-4 mb-8">
                {[
                  "HMDA approved GP layout (LRS)",
                  "Only 36 exclusive plots",
                  "Plot sizes from 200 sq. yards",
                  "Ready for immediate construction"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CheckCircle />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div id="hubspot-form" className="bg-white text-[#44312b] rounded-2xl pt-10 shadow-lg">
                <div className="text-center font-semibold text-4xl">Enquiry Form</div>

                <script
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: `
                      (function loadHs(){
                        if(window.hbspt && window.hbspt.forms){
                          try{
                            hbspt.forms.create({
                              portalId: "21626983",
                              formId: "7b23bd69-e828-4e55-b869-b895c8233781",
                              target: "#hubspot-form"
                            });
                          } catch(e) { console.error('HubSpot form error', e); }
                        } else {
                          setTimeout(loadHs, 500);
                        }
                      })();
                    `,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* small spacer */}
        <div className="h-16" />
      </div>
    </>
  );
}