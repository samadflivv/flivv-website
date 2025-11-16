import React from 'react';

const ContactpageSecondsection = () => {
  const offices = [
    
    {
      country: "Sukoon Villas",
      city: "Tukkuguda",
      address: "Premium villa plots with modern amenities and excellent connectivity. Launching soon with exclusive pre-launch offers.",
      status: "coming-soon"
    },
    {
      country: "Gulmohar Homes",
      city: "Shadnagar",
      address: "An elegant extension of Gulmohar Villas, offering HMDA & RERA-approved villa plots with serene living and excellent investment potential.",
      status: "active"
    },
    {
      country: "Airport Town",
      city: "Kothur - Penjerla Road",
      address: "Premium HMDA-approved open plot project just 2 km from Bangalore Highway, featuring limited plots with top-notch development.",
      status: "active"
    },
    {
      country: "Sadhana City",
      city: "Veldanda, Kalwakurthy",
      address: "DTCP-approved gated community near the Regional Ring Road and Mucherla IT Cluster, offering 100% Vastu plots with top amenities.",
      status: "active"
    },
    {
      country: "Gulmohar Villas",
      city: "Shadnagar",
      address: "Our first-ever HMDA-approved 22-acre villa plot project in Nagulapally, Shadnagar, designed to enhance community living",
      link: "/gulmoharvillas",
      status: "active"
    },
    {
      country: "Rivendell Farms",
      city: "Thimmajipet, Jadcherla",
      address: "A premium farmland project with 10+ amenities, sustainable living concept, exclusive memberships, and full of experience.",
      link: "/rivendellfarms",
      status: "sold-out"
    },  

    {
      country: "NS Homes 1.0",
      city: "Meerkhanpet",
      address: "NS Homes is our maiden open plot project located on the 100ft. main road connecting Srisailam & Nagarjuna Sagar Highways",
      status: "sold-out"
    },
    {
      country: "NS Homes 2.0",
      city: "Meerkhanpet",
      address: "NS Homes 2.0 is an extension of NS Homes, spreading across 4 acres of land. This project is now fully sold out",
      status: "sold-out"
    },
    {
      country: "Ideal Avenue",
      city: "Shadnagar",
      address: "Ideal Avenue is a premium HMDA-approved plotted venture in the R1 zone on the Kothur - Shadnagar Highway",
      status: "sold-out"
    },
    
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'coming-soon':
        return <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">Coming Soon</span>;
      case 'sold-out':
        return <span className="px-3 py-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white text-xs font-bold rounded-full shadow-lg">Sold Out</span>;
      case 'active':
        return <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg">Available</span>;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'coming-soon':
        return 'border-l-yellow-400 hover:border-l-yellow-500';
      case 'sold-out':
        return 'border-l-gray-400 hover:border-l-gray-500';
      case 'active':
        return 'border-l-blue-400 hover:border-l-blue-500';
      default:
        return 'border-l-gray-300 hover:border-l-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white text-black px-4 sm:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h5 className="text-base tracking-widest text-gray-600 uppercase mb-3 font-semibold">
            Our Portfolio
          </h5>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Experience Our Projects
          </h1>
        </div>

        {/* Projects Grid - Modern Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offices.map((office, idx) => (
            <div
              key={idx}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 ${getStatusColor(office.status)} border-t border-r border-b border-gray-100 p-6`}
            >
              <div className="flex flex-col h-full">
                {/* Header with title and status */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {office.country}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600 font-semibold">{office.city}</span>
                    </div>
                  </div>
                  {getStatusBadge(office.status)}
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                  {office.address}
                </p>

                {/* Action Button */}
                {/* <div className="pt-4 border-t border-gray-100">
                  <a
                    href={office.link}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 group/btn ${
                      office.status === 'sold-out' 
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                        : office.status === 'coming-soon'
                        ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 hover:from-yellow-100 hover:to-yellow-200 shadow-md'
                        : 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 hover:from-blue-100 hover:to-indigo-100 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {office.status === 'sold-out' ? 'Project Completed' : 
                     office.status === 'coming-soon' ? 'Get Notified' : 
                     'Explore Project'}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform duration-300 ${
                        office.status !== 'sold-out' ? 'group-hover/btn:translate-x-1' : ''
                      }`}
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
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 mb-12">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">10</div>
            <div className="text-gray-600 font-semibold">Projects</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">14</div>
            <div className="text-gray-600 font-semibold">Years of Legacy</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600 font-semibold">Happy Clients</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">97%</div>
            <div className="text-gray-600 font-semibold">Satisfaction Rate</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ContactpageSecondsection;