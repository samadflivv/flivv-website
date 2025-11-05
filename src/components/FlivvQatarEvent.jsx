'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

// Complete Flivv Qatar Sales Event Landing Page - Final Version
export default function FlivvQatarEvent() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-11-13T00:00:00Z');
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, []);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Fixed HubSpot Form Component
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js-na2.hsforms.net/forms/embed/21626983.js';
    script.defer = true;
    document.head.appendChild(script);

    return () => {};
  }, []);

  // Event data
  const eventHighlights = [
    {
      title: "Founder Meet & Greet",
      description: "Direct access to Flivv's leadership team"
    },
    {
      title: "Exclusive Project Previews",
      description: "First look at upcoming premium developments"
    },
    {
      title: "Investment Strategy",
      description: "Expert guidance on portfolio planning"
    },
    {
      title: "NRI Solutions",
      description: "Tailored solutions for overseas investors"
    }
  ];

  const scheduleDays = [
    {
      date: "November 13, 2025",
      location: "Doha, Qatar"
    },
    {
      date: "November 14, 2025", 
      location: "Doha, Qatar"
    },
    {
      date: "November 15, 2025",
      location: "Doha, Qatar"
    }
  ];

  const faqItems = [
    {
      question: "How do I register for this exclusive event?",
      answer: "Submit your details through our registration form above. As this is an exclusive gathering for serious investors, our team will review applications and extend personalized invitations to qualified attendees."
    },
    {
      question: "Are Flivv projects HMDA-approved?",
      answer: "Absolutely. All Flivv developments, including our flagship Rivendell Farms, maintain full HMDA compliance and possess all necessary legal clearances, ensuring complete investment security and transparency."
    },
    {
      question: "What premium payment options are available?",
      answer: "We offer bespoke payment solutions including flexible premium EMI plans, customized investment structures, and exclusive terms for our distinguished NRI investors. Our relationship managers will tailor a plan to your specific requirements."
    },
    {
      question: "Do you provide dedicated NRI investment support?",
      answer: "Yes, we offer white-glove service for NRI investors including comprehensive documentation assistance, legal facilitation, property management solutions, and dedicated relationship management throughout your investment journey."
    }
  ];

  const companyPillars = [
    {
      title: "Elite Transparency",
      description: "A decade of distinguished service with uncompromising transparency in every transaction."
    },
    {
      title: "Premium Portfolio", 
      description: "Curated collection of exclusive developments offering unparalleled value appreciation."
    },
    {
      title: "NRI Concierge",
      description: "Dedicated premium support service for our international investors worldwide."
    }
  ];

  // Scroll animations
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true }
  };

  const staggerChildren = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { staggerChildren: 0.2 },
    viewport: { once: true }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Head>
        <title>Flivv Doha Connect 2025 | Exclusive Investor Event</title>
        <meta name="description" content="Exclusive gathering for Hyderabadi Investors in Qatar seeking premium land opportunities with Flivv Developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          background: white;
          color: #1a202c;
          margin: 0;
          padding: 0;
          scroll-behavior: smooth;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #8A1538 0%, #6A102B 100%);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .premium-shadow {
          box-shadow: 0 25px 50px -12px rgba(138, 21, 56, 0.25);
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 35px 60px -12px rgba(138, 21, 56, 0.3);
        }
        
        .section-padding {
          padding: 80px 5%;
        }
        
        @media (max-width: 768px) {
          .section-padding {
            padding: 60px 5%;
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f7fafc;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #8A1538;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #6A102B;
        }

        /* Floating animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Enhanced Hero Section */}
      <section className="min-h-screen gradient-bg relative overflow-hidden flex items-center justify-center pt-20 md:pt-0">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
          
          {/* Geometric Patterns */}
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white/10 rounded-lg rotate-45"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 border-2 border-white/10 rounded-full"></div>
          <div className="absolute top-40 right-32 w-16 h-16 border-2 border-white/10 rotate-12"></div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-8 h-8 bg-white/20 rounded-full"></div>
        </div>
        <div className="absolute bottom-32 right-16 animate-float" style={{animationDelay: '2s'}}>
          <div className="w-6 h-6 bg-white/30 rounded-full"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{animationDelay: '4s'}}>
          <div className="w-10 h-10 bg-white/10 rounded-full"></div>
        </div>
        <div className="absolute bottom-20 left-20 animate-float" style={{animationDelay: '1s'}}>
          <div className="w-4 h-4 bg-white/25 rounded-full"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float" style={{animationDelay: '3s'}}>
          <div className="w-3 h-3 bg-white/15 rounded-full"></div>
        </div>

        <div className="w-full max-w-6xl mx-auto text-center relative z-10 px-4 py-20 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Premium Badge */}
            <motion.div
              className="inline-block glass-effect rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-white/90 tracking-widest text-sm font-medium uppercase">Exclusive Invitation Only</p>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Flivv
              <span className="block text-2xl md:text-4xl lg:text-5xl font-light mt-4">Doha Connect 2025</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto mb-8 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Exclusive Gathering for Qatar's Premier Hyderabadi Investors
            </motion.p>
            
            <motion.p 
              className="text-white/80 max-w-xl mx-auto mb-12 text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Discover premium land investment opportunities with Flivv's exclusive portfolio
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.a
                href="#registration"
                className="bg-white text-[#8A1538] px-8 md:px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white/90 transition-all duration-300 premium-shadow hover-lift w-full sm:w-auto text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Secure Your Spot
              </motion.a>
              
              <motion.a
                href="#details"
                className="border-2 border-white text-white px-8 md:px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover-lift w-full sm:w-auto text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-white/70 text-sm mb-2">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center mx-auto">
            <motion.div 
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Fixed Countdown Section - Mobile Responsive */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#8A1538] mb-6">
              Event Begins In
            </h2>
            <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-[#8A1538] to-[#6A102B] mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto px-4"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <motion.div
                key={unit}
                className="flex-1 min-w-[70px] md:min-w-[100px] text-center"
                variants={fadeInUp}
              >
                <motion.div 
                  className="bg-white premium-shadow rounded-xl md:rounded-2xl p-4 md:p-6 mb-3 relative overflow-hidden group hover-lift"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8A1538] to-[#6A102B] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#8A1538] block mb-2">{value}</span>
                    <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-[#8A1538] to-[#6A102B] mx-auto mb-2"></div>
                    <span className="text-gray-600 font-medium capitalize text-xs md:text-sm tracking-wider">{unit}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Countdown CTA */}
          <motion.div 
            className="text-center mt-8 md:mt-12"
            {...fadeInUp}
          >
            <p className="text-gray-600 mb-6 text-sm md:text-base">Don't miss this exclusive opportunity</p>
            <motion.a
              href="#registration"
              className="inline-block bg-gradient-to-r from-[#8A1538] to-[#6A102B] text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-semibold hover-lift premium-shadow text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* About Section with White Location/Date Icons */}
      <section id="details" className="section-padding bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {/* Content */}
            <motion.div variants={fadeInUp}>
              <div className="mb-8">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-[#8A1538] to-[#6A102B] rounded-full"></div>
                  <span className="text-[#8A1538] font-semibold uppercase tracking-wider text-xs md:text-sm">Exclusive Event</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Premium Investment <span className="text-[#8A1538]">Gathering</span>
                </h2>
              </div>
              
              <div className="space-y-4 md:space-y-6 text-gray-600 text-base md:text-lg leading-relaxed">
                <p>
                  <span className="font-semibold text-gray-900">Flivv Doha Connect 2025</span> brings together Qatar's most discerning investors for an exclusive preview of premium land investment opportunities.
                </p>
                
                <p>
                  Experience direct access to Flivv's leadership team and gain exclusive insights into our curated portfolio of premium developments.
                </p>
              </div>

              {/* Location & Date Highlight - WHITE ICONS */}
              <motion.div 
                className="mt-8 md:mt-12 bg-gradient-to-br from-[#8A1538] to-[#6A102B] rounded-2xl p-6 md:p-8 premium-shadow text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="text-center">
                    {/* White Location Icon */}
                    <div className="flex justify-center mb-3">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Location</h3>
                    <p className="text-white/90">Doha, Qatar</p>
                  </div>
                  
                  <div className="text-center">
                    {/* White Calendar Icon */}
                    <div className="flex justify-center mb-3">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Date</h3>
                    <p className="text-white/90">Nov 13-15, 2025</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Visual Content - MAROON ICONS */}
            <motion.div 
              className="grid grid-cols-2 gap-4 md:gap-6"
              variants={staggerChildren}
            >
              {[
                { 
                  icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="#8A1538"><path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-5v-1.25c0-.54 2.56-1.25 2.5-1.25s2.5.71 2.5 1.25v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.34.76-.08 1.53-.16 2.02-.16 2.3 0 4.5.8 4.5 1.65v1.1zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>,
                  title: "Direct Access", 
                  desc: "Meet Flivv leadership team" 
                },
                { 
                  icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="#8A1538"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>,
                  title: "Exclusive Insights", 
                  desc: "First look at premium projects" 
                },
                { 
                  icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="#8A1538"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>,
                  title: "Investment Strategy", 
                  desc: "Expert portfolio guidance" 
                },
                { 
                  icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="#8A1538"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>,
                  title: "Global Solutions", 
                  desc: "Tailored for international investors" 
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-4 md:p-6 text-center group hover-lift premium-shadow"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex justify-center mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{item.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section with Maroon Icons */}
      <section className="section-padding gradient-bg">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Event Highlights
            </h2>
            <div className="w-20 md:w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {eventHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-2xl p-6 md:p-8 text-center group hover-lift"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className="flex justify-center mb-4">
                  {index === 0 && <svg width="40" height="40" viewBox="0 0 24 24" fill="#ffffffff"><path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-5v-1.25c0-.54 2.56-1.25 2.5-1.25s2.5.71 2.5 1.25v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.34.76-.08 1.53-.16 2.02-.16 2.3 0 4.5.8 4.5 1.65v1.1zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>}
                  {index === 1 && <svg width="40" height="40" viewBox="0 0 24 24" fill="#ffffffff"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>}
                  {index === 2 && <svg width="40" height="40" viewBox="0 0 24 24" fill="#ffffffff"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>}
                  {index === 3 && <svg width="40" height="40" viewBox="0 0 24 24" fill="#ffffffff"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {highlight.title}
                </h3>
                <p className="text-white/80 leading-relaxed text-sm md:text-base">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Schedule Section with Maroon Icons */}
      <section className="section-padding bg-white">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Event Schedule
            </h2>
            <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-[#8A1538] to-[#6A102B] mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {scheduleDays.map((day, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 md:p-8 text-center group hover-lift premium-shadow border border-gray-200"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#8A1538">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {day.date}
                </h3>
                <p className="text-gray-600 mb-6">{day.location}</p>
                <motion.a
                  href="#registration"
                  className="inline-block bg-[#8A1538] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#6A102B] transition-colors text-sm md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register Now
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Flivv Section with Maroon Icons */}
      <section className="section-padding gradient-bg">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose Flivv?
            </h2>
            <div className="w-20 md:w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {companyPillars.map((pillar, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-2xl p-6 md:p-8 text-center group hover-lift"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className="text-3xl mb-4 text-white font-bold">{index + 1}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {pillar.title}
                </h3>
                <p className="text-white/80 leading-relaxed text-sm md:text-base">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section with Maroon Icons */}
      <section className="section-padding bg-white">
        <div className="w-full max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-[#8A1538] to-[#6A102B] mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="space-y-4 md:space-y-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {faqItems.map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-2xl overflow-hidden group hover-lift premium-shadow"
                variants={fadeInUp}
              >
                <button
                  className="w-full text-left p-6 md:p-8 bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
                  <motion.span
                    className="text-[#8A1538] text-xl flex-shrink-0"
                    animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#8A1538">
                      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
                    </svg>
                  </motion.span>
                </button>
                
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 md:p-8 bg-white border-t border-gray-200">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section with HubSpot Form */}
      <section id="registration" className="section-padding gradient-bg">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Register for the Event
            </h2>
            <div className="w-20 md:w-24 h-1 bg-white/50 mx-auto mb-4 md:mb-6 rounded-full"></div>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              Join our exclusive gathering of premium investors. Limited seats available.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-3xl overflow-hidden premium-shadow"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="p-6 md:p-8 lg:p-12">
              <div 
                className="hs-form-frame" 
                data-region="na2" 
                data-form-id="d3b56077-11fe-485c-98cd-677027236164" 
                data-portal-id="21626983"
              ></div>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center mt-6 md:mt-8"
            {...fadeInUp}
          >
          </motion.div>
        </div>
      </section>

      {/* Updated Footer - Removed Quick Links */}
      <footer className="section-padding gradient-bg border-t border-white/10">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-white mb-4">Flivv Developers</h3>
              <p className="text-white/80 mb-4 text-sm leading-relaxed">
                Creating premium developments with uncompromising quality and transparency since 2015.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-2 text-white/80 text-sm">
                <p>Hyderabad Office: 8-1-301, 302 & 303, West World, II Floor, B Block, above Karachi Bakery, Shaikpet, Hyderabad</p>
                <p>Email: info@flivvdevelopers.com</p>
                <p>Qatar Event: +974-XXX-XXXX</p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h4 className="text-lg font-semibold text-white mb-4">Event</h4>
              <div className="space-y-2 text-white/80 text-sm">
                <p className="font-semibold text-white">November 13-15, 2025</p>
                <p>Doha, Qatar</p>
                <p className="mt-2">Exclusive event for premium investors</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="border-t border-white/10 pt-6 md:pt-8 text-center"
            {...fadeInUp}
          >
            <p className="text-white/60 text-sm md:text-base">
              &copy; {new Date().getFullYear()} Flivv Developers. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}