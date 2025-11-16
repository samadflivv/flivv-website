'use client';

  import React, { useState } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import Image from 'next/image';

  const RFSactivityGuide = () => {
    const activities = [
      {
        time: "08:00 AM - 09:00 AM",
        description: "Savor a fresh morning feast from our culinary team while enjoying the nature's beauty.",
        image: "/Coffecup.png" 
      },
      {
        time: "09:30 AM - 11:00 AM",
        description: "Embark on an exhilarating horseback ride and savor the glorious golden hues.",
        image: "/horsesride.png"
      },
      {
        time: "11:00 AM - 02:00 PM",
        description: "Dive into the pool, basking in the sun's warm embrace amid lush greenery.",
        image: "/RFSSwimmingPool.png"
      },
      {
        time: "02:30 PM - 03:30 PM",
        description: "Enjoy freshly prepared lunch after your outdoor adventures.",
        image: "/RFSbreakfast.jpg"
      },
      {
        time: "04:00 PM - 05:00 PM",
        description: "Engage in indoor games to rejuvenate your mind - challenge your wits with chess, indulge in a game of snooker, or master the art of table tennis.",
        image: "/RFSindoorGames.jpg"
      },
      {
        time: "05:00 PM - 06:00 PM",
        description: "Embrace the vibrant horse ride outdoors, indulging in the golden hour.",
        image: "/RFShorses.jpeg"
      },
      {
        time: "07:00 PM - 08:00 PM",
        description: "Awaken your inner cricketer as you take on box cricket and work your smashes in the tennis court.",
        image: "/RFSboxcricket.jpeg"
      },
      {
        time: "08:00 PM - 10:00 PM",
        description: "Finish your day with starry and breezy BBQ night with family, rewinding a day filled with cherished memories.",
        image: "/RFSbbq.jpg"
      }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    return (
      <div className="bg-white min-h-screen py-30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-normal text-center mb-10 text-gray-900">
            Daily Activity Guide
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Activity list */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-8">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="group cursor-pointer py-3 border-b border-gray-100"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Show image for ${activity.time}`}
                  >
                    <motion.p 
                      className={`text-xl md:text-3xl font-normal ${
                        activeIndex === index 
                          ? 'text-[#52B788]' 
                          : 'text-black'
                      }`}
                      initial={{ opacity: 0.8 }}
                      animate={{ 
                        opacity: activeIndex === index ? 1 : 0.8 
                      }}
                    >
                      {activity.time}
                    </motion.p>
                    <motion.p 
                      className="mt-2 text-base md:text-lg text-gray-600"
                      initial={{ opacity: 0.7 }}
                      animate={{ 
                        opacity: activeIndex === index ? 1 : 0.7 
                      }}
                    >
                      {activity.description}
                    </motion.p>
                    
                    {/* Mobile image - always in DOM but conditionally shown */}
                    <motion.div
                      className="mt-4 lg:hidden"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: activeIndex === index ? 1 : 0,
                        height: activeIndex === index ? 'auto' : 0
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {activeIndex === index && (
                        <div className="rounded-xl overflow-hidden">
                          <Image
                            src={activity.image}
                            alt={activity.description}
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover rounded-xl"
                          />
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop image container */}
            <div className="hidden lg:block w-full lg:w-1/2 sticky top-24 self-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: { 
                      duration: 0.2, 
                      ease: "easeInOut" 
                    }
                  }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-xl overflow-hidden shadow-lg border border-gray-200"
                >
                  <Image
                    src={activities[activeIndex].image}
                    alt={activities[activeIndex].description}
                    width={800}
                    height={600}
                    className="w-full h-[350px] object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default RFSactivityGuide;