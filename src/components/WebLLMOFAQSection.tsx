'use client';

import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "LLMO最適化とは具体的に何をするのですか？",
    answer: "構造化データマークアップ、FAQ形式のコンテンツ設計、E-E-A-T（経験・専門性・権威性・信頼性）に基づく情報設計を行います。これにより、ChatGPTやBardなどのAI検索エンジンがサイトを「発見し・要約し・引用しやすい」構造に最適化します。"
  },
  {
    question: "制作期間はどのくらいかかりますか？",
    answer: "通常2〜3週間でサイト公開まで完了します。ヒアリング・要件整理 → 見積提示・契約 → 設計・制作 → 納品・サポート開始の流れで進行し、お客様との確認作業も含めてスムーズに進められます。"
  },
  {
    question: "継続サポートには何が含まれますか？",
    answer: "修正対応・軽微改修、効果測定アドバイス、運用方法レクチャー、メール・チャット無制限対応が含まれます。最低契約期間は7ヶ月ですが、その後も継続利用可能です。「作って終わり」ではなく、サイトの効果的な運用まで継続的にサポートいたします。"
  },
  {
    question: "他の制作会社との違いは何ですか？",
    answer: "①AI検索に特化した構造化設計、②業界最安値レベルの明確料金、③LLM・LLMO・SEOの専門知識を持つスタッフによる一気通貫サポート、④ヒアリングから実装、その後のサポートまで同じスタッフが担当する継続性が主な差別化ポイントです。"
  },
  {
    question: "7ヶ月後のサポートはどうなりますか？",
    answer: "最低契約期間の7ヶ月経過後も、月額5,000円で継続利用可能です。多くのお客様が継続されており、長期的なWebサイトの成長をサポートしています。解約をご希望の場合は、事前にご連絡いただければ対応いたします。"
  },
  {
    question: "どのような業界・規模の企業が対象ですか？",
    answer: "特に中小企業・個人事業主の方を中心に、ITリテラシーに不安がある方でも安心してご利用いただけるよう設計されています。業界は問わず、製造業、サービス業、小売業など幅広い分野でご利用いただいています。"
  },
  {
    question: "既存サイトのリニューアルも対応可能ですか？",
    answer: "はい、既存サイトのLLMO対応リニューアルも承っております。現在のサイトの良い部分を活かしながら、AI検索時代に対応した構造に最適化いたします。まずは無料相談でご相談ください。"
  }
];

export default function WebLLMOFAQSection() {
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