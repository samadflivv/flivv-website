'use client';
import React, { useMemo, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";

/*
  Exclusiveprojects.jsx
  - CDN images configured here via CDN_IMAGES
  - Rivendell Farms uses a local path (/RFS2.jpeg)
  - Remember to update next.config.js (remotePatterns) and restart Next
*/

const CDN_IMAGES = {
  SukoonVillas1: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Our-Projects-section/DJI_20251017151106_0138_D.jpg",
  GulmoharHomes1: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Our-Projects-section/DJI_20251013114348_0094_D-min.jpg",
  AirportTown1: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/AirportTown/DJI_20251013083416_0013_D-min.jpg",
  SadhanaCity1: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Our-Projects-section/DJI_20251017100732_0045_D-min.JPG",
  GulmoharVillas1: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Our-Projects-section/DJI_20251013111255_0025_D-min.jpg",
  // Rivendell: local path per your request (place /RFS2.jpeg in /public)
  RivendellRFS2: "/RFS2.jpeg"
};

const IMAGE_OPTIONS = {
  quality: 65,
  sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
};

const projectsData = [
  
  {
    id: 1,
    title: "Gulmohar Homes",
    location: "Shadnagar",
    imageKey: "GulmoharHomes1",
    description: "Gulmohar Homes — HMDA & RERA-approved villa plots with excellent investment potential.",
    hasBadge: false,
    href: "/gulmoharhomes",
    priority: false
  },
  {
    id: 2,
    title: "Airport Town",
    location: "Kothur - Penjerla Road",
    imageKey: "AirportTown1",
    description: "Premium open plot project near Bangalore Highway.",
    hasBadge: false,
    href: "/airporttown",
    priority: false
  },
  {
    id: 3,
    title: "Sadhana City",
    location: "Veldanda, Kalwakurthy",
    imageKey: "SadhanaCity1",
    description: "DTCP-approved gated community near Regional Ring Road.",
    hasBadge: false,
    href: "#",
    priority: false
  },
  {
    id: 4,
    title: "Gulmohar Villas",
    location: "Shadnagar",
    imageKey: "GulmoharVillas1",
    description: "HMDA-approved 22-acre villa plot project in Nagulapally.",
    href: "/gulmoharvillas",
    hasBadge: false,
    priority: true
  },
  {
    id: 5,
    title: "Rivendell Farms",
    location: "Thimmajipet, Jadcherla",
    imageKey: "RivendellRFS2",
    description: "Premium farmland project with sustainable living concept.",
    href: "/rivendellfarms",
    hasBadge: false,
    priority: true
  }
];

const Exclusiveprojects = () => {
  // Resolve image URLs (CDN or local path)
  const projects = useMemo(() => {
    return projectsData.map(p => ({
      ...p,
      image: CDN_IMAGES[p.imageKey] || p.imageKey
    }));
  }, []);

  const onProjectClick = useCallback((href) => {
    // optional analytics hook
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com" crossOrigin="anonymous" />
      </Head>

      <div className="px-4 sm:px-8 md:px-20 py-12 bg-white" id="projects">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10">
          <div className="flex-1">
            <h2 className="text-sm md:text-base font-semibold text-gray-600 tracking-wider mb-1">Featured Developments</h2>
            <h1 className="text-3xl md:text-5xl font-normal text-gray-800 leading-tight">Our Projects</h1>
          </div>

          <div className="mt-6 lg:mt-0">
            <a href="/projects" onClick={() => onProjectClick('/projects')}>
              <button className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full border border-black hover:bg-black hover:text-white transition-colors duration-200" aria-label="Explore all projects">
                Explore All Projects →
              </button>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a key={project.id} href={project.href} onClick={() => onProjectClick(project.href)} className="block transform will-change-transform" aria-label={`Open ${project.title}`}>
              <div className="rounded-2xl bg-white shadow-md h-full flex flex-col overflow-hidden">
                <div className="relative w-full h-64 md:h-72 lg:h-80">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes={IMAGE_OPTIONS.sizes}
                    quality={IMAGE_OPTIONS.quality}
                    priority={!!project.priority}
                    fetchPriority={project.priority ? "high" : "low"}
                    style={{ objectFit: "cover" }}
                    className="rounded-t-2xl"
                  />
                  {project.hasBadge && (
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 ${project.badgeColor} text-white text-sm font-semibold rounded-full shadow`}>
                        {project.badgeText}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3 gap-3">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800">{project.title}</h2>
                    <p className="text-sm md:text-base font-medium text-gray-600 text-right">{project.location}</p>
                  </div>

                  <div className="w-full h-px bg-gray-100 mb-3" />

                  <p className="text-sm md:text-base text-gray-500 leading-relaxed">{project.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <a href="/projects" onClick={() => onProjectClick('/projects')}>
            <button className="w-full max-w-sm px-8 py-3 text-sm md:text-base rounded-full border border-black hover:bg-black hover:text-white transition-colors duration-200">
              View All Projects
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default React.memo(Exclusiveprojects);