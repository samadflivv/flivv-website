'use client';

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";

// --- 1. ASSETS & CONFIG ---

const HERO_IMAGE_URL = "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/QatarEvent/LW0A7183.jpg";

const FAQS_DATA = [
  {
    id: "faq-1",
    question: "What kind of appreciation can investors expect from your previously sold projects?",
    answer:
      "Over the past four years, our projects have consistently delivered strong value growth. While land in India typically appreciates at an average rate of 8–10% per year, our structured development approach aims to help investors achieve around 15% annual returns. This enhanced performance is driven not just by market growth, but by our active involvement in: regular maintenance and cleaning of plots, upkeep every 4 months to ensure projects remain market-ready, development and maintenance of amenities, building functional, growing communities such as Rivendell Farms. By ensuring our ventures are well-maintained and continuously developed, we create stronger resale potential and sustained long-term appreciation for our investors.",
  },
  {
    id: "faq-2",
    question: "Is NS Homes a residential project where people have started living, or is it primarily an investment venture?",
    answer:
      "NS Homes was launched as a long-term investment-focused DTCP-approved project, with a projected growth horizon of approximately 5–8 years. From the beginning, it was positioned primarily as an investment opportunity rather than an immediate end-user residential community. Since its launch, the project has witnessed strong appreciation and significant regulatory advancements. It now falls under the HMDA zone (FCDA special zone), further strengthening its long-term growth potential. We generally classify buyers into two categories: Investors, who purchase for appreciation and future resale. End users, who intend to construct and reside. NS Homes was structured for investors. However, buyers retain the flexibility to construct in the future if desired. ",
  },
  {
    id: "faq-3",
    question: "How do you ensure proper documentation and ownership clarity before customers make an intention to buy?",
    answer:
      "Documentation and legal clarity are fundamental to every project we undertake. Before offering any land to investors, we conduct a comprehensive legal due diligence process through experienced legal professionals. Our verification process includes: Examination of the parent document (Title/Sethwar records dating back to 1950, wherever applicable), Review of annual land records (Pahani / revenue records maintained by MRO & SRO offices), Verification of ownership history and linked documents, Confirmation of clear title and lawful possession, Checking for pending litigations, disputes, mortgages, or financial liabilities, Ensuring compliance with relevant zoning and regulatory approvals. In India, a significant portion of land is agricultural, and historical possession records are extremely important. We ensure that both ownership and possession records are legally aligned before proceeding with any transaction. Only after completing this thorough verification do we bring a project to market. This safeguards investor interests and ensures transparency at every stage whether at token booking, agreement, or final registration.",
  },
  {
    id: "faq-4",
    question: "How do you build trust and transparency in your transactions?",
    answer:
      "Trust is built through action, not words. Our approach is simple: Conduct complete legal verification before launch, Maintain transparency in documentation, Educate buyers about the process, Ensure all transactions follow proper regulatory and legal procedures. Our successful sales record, including rapid sell-outs in competitive markets, reflects the confidence investors place in our due diligence and project clarity. We believe that when documentation is strong and processes are transparent, customers can commit with confidence and peace of mind.",
  },
  {
    id: "faq-5",
    question: "Why should NRIs, especially those in the Gulf, consider investing in Hyderabad instead of emerging markets like Saudi Arabia or Dubai?",
    answer:
      "Opportunities exist everywhere, including Saudi Arabia, Dubai, and other growing markets. However, for most NRIs, India, particularly their hometown, remains their long-term harbour. No matter how long we live abroad, many eventually return or maintain strong roots in India. We have seen countless NRIs, even after decades overseas, choose to come back and settle in Hyderabad later in life. Investing in India is not just a financial decision, it is also an emotional and strategic one. While younger generations may prefer the Gulf lifestyle, India today offers evolving infrastructure, gated communities, and well-planned developments that match modern living standards. The key is choosing the right location, developers and compliant projects rather than comparing them with older, congested city areas.",
  },
  {
    id: "faq-6",
    question: "How do you address concerns about trust and past negative experiences in Indian real estate?",
    answer:
      "We understand that skepticism exists due to past industry malpractices. However, we believe trust is built through transparency, compliance, and consistent delivery. Our approach includes: HMDA-approved and regulation-compliant projects, Clearly defined development norms, Transparent documentation and accessible data, Strong digital presence for open communication, Ethical selling practices. For example, in projects like Gulmohar Villas, we maintained strict development standards, including mandatory garden spaces, to ensure quality community living. This clarity and discipline contributed to its strong response and rapid sales. We encourage investors to conduct due diligence, visit our office, review documentation, and make informed decisions. Healthy skepticism is natural but informed trust is essential for any investment journey. Ultimately, real estate requires both due diligence and conviction. We are committed to delivering responsibly and building long-term credibility through action, not just words.",
  },
  {
    id: "faq-7",
    question: "Do you provide maintenance or long-term project upkeep after investors purchase plots?",
    answer:
      "Yes. Unlike many developers who maintain projects for only a limited period, we continue maintaining our ventures until a functioning community develops. This includes: Regular upkeep of plots and common areas, Ongoing site maintenance and operational support, ensuring the project remains clean, accessible, and presentable. Our goal is to protect the value of customerss’ assets until the community becomes self-sustaining.",
  },
];

const REFUND_TIERS = [
  {
    heading: "Refunds below ₹5,00,000",
    note: "(Rupees Five Lakh)",
    duration: "1 month",
    description:
      "The refund shall be processed within one month from the date on which the refund becomes due.",
  },
  {
    heading: "Refunds from ₹5,00,000 to ₹20,00,000",
    note: "(Rupees Twenty Lakh)",
    duration: "2 months",
    description:
      "The refund shall be processed within two months from the date on which the refund becomes due.",
  },
  {
    heading: "Refunds above ₹20,00,000",
    note: "(Rupees Twenty Lakh)",
    duration: "3 months",
    description:
      "The refund shall be processed within three months from the date on which the refund becomes due.",
  },
];

// --- 2. UTILITY COMPONENTS ---

const GrainOverlay = () => (
  <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

// --- 3. CORE SECTIONS ---

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  const yBg = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  const yText = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <header ref={ref} className="relative w-full h-[110vh] flex items-center justify-center overflow-hidden bg-[#0B0F19]">
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <img src={HERO_IMAGE_URL} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/40 via-transparent to-[#0B0F19]" />
      </motion.div>

      <motion.div style={{ opacity: opacityText, y: yText }} className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="inline-block py-1 px-4 border border-white/20 rounded-full text-[10px] md:text-xs font-medium tracking-[0.3em] text-emerald-100/80 uppercase backdrop-blur-sm bg-white/5">
            faq's
          </span>
        </motion.div>
        
        <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[0.9] tracking-tight">
          All Your Questions, <br />
          <span className="italic text-white/40">Answered.</span>
        </h1>
      </motion.div>
    </header>
  );
};

const AccordionItem = ({ item, isOpen, onClick, index }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      // Using amount instead of margin prevents it from triggering too early or re-triggering during layout shifts
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
      className={`group border-b border-white/10 transition-all duration-500 ${isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"}`}
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full py-8 px-4 md:px-8 flex items-start md:items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-baseline lg:gap-6 gap-4">
           <span className={`font-mono text-xs text-white/30 transition-colors duration-300 ${isOpen ? "text-emerald-400/60" : ""}`}>
                0{index + 1}
           </span>
           <span
            className={`text-xl md:text-3xl font-serif transition-colors duration-300 ${
                isOpen ? "text-emerald-100" : "text-white/80 group-hover:text-white"
            }`}
            >
            {item.question}
            </span>
        </div>
        
        <div className={`relative w-6 h-6 flex-shrink-0 ml-4 mt-1 md:mt-0 transition-transform duration-500 ${isOpen ? "rotate-45" : "rotate-0"}`}>
            <span className="absolute top-1/2 left-0 w-6 h-[1px] bg-white/40 group-hover:bg-white/80 transition-colors" />
            <span className="absolute top-0 left-1/2 h-6 w-[1px] bg-white/40 group-hover:bg-white/80 transition-colors" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.4, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { height: { duration: 0.3, ease: "easeInOut" }, opacity: { duration: 0.2 } },
            }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-10 md:pl-20 pr-6 lg:pr-8">
              <p className="text-base text-justify md:text-lg text-gray-400 font-light leading-loose max-w-3xl">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- 4. MAIN PAGE COMPONENT ---

const FaqsPage = () => {
  const [expandedId, setExpandedId] = useState("faq-1");

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="w-full bg-[#0B0F19] min-h-screen text-white relative font-sans selection:bg-emerald-900 selection:text-white">
      <GrainOverlay />
      
      <HeroSection />

      {/* FAQ & REFUND SECTION */}
      <section className="relative z-20 -mt-32 pb-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-10 md:gap-16">
          
          {/* FAQ Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0B0F19]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-12 lg:p-20 shadow-2xl shadow-black"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-serif text-white">
                        Frequently Asked Questions
                    </h2>
                </div>
            </div>

            <div className="space-y-0">
              {FAQS_DATA.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  index={index}
                  item={faq}
                  isOpen={expandedId === faq.id}
                  onClick={() => handleToggle(faq.id)}
                />
              ))}
            </div>
          </motion.div>

          {/* Refund Policies Card (Separate Box) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0B0F19]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-12 lg:p-20 shadow-2xl shadow-black"
          >
            <div className="mb-12">
              <span className="text-emerald-400/80 text-xs font-medium tracking-widest uppercase mb-4 block">
                Important Information
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white">
                Refund Policies
              </h2>
            </div>

            <div className="relative mt-12">
              {/* Vertical Timeline Line */}
              <div
                className="absolute left-1 top-2 bottom-2 w-px bg-white/10"
                aria-hidden="true"
              />

              <div className="space-y-14 sm:space-y-16">
                {REFUND_TIERS.map((tier, idx) => (
                  <motion.div 
                    key={tier.heading} 
                    className="relative pl-8 sm:pl-12"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                  >
                    {/* Dot */}
                    <span
                      className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                      aria-hidden="true"
                    />

                    {/* Header Row */}
                    <div className="flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <p className="text-lg sm:text-xl font-serif tracking-tight text-white/90">
                        {tier.heading}{" "}
                        <span className="font-sans text-sm text-white/40 block sm:inline mt-1 sm:mt-0">
                          {tier.note}
                        </span>
                      </p>

                      <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-emerald-900/30 border border-emerald-500/20 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-300">
                        {tier.duration}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-5 max-w-[65ch] text-[15px] leading-relaxed text-gray-400 font-light">
                      {tier.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>
      
      {/* Footer Spacer */}
      <div className="h-32 bg-[#0B0F19]" />
    </main>
  );
};

export default FaqsPage;