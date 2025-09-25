'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TrendingUpIcon, ClockIcon, PhoneIcon, AlertTriangleIcon, CheckCircleIcon, BuildingIcon } from 'lucide-react';

const beforeAfterData = [
  {
    category: '管理業務時間',
    before: '月60時間',
    after: '月30時間',
    improvement: '50%削減',
    icon: ClockIcon,
    color: 'blue'
  },
  {
    category: '点検漏れ',
    before: '年3回発生',
    after: 'ゼロ化達成',
    improvement: '100%削減',
    icon: AlertTriangleIcon,
    color: 'green'
  },
  {
    category: '電話対応',
    before: '50件/日',
    after: '10件/日',
    improvement: '80%削減',
    icon: PhoneIcon,
    color: 'purple'
  },
  {
    category: 'データ入力ミス',
    before: '月5-10件',
    after: 'ゼロ化達成',
    improvement: '100%削減',
    icon: CheckCircleIcon,
    color: 'red'
  }
];

const qualitativeImpacts = [
  {
    title: '経営者の業務改革',
    description: '管理業務から解放され、営業や戦略策定など本業に集中できるようになった',
    impact: '経営効率向上'
  },
  {
    title: 'ドライバーの自立性向上',
    description: '休暇申請や情報確認を自分で行えるようになり、管理者への依存が大幅に減少',
    impact: '組織運営効率化'
  },
  {
    title: '管理者のストレス軽減',
    description: '常時対応が必要だった電話や確認作業から解放され、計画的な業務遂行が可能',
    impact: '労働環境改善'
  },
  {
    title: '情報共有の透明化',
    description: '全社員が同じ情報にアクセスでき、情報格差や伝達ミスが完全に解消',
    impact: '組織力強化'
  }
];

const CaseStudySection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [countUpVisible, setCountUpVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const countUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const countUpObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountUpVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (countUpRef.current) {
      countUpObserver.observe(countUpRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (countUpRef.current) {
        countUpObserver.unobserve(countUpRef.current);
      }
    };
  }, []);

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      red: 'bg-red-50 text-red-600 border-red-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

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
              className="text-4xl lg:text-5xl font-black text-gray-900"
              itemProp="name"
              data-case-study-company="東翔運輸株式会社"
            >
              東翔運輸株式会社
              <span className="text-primary block" aria-label="導入事例">導入事例</span>
            </h2>
          </div>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
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

        {/* Company Overview */}
        <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            東翔運輸株式会社 概要
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-black text-primary mb-2">43台+</div>
              <div className="text-gray-600">保有車両数</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-black text-primary mb-2">53名+</div>
              <div className="text-gray-600">ドライバー数</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-black text-green-600 mb-2">3日</div>
              <div className="text-gray-600">導入完了期間</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-black text-primary mb-2">100%</div>
              <div className="text-gray-600">利用率</div>
            </div>
          </div>
        </div>

        {/* Before/After Comparison */}
        <div ref={countUpRef} className={`mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            導入前後の変化（定量的効果）
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beforeAfterData.map((data, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-500 ${
                  countUpVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${getColorClasses(data.color)}`}>
                  <data.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  {data.category}
                </h4>

                {/* Before */}
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">導入前</div>
                  <div className="text-lg font-semibold text-red-600">
                    {data.before}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center mb-3">
                  <TrendingUpIcon className="w-5 h-5 text-green-500 rotate-90" />
                </div>

                {/* After */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">導入後</div>
                  <div className="text-lg font-semibold text-green-600">
                    {data.after}
                  </div>
                </div>

                {/* Improvement */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 text-center">
                  <div className="text-sm font-bold text-green-800">
                    {data.improvement}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



      </div>
    </section>
  );
};

export default CaseStudySection;