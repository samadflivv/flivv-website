'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

// Projects data structure
const projectsData = {
  current: {
    title: 'Current Projects',
    projects: [
      { name: 'Gulmohar Homes', href: '/gulmoharhomes' },
      { name: 'Gulmohar Villas', href: '/gulmoharvillas' },
    ]
  },
  completed: {
    title: 'Completed Projects',
    projects: [
      { name: 'Airport Town', href: '/airporttown' },
      { name: 'Rivendell Farms', href: '/rivendellfarms' },
      { name: 'NS Homes 2.0', href: '/nshomes2' },
      { name: 'Ideal Avenue', href: '/idealavenue' },
      { name: 'NS Homes 1.0', href: '/nshomes' },
    ]
  }
};

// Events data structure - Added href to salesEvents for desktop
const eventsData = {
  salesMeets: {
    title: 'Sales Meets',
    href: '/salesmeets', 
    items: [
      { name: 'Qatar', href: '/salesmeets?country=QA' },
      { name: 'India', href: '/salesmeets?country=India' }
    ]
  },
  salesEvents: {
    title: 'Sales Events',
    href: '/', // ← Added link here for desktop
    items: [
      { name: 'Qatar', href: '/flivvqatarevent' },
      { name: 'KSA', href: '/flivvksaevent' },
      { name: 'Bahrain', href: '/flivvbahrainvisit' }
    ]
  }
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('current');
  
  const [activeEventCategory, setActiveEventCategory] = useState('salesMeets'); 
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);

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
          onMouseLeave={() => setActiveCategory('current')}
        >
          <Link href="/projects" className="flex items-center">
            Projects
            <ChevronDown size={16} className="ml-2" />
          </Link>
          
          <div className="absolute left-0 top-full mt-2 w-[450px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white backdrop-blur-md border border-grey">
            <div className="flex p-6">
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

        <li><Link href="/quickdeals">Quick Deals</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        {/* <li><Link href="/refundpolicies">Refund Policies</Link></li> */}
        <li><Link href="/faqs">FAQ's</Link></li>

        {/* COMBINED EVENTS MEGA MENU */}
        <li 
          className="relative group"
          onMouseEnter={() => setActiveEventCategory('salesMeets')}
          onMouseLeave={() => setActiveEventCategory('salesMeets')}
        >
          <button className="flex items-center cursor-pointer">
            Events
            <ChevronDown size={16} className="ml-2" />
          </button>
          
          <div className="absolute right-0 top-full mt-2 w-[450px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white backdrop-blur-md border border-grey">
            <div className="flex p-6">
              {/* Events Categories Sidebar */}
              <div className="w-1/3 pr-6 border-r border-gray">
                <ul className="space-y-4">
                  {Object.entries(eventsData).map(([key, category]) => (
                    <li key={key} onMouseEnter={() => setActiveEventCategory(key)}>
                      <Link
                        href={category.href || '#'}
                        className={`block px-4 py-3 rounded-lg cursor-pointer transition-all ${
                          activeEventCategory === key ? 'bg-[#0192D3] text-white' : 'text-black hover:bg-[#0192D3] hover:text-white'
                        }`}
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Events Panel */}
              <div className="w-2/3 pl-6">
                {activeEventCategory && eventsData[activeEventCategory] && (
                  <ul className="space-y-3">
                    {eventsData[activeEventCategory].items.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className="block px-4 py-3 rounded-lg text-lg font-normal text-black hover:text-white hover:bg-[#0192D3] transition-all"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
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
          {/* MAIN MENU */}
          {!mobileProjectsOpen && !mobileEventsOpen ? (
            <ul className="flex flex-col items-start p-6 gap-6 font-medium text-lg text-white">
              <li>
                <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl hover:text-[#0192D3] transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setIsOpen(false)} className="text-2xl hover:text-[#0192D3] transition-all">
                  About Us
                </Link>
              </li>
              <li className="w-full">
                <button
                  onClick={() => setMobileProjectsOpen(true)}
                  className="flex items-center justify-between w-full text-2xl hover:text-[#0192D3] transition-all"
                >
                  Projects
                  <ChevronDown size={24} className="rotate-90" />
                </button>
              </li>
              <li>
                <Link href="/quickdeals" onClick={() => setIsOpen(false)} className="text-2xl hover:text-[#0192D3] transition-all">
                  Quick Deals
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="text-2xl hover:text-[#0192D3] transition-all">
                  Contact
                </Link>
              </li>
              {/* <li>
                <Link href="/refundpolicies" onClick={() => setIsOpen(false)} className="text-2xl hover:text-[#0192D3] transition-all">
                  Refund Policies
                </Link>
              </li> */}
              <li>
                <Link href="/faqs" onClick={() => setIsOpen(false)} className="text-2xl hover:text-[#0192D3] transition-all">
                  FAQ's
                </Link>
              </li>
              <li className="w-full">
                <button
                  onClick={() => setMobileEventsOpen(true)}
                  className="flex items-center justify-between w-full text-2xl hover:text-[#0192D3] transition-all"
                >
                  Events
                  <ChevronDown size={24} className="rotate-90" />
                </button>
              </li>
            </ul>

          ) : mobileProjectsOpen ? (

            /* PROJECTS SUBMENU */
            <div className="flex flex-col h-full">
              <div className="flex items-center p-6 border-b border-gray-700">
                <button
                  onClick={() => setMobileProjectsOpen(false)}
                  className="flex items-center text-white text-xl hover:text-[#0192D3]"
                >
                  <ArrowLeft size={24} className="mr-2" />
                  Back
                </button>
              </div>

              <div className="flex flex-1">
                <div className="w-2/5 bg-gray-900 border-r border-gray-700">
                  <ul className="py-4">
                    {Object.entries(projectsData).map(([key, category]) => (
                      <li key={key}>
                        <button
                          onClick={() => setActiveCategory(key)}
                          className={`w-full px-6 py-4 text-left text-lg transition-all ${
                            activeCategory === key
                              ? 'bg-[#0192D3] text-white'
                              : 'text-gray-300 hover:bg-[#0192D3] hover:text-white'
                          }`}
                        >
                          {category.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-3/5 bg-black overflow-y-auto">
                  <ul className="py-4">
                    {projectsData[activeCategory].projects.map((project, i) => (
                      <li key={i}>
                        <Link
                          href={project.href}
                          onClick={() => {
                            setIsOpen(false);
                            setMobileProjectsOpen(false);
                          }}
                          className="block px-6 py-4 text-lg text-gray-300 hover:bg-[#0192D3] hover:text-white border-b border-gray-800"
                        >
                          {project.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          ) : (

            /* COMBINED EVENTS SUBMENU */
            <div className="flex flex-col h-full">
              <div className="flex items-center p-6 border-b border-gray-700">
                <button
                  onClick={() => setMobileEventsOpen(false)}
                  className="flex items-center text-white text-xl hover:text-[#0192D3]"
                >
                  <ArrowLeft size={24} className="mr-2" />
                  Back
                </button>
              </div>

              <div className="flex flex-1">
                {/* Events Categories Sidebar */}
                <div className="w-2/5 bg-gray-900 border-r border-gray-700">
                  <ul className="py-4">
                    {Object.entries(eventsData).map(([key, category]) => (
                      <li key={key}>
                        {/* Changed from Link to button so it doesn't navigate on mobile */}
                        <button
                          onClick={() => setActiveEventCategory(key)}
                          className={`block w-full px-6 py-4 text-left text-lg transition-all ${
                            activeEventCategory === key
                              ? 'bg-[#0192D3] text-white'
                              : 'text-gray-300 hover:bg-[#0192D3] hover:text-white'
                          }`}
                        >
                          {category.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Events Links Panel */}
                <div className="w-3/5 bg-black overflow-y-auto">
                  <ul className="py-4">
                    {eventsData[activeEventCategory].items.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.href}
                          onClick={() => {
                            setIsOpen(false);
                            setMobileEventsOpen(false);
                          }}
                          className="block px-6 py-4 text-lg text-gray-300 hover:bg-[#0192D3] hover:text-white border-b border-gray-800"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}