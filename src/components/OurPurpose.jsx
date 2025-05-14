import React from 'react';

const OurPurpose = () => {
  const purposes = [
    {
      number: '01',
      title: 'Redefining Luxury Living',
      description:
        'We create exceptional spaces that blend elegance, innovation, and comfort to elevate modern lifestyles.',
    },
    {
      number: '02',
      title: 'Uncompromising Quality & Craftsmanship',
      description:
        'Every project is built with meticulous attention to detail, using the finest materials and expert craftsmanship.',
    },
    {
      number: '03',
      title: 'Creating Lasting Value',
      description:
        'Beyond beautiful homes, we design spaces that enrich lives, foster communities, and stand the test of time.',
    },
  ];

  return (
    <section className="bg-white text-black px-4 md:px-40 py-16">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        {/* Left Section - Heading */}
        <div className="md:w-1/2">
          <p className="text-sm tracking-widest text-black uppercase mb-2">Goal</p>
          <h2 className="sm:text-5xl text-4xl font-normal">Our Purpose</h2>
        </div>

        {/* Right Section - Items */}
        <div className="md:w-1/2 space-y-10">
          {purposes.map((item, index) => (
            <div key={index} className="flex gap-4 border-t pt-6">
              <span className="text-base text-gray-400 font-normal w-8">{item.number}</span>
              <div>
                <h3 className="sm:text-2xl text-xl font-normal">{item.title}</h3>
                <p className="sm:text-base text-base text-gray-700 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPurpose;
