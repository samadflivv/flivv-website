'use client';

import React, { useEffect } from 'react';

const RFSForm = () => {
  useEffect(() => {
    const existing = document.querySelector('script[data-rfs-hs="21626983"]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://js-na2.hsforms.net/forms/embed/21626983.js';
      s.defer = true;
      s.setAttribute('data-rfs-hs', '21626983');
      document.body.appendChild(s);
      s.addEventListener('load', () => {
        try {
          if (window.hbspt && window.hbspt.forms && typeof window.hbspt.forms.create === 'function') {
            window.hbspt.forms.create({
              portalId: '21626983',
              formId: 'fe48d8bb-c0aa-41d3-8f45-a54c78e57d79',
              target: '#rfs-hs-form-target',
            });
          }
        } catch (e) {}
      });
    } else {
      setTimeout(() => {
        try {
          if (window.hbspt && window.hbspt.forms && typeof window.hbspt.forms.create === 'function') {
            window.hbspt.forms.create({
              portalId: '21626983',
              formId: 'fe48d8bb-c0aa-41d3-8f45-a54c78e57d79',
              target: '#rfs-hs-form-target',
            });
          }
        } catch (e) {}
      }, 300);
    }
  }, []);

  return (
    <div id="rfs-hs-form-wrapper" className="rfs-hs-form-wrapper">
      <div className="rfs-hs-header pt-5 pl-5">
        <h3>Let's arrange a visit</h3>
        <p>Tell us a preferred date/time and we'll confirm availability.</p>
      </div>

      <div
        id="rfs-hs-form-target"
        className="hs-form-frame"
        data-region="na2"
        data-form-id="fe48d8bb-c0aa-41d3-8f45-a54c78e57d79"
        data-portal-id="21626983"
      />

      <style jsx>{`

#rfs-hs-form-wrapper, 
#rfs-hs-form-wrapper * {
  scroll-snap-align: none !important;
  scroll-snap-stop: normal !important;
}

        /* Wrapper - force its own composite layer to avoid repaint flicker while scrolling */
        .rfs-hs-form-wrapper {
          max-width: 900px;
          margin: 0 auto;
          padding: 24px;
          border-radius: 22px;
          background: linear-gradient(180deg, #03170f 0%, #082818 100%);
          box-shadow: 20px 30px 60px rgba(8,28,21,0.22), -10px -10px 30px rgba(255,255,255,0.02);
          color: #e8f8f0;

          /* PERFORMANCE TUNING - create a composited layer */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          will-change: transform;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-perspective: 1000;
          -webkit-overflow-scrolling: touch;
        }

        .rfs-hs-header h3 {
          margin: 0 0 8px 0;
          font-size: 36px;
          line-height: 1.05;
          color: #e8f8f0;
          font-weight: 600;
        }

        .rfs-hs-header p {
          margin: 0 0 0;
          color: #cfeee0;
          opacity: 0.9;
        }

        /* Scoped styles for HubSpot form elements (target only within this wrapper) */
        #rfs-hs-form-target .hs-form { width: 100%; }

        #rfs-hs-form-target .hs-form-field { margin-bottom: 18px; }

        /* Inputs / textarea / select: avoid costly box-shadow transitions while scrolling */
        #rfs-hs-form-target input[type="text"],
        #rfs-hs-form-target input[type="email"],
        #rfs-hs-form-target input[type="tel"],
        #rfs-hs-form-target textarea,
        #rfs-hs-form-target select {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.03);
          background: linear-gradient(180deg, rgba(0,0,0,0.18), rgba(255,255,255,0.01));
          color: #dff8ec;
          box-shadow: inset 6px 6px 14px rgba(0,0,0,0.6), inset -6px -6px 12px rgba(255,255,255,0.02);
          font-size: 15px;
          outline: none;

          /* PERFORMANCE: do not animate box-shadow (avoid repaints). only animate transform. */
          transition: transform .06s ease;
          -webkit-transform: translateZ(0);
        }

        #rfs-hs-form-target input::placeholder,
        #rfs-hs-form-target textarea::placeholder {
          color: rgba(230,246,236,0.45);
        }

        /* Focus state without animated shadow to avoid repaint jank */
        #rfs-hs-form-target input:focus,
        #rfs-hs-form-target textarea:focus,
        #rfs-hs-form-target select:focus {
          border-color: rgba(82,183,136,0.4);
          box-shadow:
            inset 6px 6px 14px rgba(0,0,0,0.68),
            inset -6px -6px 12px rgba(255,255,255,0.02);
          /* keep transition minimal */
          transform: translateZ(0);
        }

        /* textarea sizing */
        #rfs-hs-form-target textarea { min-height: 110px; resize: vertical; }

        /* Button (keep small transform transitions only) */
        #rfs-hs-form-target .hs-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 999px;
          background: linear-gradient(180deg,#52B788,#2D6A4F);
          color: #fff;
          font-weight: 600;
          font-size: 16px;
          border: none;
          box-shadow: 0 12px 30px rgba(18,60,50,0.28), inset 0 -4px 8px rgba(0,0,0,0.12);
          cursor: pointer;
          /* keep only transform animated */
          transition: transform .12s ease;
          will-change: transform;
        }

        #rfs-hs-form-target .hs-button:hover { transform: translateY(-3px); }

        /* small device adjustments */
@media (max-width: 640px) {
  .rfs-hs-form-wrapper {
    padding: 28px 14px 20px; /* top padding ↑, sides reduced */
    border-radius: 16px;
  }
  .rfs-hs-header h3 {
    font-size: 24px;
  }
  #rfs-hs-form-target input[type="text"],
  #rfs-hs-form-target input[type="email"],
  #rfs-hs-form-target input[type="tel"],
  #rfs-hs-form-target textarea,
  #rfs-hs-form-target select {
    padding: 10px 12px;  /* tighter padding inside inputs */
    font-size: 14px;     /* slightly smaller text */
  }
  #rfs-hs-form-target textarea { min-height: 90px; }
  #rfs-hs-form-target .hs-button {
    width: 100%;         /* full-width CTA on mobile */
    justify-content: center;
  }
}
#rfs-hs-form-target select { padding: 12px; }
        }
      `}</style>
    </div>
  );
};

export default RFSForm;
