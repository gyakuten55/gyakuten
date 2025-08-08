'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function FixedDiagnosisCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // diagnosisページでは表示しない
  const shouldShow = pathname !== '/diagnosis';

  useEffect(() => {
    const handleScroll = () => {
      // 100px以上スクロールしたら表示
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!shouldShow) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <button
        onClick={() => alert('現在、無料LLMO診断サービスは準備中です。\n\nより高品質な分析結果をお届けするため、システムの最適化を進めております。サービス開始まで今しばらくお待ちください。\n\n個別のご相談については、お問い合わせフォームよりお気軽にお声かけください。')}
        className="bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 group"
      >
        <div className="bg-white rounded-full p-2 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="GYAKUTEN Logo"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
        <div className="hidden sm:block">
          <div className="text-sm font-bold">無料診断</div>
          <div className="text-xs opacity-90">AI最適化チェック</div>
        </div>
        <div className="sm:hidden">
          <div className="text-sm font-bold">無料診断</div>
        </div>
        <svg
          className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}