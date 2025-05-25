import Image from 'next/image';
import React from 'react';

const Exclusiveprojects2 = () => {
  return (
    <div className="px-4 sm:px-8 md:px-20 py-12" id="projects">
      {/* Highlights Section */}
      <div className='flex items-center justify-between'>
        {/* <p className="text-sm text-black">HIGHLIGHTS</p> */}
        <h1 className="text-3xl md:text-5xl font-normal tracking-tight mt-2">Actively Running Projects</h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Card 1 */}
        <div className="overflow-hidden">
          <div className="relative w-full h-64 md:h-90">
            <Image
              className="rounded-xl"
              src="/gv-ss.png"
              alt="Serenity Heights"
              fill
              style={{ objectFit: 'cover', borderRadius: '0.75rem' }} // tailwind's rounded-xl
              priority
            />
          </div>
          <div className="pt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-3xl font-normal">Gulmohar Villas</h2>
              <p className="text-lg md:text-2xl font-normal">Shadnagar</p>
            </div>
            <hr className="border-t border-gray-300 mt-4" />
            <p className="text-sm md:text-base text-gray-500 mt-2">
              Our first-ever HMDA-approved 22-acre villa plot project in Nagulapally, Shadnagar, designed to enhance community living.
            </p>
          </div>
        </div>

        {/* Card 2 (Duplicate example) */}
        <div className="overflow-hidden">
          <div className="relative w-full h-64 md:h-90">
            <Image
              className="rounded-xl"
              src="/rivendell.jpeg"
              alt="Serenity Heights"
              fill
              style={{ objectFit: 'cover', borderRadius: '0.75rem' }}
              priority
            />
          </div>
          <div className="pt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-3xl font-normal">Rivendell Farms</h2>
              <p className="text-lg md:text-2xl font-normal">Thimmajipet, Jadcherla</p>
            </div>
            <hr className="border-t border-gray-300 mt-4" />
            <p className="text-sm md:text-base text-gray-500 mt-2">
              A premium farmland project with 10+ amenities, sustainable living concept, exclusive memberships, and full of experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exclusiveprojects2;
