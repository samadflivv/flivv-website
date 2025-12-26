"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FarmFestCTA = () => {
  const ctaRef = useRef(null);
  const farmFestCardRef = useRef(null);
  const projectCardsRef = useRef([]);
  const floatingElementsRef = useRef([]);

  // Color scheme
  const colors = {
    primary: '#081C15',    // Dark green
    secondary: '#D8F3DC',  // Light green
    accent: '#1B4332',     // Medium green
    highlight: '#2D6A4F',  // Brighter green
    gold: '#D4AF37',       // Gold for accents
  };

  // Farm Fest Card (Row 1)
  const farmFestCard = {
    id: 1,
    title: 'Sales Fest at Rivendell Farms',
    subtitle: 'Sales Meet & Celebration',
    description: 'Join us at Rivendell Farms on Saturday, 27th December 2026, for our biggest celebration yet. Explore exciting investment opportunities at Gulmohar Villas, Airport Town, and Gulmohar Homes, while enjoying a fun-filled winter day with the Flivv family and witnessing the latest developments by Flivv Developers.',
    date: '27th Dec, Saturday',
    time: '10 AM Onwards',
    location: 'Rivendell Farms',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    action: 'form',
    bgColor: colors.secondary,
    gradient: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.highlight} 100%)`,
  };


  // Handle Farm Fest button click
  const handleFarmFestClick = () => {
    const formElement = document.getElementById('farm-fest-form');
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle project card click
  const handleProjectClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Animations
  useEffect(() => {
    // Animate Farm Fest card
    if (farmFestCardRef.current) {
      gsap.fromTo(
        farmFestCardRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: farmFestCardRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    // Animate project cards with stagger
    projectCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: 0.5 + index * 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
          }
        );
      }
    });

    // Animate floating elements
    floatingElementsRef.current.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          y: `random(-20, 20)`,
          x: `random(-15, 15)`,
          rotation: `random(-5, 5)`,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });

    // Background animation
    if (ctaRef.current) {
      gsap.to(ctaRef.current, {
        backgroundPosition: '100% 100%',
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const cardHover = {
    scale: 1.03,
    y: -8,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  };

  const buttonHover = {
    scale: 1.05,
    backgroundColor: colors.highlight,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  };

  const iconHover = {
    scale: 1.1,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  };

  return (
    <div 
      ref={ctaRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8"
      style={{
        backgroundColor: colors.primary,
        backgroundImage: `
          radial-gradient(circle at 10% 20%, ${colors.highlight}15 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, ${colors.accent}15 0%, transparent 40%),
          linear-gradient(135deg, ${colors.primary} 0%, #0a2418 100%)
        `,
        backgroundSize: '400% 400%',
      }}
    >
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23D8F3DC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
        }}></div>
      </div>

      {/* Floating decorative elements */}
      <div 
        ref={el => floatingElementsRef.current[0] = el}
        className="absolute top-1/4 left-10 w-6 h-6 opacity-10"
        style={{ 
          backgroundColor: colors.secondary,
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
        }}
      ></div>
      <div 
        ref={el => floatingElementsRef.current[1] = el}
        className="absolute bottom-1/3 right-20 w-8 h-8 opacity-10"
        style={{ 
          backgroundColor: colors.secondary,
          borderRadius: '50%'
        }}
      ></div>
      <div 
        ref={el => floatingElementsRef.current[2] = el}
        className="absolute top-1/2 left-1/4 w-4 h-4 opacity-10"
        style={{ 
          backgroundColor: colors.secondary,
          transform: 'rotate(45deg)'
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: colors.accent + '40', border: `1px solid ${colors.secondary}20` }}
          >
            <span className="text-sm font-medium uppercase tracking-widest"
              style={{ color: colors.secondary + 'CC' }}
            >
              Rivendell Farms
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: colors.secondary }}
          >
            Year-End  <span className="relative inline-block">
              <span className="relative z-10">Celebration</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 opacity-20"
                style={{ backgroundColor: colors.gold }}
              ></span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: colors.secondary + 'CC' }}
          >
            Join us for a joyful rural getaway filled with exciting activities and a chance to explore Flivv’s projects at Shadnagar.
          </p>
        </motion.div>

        {/* Row 1: Farm Fest Card */}
        <div className="mb-16">
          <motion.div
            ref={farmFestCardRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            whileHover={cardHover}
            className="max-w-4xl mx-auto cursor-pointer"
            onClick={handleFarmFestClick}
          >
            <div 
              className="rounded-3xl overflow-hidden border-2 transition-all duration-300"
              style={{
                background: farmFestCard.gradient,
                borderColor: colors.secondary + '20',
                boxShadow: `0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 ${colors.secondary}10`,
              }}
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Icon */}
                  <motion.div
                    whileHover={iconHover}
                    className="flex-shrink-0"
                    style={{ color: colors.primary }}
                  >
                    {farmFestCard.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2"
                          style={{ color: colors.primary }}
                        >
                          {farmFestCard.title}
                        </h2>
                        <p className="text-lg mb-4"
                          style={{ color: colors.primary + 'CC' }}
                        >
                          {farmFestCard.subtitle}
                        </p>
                      </div>
                      
                      {/* Register Button */}
                      <motion.a
                      href="#rfsctaform"
                        whileHover={buttonHover}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 self-start md:self-center mt-4 md:mt-0"
                        style={{
                          backgroundColor: colors.gold,
                          color: colors.primary,
                          boxShadow: `0 4px 20px ${colors.gold}40`,
                        }}
                      >
                        Register Now
                      </motion.a >
                    </div>

                    <p className="text-base md:text-lg mb-8 leading-relaxed"
                      style={{ color: colors.primary + 'CC' }}
                    >
                      {farmFestCard.description}
                    </p>

                    {/* Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t"
                      style={{ borderColor: colors.primary + '20' }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: colors.primary + '10' }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style={{ color: colors.primary }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm uppercase tracking-wider font-medium"
                            style={{ color: colors.primary + 'AA' }}
                          >
                            Date
                          </div>
                          <div className="font-semibold" style={{ color: colors.primary }}>
                            {farmFestCard.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: colors.primary + '10' }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style={{ color: colors.primary }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm uppercase tracking-wider font-medium"
                            style={{ color: colors.primary + 'AA' }}
                          >
                            Time
                          </div>
                          <div className="font-semibold" style={{ color: colors.primary }}>
                            {farmFestCard.time}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: colors.primary + '10' }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style={{ color: colors.primary }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm uppercase tracking-wider font-medium"
                            style={{ color: colors.primary + 'AA' }}
                          >
                            Location
                          </div>
                          <div className="font-semibold" style={{ color: colors.primary }}>
                            {farmFestCard.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FarmFestCTA;