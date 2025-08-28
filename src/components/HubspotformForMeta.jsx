'use client';

import { useEffect } from 'react';
import { Button } from './button';
import AnimatedBTN from './AnimatedBTN';

export default function HubspotForm() {
  useEffect(() => {
    const checkFormSubmit = () => {
      const iframe = document.querySelector('.hs-form-frame iframe');

      if (!iframe) return;

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      iframeDoc.addEventListener('submit', (e) => {
        // Client-side tracking
        if (typeof window.fbq !== 'undefined') {
          window.fbq('track', 'Lead');
        }

        // Get email from form if possible (optional)
        const emailInput = iframeDoc.querySelector('input[type=email]');
        const email = emailInput ? emailInput.value : '';

        // Server-side API call (Conversions API)
        fetch('/api/meta-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_name: 'Lead',
            user_data: {
              em: email,
            },
            custom_data: {
              value: 1000,
              currency: 'INR',
            },
          }),
        });
      });
    };

    // Retry until the form loads
    const interval = setInterval(() => {
      const iframe = document.querySelector('.hs-form-frame iframe');
      if (iframe) {
        clearInterval(interval);
        checkFormSubmit();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className='p-40 bg-black flex flex-col justify-center'>
      <div className="absolute top-1/2 left-1/6 w-96 h-60 bg-indigo-600 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/2 right-1/6 w-60 h-65 bg-purple-600 rounded-full filter blur-3xl"></div>
      <script src="https://js.hsforms.net/forms/embed/21626983.js" defer></script>
      <div
        className="hs-form-frame bg-white/20 text-white text-lg border border-white py-6 px-6 font-semibold backdrop-blur-md rounded-4xl"
        data-region="na1"
        data-form-id="7c963f94-68ed-449d-953f-f9bbdb19c6aa"
        data-portal-id="21626983"
      />
      <a href="/gulmoharvillas">
        <Button className='bg-[#E509EF]/30 text-white text-lg border border-white py-6 px-6 font-semibold backdrop-blur-md rounded-4xl'>Visit Gulmohar Page</Button>
      </a>
    </div>
    </>
  );
}

