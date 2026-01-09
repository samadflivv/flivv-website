import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const UpcomingSalesMeetRiyadh = () => {
  // Load HubSpot form script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js-na2.hsforms.net/forms/embed/21626983.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const eventDetails = [
    {
      label: 'Date',
      value: '9th, 10th January 2026',
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      )
    },
    {
      label: 'Session Type',
      value: '1:1 Sales Session',
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
    {
      label: 'Hotel',
      value: 'Crowne Plaza, Riyadh Palace',
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M4.5 3v18m0-18h15m-15 0v18m9-13.5v7.5m-7.5-7.5v7.5m0-7.5h7.5m-7.5 0h7.5" />
        </svg>
      )
    },
    {
      label: 'Meeting Venue',
      value: 'Janadriyah Hall',
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      )
    }
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      className="relative w-full bg-[#002200] pt-40 lg:py-40 px-6 lg:px-16"
      aria-labelledby="sales-meet-heading"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Content */}
        <motion.div 
          className="lg:col-span-6 space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          {/* Badge */}
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
            Upcoming Sales Meet – Riyadh, KSA
          </span>

          {/* Heading */}
          <h2 
            id="sales-meet-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
          >
            Exclusive 1:1 Sales Session in Riyadh
          </h2>

          {/* Subheading */}
          <p className="text-lg text-gray-200 max-w-xl">
            Meet our team personally and explore high-potential land investment opportunities in Hyderabad.
          </p>

          {/* Event Details */}
          <div className="border-l-4 border-emerald-500 pl-6 space-y-3 text-gray-400">
            {eventDetails.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
                  {item.icon}
                </div>
                <div>
                  <span className="font-semibold">{item.label}: </span>
                  <span>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div 
          className="lg:col-span-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInScale}
        >
          <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-lg lg:p-8">
            <h3 className="text-4xl font-bold text-gray-900 p-6">
              Register for the Sales Meet
            </h3>
            
            {/* HubSpot Form */}
            <div className="hs-form-frame" 
                 data-region="na2" 
                 data-form-id="60910235-031b-47fe-8214-048ba1989721" 
                 data-portal-id="21626983"
                 aria-label="Registration form for the Sales Meet in Riyadh">
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingSalesMeetRiyadh;