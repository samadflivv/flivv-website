// app/page.jsx or pages/index.jsx (depending on your Next.js version)
'use client'; // Required for Next.js 13+ with app router

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function EventFormPage() {
  const [isFormLoaded, setIsFormLoaded] = useState(false);

  useEffect(() => {
    // Function to load HubSpot form after script loads
    const loadHubSpotForm = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na2",
          portalId: "21626983",
          formId: "32a66b29-2a52-4d80-8e72-a0f2226058f0",
          target: "#hubspot-form-container"
        });
        setIsFormLoaded(true);
      }
    };

    // Check if script already loaded
    if (window.hbspt) {
      loadHubSpotForm();
    } else {
      // If not loaded yet, wait a bit and check again
      const checkInterval = setInterval(() => {
        if (window.hbspt) {
          loadHubSpotForm();
          clearInterval(checkInterval);
        }
      }, 100);

      // Clear interval after 5 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.hbspt) {
          console.error('HubSpot script failed to load');
        }
      }, 5000);

      return () => clearInterval(checkInterval);
    }
  }, []);

  return (
    <>
      {/* Preconnect links in Head for performance */}
      <link rel="preconnect" href="https://js-na2.hsforms.net" />
      <link rel="preconnect" href="https://forms.hubspot.com" />
      
      {/* Load HubSpot Script */}
      <Script
        src="https://js.hsforms.net/forms/v2.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('HubSpot script loaded');
        }}
        onError={(e) => {
          console.error('HubSpot script failed to load', e);
        }}
      />
      
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-b from-blue-500  flex items-center justify-center px-4 py-12 ">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
              Join us for an invite-only dinner with Premium Investment Options
            </h1>
            <p className="text-lg font-semibold text-gray-600">
              Venue: Hyatt Place - Hyderabad Banjara Hills
            </p>
          </div>
          
          {/* Form Container with Loading State */}
          <div id="hubspot-form-container" className="min-h-[300px]">
            {!isFormLoaded && (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
                <p className="text-gray-500">Loading registration form...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fallback Script for Older Browsers */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Fallback script loader
            if (!window.hbspt && !document.querySelector('script[src*="hsforms.net"]')) {
              var script = document.createElement('script');
              script.src = 'https://js.hsforms.net/forms/v2.js';
              script.async = true;
              script.defer = true;
              document.head.appendChild(script);
            }
          `,
        }}
      />
    </>
  );
}