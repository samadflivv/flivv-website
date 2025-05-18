import React from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/button';

const Herosection = () => {
  return (
    <header>
      <div className="relative bg-[url('/hero-img-2.jpg')] bg-cover bg-center h-screen m-3 rounded-xl overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />

        {/* Navigation */}
        <div className="absolute top-0 left-0 w-full z-30">
          <Navigation />
        </div>

        {/* Hero Content */}
        <div className="flex flex-col justify-center h-full px-6 md:px-16 lg:px-[100px] z-20 relative gap-6">
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-white leading-tight">
            Dedicated to helping you <br /> Invest Wisely in Real Estate
          </h1>

          <p className="text-white text-base sm:text-lg leading-relaxed">
            We’re full-fledged developers and marketers of premium open plot ventures committed <br/> to providing you with the highest quality service and expertise with regard to <br/>real estate investments in Hyderabad.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a href="/contact">
            <Button variant="secondary" className="w-full md:w-40 rounded-full py-6 px-6 border border-black text-lg">
              Book Visit
            </Button>
            </a>
            <a href="#projects">
            <Button variant="secondary" className="w-full md:w-50 flex items-center justify-center gap-2 bg-white/10 text-white text-lg border border-white rounded-full py-6 px-6 font-semibold backdrop-blur-md hover:bg-white/20 transition-all">
              Explore Projects
            </Button>
            </a> 
          </div>
        </div>
      </div>
    </header>
  );
};

export default Herosection;
