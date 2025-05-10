import Image from 'next/image';
import React from 'react'

const FourthSection = () => {
  return (
    <div className="p-8 space-y-16 mr-20 ml-20">
      {/* Exceptionalities Section */}
      <div>
        <p className="text-sm font-normal text-black">EXCEPTIONALITIES</p>
        <h1 className="text-5xl font-normal tracking-tight mt-2">The Art of Exceptional Living</h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-12">
          {/* Card 1 */}
          <div>
            <div className="relative w-full h-90">
              <Image
                src="/17.jpg"
                alt="Elite Craftsmanship"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <h2 className="text-2xl font-semibold pt-4">Elite Craftsmanship</h2>
            <p className="text-base font-medium text-gray-400 pr-8 pt-2">
              Meticulously designed with the finest materials and attention to detail.
            </p>
          </div>

          {/* Card 2 */}
          <div>
          <h2 className="text-2xl font-semibold pb-2">Elite Craftsmanship</h2>
            <p className="text-base font-medium text-gray-400 pb-3">
              Meticulously designed with the finest materials and attention to detail.
            </p>
            <div className="relative w-full h-90">
              <Image
                src="/17.jpg"
                alt="Elite Craftsmanship"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div>
            <div className="relative w-full h-90">
              <Image
                src="/17.jpg"
                alt="Elite Craftsmanship"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <h2 className="text-2xl font-semibold pt-4">Elite Craftsmanship</h2>
            <p className="text-base font-medium text-gray-400 pr-8 pt-2">
              Meticulously designed with the finest materials and attention to detail.
            </p>
          </div>

          {/* Card 4 */}
          <div>
          <h2 className="text-2xl font-semibold pb-2">Elite Craftsmanship</h2>
            <p className="text-base font-medium text-gray-400 pb-3">
              Meticulously designed with the finest materials and attention to detail.
            </p>
            <div className="relative w-full h-90">
              <Image
                src="/17.jpg"
                alt="Elite Craftsmanship"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FourthSection