"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // Install lucide-react if you haven't

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center px-6 md:px-[100px] w-full z-50 text-white absolute">
      {/* Logo */}
      <div>
        <a href='/'>
        <img src="/flivv-logo.png" alt="Flivv Logo" width={150} />
        </a>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-x-9 font-medium text-lg">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About Us</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>

      {/* Hamburger */}
      <div className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-2/4 bg-black z-40 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <ul className="flex flex-col items-start p-6 gap-6 mt-16 font-medium text-lg text-white">
          <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link href="/about" onClick={() => setIsOpen(false)}>About Us</Link></li>
          <li><Link href="/projects" onClick={() => setIsOpen(false)}>Projects</Link></li>
          <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;

