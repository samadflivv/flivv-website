// import React from 'react'

// const ContactpageSecondsection = () => {
//   const offices = [
//     {
//       country: "USA",
//       city: "New York",
//       address: "123 Madison Avenue, New York, NY 10016",
//       link: "https://example.com/usa",
//     },
//     {
//       country: "UK",
//       city: "London",
//       address: "45 Kensington High Street, London W8 5EB",
//       link: "https://example.com/uk",
//     },
//     {
//       country: "UAE",
//       city: "Dubai",
//       address: "789 Sheikh Zayed Road, Bur Dubai, UAE",
//       link: "https://example.com/uae",
//     },
//     {
//       country: "India",
//       city: "Goa",
//       address: "23 Kolava Main Road Goa, India",
//       link: "https://example.com/india",
//     },
//   ];
  
//   return (
//     <div className="bg-white text-black px-8 py-20">
//       <div className="max-w-6xl mx-auto">
//         <h5 className="text-sm tracking-widest text-black uppercase mb-2">
//           Our Office
//         </h5>
//         <h1 className="text-5xl font-normal mb-10">
//           Visit Our Experience Points
//         </h1>

//         <div className="divide-y divide-gray-200">
//           {offices.map((office, idx) => (
//             <div key={idx} className="grid grid-cols-4 items-start py-6">
//               <div className="flex items-center gap-2">
//                 <span className="text-xl">&#9679;</span>
//                 <span className="font-normal text-2xl">{office.country}</span>
//               </div>
//               <div className="font-normal text-2xl">{office.city}</div>
//               <div className="text-gray-500 text-base font-semibold">{office.address}</div>
//               <div className="text-right text-base font-medium">
//                 <a
//                   href={office.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:underline inline-flex items-center gap-1"
//                 >
//                   Free Consultation
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-3.5 w-3.5 transform rotate-45"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L14 5.414V16a1 1 0 11-2 0V5.414L9.707 7.707a1 1 0 01-1.414-1.414l4-4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactpageSecondsection;


import React from 'react';
import HubspotForm from './HubspotForm';

const ContactpageSecondsection = () => {
  const offices = [
    {
      country: "Gulmohar Villas",
      city: "Shadnagar",
      address: "Our first-ever HMDA-approved 22-acre villa plot project in Nagulapally, Shadnagar, designed to enhance community living",
      link: "/",
    },
    {
      country: "Rivendell Farms",
      city: "Thimmajipet, Jadcherla",
      address: "A premium farmland project with 10+ amenities, sustainable living concept, exclusive memberships, and full of experience.",
      link: "/",
    },
    {
      country: "NS Homes",
      city: "Meerkhanpet",
      address: "NS Homes is our maiden open plot project located on the 100ft. main road connecting Srisailam & Nagarjuna Sagar Highways",
      link: "/",
    },
    {
      country: "NS Homes 2.0",
      city: "Meerkhanpet",
      address: "NS Homes 2.0 is an extension of NS Homes, spreading across 4 acres of land. This project is now fully sold out",
      link: "/",
    },
    {
      country: "Ideal Avenue",
      city: "Shadnagar",
      address: "Ideal Avenue is a premium HMDA-approved plotted venture in the R1 zone on the Kothur - Shadnagar Highway",
      link: "/",
    },
    {
      country: "Lake City",
      city: "Nandikandi",
      address: "A 10.5-acre open plot project on Mumbai Highway (NH65) in Nandikandi's prime growth corridor",
      link: "/",
    },
  ];

  return (
    <div className="bg-white text-black px-4 sm:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <h5 className="text-base tracking-widest text-black uppercase mb-2">
          Our Projects
        </h5>
        <h1 className="text-4xl sm:text-5xl font-normal mb-10">
          Visit Our Experience Points
        </h1>
        <div className="divide-y divide-gray-200">
          {offices.map((office, idx) => (
            <div
              key={idx}
              className="py-6 flex flex-col sm:grid sm:grid-cols-3 sm:items-start gap-2 sm:gap-0"
            >
              {/* Mobile: City top right */}
              <div className="flex justify-between sm:hidden">
                <div className="flex items-center gap-2">
                  <span className="text-xl">&#9679;</span>
                  <span className="font-normal text-xl">{office.country}</span>
                </div>
                <div className="font-semibold text-base">{office.city}</div>
              </div>

              {/* Desktop Country */}
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xl">&#9679;</span>
                <span className="font-normal text-2xl">{office.country}</span>
              </div>

              {/* Desktop City */}
              <div className="hidden sm:block font-normal text-2xl">
                {office.city}
              </div>

              {/* Address */}
              <div className="text-gray-500 text-base font-semibold sm:col-span-1 sm:col-start-3">
                <div className="sm:hidden mt-1 text-gray-500 font-normal">{office.address}</div>
                <div className="hidden sm:block">{office.address}</div>
              </div>

              {/* Free Consultation */}
              {/* <div className="text-base font-medium sm:text-right mt-2 sm:mt-0">
                <a
                  href={office.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline inline-flex items-center gap-1"
                >
                  Free Consultation
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 transform rotate-45"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L14 5.414V16a1 1 0 11-2 0V5.414L9.707 7.707a1 1 0 01-1.414-1.414l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactpageSecondsection;
