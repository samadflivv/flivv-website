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
      question: "How long have you been in the Real Estate business in Hyderabad?",
      answer:
        "It's been 3.5+ years since we diversified into Real Estate from IT. Having successfully provided IT services for over a decade, we are now also giving our best in Real Estate.",
    },
    {
      question: "What types of properties do you specialize in?",
      answer:
        "We are currently dealing with open plot ventures around Hyderabad, focusing on developing areas that'd help you enjoy investment security and appreciation in the coming years.",
    },
    {
      question: "How many projects have you marketed and developed so far?",
      answer:
        "We either take up projects for developing & marketing or exclusively for marketing. So far, we have 5+ projects successfully being executed.",
    },
    {
      question: "In what ways do you support or assist buyers after the sale?",
      answer:
        "Once you buy from us, it's not a one-time deal. We're here for you even after your purchase. And when it comes to keeping your property safe and well-maintained, you can count on us.",
    },
    {
      question: "What payment methods are available for your open plot ventures?",
      answer:
        "In real estate, payments can raise many questions and worries. To make things easier for you and ensure your comfort, we offer various payment options. You can choose to pay the full amount upfront, in installments, or through EMI.",
    },
    {
      question: "Why should we trust Flivv Developers?",
      answer:
        "We believe in complete transperancy with the people we deal with. More than monetory transactions, we prioritize in maintaining healthy relations with stakeholders - business follows.",
    },
  ];

  return (
    <section className="px-4 py-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row">
        
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-sm font-medium text-black uppercase mb-2">FAQs</h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-tight">
            Everything You Need to <br className="hidden sm:block" /> Know About Flivv
          </h1>
        </div>

        {/* Right Section - Accordion */}
        <div className="flex-1 mt-8 lg:mt-0 space-y-8">
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
  