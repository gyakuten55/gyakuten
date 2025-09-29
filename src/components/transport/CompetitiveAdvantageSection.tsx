'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckIcon, StarIcon, TrendingUpIcon } from 'lucide-react';

const comparisonData = [
  {
    feature: '初期費用',
    gyakuten: '0円',
    competitorA: '10-15万円',
    competitorB: '15-20万円',
    type: 'cost'
  },
  {
    feature: '月額料金',
    gyakuten: '3-4.5万円',
    competitorA: '5-8万円',
    competitorB: '7-10万円',
    type: 'cost'
  },
  {
    feature: '導入期間',
    gyakuten: '最短3日',
    competitorA: '2-4週間',
    competitorB: '1-2ヶ月',
    type: 'time'
  },
  {
    feature: '出庫時間管理',
    gyakuten: '業界唯一対応',
    competitorA: '非対応',
    competitorB: '非対応',
    type: 'unique'
  },
  {
    feature: '60代対応',
    gyakuten: '即日利用可能',
    competitorA: '研修必要',
    competitorB: '習得困難',
    type: 'usability'
  },
  {
    feature: 'ROI回収期間',
    gyakuten: '3ヶ月',
    competitorA: '6-12ヶ月',
    competitorB: '12-18ヶ月',
    type: 'time'
  },
  {
    feature: 'カスタマイズ',
    gyakuten: '柔軟対応',
    competitorA: '制限あり',
    competitorB: '追加料金',
    type: 'flexibility'
  },
  {
    feature: 'サポート体制',
    gyakuten: '開発元直接',
    competitorA: '代理店経由',
    competitorB: '外部委託',
    type: 'support'
  }
];

const advantages = [
  {
    icon: TrendingUpIcon,
    title: '圧倒的コスト優位性',
    description: '初期費用0円、月額費用も他社の半額以下。3ヶ月でROI回収可能な業界最安水準の価格設定。',
    highlight: '他社比50%以上のコスト削減'
  },
  {
    icon: StarIcon,
    title: '業界唯一の出庫時間管理',
    description: '請求根拠を明確化する出庫時間管理機能は当社のみ。売上管理とキャッシュフロー改善を実現。',
    highlight: '業界オンリーワン機能'
  },
  {
    icon: CheckIcon,
    title: '現場監修による実用性',
    description: '東翔運輸での実運用で検証済み。60代でも即日利用可能な直感的操作性を実現。',
    highlight: '実証済みの使いやすさ'
  }
];

const CompetitiveAdvantageSection: React.FC = () => {
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

  const getCellColor = (type: string, isGYAKUTEN: boolean) => {
    if (!isGYAKUTEN) return 'bg-gray-50 text-gray-600';

    switch (type) {
      case 'cost':
      case 'time':
        return 'bg-green-50 text-green-800 font-semibold';
      case 'unique':
        return 'bg-yellow-50 text-yellow-800 font-semibold';
      case 'usability':
      case 'flexibility':
      case 'support':
        return 'bg-blue-50 text-blue-800 font-semibold';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            なぜGYAKUTENが
            <span className="text-primary block">選ばれるのか？</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            主要競合他社との詳細比較。価格、機能、サポート全ての面で<br />
            GYAKUTENが圧倒的な優位性を持つ理由をご確認ください。
          </p>
        </div>

        {/* Simplified Comparison Cards */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            競合他社との比較
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* GYAKUTEN */}
            <div className="bg-gradient-to-b from-primary to-primary/80 text-white rounded-xl p-4 text-center relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                おすすめ
              </div>
              <h4 className="text-lg font-bold mb-3 mt-2">GYAKUTEN</h4>
              <div className="space-y-2 text-sm">
                <div>初期費用: <span className="font-bold text-yellow-200">0円</span></div>
                <div>月額: <span className="font-bold">3-4.5万円</span></div>
                <div>導入: <span className="font-bold text-yellow-200">最短3日</span></div>
                <div className="text-yellow-200 font-bold">出庫時間管理対応</div>
              </div>
            </div>

            {/* Competitor A */}
            <div className="bg-gray-100 text-gray-700 rounded-xl p-4 text-center">
              <h4 className="text-lg font-bold mb-3 text-gray-800">大手A社</h4>
              <div className="space-y-2 text-sm">
                <div>初期費用: 10-15万円</div>
                <div>月額: 5-8万円</div>
                <div>導入: 2-4週間</div>
                <div className="text-red-600">出庫時間管理非対応</div>
              </div>
            </div>

            {/* Competitor B */}
            <div className="bg-gray-100 text-gray-700 rounded-xl p-4 text-center">
              <h4 className="text-lg font-bold mb-3 text-gray-800">大手B社</h4>
              <div className="space-y-2 text-sm">
                <div>初期費用: 15-20万円</div>
                <div>月額: 7-10万円</div>
                <div>導入: 1-2ヶ月</div>
                <div className="text-red-600">出庫時間管理非対応</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 inline-block">
              <div className="text-sm font-semibold text-green-800">
                ✓ 初期費用0円 ✓ 業界最安水準 ✓ 業界唯一の出庫時間管理
              </div>
            </div>
          </div>
        </div>

        {/* Key Advantages - Compact Cards */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-4 border border-gray-200 hover:border-primary/30 transition-all duration-300 text-center ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <advantage.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                  {advantage.title}
                </h3>
                <div className="inline-flex items-center gap-1 text-primary font-semibold text-sm mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{advantage.highlight}</span>
                </div>
                <p className="text-sm text-gray-600 leading-normal">
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ROI Calculation - Clean Design */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              投資回収期間の比較
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-6">
              {/* GYAKUTEN */}
              <div className="text-center relative">
                <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  最速回収
                </div>
                <div className="text-4xl sm:text-5xl font-black text-primary mb-1">3ヶ月</div>
                <div className="text-lg font-bold text-gray-900 mb-2">GYAKUTEN</div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>初期費用: 0円</div>
                  <div>月額: 3-4.5万円</div>
                </div>
              </div>

              <div className="hidden sm:flex items-center text-2xl text-gray-300 font-light px-4">
                ＞
              </div>

              {/* Competitor A */}
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-gray-400 mb-1">9ヶ月</div>
                <div className="text-lg font-bold text-gray-700 mb-2">大手A社</div>
                <div className="text-sm text-gray-500 space-y-1">
                  <div>初期費用: 12万円</div>
                  <div>月額: 6.5万円</div>
                  <div className="text-red-500 font-semibold">3倍の期間</div>
                </div>
              </div>

              <div className="hidden sm:flex items-center text-2xl text-gray-300 font-light px-4">
                ＞
              </div>

              {/* Competitor B */}
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-gray-400 mb-1">15ヶ月</div>
                <div className="text-lg font-bold text-gray-700 mb-2">大手B社</div>
                <div className="text-sm text-gray-500 space-y-1">
                  <div>初期費用: 18万円</div>
                  <div>月額: 8.5万円</div>
                  <div className="text-red-500 font-semibold">5倍の期間</div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-lg sm:text-xl text-gray-700">
                <span className="font-bold text-primary">GYAKUTEN</span>なら、<br className="sm:hidden" />
                他社の<span className="font-bold text-red-600">1/3〜1/5の期間</span>で投資回収が可能
              </p>
              <div className="border-l-4 border-yellow-500 bg-yellow-50 pl-4 pr-4 py-3 inline-block">
                <div className="text-yellow-800 font-bold text-base sm:text-lg">
                  年間コスト差額: 最大60万円の削減効果
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CompetitiveAdvantageSection;