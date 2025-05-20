// 'use client'
// import { useState } from 'react';

// const projects = [
//   {
//     type: 'Residential',
//     name: 'Serenity Heights',
//     description: 'A premium residential complex with scenic views and top-notch amenities.',
//     location: 'Austin',
//     images: ['/images/serenity-1.jpg', '/images/serenity-1.jpg'],
//   },
//   {
//     type: 'Commercial',
//     name: 'Vertex Business Tower',
//     description: 'A state-of-the-art office tower for enterprises and startups.',
//     location: 'Downtown LA',
//     images: ['/images/vertex-1.jpg', '/images/vertex-2.jpg'],
//   },
//   {
//     type: 'Residential',
//     name: 'Greenwood Villas',
//     description: 'Exclusive villa community surrounded by lush greenery.',
//     location: 'Greenville',
//     images: ['/images/greenwood-1.jpg', '/images/greenwood-2.jpg'],
//   },
//   {
//     type: 'Residential',
//     name: 'Tranquil Apartments',
//     description:
//       'Tranquil Retreat Apartments redefine urban living with a focus on relaxation, offering pools.',
//     location: 'Palm City',
//     images: ['/images/tranquil-1.jpg', '/images/tranquil-2.jpg'],
//   },
// ];

// export default function ProjectAccordion() {
//   const [openIndex, setOpenIndex] = useState(0);

//   const toggleIndex = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="max-w-5xl mx-auto py-10">
//       <h2 className="text-sm uppercase text-black tracking-widest mb-2">Projects</h2>
//       <h1 className="text-5xl font-normal mb-10">More Iconic Spaces</h1>

//       <div className="space-y-12">
//         {projects.map((project, idx) => (
//           <div key={idx} className="border-b pb-6">
           
//             <div
//   className="grid grid-cols-[150px_1fr_2fr_auto] items-start py-4  cursor-pointer gap-4"
//   onClick={() => toggleIndex(idx)}
// >
//   <span className="text-black font-medium text-lg">&#9679; {project.type}</span>

//   <span className="font-medium text-lg">{project.name}</span>

//   <p className="text-gray-500 text-base leading-snug">{project.description}</p>

//   <button
//     className={`text-xl px-3 py-1 bg-gray-200 rounded-md`}
//   >
//     {openIndex === idx ? '×' : '+'}
//   </button>
//             </div>



//             {/* Dropdown content - always same layout */}
//             {openIndex === idx && (
//               <div className="mt-6">
//                 <div className="flex gap-4 pl-40">
//   <img
//     src={project.images[0]}
//     className="w-[60%] h-70 object-cover rounded-xl"
//     alt={`Project ${project.name} 0`}
//   />
//   <img
//     src={project.images[1]}
//     className="w-[40%] h-70 object-cover rounded-xl"
//     alt={`Project ${project.name} 1`}
//   />
// </div>
//                 <div className="flex items-center gap-4 mt-4 pl-40">
//                   <span className="border pr-155 pl-5 py-2 rounded-lg text-sm text-gray-700">
//                     {project.location}
//                   </span>
//                   <button className="text-black border border-black px-6 py-2 rounded-full">
//                     View Details →
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-10">
//         <button className="px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition">
//           Check All Projects →
//         </button>
//       </div>
//     </section>
//   );
// }


'use client'
import { useState } from 'react';

const projects = [
  {
    type: 'NS Homes',
    name: 'DTCP/RERA',
    description: 'NS Homes DTCP-approved project is located on the 100-ft main road connecting Srisailam and Nagarjuna Sagar Highway',
    location: 'location : Meerkhanpet',
    images: ['/images/ns-1.jpeg', '/nsfront.jpeg'],
  },
  {
    type: 'NS Homes 2.0',
    name: 'DTCP/RERA',
    description: 'NS Homes 2.0 is an extension of NS Homes, spreading across 4 acres of land. And has been completely sold out',
    location: 'location : Meerkhanpet',
    images: ['/images/ns2.jpeg', '/images/ns2-2.jpeg'],
  },
  {
    type: 'Ideal Avenue',
    name: 'HMDA',
    description: 'Ideal Avenue is a premium HMDA-approved plotted venture in the R1 zone between Shadnagar & Kothur',
    location: 'location : Shadnagar',
    images: ['/images/ideal-1.jpg', '/images/ideal-2.jpg'],
  },
  {
    type: 'Lake City',
    name: 'DTCP/RERA',
    description: 'DTCP & RERA-approved plotted venture on Mumbai Highway (NH65) in Nandikandis prime growth corridor',
    location: 'location : Nandikandi',
    images: ['/images/lakecity-1.JPG', '/images/lakecity2.JPG'],
  },
];

export default function ProjectAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* <h2 className="text-sm uppercase text-black tracking-widest mb-2">Projects</h2> */}
      <h1 className="text-3xl sm:text-5xl font-normal mb-10">Explore Our Projects</h1>

      <div className="space-y-12">
        {projects.map((project, idx) => (
          <div key={idx} className="border-b pb-6">
            <div
  className="relative cursor-pointer py-4"
  onClick={() => toggleIndex(idx)}
>
  {/* Toggle buttons */}
  <button
    className="block sm:hidden absolute top-0 right-0 text-xl px-3 py-1 bg-gray-200 rounded-md"
  >
    {openIndex === idx ? '×' : '+'}
  </button>
  <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr_2fr_auto] gap-4 items-start pr-10 sm:pr-0">
    <span className="text-black font-medium text-lg">&#9679; {project.type}</span>
    <span className="font-medium text-lg">{project.name}</span>
    <p className="text-gray-500 text-base leading-snug">{project.description}</p>
    <button className="hidden sm:block text-xl px-3 py-1 bg-gray-200 rounded-md sm:ml-auto">
      {openIndex === idx ? '×' : '+'}
    </button>
  </div>
</div>
            {openIndex === idx && (
              <div className="mt-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:pl-20">
  <img
    src={project.images[0]}
    className="w-full sm:w-[60%] h-60 object-cover rounded-xl"
    alt={`Project ${project.name} 0`}
  />
  <img
    src={project.images[1]}
    className="hidden sm:block sm:w-[40%] h-60 object-cover rounded-xl"
    alt={`Project ${project.name} 1`}
  />
</div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 sm:pl-20">
  <span className="border px-5 py-2 rounded-lg text-sm text-gray-700 w-full sm:w-auto">
    {project.location}
  </span>
  {/* <button className="text-black border border-black px-6 py-2 rounded-full w-full sm:w-auto">
    View Details →
  </button> */}
</div>

              </div>
            )}
          </div>
        ))}
      </div>

      {/* <div className="mt-10">
        <a href='/projects'>
        <button className="px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition">
          Check All Projects →
        </button>
        </a>
      </div> */}
    </section>
  );
}
