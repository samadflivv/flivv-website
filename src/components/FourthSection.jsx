// import Image from 'next/image';
// import React from 'react'

// const FourthSection = () => {
//   return (
//     <div className="p-8 space-y-16 mr-20 ml-20">
//       {/* Exceptionalities Section */}
//       <div>
//         <p className="text-sm font-normal text-black">EXCEPTIONALITIES</p>
//         <h1 className="text-5xl font-normal tracking-tight mt-2">The Art of Exceptional Living</h1>

//         {/* Cards Section */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-12">
//           {/* Card 1 */}
//           <div>
//             <div className="relative w-full h-90">
//               <Image
//                 src="/17.jpg"
//                 alt="Elite Craftsmanship"
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-xl"
//               />
//             </div>
//             <h2 className="text-2xl font-semibold pt-4">Elite Craftsmanship</h2>
//             <p className="text-base font-medium text-gray-400 pr-8 pt-2">
//               Meticulously designed with the finest materials and attention to detail.
//             </p>
//           </div>

//           {/* Card 2 */}
//           <div>
//           <h2 className="text-2xl font-semibold pb-2">Elite Craftsmanship</h2>
//             <p className="text-base font-medium text-gray-400 pb-3">
//               Meticulously designed with the finest materials and attention to detail.
//             </p>
//             <div className="relative w-full h-90">
//               <Image
//                 src="/17.jpg"
//                 alt="Elite Craftsmanship"
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-xl"
//               />
//             </div>
//           </div>

//           {/* Card 3 */}
//           <div>
//             <div className="relative w-full h-90">
//               <Image
//                 src="/17.jpg"
//                 alt="Elite Craftsmanship"
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-xl"
//               />
//             </div>
//             <h2 className="text-2xl font-semibold pt-4">Elite Craftsmanship</h2>
//             <p className="text-base font-medium text-gray-400 pr-8 pt-2">
//               Meticulously designed with the finest materials and attention to detail.
//             </p>
//           </div>

//           {/* Card 4 */}
//           <div>
//           <h2 className="text-2xl font-semibold pb-2">Elite Craftsmanship</h2>
//             <p className="text-base font-medium text-gray-400 pb-3">
//               Meticulously designed with the finest materials and attention to detail.
//             </p>
//             <div className="relative w-full h-90">
//               <Image
//                 src="/17.jpg"
//                 alt="Elite Craftsmanship"
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-xl"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FourthSection



import Image from 'next/image';
import React from 'react';

const FourthSection = () => {
  return (
    <div className="px-4 sm:px-20 py-8 space-y-16">
      {/* Exceptionalities Section */}
      <div>
        <p className="text-base font-normal text-black">Why Trust Us</p>
        <h1 className="text-3xl sm:text-5xl font-normal tracking-tight mt-2">
          Understanding Your Investment Concerns
        </h1>
        <h2 className="text-base sm:text-xl font-normal text-gray-600 tracking-tight mt-5">
          With over 12+ years in the business, we understand what it takes to build trust among our stakeholders.
        </h2>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          {/* Card 1 */}
          <div className="space-y-4 shadow-md rounded-xl p-4">
            <div className="relative w-full h-72 sm:h-90">
              <Image
                src="/professionals.jpeg"
                alt="Elite Craftsmanship"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <h2 className="text-xl sm:text-xl font-normal">Involvement of Professionals</h2>
          </div>

          {/* Card 2 */}
          <div className="space-y-4 flex flex-col-reverse sm:flex-col shadow-md rounded-xl p-4">
            <div>
              <h2 className="text-xl sm:text-xl font-normal pt-5 sm:pt-0">High Quality development</h2>
            </div>
            <div className="relative w-full h-72 sm:h-90">
              <Image
                src="/ns-3.jpeg"
                alt="Personalized Design"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="space-y-4 shadow-md rounded-xl p-4">
            <div className="relative w-full h-72 sm:h-90">
              <Image
                src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/LW0A7843.jpg"
                alt="Modern Elegance"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <h2 className="text-xl sm:text-xl font-normal">Consultation and Assistance</h2>
          </div>

          {/* Card 4 */}
          <div className="space-y-4 flex flex-col-reverse sm:flex-col shadow-md rounded-xl p-4">
            <div>
              <h2 className="text-xl sm:text-xl font-normal pt-5 sm:pt-0">Redefining the Market</h2>
            </div>
            <div className="relative w-full h-72 sm:h-90">
              <Image
                src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/LW0A7181.jpg"
                alt="Inspired Spaces"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthSection;
