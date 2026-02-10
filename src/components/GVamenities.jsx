'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GVamenities = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  
  // Card data with unique content for each card
  const cardsData = [
    {
      bgColor: "bg-gradient-to-br from-gray-900 to-black",
      title: "Personalized Designed Villas",
      highlight: "Villas",
      description: "Each home is a unique design with a private pool & mini outdoor area for the ultimate relaxation.",
      image: "GVilla.png"
    },
    {
      bgColor: "bg-gradient-to-br from-gray-900 to-gray-950",
      title: "Self-Sustained Community",
      highlight: "Community",
      description: "On-site café, supermarket, wellness center and healthcare facilities ensure convenience at your doorstep.",
      image: "GVcafe.png"
    },
    {
      bgColor: "bg-gradient-to-br from-gray-950 to-black",
      title: "Active & Engaging Lifestyle",
      highlight: "Lifestyle",
      description: "Outdoor recreation areas, jogging tracks, mini sports ground and a fitness center to promote health and wellness.",
      image: "GVpark.png"
    },
    {
      bgColor: "bg-gradient-to-br from-gray-900 to-gray-950",
      title: "Strategic Location",
      highlight: "Location",
      description: "Just 38 km from Aramgarh X Road, well-connected to NH 44, offering seamless access to the city.",
      image: "GVroad.png"
    }
  ];

 useEffect(() => {
  const timeouts = [];
  let tl; // timeline reference

  // Desktop animations
  if (containerRef.current && cardsRef.current.length) {
    const cards = cardsRef.current;
    const container = containerRef.current;
    
    gsap.set(cards, {
      y: index => 300 + (index * 500),
      scale: index => 1 - (0.05 * index),
      zIndex: index => cards.length - index,
      opacity: 1,
    });
    
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=400%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        markers: false,
      }
    });
    
    // existing anim steps (same as you had)
    tl.to(cards[0], { y: 0, scale: 1, zIndex: 3, duration: 0.5 }, 0);
    tl.to(cards[0], { scale: 0.95, y: -40, zIndex: 3, duration: 1 }, 0.5);
    tl.to(cards[1], { y: 0, scale: 1, zIndex: 4, duration: 1 }, 0.5);
    tl.to(cards[0], { scale: 0.9, y: -80, zIndex: 2, duration: 1 }, 1.5);
    tl.to(cards[1], { scale: 0.95, y: -40, zIndex: 3, duration: 1 }, 1.5);
    tl.to(cards[2], { y: 0, scale: 1, zIndex: 4, duration: 1 }, 1.5);
    tl.to(cards[0], { scale: 0.85, y: -120, zIndex: 1, duration: 1 }, 2.5);
    tl.to(cards[1], { scale: 0.9, y: -80, zIndex: 2, duration: 1 }, 2.5);
    tl.to(cards[2], { scale: 0.95, y: -40, zIndex: 3, duration: 1 }, 2.5);
    tl.to(cards[3], { y: 0, scale: 1, zIndex: 4, duration: 1 }, 2.5);

    // Basic refresh (immediate)
    ScrollTrigger.refresh();

    // Additional refreshes after slight delays to catch async layout changes
    timeouts.push(setTimeout(() => ScrollTrigger.refresh(), 120));
    timeouts.push(setTimeout(() => ScrollTrigger.refresh(), 600));
    timeouts.push(setTimeout(() => ScrollTrigger.refresh(), 1200));
  }

  // Mobile animations
  if (mobileCardsRef.current.length) {
    mobileCardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    timeouts.push(setTimeout(() => ScrollTrigger.refresh(), 200));
  }

  // refresh on load/resize (keeps things stable if images/fonts finish loading or viewport size changes)
  const onLoad = () => ScrollTrigger.refresh();
  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener('load', onLoad, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });

  return () => {
    // kill triggers & timeline
    if (tl && tl.scrollTrigger) {
      try { tl.kill(); } catch (e) {}
    }
    ScrollTrigger.getAll().forEach(trigger => {
      try { trigger.kill(); } catch (e) {}
    });

    // cleanup timeouts & listeners
    timeouts.forEach(t => clearTimeout(t));
    window.removeEventListener('load', onLoad);
    window.removeEventListener('resize', onResize);
  }
}, []);



  return (
    <div className="w-full bg-black min-h-screen">
      {/* Hero section */}
      <div className="pt-30 px-4 text-center bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-normal text-white mb-6">
           Premium <span className="bg-gradient-to-r text-[#E509EF]">Amenities</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Scroll Down to go through our Amenities at Gulmohar Villas
          </p>
          
          <div className="animate-bounce mt-12 hidden md:block">
            <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>

        {/* Mobile layout - vertical cards */}
        <div className="md:hidden space-y-6 px-4 py-8">
          {cardsData.map((card, index) => (
            <div
              key={index}
              ref={el => mobileCardsRef.current[index] = el}
              className={`rounded-2xl border border-gray-800 shadow-2xl overflow-hidden ${card.bgColor}`}
            >
              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-3xl font-normal text-white text-left">
                  {card.title.split(card.highlight)[0]} 
                  <span className="text-[#E509EF]"> {card.highlight}</span>
                </h3>
                <p className="text-white font-light text-lg text-left">
                  {card.description}
                </p>
                <div className="mt-4">
                  <img 
                    src={card.image} 
                    alt={card.highlight} 
                    className="w-full h-auto rounded-xl shadow-lg" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop layout - animated card stack */}
        <div 
          ref={containerRef}
          className="relative w-full hidden md:block"
        >
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-16 px-4">
            {cardsData.map((card, index) => (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className={`absolute w-full max-w-6xl rounded-2xl border border-gray-800 shadow-2xl overflow-hidden ${card.bgColor}`}
                style={{ minHeight: '400px' }}
              >
                <div className="p-12 h-full flex justify-center items-center">
                  <div className="w-1/2 pr-6 flex flex-col gap-6">
                    <h3 className="text-4xl md:text-6xl font-normal text-white text-left">
                      {card.title.split(card.highlight)[0]} 
                      <span className="text-[#E509EF]">{card.highlight}</span>
                    </h3>
                    <p className="text-white font-light text-2xl text-left mt-2">
                      {card.description}
                    </p>
                  </div>
                  <div className="w-1/2 flex">
                    <img 
                      src={card.image} 
                      alt={card.highlight} 
                      className="max-w-full h-auto rounded-xl shadow-lg" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GVamenities;