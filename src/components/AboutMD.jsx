"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutUs = () => {
  const statsRef = useRef(null);
  const sectionRefs = useRef([]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-normal text-gray-900 mb-6">
            About the  <span className="text-[#0192D3]">Founder</span>
          </h1>
          <div className="w-24 h-1.5 bg-[#0192D3] mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          ref={el => sectionRefs.current[0] = el}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mb-20"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300">
            <div className="md:flex">
              {/* Image Column */}
              <motion.div 
                variants={fadeInUp}
                className="md:w-2/5 relative overflow-hidden"
              >
                <div className="relative h-80 md:h-">
                  {/* Replace with actual image */}
                  <img src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/LW0A0678-2.jpg" alt="" className='object-cover'/>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-x-10 -translate-y-10"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 translate-y-16"></div>
                </div>
              </motion.div>

              {/* Content Column */}
              <motion.div 
                variants={fadeInUp}
                className="md:w-3/5 p-8 md:p-12"
              >
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  <strong className='text-2xl italic'>Mohammed Vaseem Siddiqui</strong>, the founder and the mastermind behind Flivv is the epitome of leadership. 
                  He started his professional journey in the IT industry as a coder.
                </p>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  After completing his education in Masters in Computer Application and 15+ years of successful experience 
                  in Web Development, Vaseem founded Flivv Web Development Pvt. Ltd. with an excellent dynamic team that 
                  has served 100+ clients over the years global services with a 99% client retention rate.
                </p>

                {/* Stats */}
                <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="stat-number text-5xl font-bold text-[#0192d3] mb-2">15+</div>
                    <div className="text-gray-600 font-semibold">Years Experience</div>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="stat-number text-5xl font-bold text-blue-600 mb-2">100+</div>
                    <div className="text-gray-600 font-semibold">Clients Served</div>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="stat-number text-5xl font-bold text-green-600 mb-2">99%</div>
                    <div className="text-gray-600 font-semibold">Retention Rate</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Real Estate Journey Section */}
        <motion.div
          ref={el => sectionRefs.current[1] = el}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="md:flex md:flex-row-reverse">
              {/* Image Column */}
              <motion.div 
                variants={fadeInUp}
                className="md:w-2/5 relative overflow-hidden"
              >
                <div className="relative h-80 md:h-full">
                  {/* Replace with actual image */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 bg-gradient-to-tr from-blue-600/20 to-purple-600/20">
                    <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
                      <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-center">Real Estate Journey</h3>
                    <p className="text-blue-200 mt-2">From IT to Real Estate</p>
                  </div>
                  
                  {/* Animated background elements */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
              </motion.div>

              {/* Content Column */}
              <motion.div 
                variants={fadeInUp}
                className="md:w-3/5 p-8 md:p-12 text-white"
              >
                <h2 className="text-3xl font-bold mb-6 pb-4 border-b border-gray-700">
                  Vaseem&apos;s Real Estate Journey
                </h2>
                
                <p className="text-gray-200 text-lg leading-relaxed mb-6">
                  As a result of his hard work and commitment to the IT sector, Vaseem decided to pursue an interest 
                  he had from an early age in Real Estate. Flivv Developers then became the exclusive platform for the newest project, NS Homes, thanks to the intermediary experience.
                </p>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-blue-600/30 to-[#0192d3] border-l-4 border-yellow-500 p-6 rounded-r-2xl my-8 backdrop-blur-sm"
                >
                  <p className="text-xl italic font-semibold">
                    We believe this is just the beginning for someone who has always embraced challenges 
                    with a forward-looking attitude.
                  </p>
                </motion.div>
                
                <p className="text-gray-200 text-lg leading-relaxed mb-8">
                  A combination of his passion and perseverance led him to become a full-time realtor. 
                  The focus of his professional career is to establish connections, build relationships, 
                  and serve the community.
                </p>

                {/* Inspirations */}
                <div className="mt-10">
                  <h4 className="text-xl font-bold mb-4 text-[#0192d3]">Inspirations</h4>
                  <div className="flex flex-wrap gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="px-6 py-4 bg-white/10 rounded-2xl backdrop-blur-sm"
                    >
                      <div className="font-bold text-white">Grant Cardone</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="px-6 py-4 bg-white/10 rounded-2xl backdrop-blur-sm"
                    >
                      <div className="font-bold text-white">Jordan Belfort</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Goal & Mission Section */}
        <motion.div
          ref={el => sectionRefs.current[2] = el}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-[#0192d3] rounded-3xl shadow-2xl overflow-hidden p-1">
            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <motion.div
                variants={fadeInUp}
                className="text-center max-w-4xl mx-auto"
              >
                <h2 className="text-4xl font-bold text-white mb-8">
                  Goal & Mission
                </h2>
                
                <p className="text-xl text-gray-200 leading-relaxed mb-8">
                  When it comes to doing business, Vaseem has an unconventional approach. He likes to think outside 
                  the box and create new opportunities for people around him. He empowers his team and drives the 
                  business with an emotional drive.
                </p>
                
                <p className="text-xl text-gray-200 leading-relaxed">
                  His ability to maintain relationships with his team and keep them close has motivated him to keep 
                  going and pursue his passion all these years. All in all, Vaseem strives to build a solid presence 
                  in the Real Estate market while strengthening networks and helping people make the best investment decisions.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Floating Decorative Elements */}
        <div className="fixed top-20 left-5 w-4 h-4 bg-blue-400 rounded-full opacity-20 pointer-events-none"></div>
        <div className="fixed bottom-20 right-5 w-6 h-6 bg-purple-400 rounded-full opacity-20 pointer-events-none"></div>
        <div className="fixed top-1/2 left-10 w-2 h-2 bg-green-400 rounded-full opacity-20 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default AboutUs;