'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

// Complete Flivv Qatar Sales Event Landing Page - Premium Modern Design
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
    // Load HubSpot form script
    const script = document.createElement('script');
    script.src = 'https://js-na2.hsforms.net/forms/embed/21626983.js';
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Event data
  const eventHighlights = [
    {
      title: "Founder Meet & Greet",
      description: "Direct access to Flivv's leadership team",
      icon: "👑"
    },
    {
      title: "Exclusive Project Previews",
      description: "First look at upcoming premium developments",
      icon: "💎"
    },
    {
      title: "Investment Strategy",
      description: "Expert guidance on portfolio planning",
      icon: "📈"
    },
    {
      title: "NRI Solutions",
      description: "Tailored solutions for overseas investors",
      icon: "🌍"
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
      `}</style>

      {/* Premium Hero Section */}
      <section className="min-h-screen gradient-bg relative overflow-hidden flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-6 h-6 bg-white/20 rounded-full"></div>
        </div>
        <div className="absolute bottom-32 right-16 animate-float" style={{animationDelay: '2s'}}>
          <div className="w-4 h-4 bg-white/30 rounded-full"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{animationDelay: '4s'}}>
          <div className="w-8 h-8 bg-white/10 rounded-full"></div>
        </div>

        <div className="w-full max-w-6xl mx-auto text-center relative z-10 section-padding">
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
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Flivv
              <span className="block text-3xl md:text-5xl lg:text-6xl font-light mt-4">Doha Connect 2025</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Exclusive Gathering for Qatar's Premier Hyderabadi Investors
            </motion.p>
            
            <motion.p 
              className="text-white/80 max-w-xl mx-auto mb-12 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Discover premium land investment opportunities with Flivv's exclusive portfolio
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.a
                href="#registration"
                className="bg-white text-[#8A1538] px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white/90 transition-all duration-300 premium-shadow hover-lift"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Secure Your Spot
              </motion.a>
              
              <motion.a
                href="#details"
                className="border-2 border-white text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover-lift"
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

      {/* Premium Countdown Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#8A1538] mb-6">
              Event Begins In
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#8A1538] to-[#6A102B] mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="flex justify-center space-x-4 md:space-x-8 max-w-4xl mx-auto"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <motion.div
                key={unit}
                className="flex-1 text-center"
                variants={fadeInUp}
              >
                <motion.div 
                  className="bg-white premium-shadow rounded-2xl p-6 md:p-8 mb-4 relative overflow-hidden group hover-lift"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8A1538] to-[#6A102B] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <span className="text-3xl md:text-5xl font-bold text-[#8A1538] block mb-2">{value}</span>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#8A1538] to-[#6A102B] mx-auto mb-2"></div>
                    <span className="text-gray-600 font-medium capitalize text-sm md:text-base tracking-wider">{unit}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Countdown CTA */}
          <motion.div 
            className="text-center mt-12"
            {...fadeInUp}
          >
            <p className="text-gray-600 mb-6">Don't miss this exclusive opportunity</p>
            <motion.a
              href="#registration"
              className="inline-block bg-gradient-to-r from-[#8A1538] to-[#6A102B] text-white px-8 py-4 rounded-2xl font-semibold hover-lift premium-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Premium About Section */}
      <section id="details" className="section-padding bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {/* Content */}
            <motion.div variants={fadeInUp}>
              <div className="mb-8">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#8A1538] to-[#6A102B] rounded-full"></div>
                  <span className="text-[#8A1538] font-semibold uppercase tracking-wider text-sm">Exclusive Event</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Premium Investment <span className="text-[#8A1538]">Gathering</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  <span className="font-semibold text-gray-900">Flivv Doha Connect 2025</span> brings together Qatar's most discerning investors for an exclusive preview of premium land investment opportunities.
                </p>
                
                <p>
                  Experience direct access to Flivv's leadership team and gain exclusive insights into our curated portfolio of premium developments.
                </p>
              </div>

              {/* Location & Date Highlight */}
              <motion.div 
                className="mt-12 bg-gradient-to-br from-[#8A1538] to-[#6A102B] rounded-2xl p-8 premium-shadow text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📍</div>
                    <h3 className="font-bold text-lg mb-2">Location</h3>
                    <p className="text-white/90">Doha, Qatar</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl mb-2">📅</div>
                    <h3 className="font-bold text-lg mb-2">Date</h3>
                    <p className="text-white/90">Nov 13-15, 2025</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Visual Content */}
            <motion.div 
              className="grid grid-cols-2 gap-6"
              variants={staggerChildren}
            >
              {[
                { icon: "🤝", title: "Direct Access", desc: "Meet Flivv leadership team" },
                { icon: "💼", title: "Exclusive Insights", desc: "First look at premium projects" },
                { icon: "📊", title: "Investment Strategy", desc: "Expert portfolio guidance" },
                { icon: "🌐", title: "Global Solutions", desc: "Tailored for international investors" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 text-center group hover-lift premium-shadow"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-3xl mb-3 text-[#8A1538]">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Premium Highlights Section */}
      <section className="section-padding gradient-bg">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Event Highlights
            </h2>
            <div className="w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {eventHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-2xl p-8 text-center group hover-lift"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl mb-4 text-white">{highlight.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {highlight.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Premium Schedule Section */}
      <section className="section-padding bg-white">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Event Schedule
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#8A1538] to-[#6A102B] mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {scheduleDays.map((day, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center group hover-lift premium-shadow border border-gray-200"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4 text-[#8A1538]">📅</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {day.date}
                </h3>
                <p className="text-gray-600 mb-6">{day.location}</p>
                <motion.a
                  href="#registration"
                  className="inline-block bg-[#8A1538] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#6A102B] transition-colors"
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

      {/* Premium Why Flivv Section */}
      <section className="section-padding gradient-bg">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Flivv?
            </h2>
            <div className="w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {companyPillars.map((pillar, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-2xl p-8 text-center group hover-lift"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl mb-4 text-white font-bold">{index + 1}</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {pillar.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Premium FAQ Section */}
      <section className="section-padding bg-white">
        <div className="w-full max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#8A1538] to-[#6A102B] mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
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
                  className="w-full text-left p-8 bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
                  <motion.span
                    className="text-[#8A1538] text-xl flex-shrink-0"
                    animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
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
                      <div className="p-8 bg-white border-t border-gray-200">
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

      {/* Premium CTA Section with HubSpot Form */}
      <section id="registration" className="section-padding gradient-bg">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Register for the Event
            </h2>
            <div className="w-24 h-1 bg-white/50 mx-auto mb-6 rounded-full"></div>
            <p className="text-white/90 text-xl max-w-2xl mx-auto">
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
            <div className="p-8 md:p-12">
              <div 
                className="hs-form-frame" 
                data-region="na2" 
                data-form-id="d3b56077-11fe-485c-98cd-677027236164" 
                data-portal-id="21626983"
              ></div>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center mt-8"
            {...fadeInUp}
          >
          </motion.div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="section-padding gradient-bg border-t border-white/10">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
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
            
            <motion.div variants={fadeInUp}>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {['Event Highlights', 'Schedule', 'Register Now'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/80 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="border-t border-white/10 pt-8 text-center"
            {...fadeInUp}
          >
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Flivv Developers. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}