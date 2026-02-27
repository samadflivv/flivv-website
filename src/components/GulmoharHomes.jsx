'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ProgressRoadmap from './GHProgressRoadmap';
import GHProgressRoadmap from './GHProgressRoadmap';
import FloatingJumpNav from './FloatingJumpNav';
import Gallery from './Gallery';

export default function GulmoharHomes() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isFormLoadedLeft, setIsFormLoadedLeft] = useState(false);
  const [isFormLoadedContact, setIsFormLoadedContact] = useState(false);

  // Separate refs for both form containers
  const leftFormRef = useRef(null);
  const contactFormRef = useRef(null);

  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const formVideoRef = useRef(null);

  // HubSpot identifiers
  const PORTAL_ID = '21626983';
  const FORM_ID = '6450d9aa-617b-413b-93b4-9aa7f5450ed6';
  const REGION = 'na2';

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
    community: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    home: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
    connectivity: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/>
      </svg>
    )
  };

  // Why Gulmohar Homes features
  const whyGulmoharFeatures = [
    {
      title: "Home Away From Home",
      description: "Embracing the 'home away from home' concept, Gulmohar Homes offers a peaceful retreat essential for well-being and balanced living.",
      icon: professionalIcons.home
    },
    {
      title: "Community Living",
      description: "Shared amenities with Gulmohar Villas are designed to enhance the sense of community and connected living.",
      icon: professionalIcons.community
    },
    {
      title: "RERA & HMDA Approved",
      description: "Backed by RERA and HMDA approvals, the project ensures high-quality development standards and long-term security for buyers.",
      icon: professionalIcons.approval
    },
    {
      title: "Seamless Connectivity",
      description: "With 2 designated entrance points, the project offers seamless connectivity and ease of access from multiple directions.",
      icon: professionalIcons.connectivity
    },
    {
      title: "24/7 Security",
      description: "A secure villa plot project offering round-the-clock surveillance and reliable 24/7 security for complete peace of mind.",
      icon: professionalIcons.security
    }
  ];

  const projectStats = [
    { number: '10', label: 'Acres Total Area', suffix: '' },
    { number: '110', label: 'Villa Plots', suffix: '' },
    { number: '2', label: 'Entrance Points', suffix: '' },
  ];


  // ============================================
  // CRITICAL FIX: HubSpot Form Loading
  // This prevents forms from appearing on other pages
  // ============================================
  
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isComponentMounted = true;
    const createdFormIds = [];

    const loadHubSpotScript = () => {
      return new Promise((resolve, reject) => {
        if (window.hbspt && window.hbspt.forms) {
          resolve();
          return;
        }

        const existingScript = document.querySelector('script[src*="js.hsforms.net/forms/embed/v2.js"]');
        if (existingScript) {
          if (window.hbspt && window.hbspt.forms) {
            resolve();
          } else {
            existingScript.addEventListener('load', () => resolve());
          }
          return;
        }

        const script = document.createElement('script');
        script.src = `https://js-${REGION}.hsforms.net/forms/embed/v2.js`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load HubSpot script'));
        document.body.appendChild(script);
      });
    };

    const createForm = (containerRef, setLoaded) => {
      if (!isComponentMounted || !containerRef.current) return;

      const uniqueId = `hs-form-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      containerRef.current.innerHTML = '';
      
      const targetDiv = document.createElement('div');
      targetDiv.id = uniqueId;
      containerRef.current.appendChild(targetDiv);

      try {
        window.hbspt.forms.create({
          region: REGION,
          portalId: PORTAL_ID,
          formId: FORM_ID,
          target: `#${uniqueId}`,
          onFormReady: () => {
            if (isComponentMounted) {
              createdFormIds.push(uniqueId);
              setLoaded(true);
            }
          }
        });
      } catch (error) {
        console.error('Error creating form:', error);
      }
    };

    const initForms = async () => {
      try {
        await loadHubSpotScript();
        if (!isComponentMounted) return;

        setTimeout(() => {
          if (isComponentMounted && contactFormRef.current) {
            createForm(contactFormRef, setIsFormLoadedContact);
          }
        }, 100);
      } catch (error) {
        console.error('Failed to initialize forms:', error);
      }
    };

    initForms();

    // CRITICAL: Cleanup to prevent forms on other pages
    return () => {
      isComponentMounted = false;
      
      // Remove all created forms
      createdFormIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.remove();
      });

      // Clear containers
      if (contactFormRef.current) {
        contactFormRef.current.innerHTML = '';
      }
    };
  }, []);

  // Video intersection observer for auto play/pause
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play video when section comes into view
            videoElement.play().catch((error) => {
              console.warn("Video autoplay blocked:", error);
            });
          } else {
            // Pause video when section leaves viewport
            videoElement.pause();
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of video is visible
    );

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    };
  }, []);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
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

      {/* Enhanced Hero Section with More Flowers */}
      <section id='ghhero' className="relative min-h-screen pt-30 lg:py-45 bg-[#602437] overflow-hidden flex items-center justify-center">
        {/* Enhanced Animated Flowers and Leaves */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large Background Flowers */}
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 left-10 text-[#E05780]/20 text-8xl"
          >
            ✿
          </motion.div>
          <motion.div
            animate={{ 
              rotate: [360, 0],
              y: [0, -30, 0]
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 right-20 text-[#FF7AA2]/25 text-6xl"
          >
            🌸
          </motion.div>
          <motion.div
            animate={{ 
              x: [0, 15, 0],
              rotate: [0, 8, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-32 left-20 text-[#E05780]/20 text-7xl"
          >
            🍃
          </motion.div>
          <motion.div
            animate={{ 
              x: [0, -20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ 
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-40 right-32 text-[#FF7AA2]/20 text-5xl"
          >
            🍂
          </motion.div>
          
          {/* Additional Flowers */}
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-1/3 left-1/3 text-[#E05780]/15 text-9xl"
          >
            ❀
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, 25, 0],
              rotate: [0, 15, 0]
            }}
            transition={{ 
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/4 left-3/4 text-[#FF7AA2]/15 text-6xl"
          >
            🌺
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E05780]/15 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1.3, 1, 1.3],
              opacity: [0.4, 0.3, 0.4]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#E05780]/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="font-lancelot text-6xl lg:text-9xl text-white leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Gulmohar Homes
            </motion.h1>

            <motion.h2 
              className="font-lancelot text-2xl lg:text-6xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Carrying Forward the <span className='text-[#E05780]'>Legacy</span>
            </motion.h2>

            <motion.p 
              className="font-montserrat text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <a href="/gulmoharvillas" className="text-[#E05780] ml-1 font-semibold"> Gulmohar Villas </a> 
               is one of our proudest achievements, a premium HMDA-approved villa plot project that set new standards in quality and appeal. Building on its legacy, we now introduce Gulmohar Homes, an extension designed to recreate the same floral serenity and aesthetic charm while offering attractive, rewarding investment opportunities for our customers. 
            </motion.p>

            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
      
      <GHProgressRoadmap/>

      {/* Enhanced Stats Section - Redesigned */}
      <section id='ghstats' className="py-24 bg-gradient-to-br from-[#602437] via-[#722845] to-[#E05780] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 right-10 text-white/5 text-9xl"
        >
          ✿
        </motion.div>
        <motion.div
          animate={{ 
            rotate: [360, 0],
            x: [0, 30, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-10 text-white/5 text-8xl"
        >
          🌺
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                {/* Card Background with Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                
                {/* Main Card */}
                <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-10 border-2 border-white/30 hover:border-white/50 transition-all duration-500 shadow-2xl group-hover:shadow-3xl">
                  {/* Decorative Corner Element */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full blur-sm group-hover:bg-white/20 transition-all duration-300"></div>
                  
                  {/* Content */}
                  <div className="text-center relative z-10">
                    {/* Number */}
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.15 + 0.3,
                        type: "spring",
                        stiffness: 150
                      }}
                      className="text-7xl lg:text-8xl font-black text-white mb-4 font-montserrat leading-none group-hover:scale-110 transition-transform duration-300"
                    >
                      {stat.number}
                      <span className="text-5xl text-white/80">{stat.suffix}</span>
                    </motion.div>
                    
                    {/* Divider Line */}
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
                      className="h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4 rounded-full"
                    ></motion.div>
                    
                    {/* Label */}
                    <div className="text-white font-bold uppercase tracking-wider text-sm lg:text-base font-montserrat">
                      {stat.label}
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id='ghabout' className="py-20 bg-gradient-to-br from-[#E05780] via-[#E05780] to-[#E05780] relative overflow-hidden">
        {/* Background Floral Elements */}
        <motion.div
          animate={{ 
            rotate: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-5 right-5 text-white/10 text-8xl"
        >
          ✿
        </motion.div>
        <motion.div
          animate={{ 
            rotate: [15, 0, 15],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-5 left-5 text-white/10 text-6xl"
        >
          🌺
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              
              <h2 className="font-lancelot text-5xl mb-8 font-bold">
                About
                <span className="block text-[#602437] drop-shadow-lg">Gulmohar Homes</span>
              </h2>
              
              <div className="space-y-6 text-lg leading-relaxed font-light font-montserrat text-justify">
                <p>
                  Located just 2 bits away from Gulmohar Villas, Gulmohar Homes in Farooqnagar, Shadnagar is a premium HMDA and RERA-approved project spread across 10 acres, offering 110 villa plots with ample space reserved for essential social infrastructure. Residents will also enjoy a sense of community and shared amenities through Gulmohar Villas.
                </p>
                <p>
                  At Flivv Developers, we prioritize quality in every development, and Gulmohar Homes is no exception. With a vision to build on the success of Gulmohar Villas, this project is set to become another standout in our growing portfolio!
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border shadow-2xl shadow-[#602437] text-white group hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-3xl text-[#602437] mb-3 group-hover:scale-110 transition-transform">✓</div>
                  <h3 className="font-bold text-sm leading-tight text-[#602437] group-hover:text-white transition-colors font-montserrat">{highlight}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id='ghvideo' className="w-full">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden shadow-2xl"
          >
            <video
              ref={videoRef}
              muted
              loop
              playsInline
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

      {/* Why Gulmohar Homes Section */}
      <section id='whygh' className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        {/* Background Floral Elements */}
        <motion.div
          animate={{ 
            rotate: [0, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 text-[#E05780]/10 text-9xl"
        >
          ❀
        </motion.div>
        <motion.div
          animate={{ 
            rotate: [-10, 0, -10],
            y: [0, -15, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 right-10 text-[#FF7AA2]/10 text-7xl"
        >
          🌸
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-[#602437] to-[#E05780] text-white px-8 py-3 rounded-2xl text-sm font-bold mb-6 font-montserrat shadow-2xl">
              WHY CHOOSE US
            </div>
            <h2 className="font-lancelot text-5xl text-[#602437] mb-6">
              Why <span className="text-[#E05780]">Gulmohar Homes</span>?
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed font-montserrat">
              Discover what makes Gulmohar Homes the perfect choice for investment in Shadnagar
            </p>
          </motion.div>

          {/* Masonry-style Grid Layout for 5 Cards with Images */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-8">
            {/* Large Feature Card 1 - Home Away From Home */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="lg:col-span-6 group relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 h-full hover:shadow-3xl transition-all duration-500 overflow-hidden">
                <div className="flex flex-col lg:flex-row h-full">
                  <div className="lg:w-2/5 p-8 flex flex-col justify-center">
                    <div className="text-[#E05780] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#602437]/10 to-[#E05780]/10 rounded-2xl flex items-center justify-center">
                        {whyGulmoharFeatures[0].icon}
                      </div>
                    </div>
                    <h3 className="font-lancelot text-2xl text-[#602437] mb-4 group-hover:text-[#E05780] transition-colors duration-300">
                      {whyGulmoharFeatures[0].title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-montserrat">
                      {whyGulmoharFeatures[0].description}
                    </p>
                  </div>
                  <div className="lg:w-3/5 h-64 lg:h-auto">
                    <img 
                      src="/ghicon1.png" 
                      alt="Home Away From Home"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vertical Stack for Right Side */}
            <div className="lg:col-span-4 grid grid-cols-1 gap-6 lg:gap-8">
              {/* Medium Feature Card 2 - Community Living */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 h-full hover:shadow-3xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="text-[#E05780] transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#602437]/10 to-[#E05780]/10 rounded-2xl flex items-center justify-center">
                        {whyGulmoharFeatures[1].icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-lancelot text-xl text-[#602437] mb-2 group-hover:text-[#E05780] transition-colors duration-300">
                        {whyGulmoharFeatures[1].title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-montserrat">
                        {whyGulmoharFeatures[1].description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Medium Feature Card 3 - RERA & HMDA Approved */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 h-full hover:shadow-3xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="text-[#E05780] transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#602437]/10 to-[#E05780]/10 rounded-2xl flex items-center justify-center">
                        {whyGulmoharFeatures[2].icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-lancelot text-xl text-[#602437] mb-2 group-hover:text-[#E05780] transition-colors duration-300">
                        {whyGulmoharFeatures[2].title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-montserrat">
                        {whyGulmoharFeatures[2].description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Row - Two Equal Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="lg:col-span-5 group relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 h-full hover:shadow-3xl transition-all duration-500 overflow-hidden">
                <div className="flex flex-col lg:flex-row h-full">
                  <div className="lg:w-3/5 p-6 flex flex-col justify-center">
                    <div className="text-[#E05780] mb-3 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#602437]/10 to-[#E05780]/10 rounded-2xl flex items-center justify-center">
                        {whyGulmoharFeatures[3].icon}
                      </div>
                    </div>
                    <h3 className="font-lancelot text-xl text-[#602437] mb-3 group-hover:text-[#E05780] transition-colors duration-300">
                      {whyGulmoharFeatures[3].title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-montserrat">
                      {whyGulmoharFeatures[3].description}
                    </p>
                  </div>
                  <div className="lg:w-2/5 h-auto">
                    <img 
                      src="/ghicon2.png" 
                      alt="Seamless Connectivity"
                      className="w-100 h-40 lg:w-full lg:h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="lg:col-span-5 group relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 h-full hover:shadow-3xl transition-all duration-500 overflow-hidden">
                <div className="flex flex-col lg:flex-row h-full">
                  <div className="lg:w-3/5 p-6 flex flex-col justify-center">
                    <div className="text-[#E05780] mb-3 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#602437]/10 to-[#E05780]/10 rounded-2xl flex items-center justify-center">
                        {whyGulmoharFeatures[4].icon}
                      </div>
                    </div>
                    <h3 className="font-lancelot text-xl text-[#602437] mb-3 group-hover:text-[#E05780] transition-colors duration-300">
                      {whyGulmoharFeatures[4].title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-montserrat">
                      {whyGulmoharFeatures[4].description}
                    </p>
                  </div>
                  <div className="lg:w-2/5 h-auto">
                    <img 
                      src="/ghicon3.png" 
                      alt="24/7 Security"
                      className="w-100 h-40 lg:w-full lg:h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Location Map Section */}
      <section id='ghlocation' className="py-20 bg-gradient-to-br from-[#602437] to-[#E05780] relative overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 15, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-5 left-5 text-white/10 text-8xl"
        >
          🍃
        </motion.div>
        <motion.div
          animate={{ 
            rotate: [15, 0, 15],
            y: [0, 25, 0]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-5 right-5 text-white/10 text-7xl"
        >
          🌺
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-white/20 backdrop-blur-lg text-white px-8 py-3 rounded-2xl text-sm font-bold mb-6 font-montserrat border border-white/30">
              38-Kms from Aramghar
            </div>
            <h2 className="font-lancelot text-5xl text-white mb-6">
              Location & Connectivity
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-3xl overflow-hidden border-2 border-white/20"
          >
            <div className="aspect-video w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4101.162320479017!2d78.214237!3d17.112358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDA2JzQ0LjUiTiA3OMKwMTInNTEuMyJF!5e1!3m2!1sen!2sin!4v1763462276090!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-3xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery/>

      {/* Contact Section */}
      <section id="contact-form" className="py-20 bg-[#E05780] relative overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 12, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-10 text-white/10 text-8xl"
        >
          ✿
        </motion.div>
        <motion.div
          animate={{ 
            rotate: [12, 0, 12],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-10 text-white/10 text-7xl"
        >
          🌺
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h2 className="font-lancelot text-5xl mb-4 leading-tight">
                About <span className="text-[#602437] drop-shadow-lg">Flivv Developers</span>
              </h2>
              
              <div className="space-y-6 text-lg leading-relaxed font-light mb-6 font-montserrat text-justify">
                <p>
                  With over 14+ years of experience in business, Flivv has built a strong reputation for reliability and service excellence. Over the past 4 years, Flivv Developers has successfully established a strong presence in the real estate sector. 
                </p>
                <p>
                  We specialize in the development and marketing of open plot projects, with focus on long-term real estate investment goals. With 07 projects in our portfolio, we offer trustworthy companionship, backed by lifetime advisory and customer relationship management.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 lg:mb-12">
                {[
                  { label: 'Projects', value: '07' },
                  { label: 'Years Experience', value: '14+' },
                  { label: 'Growing Customers', value: '500+' },
                  { label: 'Satisfaction Rate', value: '100%' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="text-3xl font-black text-[#602437] mb-2">{stat.value}</div>
                    <div className="text-white/90 text-sm font-semibold font-montserrat">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl lg:mt-8 p-8 shadow-2xl"
            >
              <h3 className="font-lancelot text-3xl text-[#602437] mb-2">Schedule a Visit</h3>
              <p className="text-gray-600 mb-8 font-montserrat">Get in touch with our team for a personalized site tour</p>
              
              <div 
                ref={contactFormRef} 
                className="min-h-[400px] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200"
              >
                {!isFormLoadedContact && (
                  <div className="flex flex-col items-center justify-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#E05780] border-t-transparent mb-4"></div>
                    <p className="text-gray-500 font-montserrat">Loading form...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}