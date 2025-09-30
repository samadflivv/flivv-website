"use client";

import React, { useEffect, useState } from "react";

const PopupRFS = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/rivendellfarms" && !sessionStorage.getItem("popupShown")) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem("popupShown", "true");
      }, 30000);

      // Load HubSpot form script
      const script = document.createElement("script");
      script.src = "https://js-na2.hsforms.net/forms/embed/21626983.js";
      script.defer = true;
      document.body.appendChild(script);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
      {/* Modal container */}
      <div
        className="
          relative bg-[#081C15] backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-5xl text-white
          overflow-hidden
          max-h-[calc(100dvh-2rem)] md:max-h-none
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Close Button inside popup */}
        <button
          onClick={closePopup}
          className="absolute top-2 right-3 md:top-3 md:right-5 text-white text-2xl font-bold hover:text-red-400 z-10"
        >
          &times;
        </button>

        {/* Left Image - hidden on mobile */}
        <div className="hidden md:block w-1/2 h-full">
          <img
            src="/fountainimgforpopup.jpeg"
            alt="Popup Visual"
            className="w-full h-160 object-cover"
          />
        </div>

        {/* Right HubSpot Form */}
        <div className="w-full md:w-1/2 md:p-6 flex flex-col justify-center overflow-y-auto">
          <h2 className="lg:text-4xl text-2xl font-normal mb-3 text-white pt-6 pl-6 pr-6 sm:p-0">
            Get in Touch With Us
          </h2>
          <p className="sm:mb-4 mb-2 text-lg font-semibold text-white/80 pl-6 sm:p-0">
            Leave your details & we’ll get in touch
          </p>
          <div className="bg-[#D8F3DC] text-black rounded-md sm:shadow-lg m-6 md:m-0 overflow-auto">
            <div
              className="hs-form-frame"
              data-region="na2"
              data-form-id="fe48d8bb-c0aa-41d3-8f45-a54c78e57d79"
              data-portal-id="21626983"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupRFS;
