import Image from "next/image";
import React from "react";

const Exclusiveprojects = () => {
  return (
    <div className="px-4 sm:px-8 md:px-20 py-12" id="projects">
      {/* Highlights Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-5xl font-normal tracking-tight mt-2">
          Actively Running Projects
        </h1>

        <div className="mt-10 hidden md:block">
          <a href="/projects">
            <button className="px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition">
              Check All Projects →
            </button>
          </a>
        </div>
      </div>

      {/* Cards Section - 3 columns on large screens, 2 on sm/md, 1 on xs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {/* Card 1 */}
        <a href="/gulmoharvillas">
          <div className="overflow-hidden">
            <div className="relative w-full h-64 md:h-72 lg:h-80">
              <Image
                className="rounded-xl"
                src="/image.png"
                alt="Gulmohar Villas"
                fill
                style={{ objectFit: "cover", borderRadius: "0.75rem" }}
                priority
              />
            </div>
            <div className="pt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-3xl font-normal">Gulmohar Villas</h2>
                <p className="text-lg md:text-2xl font-normal">Shadnagar</p>
              </div>
              <hr className="border-t border-gray-300 mt-4" />
              <p className="text-sm md:text-base text-gray-500 mt-2">
                Our first-ever HMDA-approved 22-acre villa plot project in Nagulapally,
                Shadnagar, designed to enhance community living.
              </p>
            </div>
          </div>
        </a>

        {/* Card 2 */}
        <a href="/rivendellfarms">
          <div className="overflow-hidden">
            <div className="relative w-full h-64 md:h-72 lg:h-80">
              <Image
                className="rounded-xl"
                src="/RFS2.jpeg"
                alt="Rivendell Farms"
                fill
                style={{ objectFit: "cover", borderRadius: "0.75rem" }}
                priority
              />
            </div>
            <div className="pt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-3xl font-normal">Rivendell Farms</h2>
                <p className="text-lg md:text-2xl font-normal">Thimmajipet, Jadcherla</p>
              </div>
              <hr className="border-t border-gray-300 mt-4" />
              <p className="text-sm md:text-base text-gray-500 mt-2">
                A premium farmland project with 10+ amenities, sustainable living concept,
                exclusive memberships, and full of experience.
              </p>
            </div>
          </div>
        </a>

        {/* Card 3 */}
        <a>
          <div className="overflow-hidden">
            <div className="relative w-full h-64 md:h-72 lg:h-80">
              <Image
                className="rounded-xl"
                src="/project3.jpg"
                alt="Meadow View"
                fill
                style={{ objectFit: "cover", borderRadius: "0.75rem" }}
              />
            </div>
            <div className="pt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-3xl font-normal">Gulmohar Homes</h2>
                <p className="text-lg md:text-2xl font-normal">Shadnagar</p>
              </div>
              <hr className="border-t border-gray-300 mt-4" />
              <p className="text-sm md:text-base text-gray-500 mt-2">
                Gulmohar Homes — an elegant extension of Gulmohar Villas, offering HMDA & RERA-approved villa plots with serene living and excellent investment potential.
              </p>
            </div>
          </div>
        </a>

        {/* Card 4 */}
        <a>
          <div className="overflow-hidden">
            <div className="relative w-full h-64 md:h-72 lg:h-80">
              <Image
                className="rounded-xl"
                src="/project4.jpg"
                alt="Airport Town"
                fill
                style={{ objectFit: "cover", borderRadius: "0.75rem" }}
              />
            </div>
            <div className="pt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-3xl font-normal">Airport Town</h2>
                <p className="text-lg md:text-2xl font-normal">Kothur - Penjerla Road</p>
              </div>
              <hr className="border-t border-gray-300 mt-4" />
              <p className="text-sm md:text-base text-gray-500 mt-2">
                Airport Town — a premium HMDA-approved open plot project just 2 km from Bangalore Highway, featuring limited plots with top-notch development, ideal for both investment and ready-to-construct homes.

              </p>
            </div>
          </div>
        </a>

        {/* Card 5 */}
        <a>
          <div className="overflow-hidden">
            <div className="relative w-full h-64 md:h-72 lg:h-80">
              <Image
                className="rounded-xl"
                src="/project5.jpg"
                alt="Olive Gardens"
                fill
                style={{ objectFit: "cover", borderRadius: "0.75rem" }}
              />
            </div>
            <div className="pt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-3xl font-normal">Sadhana City</h2>
                <p className="text-lg md:text-2xl font-normal">Veldanda, Kalwakurthy</p>
              </div>
              <hr className="border-t border-gray-300 mt-4" />
              <p className="text-sm md:text-base text-gray-500 mt-2">
                Sadhana City — a DTCP-approved gated community near the Regional Ring Road and Mucherla IT Cluster, offering 100% Vastu plots with top amenities, clear titles, and excellent investment potential.
              </p>
            </div>
          </div>
        </a>

        {/* Card 6 */}
        <a>
          <div className="overflow-hidden">
            <div className="relative w-full h-64 md:h-72 lg:h-80">
              <Image
                className="rounded-xl"
                src="/project6.jpg"
                alt="Harmony Plots"
                fill
                style={{ objectFit: "cover", borderRadius: "0.75rem" }}
              />
            </div>
            <div className="pt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-3xl font-normal">Sukoon City</h2>
                <p className="text-lg md:text-2xl font-normal"></p>
              </div>
              <hr className="border-t border-gray-300 mt-4" />
              <p className="text-sm md:text-base text-gray-500 mt-2">
                Launching Soon!
              </p>
            </div>
          </div>
        </a>
      </div>

      <div className="mt-10 sm:hidden">
        <a href="/projects">
          <button className="w-full px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition">
            Check All Projects →
          </button>
        </a>
      </div>
    </div>
  );
};

export default Exclusiveprojects;
