// "use client"; 
// import React, { useState } from 'react';

// const FaqSection = () => {
//   const [open, setOpen] = useState(null);

//   const toggle = (index) => {
//     setOpen(open === index ? null : index);
//   };

//   const faqs = [
//     {
//       question: "What makes your projects unique?",
//       answer:
//         "Our projects are crafted with elite craftsmanship, personalized designs, and located in the most prestigious areas, ensuring a luxurious living experience.",
//     },
//     {
//       question: "Do you offer customization options?",
//       answer:
//         "Yes, we offer a wide range of customization options to cater to your unique preferences and requirements.",
//     },
//     {
//       question: "What amenities are included in the properties?",
//       answer:
//         "Our properties come with state-of-the-art amenities, including swimming pools, gyms, gardens, and advanced security systems.",
//     },
//     {
//       question: "How can I schedule a visit?",
//       answer:
//         "You can schedule a visit by contacting our sales team through our website or by calling our customer service hotline.",
//     },
//   ];

//   return (
//     <div className="flex justify-center gap-40 p-6 mt-10 mb-10">
//       {/* Left Section */}
//       <div className="flex flex-col">
//         <h2 className="text-sm font-normal text-black">FAQs</h2>
//         <h1 className="text-5xl font-normal leading-15 tracking-tight mt-2">
//           Everything You Need to <br /> Know Right Now
//         </h1>
//       </div>

//       {/* Right Section - Accordion */}
//       <div className="mt-6 space-y-8 w-full max-w-lg">
//         {faqs.map((faq, index) => (
//           <div
//             key={index}
//             className="border-b pb-6 overflow-hidden"
//           >
//             <div
//               className="flex justify-between items-center cursor-pointer"
//               onClick={() => toggle(index)}
//             >
//               <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
//               <button
//                 className="text-black text-xl bg-gray-200 px-3 py-1 rounded-lg"
//                 aria-label={open === index ? "Close" : "Open"}
//               >
//                 {open === index ? "✕" : "+"}
//               </button>
//             </div>
//             {open === index && (
//               <p className="mt-2 text-gray-500">
//                 {faq.answer}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FaqSection;

"use client";
import React, { useState } from 'react';

const FaqSection = () => {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  const faqs = [
    {
      question: "What makes your projects unique?",
      answer:
        "Our projects are crafted with elite craftsmanship, personalized designs, and located in the most prestigious areas, ensuring a luxurious living experience.",
    },
    {
      question: "Do you offer customization options?",
      answer:
        "Yes, we offer a wide range of customization options to cater to your unique preferences and requirements.",
    },
    {
      question: "What amenities are included in the properties?",
      answer:
        "Our properties come with state-of-the-art amenities, including swimming pools, gyms, gardens, and advanced security systems.",
    },
    {
      question: "How can I schedule a visit?",
      answer:
        "You can schedule a visit by contacting our sales team through our website or by calling our customer service hotline.",
    },
  ];

  return (
    <section className="px-4 py-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-sm font-medium text-black uppercase mb-2">FAQs</h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-tight">
            Everything You Need to <br className="hidden sm:block" /> Know Right Now
          </h1>
        </div>

        {/* Right Section - Accordion */}
        <div className="flex-1 mt-8 lg:mt-0 space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggle(index)}
              >
                <h3 className="text-base sm:text-lg font-medium">{faq.question}</h3>
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

export default FaqSection;
  