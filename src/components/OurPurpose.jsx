import React from 'react';

const OurPurpose = () => {
  const purposes = [
    {
      number: '01',
      title: 'Vision',
      description:
        'To be one of the most known online platforms in Hyderabad for educating the audience in the field of Real Estate while providing convenient open plot investment options and delivering the best exceptional value to our customers. This vision is what drives us to give our best and establish disciplined practices at work.',
    },
    {
      number: '02',
      title: 'Mission',
      description:
        'To empower individuals and families with opportunities to diversify investment options according to the options we present while providing trustworthy and transparent services in open plot sales. We also aim to enhance the quality of our projects with each step as we take in all the customer-centric practices.',
    },
    {
      number: '03',
      title: 'Goal',
      description:
        'We grow real estate ventures by thinking outside the box and uncovering fresh opportunities for everyone involved. Great work starts with great people, so we focus on supporting our team and building a genuinely passionate, loyal culture. As our presence across the industry grows, we stay grounded in strong professional relationships and real partnerships. Above all, we care about helping our clients win—providing clear, honest financial guidance so buyers and investors can make smart moves with confidence.',
    },
  ];

  return (
    <section className="bg-white text-black px-4 md:px-40 py-16">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        {/* Left Section - Heading */}
        <div className="md:w-1/2 gap-10 flex flex-col">
          <h2 className="sm:text-6xl text-4xl font-normal">Our Purpose</h2>
          <div className="relative w-full">
    <img
      src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/ChatGPT%20Image%20Aug%2023,%202026,%2004_51_09%20PM.png"
      alt="Vaseem"
      className="block h-auto w-full object-contain md:h-full md:object-cover md:object-center rounded-xl"
    />
  </div>
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
