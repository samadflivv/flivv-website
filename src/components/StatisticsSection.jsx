// import React from 'react'

// const StatisticsSection = () => {
//   return (
//     <div className="p-8 mr-20 ml-20 mb-20 mt-10">
//         {/* Statistics Section */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
//           {/* Statistic 1 */}
//           <div className='flex flex-col items-start'>
//             <h1 className="text-7xl font-normal">200+</h1>
//             <h2 className="text-xl font-semibold mt-6">Home Projects</h2>
//             <p className="text-sm font-medium text-gray-400 mt-1">
//               Crafted with precision and ultimate elegance.
//             </p>
//           </div>
  
//           {/* Statistic 2 */}
//           <div className='flex flex-col items-start'>
//             <h1 className="text-7xl font-normal">50+</h1>
//             <h2 className="text-xl font-semibold mt-6">Home Projects</h2>
//             <p className="text-sm font-medium text-gray-400 mt-1">
//               Crafted with precision and ultimate elegance.
//             </p>
//           </div>
  
//           {/* Statistic 3 */}
//           <div className='flex flex-col items-start'>
//             <h1 className="text-7xl font-normal">5K</h1>
//             <h2 className="text-xl font-semibold mt-6">Home Projects</h2>
//             <p className="text-sm font-medium text-gray-400 mt-1">
//               Crafted with precision and ultimate elegance.
//             </p>
//           </div>
  
//           {/* Statistic 4 */}
//           <div className='flex flex-col items-start'>
//             <h1 className="text-7xl font-normal">97%</h1>
//             <h2 className="text-xl font-semibold mt-6">Home Projects</h2>
//             <p className="text-sm font-medium text-gray-400 mt-1">
//               Crafted with precision and ultimate elegance.
//             </p>
//           </div>
//         </div>
//       </div>
//   )
// }

// export default StatisticsSection


import React from 'react';

const stats = [
  {
    value: '5+',
    label: 'Projects',
  },
  {
    value: '12+',
    label: 'Years of Legacy',
  },
  {
    value: '300+',
    label: 'Happy Clients',
  },
  {
    value: '97%',
    label: 'Satisfaction Rate',
  },
];

const StatisticsSection = () => {
  return (
    <div className="px-6 sm:px-8 md:px-20 mt-20 mb-30">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-start">
            <h1 className="text-5xl md:text-7xl font-normal">{stat.value}</h1>
            <h2 className="text-lg md:text-xl font-semibold mt-4 md:mt-6">
              {stat.label}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;
