'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GVamenities = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  
  // Card data with unique content for each card
  const cardsData = [
    {
      bgColor: "bg-gradient-to-br from-gray-900 to-black",
      content: (
        <div className="p-12 h-full flex justify-center items-center">
          <div className="w-1/2 pr-6 flex flex-col gap-6">
          <h3 className="text-4xl md:text-6xl font-normal text-white text-left">
            Personalized Designed <span className="text-[#E509EF]">Villas</span>
          </h3>
            <p className="text-white font-light text-2xl text-left mt-2">
              Each home is a unique design with a private pool & mini outdoor area for the ultimate relaxation.
            </p>
          </div>
          <div className="w-1/2 flex">
           <img src="GVilla.png" alt="Villa" className="max-w-full h-auto rounded-xl shadow-lg" />
          </div>
        </div>
      )
    },
    {
      bgColor: "bg-gradient-to-br from-gray-900 to-gray-950",
      content: (
        <div className="p-12 h-full flex justify-center items-center">
          <div className="w-1/2 pr-6 flex flex-col gap-6">
          <h3 className="text-4xl md:text-6xl font-normal text-white text-left">
            Self-Sustained <span className="text-[#E509EF]">Community</span>
          </h3>
            <p className="text-white font-light text-2xl text-left mt-2">
              On-site café, supermarket, wellness center and healthcare facilities ensure convenience at your doorstep.
            </p>
          </div>
          <div className="w-1/2 flex">
           <img src="GVcafe.png" alt="Villa" className="max-w-full h-auto rounded-xl shadow-lg" />
          </div>
        </div>
      )
    },
    {
      bgColor: "bg-gradient-to-br from-gray-950 to-black",
      content: (
        <div className="p-12 h-full flex justify-center items-center">
          <div className="w-1/2 pr-6 flex flex-col gap-6">
          <h3 className="text-4xl md:text-6xl font-normal text-white text-left">
            Active & Engaging <span className="text-[#E509EF]">Lifestyle</span>
          </h3>
            <p className="text-white font-light text-2xl text-left mt-2">
              Outdoor recreation areas, jogging tracks, mini sports ground and a fitness center to promote health and wellness.
            </p>
          </div>
          <div className="w-1/2 flex">
           <img src="GVpark.png" alt="Villa" className="max-w-full h-auto rounded-xl shadow-lg" />
          </div>
        </div>
      )
    },
    {
      bgColor: "bg-gradient-to-br from-gray-900 to-gray-950",
      content: (
        <div className="p-12 h-full flex justify-center items-center">
          <div className="w-1/2 pr-6 flex flex-col gap-6">
          <h3 className="text-4xl md:text-6xl font-normal text-white text-left">
            Strategic <span className="text-[#E509EF]">Location</span>
          </h3>
            <p className="text-white font-light text-2xl text-left mt-2">
              Just 38 km from Aramgarh X Road, well-connected to NH 44, offering seamless access to the city.
            </p>
          </div>
          <div className="w-1/2 flex">
           <img src="GVroad.png" alt="Villa" className="max-w-full h-auto rounded-xl shadow-lg" />
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current.length) return;
    
    const cards = cardsRef.current;
    const container = containerRef.current;
    
    // Set initial positions for cards
    gsap.set(cards, {
      y: index => 300 + (index * 500),
      scale: index => 1 - (0.05 * index),
      zIndex: index => cards.length - index,
      opacity: 1,
    });
    
    // Create timeline for scroll animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=400%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        markers: false,
      }
    });
    
    // Animation for Card 1 to stick at top
    tl.to(cards[0], {
      y: 0,
      scale: 1,
      zIndex: 3,
      duration: 0.5
    }, 0);
    
    // Animation for Card 2 to come over Card 1
    tl.to(cards[0], {
      scale: 0.95,
      y: -40,
      zIndex: 3,
      duration: 1
    }, 0.5);
    
    tl.to(cards[1], {
      y: 0,
      scale: 1,
      zIndex: 4,
      duration: 1
    }, 0.5);
    
    // Animation for Card 3 to come over Card 2
    tl.to(cards[0], {
      scale: 0.9,
      y: -80,
      zIndex: 2,
      duration: 1
    }, 1.5);
    
    tl.to(cards[1], {
      scale: 0.95,
      y: -40,
      zIndex: 3,
      duration: 1
    }, 1.5);
    
    tl.to(cards[2], {
      y: 0,
      scale: 1,
      zIndex: 4,
      duration: 1
    }, 1.5);
    
    // Animation for Card 4 to come over Card 3
    tl.to(cards[0], {
      scale: 0.85,
      y: -120,
      zIndex: 1,
      duration: 1
    }, 2.5);
    
    tl.to(cards[1], {
      scale: 0.9,
      y: -80,
      zIndex: 2,
      duration: 1
    }, 2.5);
    
    tl.to(cards[2], {
      scale: 0.95,
      y: -40,
      zIndex: 3,
      duration: 1
    }, 2.5);
    
    tl.to(cards[3], {
      y: 0,
      scale: 1,
      zIndex: 4,
      duration: 1
    }, 2.5);
    
    // Hide cards when moving to next section
    tl.to(cards, {
      // opacity: 0,
      duration: 0.5
    }, 3.5);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
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
            Scroll down to experience our innovative layered card animation
          </p>
          <div className="animate-bounce mt-12">
            <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>

        {/* Card stack section */}
        <div 
          ref={containerRef}
          className="relative w-full"
        >
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-16 px-4">
            {cardsData.map((card, index) => (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className={`absolute w-full max-w-6xl rounded-2xl border border-gray-800 shadow-2xl overflow-hidden ${card.bgColor}`}
                style={{ minHeight: '400px' }}
              >
                {/* Unique content for each card */}
                {card.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GVamenities;
