'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SukoonVillas = () => {
  const [isClient, setIsClient] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        { threshold: 0.5 }
      );
      if (videoRef.current) observer.observe(videoRef.current);
      return () => observer.disconnect();
    }, [isClient]);
  };

  // --- Icons ---
  const LocationIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>;
  
  const AreaIcon = (props) => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M10 4H5c-1.1 0-2 .9-2 2v5h2V6h5V4zm4 0v2h5v5h2V6c0-1.1-.9-2-2-2h-5zm-4 16H5c-1.1 0-2-.9-2-2v-5h2v5h5v2zm9 0h-5v-2h5v-5h2v5c0 1.1-.9 2-2 2z"/>
    </svg>
  );

  const ApprovalIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>;
  const RoadIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>;
  const ClubhouseIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>;
  const ElectricityIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2l10 10-5 1 5 5v1l-7-7 5-1-5-5z"/></svg>;
  const SecurityIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>;
  const ParkIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>;
  const LightingIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8H7z"/></svg>;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // --- Animations ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  // Hero Section
  // Hero Section
  const HeroSection = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2e084d]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2e084d] via-[#5a108f]/80 to-transparent z-10 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#2e084d]/50 via-transparent to-[#E3F2ED] z-10"></div>
          <motion.img
            style={{ y: y1, scale: 1.1 }}
            src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Our-Projects-section/DJI_20251017151106_0138_D%20(1).jpg"
            alt="Sukoon Villas Aerial"
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-20 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Content */}
            <motion.div 
              whileInView="visible"     // Changed to whileInView
              viewport={{ once: true }} // The Fix: Ensures it only animates one time
              variants={staggerContainer}
              className="lg:col-span-7 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                <span className="text-white/90 text-xs font-medium tracking-widest uppercase">New Launch • Srisailam Highway NH-765</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="font-serif text-5xl sm:text-6xl lg:text-8xl font-normal text-white leading-none mb-6 tracking-tight">
                Find Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 italic font-light">Sukoon</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-200 mb-8 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed text-justify">
                Located on the growth corridor of Srisailam Highway and just 1.7 kms from ORR Exit 14, Sukoon Villas by Flivv Developers is poised to be one of the most sought-after investment destinations in Tukkuguda.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-white text-[#5a108f] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-1"
                >
                  Enquire Now
                </button>
                <button
                  onClick={() => scrollToSection('video-tour')}
                  className="flex items-center justify-center gap-2 border border-white/30 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-[#5a108f] transition-all duration-300 group"
                >
                  <span>View Location</span>
                </button>
              </motion.div>
            </motion.div>
            
            {/* Abstract Floating Card */}
            <motion.div 
              style={{ y: y2 }}
              className="hidden lg:block lg:col-span-5 relative"
            >
               <div className="relative p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#5a108f] rounded-full blur-3xl opacity-50"></div>
                 <div className="space-y-6 p-2">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-full text-[#5a108f] shadow-lg">
                            <LocationIcon />
                        </div>
                        <div>
                            <h3 className="text-white font-serif text-xl">Tukkuguda ORR Exit 14</h3>
                        </div>
                    </div>
                    <hr className="border-white/10" />
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-full text-[#5a108f] shadow-lg">
                            <AreaIcon />
                        </div>
                        <div>
                            <h3 className="text-white font-serif text-xl">Premium Villa Plot Project</h3>
                        </div>
                    </div>
                 </div>
               </div>
            </motion.div>
          </div>
        </div>
        
        {/* Smooth Transition Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#E3F2ED] to-transparent z-20"></div>
      </section>
    );
  };

  // Features Section
  const FeaturesSection = () => {
    const features = [
      { icon: <LocationIcon />, title: "Strategic Location", desc: "Located only 1.7 Km from ORR Exit 14 Tukkuguda" },
      { icon: <AreaIcon />, title: "6 Acres", desc: "Spacious gated community with well-planned amenities" },
      { icon: <RoadIcon />, title: "Highway Access", desc: "Easy access to Srisailam Highway with high visibility" }
    ];

    return (
      <section className="py-20 lg:py-32 bg-[#E3F2ED] relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }} // Fix: Ensures animation only happens once
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">Why Choose <span className="text-[#5a108f] italic"> Sukoon Villas ?</span></h2>
            <div className="w-20 h-1 bg-[#5a108f] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">For those who value quality, location, and peaceful living</p>
          </motion.div>

          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }} // Fix: Ensures animation only happens once
             variants={staggerContainer}
             className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeInUp} className="group">
                <div className="relative h-full bg-white rounded-[2.5rem] p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-[#5a108f]/10 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-[#F3EAFD] rounded-2xl flex items-center justify-center text-[#5a108f] mb-8 group-hover:bg-[#5a108f] group-hover:text-white transition-colors duration-500">
                    {f.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-3">{f.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  };

  // Video Section
  const VideoSection = () => {
    const videoRef = useRef(null);
    useVideoPlayback(videoRef);

    return (
      <section id="video-tour" className="py-20 bg-[#E3F2ED]">
        <div className="container mx-auto px-4 lg:px-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} // Fix: Ensures animation only happens once
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white"
          >
            <video
              ref={videoRef}
              className="w-full h-[60vh] lg:h-[80vh] object-cover"
              muted
              playsInline
              loop
              controlsList="nodownload"
            >
              <source src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/SukoonVillas/TUKKUGUDA%20SUKOON%20VILLAS%20(1).mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>
    );
  };

  // Amenities Section
  const AmenitiesSection = () => {
    const amenities = [
      { icon: <ClubhouseIcon />, name: "Club House" },
      { icon: <RoadIcon />, name: "40ft Wide Roads" },
      { icon: <ElectricityIcon />, name: "Underground Power" },
      { icon: <LightingIcon />, name: "LED Lighting" },
      { icon: <ParkIcon />, name: "Lush Parks" },
      { icon: <SecurityIcon />, name: "Gated Security" }
    ];

    return (
      <section id="amenities" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E3F2ED] skew-x-12 opacity-50 z-0"></div>

        <div className="container mx-auto px-4 lg:px-20 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} // Fix: Ensures animation only happens once
                variants={fadeInUp}
              >
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Premium <br/><span className="text-[#5a108f]">Amenities</span></h2>
                <p className="text-gray-600 text-xl leading-relaxed mb-8">
                  Everything you need for comfortable & luxurious living
                </p>
              </motion.div>
            </div>

            <div className="lg:w-2/3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {amenities.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} // Fix: Ensures animation only happens once
                    transition={{ delay: idx * 0.1 }}
                    className="group flex flex-col items-center justify-center p-8 bg-[#F9FCFB] rounded-3xl border border-gray-100 hover:border-[#5a108f]/20 hover:bg-white hover:shadow-xl transition-all duration-300 aspect-square"
                  >
                    <div className="w-14 h-14 text-gray-400 group-hover:text-[#5a108f] group-hover:scale-110 transition-all duration-300 mb-4">
                      {item.icon}
                    </div>
                    <span className="text-gray-800 font-medium text-center group-hover:text-[#5a108f] transition-colors">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  };

  // CTA Section
  const CTASection = () => (
    <section className="py-24 bg-[#E3F2ED] px-4">
      <div className="container mx-auto">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} // Fix: Ensures animation only happens once
          variants={fadeInUp}
          className="relative rounded-[3rem] overflow-hidden bg-[#5a108f] px-6 py-20 text-center shadow-2xl"
        >
           <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
           
           <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="font-serif text-4xl md:text-6xl font-normal text-white mb-6 lg:leading-18">Ready to Experience <span className="italic text-[#E3F2ED]">Sukoon Living? </span></h2>
             <p className="text-purple-100 text-lg mb-10">Discover Flivv Developers premium Villa Plot project & discover the "sukoon" you've always wanted.</p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button onClick={() => scrollToSection('contact')} className="bg-white text-[#5a108f] px-10 py-4 rounded-full font-bold shadow-lg hover:bg-purple-50 transition-all transform hover:-translate-y-1">
                 Schedule Site Visit
               </button>
               <button onClick={() => scrollToSection('location')} className="border border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                 View Location
               </button>
             </div>
           </div>
        </motion.div>
      </div>
    </section>
  );

  // Location Section
  const LocationSection = () => (
    <section id="location" className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-20">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <motion.div 
             initial="hidden" 
             whileInView="visible" 
             viewport={{ once: true }} // Fix: Ensures animation only happens once
             variants={staggerContainer}
            >
             <motion.h2 variants={fadeInUp} className="font-serif text-4xl lg:text-5xl font-normal text-gray-900 mb-8">Location  <br/><span className="text-[#5a108f]">Highlights</span></motion.h2>
             <div className="space-y-6">
                {[
                  { label: "1.7 km from ORR Exit No.14"},
                  { label: "Adjacent to PistaHouse & AVM Hotel" },
                  { label: "Proximity to schools and healthcare" },
                  { label: "Planned neighborhood development"},
                ].map((item, i) => (
                  <motion.div variants={fadeInUp} key={i} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-[#f9f9f9] transition-colors">
                      <span className="text-gray-600 font-medium text-lg">{item.label}</span>
                  </motion.div>
                ))}
             </div>
             <div className="mt-8 p-4 bg-[#E3F2ED] rounded-2xl border border-[#5a108f]/10 flex gap-4 items-start">
               <div className="mt-1 text-[#5a108f]"><ApprovalIcon /></div>
               <p className="text-sm text-gray-700 font-medium">Strategically positioned for ultimate convenience, Sukoon Villas offers the perfect harmony between serene living and urban accessibility.</p>
             </div>
           </motion.div>

           <motion.div 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} // Fix: Ensures animation only happens once
              transition={{ duration: 0.8 }}
              className="h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative group"
           >
             <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4099.513639258699!2d78.47433027516034!3d17.187012883666437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDExJzEzLjMiTiA3OMKwMjgnMzYuOSJF!5e1!3m2!1sen!2sqa!4v1763586498330!5m2!1sen!2sqa"
             className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
             allowFullScreen
             loading="lazy"
             title="Sukoon Villas Location Map"
             referrerPolicy="no-referrer-when-downgrade"></iframe>
           </motion.div>
         </div>
      </div>
    </section>
  );

  // Contact Section (HubSpot)
  const HubSpotContactSection = () => {
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://js-na2.hsforms.net/forms/embed/21626983.js';
      script.defer = true;
      document.head.appendChild(script);
      return () => { document.head.removeChild(script); };
    }, []);

    return (
      <section id="contact" className="py-24 bg-gradient-to-b from-[#E3F2ED] to-white">
        <div className="container mx-auto px-4 lg:px-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} // Fix: Ensures animation only happens once
            className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(90,16,143,0.1)] overflow-hidden"
          >
            <div className="grid grid-cols-1 h-full">
               <div className="lg:col-span-2 bg-[#5a108f] p-10 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="relative z-10 text-center">
                     <h3 className="font-serif text-3xl lg:text-5xl font-normal mb-4">Get in Touch</h3>
                     <p className="text-purple-200">We would love to hear from you. Schedule a site visit today.</p>
                  </div>
                  {/* Decorative Circle */}
                  <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-2xl"></div>
               </div>

               <div className="lg:col-span-3 lg:p-10 bg-white">
                  <div className="hs-form-frame" data-region="na2" data-form-id="20ddbc02-a58e-4528-b34a-b8f5a347a89c" data-portal-id="21626983">
                    <div className="flex items-center justify-center h-64 text-gray-400 animate-pulse">Loading form...</div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#5a108f] selection:text-white">
      <HeroSection />
      <FeaturesSection />
      <VideoSection />
      <AmenitiesSection />
      <CTASection />
      <LocationSection />
      <HubSpotContactSection />
    </div>
  );
};

export default SukoonVillas;