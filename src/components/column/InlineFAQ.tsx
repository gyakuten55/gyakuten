'use client';

import React, { useState } from 'react';
import { FAQItem } from '@/types/cms';

interface InlineFAQProps {
  faqs: FAQItem[];
}

export const InlineFAQ: React.FC<InlineFAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="md:hidden mt-12 mb-8"
      aria-label="よくある質問"
      data-llmo-type="faq"
    >
      <div className="bg-primary/5 rounded-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          よくある質問
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-start justify-between gap-3"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-start gap-2 flex-1">
                  <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0 mt-0.5">
                    Q
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-gray-900">
                    {faq.question}
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200 mt-0.5 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-start gap-2">
                    <span className="bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      A
                    </span>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed flex-1">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
