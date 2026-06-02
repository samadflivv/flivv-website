'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Clock, Shield, Megaphone, CheckCircle2 } from 'lucide-react';

const ResalePage = () => {
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // ====== HERO SECTION ======
  const HeroSection = () => (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#602437] via-[#4a1a2e] to-[#2d0f1a] text-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9EBB] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FF9EBB] opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <motion.div
          className="lg:col-span-7 space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div custom={0} variants={fadeUpVariants} className="space-y-3">
            <p className="text-sm font-semibold tracking-widest text-[#FF9EBB] uppercase">
              Flivv Resale Services
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              Sell your plot smoothly
            </h1>
            <p className="text-xl text-white/90">
              with the best possible value
            </p>
          </motion.div>

          <motion.p
            custom={1}
            variants={fadeUpVariants}
            className="text-lg text-white/80 max-w-xl leading-relaxed"
          >
            We help you sell without stress, uncertainty, or wasted time. From valuation to closing, our dedicated team handles the entire resale process.
          </motion.p>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <a
              href="#form"
              className="inline-block bg-white text-[#602437] px-8 py-4 rounded-full font-bold text-base shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Request Resale Evaluation
            </a>
            <a
              href="#why-flivv"
              className="inline-block border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold hover:border-white/80 hover:bg-white/5 transition-all duration-300"
            >
              Learn More
            </a>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            className="pt-4 inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#FF9EBB]" />
              <span className="text-sm font-medium">Typical Sales Time: 3–6 Months</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Visual */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF9EBB] to-transparent opacity-10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 text-6xl">🏠</div>
                <p className="text-white/60 text-sm">Premium property resale expertise</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );

  // ====== ABOUT SERVICE ======
  const AboutService = () => (
    <section className="bg-white py-16 md:py-24">
      <motion.div
        className="max-w-5xl mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <motion.h2
          custom={0}
          variants={fadeUpVariants}
          className="text-4xl md:text-5xl font-bold text-[#602437] mb-6"
        >
          About Our Resale Services
        </motion.h2>
        <motion.div custom={1} variants={fadeUpVariants} className="space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            Life brings new goals and opportunities. That is why our Resale Services are designed to help you sell your plot smoothly and at the best possible value.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We make the process simple and professional, so you can focus on what matters most while we manage the sale journey.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );

  // ====== WHY FLIVV ======
  const WhyFlivvSection = () => (
    <section id="why-flivv" className="bg-[#F8F6F7] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#602437] text-center mb-16"
        >
          Why Flivv is a reliable resale service provider
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            {
              icon: Clock,
              title: 'Faster sales cycle',
              description: 'With our market knowledge and buyer network, we typically complete sales within 3 to 6 months.',
            },
            {
              icon: Shield,
              title: 'Transparent process',
              description: 'Our dedicated team manages valuation, documentation, buyer coordination, and closing with clarity.',
            },
            {
              icon: Megaphone,
              title: 'Professional marketing',
              description: 'We position your property properly and showcase it to the right buyers for better results.',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUpVariants}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#602437] to-[#FF9EBB] rounded-full flex items-center justify-center mb-6">
                <card.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#602437] mb-3">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  // ====== HOW IT WORKS ======
  const HowItWorks = () => (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#602437] text-center mb-16"
        >
          How the resale process works
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-2">
          {[
            { step: '01', title: 'Valuation', desc: 'We evaluate your plot based on size, location, and current market conditions.' },
            { step: '02', title: 'Listing & marketing', desc: 'We prepare and market your property to attract the right buyers.' },
            { step: '03', title: 'Buyer coordination', desc: 'We manage communication, site visit coordination, and buyer follow-up.' },
            { step: '04', title: 'Documentation & closing', desc: 'We handle the paperwork and assist until the final closing is completed.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white to-[#F8F6F7] rounded-2xl p-6 border border-gray-100 h-full">
                <div className="text-4xl font-bold text-[#FF9EBB] mb-3">{item.step}</div>
                <h3 className="text-lg font-bold text-[#602437] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
              {i < 3 && (
                <div className="hidden lg:block absolute top-1/3 -right-2 w-4 h-4 bg-[#FF9EBB] rounded-full z-10"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Timeline connector - hidden on mobile */}
        <div className="hidden lg:block absolute left-0 right-0 top-1/3 h-0.5 bg-gradient-to-r from-transparent via-[#FF9EBB] to-transparent -z-10 -translate-y-1/2" style={{ marginTop: '6rem' }}></div>
      </div>
    </section>
  );

  // ====== PRICING ======
  const PricingSection = () => (
    <section className="bg-gradient-to-br from-[#602437] to-[#3b1220] text-white py-16 md:py-24">
      <motion.div
        className="max-w-5xl mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2 custom={0} variants={fadeUpVariants} className="text-4xl md:text-5xl font-bold mb-8">
          Flexible and fair pricing
        </motion.h2>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          className="relative inline-block mb-8"
        >
          <div className="absolute inset-0 bg-[#FF9EBB] opacity-20 rounded-3xl blur-2xl -z-10"></div>
          <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl px-12 py-10">
            <p className="text-5xl md:text-6xl font-bold text-white mb-2">
              ₹650–1000
            </p>
            <p className="text-lg text-white/80">per square yard</p>
          </div>
        </motion.div>

        <motion.p custom={2} variants={fadeUpVariants} className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
          Pricing depends on plot size and current market conditions.
        </motion.p>

        <motion.p custom={3} variants={fadeUpVariants} className="text-base text-white/70">
          This structure helps retain maximum returns while we provide expert support in a competitive market.
        </motion.p>
      </motion.div>
    </section>
  );

  // ====== SERVICES INCLUDED ======
  const ServicesIncluded = () => (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#602437] text-center mb-16"
        >
          What Flivv handles for you
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Checklist */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              'Valuation support',
              'Property positioning',
              'Buyer communication',
              'Site visit coordination',
              'Documentation assistance',
              'Negotiation support',
              'Closing coordination',
              'Transparent pricing guidance',
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUpVariants}
                className="flex items-center gap-4"
              >
                <div className="w-6 h-6 rounded-full bg-[#FF9EBB] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg text-gray-700 font-medium">{item}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#F8F6F7] to-white rounded-3xl p-10 border border-gray-100"
          >
            <h3 className="text-3xl font-bold text-[#602437] mb-4">
              Partner with a team that cares about your success
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              When you choose Flivv for resale, you are not just listing a plot. You are partnering with a team that works tirelessly to turn your asset into realized value.
            </p>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                ✓ Dedicated account management
              </p>
              <p className="text-sm text-gray-600">
                ✓ Market expertise and buyer network
              </p>
              <p className="text-sm text-gray-600">
                ✓ Professional support every step
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  // ====== TRUST SECTION ======
  const TrustSection = () => (
    <section className="bg-[#F8F6F7] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#602437] text-center mb-16"
        >
          Why sellers trust Flivv
        </motion.h2>

        {/* Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { value: '3–6 Months', label: 'Typical resale timeline' },
            { value: 'Dedicated', label: 'Sales and documentation support' },
            { value: 'Transparent', label: 'Clear process and pricing' },
          ].map((metric, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUpVariants}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-[#602437] mb-2">{metric.value}</p>
              <p className="text-gray-600 font-medium">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm text-center"
        >
          <p className="text-lg md:text-xl text-gray-700 font-medium mb-4 italic">
            "Flivv made the resale process smoother, clearer, and more professional than expected."
          </p>
          <p className="text-gray-600 font-semibold">— Satisfied Client</p>
        </motion.div>
      </div>
    </section>
  );

  // ====== FAQ ======
  const FaqSection = () => (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#602437] text-center mb-12"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            {
              q: 'How long does a resale usually take?',
              a: 'In most cases, our resale process is completed within 3 to 6 months depending on demand, location, and pricing.',
            },
            {
              q: 'How is the resale value decided?',
              a: 'The value is based on plot size, location, and current market conditions.',
            },
            {
              q: 'What does Flivv charge for resale?',
              a: 'Our pricing usually falls between ₹650–1000 per square yard, depending on the property.',
            },
            {
              q: 'What support do you provide?',
              a: 'We support with valuation, marketing, documentation, buyer communication, and closing.',
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUpVariants}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? -1 : i)}
                className="w-full flex items-center justify-between bg-gradient-to-r from-[#F8F6F7] to-white p-6 hover:from-[#F0EAEb] transition-colors"
              >
                <span className="text-lg font-semibold text-[#602437] text-left">{faq.q}</span>
                <motion.div
                  animate={{ rotate: expandedFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#602437]" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: expandedFaq === i ? 'auto' : 0,
                  opacity: expandedFaq === i ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-white border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  // ====== FORM SECTION ======
  const FormSection = () => (
    <section id="form" className="bg-[#F8F6F7] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#602437] mb-6">
              Request your resale evaluation
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Let us help you sell at the best possible value. Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-4">
              {[
                'Fast and transparent resale support',
                'Professional buyer coordination',
                'Dedicated team handling the process',
                'Simple and stress-free experience',
              ].map((bullet, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-[#FF9EBB] rounded-full"></div>
                  <p className="text-gray-700 font-medium">{bullet}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 sticky top-20"
          >
            <h3 className="text-2xl font-bold text-[#602437] mb-6">Get My Resale Plan</h3>

            {/* HubSpot Form Container */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9EBB] focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9EBB] focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9EBB] focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Plot Location *</label>
                <input
                  type="text"
                  placeholder="City or area"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9EBB] focus:border-transparent transition"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-[#602437] to-[#8B3A5F] text-white font-bold py-3 rounded-full hover:shadow-lg transition-all duration-300 mt-6">
                Get My Resale Plan
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                We respect your privacy. Your information is secure with us.
              </p>
            </div>

            {/* HubSpot form embed would go here */}
            <div className="text-xs text-gray-400 mt-6 pt-6 border-t border-gray-100">
              {/* 
              For live HubSpot form integration, replace the form fields above with:
              <script src="https://js.hsforms.net/forms/embed/21626983.js" defer></script>
              <div id="hs-form-wrapper">
                <div className="hs-form-frame" data-region="na2" data-form-id="YOUR_FORM_ID" data-portal-id="21626983"></div>
              </div>
              */}
              Contact form ready for HubSpot integration
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <AboutService />
      <WhyFlivvSection />
      <HowItWorks />
      <PricingSection />
      <ServicesIncluded />
      <TrustSection />
      <FaqSection />
      <FormSection />

      {/* Scroll to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        animate={{ opacity: isScrolled ? 1 : 0, pointerEvents: isScrolled ? 'auto' : 'none' }}
        className="fixed bottom-8 right-8 bg-[#602437] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-40"
      >
        ↑
      </motion.button>
    </div>
  );
};

export default ResalePage;