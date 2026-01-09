// 'use client';
// import { motion, useReducedMotion, AnimatePresence, useInView } from "framer-motion";
// import { useState, useEffect, useRef } from "react";
// import muscatHero from "@/assets/muscat-hero.jpg";

// const easeOut = [0.22, 1, 0.36, 1];

// // ============= ANIMATED COUNTER =============
// const AnimatedCounter = ({ target, suffix, isInView }) => {
//   const [count, setCount] = useState(0);
//   const shouldReduceMotion = useReducedMotion();

//   useEffect(() => {
//     if (!isInView) return;
//     if (shouldReduceMotion) {
//       setCount(target);
//       return;
//     }

//     let start = 0;
//     const duration = 2000;
//     const increment = target / (duration / 16);

//     const timer = setInterval(() => {
//       start += increment;
//       if (start >= target) {
//         setCount(target);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, 16);

//     return () => clearInterval(timer);
//   }, [isInView, target, shouldReduceMotion]);

//   return (
//     <span>
//       {count}
//       {suffix}
//     </span>
//   );
// };

// // ============= HERO SECTION =============
// const HeroSection = () => {
//   const shouldReduceMotion = useReducedMotion();

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: shouldReduceMotion ? 0 : 0.15,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: easeOut },
//     },
//   };

//   return (
//     <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
//       <div className="absolute inset-0 z-0">
//         <motion.img
//           src={muscatHero}
//           alt="Scenic view of Muscat, Oman at golden hour with mountains and traditional architecture"
//           className="w-full h-full object-cover"
//           initial={{ scale: shouldReduceMotion ? 1 : 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//         />
//         <div
//           className="absolute inset-0"
//           style={{
//             background: "linear-gradient(135deg, hsl(220 40% 8% / 0.85), hsl(220 40% 8% / 0.5))",
//           }}
//         />
//       </div>

//       <motion.div
//         className="relative z-10 container-content section-padding w-full"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <div className="max-w-3xl">
//           <motion.div variants={itemVariants} className="mb-6">
//             <span className="eyebrow inline-flex items-center gap-3">
//               <span className="oman-motif" />
//               FLIVV IN MUSCAT
//             </span>
//           </motion.div>

//           <motion.h1 variants={itemVariants} className="heading-display text-white mb-6 text-balance">
//             Muscat Sales Sessions <span className="text-gradient-gold">2026</span>
//           </motion.h1>

//           <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/80 mb-8 max-w-xl font-body leading-relaxed">
//             Exclusive 1:1 consultations, investor briefings, and early-bird offers for premium land investments in India.
//           </motion.p>

//           <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
//             <a href="#form" className="btn-primary inline-flex items-center gap-2">
//               Register Now
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </a>
//             <a href="/brochure-muscat.pdf" className="btn-outline-hero">
//               Download Brochure
//             </a>
//           </motion.div>

//           <motion.div
//             variants={itemVariants}
//             className="mt-12 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-accent/30"
//           >
//             <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
//             <span className="text-sm text-white/90 font-medium">Limited VIP Slots Available</span>
//           </motion.div>
//         </div>
//       </motion.div>

//       <motion.div
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }}
//       >
//         <motion.div
//           className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
//           animate={{ y: [0, 8, 0] }}
//           transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
//         >
//           <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// // ============= COUNTDOWN SECTION =============
// const CountdownSection = () => {
//   const targetDate = new Date("2026-11-10T09:00:00+04:00").getTime();
//   const [timeLeft, setTimeLeft] = useState([]);
//   const [eventStatus, setEventStatus] = useState("upcoming");
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-50px" });
//   const shouldReduceMotion = useReducedMotion();

//   useEffect(() => {
//     const calculateTimeLeft = () => {
//       const now = new Date().getTime();
//       const difference = targetDate - now;

//       if (difference <= 0) {
//         const eventEndDate = new Date("2026-11-11T18:00:00+04:00").getTime();
//         if (now < eventEndDate) {
//           setEventStatus("live");
//         } else {
//           setEventStatus("ended");
//         }
//         return [
//           { value: 0, label: "Days" },
//           { value: 0, label: "Hours" },
//           { value: 0, label: "Minutes" },
//           { value: 0, label: "Seconds" },
//         ];
//       }

//       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//       return [
//         { value: days, label: "Days" },
//         { value: hours, label: "Hours" },
//         { value: minutes, label: "Minutes" },
//         { value: seconds, label: "Seconds" },
//       ];
//     };

//     setTimeLeft(calculateTimeLeft());
//     const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
//     return () => clearInterval(timer);
//   }, [targetDate]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.5, ease: easeOut },
//     },
//   };

//   if (eventStatus === "live") {
//     return (
//       <section ref={ref} className="py-12 bg-secondary">
//         <div className="container-content text-center">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full shadow-lg"
//           >
//             <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
//             <span className="text-xl font-display font-semibold text-foreground">Event is Live Now!</span>
//           </motion.div>
//         </div>
//       </section>
//     );
//   }

//   if (eventStatus === "ended") {
//     return (
//       <section ref={ref} className="py-12 bg-muted">
//         <div className="container-content text-center">
//           <p className="text-xl font-display font-semibold text-muted-foreground">
//             Event has ended. Thank you for attending!
//           </p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section ref={ref} className="py-16 bg-gradient-to-b from-background to-muted/50">
//       <motion.div
//         className="container-content"
//         variants={containerVariants}
//         initial="hidden"
//         animate={isInView ? "visible" : "hidden"}
//       >
//         <motion.p variants={itemVariants} className="text-center text-muted-foreground mb-8 font-medium">
//           Event starts in
//         </motion.p>
//         <div className="flex justify-center items-center gap-3 md:gap-6 px-4" role="timer" aria-live="polite">
//           {timeLeft.map((unit, index) => (
//             <motion.div key={unit.label} variants={itemVariants} className="relative">
//               <div className="card-premium text-center min-w-[70px] md:min-w-[100px] py-4 md:py-6">
//                 <motion.span
//                   key={unit.value}
//                   initial={shouldReduceMotion ? false : { opacity: 0.5, y: -5 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="block text-3xl md:text-5xl font-display font-bold text-foreground"
//                 >
//                   {String(unit.value).padStart(2, "0")}
//                 </motion.span>
//                 <span className="block text-xs md:text-sm text-muted-foreground mt-2 font-medium uppercase tracking-wider">
//                   {unit.label}
//                 </span>
//               </div>
//               {index < timeLeft.length - 1 && (
//                 <span className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 text-2xl md:text-3xl text-muted-foreground/30 font-light">
//                   :
//                 </span>
//               )}
//             </motion.div>
//           ))}
//         </div>
//         <motion.div variants={itemVariants} className="text-center mt-8">
//           <p className="text-sm text-muted-foreground">November 10-11, 2026 • Muscat, Oman</p>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// // ============= ABOUT EVENT SECTION =============
// const AboutEventSection = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const shouldReduceMotion = useReducedMotion();

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: easeOut },
//     },
//   };

//   const whoShouldAttend = [
//     "NRIs and regional investors",
//     "High-net-worth individuals seeking land investments",
//     "Advisors and investment partners",
//   ];

//   return (
//     <section ref={ref} id="about" className="section-padding bg-background">
//       <motion.div
//         className="container-content max-w-4xl mx-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate={isInView ? "visible" : "hidden"}
//       >
//         <motion.div variants={itemVariants} className="text-center mb-8">
//           <span className="eyebrow mb-4 block">About The Event</span>
//           <h2 className="heading-section text-foreground mb-6">About the Muscat Sales Sessions</h2>
//         </motion.div>

//         <motion.div variants={itemVariants} className="prose prose-lg max-w-none text-center md:text-left">
//           <p className="text-muted-foreground text-lg leading-relaxed mb-6">
//             Flivv invites investors to private Muscat sessions to learn about premium land projects, legal processes, and
//             pre-launch offers. Sessions feature presentations, live Q&A, and 1:1 consultation slots with our founders and
//             legal team.
//           </p>
//         </motion.div>

//         <motion.div variants={itemVariants} className="mt-12 card-premium">
//           <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
//             <span className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
//               <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                 />
//               </svg>
//             </span>
//             Who Should Attend
//           </h3>
//           <ul className="space-y-4">
//             {whoShouldAttend.map((item, index) => (
//               <motion.li key={index} variants={itemVariants} className="flex items-start gap-3">
//                 <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
//                   <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </span>
//                 <span className="text-foreground font-medium">{item}</span>
//               </motion.li>
//             ))}
//           </ul>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// // ============= EVENT TIMELINE SECTION =============
// const EventTimelineSection = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const shouldReduceMotion = useReducedMotion();

//   const days = [
//     {
//       label: "Day 1 — Presentations",
//       date: "November 10, 2026",
//       items: [
//         { time: "10:00 AM", title: "Welcome & Keynote", speaker: "Founder" },
//         { time: "11:30 AM", title: "Project Deep Dive", speaker: "Project Head" },
//         { time: "02:00 PM", title: "Investor Q&A Panel", speaker: "Legal Head" },
//       ],
//     },
//     {
//       label: "Day 2 — 1:1 Consultations",
//       date: "November 11, 2026",
//       items: [
//         { time: "09:00 AM", title: "Private 1:1 Slots", note: "Pre-book via registration" },
//         { time: "02:00 PM", title: "Site Visit Briefing", note: "Optional local site visit" },
//       ],
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -20 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.5, ease: easeOut },
//     },
//   };

//   return (
//     <section ref={ref} id="timeline" className="section-padding bg-muted/30">
//       <motion.div
//         className="container-content max-w-5xl mx-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate={isInView ? "visible" : "hidden"}
//       >
//         <motion.div variants={itemVariants} className="text-center mb-12">
//           <span className="eyebrow mb-4 block">Schedule</span>
//           <h2 className="heading-section text-foreground mb-4">Event Details & Timeline</h2>
//           <p className="text-muted-foreground max-w-xl mx-auto">
//             Detailed schedule for presentations and 1:1 consultation slots. Pre-select time slots via the registration
//             form.
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-8" role="list">
//           {days.map((day, dayIndex) => (
//             <motion.div key={day.label} variants={itemVariants} className="card-premium">
//               <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
//                 <div
//                   className={`w-12 h-12 rounded-xl flex items-center justify-center ${
//                     dayIndex === 0 ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
//                   }`}
//                 >
//                   <span className="font-display font-bold text-lg">{dayIndex + 1}</span>
//                 </div>
//                 <div>
//                   <h3 className="font-display font-semibold text-foreground">{day.label}</h3>
//                   <p className="text-sm text-muted-foreground">{day.date}</p>
//                 </div>
//               </div>

//               <div className="space-y-4" role="list">
//                 {day.items.map((item, index) => (
//                   <motion.div
//                     key={index}
//                     variants={itemVariants}
//                     className="relative pl-6 border-l-2 border-border hover:border-accent transition-colors"
//                     role="listitem"
//                   >
//                     <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-background border-2 border-accent" />
//                     <div className="pb-4">
//                       <span className="inline-block text-xs font-semibold text-accent bg-accent/10 rounded-full px-2.5 py-1 mb-2">
//                         {item.time}
//                       </span>
//                       <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
//                       {item.speaker && (
//                         <p className="text-sm text-muted-foreground flex items-center gap-1.5">
//                           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                             />
//                           </svg>
//                           {item.speaker}
//                         </p>
//                       )}
//                       {item.note && <p className="text-sm text-muted-foreground italic">{item.note}</p>}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// // ============= HIGHLIGHTS GRID SECTION =============
// const HighlightsGridSection = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const shouldReduceMotion = useReducedMotion();

//   const highlights = [
//     {
//       title: "One-on-One Consultations",
//       description: "Personalized investment planning and documentation guidance",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={1.5}
//             d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
//           />
//         </svg>
//       ),
//       isExclusive: true,
//     },
//     {
//       title: "Pre-launch Pricing",
//       description: "Access exclusive early-bird offers and priority bookings",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={1.5}
//             d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
//           />
//         </svg>
//       ),
//       isExclusive: true,
//     },
//     {
//       title: "Legal Assistance",
//       description: "On-site legal guidance for NRIs and investors",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={1.5}
//             d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
//           />
//         </svg>
//       ),
//     },
//     {
//       title: "Project Walkthrough",
//       description: "Live project deep-dive and Q&A sessions",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={1.5}
//             d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
//           />
//         </svg>
//       ),
//     },
//     {
//       title: "Site Visit Options",
//       description: "Arrange local site visits post session",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={1.5}
//             d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//           />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//         </svg>
//       ),
//     },
//     {
//       title: "Post-Event Support",
//       description: "Continued assistance for booking and registration",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={1.5}
//             d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
//           />
//         </svg>
//       ),
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: easeOut },
//     },
//   };

//   return (
//     <section ref={ref} id="highlights" className="section-padding bg-background">
//       <motion.div
//         className="container-content max-w-6xl mx-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate={isInView ? "visible" : "hidden"}
//       >
//         <motion.div variants={itemVariants} className="text-center mb-12">
//           <span className="eyebrow mb-4 block">What You Get</span>
//           <h2 className="heading-section text-foreground">Event Highlights</h2>
//         </motion.div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {highlights.map((item, index) => (
//             <motion.div
//               key={index}
//               variants={itemVariants}
//               whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
//               className="card-premium relative group"
//             >
//               {item.isExclusive && (
//                 <span className="absolute -top-2 -right-2 text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-foreground px-2.5 py-1 rounded-full shadow-sm">
//                   Exclusive
//                 </span>
//               )}
//               <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
//                 {item.icon}
//               </div>
//               <h3 className="font-display font-semibold text-lg text-foreground mb-2">{item.title}</h3>
//               <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// // ============= ABOUT FLIVV SECTION =============
// const AboutFlivvSection = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const shouldReduceMotion = useReducedMotion();

//   const stats = [
//     { value: 15, suffix: "+", label: "Projects Delivered" },
//     { value: 2500, suffix: "+", label: "Happy Investors" },
//     { value: 10, suffix: "+", label: "Years Experience" },
//   ];

//   const trustBadges = ["DTCP / HMDA Approvals", "Clear Title Assurance", "Spot Registration Support"];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: easeOut },
//     },
//   };

//   return (
//     <section ref={ref} id="about-flivv" className="section-padding bg-foreground text-background">
//       <motion.div
//         className="container-content max-w-4xl mx-auto text-center"
//         variants={containerVariants}
//         initial="hidden"
//         animate={isInView ? "visible" : "hidden"}
//       >
//         <motion.div variants={itemVariants}>
//           <span className="eyebrow mb-4 block text-accent">Who We Are</span>
//           <h2 className="heading-section mb-8">About Flivv</h2>
//         </motion.div>

//         <motion.div variants={itemVariants} className="space-y-6 mb-12">
//           <p className="text-lg leading-relaxed opacity-90">
//             Flivv Developers is a trusted real estate developer with experience delivering premium projects. We guide
//             investors through legal, documentation and site-selection processes with transparency.
//           </p>
//           <p className="text-lg leading-relaxed opacity-80">
//             Our team includes project leads, sales consultants and legal advisors to support NRI investments from
//             discovery to possession.
//           </p>
//         </motion.div>

//         <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 md:gap-8 mb-12">
//           {stats.map((stat, index) => (
//             <div key={index} className="text-center">
//               <div className="text-3xl md:text-4xl font-display font-bold text-accent mb-1">
//                 <AnimatedCounter target={stat.value} suffix={stat.suffix} isInView={isInView} />
//               </div>
//               <div className="text-xs md:text-sm opacity-70">{stat.label}</div>
//             </div>
//           ))}
//         </motion.div>

//         <motion.div variants={itemVariants}>
//           <div className="flex flex-wrap justify-center gap-3">
//             {trustBadges.map((badge, index) => (
//               <span
//                 key={index}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm border border-white/10"
//               >
//                 <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                   />
//                 </svg>
//                 {badge}
//               </span>
//             ))}
//           </div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// // ============= REGISTRATION SECTION =============
// const RegistrationSection = () => {
//   const ref = useRef(null);
//   const hubspotContainerRef = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const formVisible = useInView(hubspotContainerRef, { once: true, margin: "100px" });
//   const shouldReduceMotion = useReducedMotion();
//   const [scriptLoaded, setScriptLoaded] = useState(false);
//   const [formMounted, setFormMounted] = useState(false);

//   useEffect(() => {
//     if (formVisible && !scriptLoaded) {
//       const existingScript = document.querySelector('script[src="https://js-na2.hsforms.net/forms/embed/21626983.js"]');
//       if (existingScript) {
//         setScriptLoaded(true);
//         return;
//       }

//       const script = document.createElement("script");
//       script.src = "https://js-na2.hsforms.net/forms/embed/21626983.js";
//       script.defer = true;
//       script.onload = () => setScriptLoaded(true);
//       document.head.appendChild(script);
//     }
//   }, [formVisible, scriptLoaded]);

//   useEffect(() => {
//     if (scriptLoaded && hubspotContainerRef.current && !formMounted) {
//       const formDiv = document.createElement("div");
//       formDiv.className = "hs-form-frame";
//       formDiv.setAttribute("data-region", "na2");
//       formDiv.setAttribute("data-form-id", "417fd073-67f4-4e82-90f6-20d056f919fa");
//       formDiv.setAttribute("data-portal-id", "21626983");
//       hubspotContainerRef.current.appendChild(formDiv);
//       setFormMounted(true);
//     }
//   }, [scriptLoaded, formMounted]);

//   const bullets = [
//     "Limited 1:1 consultation slots — priority to early registrants",
//     "Pre-select preferred date/time in the form",
//     "Travel & local arrangement assistance available on request",
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: easeOut },
//     },
//   };

//   return (
//     <section ref={ref} id="form" className="section-padding bg-muted/30" aria-labelledby="registration-heading">
//       <motion.div
//         className="container-content max-w-6xl mx-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate={isInView ? "visible" : "hidden"}
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
//           <motion.div variants={itemVariants} className="lg:sticky lg:top-8">
//             <span className="eyebrow mb-4 block">Reserve Your Spot</span>
//             <h2 id="registration-heading" className="heading-section text-foreground mb-6">
//               Register for Muscat Sales Sessions
//             </h2>

//             <ul className="space-y-4 mb-8">
//               {bullets.map((bullet, index) => (
//                 <motion.li key={index} variants={itemVariants} className="flex items-start gap-3">
//                   <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
//                     <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </span>
//                   <span className="text-foreground">{bullet}</span>
//                 </motion.li>
//               ))}
//             </ul>

//             <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
//               <p className="text-sm text-foreground flex items-start gap-2">
//                 <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <span>After registration, you'll receive a confirmation email with calendar invite and brochure download link.</span>
//               </p>
//             </div>

//             <div className="mt-8 pt-8 border-t border-border">
//               <p className="text-sm text-muted-foreground mb-4">Questions? Contact us directly:</p>
//               <div className="space-y-2">
//                 <a href="mailto:events@flivv.com" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                   events@flivv.com
//                 </a>
//                 <a href="tel:+96812345678" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                     />
//                   </svg>
//                   +968 1234 5678
//                 </a>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div variants={itemVariants} className="card-premium border border-border" style={{ boxShadow: "var(--shadow-elevated)" }}>
//             <div ref={hubspotContainerRef} className="min-h-[400px]" aria-live="polite">
//               {!formMounted && (
//                 <div className="flex items-center justify-center h-[400px]">
//                   <div className="text-center">
//                     <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//                     <p className="text-muted-foreground">Loading form...</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// // ============= FLOATING CTA =============
// const FloatingCTAButton = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const shouldReduceMotion = useReducedMotion();

//   useEffect(() => {
//     const handleScroll = () => {
//       const heroSection = document.getElementById("hero");
//       const formSection = document.getElementById("form");

//       if (heroSection && formSection) {
//         const heroBottom = heroSection.getBoundingClientRect().bottom;
//         const formTop = formSection.getBoundingClientRect().top;
//         const windowHeight = window.innerHeight;
//         setIsVisible(heroBottom < 0 && formTop > windowHeight * 0.5);
//       }
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <AnimatePresence mode="wait">
//       {isVisible && (
//         <motion.a
//           key="floating-cta"
//           href="#form"
//           initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
//           transition={{ duration: 0.3 }}
//           className="fixed bottom-6 right-6 z-50 btn-primary flex items-center gap-2 shadow-2xl"
//           style={{ boxShadow: "var(--shadow-glow-red)" }}
//         >
//           <span>Register Now</span>
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//           </svg>
//         </motion.a>
//       )}
//     </AnimatePresence>
//   );
// };

// // ============= FOOTER =============
// const FooterSection = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-foreground text-background/70 py-12">
//       <div className="container-content max-w-6xl mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//           <div>
//             <h3 className="font-display text-xl font-semibold text-background mb-4">Flivv Developers</h3>
//             <p className="text-sm leading-relaxed">
//               Premium real estate investments with transparency and trust. Your partner from discovery to possession.
//             </p>
//           </div>

//           <div>
//             <h4 className="font-semibold text-background mb-4">Muscat Sessions 2026</h4>
//             <ul className="space-y-2 text-sm">
//               <li className="flex items-start gap-2">
//                 <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//                 November 10-11, 2026
//               </li>
//               <li className="flex items-start gap-2">
//                 <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                   />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 Grand Hyatt Muscat, Oman
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-semibold text-background mb-4">Contact</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <a href="mailto:events@flivv.com" className="hover:text-background transition-colors">
//                   events@flivv.com
//                 </a>
//               </li>
//               <li>
//                 <a href="tel:+96812345678" className="hover:text-background transition-colors">
//                   +968 1234 5678
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
//           <p className="text-sm">© {currentYear} Flivv Developers. All rights reserved.</p>
//           <div className="flex items-center gap-6 text-sm">
//             <a href="#" className="hover:text-background transition-colors">
//               Privacy Policy
//             </a>
//             <a href="#" className="hover:text-background transition-colors">
//               Terms of Service
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// // ============= MAIN COMPONENT =============
// const FlivvMuscatLandingPage = () => {
//   return (
//     <main className="overflow-x-hidden">
//       <HeroSection />
//       <CountdownSection />
//       <AboutEventSection />
//       <EventTimelineSection />
//       <HighlightsGridSection />
//       <AboutFlivvSection />
//       <RegistrationSection />
//       <FooterSection />
//       <FloatingCTAButton />
//     </main>
//   );
// };

// export default FlivvMuscatLandingPage;