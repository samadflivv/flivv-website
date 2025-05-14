import React from 'react';

const OurStorySection = () => {
  return (
    <section className="bg-white text-black px-4 md:px-40 py-16">
      {/* Top Content */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
        {/* Left bullet and heading */}
        <div className="md:w-1/2">
          <p className="text-sm tracking-widest text-black uppercase mb-2">About Us</p>
          <h2 className="sm:text-5xl text-4xl font-normal mb-6">Our Story Starts With</h2>
          <ul className="list-disc pl-5 text-black">
            <li>
              Built on passion and precision, our journey is dedicated to redefining luxury living with timeless elegance.
            </li>
          </ul>
        </div>

        {/* Right Paragraphs */}
        <div className="md:w-1/2 space-y-6 text-gray-600 text-base text-justify">
          <p>
            Our story is one of passion, innovation, and an unwavering commitment to excellence. What started as a vision to redefine luxury living has evolved into a journey of creating timeless spaces that inspire and elevate lifestyles.
          </p>
          <p>
            With years of expertise, we have crafted homes that blend architectural brilliance with unmatched comfort. Every project is a testament to our dedication to quality, precision, and elegance.
          </p>
          <p>
            From exclusive locations to personalized designs, we ensure that every detail reflects sophistication and refinement. Our mission is to turn dreams into reality, offering homes that are not just spaces but experiences of true luxury.
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="mt-12">
        <img
          src="/2151963032.jpg"
          alt="Modern Architecture"
          className="rounded-xl w-full h-auto object-cover shadow-lg"
        />
      </div>
    </section>
  );
};

export default OurStorySection;
