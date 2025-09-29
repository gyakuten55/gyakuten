'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FixedDiagnosisCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // diagnosisページでは表示しない
  const shouldShow = pathname !== '/diagnosis';

  useEffect(() => {
    const handleScroll = () => {
      // 100px以上スクロールしたら表示
      setIsVisible(window.scrollY > 100);
    };

    // メニュー状態を監視
    const handleMenuToggle = (e: CustomEvent) => {
      setIsMenuOpen(e.detail.isOpen);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('menuToggle', handleMenuToggle as EventListener);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('menuToggle', handleMenuToggle as EventListener);
    };
  }, []);

  if (!shouldShow || isMenuOpen) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
      }`}
    >
      <Link
        href="/diagnosis"
        className="group relative bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center overflow-hidden backdrop-blur-sm border border-white/10"
      >
        {/* モバイル表示 */}
        <div className="sm:hidden flex items-center">
          <div className="px-4 py-3">
            <div className="text-sm font-bold leading-none mb-0.5">無料診断</div>
            <div className="text-xs opacity-85 leading-none">AI最適化</div>
          </div>
          <div className="bg-white/10 group-hover:bg-white/20 transition-colors duration-300 px-3 py-3 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* デスクトップ表示 */}
        <div className="hidden sm:flex items-center">
          <div className="px-5 py-3.5">
            <div className="text-sm font-bold leading-none mb-1">無料診断</div>
            <div className="text-xs opacity-85 leading-none">AI最適化チェック</div>
          </div>
          <div className="bg-white/10 group-hover:bg-white/20 transition-colors duration-300 px-3 py-3.5 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* ホバー効果 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
    </div>
  );
}