'use client';

import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "LLMOライティングと従来のSEOライティングの違いは何ですか？",
    answer: "従来のSEOライティングは主にGoogle検索を対象としていますが、LLMOライティングはPerplexity AIやChatGPT Search、Google GeminiなどのAI検索での引用も視野に入れた最適化を行います。構造化データ、FAQ形式、内部リンク設計など、AIが理解・引用しやすい構造を標準実装しています。"
  },
  {
    question: "最低発注文字数や納期はどのくらいですか？",
    answer: "最低1,000字から承っており、通常の納期は5〜7営業日です。お急ぎの場合は特急納品オプション（基本料金+30%）で対応可能です。文字数や内容の複雑さによって納期は調整いたします。"
  },
  {
    question: "専門分野の記事でも対応可能ですか？",
    answer: "はい、対応可能です。ただし、高度な専門分野については追加ヒアリングや専門家レビューが必要な場合があります。その場合の追加費用については事前にお見積もりいたします。"
  },
  {
    question: "修正回数に制限はありますか？",
    answer: "基本料金には初稿＋1回修正が含まれています。2回目以降の修正は1回につき500円で承ります。大幅な方向性の変更でなければ、細かな調整は柔軟に対応いたします。"
  },
  {
    question: "どのような業界・ジャンルに対応していますか？",
    answer: "幅広い業界・ジャンルに対応しています。特に中小企業・個人事業主向けのBtoB、BtoC問わず豊富な実績があります。製造業、サービス業、IT、医療、教育など様々な分野での執筆経験があります。"
  },
  {
    question: "画像や図表の挿入も依頼できますか？",
    answer: "はい、画像選定・編集オプション（2,000〜5,000円/枚）で対応可能です。著作権フリー素材の選定、簡単な画像編集、図表作成なども承っています。記事の内容に合わせて最適な画像をご提案いたします。"
  },
  {
    question: "継続的な記事制作も可能ですか？",
    answer: "はい、継続的な記事制作も承っています。月間記事数や納期スケジュールなど、お客様のニーズに合わせてプランを調整いたします。継続利用の場合、割引プランなどもご相談可能です。"
  }
];

export default function WriteLLMOFAQSection() {
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