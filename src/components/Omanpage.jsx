"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, MapPin, ArrowRight, ShieldCheck, 
  Clock, Users, Check, Star, Building, Award, 
  Phone, Mail, ChevronRight, ArrowUpRight, Sparkles, 
  Zap, BarChart3, Landmark, Home, Briefcase, Eye, 
  Compass, FileText, DollarSign, CheckCircle, Navigation,
  Globe2, TrendingUp, Target, Layers, Mic, PresentationIcon
} from 'lucide-react';

const SafeRender = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <div className="min-h-screen bg-white" />;
  return <>{children}</>;
};

export default function MuscatConclave() {
  
  const HeroSection = () => {
    const videoRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
      const video = videoRef.current;
      const section = sectionRef.current;
      
      if (!video || !section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(err => console.log('Video play error:', err));
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(section);

      return () => {
        observer.disconnect();
      };
    }, []);

    return (
      <section ref={sectionRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/Oman-page/0107(1)%20(1).mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }} />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto space-y-12">
            
            <div className="inline-flex items-center gap-4 px-8 py-3 bg-white/5 backdrop-blur-2xl rounded-full border border-white/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                </div>
                <span className="text-white text-sm font-medium tracking-widest uppercase">February 12-15, 2026</span>
              </div>
              <div className="w-px h-5 bg-white/20" />
              <span className="text-white/80 text-sm font-light">Grand Hyatt Muscat</span>
            </div>

            <div className="space-y-6">
              <h1 className="font-light leading-tight">
                <span className="block text-7xl sm:text-8xl lg:text-9xl text-white tracking-tight" style={{
                  textShadow: '0 10px 40px rgba(0,0,0,0.5)'
                }}>
                  Muscat
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl text-white/90 tracking-wide mt-4">
                  Real Estate Summit
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl text-white/70 tracking-widest mt-4 font-extralight">
                  2026
                </span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-6">
              <a 
                href="#register" 
                className="group relative px-10 py-4 bg-white text-gray-900 rounded-lg font-medium text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-3 shadow-2xl"
              >
                <span>Reserve Your Seat</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a 
                href="#schedule" 
                className="group px-10 py-4 bg-transparent border border-white/30 text-white rounded-lg font-medium text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center gap-3"
              >
                <Calendar className="w-5 h-5" />
                <span>View Schedule</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const IntroSection = () => {
    return (
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-50/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-red-50/30 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
              Oman's Premier{' '}
              <span className="relative inline-block font-medium text-red-600">
                Real Estate Forum
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              Experience three meticulously curated days of exclusive property showcases, 
              strategic investment insights, and intimate consultations with industry leaders. 
              Join a select group of discerning investors at Grand Hyatt Muscat.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-6">
              {['Premium Properties', 'Expert Advisory', 'Exclusive Access', 'Strategic Insights'].map((feature, i) => (
                <div key={i} className="px-5 py-2 bg-gray-50 border border-gray-200 rounded-full text-gray-700 text-sm font-light hover:border-red-200 hover:bg-red-50/50 transition-all duration-300">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const TimelineSection = () => {
    const events = [
      {
        date: "12 February",
        day: "Wednesday",
        title: "Private Consultations",
        time: "10:00 AM - 6:00 PM",
        description: "One-on-one sessions with investment advisors and property specialists"
      },
      {
        date: "14 February",
        day: "Friday",
        title: "Main Summit",
        time: "9:00 AM - 5:00 PM",
        description: "Premium property showcase and exclusive networking forum"
      },
      {
        date: "15 February",
        day: "Saturday",
        title: "Site Visits",
        time: "10:00 AM - 4:00 PM",
        description: "Guided property tours and investment finalization sessions"
      }
    ];

    return (
      <section id="schedule" className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-red-50 rounded-full mb-8">
                <Calendar className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-600 uppercase tracking-wide">Schedule</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-4">
                Three Days of Excellence
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Carefully designed programming for maximum value
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {events.map((event, i) => (
                <div key={i} className="group relative">
                  <div className="relative bg-white backdrop-blur-xl rounded-2xl p-8 border border-gray-200 hover:border-red-200 shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-full">
                        <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">{event.day}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-red-600">{i + 1}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-medium text-gray-900 mb-2">{event.date}</h3>
                    <h4 className="text-xl font-light text-gray-700 mb-4">{event.title}</h4>

                    <div className="flex items-center gap-2 text-gray-500 mb-6 pb-6 border-b border-gray-100">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-light">{event.time}</span>
                    </div>

                    <p className="text-gray-600 leading-relaxed font-light mb-6">{event.description}</p>

                    <a 
                      href="#register" 
                      className="inline-flex items-center gap-2 text-red-600 font-medium text-sm hover:gap-3 transition-all duration-300"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const CustomComponentSection = () => {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div id="custom-component-placeholder" className="max-w-7xl mx-auto">
            <div className="text-center p-20 border-2 border-dashed border-gray-300 rounded-3xl">
              <p className="text-gray-500 text-lg font-light">Custom Component Placeholder</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const CountdownSection = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
      const calculateTimeLeft = () => {
        const eventDate = new Date('2026-02-13T09:00:00+04:00');
        const now = new Date();
        const difference = eventDate.getTime() - now.getTime();
        
        if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      };

      setTimeLeft(calculateTimeLeft());
      const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-red-950 to-gray-900">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-8">
                <Zap className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white uppercase tracking-wide">Limited Availability</span>
              </div>
              
              <h2 className="text-5xl sm:text-6xl font-light text-white mb-4">
                Event Begins In
              </h2>
              
              <p className="text-lg text-white/70 font-light">
                Reserve your exclusive seat today
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
              {Object.entries(timeLeft).map(([key, value]) => (
                <div key={key} className="group">
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
                    <div className="text-center">
                      <div className="text-6xl font-light text-white mb-3 tabular-nums">
                        {value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm text-white/60 uppercase tracking-widest font-light">
                        {key}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a 
                href="#register" 
                className="inline-flex items-center gap-3 bg-white text-gray-900 rounded-lg px-10 py-4 font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                <span>Claim Your Seat</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              
              <p className="mt-6 text-white/70 text-sm font-light">
                Only <span className="font-medium text-white">24 exclusive seats</span> available
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const HighlightsSection = () => {
    const highlights = [
      {
        icon: Mic,
        title: "Public Address",
        description: "Keynote speeches from industry leaders and real estate experts"
      },
      {
        icon: Building,
        title: "Projects Showcasing",
        description: "Exclusive preview of 15+ premium investment opportunities"
      },
      {
        icon: Users,
        title: "Q&A Session",
        description: "Interactive discussions with developers and advisors"
      },
      {
        icon: Briefcase,
        title: "1:1 Sales Sessions",
        description: "Private consultations for personalized investment guidance"
      }
    ];

    return (
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-red-50 rounded-full mb-8">
                <Star className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-600 uppercase tracking-wide">Event Highlights</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-4">
                What to Expect
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((item, i) => (
                <div key={i} className="group">
                  <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-500 h-full">
                    <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors duration-500">
                      <item.icon className="w-7 h-7 text-red-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed font-light">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const AboutFlivvSection = () => {
    return (
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
                Our Legacy
              </h2>
              <p className="text-xl text-white/70 font-light">About Flivv Developers</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 mb-16">
              <div className="space-y-6 text-lg text-white/90 leading-relaxed font-light text-center">
                <p>
                  With over <span className="font-medium text-white">14+ years of experience in business</span>, Flivv has built a strong reputation for reliability and service excellence.
                </p>
                <p>
                  Over the past 4 years, we have successfully established a strong presence in the real estate sector, specializing in the development and marketing of open plot projects focused on long-term investment goals.
                </p>
                <p>
                  With <span className="font-medium text-white">07 projects</span> in our portfolio, we offer trustworthy companionship, backed by lifetime advisory and customer relationship management.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 text-center">
                <div className="text-6xl font-light text-white mb-3">14+</div>
                <div className="text-lg text-white/70 font-light">Years of Experience</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 text-center">
                <div className="text-6xl font-light text-white mb-3">07</div>
                <div className="text-lg text-white/70 font-light">Projects</div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-block bg-white/10 backdrop-blur-xl rounded-xl px-8 py-4 border border-white/20">
                <p className="text-xl font-medium text-white">Trust & Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const RegistrationSection = () => {
    const formLoadedRef = useRef(false);
    
    useEffect(() => {
      if (formLoadedRef.current) return;
      
      const container = document.getElementById('hubspot-form-container');
      if (!container) return;
      
      container.innerHTML = '';
      
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/v2.js';
      
      script.onload = () => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            portalId: '21626983',
            formId: '417fd073-67f4-4e82-90f6-20d056f919fa',
            target: '#hubspot-form-container'
          });
        }
      };
      
      document.body.appendChild(script);
      formLoadedRef.current = true;
      
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }, []);

    return (
      <section id="register" className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-red-50 rounded-full mb-8">
                <FileText className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-600 uppercase tracking-wide">Register</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-4">
                Secure Your <span className="font-medium text-red-600">VIP Access</span>
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Limited seats available for this exclusive forum
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                  <div className="bg-gradient-to-r from-red-600 to-red-700 p-10 text-center">
                    <h3 className="text-2xl font-medium text-white mb-2">Event Registration</h3>
                    <p className="text-white/90 font-light">Complete your details below</p>
                  </div>
                  
                  <div className="p-10 min-h-[500px]">
                    <div id="hubspot-form-container">
                      <div className="text-center py-16">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mb-6"></div>
                        <p className="text-gray-500 font-light">Loading registration form...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gray-900 rounded-3xl p-10 text-white">
                  <h3 className="text-2xl font-medium mb-8">What's Included</h3>
                  
                  <div className="space-y-6">
                    {[
                      { icon: Users, text: "Exclusive 1:1 consultation with experts" },
                      { icon: Home, text: "Pre-launch property access" },
                      { icon: FileText, text: "Comprehensive investment guide" },
                      { icon: Star, text: "VIP networking lounge" },
                      { icon: Landmark, text: "Legal & financial advisory" },
                      { icon: Navigation, text: "Priority site visit booking" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="p-3 bg-white/10 rounded-xl">
                          <item.icon className="w-5 h-5 text-red-400" />
                        </div>
                        <span className="text-white/90 pt-2 font-light">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { num: "500+", label: "Events" },
                    { num: "10K+", label: "Investors" },
                    { num: "98%", label: "Satisfaction" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm">
                      <div className="text-3xl font-medium text-red-600 mb-1">{stat.num}</div>
                      <div className="text-sm text-gray-600 font-light">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <SafeRender>
      <div className="min-h-screen bg-white overflow-hidden">
        <HeroSection />
        <IntroSection />
        <TimelineSection />
        <CustomComponentSection />
        <CountdownSection />
        <HighlightsSection />
        <AboutFlivvSection />
        <RegistrationSection />
      </div>
    </SafeRender>
  );
}