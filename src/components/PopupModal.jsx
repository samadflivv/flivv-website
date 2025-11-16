"use client";

import React, { useEffect, useState } from "react";

const PopupModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on home page and once per session
    if (window.location.pathname === "/" && !sessionStorage.getItem("popupShown")) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem("popupShown", "true");
      }, 5000); // 3 seconds delay

      // Load HubSpot form script
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/embed/21626983.js";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl flex flex-col md:flex-row w-[95%] max-w-5xl text-white overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-5 right-6 text-black text-2xl font-bold hover:text-red-400"
        >
          &times;
        </button>

        {/* Left Image - hidden on mobile */}
        <div className="hidden md:block w-1/2 h-full">
          <img
            src="/popup-img-2.jpeg"
            alt="Popup Visual"
            className="w-full h-150 object-cover"
          />
        </div>

        {/* Right HubSpot Form (non-glass background) */}
        <div className="w-full md:w-1/2  md:p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-3 text-black pt-6 pl-6 sm:p-0">Get in touch with us!</h2>
          <p className="sm:mb-4 text-sm text-black/80 pl-6 sm:p-0">Help us understand your investment preferences better so we assist you accordingly.</p>

          <div className="bg-white text-black rounded-md sm:shadow-lg">
            <div
              className="hs-form-frame"
              data-region="na1"
              data-form-id="760bc3ed-5901-4e22-9d53-bdf02db591db"
              data-portal-id="21626983"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
