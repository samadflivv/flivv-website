'use client';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import { ScrollTrigger } from "gsap/ScrollTrigger";


const RFShighlights = () => {
  // Refs for animations
  const loopScrollRef = useRef(null);
  const dotRefs = useRef([]);
  
  // Initialize animations
  useEffect(() => {
    // Horizontal text loop animation
    if (loopScrollRef.current) {
      const loopContent = loopScrollRef.current;
      const loopItems = loopContent.querySelectorAll('.loop-item');
      
      // Duplicate items for seamless looping
      const cloneItems = Array.from(loopItems).map(item => item.cloneNode(true));
      cloneItems.forEach(item => {
        item.classList.add('clone');
        loopContent.appendChild(item);
      });
      
      // Calculate total width and create animation
      const totalWidth = Array.from(loopItems).reduce((acc, item) => 
        acc + item.offsetWidth + 40, 0
      );
      
      gsap.to(loopContent, {
        x: -totalWidth,
        duration: totalWidth / 50,
        repeat: -1,
        ease: 'none'
      });
    }
    
    // Dot animation for stats card
    const animateDot = (dot) => {
      gsap.to(dot, {
        keyframes: [
          { top: '10%', right: '10%', duration: 0 },
          { top: '10%', right: 'calc(100% - 35px)', duration: 1.5, ease: 'none' },
          { top: 'calc(100% - 30px)', right: 'calc(100% - 35px)', duration: 1.5, ease: 'none' },
          { top: 'calc(100% - 30px)', right: '10%', duration: 1.5, ease: 'none' },
          { top: '10%', right: '10%', duration: 1.5, ease: 'none' }
        ],
        repeat: -1,
        repeatDelay: 0
      });
    };
    
    // Animate all dots
    dotRefs.current.forEach(animateDot);
    
    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.globalTimeline.getChildren().forEach(tween => tween.kill());
    };
  }, []);

  // Framer Motion variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="w-full bg-[#081c15] mx-auto px-[10%] py-16 md:py-24">
      <h2 className='text-4xl lg:text-6xl font-normal flex justify-center pb-10 text-[#D8F3DC]'>Project Hightlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          {/* Rating Card */}
          <motion.div 
            className="bg-[#D8F3DC] rounded-xl p-8 flex flex-col space-y-4 shadow-xl shadow-[#95D5B2]/30"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex gap-5 items-center">
              <img src="/money-strategy.png" alt="" className='w-10 h-10'/>
              <p className="text-black font-semibold text-xl mt-1">EMI Facility Available</p>
            </div>
          </motion.div>
          
          {/* Video Card */}
          <motion.div 
  className="relative rounded-xl overflow-hidden h-130 shadow-lg"
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
  variants={cardVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  <video
    className="w-full h-full object-cover"
    src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/0810%20(2)(3).mp4"   // 👉 replace with actual video path
    autoPlay
    muted
    loop
    playsInline
    controls={true}
    disablePictureInPicture
    controlsList="nodownload noplaybackrate"
  />
</motion.div>


        </div>
        
        {/* Column 2 */}
        <div className="space-y-6">
          {/* Image Card */}
          <motion.div
            className="relative rounded-xl overflow-hidden h-90 shadow-lg"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
>
  {/* Background Image */}
  <img
    src="/RFSclubHouse.jpg"
    alt="Clubhouse"
    className="object-cover w-full h-full"
  />

  {/* Bottom Fade Overlay */}
  <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/70 via-black/60 to-transparent flex flex-col justify-end items-center p-4">
    <h3 className="text-2xl font-normal text-white">Exclusive Farmhouse Access</h3>
  </div>
</motion.div>


          
          {/* Testimonial Card */}
          <motion.div 
            className="bg-[#081C15] rounded-xl p-6 text-white flex flex-col justify-between inset-shadow-sm inset-shadow-[#1B4332]"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <div className="flex space-x-1">
              </div>
              <p className="text-xl italic">
                “Working with Rivendell Farms feels like a partnership; as we continued to use their services and found more use cases, our feature requests quickly found solutions.”
              </p>
            </div>
            <div className="mt-6">
              <p className="font-semibold">Alonso D. Dowson</p>
              <p className="text-gray-300">House Owner</p>
            </div>
          </motion.div>
        </div>
        
        {/* Column 3 */}
        <div className="space-y-6">
          <motion.div 
            className="bg-[#1B4332] rounded-xl p-6 flex flex-col space-y-4 shadow-lg"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            
            <div className='flex items-center gap-2'>
              <img src="/policestation.png" className="w-10 h-10" alt="" />
              <p className="text-white text-xl font-semibold mt-1">4-Kms away from Thimmajipet Police Station</p>
            </div>
          </motion.div>

          {/* Loop Scroll Text */}
          <motion.div 
  className="relative overflow-hidden rounded-xl bg-[#D8F3DC] h-58 shadow-xl shadow-[#95D5B2]/30"
  variants={cardVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  <img src="/RFSmaintenance.jpeg" alt="" className="w-full h-full object-cover" />

  {/* Transparent Black Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  <div 
    ref={loopScrollRef}
    className="absolute inset-0 flex items-end pb-10 whitespace-nowrap"
  >
    {[
      "10 Years of Security & Maintenance"
    ].map((item, index) => (
      <div 
        key={index} 
        className="loop-item mx-5 text-4xl font-semibold text-[#D8F3DC]"
      >
        {item}
      </div>
    ))}
  </div>

  <div 
    className="absolute inset-0 pointer-events-none"
    style={{
      maskImage: "linear-gradient(90deg, transparent, black 20%, black 80%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, black 20%, black 80%, transparent)"
    }}
  />
</motion.div>

          
          {/* Animated Stats Card */}
          <motion.div 
            className="relative w-full h-[260px] rounded-xl"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div 
              className="w-full h-full rounded-[10px] p-px"
              style={{
                background: 'radial-gradient(circle 230px at 0% 0%, #ffffff, #0c0d0d)'
              }}
            >
              {/* Animated dot */}
              <div 
                ref={el => dotRefs.current[0] = el}
                className="absolute w-[5px] aspect-square bg-white rounded-full z-10"
                style={{
                  boxShadow: '0 0 10px #ffffff',
                  top: '10%',
                  right: '10%'
                }}
              />
              
              {/* Card */}
              <div 
                className="w-full h-full rounded-[9px] border border-[#1B4332]  shadow-md shadow-[#1B4332] relative flex flex-col items-center justify-center text-white"
                style={{
                  background: 'radial-gradient(circle 300px at 0% 0%, #D8F3DC, #081C15)'
                }}
              >
                {/* Ray effect */}
                <div 
                  className="absolute w-[200px] h-[30px] rounded-full opacity-40"
                  style={{
                    background: '#D8F3DC',
                    boxShadow: '0 0 50px #fff',
                    filter: 'blur(10px)',
                    transformOrigin: '10%',
                    top: '0%',
                    left: 0,
                    transform: 'rotate(40deg)'
                  }}
                />
                
                {/* Stat value */}
                <div 
                  className="font-bold text-xl"
                  style={{
                    background: 'linear-gradient(45deg, #081C15 45%, #fff, #431d1dff)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  24X7 CCTV Surveillance
                </div>

                {/* Lines */}
                <div 
                  className="absolute top-[10%] w-full h-px"
                  style={{
                    background: 'linear-gradient(90deg, #888888 30%, #1d1f1f 70%)'
                  }}
                />
                <div className="absolute bottom-[10%] w-full h-px bg-[#2c2c2c]" />
                <div 
                  className="absolute left-[10%] w-px h-full"
                  style={{
                    background: 'linear-gradient(180deg, #747474 30%, #222424 70%)'
                  }}
                />
                <div className="absolute right-[10%] w-px h-full bg-[#2c2c2c]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RFShighlights;