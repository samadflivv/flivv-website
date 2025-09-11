"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const RFSfaqs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      question: "What is the AI Scheduling Assistant?",
      answer: "The AI Scheduling Assistant is a smart tool that helps you manage and automate your appointments, reminders, and meetings. It uses machine learning to understand your preferences and optimize your schedule."
    },
    {
      question: "Is the AI Scheduling Assistant compatible with my calendar?",
      answer: "Yes, it integrates seamlessly with Google Calendar, Outlook, Apple Calendar, and other major scheduling platforms. It can also sync with your existing productivity tools."
    },
    {
      question: "How does the AI Scheduling Assistant work?",
      answer: "It uses AI to analyze your preferences, suggest optimal meeting times, and automatically send invites or reminders. The assistant learns from your scheduling patterns to become more efficient over time."
    },
    {
      question: "Can I customize the assistant's behavior?",
      answer: "Absolutely. You can set preferences for meeting durations, buffer times between meetings, preferred times of day, and even specific days you want to keep free."
    },
    {
      question: "Is my data secure with the scheduling assistant?",
      answer: "We prioritize security with end-to-end encryption and compliance with GDPR, CCPA, and other privacy regulations. Your data is never sold or shared with third parties."
    },
    {
      question: "How does the assistant handle time zone differences?",
      answer: "The assistant automatically detects and adjusts for time zones, ensuring meetings are scheduled at convenient times for all participants regardless of location."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div 
      className="min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#081C15]"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-6xl font-normal text-[#D8F3DC] mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="rounded-xl overflow-hidden"
              initial={false}
              animate={{
                boxShadow: openIndex === index 
                  ? '0 0 20px #2D6A4F' 
                  : '0 0 0px rgba(255, 255, 255, 0)'
              }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'linear-gradient(145deg, #1B4332, #081C15)',
                border: '1px solid #40916C',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div 
                className="flex justify-between items-center p-5 md:p-6 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg md:text-2xl text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 md:h-6 md:w-6 text-[#40916C]" />
                  ) : (
                    <Plus className="h-5 w-5 md:h-6 md:w-6 text-[#40916C]" />
                  )}
                </div>
              </div>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: 'auto',
                      opacity: 1,
                      transition: { 
                        height: { duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.2 }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: { 
                        height: { duration: 0.25, ease: "easeInOut" },
                        opacity: { duration: 0.15 }
                      } 
                    }}
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-300">
                      <p className="text-sm md:text-base pb-4">{faq.answer}</p>
                      <motion.div 
                        className="h-0.5 bg-gradient-to-r from-[#40916C] to-[#081C15] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>


        <div className="mt-16 text-center">
  <p className="text-gray-400 mb-6">Still have questions?</p>
  <a href="#rfsctaform">
  <button
    className="px-6 py-2 md:px-8 md:py-3 rounded-full bg-gradient-to-r from-[#D8F3DC] to-[#1B4332] text-[#081C15] font-medium shadow-lg text-sm md:text-base hover:shadow-[#2D6A4F] transition-all active:scale-95"
    onClick={() => {
      // 👉 Haptic Feedback (mobile devices that support it)
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }

      // 👉 Play Click Sound (desktop + mobile)
      const clickSound = new Audio("/sounds/RFSbuttonclick.mp3"); 
      clickSound.volume = 1.0; // set volume (0.0 - 1.0)
      clickSound.play().catch((err) => {
        console.warn("Sound play blocked until user interacts:", err);
      });
    }}
  >
    Contact Support 
  </button>
  </a>
</div>


      </div>
    </div>
  );
};

export default RFSfaqs;