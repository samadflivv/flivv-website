import React from 'react';

const OurStorySection = () => {
  return (
    <section className="bg-white text-black px-4 md:px-40 py-16">
      {/* Top Content */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
        {/* Left bullet and heading */}
        <div className="md:w-1/2">
          <p className="text-sm tracking-widest text-black uppercase mb-2">About Us</p>
          <h2 className="sm:text-5xl text-4xl font-normal mb-6">The Future of Real Estate with Flivv Developers</h2>
          {/* <ul className="list-disc pl-5 text-black">
            <li>
              Built on passion and precision, our journey is dedicated to redefining luxury living with timeless elegance.
            </li>
          </ul> */}
        </div>

        {/* Right Paragraphs */}
        <div className="md:w-1/2 space-y-6 text-gray-600 text-base text-justify">
          <p>
            Flivv, as a brand, has been in the business for more than a decade. We have worked as an IT company and gained the trust of our clients in our successful years of service. We have now diversified into Realty aiming, to continue the cycle of exceptional work with utmost commitment.
          </p>
          <p>
            Real Estate is one of the most recognized industries in the world. Additionally, the construction of housing spaces and lodging has also increased in urban and semi-urban areas leading people to explore outskirts and developing areas for investing in open plots. Keeping this into consideration, as realtors in Hyderabad, Flivv Developers works efficiently to ensure that your investments in Real Estate properties are safe.
          </p>
          <p>
            Flivv Developers is an extended product from Flivv Web Development Private Limited. We exclusively focus on open plot ventures and provide the leading services based on the needs of our clients. Be it for short-term or long-term investment purposes. We make sure to secure your investments and provide you with profitable returns with life-long assistance.
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="mt-12">
        <img
          src="/aboutmain.jpg"
          alt="Modern Architecture"
          className="rounded-xl w-full h-auto object-cover shadow-lg"
        />
      </div>
    </section>
  );
};

export default OurStorySection;
