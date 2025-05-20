// import React from "react";

// const ContactHeroSection = () => {
//   return (
//     <section className="relative bg-[#1c1c1c] min-h-screen flex items-center justify-center px-6 py-12 pt-30 m-3 rounded-xl">
//       <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#1c1c1c] rounded-xl overflow-hidden">
//         {/* Image */}
//         <div className="w-full h-[500px] md:h-auto">
//           <img
//             src="/2289.jpg"
//             alt="Green Villa"
//             className="w-full h-full object-cover rounded-xl"
//           />
//         </div>

//         {/* Form */}
//         <div className="flex flex-col justify-center text-white px-6 md:px-12 py-8">
//           <h2 className="text-3xl md:text-4xl font-semibold mb-6">Connect with us</h2>

//           <form className="space-y-6">
//             <div>
//               <h4 className="text-sm font-medium mb-2">Contact Information</h4>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white"
//               />
//               <input
//                 type="email"
//                 placeholder="jane@framer.com"
//                 className="w-full mt-4 px-4 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white"
//               />
//               <input
//                 type="text"
//                 placeholder="Consultation"
//                 className="w-full mt-4 px-4 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white"
//               />
//             </div>

//             <div>
//               <h4 className="text-sm font-medium mb-2">Project Information</h4>
//               <textarea
//                 placeholder="Write your requirements.."
//                 className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white h-28 resize-none"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 bg-gray-500 hover:bg-gray-400 text-white rounded-full transition"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactHeroSection;


import React from "react";
import HubspotForm from "./HubspotForm";

const ContactHeroSection = () => {
  return (
    <section className="relative bg-[#1c1c1c] min-h-screen flex items-center justify-center m-3 sm:px-6 py-5 pt-35 rounded-xl">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#1c1c1c] overflow-hidden">
        {/* Image Section */}
        <div className="w-full h-64 sm:h-96 md:h-full">
          <img
            src="/2289.jpg"
            alt="Green Villa"
            className="w-full h-full object-cover sm:rounded-xl"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center text-white px-4 sm:px-10 py-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-semibold">Connect with us</h2>

            <HubspotForm/>
          <form className="space-y-6">
            {/* Contact Info */}
            {/* <div>
              <h4 className="text-sm font-medium mb-2">Contact Information</h4>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white"
                />
                <input
                  type="text"
                  placeholder="Consultation"
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white"
                />
              </div>
            </div> */}

            {/* Project Info */}
            {/* <div>
              <h4 className="text-sm font-medium mb-2">Project Information</h4>
              <textarea
                placeholder="Write your requirements.."
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white h-28 resize-none"
              />
            </div> */}

            {/* Submit Button */}
            {/* <button
              type="submit"
              className="w-full py-3 bg-gray-500 hover:bg-gray-400 text-white rounded-full transition"
            >
              Submit
            </button> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;
