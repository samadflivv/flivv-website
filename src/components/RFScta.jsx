'use client';

import React from "react";
import RFSForm from "./RFSForm"; // Adjust the path as needed

export default function RFScta() {
  return (
    <section className="py-12 px-6 lg:px-30 bg-white">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center">
        {/* LEFT - Content */}
        <div className="w-full md:w-[50%]">
          <div className="inline-flex items-center gap-3 mb-4 justify-center md:justify-start">
            <span className="w-1 h-10 rounded-full" style={{ background: "#52B788" }} />
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">Contact</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-normal text-[#081C15] mb-4  md:text-left">
            Request a Visit
          </h2>

          <p className="text-gray-700 text-base md:text-lg max-w-lg mx-auto md:mx-0 md:text-left">
            Choose a convenient date & time and we'll arrange a personalised tour. Fill the form and we'll respond quickly.
          </p>
        </div>

        {/* RIGHT - Form Card */}
        <div className="w-full md:w-[50%]">
          <RFSForm />
        </div>
      </div>
    </section>
  );
}
