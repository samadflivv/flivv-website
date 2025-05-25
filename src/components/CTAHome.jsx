// import React from 'react';

// import Image from 'next/image';

// const CTAHome = () => {
//   return (
//     <div className="m-3">
//       {/* Hero Section */}
//       <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
//         {/* Background Image */}
//         <Image
//           src="/dream-home.jpg"
//           alt="Dream Home"
//           layout="fill"
//           objectFit="cover"
//           className="rounded-lg"
//         />
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center text-white">
//           <h1 className="text-6xl font-normal max-w-6xl">
//             Experience Timeless Elegance and Premium Living in Your Dream Home.
//           </h1>
//           <button className="mt-6 px-6 py-3 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full flex items-center space-x-2 shadow-lg hover:bg-white/30 border">
//             <span>Book Appointment</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="w-4 h-4"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M17.25 15l3-3m0 0l-3-3m3 3H3"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CTAHome;


import React from 'react';
import Image from 'next/image';

const CTAHome = () => {
  return (
    <div className="m-3">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
        {/* Background Image */}
        <Image
          src="/dream-home.jpg"
          alt="Dream Home"
          fill
          className="object-cover rounded-lg"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-normal max-w-4xl">
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
