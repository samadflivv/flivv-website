'use client';
import Image from "next/image";
import React from "react";

const Exclusiveprojects = () => {
  const projects = [
    {
      id: 1,
      title: "Sukoon Villas",
      location: "Tukkuguda",
      image: "/SukoonVillas1.jpg",
      description: "Launching Soon!",
      hasBadge: true,
      badgeText: "Coming Soon",
      badgeColor: "bg-yellow-500",
      href: "#"
    },
    {
      id: 2,
      title: "Gulmohar Homes",
      location: "Shadnagar",
      image: "/GulmoharHomes1.jpg",
      description: "Gulmohar Homes — HMDA & RERA-approved villa plots with excellent investment potential.",
      hasBadge: false,
      href: "#"
    },
    {
      id: 3,
      title: "Airport Town",
      location: "Kothur - Penjerla Road",
      image: "/AirportTown1.jpg",
      description: "Premium HMDA-approved open plot project near Bangalore Highway.",
      hasBadge: false,
      href: "#"
    },
    {
      id: 4,
      title: "Sadhana City",
      location: "Veldanda, Kalwakurthy",
      image: "/SadhanaCity1.jpg",
      description: "DTCP-approved gated community near Regional Ring Road.",
      hasBadge: false,
      href: "#"
    },
    {
      id: 5,
      title: "Gulmohar Villas",
      location: "Shadnagar",
      image: "/GVdrone1.jpg",
      description: "HMDA-approved 22-acre villa plot project in Nagulapally.",
      href: "/gulmoharvillas",
      hasBadge: false,
      priority: true
    },
    {
      id: 6,
      title: "Rivendell Farms",
      location: "Thimmajipet, Jadcherla",
      image: "/RFS2.jpeg",
      description: "Premium farmland project with sustainable living concept.",
      href: "/rivendellfarms",
      hasBadge: false,
      priority: true
    }
  ];

  return (
    <div className="px-4 sm:px-8 md:px-20 py-16 bg-white" id="projects">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-600 tracking-wider mb-2">
            Featured Developments
          </h2>
          <h1 className="text-4xl md:text-6xl font-normal text-gray-800">
            Our Projects
          </h1>
        </div>

        <div className="mt-6 lg:mt-0">
          <a href="/projects">
            <button className="px-8 py-3 text-black rounded-full border border-black hover:bg-black hover:text-white">
              Explore All Projects →
            </button>
          </a>
        </div>
      </div>

      {/* Projects Grid - No Animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.href}
            className="block"
          >
            <div className="rounded-2xl bg-white shadow-lg h-full flex flex-col">
              {/* Image Container */}
              <div className="relative w-full h-64 md:h-72 lg:h-80">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-2xl"
                  priority={project.priority}
                />
                {project.hasBadge && (
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 ${project.badgeColor} text-white text-sm font-semibold rounded-full shadow-lg`}>
                      {project.badgeText}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    {project.title}
                  </h2>
                  <p className="text-lg font-semibold text-gray-600 text-right ml-2">
                    {project.location}
                  </p>
                </div>
                <div className="w-full h-0.5 bg-gray-200 mb-3"></div>
                <p className="text-gray-500 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Mobile Button */}
      <div className="mt-12 text-center sm:hidden">
        <a href="/projects">
          <button className="w-full max-w-sm px-8 py-4 text-black rounded-full border border-black hover:bg-black hover:text-white">
            View All Projects
          </button>
        </a>
      </div>
    </div>
  );
};

export default Exclusiveprojects;