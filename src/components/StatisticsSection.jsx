import React from 'react'

const StatisticsSection = () => {
  return (
    <div className="p-8 mr-20 ml-20 mb-20 mt-10">
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {/* Statistic 1 */}
          <div className='flex flex-col items-start'>
            <h1 className="text-7xl font-normal">200+</h1>
            <h2 className="text-xl font-semibold mt-6">Home Projects</h2>
            <p className="text-sm font-medium text-gray-400 mt-1">
              Crafted with precision and ultimate elegance.
            </p>
          </div>
  
          {/* Statistic 2 */}
          <div className='flex flex-col items-start'>
            <h1 className="text-7xl font-normal">50+</h1>
            <h2 className="text-xl font-semibold mt-6">Home Projects</h2>
            <p className="text-sm font-medium text-gray-400 mt-1">
              Crafted with precision and ultimate elegance.
            </p>
          </div>
  
          {/* Statistic 3 */}
          <div className='flex flex-col items-start'>
            <h1 className="text-7xl font-normal">5K</h1>
            <h2 className="text-xl font-semibold mt-6">Home Projects</h2>
            <p className="text-sm font-medium text-gray-400 mt-1">
              Crafted with precision and ultimate elegance.
            </p>
          </div>
  
          {/* Statistic 4 */}
          <div className='flex flex-col items-start'>
            <h1 className="text-7xl font-normal">97%</h1>
            <h2 className="text-xl font-semibold mt-6">Home Projects</h2>
            <p className="text-sm font-medium text-gray-400 mt-1">
              Crafted with precision and ultimate elegance.
            </p>
          </div>
        </div>
      </div>
  )
}

export default StatisticsSection