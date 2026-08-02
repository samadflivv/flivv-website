'use client';

import React, { useState } from 'react';
import { ChevronRight, CheckCircle2, TrendingUp, Users, Lock, Zap } from 'lucide-react';

const ResalePage = () => {
  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ====== HERO SECTION ======
  const HeroSection = () => (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white pt-20 pb-32 md:pt-32 md:pb-40">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0192D3]/5 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0192D3]/5 rounded-full -ml-36 -mb-36"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Sell Your Plot at the Best Value
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We understand that life brings new goals and opportunities and that's the exact time when you remember an another reason of being Flivv's client. 
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0192D3] to-[#00A8E8] text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
          >
            Request Evaluation <ChevronRight className="w-5 h-5" />
          </button>
          <a
            href="#why-flivv"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-[#0192D3] hover:text-[#0192D3] transition-colors"
          >
            Learn More <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );

  // ====== ABOUT RESALE SERVICE ======
  const AboutSection = () => (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <span className="text-[#0192D3] font-semibold text-sm tracking-widest uppercase">
              Our Approach
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
              Resale Services Designed for You
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
             Our Resale Services are designed to help you sell your plot smoothly and at the best possible value without the stress or uncertainty that often comes with real estate transactions.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our transparent process and dedicated team handle everything from valuation & documentation to buyer coordination and closing, so you can focus on what matters most to you.
            </p>
          </div>

          {/* Right visual */}
          <div className="bg-gradient-to-br from-[#0192D3]/10 to-[#00A8E8]/10 rounded-2xl p-12 border border-[#0192D3]/20">
            <div className="space-y-8">
              <div className="flex gap-4">
                <Lock className="w-8 h-8 text-[#0192D3] flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Transparent Process</h3>
                  <p className="text-gray-600">Complete clarity at every step</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Users className="w-8 h-8 text-[#0192D3] flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Dedicated Team</h3>
                  <p className="text-gray-600">Expert support throughout</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Zap className="w-8 h-8 text-[#0192D3] flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Fast Execution</h3>
                  <p className="text-gray-600">Complete within 3-6 months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ====== PRICING SECTION ======
  const PricingSection = () => (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#0192D3] font-semibold text-sm tracking-widest uppercase">
            Transparent Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
            Flexible and Fair Pricing
          </h2>
        </div>

        {/* Main pricing */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-[#0192D3] to-[#00A8E8] rounded-2xl p-12 text-white text-center">
            <p className="text-white/80 text-lg mb-4">Our Pricing Structure</p>
            <div className="mb-6">
              <span className="text-6xl md:text-7xl font-bold">₹650–1000</span>
              <p className="text-xl text-white/90 mt-3">per square yard</p>
            </div>
            <p className="text-white/80">Depending on plot size and current market conditions</p>
          </div>
        </div>
      </div>
    </section>
  );

  // ====== PARTNERSHIP SECTION ======
  const PartnershipSection = () => (
    <section className="py-20 md:py-32 bg-gradient-to-br from-[#0192D3]/10 to-[#00A8E8]/10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-gradient-to-br from-[#0192D3] to-[#00A8E8] rounded-2xl p-12 md:p-16 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Your Financial Success Matters to Us
          </h2>
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            When you choose Flivv for resale, you're not just listing a plot. You're partnering with a team that genuinely cares about your financial success and works tirelessly to turn your asset into realized dreams.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20">
            <div>
              <p className="text-4xl font-bold mb-2">3–6</p>
              <p className="text-white/80 font-medium">Months to Sale</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-white/80 font-medium">Transparent Process</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">14+</p>
              <p className="text-white/80 font-medium">Years in Real Estate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ====== FORM SECTION ======
  const FormSection = () => (
    <section id="form-section" className="py-20 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div>
            <span className="text-[#0192D3] font-semibold text-sm tracking-widest uppercase">
              Get Started
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-8 leading-tight">
              Request Your Resale Evaluation
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Take the first step toward a smooth and profitable resale. Our team will provide a professional evaluation and personalized resale plan within 24 hours.
            </p>

            {/* Key benefits */}
            <div className="space-y-5">
              {[
                'Expert valuation within 24 hours',
                'Transparent and competitive pricing',
                'Dedicated support from start to finish',
                'Stress-free selling experience',
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#0192D3] flex-shrink-0 mt-1" />
                  <p className="text-gray-700 font-medium">{benefit}</p>
                </div>
              ))}
            </div>

            {/* Trust indicator */}
            <div className="mt-10 pt-10 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">14+ years of expertise</span> helping investors maximize returns in real estate.
              </p>
            </div>
          </div>

          {/* Right - HubSpot Form */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-10 border border-gray-200 sticky top-24">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Evaluation</h3>
            <p className="text-gray-600 text-sm mb-8">
              Fill out the form below and our team will contact you shortly.
            </p>

            {/* HubSpot Form Embed */}
            <div id="hubspot-form-container" className="hs-form-container">
              <script
                type="text/javascript"
                src="https://js-na2.hsforms.net/forms/embed/21626983.js"
                defer
              ></script>
              <div
                className="hs-form-frame"
                data-region="na2"
                data-form-id="3fd7985a-fcf0-48c2-a8bf-c020917ef948"
                data-portal-id="21626983"
                style={{ height: 'auto' }}
              ></div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6">
              We respect your privacy. Your information is secure with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );


  return (
    <div className="min-h-screen bg-white font-sans">
      <HeroSection />
      <AboutSection />
      <PricingSection />
      <PartnershipSection />
      <FormSection />
    </div>
  );
};

export default ResalePage;