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
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            なぜGYAKUTENが
            <span className="text-primary block">選ばれるのか？</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            主要競合他社との詳細比較。価格、機能、サポート全ての面で<br />
            GYAKUTENが圧倒的な優位性を持つ理由をご確認ください。
          </p>
        </div>

        {/* Comparison Table */}
        <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
              <h3 className="text-2xl font-bold text-center">機能・価格比較表</h3>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">比較項目</th>
                    <th className="px-6 py-4 text-center font-semibold text-primary bg-primary/5">
                      GYAKUTEN
                      <div className="text-xs font-normal text-primary mt-1">（当社）</div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">
                      大手A社
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">
                      大手B社
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {row.feature}
                      </td>
                      <td className={`px-6 py-4 text-center ${getCellColor(row.type, true)}`}>
                        {row.type === 'unique' && (
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <StarIcon className="w-4 h-4 text-yellow-500" />
                            <span className="text-xs text-yellow-600">業界唯一</span>
                          </div>
                        )}
                        {row.gyakuten}
                      </td>
                      <td className={`px-6 py-4 text-center ${getCellColor(row.type, false)}`}>
                        {row.competitorA}
                      </td>
                      <td className={`px-6 py-4 text-center ${getCellColor(row.type, false)}`}>
                        {row.competitorB}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="bg-primary/5 p-6 text-center">
              <p className="text-primary font-semibold">
                全項目でGYAKUTENが優位性を持っています
              </p>
            </div>
          </div>
        </div>

        {/* Key Advantages - Non-card Layout */}
        <div className="mb-16 space-y-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className={`flex items-center gap-8 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              } ${index % 2 === 1 ? 'flex-row-reverse text-right' : ''}`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center">
                <advantage.icon className="w-10 h-10" />
              </div>

              {/* Content */}
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-lg text-gray-600 mb-3 leading-relaxed">
                  {advantage.description}
                </p>
                <div className={`inline-flex items-center gap-2 text-primary font-bold text-lg ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>{advantage.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ROI Calculation */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              投資回収期間の比較
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
              {/* GYAKUTEN */}
              <div className="text-center">
                <div className="mb-4">
                  <div className="text-6xl font-black text-primary mb-2">3ヶ月</div>
                  <div className="text-2xl font-bold text-gray-900">GYAKUTEN</div>
                </div>
                <div className="text-gray-600 space-y-1">
                  <div>初期費用: 0円</div>
                  <div>月額: 3-4.5万円</div>
                  <div className="text-green-600 font-bold mt-2">最速回収</div>
                </div>
              </div>

              <div className="hidden md:block text-6xl text-gray-300 font-thin">VS</div>

              {/* Competitor A */}
              <div className="text-center">
                <div className="mb-4">
                  <div className="text-6xl font-black text-gray-500 mb-2">9ヶ月</div>
                  <div className="text-2xl font-bold text-gray-900">大手A社</div>
                </div>
                <div className="text-gray-600 space-y-1">
                  <div>初期費用: 12万円</div>
                  <div>月額: 6.5万円</div>
                  <div className="text-red-600 font-bold mt-2">3倍の期間</div>
                </div>
              </div>

              <div className="hidden md:block text-6xl text-gray-300 font-thin">VS</div>

              {/* Competitor B */}
              <div className="text-center">
                <div className="mb-4">
                  <div className="text-6xl font-black text-gray-500 mb-2">15ヶ月</div>
                  <div className="text-2xl font-bold text-gray-900">大手B社</div>
                </div>
                <div className="text-gray-600 space-y-1">
                  <div>初期費用: 18万円</div>
                  <div>月額: 8.5万円</div>
                  <div className="text-red-600 font-bold mt-2">5倍の期間</div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-6">
              <p className="text-2xl text-gray-700">
                <span className="font-bold text-primary">GYAKUTEN</span>なら、
                他社の<span className="font-bold text-red-600">1/3〜1/5の期間</span>で投資回収が可能です
              </p>
              <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-6">
                <div className="text-yellow-800 font-bold text-lg">
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