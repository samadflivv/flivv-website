import React from 'react';

const OurPurpose = () => {
  const purposes = [
    {
      number: '01',
      title: 'Mission',
      description:
        'To empower individuals and families with opportunities to diversify investment options according to the options we present while providing trustworthy and transparent services in open plot sales. We also aim to enhance the quality of our projects with each step as we take in all the customer-centric practices.',
    },
    {
      number: '02',
      title: 'Vision',
      description:
        'To be one of the most known online platforms in Hyderabad for educating the audience in the field of Real Estate while providing convenient open plot investment options and delivering the best exceptional value to our customers. This vision is what drives us to give our best and establish disciplined practices at work.',
    },
    {
      number: '03',
      title: 'Goal',
      description:
        'Our goal is to be recognized all over the country and to maintain customer satisfaction along with expansion and accessibility to all in and around Hyderabad and strengthen community engagement by constantly producing content that shall be beneficial for all the stakeholders in Real Estate in Hyderabad.',
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
