"use client";
import React, { useState } from 'react';

const GVFaqs = () => {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  const faqs = [
    {
      question: "Is Gulmohar Villas an HMDA-approved project ?",
      answer:
        "Yes, Gulmohar Villas is HMDA-approved, located near Shadnagar.",
    },
    {
      question: "Nearby landmarks & developments around Gulmohar Villas ?",
      answer:
        "Shadnagar Railway Station is approx. 3.5 km away. Other notable healthcare & educational developments: ABV & Dr. Shivaram Naik Hospitals; Heritage Valley & Montessori Schools.",
    },
    {
      question: "What amenities are included in this Project ?",
      answer:
        "Spacious 2-acre park, 1,440 sq. yds play area, and tree-lined walkways. Wide 60 ft & 40 ft roads with LED lights, water, and drainage systems. Amenities include a supermarket, café, wellness center & spiritual zone.",
    },
    {
      question: "Suitable for construction or long-term investment ?",
      answer:
        "Ideal for both immediate construction and long-term investment. The choice depends on your personal or financial goals.",
    },
    { 
      question: "How far is the airport or ORR from Gulmohar Villas ?",
      answer:
        "Airport is 32 km away; takes 40–45 minutes to reach. ORR is 10–12 km away; travel time is 15–20 minutes.",
    },
    {
      question: "What are the available plot sizes ?",
      answer:
        "Plot size starts from 240 sq. yds and varies up to 800 sq. yds.",
    },
  ];

  return (
    <section className="px-4 py-8 sm:pb-20 pb-30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-sm font-medium text-black uppercase mb-2">FAQs</h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-tight">
            Everything You Need to <br className="hidden sm:block" /> Know About <span className='text-[#E509EF]'>Gulmohar Villas </span>
          </h1>
        </div>

        {/* Right Section - Accordion */}
        <div className="flex-1 mt-8 lg:mt-0 space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-2">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggle(index)}
              >
                <h3 className="text-lg font-normal sm:text-lg sm:font-medium">{faq.question}</h3>
                <button
                  className="text-xl bg-gray-200 text-black px-3 py-1 rounded-md"
                  aria-label={open === index ? "Close" : "Open"}
                >
                  {open === index ? "✕" : "+"}
                </button>
              </div>
              {open === index && (
                <p className="mt-3 text-gray-500 text-sm sm:text-base">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GVFaqs;
  