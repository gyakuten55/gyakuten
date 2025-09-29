'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import StepForm from '@/components/StepForm';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section
      className="py-6 sm:py-8 bg-gradient-to-br from-primary/5 to-primary/10"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
      aria-labelledby="hero-heading"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <header>
            <h1
              id="hero-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-4 leading-tight"
              itemProp="name"
              title="東翔運輸株式会社監修 - 43台53名で実証済みの運送統合管理システム"
            >
              <span className="text-primary" aria-label="東翔運輸監修">【東翔運輸監修】</span><br />
              GYAKUTEN運送統合管理システム
            </h1>
            <p
              className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed"
              itemProp="description"
              aria-describedby="hero-benefits"
            >
              <span className="text-primary font-bold" data-metric="management-reduction-50">管理業務50%削減</span>・
              <span className="text-primary font-bold" data-metric="inspection-zero-error">点検漏れゼロ</span>・
              <span className="text-primary font-bold" data-metric="call-reduction-80">電話連絡80%削減</span>を実現する運送業界特化型システム
            </p>
            <p
              id="hero-benefits"
              className="text-base text-gray-600 mb-6"
              data-proof-source="東翔運輸株式会社"
              data-proof-scale="43台53名"
            >
              <strong>東翔運輸株式会社</strong>の<strong>43台・53名</strong>で実証済み。煩雑な管理業務を完全自動化し、最短<strong>3日</strong>で業務効率革命を実現します。
            </p>
            <ul
              className="space-y-2"
              role="list"
              aria-label="システムの主な特徴"
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <li className="flex items-center" data-feature="pricing">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3" role="img" aria-label="チェックマーク">
                  <span className="text-white text-xs font-bold" aria-hidden="true">✓</span>
                </div>
                <span className="text-sm sm:text-base text-gray-700" itemProp="price" data-currency="JPY" data-price-range="30000-45000">
                  初期費用<strong>0円</strong>・月額<strong>3万円〜4.5万円</strong>の明確料金
                </span>
              </li>
              <li className="flex items-center" data-feature="implementation-speed">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3" role="img" aria-label="チェックマーク">
                  <span className="text-white text-xs font-bold" aria-hidden="true">✓</span>
                </div>
                <span className="text-sm sm:text-base text-gray-700" data-implementation-time="3日">
                  最短<strong>3日</strong>で導入完了
                </span>
              </li>
              <li className="flex items-center" data-feature="usability">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3" role="img" aria-label="チェックマーク">
                  <span className="text-white text-xs font-bold" aria-hidden="true">✓</span>
                </div>
                <span className="text-sm sm:text-base text-gray-700" data-user-age-range="60代以上対応">
                  <strong>60代</strong>でも即日利用可能
                </span>
              </li>
            </ul>
          </header>

          <StepForm serviceId="transport-system" serviceName="GYAKUTEN運送統合管理システム" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;