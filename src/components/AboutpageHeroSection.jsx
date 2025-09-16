import React from 'react';

const AboutPageHeroSection = () => {
  return (
    <section className="bg-[#111] text-white px-4 md:px-0 py-4 md:py-0 m-3 rounded-xl overflow-hidden">
      <div className="max-w-full mx-auto flex flex-col gap-8 md:gap-12 sm:pt-45 pt-30">
        {/* Left Content */}
        <div className="flex flex-col md:flex-row items-end md:w-full sm:pl-25 sm:pr-20">
          <h1 className="text-3xl md:text-5xl font-normal leading-tight mb-4 lg:mb-0 w-1/1">
            Your Trust,<br />Our Commitment
          </h1>
          <p className="text-gray-400 text-base md:text-lg w-1/">
            As a full-service real estate partner, we guarantee smooth, hands-on support through every step - from selection to resale - with uncompromising quality.
          </p>
        </div>

        {/* Right Side Single Image (desktop) */}
        <div className="flex w-full">
          <img
            src="/teamflivvimg2.JPG"
            alt="Luxury Home"
            className="rounded-xl w-full lg:h-160 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutPageHeroSection;
