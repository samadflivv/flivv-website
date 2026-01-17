'use client';
import Head from "next/head";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import ATProgressRoadmap from "./ATProgressRoadmap";

/* ---------------------------
   Icons (unchanged)
   --------------------------- */
const MapPin = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const MapPinandlocation = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const Home = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const CheckCircle = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Road = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>;
const Shield = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const Document = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const ArrowRight = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;
const PlotIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15V9a2 2 0 012-2h14a2 2 0 012 2v6" /></svg>;
const SizeIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" /></svg>;

/* ---------------------------
   Component
   --------------------------- */
export default function AirportTown() {
  // gallery state
  const [activeImage, setActiveImage] = useState(0);

  // video state
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // retry counter for video errors (use ref so updates don't re-render)
  const videoRetryRef = useRef(0);

  // memoize gallery images so array isn't recreated every render
  const galleryImages = useMemo(() => ([
    "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/AirportTown/DJI_20251013083416_0013_D-min%20(1)%20(1)%20(1).jpg",
    "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/AirportTown/DJI_20251013085037_0036_D-min%20(1)%20(1)%20(1).jpg",
    "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/AirportTown/WhatsApp%20Image%202025-11-17%20at%2012.32.02%20PM%20(1).jpeg",
    "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/AirportTown/WhatsApp%20Image%202025-11-17%20at%2012.32.02%20PM.jpeg",
    "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/AirportTown/WhatsApp%20Image%202025-11-17%20at%2012.32.01%20PM.jpeg",
    "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/AirportTown/WhatsApp%20Image%202025-11-17%20at%2012.32.00%20PM.jpeg"
  ]), []);

  // small optimization: stable handler
  const onThumbClick = useCallback((i) => {
    setActiveImage(i);
  }, []);


  useEffect(() => {
    const wrapper = videoWrapperRef.current;
    if (!wrapper) return;

    // Create observer to start loading the video only when visible
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
          } else {
            // pause to save CPU/bandwidth when user scrolls away
            try {
              if (videoRef.current && !videoRef.current.paused) {
                videoRef.current.pause();
              }
            } catch (e) { /* ignore */ }
          }
        });
      },
      { threshold: 0.5 }
    );

    obs.observe(wrapper);
    return () => {
      obs.disconnect();
    };
  }, []);

  // When we should load the video, programmatically add source and play
  useEffect(() => {
    if (!shouldLoadVideo) return;
    const video = videoRef.current;
    if (!video) return;

    // If source already exists and loaded, do nothing
    if (video.dataset.srcset === "1") {
      // ensure playback attempt
      video.play().catch(() => {});
      return;
    }

    const SRC = "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/AIRPORT%20TOWN%20DRONE.mp4";

    // helper to attempt load+play
    let cancelled = false;
    const tryLoad = async () => {
      if (cancelled) return;
      try {
        // set src directly on video to avoid <source> load quirks across browsers
        video.src = SRC;
        // ensure we don't preload until explicitly told
        video.preload = "auto";
        // attach listeners
        const onLoadedData = () => {
          setIsVideoLoaded(true);
          // autoplay (muted) attempt
          video.play().catch(() => {});
        };
        const onCanPlay = () => {
          setIsVideoLoaded(true);
        };
        const onError = async () => {
          // attempt a couple of retries. Some browsers/network states can fail transiently.
          videoRetryRef.current += 1;
          if (videoRetryRef.current <= 2 && !cancelled) {
            // small exponential backoff
            const backoff = 400 * videoRetryRef.current;
            setTimeout(() => {
              // reload without cache-busting (prefer cached), just reassign src and load
              try {
                video.load();
                video.play().catch(() => {});
              } catch (e) {}
            }, backoff);
          } else {
            // failed permanently: show loader + keep trying silently in background
            setIsVideoLoaded(false);
          }
        };

        video.addEventListener('loadeddata', onLoadedData);
        video.addEventListener('canplay', onCanPlay);
        video.addEventListener('error', onError);

        // start load
        video.load();

        // try to play (muted) - many browsers allow muted autoplay
        video.muted = true;
        video.playsInline = true;
        await video.play().catch(() => {
          // play() can fail - not a blocker, the 'loadeddata' event will still fire
        });

        // mark we've set the source so subsequent effects won't redo work
        video.dataset.srcset = "1";

        // cleanup function for listeners
        return () => {
          cancelled = true;
          try {
            video.removeEventListener('loadeddata', onLoadedData);
            video.removeEventListener('canplay', onCanPlay);
            video.removeEventListener('error', onError);
          } catch (e) {}
        };
      } catch (err) {
        // any unexpected error, set not loaded
        setIsVideoLoaded(false);
      }
    };

    const cleanupPromise = tryLoad();

    // no-op cleanup (if tryLoad returned cleanup)
    return () => {
      // If tryLoad returned a cleanup function synchronously, call it.
      // In our implementation above it's enough to rely on cancelled flag and removeEventListener in closure.
      // But we'll also attempt to pause the video.
      try {
        if (video) {
          video.pause();
        }
      } catch (e) {}
    };
  }, [shouldLoadVideo]);

  // handler for loaded event (visual)
  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);



   /* ---------------------------
     HubSpot script (load once)
     --------------------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__hs_forms_injected) return; // guard
    if (!window.hbspt) {
      const s = document.createElement('script');
      s.src = "https://js.hsforms.net/forms/v2.js";
      s.async = true;
      s.onload = () => { window.__hs_forms_injected = true; };
      document.head.appendChild(s);
    } else {
      window.__hs_forms_injected = true;
    }
  }, []);
  

  // Add this useEffect with your other useEffects
useEffect(() => {
  // Load HubSpot form for sales meet
  const loadSalesMeetForm = () => {
    if (window.hbspt && window.hbspt.forms) {
      try {
        hbspt.forms.create({
          portalId: "21626983",
          formId: "7b23bd69-e828-4e55-b869-b895c8233781",
          target: "#hubspot-form-sales-meet",
          css: "",
          submitButtonClass: "w-full py-3 rounded-lg font-semibold transition-all hover:scale-105",
          cssClass: "hs-form sales-meet-form",
          onFormReady: function($form) {
            // Customize form appearance after it loads
            const submitButton = $form.querySelector('.hs-button');
            if (submitButton) {
              submitButton.style.backgroundColor = "#44312b";
              submitButton.style.color = "#e0dfd8";
            }
            
            // Add placeholders if needed
            const inputs = $form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
              if (!input.placeholder) {
                if (input.type === 'text') input.placeholder = "Enter your " + (input.name || "information");
                if (input.type === 'email') input.placeholder = "your@email.com";
                if (input.type === 'tel') input.placeholder = "Phone number";
              }
            });
          }
        });
      } catch (e) { 
        console.error('HubSpot sales meet form error', e); 
      }
    } else {
      setTimeout(loadSalesMeetForm, 500);
    }
  };

  if (typeof window !== "undefined") {
    loadSalesMeetForm();
  }
}, []);




  /* ---------------------------
     Render
     --------------------------- */
  return (
    <>
      <Head>
        <title>Airport Town — Flivv Developers</title>
        <meta name="description" content="Airport Town — premium open plots by Flivv Developers, 2 km from NH-44. Limited 36 plots. HMDA approved GP Layout." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* preconnect to CDN to speed up initial image requests */}
        <link rel="preconnect" href="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com" />
      </Head>

      <div className="min-h-screen w-full font-sans antialiased bg-gradient-to-br from-[#e0dfd8] via-[#f0efe8] to-[#e8e7e0]" style={{ color: "#44312b" }}>
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden lg:h-screen flex items-center justify-center pt-40 lg:pt-25">
          <div className="absolute inset-0 bg-gradient-to-br from-[#44312b]/40 via-transparent to-[#e0dfd8]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#e0dfd8] via-transparent to-[#44312b]/40" />

          <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-8 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-6">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Limited Plots Available</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight" style={{ color: "#44312b" }}>
                  Airport <span className="bg-gradient-to-r from-[#44312b] to-[#8b7355] bg-clip-text text-transparent">Town</span>
                </h1>

                <p className="mt-6 text-xl text-[#44312b]/90 leading-relaxed max-w-2xl text-justify">
                  <strong>Airport Town by Flivv Developers </strong> is a premium, R1-zone project just 2 km from Bangalore Highway (NH-44). With only 36 plots, 30 ft internal roads, and quality development by Flivv, it offers strong residential and investment value.
                </p>

                <p className="mt-6 text-xl text-[#44312b]/90 leading-relaxed max-w-2xl text-justify">
                  The GP layout is HMDA-approved under LRS, making it ideal for both construction and long-term returns. Plot sizes start at 200 sq. yards. Close to Kothur town and daily conveniences, Airport Town is perfectly placed for future growth.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#contact" 
                    className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: "#44312b", color: "#e0dfd8" }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Inquire Now
                      <ArrowRight />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8b7355] to-[#44312b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                  
                  <a 
                    href="#ATvideo" 
                    className="group inline-flex items-center justify-center px-8 py-4 rounded-2xl text-lg font-medium border-2 transition-all duration-300 hover:scale-105"
                    style={{ borderColor: "#44312b", color: "#44312b", backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <span className="flex items-center gap-2">
                      Virtual Tour
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="bg-white/90 rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="p-2 rounded-full bg-[#44312b]/10">
                      <CheckCircle />
                    </div>
                    Quick Glance 
                  </div>
                  
                  <div>
                    {[
                      { icon: <PlotIcon />, label: "No. Of Units", value: "36", suffix: "Only" },
                      { icon: <SizeIcon />, label: "Minimum Plot Size", value: "200", suffix: "sq. yards" },
                      { icon: <Shield />, label: "Approval", value: "HMDA GP", suffix: "LRS" }
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-2xl hover:bg-[#44312b]/5 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-xl bg-[#44312b]/10">
                            {item.icon}
                          </div>
                          <div>
                            <div className="font-semibold">{item.label}</div>
                            <div className="text-sm text-gray-600">{item.suffix}</div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold" style={{ color: "#44312b" }}>
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <a 
                    href="#contact" 
                    className="w-full mt-6 inline-flex items-center justify-center py-4 rounded-2xl font-semibold transition-all hover:scale-105"
                    style={{ backgroundColor: "#44312b", color: "#e0dfd8" }}
                  >
                    Get Brochure
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

 <ATProgressRoadmap/> 
 

        {/* SHOWCASE SECTION */}
        <section id="showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div className="order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative bg-white/90 border border-white/20">
                <img 
                  src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/AirportTown/DJI_20251013083416_0013_D-min%20(1)%20(1)%20(1).jpg" 
                  alt="Airport Town site plan" 
                  className="w-full object-cover h-64 lg:h-[450px]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 bg-[#44312b] text-[#e0dfd8] px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-lg">
                  <div className="text-xs sm:text-sm font-semibold">Exclusive - Only 36 Plots</div>
                  <div className="text-xs mt-1">Plot sizes from 200 sq. yards</div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Infrastructure", desc: "CC roads, street lighting & concealed drainage", icon: <Road /> },
                  { title: "Connectivity", desc: "Quick access to NH-44 and RGIA", icon: <MapPin /> }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white/90 rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-[#44312b] to-[#8b7355] text-white w-fit flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-base sm:text-lg font-semibold mb-1 sm:mb-0" style={{ color: "#44312b" }}>
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-600 sm:mt-1 break-words leading-relaxed">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 flex flex-col gap-6">
              <div className="bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
                <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2" style={{ color: "#44312b" }}>
                  <CheckCircle />
                  Why Airport Town?
                </h3>
                <p className="mt-3 sm:mt-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                  Airport Town, strategically positioned on the <strong>Kothur–Penjerla road,</strong> stands out as one of the most promising investment opportunities, thanks to its proximity to the city and being just 19 km from the airport. With Flivv's developmental enhancements, the project is poised to deliver impressive and reliable returns for investors in the coming years!
                </p>

                <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { title: "HMDA Approved", desc: "GP Layout under LRS", icon: <Shield /> },
                    { title: "Ideal Investment", desc: "Close to City", icon: <Home /> }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="p-3 sm:p-4 rounded-xl flex items-start gap-3 bg-gradient-to-br from-[#44312b] to-[#8b7355] text-white shadow-lg"
                    >
                      {item.icon}
                      <div>
                        <div className="text-sm font-semibold">{item.title}</div>
                        <div className="text-xs mt-1 opacity-90">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
                <h4 className="text-lg sm:text-xl font-semibold flex items-center gap-2" style={{ color: "#44312b" }}>
                  <Document />
                  Investment Snapshot
                </h4>
                <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { value: "36", label: "Plots" },
                    { value: "200+", label: "sq. yards" },
                    { value: "24/7", label: "Security" }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-[#44312b] to-[#8b7355] bg-clip-text text-transparent">
                        {item.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 sm:mt-6 text-sm text-gray-600">
                  Nearby conveniences, growing connectivity corridors, and proximity to RGIA make this project well-positioned for both appreciation and owner-use.
                </p>
              </div>
            </div>
          </div>
        </section>



                  {/* SALES MEET CTA SECTION - Add this right before the VIDEO SECTION */}
{/* <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
  <div className="relative rounded-4xl overflow-hidden shadow-2xl">
    
    <div className="absolute inset-0 bg-gradient-to-br from-[#44312b] via-[#8b7355] to-[#44312b]" />
    
    
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
    </div>

    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8 lg:p-12">
      
      <div className="text-center lg:text-left">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-white">Airport Town Sales Meet at Kothur</span>
        </div>

        
        <h2 className="text-3xl sm:text-6xl font-bold text-white mb-4">
          Book Your <span className="text-[#e0dfd8]">Site Visit</span>
        </h2>
        
       
        <div className="inline-flex items-center gap-2 px-4 py-3 bg-white/10 rounded-xl mb-6">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-semibold text-white">21st December (Sunday)</span>
        </div>

       
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-white/90">
            <svg className="w-5 h-5 text-[#e0dfd8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>10:00 AM Onwards</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <MapPin />
            <span>Kothur - Penjerla Road</span>
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {[
            "19 Km from RGIA",
            "28 KM from Aramghar",
            "2 Km from NH-44",
            "2 Km from Kothur Town"
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-white/90">{feature}</span>
            </div>
          ))}
        </div>

        
        <p className="text-white/80 text-sm mb-6">
        Join us on 21st December, Sunday for our Sales Meet. Avail exclusive offers and secure your plot backed by Flivv Developers</p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-white">22</div>
            <div className="text-xs text-white/70">Plots Left</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-white">200 Sq. Yds</div>
            <div className="text-xs text-white/70">Std. Plot Size</div>
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2" style={{ color: "#44312b" }}>Reserve Your Slot</h3>
          <p className="text-gray-600 text-sm">Book your appointment for the exclusive sales meet</p>
        </div>

        
        <div id="hubspot-form-sales-meet" className="space-y-4">
        </div>

      </div>
    </div>

   
    <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
  </div>

</section> */}



        {/* VIDEO SECTION - improved */}
        <section id="ATvideo" className="relative w-full overflow-hidden bg-black">
          <div ref={videoWrapperRef} className="relative h-[50vh] sm:h-screen w-full">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="none"          /* don't preload until we explicitly set src */
              onLoadedData={handleVideoLoad}
              style={{ opacity: isVideoLoaded ? 1 : 0, transition: 'opacity 300ms ease' }}
            />
            {!isVideoLoaded && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Loading video...</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FEATURE GRID */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <h3 className="text-3xl font-bold mb-12 text-center" style={{ color: "#44312b" }}>
            Project Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "30 ft Internal Roads", desc: "Wide internal carriageways for smooth drive & planning", icon: <Road /> },
              { title: "CC Roads", desc: "Durable cement concrete paving for low maintenance", icon: <Document /> },
              { title: "Electricity", desc: "Reliable electrical infrastructure & street lighting", icon: <CheckCircle /> },
              { title: "24/7 Security", desc: "Gated, patrolled, and secure community", icon: <Shield /> },
              { title: "HMDA Approved", desc: "GP layout under LRS — legal and ready", icon: <Shield /> },
              { title: "Close to Kothur", desc: "Daily essentials within short distance", icon: <MapPin /> },
            ].map((f, i) => (
              <div 
                key={i} 
                className="bg-white/90 rounded-3xl p-8 shadow-lg border border-white/20"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#44312b] to-[#8b7355] w-fit mb-6 text-white">
                  {f.icon}
                </div>
                <div className="text-xl font-semibold mb-3" style={{ color: "#44312b" }}>{f.title}</div>
                <div className="text-gray-700 leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* LOCATION + MAP */}
        <section id="map" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 bg-white/50 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: "#44312b" }}>
                <MapPinandlocation
                 />
                Location & Connectivity
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed">Airport Town sits strategically near major connectivity hubs — making it suitable for both long-term investment and owners who want quick travel access.</p>

              <ul className="space-y-4 mb-8">
                {[
                  "19 Km from Rajiv Gandhi International Airport (RGIA)",
                  "28 Km from Aramghar",
                  "2 Km from NH-44 (Bangalore Highway)",
                  "2 Km from Kothur Town"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#44312b] to-[#8b7355]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex gap-4">
                <a 
                  href="#contact" 
                  className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg transition-all hover:scale-105"
                  style={{ backgroundColor: "#44312b", color: "#e0dfd8" }}
                >
                  Speak to Sales
                  <ArrowRight />
                </a>
                <a 
                  href="#gallery" 
                  className="px-6 py-3 rounded-xl font-medium border-2 flex items-center gap-2 transition-all hover:scale-105"
                  style={{ borderColor: "#44312b", color: "#44312b" }}
                >
                  Explore Gallery
                </a>
              </div>
            </div>

            <div className="w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <iframe
                title="Airport Town map"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1029.514124073472!2d78.30521531151966!3d17.13197920602622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDA3JzU1LjQiTiA3OMKwMTgnMTkuNSJF!5e1!3m2!1sen!2sin!4v1763363763119!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>


       

        {/* CTA SECTION */}
        <section className="max-w-4xl mx-auto px-6 sm:px-8 py-12 text-center">
          <div className="bg-gradient-to-br from-[#44312b] to-[#8b7355] text-[#e0dfd8] p-8 lg:p-12 rounded-3xl shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Ready to Secure Your Plot?</h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">Only 36 exclusive plots available. Don't miss this opportunity to invest in a premium location with strong growth potential.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-105"
                style={{ backgroundColor: "#e0dfd8", color: "#44312b" }}
              >
                Book Site Visit
                <ArrowRight />
              </a>
            </div>
          </div>
        </section>

        {/* OPTIMIZED GALLERY SECTION */}
        <section id="gallery" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-br from-[#44312b] to-[#8b7355] bg-clip-text text-transparent">Gallery</h3>
          </div>

          {/* Main Gallery Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 border border-white/20 bg-gray-100">
            <img 
              src={galleryImages[activeImage]}
              alt="Airport Town Gallery"
              className="w-full h-80 lg:h-150 object-cover"
              loading="lazy"            /* changed from eager -> lazy */
              decoding="async"
              fetchPriority="auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
              <div className="flex items-center gap-2 text-white/80">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>{activeImage + 1} of {galleryImages.length}</span>
              </div>
            </div>
          </div>

          {/* Simple Thumbnail Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                className={`relative rounded-2xl overflow-hidden shadow-lg border-2 ${activeImage === index ? 'border-[#44312b]' : 'border-transparent'}`}
                onClick={() => onThumbClick(index)}
                aria-pressed={activeImage === index}
                style={{ height: 96 }}
              >
                <img 
                  src={image}
                  alt={"Gallery thumbnail " + (index+1)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </button>
            ))}
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <div className="bg-gradient-to-br from-[#44312b] to-[#8b7355] text-[#e0dfd8] rounded-3xl p-8 md:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-2 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Register Your Interest</h3>
              <p className="text-lg mb-8 opacity-90">Fill the short form and our sales team will contact you with brochure, pricing & plot availability.</p>

              <ul className="space-y-4 mb-8">
                {[
                  "HMDA approved GP layout (LRS)",
                  "Only 36 exclusive plots",
                  "Plot sizes from 200 sq. yards"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div id="hubspot-form" className="bg-white text-[#44312b] rounded-2xl pt-10 shadow-lg">
                <div className="text-center font-semibold text-4xl">Enquiry Form</div>
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      (function loadHs(){
                        if(window.hbspt && window.hbspt.forms){
                          try{
                            hbspt.forms.create({
                              portalId: "21626983",
                              formId: "7b23bd69-e828-4e55-b869-b895c8233781",
                              target: "#hubspot-form"
                            });
                          } catch(e) { console.error('HubSpot form error', e); }
                        } else {
                          setTimeout(loadHs, 500);
                        }
                      })();
                    `,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="h-16" />
      </div>
    </>
  );
}
