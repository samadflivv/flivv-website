'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

// Projects data structure
const projectsData = {
  // upcoming: {
  //   title: 'Upcoming Projects',
  //   projects: [
  //     { name: 'Sukoon Villas', href: '/sukoonvillas' }
  //   ]
  // },
  current: {
    title: 'Current Projects',
    projects: [
      { name: 'Gulmohar Villas', href: '/gulmoharvillas' },
      { name: 'Gulmohar Homes', href: '/gulmoharhomes' },
      { name: 'Airport Town', href: '/airporttown' },
      { name: 'Sadhana City', href: '/' }
    ]
  },
  completed: {
    title: 'Completed Projects',
    projects: [
      { name: 'NS Homes 1.0', href: '/' },
      { name: 'NS Homes 2.0', href: '/' },
      { name: 'Ideal Avenue', href: '/' },
      { name: 'Rivendell Farms', href: '/rivendellfarms' }
    ]
  }
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('current');
  const [mobileInternationalOpen, setMobileInternationalOpen] = useState(false);

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

        {/* Projects Mega Menu */}
        <li 
          className="relative group"
          onMouseEnter={() => setActiveCategory('current')}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <Link href="/projects" className="flex items-center">
            Projects
          </Link>
          
          {/* Mega Menu Dropdown */}
          <div className="absolute left-0 top-full mt-2 w-[450px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white backdrop-blur-md border border-grey">
            <div className="flex p-6">
              {/* Categories Sidebar */}
              <div className="w-1/3 pr-6 border-r border-gray">
                <ul className="space-y-4">
                  {Object.entries(projectsData).map(([key, category]) => (
                    <li
                      key={key}
                      onMouseEnter={() => setActiveCategory(key)}
                      className={`px-4 py-3 rounded-lg cursor-pointer transition-all ${
                        activeCategory === key ? 'bg-[#0192D3] text-white' : 'text-black hover:bg-[#0192D3] hover:text-white'
                      }`}
                    >
                      {category.title}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects Panel */}
              <div className="w-2/3 pl-6">
                {activeCategory && projectsData[activeCategory] && (
                  <ul className="space-y-3">
                    {projectsData[activeCategory].projects.map((project, index) => (
                      <li key={index}>
                        <Link
                          href={project.href}
                          className="block px-4 py-3 rounded-lg text-lg font-normal text-black hover:text-white hover:bg-[#0192D3] transition-all"
                        >
                          {project.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </li>

        <li><Link href="/contact">Contact</Link></li>


        {/* International Events Dropdown (new) */}
        <li className="relative group">
          <Link href="/internationalevents">
          <button className="flex items-center">
            International Events
            <ChevronDown size={16} className="ml-2" />
          </button>
          </Link>

          {/* Dropdown - appears on hover, matches existing dropdown behavior */}
          <div className="absolute right-0 top-full mt-2 w-[220px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white backdrop-blur-md border border-grey">
            <ul className="p-3">
              {/* First item highlighted */}
              <li>
                <Link href="/flivvbahrainvisit" className="block px-4 py-2 rounded-md text-black bg-[#0192D3] text-white">Bahrain Event</Link>
              </li>
              <li>
                <Link href="/flivvqatarevent" className="block px-4 py-2 rounded-md text-black hover:bg-[#0192D3] hover:text-white mt-2">Qatar Event</Link>
              </li>
              <li>
                <Link href="/flivvksaevent" className="block px-4 py-2 rounded-md text-black hover:bg-[#0192D3] hover:text-white mt-2">KSA Event</Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      {/* Hamburger */}
      <div className="md:hidden z-50" onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </div>

      {/* Mobile Menu - Full Screen */}
      <nav
        className={`
          md:hidden fixed top-0 left-0 h-full w-full bg-black z-40
          transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >

        <div className="flex flex-col h-full pt-20">
          {/* Main Menu Items */}
          {!mobileProjectsOpen && !mobileInternationalOpen ? (
            <ul className="flex flex-col items-start p-6 gap-6 font-medium text-lg text-white">
              <li>
                <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl hover:text-[#0192D3] transition-all">Home</Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setIsOpen(false)} className="text-2xl hover:text-[#0192D3] transition-all">About Us</Link>
              </li>
              
              {/* Mobile Projects Menu */}
              <li className="w-full">
                <button
                  onClick={() => setMobileProjectsOpen(true)}
                  className="flex items-center justify-between w-full text-2xl hover:text-[#0192D3] transition-all"
                >
                  Projects
                  <ChevronDown size={24} className="transform rotate-90" />
                </button>
              </li>

              <li>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="text-2xl hover:text-[#0192D3] transition-all">Contact</Link>
              </li>


              {/* Mobile International Dropdown Trigger (new) */}
              <li className="w-full">
                <button
                  onClick={() => setMobileInternationalOpen(true)}
                  className="flex items-center justify-between w-full text-2xl hover:text-[#0192D3] transition-all"
                >
                  International Events
                  <ChevronDown size={24} className="transform rotate-90" />
                </button>
              </li>
            </ul>
          ) : mobileProjectsOpen ? (
            /* Projects Submenu - Two Column Layout */
            <div className="flex flex-col h-full">
              {/* Back Button */}
              <div className="flex items-center p-6 border-b border-gray-700">
                <button 
                  onClick={() => setMobileProjectsOpen(false)}
                  className="flex items-center text-white text-xl hover:text-[#0192D3] transition-all"
                >
                  <ArrowLeft size={24} className="mr-2" />
                  Back
                </button>
              </div>

              {/* Two Column Layout */}
              <div className="flex flex-1">
                {/* Categories Column */}
                <div className="w-2/5 border-r border-gray-700 bg-gray-900">
                  <ul className="py-4">
                    {Object.entries(projectsData).map(([key, category]) => (
                      <li key={key}>
                        <button
                          onClick={() => setActiveCategory(key)}
                          className={`w-full text-left px-6 py-4 text-lg transition-all ${
                            activeCategory === key 
                              ? 'bg-[#0192D3] text-white border-r-2 border-[#0192D3]' 
                              : 'text-gray-300 hover:bg-[#0192D3] hover:text-white'
                          }`}
                        >
                          {category.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Projects Column */}
                <div className="w-3/5 bg-black overflow-y-auto">
                  {activeCategory && projectsData[activeCategory] && (
                    <ul className="py-4">
                      {projectsData[activeCategory].projects.map((project, index) => (
                        <li key={index}>
                          <Link
                            href={project.href}
                            onClick={() => {
                              setIsOpen(false);
                              setMobileProjectsOpen(false);
                            }}
                            className="block px-6 py-4 text-lg text-gray-300 hover:bg-[#0192D3] hover:text-white transition-all border-b border-gray-800"
                          >
                            {project.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Mobile International Submenu */
            <div className="flex flex-col h-full">
              <div className="flex items-center p-6 border-b border-gray-700">
                <button 
                  onClick={() => setMobileInternationalOpen(false)}
                  className="flex items-center text-white text-xl hover:text-[#0192D3] transition-all"
                >
                  <ArrowLeft size={24} className="mr-2" />
                  Back
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-4">
                  {/* First item highlighted */}
                  <li>
                    <Link
                      href="/flivvbahrainvisit"
                      onClick={() => {
                        setIsOpen(false);
                        setMobileInternationalOpen(false);
                      }}
                      className="block px-6 py-4 text-lg rounded-md bg-[#0192D3] text-white w-full"
                    >
                      Flivv Bahrain Visit
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/flivvqatarevent"
                      onClick={() => {
                        setIsOpen(false);
                        setMobileInternationalOpen(false);
                      }}
                      className="block px-6 py-4 text-lg rounded-md text-gray-300 hover:bg-[#0192D3] hover:text-white w-full"
                    >
                      Qatar Event
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/flivvksaevent"
                      onClick={() => {
                        setIsOpen(false);
                        setMobileInternationalOpen(false);
                      }}
                      className="block px-6 py-4 text-lg rounded-md text-gray-300 hover:bg-[#0192D3] hover:text-white w-full"
                    >
                      KSA Event
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
