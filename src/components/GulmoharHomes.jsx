'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function GulmoharHomes() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const formRef = useRef(null);
  const observerRef = useRef(null);
  const fallbackTimeoutRef = useRef(null);
  const videoRef = useRef(null);

  // HubSpot identifiers
  const PORTAL_ID = '21626983';
  const FORM_ID = '6450d9aa-617b-413b-93b4-9aa7f5450ed6';
  const REGION = 'na2';
  const EMBED_SRC = `https://js-${REGION}.hsforms.net/forms/embed/${PORTAL_ID}.js`;
  const V2_SRC = 'https://js.hsforms.net/forms/v2.js';

  // Professional icons
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
    { number: '110', label: 'Villa Plots', suffix: '' },
    { number: '2', label: 'Entrance Points', suffix: '' },
  ];

  // Video intersection observer
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch(console.error);
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    };
  }, []);

  // HubSpot form functions
  const appendScriptOnce = (src, id) => {
    const existing = document.querySelector(id ? `#${id}` : `script[src="${src}"]`);
    if (existing) return existing;
    const s = document.createElement('script');
    if (id) s.id = id;
    s.src = src;
    s.defer = true;
    document.body.appendChild(s);
    return s;
  };

  const startObservingFormContainer = () => {
    if (!formRef.current) return;
    const hasForm = () => !!(formRef.current.querySelector('form') || formRef.current.querySelector('iframe') || formRef.current.querySelector('.hs-form'));
    if (hasForm()) {
      setIsFormLoaded(true);
      return;
    }

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

  const createHubSpotViaAPI = () => {
    if (typeof window === 'undefined') return;
    if (!window.hbspt || !window.hbspt.forms) {
      console.warn('hbspt.forms not available for v2.create fallback');
      return;
    }

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

    embedScript.addEventListener('load', () => {
      setTimeout(() => {
        startObservingFormContainer();
      }, 100);
    });

    embedScript.addEventListener('error', () => {
      console.error('Failed to load portal-specific HubSpot embed script:', EMBED_SRC);
    });

    startObservingFormContainer();

    const FALLBACK_DELAY = 3500;
    if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
    fallbackTimeoutRef.current = setTimeout(() => {
      if (isFormLoaded) return;
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

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
    };
  }, []);

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

  const scrollToForm = () => {
    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-montserrat">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lancelot&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
        
        .font-lancelot {
          font-family: 'Lancelot', serif;
        }
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        
        .font-cotoris {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: bold;
        }
      `}</style>

      {/* Redesigned Hero Section */}
      <section className="relative min-h-screen py-45 bg-gradient-to-br from-[#602437] via-[#7a2d4a] to-[#3a1622] overflow-hidden flex items-center justify-center">
        {/* Animated Flowers and Leaves */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 left-10 text-[#E05780]/20 text-6xl"
          >
            ✿
          </motion.div>
          <motion.div
            animate={{ 
              rotate: [360, 0],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 right-20 text-[#FF7AA2]/30 text-4xl"
          >
            🌸
          </motion.div>
          <motion.div
            animate={{ 
              x: [0, 10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-32 left-20 text-[#E05780]/25 text-5xl"
          >
            🍃
          </motion.div>
          <motion.div
            animate={{ 
              x: [0, -15, 0],
              rotate: [0, -8, 0]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-40 right-32 text-[#FF7AA2]/25 text-4xl"
          >
            🍂
          </motion.div>
        </div>

        {/* Background Elements */}
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

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="font-lancelot text-6xl lg:text-9xl text-white leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Gulmohar Homes
            </motion.h1>

            <motion.h2 
              className="font-lancelot text-2xl lg:text-6xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              carrying forward the <span className='text-[#E05780]'>legacy</span>
            </motion.h2>

            <motion.p 
              className="font-montserrat text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <a href="/gulmoharvillas" className="text-[#E05780] ml-1 font-semibold"> Gulmohar Villas </a> 
               is one of our proudest achievements, a premium HMDA-approved villa plot project that set new standards in quality and appeal. Building on its legacy, we now introduce Gulmohar Homes, an extension designed to recreate the same floral serenity and aesthetic charm while offering attractive, rewarding investment opportunities for our customers. 
            </motion.p>

            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToForm}
                className="bg-[#E05780] text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-transparent hover:border-white/30 font-montserrat"
              >
                Know More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Enhanced Stats Section */}
      <section className="py-30 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {projectStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 text-center group hover:shadow-3xl transition-all duration-500"
              >
                <div className="text-5xl lg:text-6xl font-black text-[#602437] mb-4 group-hover:text-[#E05780] transition-colors duration-300 font-lancelot">
                  {stat.number}<span className="text-[#E05780]">{stat.suffix}</span>
                </div>
                <div className="text-gray-600 font-bold uppercase tracking-widest text-sm font-montserrat">
                  {stat.label}
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-[#602437] to-[#E05780] mx-auto mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="py-20 bg-gradient-to-br from-[#FF7AA2] via-[#FF7AA2] to-[#FF7AA2] relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
                className="inline-block text-[#602437] bg-white/20 px-4 py-2 rounded-full text-sm font-bold mb-6 font-montserrat"
              >
                LEGACY OF EXCELLENCE
              </motion.div>
              
              <h2 className="font-lancelot text-5xl mb-8 leading-tight">
                Building on
                <span className="block text-[#602437] drop-shadow-lg">Success</span>
              </h2>
              
              <div className="space-y-6 text-lg leading-relaxed font-light font-montserrat">
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
              viewport={{ once: false }}
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
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 text-white group hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-3xl text-[#602437] mb-3 group-hover:scale-110 transition-transform">✓</div>
                  <h3 className="font-bold text-sm leading-tight text-[#602437] group-hover:text-white transition-colors font-montserrat">{highlight}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

{/* New Video Section */}
      <section className="w-full">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden shadow-2xl"
          >
            <video
              ref={videoRef}
              muted
              controls
              controlsList="nodownload"
              className="w-full aspect-video object-cover"
            >
              <source src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GulmoharHomes/GULMOHAR%20HOMES%20DRONE.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block bg-[#602437] text-white px-6 py-3 rounded-2xl text-sm font-bold mb-6 font-montserrat">
              PROJECT GALLERY
            </div>
            <h2 className="font-lancelot text-5xl text-[#602437] mb-6">
              Visual <span className="text-[#E05780]">Journey</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed font-montserrat">
              Explore master plans, location maps, and visualizations of Gulmohar Homes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group cursor-pointer relative"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden relative shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="text-center"
                    >
                      <div className="text-5xl text-gray-400 mb-4">📐</div>
                      <h3 className="font-lancelot text-gray-700 text-xl">{item.title}</h3>
                      <p className="text-gray-500 text-sm mt-2 font-semibold font-montserrat">{item.category}</p>
                    </motion.div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                    <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white font-lancelot text-xl mb-2">{item.title}</h3>
                      <p className="text-white/80 text-sm font-semibold font-montserrat">{item.category}</p>
                      <div className="flex items-center gap-2 mt-3 text-white/60 font-montserrat">
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

      {/* Enhanced Contact Section */}
      <section id="contact-form" className="py-20 bg-gradient-to-br from-[#FF7AA2] via-[#B9375E] to-[#FF7AA2] relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <div className="inline-block bg-white/20 text-white px-6 py-3 rounded-2xl text-sm font-bold mb-6 backdrop-blur-lg font-montserrat">
                GET IN TOUCH
              </div>
              
              <h2 className="font-lancelot text-5xl mb-8 leading-tight">
                About <span className="text-[#602437] drop-shadow-lg">Flivv Developers</span>
              </h2>
              
              <div className="space-y-6 text-lg leading-relaxed font-light mb-12 font-montserrat">
                <p>
                  At Flivv, we've always prioritized quality development in every project we undertake, 
                  and Gulmohar Homes is no exception.
                </p>
                <p>
                  With a clear vision to replicate and enhance the success of Gulmohar Villas, 
                  this project is set to become another standout addition to our growing project portfolio.
                </p>
              </div>

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
                    <div className="text-3xl font-black text-[#602437] mb-2 font-lancelot">{stat.value}</div>
                    <div className="text-white/90 text-sm font-semibold font-montserrat">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="font-lancelot text-3xl text-[#602437] mb-2">Schedule a Visit</h3>
              <p className="text-gray-600 mb-8 font-montserrat">Get in touch with our team for a personalized site tour</p>
              
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
                    <div className="text-gray-600 font-semibold font-montserrat">Loading contact form...</div>
                    <div className="text-gray-500 text-sm mt-2 font-montserrat">If it keeps loading, check console (CSP or network issues)</div>
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
              className="absolute -top-16 right-0 text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-lg transition-all z-10 font-semibold font-montserrat"
            >
              Close ×
            </button>
            
            <div className="bg-white rounded-3xl overflow-hidden shadow-3xl">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl text-gray-400 mb-6">📐</div>
                  <h3 className="font-lancelot text-3xl text-gray-800 mb-2">{gallery[lightboxIndex].title}</h3>
                  <p className="text-gray-600 text-lg font-montserrat">{gallery[lightboxIndex].category}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}