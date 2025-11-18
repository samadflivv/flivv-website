'use client';

import React, { useEffect, useRef, useState } from 'react';

const SukoonLandingPage = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Custom hook for video intersection playback
  const useVideoPlayback = (videoRef) => {
    useEffect(() => {
      if (!isClient) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              videoRef.current?.play().catch(console.error);
            } else {
              videoRef.current?.pause();
            }
          });
        },
        { threshold: 0.7 }
      );

      if (videoRef.current) {
        observer.observe(videoRef.current);
      }

      return () => observer.disconnect();
    }, [isClient]);
  };

  // Monochrome purple icons as SVG components
  const LocationIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
    </svg>
  );

  const AreaIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V5h14v14H5z"/>
      <path d="M7 12h10v2H7zM7 8h10v2H7z"/>
    </svg>
  );

  const ApprovalIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  );

  const RoadIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>
  );

  const ClubhouseIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  );

  const ElectricityIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 2l10 10-5 1 5 5v1l-7-7 5-1-5-5z"/>
    </svg>
  );

  const WaterIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z"/>
    </svg>
  );

  const SecurityIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
    </svg>
  );

  const ParkIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
    </svg>
  );

  const DrainageIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M2 16h20v2H2zm0 4h20v2H2zm0 4h20v2H2z"/>
    </svg>
  );

  const LightingIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 2v11h3v9l7-12h-4l4-8H7z"/>
    </svg>
  );

  const CalendarIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
    </svg>
  );

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hero Section
  const SVHeroSection = () => {
    return (
      <section className="min-h-screen relative px-4 sm:px-6 lg:px-20 py-8 sm:py-12 overflow-hidden bg-gradient-to-b from-[#5a108f] via-[#5a108f] to-[#f0fff1]">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto pt-12 sm:pt-20 lg:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6 lg:mb-8">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-white font-semibold text-sm">New Launch • Main Road Venture</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                <span className="text-white">Sukoon</span>
                <span className="block text-[#f0fff1]">Villas</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/90 mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Premium residential venture 1.5 km from ORR Exit No.14. 
                Where comfort meets convenience in perfect harmony.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-white text-[#5a108f] px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg text-sm sm:text-base"
                >
                  Enquire Now
                </button>
                <button
                  onClick={() => scrollToSection('location')}
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:bg-white hover:text-[#5a108f] transition-all duration-300 text-sm sm:text-base"
                >
                  View Location
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 lg:mt-12 max-w-md">
                {[
                  { value: '6 Acres', label: 'Land Area' },
                  { value: '1.5 km', label: 'From ORR' },
                  { value: '2026', label: 'Completion' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Elegant Image Showcase */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/20">
                {/* Main Image Container */}
                <div className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5">
                  <img
                    src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Our-Projects-section/DJI_20251017151106_0138_D.jpg"
                    alt="Sukoon Villas Premium Development"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5a108f]/40 via-transparent to-transparent"></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-[#5a108f] font-semibold text-sm">Premium</span>
                  </div>
                </div>
                
                {/* Elegant Floating Cards */}
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-xl border border-white/50">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5a108f] rounded-2xl flex items-center justify-center text-white">
                      <LocationIcon />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">Prime Location</p>
                      <p className="text-xs text-gray-600">ORR Exit 14</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Info Strip */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-white">Limited Plots Available</span>
                  </div>
                  <div className="text-white font-semibold text-sm">6 Acre Gated Community</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Video Section
  const SVVideoSection = () => {
    const videoRef = useRef(null);

    useVideoPlayback(videoRef);

    return (
      <section className="relative overflow-hidden">
        <div className="container mx-auto">
          <div className="relative overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-auto max-h-screen object-cover"
              muted
              playsInline
              preload="metadata"
              controlsList="nodownload"
            >
              <source src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/SukoonVillas/TUKKUGUDA%20SUKOON%20VILLAS%20(1).mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    );
  };

  // Features Section
  const SVFeaturesSection = () => {
    const features = [
      {
        icon: <LocationIcon />,
        title: "Strategic Location",
        description: "1.5 km from ORR Exit No.14 with excellent connectivity to city centers and amenities"
      },
      {
        icon: <AreaIcon />,
        title: "6 Acre Development",
        description: "Spacious gated community with carefully planned infrastructure and green spaces"
      },
      {
        icon: <CalendarIcon />,
        title: "Timely Delivery",
        description: "HMDA approvals in progress with registry expected by March 2026"
      },
      {
        icon: <RoadIcon />,
        title: "Main Road Access",
        description: "Premium road-facing venture with easy access and high visibility"
      }
    ];

    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f0fff1]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-[#5a108f]">Sukoon Villas</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Designed for those who value quality, location, and peaceful living
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#5a108f] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <div className="pt-8 sm:pt-10 text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#5a108f]/20 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Amenities Section
  const SVAmenitiesSection = () => {
    const amenities = [
      { icon: <ClubhouseIcon />, name: "Club House" },
      { icon: <RoadIcon />, name: "40ft Wide Roads" },
      { icon: <ElectricityIcon />, name: "Underground Electricity" },
      { icon: <WaterIcon />, name: "24/7 Water Supply" },
      { icon: <DrainageIcon />, name: "Modern Drainage" },
      { icon: <LightingIcon />, name: "LED Street Lighting" },
      { icon: <ParkIcon />, name: "Landscaped Parks" },
      { icon: <SecurityIcon />, name: "Gated Security" }
    ];

    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white to-[#f0fff1]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Premium <span className="text-[#5a108f]">Amenities</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for comfortable and luxurious living
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {amenities.map((amenity, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#5a108f] rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                    {amenity.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{amenity.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // CTA Section
  const SVCTASection = () => {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#5a108f] to-[#7c3aed] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Your Dream Home <span className="text-[#f0fff1]">Awaits</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed">
              Join the exclusive community of discerning homeowners at Sukoon Villas. 
              Experience the perfect blend of luxury, comfort, and strategic location.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-white text-[#5a108f] px-8 sm:px-12 py-3 sm:py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl text-sm sm:text-base"
              >
                Schedule Site Visit
              </button>
              <button
                onClick={() => scrollToSection('location')}
                className="border-2 border-white text-white px-8 sm:px-12 py-3 sm:py-4 rounded-2xl font-bold hover:bg-white hover:text-[#5a108f] transition-all duration-300 text-sm sm:text-base"
              >
                View Location
              </button>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white/60 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#f0fff1] rounded-full"></div>
                <span>Premium Road-Facing Plots</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#f0fff1] rounded-full"></div>
                <span>HMDA Approved • March 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Location Section
  const SVLocationSection = () => {
    return (
      <section id="location" className="py-12 sm:py-16 lg:py-20 bg-[#f0fff1]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Prime <span className="text-[#5a108f]">Location</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Strategically positioned for ultimate convenience, Sukoon Villas offers 
                the perfect harmony between serene living and urban accessibility.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: <LocationIcon />, text: "1.5 km from ORR Exit No.14" },
                  { icon: <RoadIcon />, text: "Main road frontage with easy access" },
                  { icon: <AreaIcon />, text: "Adjacent to PistaHouse & AVM Mall" },
                  { icon: <ParkIcon />, text: "Proximity to schools and healthcare" },
                  { icon: <ApprovalIcon />, text: "Planned neighborhood development" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/60 rounded-xl border border-white/50 hover:shadow-lg transition-all duration-300">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5a108f] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-gray-700 font-medium text-sm sm:text-base">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-white to-[#f8fff8] rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/50">
                <div className="aspect-square bg-gradient-to-br from-[#5a108f]/5 to-[#5a108f]/10 rounded-2xl overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4099.513639258699!2d78.47433027516034!3d17.187012883666437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDExJzEzLjMiTiA3OMKwMjgnMzYuOSJF!5e1!3m2!1sen!2sin!4v1763403000302!5m2!1sen!2sin" 
                    className="w-full h-full rounded-2xl border-0"
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sukoon Villas Location Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // HubSpot Contact Form Section
  const SVHubSpotContactSection = () => {
    useEffect(() => {
      // Load HubSpot form script
      const script = document.createElement('script');
      script.src = 'https://js-na2.hsforms.net/forms/embed/21626983.js';
      script.defer = true;
      document.head.appendChild(script);

      return () => {
        // Cleanup if needed
        document.head.removeChild(script);
      };
    }, []);

    return (
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#f0fff1] to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Begin Your <span className="text-[#5a108f]">Journey</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Let us help you find your perfect home. Share your details and our team will connect with you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

              {/* HubSpot Form */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h3>
                  <p className="text-gray-600">Fill in your details and we'll contact you shortly</p>
                </div>
                
                <div 
                  className="hs-form-frame" 
                  data-region="na2" 
                  data-form-id="20ddbc02-a58e-4528-b34a-b8f5a347a89c" 
                  data-portal-id="21626983"
                >
                  {/* HubSpot form will be loaded here */}
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    Loading contact form...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-[#f0fff1]">
      <SVHeroSection />
      <SVFeaturesSection />
      <SVVideoSection />
      <SVAmenitiesSection />
      <SVCTASection />
      <SVLocationSection />
      <SVHubSpotContactSection />
    </div>
  );
};

export default SukoonLandingPage;