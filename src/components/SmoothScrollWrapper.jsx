'use client';

import React from 'react';
import useLenisScroll from '@/lib/useLenisScroll';

const SmoothScrollWrapper = ({ children }) => {
  useLenisScroll();
  return <>{children}</>;
};

export default SmoothScrollWrapper;
