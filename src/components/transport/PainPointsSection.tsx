'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangleIcon, PhoneIcon, ClockIcon, FileTextIcon, MapPinIcon } from 'lucide-react';

const painPoints = [
  {
    icon: MapPinIcon,
    title: '車両がどこで何をしているか把握できない',
    description: '車両の現在地や稼働状況が分からず、効率的な配車ができない。顧客からの問い合わせにも即座に答えられない。',
    impact: '配車効率低下・顧客満足度低下',
  },
  {
    icon: PhoneIcon,
    title: '休暇調整の電話が鳴り止まない',
    description: 'ドライバーからの休暇申請や調整で電話が頻繁にかかってきて、管理者の業務が中断される。',
    impact: '管理者の生産性低下',
  },
  {
    icon: AlertTriangleIcon,
    title: '点検時期を忘れて運行停止',
    description: '車検や定期点検の期限管理が煩雑で、うっかり期限切れで車両が使えなくなることがある。',
    impact: '運行停止・売上機会損失',
  },
  {
    icon: FileTextIcon,
    title: '複数の管理表やシステムに時間を取られる',
    description: 'Excel、紙の台帳、既存システムなど複数のツールを使い分けており、二重入力や確認作業に時間がかかる。',
    impact: '管理工数増大・ミス発生',
  },
  {
    icon: ClockIcon,
    title: '出庫時間の記録管理が煩雑',
    description: 'ドライバーの出庫時間を正確に記録・管理できず、月末の請求業務で困ることがある。',
    impact: '請求根拠不明確・売上管理困難',
  },
];

const PainPointsSection: React.FC = () => {
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
      className="py-20 bg-gray-50"
      itemScope
      itemType="https://schema.org/Problem"
      aria-labelledby="pain-points-heading"
      role="main"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2
            id="pain-points-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6"
            itemProp="name"
            data-problem-category="運送業界課題"
          >
            こんな悩み、
            <span className="text-primary block" aria-label="解決可能な問題">まだ続けますか？</span>
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            itemProp="description"
            data-target-audience="運送業界経営者"
            data-problem-count="5つの共通課題"
          >
            運送業界の経営者が抱える<strong>5つの共通課題</strong>。<br />
            これらの問題を放置すると、<strong>競合他社との差</strong>は広がるばかりです。
          </p>
        </header>

        {/* Pain Points Flow */}
        <div className="max-w-5xl mx-auto space-y-12" role="list" aria-label="運送業界の5つの課題">
          {painPoints.map((point, index) => (
            <article
              key={index}
              className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-8 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              } ${index % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}
              style={{ transitionDelay: `${index * 200}ms` }}
              itemScope
              itemType="https://schema.org/Problem"
              data-problem-index={index + 1}
              role="listitem"
            >
              {/* Icon */}
              <div
                className="flex-shrink-0 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-red-100 text-red-600 rounded-full"
                role="img"
                aria-label={`課題${index + 1}のアイコン`}
              >
                <point.icon className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
              </div>

              {/* Content */}
              <div className={`flex-grow ${index % 2 === 1 ? 'sm:text-right' : ''}`}>
                <h3
                  className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-tight"
                  itemProp="name"
                  data-problem-category="運送業界課題"
                >
                  {point.title}
                </h3>
                <p
                  className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed"
                  itemProp="description"
                  data-problem-description="true"
                >
                  {point.description}
                </p>
                <div className={`inline-flex items-center gap-2 text-red-600 font-semibold text-sm sm:text-base ${index % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
                  <div
                    className="w-2 h-2 bg-red-500 rounded-full"
                    role="img"
                    aria-label="影響インジケータ"
                  ></div>
                  <span
                    itemProp="impact"
                    data-business-impact={point.impact}
                    aria-label={`この課題の業務への影響: ${point.impact}`}
                  >
                    影響: {point.impact}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Solution Section */}
        <div className={`mt-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${painPoints.length * 200}ms` }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary mb-6">
              解決できます
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
              これら5つの課題を<span className="font-bold text-primary">すべて解決</span>した<br />
              運送業界専用システムがあります
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PainPointsSection;