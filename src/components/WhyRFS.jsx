'use client';
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const WhyRFS = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const leftStickyRef = useRef(null);
  const progressTrackRef = useRef(null);
  const progressDotRef = useRef(null);
  const cardRefs = useRef([]);
  
  const cards = [
    {
      id: 1,
      title: "Low Pollution Zone",
      description: "We begin by sitting down with you to understand your vision, goals, and preferences. We listen carefully to your ideas, discuss needs, and explore what's possible.",
      image: "/Lowpollutionzone.jpg"
    },
    {
      id: 2,
      title: "Grow Organic Food",
      description: "We create a clear roadmap — timelines, deliverables, and resources — so everyone knows what success looks like.",
      image: "/Organixfarming.jpg"
    },
    {
      id: 3,
      title: "Affordable investment",
      description: "We design, build, and iterate with you. Regular check-ins ensure alignment and quality.",
      image: "/RFSclubHouse.jpg"
    },
    {
      id: 4,
      title: "Tax Benefits",
      description: "We hand off the final product with documentation and ongoing support options to keep things smooth.",
      image: "/LandtaxBenefits.jpg"
    }
  ];

  // Initialize GSAP ScrollTriggers
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardsContainer = containerRef.current.querySelector('.cards-wrapper');
      
      // Only enable pinning on desktop
      if (window.innerWidth >= 1024) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top+=120',
          end: () => `+=${cardsContainer.scrollHeight - window.innerHeight + 200}`,
          pin: leftStickyRef.current,
          pinSpacing: false
        });
      }

      // Create card triggers
      cardRefs.current.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
          markers: false // Disable in production
        });
      });

      // Handle reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        ScrollTrigger.getAll().forEach(trigger => {
          trigger.disable();
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Update progress dot position
  useEffect(() => {
    if (progressTrackRef.current && progressDotRef.current) {
      const trackHeight = progressTrackRef.current.offsetHeight;
      const position = (activeIndex / (cards.length - 1)) * trackHeight;
      gsap.to(progressDotRef.current, {
        y: position,
        duration: 0.3,
        ease: 'power1.out'
      });
    }
  }, [activeIndex]);

  // Handle number click
  const scrollToCard = (index) => {
    const card = cardRefs.current[index];
    if (card) {
      gsap.to(window, {
        scrollTo: {
          y: card,
          offsetY: 120
        },
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      scrollToCard(index);
    }
    if (e.key === 'ArrowDown' && index < cards.length - 1) {
      scrollToCard(index + 1);
    }
    if (e.key === 'ArrowUp' && index > 0) {
      scrollToCard(index - 1);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#D8F3DC] py-12"
      role="region"
      aria-label="Why RFS - how we work"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-30 items-start">
        {/* Left Column - Sticky Content */}
        <aside className="col-span-5 lg:col-span-5 relative top-25">
          <div ref={leftStickyRef} className="sticky">
            <span className="inline-flex items-center px-5 py-2 text-base bg-white rounded-xl shadow text-gray-700">
              How we work
            </span>
            <h2 className="text-4xl lg:text-6xl font-normal text-gray-900 leading-tight mt-4">
              Why choose Rivendell Farms?
            </h2>
            
            {/* Number Navigation Bar */}
            <nav className="mt-6 flex items-start space-x-6">
              <ol className="flex flex-row gap-4">
                {cards.map((_, index) => (
                  <li key={index}>
                    <button
                      className={`w-12 h-12 rounded-lg flex items-center justify-center border text-sm font-medium transition-all ${
                        activeIndex === index 
                          ? 'bg-gray-900 text-white shadow-lg scale-105' 
                          : 'bg-white border-gray-300'
                      }`}
                      onClick={() => scrollToCard(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      aria-label={`Go to step ${index + 1}`}
                      aria-current={activeIndex === index ? 'step' : 'false'}
                      aria-controls={`card-${index}`}
                      tabIndex={0}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ol>
              <div 
                ref={progressTrackRef} 
                className="relative w-1 bg-gray-200 rounded-full"
              >
              </div>
            </nav>
          </div>
        </aside>

        {/* Right Column - Scrollable Cards */}
        <div className="col-span-7 lg:col-span-6">
          <div className="cards-wrapper space-y-8">
            {cards.map((card, index) => (
              <div 
                key={card.id}
                ref={el => cardRefs.current[index] = el}
                id={`card-${index}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <div className="relative h-64">
                  <Image 
                    src={card.image}
                    alt={card.title}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,..." // Add actual base64
                  />
                  <span className="absolute left-6 bottom-6 text-6xl font-bold text-white opacity-90">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="bg-[#081C15] p-6 rounded-b-lg">
                  <h3 className="text-xl font-semibold text-[#D8F3DC] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-400">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRFS;