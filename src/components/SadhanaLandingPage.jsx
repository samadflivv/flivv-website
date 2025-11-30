'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  ShieldCheck, 
  TreeDeciduous, 
  Zap, 
  Droplets, 
  Car, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Phone,
  Menu,
  X,
  Landmark
} from 'lucide-react';

/* --- HUBSPOT FORM COMPONENT --- */
const HubSpotForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://js-na2.hsforms.net/forms/embed/21626983.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-stone-100">
      <h3 className="text-2xl font-serif font-bold text-[#581c2f] mb-2">Enquire Now</h3>
      <p className="text-stone-500 text-sm mb-6">Get the brochure & plot availability map.</p>
      {/* Target for HubSpot Embed */}
      <div 
        className="hs-form-frame min-h-[400px]" 
        data-region="na2" 
        data-form-id="96a9f560-b1f0-43f7-8b91-08f8dd719931" 
        data-portal-id="21626983"
      >
        <div className="animate-pulse flex space-y-4 flex-col">
          <div className="h-10 bg-gray-100 rounded w-full"></div>
          <div className="h-10 bg-gray-100 rounded w-full"></div>
          <div className="h-32 bg-gray-100 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

/* --- MAIN LANDING PAGE --- */
const SadhanaCity = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Parallax Scroll Hooks
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

  // Handle Navbar Background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Data from PDF
  const highlights = [
    { icon: <ShieldCheck className="w-6 h-6" />, title: "DTCP Approved", desc: "T.L.P. NO. 241/2021/H" },
    { icon: <Landmark className="w-6 h-6" />, title: "100% Vastu", desc: "Designed for prosperity" },
    { icon: <CheckCircle2 className="w-6 h-6" />, title: "Spot Registration", desc: "Clear Title Ownership" },
    { icon: <TreeDeciduous className="w-6 h-6" />, title: "Avenue Plantation", desc: "Pollution-free environment" },
    { icon: <Car className="w-6 h-6" />, title: "Black Top Roads", desc: "33' and 40' Wide Roads" },
    { icon: <Droplets className="w-6 h-6" />, title: "Water Supply", desc: "Pipelines & Overhead Tank" },
    { icon: <Zap className="w-6 h-6" />, title: "Electricity", desc: "Lines with Street Lights" },
    { icon: <CheckCircle2 className="w-6 h-6" />, title: "Underground Drainage", desc: "Modern Infrastructure" },
  ];

  const locations = [
    "Adjacent to Kalwakurthy Town",
    "Near Regional Ring Road",
    "Close to Mucherla IT Cluster",
    "Near Srisailam Temple",
    "Close to Int'l Amusement Park"
  ];

  return (
    <div className="font-sans text-stone-800 bg-stone-50 overflow-x-hidden selection:bg-[#581c2f] selection:text-white">
      
      {/* --- NAVIGATION --- */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
             {/* Logo Placeholder */}
             <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-xl ${isScrolled ? 'bg-[#581c2f] text-white' : 'bg-white text-[#581c2f]'}`}>
                S
             </div>
             <span className={`font-serif text-2xl font-bold tracking-tight ${isScrolled ? 'text-[#581c2f]' : 'text-white'}`}>
               The Sadhana City
             </span>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center gap-8 font-medium ${isScrolled ? 'text-stone-600' : 'text-white/90'}`}>
            <a href="#highlights" className="hover:text-[#d4af37] transition-colors">Highlights</a>
            <a href="#location" className="hover:text-[#d4af37] transition-colors">Location</a>
            <a href="#pricing" className="hover:text-[#d4af37] transition-colors">Pricing</a>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'bg-[#581c2f] text-white hover:bg-[#7a2842]' 
                  : 'bg-white text-[#581c2f] hover:bg-[#f0f0f0]'
              }`}
            >
              Download Brochure
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className={isScrolled ? "text-stone-800" : "text-white"} /> : <Menu className={isScrolled ? "text-stone-800" : "text-white"} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-stone-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4 text-[#581c2f] font-medium">
                <a href="#highlights" onClick={() => setMobileMenuOpen(false)}>Highlights</a>
                <a href="#location" onClick={() => setMobileMenuOpen(false)}>Location</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-[#d4af37]">Enquire Now</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Parallax */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          {/* Fallback color if image loads slow */}
          <div className="absolute inset-0 bg-[#581c2f]" />
          <img 
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop" 
            alt="Sadhana City Landscape" 
            className="w-full h-full object-cover opacity-60"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#581c2f]/80 via-[#581c2f]/40 to-[#581c2f]/90" />
        </motion.div>

        <motion.div 
          style={{ opacity: opacityHero }}
          className="relative z-10 container mx-auto px-6 text-center text-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-4 border border-[#d4af37] text-[#d4af37] rounded-full text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-6 bg-[#581c2f]/50 backdrop-blur-sm">
              DTCP Approved Layout
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight">
              Invest in <br />
              <span className="text-[#d4af37] italic pr-2">Serenity</span> 
              & Growth
            </h1>
            <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              A premium gated community near the Mucherla IT Cluster. 
              100% Vastu compliant, pollution-free living with clear titles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})}
                className="bg-[#d4af37] text-[#581c2f] px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-orange-900/20"
              >
                Book Site Visit
              </button>
              <button 
                 onClick={() => document.getElementById('highlights').scrollIntoView({behavior: 'smooth'})}
                 className="flex items-center gap-2 text-white border border-white/30 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all"
              >
                Explore Features <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-50 to-transparent z-10" />
      </header>

      {/* --- STATS STRIP --- */}
      <section className="relative z-20 -mt-16 container mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-stone-100">
          <div className="text-center">
            <p className="text-[#d4af37] font-bold text-3xl mb-1">242</p>
            <p className="text-stone-500 text-xs uppercase tracking-wide">Total Plots</p>
          </div>
          <div className="text-center">
            <p className="text-[#581c2f] font-bold text-3xl mb-1">184</p>
            <p className="text-stone-500 text-xs uppercase tracking-wide">Available Now</p>
          </div>
          <div className="text-center">
            <p className="text-stone-800 font-bold text-3xl mb-1">DTCP</p>
            <p className="text-stone-500 text-xs uppercase tracking-wide">Approved</p>
          </div>
          <div className="text-center pl-4">
            <p className="text-stone-800 font-bold text-3xl mb-1">100%</p>
            <p className="text-stone-500 text-xs uppercase tracking-wide">Vastu Compliant</p>
          </div>
        </div>
      </section>

      {/* --- INTRO & HIGHLIGHTS --- */}
      <section id="highlights" className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3"
          >
            <h4 className="text-[#d4af37] font-bold tracking-widest uppercase text-sm mb-4">The Project</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-[#581c2f] font-bold mb-6 leading-tight">
              A Legacy of <br /> Trust & Quality
            </h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Sadhana City is a visionary gated community designed for those who seek peace without compromising connectivity. 
              Featuring 2 approach roads and state-of-the-art infrastructure, this project ensures hassle-free ownership with 
              clear titles and spot registration.
            </p>
            <div className="p-6 bg-[#581c2f]/5 rounded-xl border border-[#581c2f]/10">
              <p className="font-serif text-[#581c2f] italic text-lg">
                "Ideally located near the Regional Ring Road & Mucherla IT Cluster."
              </p>
            </div>
          </motion.div>

          {/* Right: Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-stone-100 flex items-start gap-4"
              >
                <div className="bg-[#581c2f] text-white p-3 rounded-lg shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-stone-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING & CTA --- */}
      <section id="pricing" className="py-24 bg-[#581c2f] relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37] rounded-full blur-[120px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            <div className="md:w-1/2">
              <span className="inline-block py-1 px-3 border border-white/20 rounded-full text-xs font-medium tracking-wider mb-6 bg-white/5">
                LIMITED TIME OFFER
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                Build Your Dream <br />
                <span className="text-[#d4af37]">At Just ₹15,000</span>
              </h2>
              <p className="text-stone-300 text-lg mb-8 max-w-md">
                Per Sq. Yard. Pricing valid for Spot Registration. 
                Secure your plot in a DTCP approved layout today.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                   <div className="w-6 h-6 rounded-full bg-[#d4af37] flex items-center justify-center text-[#581c2f]"><CheckCircle2 size={14} strokeWidth={3} /></div>
                   <span>Clear Title & Immediate Registration</span>
                </li>
                <li className="flex items-center gap-3">
                   <div className="w-6 h-6 rounded-full bg-[#d4af37] flex items-center justify-center text-[#581c2f]"><CheckCircle2 size={14} strokeWidth={3} /></div>
                   <span>Bank Loan Assistance Available</span>
                </li>
              </ul>
            </div>

            <div className="md:w-1/2 w-full">
              {/* Location Card inside Pricing Section */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <h3 className="font-serif text-2xl mb-6 flex items-center gap-2">
                  <MapPin className="text-[#d4af37]" /> Prime Connectivity
                </h3>
                <div className="space-y-6">
                  {locations.map((loc, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-default">
                      <div className="h-[1px] w-8 bg-white/30 group-hover:bg-[#d4af37] group-hover:w-12 transition-all"></div>
                      <span className="text-stone-200 group-hover:text-white transition-colors">{loc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FORM & DEVELOPER SECTION --- */}
      <section id="contact" className="py-24 bg-stone-100">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            
            {/* Left: Contact Info */}
            <div className="md:w-1/2 bg-[#581c2f] p-12 text-white flex flex-col justify-between relative overflow-hidden">
               {/* Decor */}
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
               
               <div>
                 <h2 className="text-3xl font-serif font-bold mb-6">Contact Us</h2>
                 <p className="text-stone-300 mb-12">
                   Ready to visit? Our team is available to show you around the site and discuss the best plots for your investment goals.
                 </p>
                 
                 <div className="space-y-8 relative z-10">
                   <div>
                     <p className="text-[#d4af37] text-sm uppercase font-bold tracking-wider mb-2">Developer</p>
                     <h4 className="text-2xl font-serif">Flivv Developers</h4>
                     <p className="text-stone-400 text-sm mt-1">Excellence in Development & Marketing</p>
                   </div>
                   
                   <div>
                     <p className="text-[#d4af37] text-sm uppercase font-bold tracking-wider mb-2">Office Address</p>
                     <p className="leading-relaxed text-stone-300">
                       8-1-301, 302 & 303, West World, II Floor,<br/>
                       C Block, Front Portion, above Karachi Bakery,<br/>
                       Shaikpet, Hyderabad, Telangana 500008
                     </p>
                   </div>
                 </div>
               </div>

               <div className="mt-12 pt-8 border-t border-white/10">
                 <p className="text-sm text-stone-400">T.L.P. NO. 241/2021/H</p>
               </div>
            </div>

            {/* Right: HubSpot Form */}
            <div className="md:w-1/2 p-0 bg-white">
               {/* We wrap the form to give it padding/centering */}
               <div className="h-full flex flex-col justify-center p-8 md:p-12">
                 <HubSpotForm />
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-stone-900 text-stone-500 py-12 text-center text-sm">
        <div className="container mx-auto px-6">
          <p className="mb-4">
            <span className="text-stone-300 font-serif text-lg block mb-2">The Sadhana City</span>
            Survey No. 294/P, Veldanda, Kalwakurthy
          </p>
          <div className="h-[1px] w-12 bg-stone-700 mx-auto my-6"></div>
          <p>© 2025 Flivv Developers. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default SadhanaCity;