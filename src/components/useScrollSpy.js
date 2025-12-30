import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scrollspy functionality
 */
export const useScrollSpy = ({
  sectionIds = [],
  rootMargin = '-30% 0px -30% 0px',
  threshold = [0.25, 0.5, 0.75],
  offsetTop = 0,
  offsetBottom = 0,
}) => {
  const [activeSection, setActiveSection] = useState('');
  const observerRef = useRef(null);

  useEffect(() => {
    if (!sectionIds.length) return;

    const adjustedRootMargin = `-${30 + offsetTop}px 0px -${30 + offsetBottom}px 0px`;

    const options = {
      root: null,
      rootMargin: adjustedRootMargin,
      threshold,
    };

    const handleIntersect = (entries) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // Find the entry with the highest intersection ratio
        const mostVisible = visibleEntries.reduce((prev, current) => 
          current.intersectionRatio > prev.intersectionRatio ? current : prev
        );
        
        setActiveSection(mostVisible.target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);

    // Observe all section elements
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds, rootMargin, threshold, offsetTop, offsetBottom]);

  return activeSection;
};

/**
 * Hook for programmatic smooth scrolling
 */
export const useSmoothScroll = ({
  duration = 600,
  offset = 0,
  useGSAP = false,
}) => {
  const [gsap, setGsap] = useState(null);

  useEffect(() => {
    if (useGSAP && typeof window !== 'undefined') {
      import('gsap').then((gsapModule) => {
        import('gsap/ScrollTrigger').then((scrollTriggerModule) => {
          gsapModule.default.registerPlugin(scrollTriggerModule.default);
          setGsap(gsapModule.default);
        });
      });
    }
  }, [useGSAP]);

  const scrollTo = useCallback((elementId, options = {}) => {
    const targetEl = document.getElementById(elementId);
    if (!targetEl) return;

    const {
      customOffset = offset,
      customDuration = duration,
      onComplete,
    } = options;

    if (useGSAP && gsap) {
      gsap.to(window, {
        duration: customDuration / 1000,
        scrollTo: {
          y: targetEl,
          offsetY: customOffset,
        },
        ease: 'power2.out',
        onComplete,
      });
    } else {
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - customOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      if (onComplete) {
        setTimeout(onComplete, customDuration);
      }
    }

    // Update URL hash
    window.history.pushState(null, null, `#${elementId}`);
  }, [gsap, useGSAP, duration, offset]);

  return { scrollTo };
};