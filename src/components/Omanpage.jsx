"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, MapPin, ArrowRight, ShieldCheck, 
  Clock, Users, Check, Star, Building, Award, 
  Phone, Mail, ChevronRight, ArrowUpRight, Sparkles, 
  Zap, BarChart3, Landmark, Home, Briefcase, Eye, 
  Compass, FileText, DollarSign, CheckCircle, Navigation,
  Globe2, TrendingUp, Target, Layers
} from 'lucide-react';

const SafeRender = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <div className="min-h-screen bg-white" />;
  return <>{children}</>;
};

export default function MuscatConclave() {
  
  // ============================================
  // HERO SECTION - Ultra Modern with 3D Effect
  // ============================================
  const HeroSection = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      const handleScroll = () => setScrollY(window.scrollY);
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Advanced Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-rose-900" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/20 to-white/10" />
          
          {/* Animated Mesh Gradient */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x / 20}% ${mousePosition.y / 20}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
              transition: 'background 0.3s ease'
            }}
          />
        </div>

        {/* 3D Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-overlay"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                background: `radial-gradient(circle, rgba(255,255,255,${Math.random() * 0.1 + 0.05}) 0%, transparent 70%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Main Content */}
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Column - Text Content */}
              <div className="space-y-10">
                {/* Animated Badge */}
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 shadow-2xl">
                  <div className="relative">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-white rounded-full animate-ping" />
                  </div>
                  <span className="text-sm font-bold text-white tracking-[0.3em] uppercase">Exclusive Event</span>
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </div>

                {/* Main Headline with 3D Effect */}
                <div className="space-y-6">
                  <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter">
                    <span className="block text-white drop-shadow-2xl" style={{ 
                      textShadow: '0 10px 30px rgba(0,0,0,0.3), 0 0 60px rgba(255,255,255,0.1)' 
                    }}>
                      MUSCAT
                    </span>
                    <span className="block text-white/90 text-6xl sm:text-7xl lg:text-8xl mt-2">
                      PREMIUM
                    </span>
                    <span className="block bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent text-5xl sm:text-6xl lg:text-7xl mt-2">
                      SHOWCASE
                    </span>
                  </h1>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-1 w-20 bg-gradient-to-r from-white to-transparent rounded-full" />
                    <p className="text-2xl sm:text-3xl text-white/90 font-light">
                      February 2026
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xl sm:text-2xl text-white/80 font-light leading-relaxed max-w-2xl">
                  Experience Oman's most prestigious real estate investment summit. Three days of exclusive property showcases, private consultations, and strategic networking.
                </p>

                {/* Modern Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { num: "24", label: "VIP SEATS", icon: Star },
                    { num: "15+", label: "PROJECTS", icon: Building },
                    { num: "3", label: "DAYS", icon: Calendar }
                  ].map((stat, i) => (
                    <div key={i} className="group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative p-6 text-center">
                        <stat.icon className="w-6 h-6 text-white/60 mx-auto mb-3" />
                        <div className="text-4xl sm:text-5xl font-black text-white mb-2">{stat.num}</div>
                        <div className="text-xs text-white/70 tracking-[0.2em] font-bold">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-5">
                  <a href="#register" className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-white rounded-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative px-10 py-6 flex items-center justify-center gap-3">
                      <span className="text-lg font-bold text-red-700">Secure Your Seat</span>
                      <ArrowRight className="w-5 h-5 text-red-700 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </a>
                  
                  <a href="#schedule" className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-2xl" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    <div className="relative px-10 py-6 flex items-center justify-center gap-3">
                      <Calendar className="w-5 h-5 text-white" />
                      <span className="text-lg font-bold text-white">Event Details</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column - Floating Card */}
              <div className="relative lg:block hidden">
                <div 
                  className="relative"
                  style={{
                    transform: `translateY(${scrollY * 0.1}px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-white/30 via-red-300/30 to-white/30 rounded-3xl blur-3xl opacity-60" />
                  
                  {/* Main Card */}
                  <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    
                    <div className="relative p-8 space-y-6">
                      {/* Header */}
                      <div className="flex items-center gap-4 pb-6 border-b border-white/20">
                        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-xl">
                          <MapPin className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-white/60 uppercase tracking-wider font-semibold">Venue</div>
                          <div className="text-2xl font-bold text-white">Grand Hyatt Muscat</div>
                        </div>
                      </div>

                      {/* Event Details */}
                      {[
                        { icon: Calendar, label: "Dates", value: "Feb 12-15, 2026" },
                        { icon: Clock, label: "Time", value: "9:00 AM - 6:00 PM" },
                        { icon: Users, label: "Format", value: "VIP Private Sessions" },
                        { icon: Building, label: "Projects", value: "15+ Premium Properties" }
                      ].map((item, i) => (
                        <div key={i} className="group flex items-center gap-4 p-5 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300">
                          <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-white/60 font-medium">{item.label}</div>
                            <div className="text-lg font-bold text-white">{item.value}</div>
                          </div>
                        </div>
                      ))}

                      {/* CTA */}
                      <a href="#register" className="group block w-full bg-white hover:bg-red-50 rounded-2xl p-5 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-red-700">Register Now</span>
                          <ChevronRight className="w-6 h-6 text-red-700 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-20px) translateX(10px); }
          }
        `}</style>
      </section>
    );
  };

  // ============================================
  // ABOUT FLIVV SECTION
  // ============================================
  const AboutSection = () => {
    return (
      <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #DC2626 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Image Side */}
              <div className="relative order-2 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/3] bg-gradient-to-br from-red-100 to-red-50">
                    <img
                      src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7175.jpg"
                      alt="Event Success"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                  <div className="text-4xl font-black text-red-600 mb-1">500+</div>
                  <div className="text-sm text-gray-600 font-semibold">Successful Events</div>
                </div>
              </div>

              {/* Text Content */}
              <div className="order-1 lg:order-2 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-6">
                    <Star className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-bold text-red-600 uppercase tracking-wider">Our Journey</span>
                  </div>
                  
                  <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight">
                    A Heartfelt
                    <span className="block text-red-600">Thank You</span>
                  </h2>
                </div>

                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Our journey has been extraordinary. Arriving in a country where we had few connections, we were welcomed with warmth and overwhelming support. Every single day, you showed up for us — and that means everything.
                  </p>
                  <p>
                    From preparations and travel to settling in, this experience has been deeply meaningful. We're grateful to everyone who attended our November 20th event and to those who continue supporting us.
                  </p>
                  <div className="pl-6 border-l-4 border-red-600 italic text-gray-600 bg-red-50/50 p-6 rounded-r-2xl">
                    "Your encouragement strengthens our commitment to building lasting relationships and delivering exceptional value."
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  {['Trust', 'Excellence', 'Innovation', 'Partnership'].map((value, i) => (
                    <div key={i} className="px-6 py-3 bg-gray-900 text-white rounded-full font-semibold">
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // ============================================
  // COUNTDOWN SECTION
  // ============================================
  const CountdownSection = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
      const calculateTimeLeft = () => {
        const eventDate = new Date('2026-02-13T09:00:00+04:00');
        const now = new Date();
        const difference = eventDate.getTime() - now.getTime();
        
        if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      };

      setTimeLeft(calculateTimeLeft());
      const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <section className="py-32 bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-red-600/20 animate-pulse" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full mb-6 border border-white/20">
                <Zap className="w-5 h-5 text-red-400 animate-pulse" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">Limited Time</span>
              </div>
              <h2 className="text-5xl sm:text-7xl font-black text-white mb-6">
                Event Starts In
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Secure your exclusive VIP access before seats run out
              </p>
            </div>

            {/* Countdown Display */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
              {Object.entries(timeLeft).map(([key, value], i) => (
                <div key={key} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 text-center">
                    <div className="text-6xl sm:text-7xl font-black text-white mb-3 tabular-nums">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-white/70 uppercase tracking-[0.3em] font-bold">
                      {key}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <a href="#register" className="group inline-flex items-center gap-4 bg-white hover:bg-red-50 text-red-700 rounded-2xl px-12 py-6 text-xl font-black shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105">
                <span>Reserve My VIP Seat</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // ============================================
  // EVENT DETAILS SECTION
  // ============================================
  const EventDetailsSection = () => {
    return (
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-6">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-sm font-bold text-red-600 uppercase tracking-wider">Event Information</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
                Everything You Need to Know
              </h2>
            </div>

            {/* Main Content Card */}
            <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Left Side - Details */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-12">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-red-100 rounded-2xl">
                    <Building className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Location</div>
                    <div className="text-3xl font-black text-gray-900">Grand Hyatt Muscat</div>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: "Address", value: "Shatti Al Qurum, Muscat 133, Oman" },
                    { icon: Calendar, label: "Dates", value: "February 12-15, 2026" },
                    { icon: Clock, label: "Timing", value: "9:00 AM - 6:00 PM Daily" },
                    { icon: Navigation, label: "Transport", value: "Complimentary Service Available" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300">
                      <div className="p-3 bg-red-50 rounded-xl">
                        <item.icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 font-semibold mb-1">{item.label}</div>
                        <div className="text-gray-900 font-bold">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mt-10">
                  {[
                    { icon: ShieldCheck, text: "Verified Properties" },
                    { icon: Users, text: "1:1 Sessions" },
                    { icon: BarChart3, text: "Market Insights" },
                    { icon: Award, text: "Premium Service" }
                  ].map((feature, i) => (
                    <div key={i} className="p-4 bg-white rounded-xl border border-gray-100 text-center">
                      <feature.icon className="w-6 h-6 text-red-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold text-gray-900">{feature.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - CTA */}
              <div className="bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 p-12 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                <div className="relative z-10">
                  <h3 className="text-4xl font-black text-white mb-6">
                    Ready to Transform Your Investment Portfolio?
                  </h3>
                  <p className="text-xl text-white/70 mb-10">
                    Join Oman's most exclusive real estate forum. Limited VIP seats available for serious investors.
                  </p>

                  <a href="#register" className="group inline-flex items-center gap-3 bg-white hover:bg-red-50 text-red-700 rounded-2xl px-8 py-5 text-lg font-bold shadow-2xl hover:shadow-red-500/50 transition-all duration-300 mb-10">
                    <span>Secure Your Spot</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </a>

                  <div className="space-y-4">
                    {[
                      'Priority 1:1 session booking',
                      'Exclusive pre-launch pricing',
                      'Complete legal guidance',
                      'Personal concierge service'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                        <span className="text-white/90 text-lg">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // ============================================
  // HIGHLIGHTS SECTION
  // ============================================
  const HighlightsSection = () => {
    const highlights = [
      { icon: Target, title: "Strategic Focus", desc: "Targeted opportunities in high-growth corridors", color: "from-red-500 to-red-600" },
      { icon: BarChart3, title: "Market Intelligence", desc: "Exclusive data from industry leaders", color: "from-red-600 to-rose-600" },
      { icon: Landmark, title: "Legal Assurance", desc: "Complete guidance for investments", color: "from-rose-600 to-red-500" },
      { icon: Home, title: "Premium Portfolio", desc: "Curated high-potential properties", color: "from-red-500 to-red-700" },
      { icon: Briefcase, title: "Elite Networking", desc: "Connect with industry leaders", color: "from-red-700 to-rose-600" },
      { icon: Globe2, title: "Global Standards", desc: "International best practices", color: "from-rose-600 to-red-500" }
    ];

    return (
      <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-red-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-6">
                <Star className="w-4 h-4 text-red-600" />
                <span className="text-sm font-bold text-red-600 uppercase tracking-wider">Exclusive Benefits</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
                Why This <span className="text-red-600">Event Matters</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Unparalleled benefits designed for discerning investors
              </p>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlights.map((item, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl" style={{ background: `linear-gradient(to bottom right, ${item.color})` }} />
                  
                  <div className="relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-red-200 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // ============================================
  // SCHEDULE SECTION
  // ============================================
  const ScheduleSection = () => {
    const scheduleData = [
      {
        date: "12 February 2026",
        day: "Wednesday",
        title: "Private Consultation Day",
        desc: "Exclusive one-on-one investment advisory sessions with our expert team",
        time: "10:00 AM - 6:00 PM",
        icon: Users,
        gradient: "from-red-500 to-red-600"
      },
      {
        date: "14 February 2026",
        day: "Friday",
        title: "Grand Showcase Event",
        desc: "Premium property unveiling and comprehensive market presentations",
        time: "9:00 AM - 5:00 PM",
        icon: Building,
        gradient: "from-red-600 to-rose-600"
      },
      {
        date: "15 February 2026",
        day: "Saturday",
        title: "Investment Finalization",
        desc: "Closing consultations, documentation, and exclusive site visits",
        time: "10:00 AM - 4:00 PM",
        icon: CheckCircle,
        gradient: "from-rose-600 to-red-500"
      }
    ];

    return (
      <section id="schedule" className="py-32 bg-gradient-to-br from-gray-900 via-gray-900 to-red-950 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full mb-6 border border-white/20">
                <Calendar className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">Event Timeline</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-6">
                Three Days of Excellence
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Meticulously planned schedule for maximum value and strategic networking
              </p>
            </div>

            {/* Timeline */}
            <div className="grid lg:grid-cols-3 gap-8">
              {scheduleData.map((event, i) => (
                <div key={i} className="group relative">
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-br ${event.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  
                  {/* Card */}
                  <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 h-full">
                    {/* Icon */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${event.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <event.icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Date */}
                    <div className="mb-6">
                      <div className="text-sm text-white/50 uppercase tracking-wider font-semibold mb-1">{event.day}</div>
                      <div className="text-3xl font-black text-white">{event.date}</div>
                    </div>

                    {/* Title Badge */}
                    <div className={`inline-block px-4 py-2 bg-gradient-to-r ${event.gradient} rounded-full mb-4`}>
                      <span className="text-sm font-bold text-white">{event.title}</span>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 text-lg mb-6 leading-relaxed">{event.desc}</p>

                    {/* Time */}
                    <div className="flex items-center gap-3 text-white/60 mb-8">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">{event.time}</span>
                    </div>

                    {/* CTA */}
                    <a href="#register" className="group/btn block w-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white rounded-2xl px-6 py-4 font-bold text-center transition-all duration-300">
                      <span className="flex items-center justify-center gap-2">
                        Register for This Day
                        <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // ============================================
  // REGISTRATION SECTION
  // ============================================
  const RegistrationSection = () => {
    const formLoadedRef = useRef(false);
    
    useEffect(() => {
      if (formLoadedRef.current) return;
      
      const container = document.getElementById('hubspot-form-container');
      if (!container) return;
      
      container.innerHTML = '';
      
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/v2.js';
      
      script.onload = () => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            portalId: '21626983',
            formId: '417fd073-67f4-4e82-90f6-20d056f919fa',
            target: '#hubspot-form-container'
          });
        }
      };
      
      document.body.appendChild(script);
      formLoadedRef.current = true;
      
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }, []);

    return (
      <section id="register" className="py-32 bg-gradient-to-br from-white via-red-50/30 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-6">
                <FileText className="w-4 h-4 text-red-600" />
                <span className="text-sm font-bold text-red-600 uppercase tracking-wider">Reserve Now</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
                Secure Your <span className="text-red-600">VIP Access</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Limited seats available for this exclusive investment forum
              </p>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              
              {/* Form */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl blur-2xl opacity-10" />
                
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 p-10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                        backgroundSize: '30px 30px'
                      }} />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2 relative z-10">Event Registration</h3>
                    <p className="text-white/90 text-lg relative z-10">Complete your details to reserve your seat</p>
                  </div>
                  
                  <div className="p-10 min-h-[500px]">
                    <div id="hubspot-form-container">
                      <div className="text-center py-16">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mb-6"></div>
                        <p className="text-gray-500 text-lg">Loading registration form...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 rounded-3xl p-10 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                      backgroundSize: '40px 40px'
                    }} />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-8">What's Included</h3>
                    
                    <div className="space-y-6">
                      {[
                        { icon: Users, text: "Exclusive 1:1 consultation with investment experts" },
                        { icon: Home, text: "Pre-launch access to premium properties" },
                        { icon: FileText, text: "Comprehensive investment documentation guide" },
                        { icon: Star, text: "VIP networking lounge with refreshments" },
                        { icon: Landmark, text: "Complete legal & financial advisory support" },
                        { icon: Navigation, text: "Priority booking for property site visits" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 group">
                          <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
                            <item.icon className="w-6 h-6 text-red-400" />
                          </div>
                          <span className="text-lg text-white/90 pt-2">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { num: "500+", label: "Events" },
                    { num: "10K+", label: "Investors" },
                    { num: "98%", label: "Satisfaction" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-lg">
                      <div className="text-3xl font-black text-red-600 mb-1">{stat.num}</div>
                      <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <SafeRender>
      <div className="min-h-screen bg-white overflow-hidden">
        <HeroSection />
        <AboutSection />
        <CountdownSection />
        <EventDetailsSection />
        <HighlightsSection />
        <ScheduleSection />
        <RegistrationSection />
      </div>
    </SafeRender>
  );
}