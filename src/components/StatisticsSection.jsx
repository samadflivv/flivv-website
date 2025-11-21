"use client";

import React, { useEffect, useRef, useState } from "react";

const stats = [
  { value: "10+", label: "Projects" },
  { value: "14+", label: "Years of Legacy" },
  { value: "500+", label: "Happy Clients" },
  { value: "97%", label: "Satisfaction Rate" },
];

// Reusable AnimatedNumber component
const AnimatedNumber = ({ targetStr, duration = 2000, delay = 0, trigger = false }) => {
  const [display, setDisplay] = useState("0");
  const rafId = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    const full = String(targetStr).trim();
    const numMatch = full.match(/[\d,.]+/);
    if (!numMatch) {
      setDisplay(full);
      return;
    }

    const numStr = numMatch[0].replace(/,/g, "");
    const targetNum = parseFloat(numStr);
    const suffix = full.replace(numMatch[0], "");

    let start = null;

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start - delay;
      if (elapsed < 0) {
        rafId.current = requestAnimationFrame(step);
        return;
      }

      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutExpo(progress);
      const current = Math.floor(targetNum * eased);

      setDisplay(current + suffix);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(step);
      } else {
        setDisplay(numStr + suffix); // exact final value
      }
    };

    rafId.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId.current);
  }, [trigger, targetStr, duration, delay]);

  return <span>{display}</span>;
};

const StatisticsSection = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // trigger when 30% of section visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="px-6 sm:px-8 md:px-20 mt-20 mb-30">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 justify-items-center items-center text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-7xl font-normal leading-none">
              <AnimatedNumber
                targetStr={stat.value}
                duration={1500 + index * 500} 
                delay={index * 200} 
                trigger={inView}
              />
            </h1>
            <h2 className="text-lg md:text-xl font-semibold mt-4 md:mt-6">
              {stat.label}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;
