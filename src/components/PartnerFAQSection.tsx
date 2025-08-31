'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: '地方の企業ですが、対応可能ですか？',
    answer: '全国どちらでもリモートで対応いたします。必要に応じて現地訪問も可能です。これまでも北海道から沖縄まで、全国のお客様とお取引させていただいております。'
  },
  {
    question: '機密情報の取り扱いは大丈夫ですか？',
    answer: 'NDA（機密保持契約）を締結し、厳格な情報管理を行います。開発チーム全員が守秘義務を遵守し、プロジェクト終了後も機密情報は適切に廃棄いたします。'
  },
  {
    question: '支払い条件はどうなりますか？',
    answer: '月末締め翌月末払いが基本ですが、お客様の状況に応じて柔軟に対応いたします。分割払いや着手金なしでのスタートも相談可能です。'
  },
  {
    question: '開発途中で要件変更があった場合は？',
    answer: '段階開発方式により、要件変更にも柔軟に対応します。変更内容によって追加費用が発生する場合は、事前にお見積もりを提示し、ご了承いただいてから作業を進めます。'
  },
  {
    question: '納期はどれくらいかかりますか？',
    answer: '案件規模によりますが、小規模案件（10-50万円）で1-2ヶ月、中規模案件（100-300万円）で2-4ヶ月程度が目安です。お急ぎの場合は緊急対応も可能です。'
  },
  {
    question: '途中でキャンセルしたい場合は？',
    answer: '作業完了分についてのみご請求させていただきます。理由のない一方的なキャンセルによる損害は別途協議となりますが、合理的な理由がある場合は柔軟に対応いたします。'
  },
  {
    question: '保守サポートは必須ですか？',
    answer: '保守サポートは必須ではありません。納品後7ヶ月間の無料サポート期間終了後、必要に応じて有償保守をご選択いただけます。お客様が不要と判断される場合は無理にお勧めしません。'
  },
  {
    question: '炎上案件の火消しも対応できますか？',
    answer: 'はい、対応可能です。緊急対応として最短即日で着手し、問題の洗い出しから改修・リファクタリングまで一貫して対応いたします。まずは現状をお聞かせください。'
  },
  {
    question: '技術的な相談だけでも可能ですか？',
    answer: '技術コンサルティングのみのご相談も承ります。時間単位での技術相談や、アーキテクチャ設計のレビューなど、お客様のニーズに合わせてご提案いたします。'
  },
  {
    question: 'どのような規模の会社と取引していますか？',
    answer: '従業員5名〜200名程度の中小企業様が中心です。個人事業主から上場企業まで幅広く対応しておりますが、特に中小企業の現場に最適化したサービスを得意としています。'
  }
];

export default function PartnerFAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black text-black mb-6">
            よくあるご質問
          </h2>
          <p className="text-lg text-gray-700">
            パートナー企業様からよくいただくご質問
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                onClick={() => toggleItem(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-black pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        openItems.has(index) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
              
              {openItems.has(index) && (
                <div className="px-6 pb-4 pt-0 border-t border-gray-100">
                  <div className="pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-black mb-2">
              その他のご質問がございましたら
            </h3>
            <p className="text-gray-700 mb-4">
              24時間以内に必ずご返答いたします
            </p>
            <Link
              href="/contact"
              className="bg-primary text-white px-6 py-3 rounded-md text-base font-medium hover:bg-primary/90 transition-colors inline-block"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}