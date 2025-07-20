'use client';
import React, { useEffect, useRef } from 'react';

const GVcta = () => {
  const formRef = useRef(null);

  useEffect(() => {
    const loadHubspotForm = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: 'na1',
          portalId: '21626983',
          formId: '5c08b617-0cec-4ba4-b41a-4bdac66346a4',
          target: '#hubspot-form-container',
        });
      }
    };

    const existingScript = document.querySelector('script[src="https://js.hsforms.net/forms/embed/v2.js"]');

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/embed/v2.js';
      script.async = true;
      script.defer = true;
      script.onload = loadHubspotForm;
      document.body.appendChild(script);
    } else {
      loadHubspotForm();
    }
  }, []);

  return (
    <section className="relative bg-black text-white py-20 px-4 md:px-16 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-20 z-0"></div>
      <div className="absolute bottom-1/2 right-1/4 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left side */}
        <div className="space-y-10">
          <div>
            <h2 className="text-5xl md:text-6xl pb-5 font-semibold leading-tight">
              Ready? Let’s talk
            </h2>
            <p className="text-xl md:text-2xl font-light">
              Connect with us to explore Gulmohar Villas opportunities.
            </p>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            {['villa', 'plot', 'plant'].map((iconName, index) => (
              <div key={index} className="p-1 rounded-full border border-white/30">
                <div className="w-14 h-14 bg-[#0E1523] rounded-full flex items-center justify-center shadow-lg">
                  <img
                    src={`/icons/${iconName}.png`}
                    alt={iconName}
                    className="w-7 h-7"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Badge */}
          <div className="inline-flex items-center space-x-4 bg-[#E509EF]/20 px-4 py-2 rounded-xl text-white border border-white/20">
            <div className="w-2 h-2 rounded-full bg-[#E509EF] animate-pulse"></div>
            <div>
              <span className="text-lg font-semibold">Gulmohar Villas</span>
              <p className="text-xs text-gray-300">Taking bookings this month</p>
            </div>
          </div>
        </div>

        {/* Right side with HubSpot form */}
        <div className="bg-white text-black rounded-2xl shadow-xl relative">
          <h3 className="text-3xl font-semibold pl-10 pt-8">
            Leave your details & we’ll get in touch
          </h3>
          <div
            id="hubspot-form-container"
            ref={formRef}
            className="text-sm"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default GVcta;
