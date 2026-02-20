import React from "react";
import HubspotForm from "./HubspotForm";

const ContactHeroSection = () => {
  return (
    <section className="relative bg-[#1c1c1c] min-h-screen flex items-center justify-center m-3 sm:px-6 py-5 pt-35 rounded-xl">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#1c1c1c] overflow-hidden">
        {/* Image Section */}
        <div className="w-full h-64 sm:h-96 md:h-full p-4">
          <img
            src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/LW0A7960.jpg"
            alt="Green Villa"
            className="w-full lg:h-150 h-70 object-cover rounded-xl border-5"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center text-white px-4 sm:px-10 py-8 space-y-6">
          <h2 className="text-4xl sm:text-5xl font-normal">Connect with us</h2>
            <HubspotForm/>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;
