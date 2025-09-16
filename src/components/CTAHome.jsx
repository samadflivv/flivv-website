import React from 'react';
import Image from 'next/image';

const CTAHome = () => {
  return (
    <div className="m-3">
      <div className="relative w-full h-70 lg:h-[500px] rounded-xl overflow-hidden">
        
        <Image
          src="/teamflivvimg2.JPG"
          alt="Dream Home"
          fill
          className="object-cover rounded-lg"
        />

      
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal max-w-4xl">
            Not a conventional Real Estate company
          </h1>
          <a href='/contact'>
          <button
            aria-label="Book an appointment"
            className="mt-6 px-6 py-3 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full flex items-center space-x-2 shadow-lg hover:bg-white/30 transition duration-200 border"
          >
            <span>Get Free Consultation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 15l3-3m0 0l-3-3m3 3H3"
              />
            </svg>
          </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTAHome;
