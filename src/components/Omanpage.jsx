"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, ArrowRight, ShieldCheck, 
  TrendingUp, Clock, Users, Check, 
  Star, Building, Target, Award, Globe,
  Phone, Mail, ChevronRight, ArrowUpRight,
  Sparkles, Zap, Target as TargetIcon, BarChart3,
  Grid3x3, Layers, Landmark, Home, Briefcase,
  Navigation, Eye, Globe2, Compass, Map,
  FileText, PieChart, DollarSign, TrendingUp as ChartUp,
  CheckCircle, LucideIcon
} from 'lucide-react';
import OmnRegistrationform from './OmnRegistrationform';

// --- THEME ---
const COLORS = {
  red: "#CE1126",    // Oman Red
  green: "#007A3D",  // Oman Green
  gold: "#D9B44A",   // Gold accent
  dark: "#0B1220",   // Dark text
  light: "#FFFFFF",   // White
  gradientStart: "#CE1126",
  gradientEnd: "#007A3D"
};

// --- SUPER SAFE WRAPPER ---
const SafeRender = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <div className="min-h-screen bg-white" />;
  return <>{children}</>;
};

// --- GLASS MORPHISM STYLE ---
const glassStyle = "bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl";

// --- 1. CINEMATIC HERO WITH IMAGE BACKGROUND ---
const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=2070)',
            transform: `translateY(${scrollProgress * 30}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220]/90 via-[#0B1220]/70 to-[#007A3D]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#CE1126]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#007A3D]/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, transparent 95%, #CE1126 100%),
                             linear-gradient(0deg, transparent 95%, #007A3D 100%)`,
            backgroundSize: '50px 50px',
          }} />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#D9B44A] rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + i * 7}%`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {/* Animated Tag */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-[#D9B44A]" />
                <span className="text-sm font-semibold text-white tracking-widest">EXCLUSIVE ACCESS</span>
                <div className="w-2 h-2 bg-[#D9B44A] rounded-full animate-pulse" />
              </div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-[0.9] tracking-tight"
              >
                <span className="bg-gradient-to-r from-white via-white to-[#D9B44A] bg-clip-text text-transparent">
                  MUSCAT
                </span>
                <br />
                <span className="text-4xl sm:text-6xl md:text-7xl text-[#D9B44A]">
                  SALES SESSIONS
                </span>
                <br />
                <span className="text-3xl sm:text-5xl text-white/60">
                  2026
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-white/70 font-light max-w-xl leading-relaxed"
              >
                Join Oman's most exclusive real estate investment forum. 
                Premium opportunities, private consultations, and strategic insights.
              </motion.p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { value: "24", label: "VIP SEATS", color: "text-[#D9B44A]" },
                { value: "2", label: "DAYS", color: "text-white" },
                { value: "1:1", label: "CONSULTATIONS", color: "text-[#CE1126]" },
                { value: "20%", label: "EARLY BIRD", color: "text-[#007A3D]" },
              ].map((stat, index) => (
                <div key={index} className={`text-center p-4 ${glassStyle} rounded-2xl`}>
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-xs text-white/60 tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#register"
                className="group relative overflow-hidden bg-gradient-to-r from-[#CE1126] to-[#007A3D] text-white rounded-full px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <span className="relative z-10">Secure Your Invitation</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#D9B44A] to-[#CE1126] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              <a
                href="#highlights"
                className="group relative overflow-hidden bg-transparent border-2 border-white/30 text-white rounded-full px-8 py-4 text-lg font-semibold hover:border-white/60 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>View Highlights</span>
                <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Column - Event Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative"
          >
            {/* Floating Card */}
            <div className={`relative ${glassStyle} rounded-3xl p-8 backdrop-blur-xl`}>
              {/* Decorative Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#CE1126] via-[#D9B44A] to-[#007A3D] rounded-3xl opacity-50 blur" />
              <div className="absolute inset-0 bg-[#0B1220] rounded-[calc(1.5rem-2px)]" />
              
              {/* Card Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#CE1126]/20 to-[#CE1126]/10">
                    <Calendar className="w-6 h-6 text-[#CE1126]" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 uppercase tracking-widest">Event Details</div>
                    <div className="text-2xl font-bold text-white">Grand Hyatt Muscat</div>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: "Venue", value: "Grand Hyatt Muscat", color: "#007A3D" },
                    { icon: Calendar, label: "Dates", value: "November 15-16, 2026", color: "#CE1126" },
                    { icon: Clock, label: "Time", value: "9:00 AM - 6:00 PM", color: "#D9B44A" },
                    { icon: Users, label: "Format", value: "Private VIP Sessions", color: "#007A3D" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${item.color}20` }}>
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white/60">{item.label}</div>
                        <div className="font-semibold text-white">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Action */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <a
                    href="#register"
                    className="group w-full bg-gradient-to-r from-[#0B1220] to-[#1a1f2e] hover:from-[#CE1126] hover:to-[#007A3D] text-white rounded-xl px-6 py-4 font-semibold flex items-center justify-center gap-3 transition-all duration-300"
                  >
                    <span>Register Now</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#CE1126]/20 to-[#D9B44A]/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#007A3D]/20 to-[#D9B44A]/20 rounded-full blur-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <div className="text-white/50 text-sm mb-2 tracking-widest">SCROLL</div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// --- 2. MODERN COUNTDOWN SECTION ---
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 12, minutes: 30, seconds: 0 });

  useEffect(() => {
    const eventDate = new Date('2026-11-15T09:00:00+04:00');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = eventDate - now;
      
      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with Gradient Mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220] via-[#0B1220] to-[#1a1f2e]" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #CE1126 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, #007A3D 0%, transparent 50%)`,
        }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#CE1126]/20 to-[#007A3D]/20 rounded-full mb-6">
              <Zap className="w-4 h-4 text-[#D9B44A]" />
              <span className="text-sm font-semibold text-white tracking-widest">LIMITED TIME OFFER</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Early Registration <span className="text-[#D9B44A]">Ends In</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Secure exclusive benefits and pre-launch pricing before time runs out
            </p>
          </motion.div>

          {/* Countdown Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {Object.entries(timeLeft).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${glassStyle} rounded-2xl p-6 text-center`}
              >
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2 font-mono">
                  {value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-white/60 uppercase tracking-widest">
                  {key}
                </div>
                {/* Animated Bar */}
                <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#CE1126] to-[#007A3D]"
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA with Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className={`${glassStyle} rounded-2xl p-6 mb-6`}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-white">
                  <div className="text-sm text-white/60">VIP Seats Available</div>
                  <div className="text-2xl font-bold">24 / 48</div>
                </div>
                <div className="text-[#D9B44A] font-semibold">50% FILLED</div>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#CE1126] via-[#D9B44A] to-[#007A3D]"
                  initial={{ width: '0%' }}
                  whileInView={{ width: '50%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </div>
            </div>

            <a
              href="#register"
              className="group relative overflow-hidden w-full bg-gradient-to-r from-[#CE1126] via-[#D9B44A] to-[#007A3D] text-white rounded-full px-8 py-5 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span>Secure My VIP Seat</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- 3. EVENT DETAILS CARD ---
const EventDetails = () => {
  const features = [
    { icon: Building, label: "5-Star Venue", desc: "Grand Hyatt Muscat" },
    { icon: ShieldCheck, label: "Secure Access", desc: "Invitation Only" },
    { icon: Users, label: "Private Sessions", desc: "1:1 Consultations" },
    { icon: BarChart3, label: "Market Insights", desc: "Exclusive Data" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0B1220] mb-6">
              Event <span className="text-[#CE1126]">Essentials</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for an unparalleled investment experience
            </p>
          </motion.div>

          {/* Main Card */}
          <div className="relative">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(90deg, #CE1126 1px, transparent 1px),
                                 linear-gradient(0deg, #007A3D 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }} />
            </div>

            {/* Floating Card */}
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* Left Panel - Info */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#CE1126]/10 to-[#CE1126]/5">
                      <Map className="w-8 h-8 text-[#CE1126]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 uppercase tracking-widest">Location & Details</div>
                      <div className="text-2xl font-bold text-[#0B1220]">Grand Hyatt Muscat</div>
                    </div>
                  </div>

                  <div className="space-y-6 mb-8">
                    {[
                      { icon: MapPin, text: "Shatti Al Qurum, Muscat 133, Oman" },
                      { icon: Calendar, text: "November 15-16, 2026" },
                      { icon: Clock, text: "9:00 AM - 6:00 PM Daily" },
                      { icon: Navigation, text: "Private Transportation Available" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-gray-100">
                          <item.icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="text-gray-700">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                        <feature.icon className="w-6 h-6 text-[#CE1126] mb-2" />
                        <div className="font-semibold text-[#0B1220]">{feature.label}</div>
                        <div className="text-sm text-gray-500">{feature.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Panel - CTA & Visual */}
                <div className="bg-gradient-to-br from-[#0B1220] to-gray-900 p-8 lg:p-12 relative overflow-hidden">
                  {/* Floating Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#CE1126]/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#007A3D]/10 rounded-full blur-3xl" />
                  
                  <div className="relative z-10 h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Ready to Transform Your Portfolio?
                    </h3>
                    <p className="text-white/70 mb-8">
                      Join Oman's most exclusive real estate investment forum. 
                      Limited VIP seats available.
                    </p>

                    <a
                      href="#register"
                      className="group w-full bg-gradient-to-r from-[#CE1126] to-[#007A3D] hover:from-[#D9B44A] hover:to-[#CE1126] text-white rounded-xl px-6 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 mb-8"
                    >
                      <span>Register Now</span>
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>

                    <div className="space-y-4">
                      {[
                        "Priority 1:1 session booking",
                        "Exclusive pre-launch pricing",
                        "Comprehensive legal guidance",
                        "Personal concierge service",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-white/80">
                          <CheckCircle className="w-5 h-5 text-[#D9B44A] mr-3" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 4. EVENT HIGHLIGHTS - MODERN GRID ---
const EventHighlights = () => {
  const highlights = [
    {
      icon: TargetIcon,
      title: "Strategic Focus",
      description: "Targeted investment opportunities in high-growth corridors",
      gradient: "from-[#CE1126]/20 to-[#CE1126]/5",
      stats: "18% ROI"
    },
    {
      icon: PieChart,
      title: "Market Intelligence",
      description: "Exclusive data and analysis from industry leaders",
      gradient: "from-[#007A3D]/20 to-[#007A3D]/5",
      stats: "100+ Reports"
    },
    {
      icon: Landmark,
      title: "Legal Assurance",
      description: "Comprehensive guidance for NRI investments",
      gradient: "from-[#D9B44A]/20 to-[#D9B44A]/5",
      stats: "AAA Grade"
    },
    {
      icon: Home,
      title: "Premium Portfolio",
      description: "Curated selection of high-potential properties",
      gradient: "from-[#CE1126]/20 to-[#CE1126]/5",
      stats: "$500M+"
    },
    {
      icon: Briefcase,
      title: "Private Networking",
      description: "Connect with industry leaders and investors",
      gradient: "from-[#007A3D]/20 to-[#007A3D]/5",
      stats: "200+ Investors"
    },
    {
      icon: Globe2,
      title: "Global Standards",
      description: "International best practices and compliance",
      gradient: "from-[#D9B44A]/20 to-[#D9B44A]/5",
      stats: "10+ Countries"
    },
  ];

  return (
    <section id="highlights" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 70% 30%, #CE1126 0%, transparent 40%),
                             radial-gradient(circle at 30% 70%, #007A3D 0%, transparent 40%)`,
          }} />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#CE1126]/10 to-[#007A3D]/10 rounded-full mb-6">
            <Star className="w-4 h-4 text-[#D9B44A]" />
            <span className="text-sm font-semibold text-[#0B1220] tracking-widest">EXCLUSIVE FEATURES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0B1220] mb-6">
            Why <span className="text-[#CE1126]">Choose</span> This Event
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience benefits designed exclusively for discerning investors
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                {/* Gradient Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#CE1126] via-[#D9B44A] to-[#007A3D] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${highlight.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <highlight.icon className="w-7 h-7 text-[#0B1220]" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0B1220] mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {highlight.description}
                </p>

                {/* Stats */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500 uppercase tracking-widest">Performance</div>
                  <div className="text-2xl font-bold text-[#CE1126]">{highlight.stats}</div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-[#007A3D]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#register"
            className="inline-flex items-center justify-center bg-[#0B1220] hover:bg-[#0B1220]/90 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>Experience All Benefits</span>
            <ArrowRight className="ml-3 w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// --- 5. MODERN AGENDA ---
const Agenda = () => {
  const days = [
    {
      title: "Day 1 - Strategic Insights",
      date: "November 15, 2026",
      sessions: [
        { time: "09:00", title: "Registration & Welcome", desc: "Networking breakfast" },
        { time: "10:00", title: "Keynote: Market Outlook", desc: "Industry trends 2026-2030" },
        { time: "11:30", title: "Legal Framework", desc: "NRI investment regulations" },
        { time: "14:00", title: "Project Deep Dive", desc: "Exclusive developments" },
      ],
      color: "#CE1126"
    },
    {
      title: "Day 2 - Private Consultations",
      date: "November 16, 2026",
      sessions: [
        { time: "09:00-13:00", title: "1:1 Sessions", desc: "Private portfolio reviews" },
        { time: "14:00", title: "Site Visits", desc: "Optional development tours" },
        { time: "16:00", title: "Networking", desc: "Exclusive investor lounge" },
      ],
      color: "#007A3D"
    },
  ];

  return (
    <section className="py-24 bg-[#0B1220] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220] via-[#1a1f2e] to-[#0B1220]" />
        {/* Moving Lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-[#D9B44A] to-transparent"
              animate={{ x: [-100, 2000] }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                delay: i * 0.5
              }}
              style={{
                top: `${10 + i * 10}%`,
                width: '100%',
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#CE1126]/20 to-[#007A3D]/20 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-[#D9B44A]" />
            <span className="text-sm font-semibold text-white tracking-widest">THE SCHEDULE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Two Days of <span className="text-[#D9B44A]">Value Creation</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Carefully curated sessions for maximum impact and strategic insights
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {days.map((day, dayIndex) => (
            <motion.div
              key={dayIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: dayIndex * 0.2 }}
              className={`${glassStyle} rounded-3xl p-8`}
            >
              {/* Day Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${day.color}20` }}>
                  <Calendar className="w-6 h-6" style={{ color: day.color }} />
                </div>
                <div>
                  <div className="text-sm text-white/60 uppercase tracking-widest">DAY {dayIndex + 1}</div>
                  <h3 className="text-2xl font-bold text-white">{day.title}</h3>
                  <div className="text-white/40">{day.date}</div>
                </div>
              </div>

              {/* Sessions */}
              <div className="space-y-4">
                {day.sessions.map((session, sessionIndex) => (
                  <motion.div
                    key={sessionIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sessionIndex * 0.1 }}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-sm font-semibold text-white min-w-20" style={{ color: day.color }}>
                      {session.time}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{session.title}</h4>
                      <p className="text-sm text-white/60">{session.desc}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                  </motion.div>
                ))}
              </div>

              {/* Day Footer */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <a
                  href="#register"
                  className="w-full bg-gradient-to-r from-white/10 to-transparent hover:from-white/20 text-white rounded-xl px-6 py-3 font-semibold flex items-center justify-center gap-3 transition-all duration-300"
                >
                  <span>Book Day {dayIndex + 1} Sessions</span>
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 6. ABOUT FLIVV - MODERN ---
const AboutFlivv = () => {
  const achievements = [
    { value: "10+", label: "Years Excellence", icon: Award },
    { value: "2K+", label: "Units Delivered", icon: Home },
    { value: "$500M+", label: "Portfolio Value", icon: DollarSign },
    { value: "98%", label: "Client Satisfaction", icon: ChartUp },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="absolute inset-0 bg-gradient-to-l from-[#CE1126] to-[#007A3D]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden">
              {/* Floating Stats */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#CE1126]/20 to-[#D9B44A]/20 rounded-full blur-2xl" />
              
              <div className="relative z-10 p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#CE1126] to-[#007A3D] flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">F</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-[#0B1220]">Flivv</h2>
                    <div className="text-gray-500">Premium Real Estate</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  With over a decade of excellence in Oman's real estate sector, 
                  Flivv has established itself as the premier platform for discerning 
                  investors seeking substantial returns in premium property developments.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-gray-100">
                          <achievement.icon className="w-4 h-4 text-[#CE1126]" />
                        </div>
                        <div className="text-2xl font-bold text-[#0B1220]">{achievement.value}</div>
                      </div>
                      <div className="text-sm text-gray-500">{achievement.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Element */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10"
            >
              <div className="w-full h-full border-2 border-[#CE1126] rounded-full" />
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#CE1126]/10 to-[#007A3D]/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#D9B44A]" />
                <span className="text-sm font-semibold text-[#0B1220] tracking-widest">OUR DIFFERENCE</span>
              </div>
              <h2 className="text-4xl font-bold text-[#0B1220] mb-6">
                Redefining <span className="text-[#CE1126]">Real Estate</span> Investment
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#CE1126] to-[#007A3D] mb-8" />
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: TargetIcon,
                  title: "Strategic Selection",
                  description: "Curated portfolio of high-potential developments in growth corridors",
                  color: "#CE1126"
                },
                {
                  icon: ShieldCheck,
                  title: "Legal Excellence",
                  description: "100% compliant with FEMA regulations for NRI land ownership",
                  color: "#007A3D"
                },
                {
                  icon: TrendingUp,
                  title: "Performance Focus",
                  description: "Consistently delivering superior returns through strategic planning",
                  color: "#D9B44A"
                },
                {
                  icon: Globe2,
                  title: "Global Standards",
                  description: "International best practices and comprehensive support",
                  color: "#CE1126"
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${item.color}10` }}>
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-[#0B1220] mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-8 border-t border-gray-100">
              <a
                href="#register"
                className="inline-flex items-center gap-3 text-[#CE1126] font-semibold hover:text-[#007A3D] transition-colors"
              >
                <span>Experience the Flivv Difference</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



// --- MAIN PAGE COMPOSITION ---
export default function MuscatConclave() {
  return (
    <SafeRender>
      <div className="min-h-screen bg-white overflow-hidden">
        <Hero />
        <AboutFlivv />
        <Countdown />
        <EventDetails />
        <EventHighlights />
        <Agenda />
        <OmnRegistrationform/>
      </div>
    </SafeRender>
  );
}