'use client'; // if using in Next.js app directory

import { useRef } from 'react';

export default function AnimatedBTN() {
  const buttonRef = useRef();
  const glowRef = useRef();

  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    const glow = glowRef.current;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.background = `radial-gradient(circle at ${x}px ${y}px,rgb(229, 9, 239, 1), transparent 60%)`;
  };

  const handleMouseLeave = () => {
    const glow = glowRef.current;
    glow.style.background = 'transparent';
  };

  return (
    <div className="relative group w-fit mt-10">
      {/* Glow Layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-xl blur-xl opacity-60 pointer-events-none transition-all duration-200"
        style={{ zIndex: 0 }}
      ></div>

      {/* Button */}
      <a href='#GVcontact'> 
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="shadow-xl shadow-[#E509EF]/50 relative z-10 px-3 md:px-8 py-3 rounded-xl backdrop-blur-md bg-[#E509EF]/35 text-white text-sm md:text-xl border border-[#E509EF]/70 shadow-md transition-all duration-300 overflow-hidden"
      >
        Explore Gulmohar Villas
      </button>
      </a>
    </div>
  );
}
