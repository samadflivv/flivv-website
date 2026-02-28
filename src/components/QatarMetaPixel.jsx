'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function QatarMetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      // Initialize SECOND pixel
      window.fbq('init', process.env.NEXT_PUBLIC_QATAR_PIXEL_ID);

      // Track PageView for SECOND pixel
      window.fbq('track', 'PageView');
    }
  }, [pathname]);

  return null;
}