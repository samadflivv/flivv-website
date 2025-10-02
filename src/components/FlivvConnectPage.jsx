'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Footer from "./Footer";

export default function FlivvConnectPage() {
  const primary = "#0192D3"; // brand
  const ksa = "#006C35"; // KSA green

  const targetDate = new Date("2025-10-23T00:00:00Z"); // UTC target date
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const blobsRef = useRef(null);
  const cardsRef = useRef(null);

  // Countdown (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, []);

  // GSAP: floating blobs + entrance for cards
  useEffect(() => {
    if (!blobsRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      // gentle float for blobs
      gsap.to(".float-blob", {
        y: -18,
        x: 8,
        rotation: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 6,
        stagger: { each: 0.8 },
      });

      // cards entrance when in view
      gsap.from(".card-anim", {
        y: 24,
        opacity: 0,
        stagger: 0.14,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      });
    }, blobsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen text-gray-900" style={{ background: `linear-gradient(180deg, #f8fafc 0%, #ffffff 40%)` }}>
      {/* Decorative floating blobs (absolute) */}
      <div ref={blobsRef} aria-hidden className="pointer-events-none">
        <svg className="absolute -left-8 top-8 w-56 h-56 opacity-80 float-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0%" x2="100%">
              <stop offset="0%" stopColor={primary} stopOpacity="0.95" />
              <stop offset="100%" stopColor={ksa} stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path fill="url(#g1)" d="M38.5,-52.7C50.7,-43.4,62.1,-33.1,66.9,-19.8C71.6,-6.4,69.6,9.1,62.6,22.8C55.6,36.5,43.7,48.4,29.2,55.3C14.6,62.1,-2.7,64,-18.2,59.2C-33.8,54.4,-47.6,43,-56.1,28.2C-64.6,13.5,-67.8,-4.8,-61.9,-22.8C-56,-40.8,-40.9,-58.5,-23.9,-63.6C-6.9,-68.6,11.8,-61.1,27.9,-52.3C44.1,-43.5,57.3,-33.4,38.5,-52.7Z" transform="translate(100 100)" />
        </svg>

        <svg className="absolute right-4 -top-10 w-44 h-44 opacity-70 float-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g2" x1="0%" x2="100%">
              <stop offset="0%" stopColor={ksa} stopOpacity="0.9" />
              <stop offset="100%" stopColor={primary} stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path fill="url(#g2)" d="M46.7,-70.7C61.8,-63.1,77.9,-53.4,80.9,-40.5C83.9,-27.7,73,-11.6,68.6,6.8C64.2,25.1,66.3,44.9,57.2,57.9C48.1,70.9,27.9,77.1,8.8,72.7C-10.3,68.4,-20.6,53.5,-34.3,40.1C-48.1,26.7,-65.3,14.9,-70.9,-0.1C-76.6,-15.1,-70.7,-31.8,-59.1,-40.1C-47.4,-48.3,-30.1,-48.1,-14.6,-53.5C0.9,-58.9,17.8,-69.9,46.7,-70.7Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* HERO */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-[72vh] px-6 text-center"
      >
        <div className="w-full max-w-5xl">
          <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm shadow-2xl border border-white/30">
            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              <span className="block" style={{ color: primary }}>Flivv Connect:</span>
              <span className="block text-3xl md:text-5xl text-gray-700">KSA 2025</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Empowering Indian investors to explore high-growth real estate opportunities in Dammam, Khobar, and Jeddah.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center"
            >
              <a
                href="#form"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-medium shadow-lg transform hover:scale-[1.02]"
                style={{ background: `linear-gradient(90deg, ${primary}, ${ksa})` }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V5a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0V9h2a1 1 0 100-2h-2z" clipRule="evenodd" />
                </svg>
                Register Now
              </a>

              <a
                href="#destinations"
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-primary-700 font-medium border border-primary-200 hover:shadow-md"
                style={{ color: primary, borderColor: primary + "33" }}
              >
                View Itinerary
              </a>
            </motion.div>

            <div className="mt-6 text-sm text-gray-500">Limited seats — curated site visits & workshops.</div>
          </div>
        </div>
      </motion.header>

      {/* COUNTDOWN */}
      <section className="relative z-10 flex justify-center -mt-10 px-4">
        <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-4 -translate-y-6">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((u) => (
            <div key={u.label} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center">
              <div className="text-3xl md:text-4xl font-extrabold text-gray-900">{pad(u.value)}</div>
              <div className="mt-1 text-xs md:text-sm text-gray-600">{u.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">About Flivv Connect</h2>
          <p className="mt-4 text-gray-700 text-lg">
            Flivv Developers is a real estate development firm dedicated to helping investors “invest wisely in real estate”.
            Flivv Connect: KSA 2025 will bring Indian investors to Saudi Arabia for curated site visits, workshops, and
            networking across Dammam, Khobar, and Jeddah.
          </p>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" ref={cardsRef} className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6">Itinerary & Destinations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                city: "Dammam",
                date: "Oct 23, 2025",
                description: "Exclusive site visits and developer presentations.",
                accent: primary,
                emoji: "🕌",
              },
              {
                city: "Khobar",
                date: "Oct 24, 2025",
                description: "Meet local experts and tour prime developments.",
                accent: ksa,
                emoji: "🌊",
              },
              {
                city: "Jeddah",
                date: "Oct 25, 2025",
                description: "Workshops, networking events, and cultural tours.",
                accent: primary,
                emoji: "🏙️",
              },
            ].map((loc) => (
              <article key={loc.city} className="card-anim bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner" style={{ background: `linear-gradient(180deg, ${loc.accent}, ${primary})`, color: "white" }}>
                      {loc.emoji}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">{loc.city}</h4>
                      <div className="text-sm text-gray-500">{loc.date}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">Seats limited</div>
                </div>
                <p className="mt-4 text-gray-600">{loc.description}</p>
                <div className="mt-6 flex gap-3">
                  <a href="#form" className="px-4 py-2 rounded-md text-sm font-medium" style={{ background: `linear-gradient(90deg, ${primary}, ${ksa})`, color: "white" }}>Register</a>
                  <button className="px-4 py-2 rounded-md text-sm font-medium border border-gray-200 hover:bg-gray-50">Learn more</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + HUBSPOT FORM PLACEHOLDER */}
      <section id="form" className="bg-gradient-to-b from-white to-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto p-6 rounded-3xl shadow-2xl bg-white">
          <h4 className="text-2xl font-semibold text-center">Interested? Submit your details</h4>
          <p className="text-center text-gray-600 mt-2">We'll contact you with the event schedule, pricing, and travel support.</p>

          <div className="mt-6">
            {/* HubSpot placeholder - paste your HubSpot embed snippet into the div below */}
            <div id="hubspot-form" className="w-full">
              {/*
                Best practice for Next.js: use next/script with strategy="afterInteractive" and paste HubSpot embed there.

                Example (in a Next.js page component):

                import Script from 'next/script'
                
                <Script id="hs-forms" strategy="afterInteractive">
                {`(function() { var script = document.createElement('script'); script.src = 'https://js.hsforms.net/forms/v2.js'; document.head.appendChild(script); script.onload = function() { hbspt.forms.create({ portalId: 'YOUR_PORTAL_ID', formId: 'YOUR_FORM_ID', target: '#hubspot-form' }); }; })()`}
                </Script>

              */}

              {/* Fallback simple form */}
              <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input aria-label="Name" className="p-3 rounded-lg border" placeholder="Full name" />
                <input aria-label="Email" className="p-3 rounded-lg border" placeholder="Email address" />
                <input aria-label="Phone" className="p-3 rounded-lg border" placeholder="Phone" />
                <select className="p-3 rounded-lg border">
                  <option>Interested in: Plot / Apartment / Both</option>
                  <option>Plot</option>
                  <option>Apartment</option>
                </select>
                <textarea className="sm:col-span-2 p-3 rounded-lg border" placeholder="Anything else we should know? (optional)" />
                <button type="button" className="sm:col-span-2 px-5 py-3 rounded-full text-white font-semibold" style={{ background: `linear-gradient(90deg, ${primary}, ${ksa})` }}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ATTEND */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="text-2xl font-semibold">Why Attend</h4>
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-left text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-2xl">📈</span>
              <span>Learn about investment opportunities in the Saudi real estate market</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🔍</span>
              <span>Gain cutting-edge market insights and trends</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🤝</span>
              <span>Connect with real estate experts and fellow Indian investors</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎤</span>
              <span>Participate in workshops and Q&amp;A sessions with industry leaders</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <Footer/>
    </div>
  );
}

// ---------- helpers ----------
function getTimeLeft(target) {
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime());
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

function pad(n) {
  return String(n).padStart(2, "0");
}
