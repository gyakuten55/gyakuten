'use client';

import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "他のコンサルティング会社との違いは何ですか？",
    answer: "①専門用語ゼロの現場主義アプローチ、②中小企業特化で月15万円〜の現実的価格、③月単位解約可能な柔軟性、④97%継続率の実績が主な差別化ポイントです。大手コンサルのような理論重視ではなく、現場ですぐに使える実務直結の支援を提供しています。"
  },
  {
    question: "契約期間の縛りはありますか？いつでも解約できますか？",
    answer: "はい、月単位でいつでも解約可能です。長期契約の縛りは一切ありません。成果に自信があるからこその設計で、効果が感じられない場合はすぐに停止していただけます。解約希望の場合は前月末までにご連絡ください。"
  },
  {
    question: "具体的にどのようなサポートを受けられますか？",
    answer: "スタンダードプランでは月次ミーティング最大4回、LLMO診断レポート、実装指導、効果測定、社内報告書作成を行います。プレミアムプランではこれらに加えて経営戦略会議、競合分析、事業戦略レベルのLLMO設計も含まれます。"
  },
  {
    question: "効果が出るまでどのくらい期間がかかりますか？",
    answer: "一般的には1〜3ヶ月で初期効果を実感いただけることが多いです。ただし、現状のサイト状況や実装スピードにより異なります。初月は現状分析と改善計画策定、2ヶ月目から本格的な実装支援を行い、3ヶ月目で効果測定と次段階の戦略を練ります。"
  },
  {
    question: "どのような業界・規模の企業が対象ですか？",
    answer: "従業員5〜50名規模の中小企業が主な対象です。業界は問いませんが、特にWeb集客を重視する製造業、サービス業、小売業での実績が豊富です。ITリテラシーが高くなくても安心してご利用いただけるよう設計されています。"
  },
  {
    question: "スタンダードとプレミアムの違いを教えてください。",
    answer: "主な違いは月次ミーティング回数（4回vs8回）と支援範囲です。スタンダードは実装支援中心、プレミアムは経営戦略レベルの相談も含みます。多くの企業様はスタンダードから開始し、必要に応じてプレミアムに変更されています。"
  },
  {
    question: "技術的な知識がなくても大丈夫ですか？",
    answer: "はい、全く問題ありません。専門用語を一切使わず、ITが苦手な方でも理解できる日本語で説明いたします。実装作業も社内で対応できるよう、詳しい手順書と継続的なサポートを提供しています。"
  },
  {
    question: "想定通りの成果が出ない場合はどうなりますか？",
    answer: "技術仕様や市場環境の変化により、想定通りの成果が出ない可能性はあります。その場合は原因分析を行い、代替案の提示や戦略の見直しを行います。また、月単位解約が可能なため、効果が感じられない場合は費用負担を最小限に抑えることができます。"
  }
];

export default function ConsultingFAQSection() {
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