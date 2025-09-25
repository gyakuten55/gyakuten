'use client';

import React, { useEffect, useState } from 'react';
import { DownloadIcon, PlayIcon, XIcon, ArrowUpIcon } from 'lucide-react';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show floating CTA after scrolling 50% of the viewport
      setIsVisible(scrollY > windowHeight * 0.5);

      // Show scroll to top after scrolling 100% of the viewport
      setShowScrollTop(scrollY > windowHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('resource-form');
    if (formElement) {
      formElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Floating CTA */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-auto'
      }`}>
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Collapsed State */}
          {!isExpanded && (
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">
                    管理業務50%削減
                  </div>
                  <div className="text-xs text-gray-600">
                    資料無料ダウンロード
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(true)}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  詳細
                </button>
              </div>
            </div>
          )}

          {/* Expanded State */}
          {isExpanded && (
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    GYAKUTEN運送システム
                  </h3>
                  <p className="text-sm text-gray-600">
                    管理業務50%削減を実証済み
                  </p>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-green-50 text-green-700 px-2 py-1 rounded text-center">
                    初期費用0円
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-center">
                    最短3日導入
                  </div>
                  <div className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-center">
                    業界唯一機能
                  </div>
                  <div className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-center">
                    60代でも使用可
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={scrollToForm}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <DownloadIcon className="w-4 h-4" />
                  無料資料ダウンロード
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <PlayIcon className="w-4 h-4" />
                  3分デモ動画を見る
                </button>
              </div>

              {/* Trust Badge */}
              <div className="mt-4 text-center">
                <div className="text-xs text-gray-500">
                  東翔運輸株式会社監修・実証済み
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 left-6 z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 ${
            isExpanded ? 'bottom-24' : 'bottom-6'
          }`}
          aria-label="ページトップに戻る"
        >
          <ArrowUpIcon className="w-5 h-5" />
        </button>
      )}

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg md:hidden">
        <div className="flex">
          <button
            onClick={scrollToForm}
            className="flex-1 bg-primary text-white py-4 font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <DownloadIcon className="w-4 h-4" />
            資料ダウンロード
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-4 font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            <PlayIcon className="w-4 h-4" />
            デモ動画
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <div
          className="h-1 bg-primary transition-all duration-150"
          style={{
            width: `${Math.min(
              ((window.scrollY) / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
              100
            )}%`
          }}
        ></div>
      </div>
    </>
  );
};

export default FloatingCTA;