import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const RegistrationFormHubSpot = ({
  formId = '417fd073-67f4-4e82-90f6-20d056f919fa',
  portalId = '21626983',
  region = 'na2',
  lazy = true,
  prefill = null,
  prefillFromUrl = ['name', 'email', 'phone', 'preferredSlot', 'utm_source', 'utm_campaign'],
  onSuccess = null,
  className = '',
  eventData = null,
}) => {
  // State
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Refs
  const formRef = useRef(null);
  const successRef = useRef(null);
  const inViewRef = useRef(null);
  const formInstanceRef = useRef(null);
  
  // Global script loading flag
  const scriptLoadRef = useRef({ loading: false, loaded: false });
  
  // Check if component is in view
  const isInView = useInView(inViewRef, {
    amount: lazy ? 0.25 : 1,
    once: true,
  });

  // Get prefill data
  const prefillData = useMemo(() => {
    const data = {};
    
    // From URL parameters
    if (typeof window !== 'undefined' && prefillFromUrl.length > 0) {
      const urlParams = new URLSearchParams(window.location.search);
      prefillFromUrl.forEach(key => {
        const value = urlParams.get(key);
        if (value) data[key] = value;
      });
    }
    
    // Merge with prop data
    if (prefill && typeof prefill === 'object') {
      Object.assign(data, prefill);
    }
    
    // Map to HubSpot field names
    const fieldMap = {
      name: 'firstname',
      firstName: 'firstname',
      lastName: 'lastname',
      email: 'email',
      phone: 'phone',
      company: 'company',
      jobTitle: 'jobtitle',
      message: 'message',
      preferredSlot: 'preferred_slot',
      utm_source: 'utm_source',
      utm_campaign: 'utm_campaign',
    };
    
    const transformed = {};
    Object.keys(data).forEach(key => {
      const hubspotKey = fieldMap[key] || key;
      transformed[hubspotKey] = data[key];
    });
    
    return transformed;
  }, [prefill, prefillFromUrl]);

  // Load HubSpot script
  const loadHubSpotScript = useCallback(() => {
    if (scriptLoadRef.current.loaded) {
      setIsScriptLoaded(true);
      return Promise.resolve();
    }

    if (scriptLoadRef.current.loading) {
      return new Promise((resolve) => {
        const check = setInterval(() => {
          if (scriptLoadRef.current.loaded) {
            clearInterval(check);
            setIsScriptLoaded(true);
            resolve();
          }
        }, 100);
      });
    }

    scriptLoadRef.current.loading = true;
    setLoading(true);

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://${region}.hsforms.net/forms/embed/v2.js`;
      script.defer = true;
      script.async = true;
      
      script.onload = () => {
        scriptLoadRef.current.loaded = true;
        scriptLoadRef.current.loading = false;
        setIsScriptLoaded(true);
        setLoading(false);
        resolve();
      };
      
      script.onerror = () => {
        scriptLoadRef.current.loading = false;
        setLoading(false);
        reject(new Error('Failed to load HubSpot form'));
      };
      
      document.head.appendChild(script);
    });
  }, [region]);

  // Mount form
  const mountHubSpotForm = useCallback((options = {}) => {
    if (!window.hbspt || !window.hbspt.forms) {
      console.error('HubSpot forms API not available');
      return null;
    }

    if (isMounted) return formInstanceRef.current;

    const targetId = `hubspot-form-${formId}`;
    const targetElement = document.querySelector(`#${targetId}`);
    if (!targetElement) {
      console.error(`Target element #${targetId} not found`);
      return null;
    }

    const config = {
      region,
      portalId,
      formId,
      target: `#${targetId}`,
      onFormSubmit: ($form) => {
        const formData = {};
        const inputs = $form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
          if (input.name) formData[input.name] = input.value;
        });
        
        setIsSubmitted(true);
        setShowSuccessModal(true);
        
        // Focus for screen readers
        setTimeout(() => {
          if (successRef.current) successRef.current.focus();
        }, 100);
        
        // Analytics
        if (window.gtag) {
          window.gtag('event', 'hubspot_form_submit', {
            form_id: formId,
            portal_id: portalId,
            page_location: window.location.pathname,
          });
        }
        
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'hubspot_form_submit',
            formId,
            portalId,
            page: window.location.pathname,
          });
        }
        
        // Custom callback
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(formData);
        }
      },
      onFormReady: ($form) => {
        // Prefill form fields
        if (Object.keys(prefillData).length > 0) {
          setTimeout(() => {
            Object.entries(prefillData).forEach(([field, value]) => {
              const input = $form.querySelector(`[name="${field}"]`);
              if (input) {
                input.value = value;
                // Trigger change event for HubSpot
                const event = new Event('change', { bubbles: true });
                input.dispatchEvent(event);
              }
            });
          }, 300);
        }
      },
      ...options,
    };

    try {
      formInstanceRef.current = window.hbspt.forms.create(config);
      setIsMounted(true);
      return formInstanceRef.current;
    } catch (err) {
      console.error('Failed to mount HubSpot form:', err);
      return null;
    }
  }, [region, portalId, formId, isMounted, prefillData, onSuccess]);

  // Load and mount form when in view
  useEffect(() => {
    if (!isInView) return;
    
    const initializeForm = async () => {
      try {
        await loadHubSpotScript();
        if (!isMounted) {
          mountHubSpotForm();
        }
      } catch (error) {
        console.error('Error initializing HubSpot form:', error);
      }
    };
    
    initializeForm();
  }, [isInView, loadHubSpotScript, mountHubSpotForm, isMounted]);

  // Generate ICS file
  const generateICS = (eventData) => {
    const {
      title = 'Event Registration',
      description = '',
      location = '',
      startDate,
      endDate,
      organizer = 'Event Organizer',
      organizerEmail = '',
    } = eventData;
    
    const formatDate = (date) => {
      if (!date) return new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const d = new Date(date);
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Event Registration//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@event-registration`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `ORGANIZER;CN="${organizer}":mailto:${organizerEmail}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    
    return new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  };

  // Calendar handlers
  const handleAddToCalendar = (type = 'ics') => {
    if (!eventData) return;
    
    if (type === 'google') {
      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: eventData.title || 'Event Registration',
        dates: `${eventData.startDate || ''}/${eventData.endDate || ''}`,
        details: eventData.description || '',
        location: eventData.location || '',
      });
      window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
    } else {
      const icsBlob = generateICS(eventData);
      const url = URL.createObjectURL(icsBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${eventData.title || 'event'}.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDownloadBrochure = () => {
    if (eventData?.brochureUrl) {
      window.open(eventData.brochureUrl, '_blank');
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg ${className}`}>
      {/* Screen reader success announcement */}
      <div
        ref={successRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={-1}
      >
        {isSubmitted && 'Form submitted successfully. Thank you for registering!'}
      </div>

      {/* Form heading */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Register for Sessions
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Fill your details and our team will get back to confirm your slot.
        </p>
      </div>

      {/* Form container */}
      <div ref={inViewRef} className="relative min-h-[300px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading form...</div>
          </div>
        )}

        {!isInView && lazy && (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
            <p>Scroll to view registration form</p>
          </div>
        )}

        {(!lazy || isInView) && (
          <div
            id={`hubspot-form-${formId}`}
            ref={formRef}
            role="region"
            aria-label="Registration form"
            className="hs-form-frame-wrapper"
          />
        )}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowSuccessModal(false)}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                role="dialog"
                aria-labelledby="success-modal-title"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 id="success-modal-title" className="text-xl font-semibold text-gray-900 mb-2">
                    Registration Successful!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for registering. We'll send a confirmation email shortly.
                  </p>
                </div>

                {eventData && (
                  <div className="space-y-3 mb-6">
                    <button
                      onClick={() => handleAddToCalendar('ics')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Add to Calendar (ICS)
                    </button>
                    
                    <button
                      onClick={() => handleAddToCalendar('google')}
                      className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Add to Google Calendar
                    </button>

                    {eventData.brochureUrl && (
                      <button
                        onClick={handleDownloadBrochure}
                        className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Brochure
                      </button>
                    )}
                  </div>
                )}

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-[#007A3D] hover:bg-[#00662F] text-white font-medium py-3 px-4 rounded-lg transition"
                  autoFocus
                >
                  Close
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegistrationFormHubSpot;     