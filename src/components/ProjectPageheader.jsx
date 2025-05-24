import React from 'react';

const ProjectPageheader = () => {
  return (
    <section className="bg-[#111] text-white px-4 md:px-0 py-4 md:py-0 m-3 rounded-xl overflow-hidden">
      <div className="max-w-full mx-auto flex flex-row md:flex-col gap-8 md:gap-12 sm:pt-45 pt-30">
        {/* Left Content */}
        <div className="flex flex-col md:flex-row items-end md:w-full sm:pl-25 sm:pr-20">
          <h1 className="text-3xl md:text-5xl font-normal leading-tight mb-4 w-1/1">
           Offering You The Best Real Estate Services
          </h1>
          <p className="text-gray-400 text-base md:text-base">
            Our goal is to provide you with the best service by understanding your needs and exceeding expectations. We constantly strive to improve and deliver better every step of the way.
          </p>
        </div>

        {/* Right Side Images (for desktop) */}
        <div className="hidden md:flex md:w-1/2 gap-8">
          <img
            src="/ns-front-2.jpeg"
            alt="Luxury Home"
            className="md:rounded-bl-lg  md:rounded-tr-xl h-auto object-cover"
          />
          <img
            src="/riv.jpeg"
            alt="Luxury Home 2"
            className="md:rounded-br-lg md:rounded-tl-xl  h-auto object-cover"
          />
        </div>
      </div>

      {/* Images (for mobile) */}
      <div className="md:hidden flex flex-col gap-4 mt-8">
        <img
          src="/nsfront.jpeg"
          alt="Luxury Home Mobile 1"
          className="rounded-xl w-full h-auto object-cover"
        />
        <img
          src="/riv.jpeg"
          alt="Luxury Home Mobile 2"
          className="rounded-xl w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default ProjectPageheader;
