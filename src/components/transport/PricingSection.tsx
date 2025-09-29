'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckIcon, StarIcon, CreditCardIcon, BanknoteIcon } from 'lucide-react';

const pricingPlan = {
  name: 'GYAKUTEN運送管理システム',
  subtitle: 'あらゆる運送会社に対応',
  basePrice: '30,000',
  maxPrice: '45,000',
  features: [
    '車両管理（無制限）',
    'ドライバー管理（無制限）',
    '休暇・勤務管理',
    '出庫時間管理（業界唯一）',
    '通知・アラートシステム',
    '車両稼働管理',
    'リアルタイムサポート',
    'データバックアップ',
    'セキュリティ監査',
    '導入コンサルティング',
    'カスタマイズ対応',
    'API連携対応'
  ],
  ctaText: '無料相談・見積もり',
  ctaColor: 'bg-primary hover:bg-primary/90'
};

const includedServices = [
  '全機能無制限利用',
  'リアルタイムサポート',
  '定期アップデート',
  'データバックアップ',
  'セキュリティ監査',
  '24時間以内問い合わせ対応'
];

const paymentMethods = [
  {
    icon: CreditCardIcon,
    name: 'クレジットカード',
    description: 'Visa、MasterCard、JCB、AMEX対応'
  },
  {
    icon: BanknoteIcon,
    name: '銀行振込',
    description: '月次請求書による銀行振込'
  }
];

const PricingSection: React.FC = () => {
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
      itemType="https://schema.org/Offer"
      aria-labelledby="pricing-heading"
      data-pricing-model="monthly-subscription"
      data-initial-cost="0円"
      data-price-range="30000-45000"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            業界最安水準の
            <span className="text-primary block">透明性料金体系</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            初期費用0円、シンプルな月額制。車両台数に応じた明確な料金設定で、<br />
            予算計画も立てやすく、導入後の追加費用も一切ありません。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-green-100 text-green-800 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-bold text-base sm:text-lg">
              初期費用 0円
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-bold text-base sm:text-lg">
              最低契約期間 6ヶ月
            </div>
          </div>
        </header>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={`relative bg-white rounded-2xl shadow-xl border-2 border-primary transition-all duration-500 hover:shadow-2xl ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                <StarIcon className="w-4 h-4" />
                業界最安水準
              </div>
            </div>

            <div className="p-4 sm:p-8">
              {/* Plan Header */}
              <div className="text-center mb-8 mt-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {pricingPlan.name}
                </h3>
                <p className="text-lg sm:text-xl text-gray-600 mb-6">{pricingPlan.subtitle}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2">
                    ¥{pricingPlan.basePrice}
                    <span className="text-xl sm:text-2xl font-normal text-gray-600"> ~ </span>
                    ¥{pricingPlan.maxPrice}
                    <span className="text-lg sm:text-xl font-normal text-gray-600">/月</span>
                  </div>
                  <p className="text-base sm:text-lg text-gray-600 mb-2">車両台数に応じた料金設定</p>
                  <p className="text-sm text-gray-500">税込価格・初期費用0円</p>
                </div>

                {/* Compact Price Range */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-bold text-gray-900 text-center text-base sm:text-lg">料金目安</h4>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">~20台</span>
                      <span className="text-lg font-bold text-primary">¥30,000/月</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">21-40台</span>
                      <span className="text-lg font-bold text-primary">¥35,000/月</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">41台~</span>
                      <span className="text-lg font-bold text-primary">¥40,000/月</span>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium inline-block">
                      カスタマイズ対応: +¥5,000~/月
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 mb-6 text-center text-lg sm:text-xl">全機能標準搭載</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pricingPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <a href="/contact" className={`${pricingPlan.ctaColor} text-white px-8 py-3 sm:px-12 sm:py-4 rounded-lg font-semibold text-lg sm:text-xl transition-colors duration-200 mb-4 inline-block min-h-[44px] flex items-center justify-center`}>
                  {pricingPlan.ctaText}
                </a>
                <p className="text-sm text-gray-500">お気軽にお問い合わせください</p>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Services */}
        <div className={`mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              オプション機能・カスタマイズ対応
            </h3>
            <p className="text-gray-600 text-center mb-8">
              お客様の会社に合わせて機能をカスタマイズ。追加機能の開発も承ります。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  機能カスタマイズ
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• 管理画面のレイアウト変更</li>
                  <li>• 専用レポート機能</li>
                  <li>• 既存システムとの連携</li>
                  <li>• 業務フローに合わせた機能調整</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  追加機能開発
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• 独自の管理機能追加</li>
                  <li>• 外部API連携開発</li>
                  <li>• 特殊な業界対応機能</li>
                  <li>• モバイルアプリ対応</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-8">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 inline-block">
                <div className="text-primary font-semibold text-lg mb-1">
                  お見積もり無料
                </div>
                <div className="text-gray-600 text-sm">
                  ご要望をお聞かせいただければ、詳細なお見積もりをご提示いたします
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Included Services */}
        <div className={`mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              全プランに含まれるサービス
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {includedServices.map((service, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className={`mb-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            お支払い方法
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mx-auto mb-4">
                  <method.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {method.name}
                </h4>
                <p className="text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
              <div className="text-blue-800 font-semibold text-lg mb-1">
                分割払いも対応可能
              </div>
              <div className="text-blue-600 text-sm">
                お客様の状況に応じて柔軟に対応いたします
              </div>
            </div>
          </div>
        </div>

        {/* Cost Comparison */}
        <div className={`mb-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
              年間コスト比較（20台の場合）
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2">¥360,000</div>
                <div className="text-base sm:text-lg mb-1 font-bold">GYAKUTEN</div>
                <div className="text-xs sm:text-sm opacity-90">月額30,000円 × 12ヶ月</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2">¥900,000</div>
                <div className="text-base sm:text-lg mb-1 font-bold">大手A社</div>
                <div className="text-xs sm:text-sm opacity-90">初期15万円 + 月額6.25万円 × 12ヶ月</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2">¥1,200,000</div>
                <div className="text-base sm:text-lg mb-1 font-bold">大手B社</div>
                <div className="text-xs sm:text-sm opacity-90">初期20万円 + 月額8.33万円 × 12ヶ月</div>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
                年間最大84万円の削減効果
              </div>
              <div className="text-sm sm:text-base lg:text-lg opacity-90">
                削減したコストで新しい車両の購入も可能です
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PricingSection;