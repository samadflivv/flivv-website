import Image from 'next/image';
import React from 'react'

const Exclusiveprojects = () => {
  return (
    <div className="p-8 mr-20 ml-20">
      {/* Highlights Section */}
      <div>
        <p className="text-sm font-normal text-black">HIGHLIGHTS</p>
        <h1 className="text-5xl font-normal tracking-tight mt-2">Exclusive Projects</h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Card 1 */}
        <div className="overflow-hidden">
          <div className="relative w-full h-100">
            <Image
            className='rounded-xl'
              src="/hero-img-2.jpg"
              alt="Serenity Heights"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="pt-4">
            <div className="flex justify-between">
              <h2 className="text-3xl font-normal">Serenity Heights</h2>
              <p className="text-2xl font-normal">$40000</p>
            </div>
            <hr className="border-t border-gray-300 mt-4" />
            <p className="text-base text-gray-500 mt-2">3 Bedroom · 1 Bathroom · 3 Livingroom</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="overflow-hidden">
          <div className="relative w-full h-100">
            <Image
            className='rounded-xl'
              src="/hero-img-2.jpg"
              alt="Serenity Heights"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="pt-4">
            <div className="flex justify-between">
              <h2 className="text-3xl font-normal">Serenity Heights</h2>
              <p className="text-2xl font-normal">$40000</p>
            </div>
            <hr className="border-t border-gray-300 mt-4" />
            <p className="text-base text-gray-500 mt-2">3 Bedroom · 1 Bathroom · 3 Livingroom</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Exclusiveprojects