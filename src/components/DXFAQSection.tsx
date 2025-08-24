'use client';

import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "大手パッケージとの違いは何ですか？",
    answer: "大手パッケージは機能過多で高額、現場に合わない場合が多いのに対し、GYAKUTENは現場ヒアリングで「本当に使う機能」のみを厳選し、10万円から開発可能です。ITが苦手なスタッフでも使いやすい直感的なUI/UXを重視しています。"
  },
  {
    question: "開発期間はどのくらいかかりますか？",
    answer: "システムの規模・複雑さにより異なりますが、最小構成であれば1〜3ヶ月程度です。段階開発方式により、まず基本機能をリリースし、効果を確認しながら段階的に拡張していくため、早期から効果を実感できます。"
  },
  {
    question: "月額保守は必須ですか？",
    answer: "月額保守は必須ではありません。システムが安定稼働し、サポートが特に必要でない場合は保守契約なしでもご利用いただけます。ただし、継続的なサポートをご希望の場合は月額0円〜の保守サービスをご用意しています。お客様のニーズに応じて選択いただけます。"
  },
  {
    question: "どのような業界・規模の企業が対象ですか？",
    answer: "従業員5〜50名規模の中小企業が主な対象です。製造業、サービス業、小売業、医療・福祉など業界は問いません。Excel・紙運用から脱却したい、業務効率化を図りたい企業様に最適です。"
  },
  {
    question: "既存システムとの連携は可能ですか？",
    answer: "はい、可能です。会計ソフト、販売管理システム、メール配信システムなど、既存システムとのデータ連携も対応いたします。ただし、連携先システムのAPI仕様により追加費用が発生する場合があります。"
  },
  {
    question: "導入後のサポート体制はどうなっていますか？",
    answer: "導入後も継続的にサポートいたします。月次メンテナンス、質問対応、軽微な機能改善を含み、業務の変化に合わせてシステムを進化させます。すべて自社内で対応するため、迅速かつ柔軟なサポートが可能です。"
  },
  {
    question: "段階開発とは具体的にどのような進め方ですか？",
    answer: "まず最小限の機能でシステムをリリースし、実際に使用していただきながら効果を測定します。その後、現場の声や業務変化に合わせて段階的に機能を追加・改善していく開発手法です。大規模投資のリスクを避けながら、最適なシステムを構築できます。"
  }
];

export default function DXFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black text-black mb-6">
            よくある質問
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-4 md:p-6 transition-all duration-300 focus:outline-none ${
                  openIndex === index 
                    ? 'bg-primary text-white' 
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm md:text-lg font-bold pr-4 ${
                    openIndex === index ? 'text-white' : 'text-black'
                  }`}>
                    Q. {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
              
              <div className={`transition-all duration-300 overflow-hidden ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-4 md:px-6 pb-4 md:pb-6 bg-gray-50">
                  <div className="pt-3 md:pt-4 border-t border-gray-200">
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      A. {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}