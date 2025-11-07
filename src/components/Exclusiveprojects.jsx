'use client';
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const hoverVariants = {
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const imageHoverVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Custom Image Component with Error Handling
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
      <div className="w-full h-64 md:h-72 lg:h-80 bg-gray-200 rounded-2xl flex items-center justify-center">
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
      status: "coming-soon",
      href: "#",
      hasBadge: true,
      badgeText: "Coming Soon",
      badgeColor: "bg-yellow-500"
    },
    {
      id: 2,
      title: "Gulmohar Homes",
      location: "Shadnagar",
      image: "/GulmoharHomes1.jpg",
      description: "Gulmohar Homes — an elegant extension of Gulmohar Villas, offering HMDA & RERA-approved villa plots with serene living and excellent investment potential.",
      status: "approved",
      href: "#",
      hasBadge: false
    },
    {
      id: 3,
      title: "Airport Town",
      location: "Kothur - Penjerla Road",
      image: "/AirportTown1.jpg",
      description: "Airport Town — a premium HMDA-approved open plot project just 2 km from Bangalore Highway, featuring limited plots with top-notch development.",
      status: "premium",
      href: "#",
      hasBadge: false
    },
    {
      id: 4,
      title: "Sadhana City",
      location: "Veldanda, Kalwakurthy",
      image: "/SadhanaCity1.jpg",
      description: "Sadhana City — a DTCP-approved gated community near the Regional Ring Road and Mucherla IT Cluster, offering 100% Vastu plots.",
      status: "approved",
      href: "#",
      hasBadge: false
    },
    {
      id: 5,
      title: "Gulmohar Villas",
      location: "Shadnagar",
      image: "/GVdrone1.jpg",
      description: "Our first-ever HMDA-approved 22-acre villa plot project in Nagulapally, Shadnagar, designed to enhance community living.",
      status: "flagship",
      href: "/gulmoharvillas",
      hasBadge: false,
      priority: true
    },
    {
      id: 6,
      title: "Rivendell Farms",
      location: "Thimmajipet, Jadcherla",
      image: "/RFS2.jpeg",
      description: "A premium farmland project with 10+ amenities, sustainable living concept, exclusive memberships, and full of experience.",
      status: "farm-living",
      href: "/rivendellfarms",
      hasBadge: false,
      priority: true
    }
  ];

  return (
    <div className="px-4 sm:px-8 md:px-20 py-16 bg-gradient-to-br from-white to-gray-50" id="projects">
      {/* Highlights Section */}
      <motion.div 
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-600 tracking-wider mb-2">
            Featured Developments
          </h2>
          <h1 className="text-4xl md:text-6xl font-normal tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Exclusive Projects
          </h1>
        </div>

        <motion.div 
          className="mt-6 lg:mt-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="/projects">
            <button className="px-8 py-3 text-black rounded-full border border-black flex items-center gap-2 group hover:bg-black hover:text-white transition duration-300">
              Explore All Projects
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </button>
          </a>
        </motion.div>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project) => (
          <motion.a
            key={project.id}
            href={project.href}
            variants={itemVariants}
            whileHover="hover"
            className="group cursor-pointer block"
          >
            <motion.div 
              className="overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"
              variants={hoverVariants}
            >
              <div className="relative flex-shrink-0">
                <motion.div variants={imageHoverVariants}>
                  <ProjectImage 
                    src={project.image} 
                    alt={project.title}
                    priority={project.priority}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {project.hasBadge && (
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 ${project.badgeColor} text-white text-sm font-semibold rounded-full shadow-lg`}>
                      {project.badgeText}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-[#0192D3] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-lg font-semibold text-gray-600 text-right ml-2">
                    {project.location}
                  </p>
                </div>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-100 to-purple-100 mb-3"></div>
                <p className="text-gray-500 leading-relaxed flex-grow">
                  {project.description}
                </p>
              </div>
            </motion.div>
          </motion.a>
        ))}
      </motion.div>

      {/* Mobile Button */}
      <motion.div 
        className="mt-12 text-center sm:hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <a href="/projects">
          <button className="w-full max-w-sm px-8 py-4 text-black rounded-full border border-black hover:bg-black hover:text-white transition duration-300 font-semibold">
            View All Projects
          </button>
        </a>
      </motion.div>
    </div>
  );
};

export default Exclusiveprojects;