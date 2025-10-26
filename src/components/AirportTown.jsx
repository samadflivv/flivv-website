'use client';

// pages/airport-town.js
import Head from "next/head";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
      <Head>
        <title>Airport Town — Flivv Developers</title>
        <meta name="description" content="Airport Town — premium open plots by Flivv Developers, 2 km from NH-44. Limited 36 plots. HMDA approved GP Layout." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Full page background color applied here */}
      <div className="min-h-screen w-full font-sans antialiased" style={{ backgroundColor: "#e0dfd8", color: "#44312b" }}>
        
        {/* HERO */}
        <section className="relative overflow-hidden" style={{ minHeight: "85vh" }}>
          <div
            ref={heroBgRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "linear-gradient(rgba(68,49,43,0.25), rgba(68,49,43,0.25)), url('https://source.unsplash.com/1800x1200/?plot,land,field')",
              willChange: "transform",
              transformOrigin: "center",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(224,223,216,0.18), rgba(224,223,216,0.85))" }} />

          {/* Floating decorative elements */}
          <div ref={addToFloating} className="absolute top-1/4 right-1/4 w-6 h-6 rounded-full" style={{ backgroundColor: "rgba(68,49,43,0.1)" }} />
          <div ref={addToFloating} className="absolute bottom-1/3 left-1/4 w-4 h-4 rounded-full" style={{ backgroundColor: "rgba(68,49,43,0.08)" }} />

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center">
            <div className="w-full lg:w-3/5 py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight"
                  style={{ color: "#44312b" }}
                >
                  Airport Town
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "80px" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-1 my-6"
                  style={{ backgroundColor: "#44312b" }}
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-5 text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed"
                  style={{ color: "#44312b" }}
                >
                  Premium open plots by Flivv Developers — just <strong>2 km</strong> from NH-44. Only <strong>36 exclusive plots</strong> with HMDA-approved GP layout.
                </motion.p>

                <motion.div 
                  className="mt-8 flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.a 
                    href="#contact" 
                    className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{ backgroundColor: "#44312b", color: "#e0dfd8" }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Register Interest
                    <ArrowRight />
                  </motion.a>
                  <motion.a 
                    href="#showcase" 
                    className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-medium border-2 transition-all duration-300"
                    style={{ borderColor: "#44312b", color: "#44312b" }}
                    whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(68,49,43,0.05)" }}
                  >
                    View Site Plan
                  </motion.a>
                </motion.div>

                <motion.div 
                  className="mt-8 text-sm text-[#44312b]/80 max-w-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex flex-wrap gap-3">
                    {[
                      { text: "19 km from RGIA", icon: <MapPin /> },
                      { text: "28 km from Aramghar", icon: <MapPin /> },
                      { text: "2 km from NH-44", icon: <Road /> },
                      { text: "2 km from Kothur Town", icon: <Home /> }
                    ].map((item, index) => (
                      <motion.span 
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-2 bg-[#44312b]/10 rounded-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        {item.icon}
                        {item.text}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Hero right accent card */}
            <div className="hidden lg:block lg:w-2/5">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                className="ml-8 bg-white rounded-2xl p-6 shadow-2xl"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-lg font-bold flex items-center gap-2" style={{ color: "#44312b" }}>
                  <CheckCircle />
                  Quick Facts
                </div>
                <div className="mt-4 space-y-4 text-sm">
                  {[
                    { label: "Plots", value: "36", icon: <Home /> },
                    { label: "Plot Sizes", value: "From 200 sq. yards", icon: <Document /> },
                    { label: "Roads", value: "30 ft internal", icon: <Road /> },
                    { label: "Approval", value: "HMDA GP (LRS)", icon: <Shield /> }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-2 text-gray-700">
                        {item.icon}
                        {item.label}
                      </div>
                      <div className="font-semibold" style={{ color: "#44312b" }}>{item.value}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.a 
                  href="#contact" 
                  className="mt-6 inline-flex items-center justify-center w-full text-center py-3 rounded-lg font-semibold transition-all duration-300"
                  style={{ backgroundColor: "#44312b", color: "#e0dfd8" }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  Get Brochure
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* decorative wave separator */}
          <div className="mt-6">
            <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
              <path d="M0,0 C360,60 1080,0 1440,60 L1440 60 L0 60 Z" fill="#e0dfd8" />
            </svg>
          </div>
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
                className="rounded-2xl overflow-hidden shadow-2xl relative bg-white"
                whileHover={{ y: -5 }}
              >
                <img 
                  src="https://source.unsplash.com/1200x900/?site-plan,real-estate" 
                  alt="Airport Town site plan" 
                  className="w-full object-cover h-96 md:h-[520px] transition-transform duration-700 hover:scale-105" 
                />
                <div className="absolute left-6 bottom-6 bg-[#44312b] text-[#e0dfd8] px-4 py-3 rounded-lg shadow-lg">
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
                    className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-full" style={{ backgroundColor: "rgba(68,49,43,0.1)" }}>
                        {item.icon}
                      </div>
                      <div className="text-sm font-semibold" style={{ color: "#44312b" }}>{item.title}</div>
                    </div>
                    <div className="text-xs text-gray-600 ml-11">{item.desc}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: Info panels & CTAs */}
            <div className="order-1 lg:order-2 flex flex-col gap-6">
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-lg"
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
                <p className="mt-4 text-gray-700 leading-relaxed">A rare combination of strategic location and scarcity — only 36 plots. Ready-to-construct layout with approvals, wide internal roads, and neighbourhood conveniences nearby that support both living & investment growth.</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "HMDA Approved", desc: "GP Layout under LRS", icon: <Shield /> },
                    { title: "Ready to Construct", desc: "No long delays", icon: <Home /> }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="p-4 rounded-lg flex items-start gap-3"
                      style={{ backgroundColor: "#44312b", color: "#e0dfd8" }}
                      whileHover={{ scale: 1.02 }}
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
                    className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                    style={{ backgroundColor: "#44312b", color: "#e0dfd8" }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    Check Availability
                    <ArrowRight />
                  </motion.a>
                  <motion.a 
                    href="#gallery" 
                    className="px-6 py-3 rounded-lg font-medium border-2 flex items-center gap-2 transition-all"
                    style={{ borderColor: "#44312b", color: "#44312b" }}
                    whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(68,49,43,0.05)" }}
                  >
                    View Photos
                  </motion.a>
                </div>
              </motion.div>

              {/* Investment Snapshot */}
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-lg"
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
                      <div className="text-3xl font-bold" style={{ color: "#44312b" }}>{item.value}</div>
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
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20"
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
                className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-3 rounded-full inline-block mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(68,49,43,0.1)" }}>
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
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 bg-[#f7f6f4] rounded-3xl"
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
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#44312b" }} />
                    {item}
                  </motion.li>
                ))}
              </ul>

              <div className="flex gap-4">
                <motion.a 
                  href="#contact" 
                  className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                  style={{ backgroundColor: "#44312b", color: "#e0dfd8" }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Speak to Sales
                  <ArrowRight />
                </motion.a>
                <motion.a 
                  href="#gallery" 
                  className="px-6 py-3 rounded-lg font-medium border-2 flex items-center gap-2 transition-all"
                  style={{ borderColor: "#44312b", color: "#44312b" }}
                  whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(68,49,43,0.05)" }}
                >
                  Explore Gallery
                </motion.a>
              </div>
            </motion.div>

            <motion.div 
              className="w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl"
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

        {/* GALLERY */}
        <motion.section 
          id="gallery" 
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20"
          {...fadeInUp}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold mb-4" style={{ color: "#44312b" }}>Project Gallery</h3>
            <p className="text-gray-700 max-w-2xl mx-auto">High-resolution visuals help buyers visualize the potential of their investment. Each plot offers unique opportunities for construction and design.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              "https://source.unsplash.com/1000x800/?plot,land,road",
              "https://source.unsplash.com/1000x800/?plot,field",
              "https://source.unsplash.com/1000x800/?village,road",
              "https://source.unsplash.com/1000x800/?construction,site",
              "https://source.unsplash.com/1000x800/?aerial,land",
              "https://source.unsplash.com/1000x800/?infrastructure,road"
            ].map((src, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="overflow-hidden">
                  <img 
                    src={src} 
                    alt={`Airport Town ${i + 1}`} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="p-4 bg-white">
                  <div className="text-sm font-medium" style={{ color: "#44312b" }}>Plot View {i + 1}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* TESTIMONIAL */}
        <motion.section 
          className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20"
          {...fadeInUp}
        >
          <motion.div 
            className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl"
            whileHover={{ y: -5 }}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden shadow-lg"
              >
                <img src="https://source.unsplash.com/200x200/?person,portrait" alt="buyer" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-6"
                style={{ color: "#44312b" }}
              >
                What Our Buyers Say
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-700 italic mb-6 max-w-2xl mx-auto"
              >
                "Flivv's Airport Town offered us a perfect mix of location and value. The layout and approvals made the purchase smooth and hassle-free. We're excited to start construction on our dream home."
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-sm font-semibold"
                style={{ color: "#44312b" }}
              >
                — Mohammed Haji, early buyer
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* CONTACT FORM */}
        <motion.section 
          id="contact" 
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20"
          {...fadeInUp}
        >
          <motion.div 
            className="bg-[#44312b] text-[#e0dfd8] rounded-3xl p-8 md:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
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

              <div className="text-sm opacity-85">
                <div className="font-semibold mb-2">Contact Flivv Developers</div>
                <div>Email: <span className="underline">info@flivv.in</span></div>
                <div className="mt-1">Phone: +91 XXXXXXXXXX</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div id="hubspot-form" className="bg-white text-[#44312b] rounded-2xl p-6 shadow-lg">
                <div className="text-center font-bold text-xl mb-6">Enquiry Form</div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("This is a placeholder form. Replace with your HubSpot form ID in the script section.");
                  }}
                  className="space-y-4"
                >
                  {["Your name", "Phone number", "Email address"].map((placeholder, index) => (
                    <motion.input 
                      key={index}
                      name={placeholder.toLowerCase().replace(' ', '_')}
                      required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#44312b] focus:ring-2 focus:ring-[#44312b]/20 transition-all"
                      placeholder={placeholder}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    />
                  ))}
                  <motion.button 
                    type="submit" 
                    className="w-full py-3 rounded-lg mt-4 font-semibold flex items-center justify-center gap-2 transition-all"
                    style={{ backgroundColor: "#44312b", color: "#e0dfd8" }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    Submit Enquiry
                    <ArrowRight />
                  </motion.button>
                </form>

                <div className="mt-4 text-xs text-gray-500 text-center">
                  Or the official HubSpot form will load here if you replace the portalId/formId below.
                </div>

                <script
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: `
                      (function loadHs(){
                        if(window.hbspt && window.hbspt.forms){
                          try{
                            hbspt.forms.create({
                              portalId: "YOUR_HUBSPOT_PORTAL_ID",
                              formId: "YOUR_HUBSPOT_FORM_ID",
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

        {/* CTA SECTION */}
        <motion.section 
          className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div 
            className="bg-[#44312b] text-[#e0dfd8] p-12 rounded-3xl shadow-2xl"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Secure Your Plot?</h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">Only 36 exclusive plots available. Don't miss this opportunity to invest in a premium location with strong growth potential.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="#contact" 
                className="px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                style={{ backgroundColor: "#e0dfd8", color: "#44312b" }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                Book Site Visit
                <ArrowRight />
              </motion.a>
              <motion.a 
                href="tel:+91XXXXXXXXXX"
                className="px-8 py-4 rounded-lg font-medium border-2 flex items-center justify-center gap-2 transition-all"
                style={{ borderColor: "#e0dfd8", color: "#e0dfd8" }}
                whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(224,223,216,0.1)" }}
              >
                Call Now
              </motion.a>
            </div>
          </motion.div>
        </motion.section>

        {/* small spacer */}
        <div className="h-16" />
      </div>
    </>
  );
}