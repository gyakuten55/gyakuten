'use client';

import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // メニュー状態を監視
    const handleMenuToggle = (e: CustomEvent) => {
      setIsMenuOpen(e.detail.isOpen);
    };

    window.addEventListener('menuToggle', handleMenuToggle as EventListener);
    
    return () => {
      window.removeEventListener('menuToggle', handleMenuToggle as EventListener);
    };
  }, []);

  if (isMenuOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col space-y-3">
      {/* メルマガ登録ボタン */}
      <a
        href="/newsletter"
        className="bg-white hover:bg-gray-50 text-primary border-2 border-primary p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        aria-label="メルマガ登録"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </a>
      
      {/* ページトップボタン */}
      <button
        onClick={scrollToTop}
        className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="トップに戻る"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollToTop;