'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GulmoharHomes() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const amenitiesRef = useRef(null);
  const galleryRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(heroRef.current.querySelectorAll('.hero-element'), {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
      });

      // Floating elements in hero
      gsap.to(heroRef.current.querySelectorAll('.float-element'), {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5
      });

      // Stats counter animation
      gsap.from(statsRef.current.querySelectorAll('.stat-card'), {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)'
      });

      // Feature cards animation
      gsap.from(featuresRef.current.querySelectorAll('.feature-card'), {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 75%'
        },
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out'
      });

      // Amenities animation
      gsap.from(amenitiesRef.current.querySelectorAll('.amenity-item'), {
        scrollTrigger: {
          trigger: amenitiesRef.current,
          start: 'top 80%'
        },
        opacity: 0,
        scale: 0.8,
        stagger: 0.08,
        duration: 0.6
      });

      // Gallery animation
      gsap.from(galleryRef.current.querySelectorAll('.gallery-item'), {
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 85%'
        },
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.7
      });

    }, heroRef);

    return () => ctx && ctx.revert();
  }, []);

  // Professional icons in #602437
  const professionalIcons = {
    security: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
      </svg>
    ),
    approval: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    location: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    community: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    infrastructure: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
      </svg>
    ),
    investment: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    )
  };

  const amenities = [
    {
      name: 'HMDA & RERA Approved',
      description: 'Fully compliant with all regulatory requirements',
      icon: professionalIcons.approval
    },
    {
      name: 'Premium Location',
      description: 'Strategic location in Farooqnagar, Shadnagar',
      icon: professionalIcons.location
    },
    {
      name: 'Community Living',
      description: 'Shared amenities with Gulmohar Villas',
      icon: professionalIcons.community
    },
    {
      name: 'Modern Infrastructure',
      description: 'Well-planned layout across 10 acres',
      icon: professionalIcons.infrastructure
    },
    {
      name: 'Secure Environment',
      description: 'Gated community with 24/7 security',
      icon: professionalIcons.security
    },
    {
      name: 'Investment Opportunity',
      description: 'Attractive returns in growing area',
      icon: professionalIcons.investment
    }
  ];

  const gallery = [
    { id: 1, title: 'Master Plan', category: 'Architecture' },
    { id: 2, title: 'Connectivity Map', category: 'Location' },
    { id: 3, title: 'Site Layout', category: 'Planning' },
    { id: 4, title: 'Amenities', category: 'Lifestyle' },
    { id: 5, title: 'Nearby Growth', category: 'Investment' },
    { id: 6, title: 'Approvals & Docs', category: 'Legal' },
    { id: 7, title: 'Night View', category: 'Lifestyle' },
    { id: 8, title: 'Landscape', category: 'Design' }
  ];

  const projectStats = [
    { number: '10', label: 'Acres Total Area', suffix: '' },
    { number: '110', label: 'Villa Plots', suffix: '+' },
    { number: '2', label: 'Entrance Points', suffix: '' },
    { number: '100', label: 'HMDA Approved', suffix: '%' }
  ];

  function openLightbox(idx) {
    setLightboxIndex(idx);
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    setLightboxIndex(-1);
    document.body.style.overflow = '';
  }

  function prevLightbox() {
    setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length);
  }

  function nextLightbox() {
    setLightboxIndex((i) => (i + 1) % gallery.length);
  }

  useEffect(() => {
    function onKey(e) {
      if (lightboxIndex >= 0) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen bg-white text-slate-800" ref={heroRef}>
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#602437] via-[#7a2d4a] to-[#3a1622] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#E05780]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#E05780]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        {/* Floating Elements */}
        <div className="float-element absolute top-20 left-20 w-4 h-4 bg-[#E05780]/30 rounded-full"></div>
        <div className="float-element absolute top-40 right-32 w-3 h-3 bg-white/20 rounded-full"></div>
        <div className="float-element absolute bottom-32 left-1/4 w-2 h-2 bg-[#E05780]/40 rounded-full"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-12 min-h-screen">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div 
              className="hero-element"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="w-2 h-2 bg-[#E05780] rounded-full animate-pulse"></span>
                <span className="text-sm text-white/90 font-medium">HMDA & RERA APPROVED</span>
              </div>
            </motion.div>

            <motion.h1 
              className="hero-element text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Gulmohar
              <span className="block text-[#E05780] font-normal mt-2">Homes</span>
            </motion.h1>

            <motion.p 
              className="hero-element text-xl text-white/90 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Extending the legacy of Gulmohar Villas — 10 acres of premium villa plots in Farooqnagar, Shadnagar. 
              Where modern luxury meets timeless comfort.
            </motion.p>

            <motion.div 
              className="hero-element flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#E05780] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Download Brochure
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold backdrop-blur-sm hover:bg-white hover:text-[#602437] transition-all duration-300"
              >
                Schedule Site Visit
              </motion.button>
            </motion.div>
          </div>

          {/* Visual Card */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              className="hero-element relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
                <div className="aspect-video rounded-2xl overflow-hidden relative bg-gradient-to-br from-[#602437] to-[#E05780]">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-semibold mb-4">Premium Villa Plots</h3>
                      <p className="text-white/90 leading-relaxed">
                        110 exclusive plots across 10 acres with dual entrance points and premium amenities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#E05780] rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 rounded-full"></div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/70 text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-white" ref={statsRef}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {projectStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                className="stat-card bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl lg:text-5xl font-light text-[#602437] mb-3 group-hover:text-[#E05780] transition-colors">
                  {stat.number}<span className="text-[#E05780]">{stat.suffix}</span>
                </div>
                <div className="text-gray-600 font-medium uppercase tracking-wider text-sm">
                  {stat.label}
                </div>
                <div className="w-12 h-0.5 bg-[#E05780] mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Enhanced Design */}
      <section className="py-20 bg-gradient-to-br from-[#E05780] to-[#d14a72]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-white"
            >
              <h2 className="text-4xl font-light mb-8 leading-tight">
                Building on a Legacy<br />
                <span className="font-normal">of Excellence</span>
              </h2>
              
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  Gulmohar Villas stands as one of our proudest achievements, a premium HMDA-approved villa plot project 
                  that practically sold itself and set a benchmark in both quality and appeal.
                </p>
                <p>
                  Building on this legacy, we are now excited to introduce Gulmohar Homes, an extension of this successful 
                  development, with a vision to recreate the same floral serenity and aesthetic charm.
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-8 inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                <span className="font-semibold">Learn More About Our Legacy</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                "HMDA & RERA Approved",
                "10 Acres Premium Development", 
                "110 Exclusive Villa Plots",
                "Shared Amenities",
                "Dual Entrance Points",
                "Social Infrastructure"
              ].map((highlight, index) => (
                <motion.div
                  key={highlight}
                  whileHover={{ scale: 1.05 }}
                  className="feature-card bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-white group hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-2xl mb-3 opacity-80 group-hover:opacity-100">✓</div>
                  <h3 className="font-semibold text-sm leading-tight">{highlight}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Section */}
      <section className="py-20 bg-white" ref={featuresRef}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-[#602437] mb-4">
              Why Choose <span className="font-normal">Gulmohar Homes</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A refined blend of security, location and long-term value — designed for families and investors alike.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Peaceful Retreat',
                description: 'A tranquil escape with landscaped pockets and privacy-first planning, embracing the "home away from home" concept.'
              },
              {
                title: 'Community Amenities',
                description: 'Shared amenity blocks with Gulmohar Villas foster community living and social events.'
              },
              {
                title: 'Regulatory Compliance',
                description: 'RERA & HMDA backing ensures high-quality development standards and long-term security.'
              },
              {
                title: 'Strategic Connectivity',
                description: 'Dual entrance points offer seamless connectivity and ease of access from multiple directions.'
              },
              {
                title: 'Proven Track Record',
                description: 'Built on the successful legacy of Gulmohar Villas, ensuring quality and reliability.'
              },
              {
                title: 'Investment Potential',
                description: 'Attractive returns in a rapidly developing corridor with strong appreciation potential.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -8, scale: 1.02 }}
                className="feature-card bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-3xl text-[#602437] mb-4 group-hover:text-[#E05780] transition-colors">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-semibold text-[#602437] mb-4 group-hover:text-[#E05780] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="w-12 h-0.5 bg-[#E05780] mt-6 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Amenities Section */}
      <section className="py-20 bg-gradient-to-br from-[#E05780] to-[#d14a72]" ref={amenitiesRef}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-white mb-4">
              Premium <span className="font-normal">Amenities</span>
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Designed for modern living with attention to every detail and your comfort in mind.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.name}
                whileHover={{ scale: 1.05, y: -5 }}
                className="amenity-item bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-[#602437] bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
                    {amenity.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {amenity.name}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section className="py-20 bg-white" ref={galleryRef}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-[#602437] mb-4">
              Project <span className="font-normal">Gallery</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore master plans, location maps, and visualizations of Gulmohar Homes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((item, index) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.03 }}
                className="gallery-item group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden relative shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="text-3xl text-gray-400 mb-3">📐</div>
                      <h3 className="font-semibold text-gray-700">{item.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{item.category}</p>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                    <div className="p-4 w-full bg-gradient-to-t from-black/60 to-transparent transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                      <p className="text-white/80 text-xs">{item.category}</p>
                    </div>
                  </div>
                  
                  {/* View indicator */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Developer Contact Section */}
      <section className="py-20 bg-gradient-to-br from-[#E05780] to-[#d14a72]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-white"
            >
              <h2 className="text-4xl font-light mb-6">
                About <span className="font-normal">Flivv Developers</span>
              </h2>
              
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  At Flivv, we've always prioritized quality development in every project we undertake, 
                  and Gulmohar Homes is no exception.
                </p>
                <p>
                  With a clear vision to replicate and enhance the success of Gulmohar Villas, 
                  this project is set to become another standout addition to our growing project portfolio.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                {[
                  { label: 'Projects Completed', value: '25+' },
                  { label: 'Years Experience', value: '15+' },
                  { label: 'Happy Customers', value: '500+' },
                  { label: 'Awards Won', value: '12' }
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-white/80 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-semibold text-[#602437] mb-6">Request Callback</h3>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E05780] focus:border-transparent outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E05780] focus:border-transparent outline-none transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E05780] focus:border-transparent outline-none transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full bg-[#602437] text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Request Call Back
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-light text-[#602437] mb-6">
              Ready to Invest in Your <span className="font-normal">Dream Villa Plot?</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join the legacy of Gulmohar Villas and secure your place in Gulmohar Homes today. 
              Limited plots available at exclusive introductory prices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#602437] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Download Detailed Brochure
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#602437] text-[#602437] px-8 py-4 rounded-lg font-semibold hover:bg-[#602437] hover:text-white transition-all duration-300"
              >
                Schedule Private Tour
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex >= 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            <button 
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm transition-all z-10"
            >
              Close
            </button>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-4xl text-gray-400 mb-4">📐</div>
                  <h3 className="text-2xl font-semibold text-gray-800">{gallery[lightboxIndex].title}</h3>
                  <p className="text-gray-600 mt-2">{gallery[lightboxIndex].category}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-6 bg-gray-50">
                <button 
                  onClick={prevLightbox}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                
                <div className="text-sm text-gray-600">
                  {lightboxIndex + 1} of {gallery.length}
                </div>
                
                <button 
                  onClick={nextLightbox}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}