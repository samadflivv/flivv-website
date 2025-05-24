// import React from 'react';
// import { ArrowRight } from 'lucide-react';

// const Aboutsection = () => {
//   return (
//     <section className="px-6 md:px-24 py-16 bg-white mr-8 ml-8">
//       <div className="flex flex-col lg:flex-row justify-between gap-12">
        
//         {/* Left Column */}
//         <div className="flex flex-col justify-start max-w-2xl">
//           <h1 className="text-4xl md:text-5xl font-normal leading-tight">
//             Embrace luxury and indulge in <br />
//             a life of{' '}
//             <span className="text-gray-500 font-normal">
//               elegance, serenity, and paradise.
//             </span>
//           </h1>

//           {/* Overlapping Avatars */}
//           <div className="flex items-center mt-8 -space-x-4">
//             {[1, 2, 3].map((_, idx) => (
//               <img
//                 key={idx}
//                 src={`/avatars/user-${idx + 1}.jpg`}
//                 className="w-15 h-15 rounded-full border-2 border-grey"
//                 alt={`User ${idx + 1}`}
//               />
//             ))}
//           </div>

//           {/* Paragraph */}
//           <p className="mt-4 text-gray-500 max-w-md">
//             Experience a lifestyle of unmatched elegance and comfort.
//             <br />
//             Discover spaces crafted for those who seek the extraordinary.
//           </p>
//         </div>

//         {/* Right Column with Bottom-Aligned Button */}
//         <div className="flex justify-end items-end w-full lg:w-auto">
//           <button className="flex items-center gap-2 px-6 py-3 border border-black text-black rounded-full bg-transparent hover:bg-black hover:text-white transition duration-300">
//             Explore More <ArrowRight size={18} />
//           </button>
//         </div>
//       </div>

      
//   {/* Logos scroller */}
//   <>
//   <div className="relative overflow-hidden mt-6">
//     {/* Fading edges */}
//     <div className="pointer-events-none absolute inset-0 z-10" style={{
//       background: "linear-gradient(to right, white 0%, transparent 10%, transparent 90%, white 100%)"
//     }} />

//     <div className="flex w-max animate-scroll whitespace-nowrap">
//       {/* Duplicated logos for seamless loop */}
//       {[...Array(2)].flatMap((_, index) =>
//         [...Array(8)].map((_, i) => (
//           <img
//             key={`${index}-${i}`}
//             src={`/logos/logo-${(i % 8) + 1}.png`}
//             alt="Logo"
//             className="h-30 mx-12 grayscale opacity-50"
//           />
//         ))
//       )}
//     </div>
//   </div>

//   {/* Keyframes */}
//   <style>
//     {`
//       @keyframes scroll {
//         0% { transform: translateX(0); }
//         100% { transform: translateX(-50%); }
//       }
//       .animate-scroll {
//         animation: scroll 20s linear infinite;
//       }
//     `}
//   </style>
// </>





//     </section>
//   );
// };

// export default Aboutsection;


'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Aboutsection = () => {
  return (
    <section className="px-4 sm:px-6 md:px-16 lg:px-24 py-16 bg-white">
      {/* Top content section */}
      <div className="flex flex-col lg:flex-row justify-between gap-12">
        {/* Left Column */}
        <div className="flex flex-col justify-start max-w-2xl">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-normal leading-tight">
            Enhancing open lands with high-quality development amenities {' '}
            <span className="text-gray-500 font-normal">
              to increase the value of the projects we market
            </span>
          </h1>

          {/* Overlapping Avatars */}
          <div className="flex items-center mt-6 -space-x-4">
            {[1, 2, 3].map((_, idx) => (
              <img
                key={idx}
                src={`/avatars/user-${idx + 1}.jpg`}
                className="w-16 h-16 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-gray-300"
                alt={`User ${idx + 1}`}
              />
            ))}
          </div>

          {/* Paragraph */}
          <p className="mt-4 text-gray-500 text-base sm:text-base max-w-md">
            Our goal is to ensure that initial investors and end-users of the projects we develop, market, and sell benefit from their investment journey by maximizing returns and securing long-term value.
          </p>
        </div>

        {/* Right Column - Button */}
        <div className="flex lg:items-end justify-end lg:justify-end w-full lg:w-auto">
          <a href='/about'>
          <button className="w-full sm:w-50 justify-center lg:mt-0 flex items-center gap-2 px-6 py-3 border border-black text-black rounded-full bg-transparent hover:bg-black hover:text-white transition duration-300">
            More About us <ArrowRight size={18} />
          </button>
          </a>
        </div>
      </div>

      {/* Logo Scroller */}
      <>
        {/* <div className="relative overflow-hidden mt-10"> */}
          {/* Fading edges */}
          {/* <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(to right, white 0%, transparent 10%, transparent 90%, white 100%)',
            }}
          /> */}

          {/* Logos Row */}
          {/* <div className="flex w-max animate-scroll whitespace-nowrap">
            {[...Array(2)].flatMap((_, index) =>
              [...Array(8)].map((_, i) => (
                <img
                  key={`${index}-${i}`}
                  src={`/logos/logo-${(i % 8) + 1}.png`}
                  alt="Logo"
                  className="h-30 sm:h-30 mx-6 sm:mx-12 grayscale opacity-50"
                />
              ))
            )}
          </div>
        </div> */}

        {/* Keyframes for Scroll */}
        {/* <style>
          {`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll {
              animation: scroll 20s linear infinite;
            }
          `}
        </style> */}
      </>
    </section>
  );
};

export default Aboutsection;
