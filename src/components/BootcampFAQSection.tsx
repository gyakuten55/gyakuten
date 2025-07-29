'use client';

import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "180日間のプログラム内容はどのようなものですか？",
    answer: "週1回の定例ミーティング（個別指導）を中心に、営業・Web・SNS・LLMO対策まで全方位的にスキル習得を進めます。代表・中山蒼が受講生の状況に合わせて完全にカスタマイズしたカリキュラムを提供し、随時チャットサポートや課題フィードバックも行います。"
  },
  {
    question: "成果コミット型とは具体的にどのような保証ですか？",
    answer: "プログラム開始前に具体的な売上目標を設定し、180日後にその目標を達成できなかった場合、受講料の50%を返金いたします。ただし、指定された課題や定例ミーティングへの参加など、一定の条件を満たしていただくことが前提となります。"
  },
  {
    question: "どのような業界・事業規模の方が対象ですか？",
    answer: "主に個人事業主・フリーランス・中小企業経営者の方が対象です。現在の売上規模は問いませんが、「月収100万円レベル」を目指す強い意欲と、週1回の定例ミーティングに参加できる時間的余裕がある方に最適です。"
  },
  {
    question: "他のビジネススクールとの違いは何ですか？",
    answer: "①代表が全受講生を直接指導（講師複数制ではない）、②画一的カリキュラムではなく完全個別対応、③成果コミット型の返金保証、④デジタル・アナログ両方の手法を組み合わせたハイブリッド指導が主な差別化点です。"
  },
  {
    question: "営業経験がない初心者でも参加可能ですか？",
    answer: "はい、営業未経験の方でも参加可能です。むしろ基礎から体系的に学べるため、変な癖がつく前に正しいスキルを身につけることができます。代表が一人ひとりのレベルに合わせて指導内容を調整いたします。"
  },
  {
    question: "卒業後のサポートはありますか？",
    answer: "はい、卒業後も継続的なネットワークが維持されます。同期生とのつながりや、代表との関係性も続くため、長期的な事業成長をサポートする環境が整っています。また、追加指導が必要な場合は別途ご相談可能です。"
  },
  {
    question: "モニター特別価格はいつまで有効ですか？",
    answer: "現在のモニター特別価格（10万円）は、プログラムの効果検証のための限定価格です。正式価格への変更時期については、受講希望者の状況を見ながら決定いたします。ご検討中の方はお早めにご相談ください。"
  }
];

export default function BootcampFAQSection() {
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