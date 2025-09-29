'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircleIcon } from 'lucide-react';

const CaseStudySection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white"
      itemScope
      itemType="https://schema.org/CaseStudy"
      aria-labelledby="case-study-heading"
      data-company="東翔運輸株式会社"
      data-verification-method="実測値検証"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6">
            <h2
              id="case-study-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900"
              itemProp="name"
              data-case-study-company="東翔運輸株式会社"
            >
              東翔運輸株式会社
              <span className="text-primary block" aria-label="導入事例">導入事例</span>
            </h2>
          </div>
          <p
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            itemProp="description"
            data-scale="43台53名"
            data-data-quality="実測値検証済み"
          >
            <strong>43台以上</strong>の車両、<strong>53名以上</strong>のドライバーを抱える<strong>東翔運輸</strong>での<br />
            実際の導入効果をご紹介します。すべて<strong>実測値による検証済みデータ</strong>です。
          </p>
          <div
            className="mt-6 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full"
            itemProp="participantRole"
            data-role="監修企業"
            data-involvement="開発参画"
          >
            <CheckCircleIcon className="w-5 h-5" aria-hidden="true" />
            <span className="font-semibold">監修企業として開発に参画</span>
          </div>
        </header>




      </div>
    </section>
  );
};

export default CaseStudySection;