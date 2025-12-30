import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * FloatingJumpNav Component
 * A sticky vertical navigation for page section jumping with scrollspy
 */
const FloatingJumpNav = ({
  sections = [],
  position = 'right',
  offsetTop = 0,
  offsetBottom = 0,
  showLabels = false,
  collapsedOnMobile = true,
  mobileBreakpoint = 'md',
  scrollDuration = 600,
  useGSAP = false,
  activeClass = 'bg-[#602437] text-white shadow-lg',
  inactiveClass = 'bg-white/90 text-gray-700 hover:bg-white shadow',
  themeClass = '',
  ariaLabel = 'Page sections navigation',
  onChangeActive,
  onClick,
  className = '',
}) => {
  const [activeSection, setActiveSection] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navRef = useRef(null);
  const itemRefs = useRef([]);
  const observerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const prefersReducedMotion = shouldReduceMotion;

  // GSAP imports (conditional)
  const [gsap, setGsap] = useState(null);
  const [ScrollTrigger, setScrollTrigger] = useState(null);

  // Initialize GSAP if enabled
  useEffect(() => {
    if (useGSAP && typeof window !== 'undefined') {
      import('gsap').then((gsapModule) => {
        import('gsap/ScrollTrigger').then((scrollTriggerModule) => {
          gsapModule.default.registerPlugin(scrollTriggerModule.default);
          setGsap(gsapModule.default);
          setScrollTrigger(scrollTriggerModule.default);
        });
      });
    }
  }, [useGSAP]);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const breakpoint = mobileBreakpoint === 'sm' ? 640 :
                        mobileBreakpoint === 'md' ? 768 :
                        mobileBreakpoint === 'lg' ? 1024 :
                        mobileBreakpoint === 'xl' ? 1280 : 768;
      setIsMobile(window.innerWidth < breakpoint);
      if (collapsedOnMobile) {
        setCollapsed(window.innerWidth < breakpoint);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint, collapsedOnMobile]);

  // Setup IntersectionObserver for scrollspy
  useEffect(() => {
    if (!sections.length) return;

    const options = {
      root: null,
      rootMargin: `-${30 + offsetTop}px 0px -${30 + offsetBottom}px 0px`,
      threshold: [0.25, 0.5, 0.75],
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const visibleEntry = entries.find(e => e.isIntersecting);
          if (visibleEntry) {
            setActiveSection(visibleEntry.target.id);
            if (onChangeActive) {
              onChangeActive(visibleEntry.target.id);
            }
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);

    // Observe all section elements
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections, offsetTop, offsetBottom, onChangeActive]);

  // Setup GSAP ScrollTrigger if enabled
  useEffect(() => {
    if (!useGSAP || !gsap || !ScrollTrigger || !sections.length) return;

    const triggers = sections.map((section) => {
      const el = document.getElementById(section.id);
      if (!el) return null;

      return ScrollTrigger.create({
        trigger: el,
        start: `top ${50 + offsetTop}%`,
        end: `bottom ${50 - offsetBottom}%`,
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(section.id);
            if (onChangeActive) onChangeActive(section.id);
          }
        },
      });
    }).filter(Boolean);

    return () => {
      triggers.forEach(trigger => trigger && trigger.kill());
    };
  }, [useGSAP, gsap, ScrollTrigger, sections, offsetTop, offsetBottom, onChangeActive]);

  // Smooth scroll function
  const scrollToSection = useCallback((sectionId, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const targetEl = document.getElementById(sectionId);
    if (!targetEl) return;

    const section = sections.find(s => s.id === sectionId);
    const offset = section?.offset || offsetTop;

    if (onClick) {
      onClick(sectionId);
    }

    if (useGSAP && gsap) {
      gsap.to(window, {
        duration: prefersReducedMotion ? 0 : scrollDuration / 1000,
        scrollTo: {
          y: targetEl,
          offsetY: offset,
        },
        ease: 'power2.out',
      });
    } else {
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }

    // Update URL hash without jumping
    if (window.history.pushState) {
      window.history.pushState(null, null, `#${sectionId}`);
    } else {
      window.location.hash = `#${sectionId}`;
    }
  }, [sections, offsetTop, scrollDuration, useGSAP, gsap, prefersReducedMotion, onClick]);

  // Keyboard navigation
  const handleKeyDown = (event, index) => {
    const totalItems = sections.length;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (index + 1) % totalItems;
        itemRefs.current[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = (index - 1 + totalItems) % totalItems;
        itemRefs.current[prevIndex]?.focus();
        break;
      case 'Home':
        event.preventDefault();
        itemRefs.current[0]?.focus();
        scrollToSection(sections[0].id);
        break;
      case 'End':
        event.preventDefault();
        itemRefs.current[totalItems - 1]?.focus();
        scrollToSection(sections[totalItems - 1].id);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        scrollToSection(sections[index].id);
        break;
      default:
        break;
    }
  };

  // Toggle collapse state
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Position classes
  const positionClasses = {
    right: 'right-4',
    left: 'left-4',
  };

  // Mobile toggle button
  const MobileToggle = () => (
    <motion.button
      className="md:hidden fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-[#602437] text-white shadow-lg flex items-center justify-center"
      onClick={toggleCollapse}
      aria-label={collapsed ? 'Open navigation' : 'Close navigation'}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {collapsed ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        )}
      </svg>
    </motion.button>
  );

  // Progress line calculation
  const calculateProgress = () => {
    if (!sections.length) return 0;
    const activeIndex = sections.findIndex(s => s.id === activeSection);
    return activeIndex >= 0 ? (activeIndex / (sections.length - 1)) * 100 : 0;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {collapsedOnMobile && isMobile && <MobileToggle />}

      {/* Main Navigation */}
      <motion.nav
        ref={navRef}
        className={`
          fixed ${positionClasses[position]} 
          top-1/2 transform -translate-y-1/2
          z-50
          ${themeClass}
          ${className}
          ${collapsedOnMobile && isMobile && collapsed ? 'hidden' : 'block'}
          ${collapsedOnMobile && isMobile ? 'md:block' : 'block'}
        `}
        style={{
          top: `calc(50% + ${offsetTop}px)`,
          bottom: offsetBottom ? `${offsetBottom}px` : 'auto',
        }}
        aria-label={ariaLabel}
        initial={{ opacity: 0, x: position === 'right' ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      >
        {/* Progress Line */}
        {sections.length > 1 && (
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200/50 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-[#602437]"
              initial={{ height: '0%' }}
              animate={{ height: `${calculateProgress()}%` }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            />
          </div>
        )}

        {/* Navigation Items */}
        <ul className="flex flex-col gap-3 items-center">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            const isHovered = hoveredItem === index;

            return (
              <motion.li
                key={section.id}
                className="relative"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                {/* Tooltip */}
                {(isHovered || showLabels) && (
                  <motion.div
                    className={`
                      absolute ${position === 'right' ? 'right-full mr-3' : 'left-full ml-3'}
                      top-1/2 transform -translate-y-1/2
                      bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap
                      shadow-lg
                    `}
                    initial={{ opacity: 0, x: position === 'right' ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {section.tooltip || section.label}
                    {/* Tooltip arrow */}
                    <div className={`
                      absolute top-1/2 transform -translate-y-1/2
                      ${position === 'right' ? '-right-1' : '-left-1'}
                      w-2 h-2 bg-black rotate-45
                    `} />
                  </motion.div>
                )}

                {/* Navigation Button */}
                <button
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={`
                    w-10 h-10 md:w-12 md:h-12
                    rounded-full flex items-center justify-center
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-[#602437] focus:ring-offset-2
                    ${isActive ? activeClass : inactiveClass}
                  `}
                  onClick={(e) => scrollToSection(section.id, e)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-label={`Jump to ${section.label}`}
                  aria-describedby={section.tooltip ? `tooltip-${section.id}` : undefined}
                  aria-current={isActive ? 'true' : 'false'}
                  tabIndex={collapsed ? -1 : 0}
                >
                  {/* Icon or Label */}
                  {section.icon ? (
                    <span className="w-5 h-5 md:w-6 md:h-6">
                      {section.icon}
                    </span>
                  ) : (
                    <span className="text-sm font-medium">
                      {section.label.charAt(0)}
                    </span>
                  )}

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-[#602437]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>

                {/* Show label next to icon on desktop if enabled */}
                {showLabels && !isMobile && (
                  <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-sm font-medium text-gray-700">
                    {section.label}
                  </span>
                )}
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>
    </>
  );
};

export default FloatingJumpNav;