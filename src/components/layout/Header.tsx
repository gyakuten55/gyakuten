'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navigationItems, serviceItems } from '@/types/navigation';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsServiceDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServiceDropdownOpen(false);
    }, 200); // 200msの遅延
  };

  return (
    <header 
      className="fixed md:top-2 md:left-8 md:right-8 md:rounded-lg top-0 left-0 right-0 rounded-none bg-white border border-gray-200 shadow-lg z-50"
      role="banner"
      aria-label="サイトヘッダー"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* ロゴ */}
          <div className="flex-shrink-0">
            <Link href="/" aria-label="GYAKUTENホームページへ戻る">
              <Image
                src="/logo.png"
                alt="GYAKUTEN - 合同会社GYAKUTEN"
                width={180}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          <div className="flex-1"></div>
          <nav className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="text-black hover:text-primary px-2 py-2 text-sm font-medium flex items-center">
                      {item.name}
                    </button>
                    {isServiceDropdownOpen && (
                      <div 
                        className="absolute top-full left-1/2 transform -translate-x-1/2 pt-1 w-[900px] z-50"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="bg-white shadow-lg rounded-md py-4 border border-gray-100">
                          <div className="grid grid-cols-3 gap-4 px-4">
                            {serviceItems.map((service) => (
                              <Link
                                key={service.name}
                                href={service.href}
                                className="block p-4 rounded-md hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                                onClick={() => setIsServiceDropdownOpen(false)}
                              >
                                <div className="font-semibold text-gray-800 text-sm mb-2">{service.name}</div>
                                <div className="text-xs text-gray-500 mb-2 line-clamp-2">
                                  {service.description}
                                </div>
                                <div className="text-xs text-primary font-medium">
                                  {service.price}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-black hover:text-primary px-2 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTAボタン */}
          <div className="hidden md:flex items-center space-x-3 ml-6">
            <Link
              href="/diagnosis"
              className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              無料診断
            </Link>
            <Link
              href="/contact"
              className="border border-primary text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-colors"
            >
              お問い合わせ
            </Link>
          </div>

          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black hover:text-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border border-white/30 shadow-lg z-40">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <div className="text-black font-medium px-3 py-2 text-base border-b">
                        {item.name}
                      </div>
                      <div className="pl-4">
                        {serviceItems.map((service) => (
                          <Link
                            key={service.name}
                            href={service.href}
                            className="block px-3 py-2 text-sm text-black hover:text-primary"
                            onClick={closeMenu}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-black hover:text-primary block px-3 py-2 text-base font-medium"
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* モバイル用CTAボタン */}
              <div className="pt-4 pb-2 space-y-2">
                <Link
                  href="/diagnosis"
                  className="bg-primary text-white block text-center px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors mx-3"
                  onClick={closeMenu}
                >
                  無料診断
                </Link>
                <Link
                  href="/contact"
                  className="border border-primary text-primary block text-center px-4 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-colors mx-3"
                  onClick={closeMenu}
                >
                  お問い合わせ
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;