'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  TruckIcon,
  UsersIcon,
  CalendarIcon,
  ClockIcon,
  BellIcon,
  BarChart3Icon,
  CheckCircleIcon,
  StarIcon
} from 'lucide-react';

const features = [
  {
    icon: TruckIcon,
    title: '車両管理機能',
    subtitle: 'リアルタイム車両ステータス管理',
    description: '車両番号、車種、年式、チーム情報を一元管理。リアルタイムで車両の状態（正常/点検中/修理中）を把握できます。',
    keyFeatures: [
      '車検・点検自動計算機能（3ヶ月ごと自動算出）',
      'アラート機能（7日前緊急、30日前警告、3ヶ月前通知）',
      '点検予約システム（業者管理・ステータス追跡）',
      'クレーン年次点検特別管理機能'
    ],
    benefits: '点検漏れゼロ化、車両稼働率向上',
    isUnique: false,
    image: '/images/transport/features/vehicle-management.jpg'
  },
  {
    icon: UsersIcon,
    title: 'ドライバー管理機能',
    subtitle: 'セキュアな社員情報統合管理',
    description: '社員番号、氏名、チーム、連絡先から免許情報まで一括管理。外注ドライバーも区別して管理できます。',
    keyFeatures: [
      '免許番号・区分・有効期限自動チェック',
      'bcryptハッシュ化セキュリティ',
      'ロールベース権限（管理者/ドライバー）',
      '外注ドライバー区別管理'
    ],
    benefits: '情報管理の一元化、セキュリティ強化',
    isUnique: false,
    image: '/images/transport/features/driver-management.jpg'
  },
  {
    icon: CalendarIcon,
    title: '休暇・勤務管理機能',
    subtitle: 'スマート休暇申請システム',
    description: 'カレンダー形式での直感的休暇申請。チーム別上限自動チェックで、効率的なシフト管理を実現します。',
    keyFeatures: [
      'チーム別休暇上限自動チェック（業界初）',
      '月最低休暇日数管理（デフォルト9日）',
      '祝日自動取得・カレンダー表示',
      '特定期間・曜日組み合わせ制限設定'
    ],
    benefits: '電話対応80%削減、シフト管理効率化',
    isUnique: false,
    image: '/images/transport/features/vacation-management.jpg'
  },
  {
    icon: ClockIcon,
    title: '出庫時間管理機能',
    subtitle: '業界唯一の出庫記録システム',
    description: 'ドライバー別の出庫時刻を正確記録。月末請求の根拠を明確化し、キャッシュフロー改善に貢献します。',
    keyFeatures: [
      'ドライバー別出庫時刻正確記録',
      '使用車両自動記録・特記事項管理',
      'CSV形式データエクスポート',
      '日別・月別出庫時間分析'
    ],
    benefits: '請求根拠明確化、売上管理精度向上',
    isUnique: true,
    image: '/images/transport/features/departure-time.jpg'
  },
  {
    icon: BellIcon,
    title: '通知・アラートシステム',
    subtitle: '多層通知で業務漏れゼロ',
    description: '優先度別（低/中/高/緊急）の4段階通知システム。スマートフォンにも即時配信で、重要な情報を見逃しません。',
    keyFeatures: [
      '車検・点検・車両割当通知',
      '既読/未読管理・アクション要求フラグ',
      '予約配信機能',
      'スマートフォン即時通知'
    ],
    benefits: '業務漏れ防止、対応スピード向上',
    isUnique: false,
    image: '/images/transport/features/notification-system.jpg'
  },
  {
    icon: BarChart3Icon,
    title: '車両稼働管理',
    subtitle: '可視化された稼働状況管理',
    description: '日別稼働台数をカレンダー表示。稼働不可期間設定や一時的車両割当で、効率的な車両運用を支援します。',
    keyFeatures: [
      '日別稼働台数カレンダー表示',
      '稼働不可期間設定（修理・事故・故障）',
      '一時的車両割当・自動復元機能',
      '履歴管理と通知連携'
    ],
    benefits: '車両運用効率化、稼働率向上',
    isUnique: false,
    image: '/images/transport/features/vehicle-operation.jpg'
  },
];

const CoreFeaturesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
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
      itemType="https://schema.org/SoftwareFeature"
      aria-labelledby="core-features-heading"
      role="main"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2
            id="core-features-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6"
            itemProp="name"
            data-feature-count="6つの統合機能"
            data-industry="運送業界"
          >
            運送業界を変革する
            <span className="text-primary block" aria-label="6つの統合機能">6つの統合機能</span>
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            itemProp="description"
            data-proof-company="東翔運輸"
            data-result="管理業務50%削減"
          >
            <strong>東翔運輸</strong>で実証済み。<strong>管理業務50%削減</strong>を実現した<strong>6つのコア機能</strong>が、<br />
            あなたの運送会社の業務を<strong>根本から改革</strong>します。
          </p>
        </header>

        {/* Features Compact List */}
        <div className="space-y-4 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 bg-white border border-gray-200 hover:border-primary/30 transition-all duration-300 cursor-pointer ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => {
                setActiveFeature(index);
                setShowModal(true);
              }}
            >
              {/* Icon */}
              <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg ${
                feature.isUnique
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-primary/10 text-primary'
              }`}>
                <feature.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-gray-900 whitespace-nowrap">
                      {feature.title}
                    </h3>
                    {feature.isUnique && (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                        業界初
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-primary whitespace-nowrap">
                    {feature.benefits}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {feature.subtitle}
                </p>
              </div>

              {/* Expand indicator */}
              <div className="flex-shrink-0 text-gray-400">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg sm:rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
              {/* Sticky Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="sticky top-4 right-4 z-10 ml-auto mb-[-2rem] w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all duration-200 border border-gray-200"
                style={{ float: 'right' }}
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 p-4 sm:p-6 border-b border-gray-200">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${
                  features[activeFeature].isUnique
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-primary text-white'
                }`}>
                  {React.createElement(features[activeFeature].icon, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {features[activeFeature].title}
                  </h3>
                  {features[activeFeature].isUnique && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">
                      業界初
                    </span>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Large Image Area */}
                <div className="mb-8">
                  <div className="relative rounded-xl aspect-[16/9] overflow-hidden bg-gray-50 shadow-lg">
                    <Image
                      src={features[activeFeature].image}
                      alt={`${features[activeFeature].title}の実際の画面`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    />
                  </div>
                </div>

                {/* Content Below Image */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left: Description */}
                  <div>
                    <p className="text-primary font-semibold mb-4">
                      {features[activeFeature].subtitle}
                    </p>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {features[activeFeature].description}
                    </p>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-bold text-green-700">
                          効果: {features[activeFeature].benefits}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Key Features */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">主要機能</h4>
                    <div className="space-y-3">
                      {features[activeFeature].keyFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Integration Message */}
        <div className={`mt-12 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-4 sm:p-6 max-w-3xl mx-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 leading-tight">
              6つの機能すべてが統合されたシステム
            </h3>
            <p className="text-sm sm:text-base opacity-90 mb-4 leading-normal">
              東翔運輸実証済みの運送業界特化型システムを<br className="sm:hidden" />そのまま導入できます
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-3 inline-block">
              <div className="text-xs sm:text-sm font-semibold">
                管理業務50%削減 × 点検漏れゼロ化 = 業務効率革命
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreFeaturesSection;