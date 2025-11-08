'use client';
import Image from "next/image";
import React, { useState } from "react";

// Simple Image Component with Error Handling
const ProjectImage = ({ src, alt, priority = false }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleError = () => {
    console.warn(`Image failed to load: ${src}`);
    setImageError(true);
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  if (imageError) {
    return (
      <div className="w-full h-64 md:h-72 lg:h-80 bg-gray-200 rounded-t-2xl flex items-center justify-center">
        <div className="text-gray-500 text-center p-4">
          <div className="text-4xl mb-2">🏗️</div>
          <p className="text-sm">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden rounded-t-2xl">
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "cover" }}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-2xl"></div>
      )}
    </div>
  );
};

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
      badgeColor: "bg-yellow-500"
    },
    {
      id: 2,
      title: "Gulmohar Homes",
      location: "Shadnagar",
      image: "/GulmoharHomes1.jpg",
      description: "Gulmohar Homes — HMDA & RERA-approved villa plots with excellent investment potential.",
      hasBadge: false
    },
    {
      id: 3,
      title: "Airport Town",
      location: "Kothur - Penjerla Road",
      image: "/AirportTown1.jpg",
      description: "Premium HMDA-approved open plot project near Bangalore Highway.",
      hasBadge: false
    },
    {
      id: 4,
      title: "Sadhana City",
      location: "Veldanda, Kalwakurthy",
      image: "/SadhanaCity1.jpg",
      description: "DTCP-approved gated community near Regional Ring Road.",
      hasBadge: false
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
      {/* Simple Header - No Animations */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-600 tracking-wider mb-2">
            Featured Developments
          </h2>
          <h1 className="text-4xl md:text-6xl font-normal text-gray-800">
            Exclusive Projects
          </h1>
        </div>

        <div className="mt-6 lg:mt-0">
          <a href="/projects">
            <button className="px-8 py-3 text-black rounded-full border border-black hover:bg-black hover:text-white transition duration-300">
              Explore All Projects →
            </button>
          </a>
        </div>
      </div>

      {/* Simple Grid - No Animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.href || "#"}
            className="group block"
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
              <div className="relative flex-shrink-0">
                <div className="group-hover:scale-105 transition-transform duration-300">
                  <ProjectImage 
                    src={project.image} 
                    alt={project.title}
                    priority={project.priority}
                  />
                </div>
                {/* Fixed overlay - covers entire image */}
                <div className="absolute inset-0 rounded-t-2xl" />
                {project.hasBadge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 ${project.badgeColor} text-white text-sm font-semibold rounded-full shadow-lg`}>
                      {project.badgeText}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-[#0192d3] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-lg font-semibold text-gray-600 text-right ml-2">
                    {project.location}
                  </p>
                </div>
                <div className="w-full h-0.5 bg-gray-200 mb-3"></div>
                <p className="text-gray-500 leading-relaxed flex-grow">
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
          <button className="w-full max-w-sm px-8 py-4 text-black rounded-full border border-black hover:bg-black hover:text-white transition duration-300">
            View All Projects
          </button>
        </a>
      </div>
    </div>
  );
};

export default Exclusiveprojects;