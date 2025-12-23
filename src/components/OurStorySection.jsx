'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const OurStorySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section className="bg-white text-black px-4 md:px-40 py-16">
      {/* Top Content */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        {/* Left bullet and heading */}
        <div className="md:w-1/2">
          <p className="text-xl tracking-widest text-black uppercase mb-2">About Us</p>
          <h2 className="sm:text-6xl text-4xl font-normal">
           Flivv Developers
          </h2>
        </div>

        {/* Right Paragraphs */}
        <div className="md:w-1/2 space-y-6 text-gray-600 text-base text-justify">
          <p>
            Flivv, as a brand, has been in the business for more than a decade. We have worked as an IT company and gained the trust of our clients in our successful years of service. We have now diversified into Realty aiming, to continue the cycle of exceptional work with utmost commitment.
          </p>
          <p>
            Real Estate is one of the most recognized industries in the world. Additionally, the construction of housing spaces and lodging has also increased in urban and semi-urban areas leading people to explore outskirts and developing areas for investing in open plots. Keeping this into consideration, as realtors in Hyderabad, Flivv Developers works efficiently to ensure that your investments in Real Estate properties are safe.
          </p>
          <p>
            Flivv Developers is an extended product from Flivv Web Development Private Limited. We exclusively focus on open plot ventures and provide the leading services based on the needs of our clients. Be it for short-term or long-term investment purposes. We make sure to secure your investments and provide you with profitable returns with life-long assistance.
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="mt-12">
        <img
          src="/teamflivv.JPG"
          alt="Modern Architecture"
          className="rounded-xl w-full h-full object-cover shadow-lg cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        />
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            className="absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/40 transition z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8 text-white" />
          </button>

          {/* Image content */}
          <motion.img
            src="/teamflivv.JPG"
            alt="Flivv Developers Team"
            className="max-w-5xl max-h-[85vh] w-full h-auto object-contain rounded-lg shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  );
};

export default OurStorySection;
