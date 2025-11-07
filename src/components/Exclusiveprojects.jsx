'use client';
import Image from "next/image";
import React from "react";
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

const Exclusiveprojects = () => {
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
        {/* Card 1 */}
        <motion.a
          variants={itemVariants}
          whileHover="hover"
          className="group cursor-pointer"
        >
          <motion.div 
            className="overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
            variants={hoverVariants}
          >
            <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
              <motion.div
                variants={imageHoverVariants}
                className="w-full h-full"
              >
                <Image
                  className="rounded-t-2xl"
                  src="/SukoonVillas1.jpg"
                  alt="Sukoon Villas"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-full shadow-lg">
                  Coming Soon
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-[#0192D3] transition-colors">
                  Sukoon Villas
                </h2>
                <p className="text-lg font-semibold text-gray-600">Tukkuguda</p>
              </div>
              <div className="w-full h-0.5 bg-gradient-to-r from-blue-100 to-purple-100 mb-3"></div>
              <p className="text-gray-500 leading-relaxed">
                Launching Soon!
              </p>
            </div>
          </motion.div>
        </motion.a>

        {/* Card 2 */}
        <motion.a
          variants={itemVariants}
          whileHover="hover"
          className="group cursor-pointer"
        >
          <motion.div 
            className="overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
            variants={hoverVariants}
          >
            <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
              <motion.div
                variants={imageHoverVariants}
                className="w-full h-full"
              >
                <Image
                  className="rounded-t-2xl"
                  src="/GulmoharHomes1.jpg"
                  alt="Gulmohar Homes"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4">
                {/* <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full shadow-lg">
                  Approved
                </span> */}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-[#0192D3] transition-colors">
                  Gulmohar Homes
                </h2>
                <p className="text-lg font-semibold text-gray-600">Shadnagar</p>
              </div>
              <div className="w-full h-0.5 bg-gradient-to-r from-blue-100 to-purple-100 mb-3"></div>
              <p className="text-gray-500 leading-relaxed">
                Gulmohar Homes — an elegant extension of Gulmohar Villas, offering HMDA & RERA-approved villa plots with serene living and excellent investment potential.
              </p>
            </div>
          </motion.div>
        </motion.a>

        {/* Card 3 */}
        <motion.a
          variants={itemVariants}
          whileHover="hover"
          className="group cursor-pointer"
        >
          <motion.div 
            className="overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
            variants={hoverVariants}
          >
            <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
              <motion.div
                variants={imageHoverVariants}
                className="w-full h-full"
              >
                <Image
                  className="rounded-t-2xl"
                  src="/AirportTown1.jpg"
                  alt="Airport Town"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4">
                {/* <span className="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full shadow-lg">
                  Premium
                </span> */}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-[#0192D3] transition-colors">
                  Airport Town
                </h2>
                <p className="text-lg font-semibold text-gray-600">Kothur - Penjerla Road</p>
              </div>
              <div className="w-full h-0.5 bg-gradient-to-r from-blue-100 to-purple-100 mb-3"></div>
              <p className="text-gray-500 leading-relaxed">
                Airport Town — a premium HMDA-approved open plot project just 2 km from Bangalore Highway, featuring limited plots with top-notch development.
              </p>
            </div>
          </motion.div>
        </motion.a>

        {/* Card 4 */}
        <motion.a
          variants={itemVariants}
          whileHover="hover"
          className="group cursor-pointer"
        >
          <motion.div 
            className="overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
            variants={hoverVariants}
          >
            <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
              <motion.div
                variants={imageHoverVariants}
                className="w-full h-full"
              >
                <Image
                  className="rounded-t-2xl"
                  src="/SadhanaCity1.jpg"
                  alt="Sadhana City"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4">
                {/* <span className="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full shadow-lg">
                  DTCP Approved
                </span> */}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-[#0192D3] transition-colors">
                  Sadhana City
                </h2>
                <p className="text-lg font-semibold text-gray-600">Veldanda, Kalwakurthy</p>
              </div>
              <div className="w-full h-0.5 bg-gradient-to-r from-blue-100 to-purple-100 mb-3"></div>
              <p className="text-gray-500 leading-relaxed">
                Sadhana City — a DTCP-approved gated community near the Regional Ring Road and Mucherla IT Cluster, offering 100% Vastu plots.
              </p>
            </div>
          </motion.div>
        </motion.a>

        {/* Card 5 */}
        <motion.a 
          href="/gulmoharvillas"
          variants={itemVariants}
          whileHover="hover"
          className="group cursor-pointer"
        >
          <motion.div 
            className="overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
            variants={hoverVariants}
          >
            <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
              <motion.div
                variants={imageHoverVariants}
                className="w-full h-full"
              >
                <Image
                  className="rounded-t-2xl"
                  src="/GVdrone1.jpg"
                  alt="Gulmohar Villas"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4">
                {/* <span className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full shadow-lg">
                  Flagship
                </span> */}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-[#0192D3] transition-colors">
                  Gulmohar Villas
                </h2>
                <p className="text-lg font-semibold text-gray-600">Shadnagar</p>
              </div>
              <div className="w-full h-0.5 bg-gradient-to-r from-blue-100 to-purple-100 mb-3"></div>
              <p className="text-gray-500 leading-relaxed">
                Our first-ever HMDA-approved 22-acre villa plot project in Nagulapally,
                Shadnagar, designed to enhance community living.
              </p>
            </div>
          </motion.div>
        </motion.a>

        {/* Card 6 */}
        <motion.a 
          href="/rivendellfarms"
          variants={itemVariants}
          whileHover="hover"
          className="group cursor-pointer"
        >
          <motion.div 
            className="overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
            variants={hoverVariants}
          >
            <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
              <motion.div
                variants={imageHoverVariants}
                className="w-full h-full"
              >
                <Image
                  className="rounded-t-2xl"
                  src="/RFS2.jpeg"
                  alt="Rivendell Farms"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4">
                {/* <span className="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full shadow-lg">
                  Farm Living
                </span> */}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-[#0192D3] transition-colors">
                  Rivendell Farms
                </h2>
                <p className="text-lg font-semibold text-gray-600">Thimmajipet, Jadcherla</p>
              </div>
              <div className="w-full h-0.5 bg-gradient-to-r from-blue-100 to-purple-100 mb-3"></div>
              <p className="text-gray-500 leading-relaxed">
                A premium farmland project with 10+ amenities, sustainable living concept,
                exclusive memberships, and full of experience.
              </p>
            </div>
          </motion.div>
        </motion.a>
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
          <button className="w-full max-w-sm px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
            View All Projects
          </button>
        </a>
      </motion.div>
    </div>
  );
};

export default Exclusiveprojects;