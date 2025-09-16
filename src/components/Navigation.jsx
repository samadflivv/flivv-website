'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center px-6 md:px-[100px] w-full z-50 text-white absolute">
      {/* Logo */}
      <div>
        <a href="/">
          <img src="/flivv-logo.png" alt="Flivv Logo" width={150} />
        </a>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-x-9 font-medium text-lg">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About Us</Link></li>
        <li className="relative group">
          <Link href="/projects">Projects</Link>
          <ul className="absolute left-0 mt-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            <li>
              <Link
                href="/gulmoharvillas"
                className="block px-4 py-2 rounded-lg text-lg font-normal bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all"
              >
                Gulmohar Villas
              </Link>
            </li>
            <li>
              <Link
                href="/rivendellfarms"
                className="block px-4 py-2 rounded-lg text-lg font-normal bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all mt-2"
              >
                Rivendell Farms
              </Link>
            </li>
          </ul>
        </li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>

      {/* Hamburger */}
      <div className="md:hidden z-50" onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </div>

      {/* Mobile Menu */}
      <nav
        className={`
          md:hidden fixed top-0 right-0 h-full w-2/4 bg-black z-40
          transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <ul className="flex flex-col items-start p-6 gap-6 mt-16 font-medium text-lg text-white">
          <li>
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setIsOpen(false)}>About Us</Link>
          </li>
          <li className="w-full">
            <div className="flex items-center justify-between w-full">
              {/* Projects button now navigates to /projects */}
              <Link
                href="/projects"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Projects
              </Link>
              <button
                onClick={() => setProjectsOpen(prev => !prev)}
                aria-label="Toggle Projects Submenu"
              >
                {projectsOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
              </button>
            </div>
            {projectsOpen && (
              <ul className="pl-4 mt-2 space-y-2">
                <li>
                  <Link
                    href="/gulmoharvillas"
                    onClick={() => setIsOpen(false)}
                    className="block py-1 text-lg font-light text-gray-300 hover:text-white"
                  >
                    Gulmohar Villas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rivendellfarms"
                    onClick={() => setIsOpen(false)}
                    className="block py-1 text-lg font-light text-gray-300 hover:text-white"
                  >
                    Rivendell Farms
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
