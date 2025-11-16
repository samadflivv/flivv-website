'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function GulmoharHomes() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const formRef = useRef(null);
  const observerRef = useRef(null);
  const fallbackTimeoutRef = useRef(null);

  // HubSpot identifiers (from your snippet)
  const PORTAL_ID = '21626983';
  const FORM_ID = '6450d9aa-617b-413b-93b4-9aa7f5450ed6';
  const REGION = 'na2';
  const EMBED_SRC = `https://js-${REGION}.hsforms.net/forms/embed/${PORTAL_ID}.js`;
  const V2_SRC = 'https://js.hsforms.net/forms/v2.js';

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
    ),
    architecture: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
  <path d="M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7zM17 18h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z"/>
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
    { id: 6, title: 'Approvals & Docs', category: 'Legal' }
  ];

  const projectStats = [
    { number: '10', label: 'Acres Total Area', suffix: '' },
    { number: '110', label: 'Villa Plots', suffix: '+' },
    { number: '2', label: 'Entrance Points', suffix: '' },
    { number: '100', label: 'HMDA Approved', suffix: '%' }
  ];

  /**
   * Utility: append script once (returns the appended script element)
   */
  const appendScriptOnce = (src, id) => {
    // if a script with same src or id exists, return it
    const existing = document.querySelector(id ? `#${id}` : `script[src="${src}"]`);
    if (existing) return existing;
    const s = document.createElement('script');
    if (id) s.id = id;
    s.src = src;
    s.defer = true;
    document.body.appendChild(s);
    return s;
  };

  /**
   * Observe the form container to detect when HubSpot injects markup (form or iframe).
   * If detected, mark isFormLoaded true and disconnect observer.
   */
  const startObservingFormContainer = () => {
    if (!formRef.current) return;
    // quick check
    const hasForm = () => !!(formRef.current.querySelector('form') || formRef.current.querySelector('iframe') || formRef.current.querySelector('.hs-form'));
    if (hasForm()) {
      setIsFormLoaded(true);
      return;
    }

    // Disconnect previous observer if any
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const mo = new MutationObserver((mutations) => {
      if (hasForm()) {
        setIsFormLoaded(true);
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      }
    });

    mo.observe(formRef.current, { childList: true, subtree: true });
    observerRef.current = mo;
  };

  /**
   * Try to create HubSpot form via the v2 API (hbspt.forms.create).
   * This is a safe fallback if the embed script didn't initialize the frame.
   */
  const createHubSpotViaAPI = () => {
    if (typeof window === 'undefined') return;
    if (!window.hbspt || !window.hbspt.forms) {
      console.warn('hbspt.forms not available for v2.create fallback');
      return;
    }

    // Avoid double-inserting if a form/iframe already exists
    if (formRef.current.querySelector('form') || formRef.current.querySelector('iframe')) {
      setIsFormLoaded(true);
      return;
    }

    try {
      window.hbspt.forms.create({
        portalId: PORTAL_ID,
        formId: FORM_ID,
        region: REGION,
        target: formRef.current,
        onFormReady: (form) => {
          setIsFormLoaded(true);
          // style iframe if present
          try {
            const iframe = formRef.current.querySelector('iframe');
            if (iframe) {
              iframe.style.width = '100%';
              iframe.style.border = 'none';
              iframe.style.borderRadius = '12px';
            }
          } catch (err) {
            console.warn('Could not style fallback iframe', err);
          }
        },
        onFormSubmit: () => {
          console.log('HubSpot form (fallback v2) submitted');
        }
      });
    } catch (err) {
      console.error('Error calling hbspt.forms.create fallback:', err);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const embedScript = appendScriptOnce(EMBED_SRC, `hs-embed-${PORTAL_ID}`);

    // When embed script loads, start observing; the script will scan for `.hs-form-frame` elements and render the form.
    embedScript.addEventListener('load', () => {
      // small delay to let hubspot do DOM writes
      setTimeout(() => {
        startObservingFormContainer();
      }, 100);
    });

    embedScript.addEventListener('error', () => {
      console.error('Failed to load portal-specific HubSpot embed script:', EMBED_SRC);
    });

    // Start observing immediately in case the script is already present or loads quickly
    startObservingFormContainer();

    // Fallback: if after N ms we still don't have a form inserted, load v2.js and programmatically create the form
    const FALLBACK_DELAY = 3500;
    if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
    fallbackTimeoutRef.current = setTimeout(() => {
      if (isFormLoaded) return;
      // load v2.js (if not present) then call createHubSpotViaAPI
      const v2 = appendScriptOnce(V2_SRC, 'hs-v2-loader');
      v2.addEventListener('load', () => {
        setTimeout(() => {
          createHubSpotViaAPI();
        }, 50);
      });
      v2.addEventListener('error', () => {
        console.error('Failed to load HubSpot v2 loader', V2_SRC);
      });
    }, FALLBACK_DELAY);

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
      // we intentionally do not remove script tags here to avoid breaking other parts of the page
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // Extra: if form container contains an iframe/form at any time, mark loaded (in case it happened before observer attached)
  useEffect(() => {
    if (!formRef.current) return;
    const immediateCheck = () => {
      if (formRef.current.querySelector('form') || formRef.current.querySelector('iframe') || formRef.current.querySelector('.hs-form')) {
        setIsFormLoaded(true);
      }
    };
    immediateCheck();
  }, [formRef.current]);

  function openLightbox(idx) {
    setLightboxIndex(idx);
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    setLightboxIndex(-1);
    document.body.style.overflow = '';
  }

  useEffect(() => {
    function onKey(e) {
      if (lightboxIndex >= 0 && e.key === 'Escape') closeLightbox();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#602437] via-[#7a2d4a] to-[#3a1622] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E05780]/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#E05780]/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-12 min-h-screen pt-40">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
                <span className="w-3 h-3 bg-[#E05780] rounded-full animate-pulse"></span>
                <span className="text-sm text-white/90 font-semibold tracking-wider">PREMIUM HMDA & RERA APPROVED</span>
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-7xl lg:text-6xl font-black text-white leading-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              GULMOHAR
              <motion.span 
                className="block text-[#E05780] font-black mt-2 bg-gradient-to-r from-[#E05780] to-[#ff7ba3] bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                HOMES
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl text-white/90 leading-relaxed max-w-2xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Where contemporary elegance meets timeless comfort in the heart of nature. 
              Premium villa plots in Farooqnagar, Shadnagar.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#E05780] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-transparent hover:border-white/30"
              >
                Contact us btn
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg backdrop-blur-lg hover:bg-white hover:text-[#602437] transition-all duration-300"
              >
                jump to Images Section
              </motion.button>
            </motion.div>
          </div>

          {/* Enhanced Visual Card */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#E05780]/30 rounded-full blur-xl"></div>
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
                
                <div className="aspect-video rounded-2xl overflow-hidden relative bg-gradient-to-br from-[#602437] to-[#E05780]">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center text-white">
                      {/* Professional Architecture Icon */}
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="mb-6 flex justify-center"
                      >
                        <div className="text-white p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                          {professionalIcons.architecture}
                        </div>
                      </motion.div>
                      <h3 className="text-3xl font-bold mb-4">PREMIUM VILLA PLOTS</h3>
                      <p className="text-white/90 leading-relaxed text-lg">
                        110 exclusive plots across 10 acres with dual entrance points 
                        and world-class amenities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* ... (remaining sections are unchanged) ... */}
       {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {projectStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 text-center group hover:shadow-3xl transition-all duration-500"
              >
                <div className="text-5xl lg:text-6xl font-black text-[#602437] mb-4 group-hover:text-[#E05780] transition-colors duration-300">
                  {stat.number}<span className="text-[#E05780]">{stat.suffix}</span>
                </div>
                <div className="text-gray-600 font-bold uppercase tracking-widest text-sm">
                  {stat.label}
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-[#602437] to-[#E05780] mx-auto mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="py-20 bg-gradient-to-br from-[#E05780] via-[#d14a72] to-[#c13d6a] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,#602437_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block text-[#602437] bg-white/20 px-4 py-2 rounded-full text-sm font-bold mb-6"
              >
                LEGACY OF EXCELLENCE
              </motion.div>
              
              <h2 className="text-5xl font-black mb-8 leading-tight">
                Building on
                <span className="block text-[#602437] drop-shadow-lg">Success</span>
              </h2>
              
              <div className="space-y-6 text-lg leading-relaxed font-light">
                <p>
                  Gulmohar Villas stands as one of our proudest achievements, a premium HMDA-approved villa plot project 
                  that practically sold itself and set a benchmark in both quality and appeal.
                </p>
                <p>
                  Building on this legacy, we are now excited to introduce Gulmohar Homes, an extension of this successful 
                  development, with a vision to recreate the same floral serenity and aesthetic charm.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 text-white group hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-3xl text-[#602437] mb-3 group-hover:scale-110 transition-transform">✓</div>
                  <h3 className="font-bold text-sm leading-tight text-[#602437] group-hover:text-white transition-colors">{highlight}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block bg-[#602437] text-white px-6 py-3 rounded-2xl text-sm font-bold mb-6">
              WHY CHOOSE US
            </div>
            <h2 className="text-5xl font-black text-[#602437] mb-6">
              Experience the <span className="text-[#E05780]">Difference</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 group relative overflow-hidden"
              >
                {/* Background Number */}
                <div className="absolute -right-4 -top-4 text-[200px] font-black text-gray-100/30 leading-none -z-10">
                  {index + 1}
                </div>
                
                <div className="text-4xl text-[#602437] mb-6 group-hover:text-[#E05780] transition-colors duration-300">
                  0{index + 1}
                </div>
                <h3 className="text-2xl font-black text-[#602437] mb-6 group-hover:text-[#E05780] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg relative z-10">
                  {feature.description}
                </p>
                
                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#E05780]/20 transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Amenities Section */}
      <section className="py-20 bg-gradient-to-br from-[#602437] via-[#7a2d4a] to-[#3a1622] relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E05780]/5 rounded-full"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block bg-white/20 text-white px-6 py-3 rounded-2xl text-sm font-bold mb-6 backdrop-blur-lg">
              PREMIUM AMENITIES
            </div>
            <h2 className="text-5xl font-black text-white mb-6">
              Luxury <span className="text-[#E05780]">Living</span> Defined
            </h2>
            <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
              Designed for modern living with attention to every detail and your comfort in mind.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-500 group"
              >
                <div className="flex items-start gap-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-[#602437] bg-white/20 p-4 rounded-2xl group-hover:bg-white/30 transition-all duration-300"
                  >
                    {amenity.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#E05780] transition-colors duration-300">
                      {amenity.name}
                    </h3>
                    <p className="text-white/80 leading-relaxed text-lg">
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
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block bg-[#602437] text-white px-6 py-3 rounded-2xl text-sm font-bold mb-6">
              PROJECT GALLERY
            </div>
            <h2 className="text-5xl font-black text-[#602437] mb-6">
              Visual <span className="text-[#E05780]">Journey</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Explore master plans, location maps, and visualizations of Gulmohar Homes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group cursor-pointer relative"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden relative shadow-2xl hover:shadow-3xl transition-all duration-500">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="text-center"
                    >
                      <div className="text-5xl text-gray-400 mb-4">📐</div>
                      <h3 className="font-black text-gray-700 text-xl">{item.title}</h3>
                      <p className="text-gray-500 text-sm mt-2 font-semibold">{item.category}</p>
                    </motion.div>
                  </div>
                  
                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                    <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white font-black text-xl mb-2">{item.title}</h3>
                      <p className="text-white/80 text-sm font-semibold">{item.category}</p>
                      <div className="flex items-center gap-2 mt-3 text-white/60">
                        <span>Click to view</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section with Fixed HubSpot Form */}
      <section className="py-20 bg-gradient-to-br from-[#E05780] via-[#d14a72] to-[#c13d6a] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#602437]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <div className="inline-block bg-white/20 text-white px-6 py-3 rounded-2xl text-sm font-bold mb-6 backdrop-blur-lg">
                GET IN TOUCH
              </div>
              
              <h2 className="text-5xl font-black mb-8 leading-tight">
                About <span className="text-[#602437] drop-shadow-lg">Flivv Developers</span>
              </h2>
              
              <div className="space-y-6 text-lg leading-relaxed font-light mb-12">
                <p>
                  At Flivv, we've always prioritized quality development in every project we undertake, 
                  and Gulmohar Homes is no exception.
                </p>
                <p>
                  With a clear vision to replicate and enhance the success of Gulmohar Villas, 
                  this project is set to become another standout addition to our growing project portfolio.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-12">
                {[
                  { label: 'Projects Completed', value: '25+' },
                  { label: 'Years Experience', value: '15+' },
                  { label: 'Happy Customers', value: '500+' },
                  { label: 'Awards Won', value: '12' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="text-3xl font-black text-[#602437] mb-2">{stat.value}</div>
                    <div className="text-white/90 text-sm font-semibold">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Fixed HubSpot Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-3xl font-black text-[#602437] mb-2">Schedule a Visit</h3>
              <p className="text-gray-600 mb-8">Get in touch with our team for a personalized site tour</p>
              
              <div 
                id="hubspot-form-container" 
                ref={formRef}
                className="min-h-[400px] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center"
              >
                
                <div
                  className="hs-form-frame w-full"
                  data-region={REGION}
                  data-form-id={FORM_ID}
                  data-portal-id={PORTAL_ID}
                  style={{ width: '100%' }}
                />

                {!isFormLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 border-4 border-[#E05780] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-gray-600 font-semibold">Loading contact form...</div>
                    <div className="text-gray-500 text-sm mt-2">If it keeps loading, check console (CSP or network issues)</div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox */}
      {lightboxIndex >= 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-6xl w-full max-h-[90vh]"
          >
            <button 
              onClick={closeLightbox}
              className="absolute -top-16 right-0 text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-lg transition-all z-10 font-semibold"
            >
              Close ×
            </button>
            
            <div className="bg-white rounded-3xl overflow-hidden shadow-3xl">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl text-gray-400 mb-6">📐</div>
                  <h3 className="text-3xl font-black text-gray-800 mb-2">{gallery[lightboxIndex].title}</h3>
                  <p className="text-gray-600 text-lg">{gallery[lightboxIndex].category}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
