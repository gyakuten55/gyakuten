'use client';

import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "LLMOとSEOの違いは何ですか？",
    answer: "従来のSEOは主にGoogleなどの検索エンジンを対象としていますが、LLMOはChatGPTやBardなどのAI・大規模言語モデルに最適化することを目的としています。AIが理解しやすい構造や内容にすることで、AI検索時代に対応します。"
  },
  {
    question: "診断にはどのくらい時間がかかりますか？",
    answer: "無料簡易診断は2-3営業日、シンプル診断は5-7営業日、伴走改善パッケージは10-14営業日でお届けします。お急ぎの場合はご相談ください。"
  },
  {
    question: "技術的な知識がなくても理解できますか？",
    answer: "はい。専門用語を極力排し、ITが苦手な方でも理解できる日本語でレポートを作成しています。実装手順も詳しく解説するため、貴社にてすぐに取り組んでいただけます。"
  },
  {
    question: "どのような業界・規模の企業が対象ですか？",
    answer: "特に中小企業様を中心に、Web集客を強化したい全ての企業様が対象です。業界は問いません。これまで製造業、サービス業、小売業など幅広い業界でのお手伝いをしています。"
  },
  {
    question: "改善効果はどの程度期待できますか？",
    answer: "サイトの現状により異なりますが、これまでの実績では流入数10-30%、コンバージョン率5-15%の改善を実現しています。効果は改善を実行された後1-3ヶ月で現れることが多いです。"
  },
  {
    question: "実装サポートは含まれていますか？",
    answer: "診断・指導までがLLMO診断サービスの範囲です。実装が必要な場合は、別途「LLMOウェブ制作」「LLMOライティング」などのサービスで対応いたします。診断レポートには詳細な実装手順も含まれているため、貴社での実装も十分可能です。"
  }
];

export default function FAQSection() {
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