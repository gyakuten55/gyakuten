'use client';

import React, { useState } from 'react';
import { FAQItem } from '@/types/cms';

interface FloatingFAQProps {
  faqs: FAQItem[];
}

export const FloatingFAQ: React.FC<FloatingFAQProps> = ({ faqs }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setOpenIndex(null); // 最小化時は全て閉じる
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="hidden md:block fixed bottom-4 right-4 z-50">
      {isMinimized ? (
        // 最小化時: コンパクトなボタン
        <button
          onClick={toggleMinimize}
          className="bg-primary text-white px-5 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 flex items-center gap-2 font-bold"
          aria-label="FAQを開く"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>FAQ</span>
          <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {faqs.length}
          </span>
        </button>
      ) : (
        // 最大化時: FAQリスト
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-[400px] max-h-[500px] flex flex-col">
          {/* ヘッダー */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary/5">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              よくある質問
            </h3>
            <button
              onClick={toggleMinimize}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="FAQを最小化"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* FAQリスト */}
          <div className="overflow-y-auto flex-1 p-4">
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-start justify-between gap-2"
                    aria-expanded={openIndex === index}
                  >
                    <span className="font-semibold text-sm text-gray-900 flex-1">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200 ${
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
                    <div className="p-3 bg-white border-t border-gray-200">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
