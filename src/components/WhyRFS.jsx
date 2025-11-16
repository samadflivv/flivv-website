'use client';
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const WhyRFS = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const leftStickyRef = useRef(null);
  const cardRefs = useRef([]);

  const cards = [
    {
      id: 1,
      title: "Low Pollution Zone",
      description: "Farmlands are typically surrounded by fresh air and a peaceful atmosphere, making them ideal low-pollution zones. Rivendell Farms is perfectly nestled in such a serene and beautiful location.",
      image: "/Lowpollutionzone.jpg"
    },
    {
      id: 2,
      title: "Sustainable Living ",
      description: "At Rivendell Farms, we've taken great care to preserve the natural beauty of the space. Embracing the concept of eco-friendly cottage living, we're committed to promoting a sustainable lifestyle amidst lush greenery.",
      image: "/rfssustainableliving.jpeg"
    },
    {
      id: 3,
      title: "Affordable Investment",
      description: "Farmland investments are generally more affordable than other types of property, making it easier to take the first step toward land ownership. It might just be the perfect place to start your investment journey.",
      image: "/RFSclubHouse.jpg"
    },
  ];

  // Detect mobile/desktop and update state
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      return mobile;
    };
    
    checkMobile();
    
    const handleResize = () => {
      const wasMobile = isMobile;
      const nowMobile = checkMobile();
      
      // Only refresh if mobile state actually changed
      if (wasMobile !== nowMobile) {
        // Use a small timeout to ensure DOM is updated
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // Initialize GSAP ScrollTriggers with proper cleanup
  useEffect(() => {
    if (!containerRef.current) return;

    // Kill any existing ScrollTriggers from this component first
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger?.classList?.contains('why-rfs-cards-wrapper') || 
          trigger.vars.trigger === containerRef.current) {
        trigger.kill();
      }
    });

    const ctx = gsap.context(() => {
      const cardsContainer = containerRef.current?.querySelector('.why-rfs-cards-wrapper');

      // Only enable pinning on desktop
      if (!isMobile && cardsContainer && leftStickyRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top+=120',
          end: () => `+=${cardsContainer.scrollHeight - window.innerHeight + 200}`,
          pin: leftStickyRef.current,
          pinSpacing: false,
          markers: false,
          id: 'why-rfs-pin' // Add ID for easier identification
        });
      }

      // Create card triggers with unique IDs
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: isMobile ? 'top 70%' : 'top center',
          end: isMobile ? 'bottom 30%' : 'bottom center',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
          markers: false,
          id: `why-rfs-card-${index}` // Add ID for easier identification
        });
      });
    }, containerRef);

    return () => {
      // Properly revert the context
      if (ctx && ctx.revert) {
        ctx.revert();
      }
      
      // Manually kill any remaining ScrollTriggers from this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.id && trigger.id.includes('why-rfs')) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]);

  // Smooth scroll to card
  const scrollToCard = (index) => {
    const card = cardRefs.current[index];
    if (card) {
      const offset = isMobile ? 100 : 120;
      const y = card.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToCard(index);
    }
    if (e.key === 'ArrowDown' && index < cards.length - 1) {
      e.preventDefault();
      scrollToCard(index + 1);
    }
    if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      scrollToCard(index - 1);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#D8F3DC] py-6 lg:py-12"
      role="region"
      aria-label="Why RFS - how we work"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-12 lg:gap-30 items-start">
        {/* Mobile sticky top bar */}
        {isMobile && (
          <div className="col-span-12 sticky top-0 z-40 bg-[#D8F3DC] pt-3 pb-2 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="hidden lg:inline-flex items-center px-2 py-2 text-sm bg-white rounded-xl shadow text-gray-700">
                    Premium Farmland Project
                  </span>
                  <h2 className="text-4xl font-normal text-gray-900 leading-tight">
                    Why choose Rivendell Farms?
                  </h2>
                </div>
              </div>

              <nav aria-label="Mobile step navigation" className="mt-3">
                <ol className="flex gap-3 pr-2 overflow-x-auto pb-2">
                  {cards.map((_, index) => (
                    <li key={index}>
                      <button
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all shrink-0 ${
                          activeIndex === index
                            ? 'bg-gray-900 text-white shadow-lg scale-105'
                            : 'bg-white border border-gray-300 text-gray-700'
                        }`}
                        onClick={() => scrollToCard(index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        aria-label={`Go to step ${index + 1}`}
                        aria-current={activeIndex === index ? 'step' : 'false'}
                        tabIndex={0}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        )}

        {/* Left Column - Sticky Content (desktop only) */}
        <aside className="hidden lg:block col-span-5 relative">
          <div ref={leftStickyRef} className="sticky top-32">
            <div className="inline-flex items-center px-5 py-2 text-base bg-white rounded-xl shadow text-gray-700">
              Premium Farmland Project   
            </div>

            <h2 className="text-4xl lg:text-6xl font-normal text-gray-900 leading-tight mt-4 mb-4">
              Why choose Rivendell Farms?
            </h2>

            <nav className="mt-4">
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
                      aria-controls={`why-rfs-card-${index}`}
                      tabIndex={0}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </aside>

        {/* Right Column - Scrollable Cards */}
        <div className={`${isMobile ? 'col-span-12 mt-4' : 'col-span-7 lg:col-span-6'}`}>
          <div className="why-rfs-cards-wrapper space-y-6 lg:space-y-8">
            {cards.map((card, index) => (
              <article
                key={card.id}
                ref={el => cardRefs.current[index] = el}
                id={`why-rfs-card-${index}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
                aria-labelledby={`why-rfs-card-${index}-title`}
                role="article"
              >
                <div className="relative w-full h-48 md:h-64">
                  <Image 
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg=="
                  />
                  <span className="absolute left-4 bottom-4 text-4xl md:text-6xl font-bold text-white opacity-90">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="bg-[#081C15] p-5 md:p-6 rounded-b-lg">
                  <h3 id={`why-rfs-card-${index}-title`} className="text-xl font-semibold text-[#D8F3DC] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRFS;