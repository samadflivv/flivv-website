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
import Footer from './Footer';

// --- THEME ---
const COLORS = {
  red: "#CE1126",
  green: "#007A3D",
  gold: "#D9B44A",
  dark: "#0B1220",
  light: "#FFFFFF",
  gradientStart: "#CE1126",
  gradientEnd: "#007A3D"
};

const glassStyle = "bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl";

// --- Safe Render Wrapper ---
const SafeRender = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <div className="min-h-screen bg-white" />;
  return <>{children}</>;
};


// ============================================
// MAIN PAGE COMPOSITION
// ============================================
export default function MuscatConclave() {
  // ============================================
  // HERO SECTION
  // ============================================
  const HeroSection = () => {
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
      <section className="relative min-h-screen py-35 w-full overflow-hidden flex items-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
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
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220]/90 via-[#0B1220]/70 to-[#007A3D]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent" />
          
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#CE1126]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#007A3D]/20 rounded-full blur-3xl animate-pulse delay-1000" />
          
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
        <div className="container relative z-10 mx-auto">
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
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                {[
                  { value: "24", label: "VIP SEATS", color: "text-[#D9B44A]" },
                  { value: "3", label: "DAYS", color: "text-white" },
                  { value: "1:1", label: "CONSULTATIONS", color: "text-[#CE1126]" },
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
                      { icon: Calendar, label: "Dates", value: "February 12-15, 2026", color: "#CE1126" },
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
      </section>
    );
  };

  // ============================================
  // COUNTDOWN SECTION
  // ============================================
  const CountdownSection = () => {
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    });

    useEffect(() => {
      const calculateTimeLeft = () => {
        const eventDate = new Date('2026-02-13T09:00:00+04:00'); // February 13, 2026
        const now = new Date();
        const difference = eventDate.getTime() - now.getTime();
        
        if (difference <= 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        return { days, hours, minutes, seconds };
      };

      // Set initial time
      setTimeLeft(calculateTimeLeft());
      
      // Update every second
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    return (
      <section className="relative py-24 overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background with Gradient Mesh */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220] via-[#0B1220] to-[#1a1f2e]" />
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #CE1126 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, #007A3D 0%, transparent 50%)`,
          }} />
        </div>

        <div className="container relative z-10 mx-auto">
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
                    {key.toUpperCase()}
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

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <a
                href="#register"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#CE1126] via-[#D9B44A] to-[#007A3D] text-white rounded-full px-8 py-5 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 gap-3"
              >
                <span>Secure My VIP Seat</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  // ============================================
  // SCHEDULE SECTION (3 CARDS)
  // ============================================
  const ScheduleSection = () => {
    const scheduleCards = [
      {
        date: "12 February 2026",
        day: "Wednesday",
        venue: "Grand Hyatt Muscat",
        timing: "10:00 AM - 6:00 PM",
        eventType: "1:1 Sales Session",
        description: "Private consultations with investment experts",
        color: "#CE1126"
      },
      {
        date: "14 February 2026",
        day: "Friday",
        venue: "Grand Hyatt Muscat",
        timing: "9:00 AM - 5:00 PM",
        eventType: "Main Event",
        description: "Exclusive real estate investment forum",
        color: "#007A3D"
      },
      {
        date: "15 February 2026",
        day: "Saturday",
        venue: "Grand Hyatt Muscat",
        timing: "10:00 AM - 4:00 PM",
        eventType: "1:1 Sales Session",
        description: "Follow-up private consultations",
        color: "#D9B44A"
      }
    ];

    return (
      <section className="py-24 bg-[#0B1220] relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220] via-[#1a1f2e] to-[#0B1220]" />
        </div>

        <div className="container relative z-10 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#CE1126]/20 to-[#007A3D]/20 rounded-full mb-6">
              <Calendar className="w-4 h-4 text-[#D9B44A]" />
              <span className="text-sm font-semibold text-white tracking-widest">EVENT SCHEDULE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Three Days of <span className="text-[#D9B44A]">Exclusive Access</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Carefully curated experience for maximum value and strategic networking
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {scheduleCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className={`${glassStyle} rounded-2xl p-6 h-full flex flex-col`}>
                  {/* Date Badge */}
                  <div className="mb-6">
                    <div className="text-sm text-white/60 uppercase tracking-widest mb-1">{card.day}</div>
                    <div className="text-2xl font-bold text-white">{card.date}</div>
                  </div>

                  {/* Event Type */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3" 
                         style={{ backgroundColor: `${card.color}20` }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: card.color }} />
                      <span className="text-sm font-semibold" style={{ color: card.color }}>
                        {card.eventType}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm">{card.description}</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-4 mb-6 flex-grow">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-white/40 mt-0.5" />
                      <div>
                        <div className="text-sm text-white/60">Venue</div>
                        <div className="text-white">{card.venue}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-white/40 mt-0.5" />
                      <div>
                        <div className="text-sm text-white/60">Timing</div>
                        <div className="text-white">{card.timing}</div>
                      </div>
                    </div>
                  </div>

                  {/* Register Button */}
                  <a
                    href="#register"
                    className="group w-full bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 text-white rounded-xl px-6 py-3 font-semibold flex items-center justify-center gap-3 transition-all duration-300 mt-auto"
                  >
                    <span>Register for {card.eventType}</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

// ============================================
// HUBSPOT FORM SECTION (MANUAL IFRAME EMBED)
// ============================================
const HubSpotFormSection = () => {
  return (
    <section id="register" className="py-24 bg-gradient-to-br from-gray-50 to-white px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#CE1126]/10 to-[#007A3D]/10 rounded-full mb-6">
              <FileText className="w-4 h-4 text-[#D9B44A]" />
              <span className="text-sm font-semibold text-[#0B1220] tracking-widest">REGISTER NOW</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0B1220] mb-6">
              Secure Your <span className="text-[#CE1126]">VIP Access</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Limited seats available. Register now to reserve your spot at Oman's most exclusive real estate event.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form Container */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#CE1126] to-[#007A3D] p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Event Registration</h3>
                  <p className="text-white/80">Complete the form to secure your invitation</p>
                </div>
                
                <div className="p-0">
                  {/* DIRECT IFRAME EMBED - THIS WILL WORK */}
                  <iframe
                    src="https://share.hsforms.com/21626983/417fd073-67f4-4e82-90f6-20d056f919fa"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    title="Event Registration Form"
                    style={{ 
                      border: 'none',
                      borderRadius: '0 0 1.5rem 1.5rem'
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Benefits Sidebar - same as before */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-[#0B1220] to-gray-900 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Registration Benefits</h3>
                
                <div className="space-y-4 mb-8">
                  {[
                    "Exclusive 1:1 Meeting with Industry Leaders",
                    "Pre-launch Property Access",
                    "Comprehensive Investment Guide",
                    "VIP Networking Lounge Access",
                    "Legal & Financial Consultation",
                    "Priority Site Visit Booking"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#CE1126] to-[#007A3D] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

  // ============================================
  // RENDER ALL SECTIONS
  // ============================================
  return (
    <SafeRender>
      <div className="min-h-screen bg-white overflow-hidden">
        <HeroSection />
        {/* About Flivv Section */}
        <section className="py-24 bg-[#F9FAFB] relative overflow-hidden px-4 sm:px-6 lg:px-8">
          {/* Subtle patterned background */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 transform origin-top-right opacity-50"></div>
          
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
               
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <div className="mb-6 flex justify-start">
                  <span className="w-16 h-1 bg-[#8A1538]"></span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">
                  A Heartfelt <span className="text-[#8A1538]">Thank You</span>
                </h2>
                
                <div className="space-y-8 text-lg md:text-xl text-gray-600 leading-relaxed font-light text-justify">
                  <p>
                    Our journey here has been nothing short of extraordinary. Arriving in a country where we initially had only a few acquaintances, we were unsure of what to expect. Yet Qatar welcomed us with warmth, consistency, and overwhelming support. Every single day we hosted, you showed up for us — and that has meant the world.
                  </p>
                  <p>
                    From the preparations and travel to arriving and settling in, this entire experience has been deeply meaningful. We are truly grateful to everyone who attended the main event on <strong className='font-bold'>20th November,</strong> to those who continue to support us, and to all who are becoming part of this growing family.
                  </p>
                  <p className="italic text-gray-500 text-base border-l-4 border-[#8A1538] pl-6 py-2 bg-gray-50 rounded-r-lg">
                    "Your encouragement strengthens our commitment to building long-lasting relationships and delivering even more value through our work."
                  </p>
                </div>
              </motion.div>
  
              {/* Image Content */}
              <motion.div 
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true, amount: 0.2 }}
                  className="order-1 lg:order-2 w-full"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] group">
                  <img
                    src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7175.jpg" 
                    alt="Highlights from our Saudi Arabia Event Success"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('bg-gray-400', 'flex', 'items-center', 'justify-center'); }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
              </motion.div>
  
            </div>
          </div>
        </section>

        <CountdownSection />
        
        {/* Event Details Section */}
        <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
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
                          { icon: Calendar, text: "February 12-15, 2026" },
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
                        {[
                          { icon: Building, label: "5-Star Venue", desc: "Grand Hyatt Muscat" },
                          { icon: ShieldCheck, label: "Secure Access", desc: "Invitation Only" },
                          { icon: Users, label: "Private Sessions", desc: "1:1 Consultations" },
                          { icon: BarChart3, label: "Market Insights", desc: "Exclusive Data" },
                        ].map((feature, index) => (
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

        {/* Event Highlights Section */}
        <section id="highlights" className="py-24 bg-gray-50 relative overflow-hidden px-4 sm:px-6 lg:px-8">
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

          <div className="container relative z-10 mx-auto">
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
              {[
                {
                  icon: TargetIcon,
                  title: "Strategic Focus",
                  description: "Targeted investment opportunities in high-growth corridors",
                  gradient: "from-[#CE1126]/20 to-[#CE1126]/5"
                
                },
                {
                  icon: PieChart,
                  title: "Market Intelligence",
                  description: "Exclusive data and analysis from industry leaders",
                  gradient: "from-[#007A3D]/20 to-[#007A3D]/5"
                  
                },
                {
                  icon: Landmark,
                  title: "Legal Assurance",
                  description: "Comprehensive guidance for NRI investments",
                  gradient: "from-[#D9B44A]/20 to-[#D9B44A]/5"
                  
                },
                {
                  icon: Home,
                  title: "Premium Portfolio",
                  description: "Curated selection of high-potential properties",
                  gradient: "from-[#CE1126]/20 to-[#CE1126]/5"
                  
                },
                {
                  icon: Briefcase,
                  title: "Private Networking",
                  description: "Connect with industry leaders and investors",
                  gradient: "from-[#007A3D]/20 to-[#007A3D]/5"
                  
                },
                {
                  icon: Globe2,
                  title: "Global Standards",
                  description: "International best practices and compliance",
                  gradient: "from-[#D9B44A]/20 to-[#D9B44A]/5"
                  
                },
              ].map((highlight, index) => (
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ScheduleSection />
        <HubSpotFormSection />
      </div>
    </SafeRender>
  );
}