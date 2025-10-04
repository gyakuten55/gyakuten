'use client';

export default function QuestionsSection() {
  const questions = [
    {
      question: 'LLMOは中小企業に必要でしょうか？',
      answer: 'はい、非常に重要です。総務省の調査では、2024年の企業業務における生成AI利用率は55.2%に達しています。AI検索の普及が急速に進む中、早期のLLMO対応が競争優位性確保の鍵となります。'
    },
    {
      question: 'AI検索対策はすぐに始めるべきでしょうか？',
      answer: 'はい、早期の対応をお勧めします。AI検索エンジンは従来の検索エンジンよりも新しいコンテンツを迅速に反映する傾向があるため、先行者利益を得やすい状況です。無料診断から始められます。'
    },
    {
      question: '補助金は利用できるでしょうか？',
      answer: 'はい、IT導入補助金や小規模事業者持続化補助金などが利用できる可能性があります。最大で費用の2/3（上限450万円）が補助されるケースもあります。申請サポートも承っております。'
    },
    {
      question: '技術的な知識がなくても大丈夫でしょうか？',
      answer: 'はい、全く問題ありません。専門用語を一切使わず、ITが苦手な方でも理解できる日本語で説明いたします。実装作業についても、詳しい手順書の提供や継続的なサポートにより、安心してご利用いただけます。'
    },
    {
      question: '効果はどのくらいで現れるでしょうか？',
      answer: 'サイトの現状により異なりますが、これまでの実績では流入数10-30%、コンバージョン率5-15%の改善を1-3ヶ月で実現しています。AI検索は従来のSEOよりも早期に効果を実感できることが多いです。'
    },
    {
      question: '全国どこでも対応可能でしょうか？',
      answer: 'はい、全国どこでも対応可能です。オンラインでのミーティングやサポートが中心となりますが、必要に応じて訪問も承ります。これまでも北海道から沖縄まで、全国の企業様にサービスを提供しています。'
    },
    {
      question: '小規模企業でも依頼できるでしょうか？',
      answer: 'はい、むしろ小規模企業様こそLLMO対応をお勧めします。従業員5名程度の企業様から大手企業様まで、幅広くサービスを提供しています。初期費用を抑えたプランもございます。'
    },
    {
      question: '無料診断だけでも価値はあるでしょうか？',
      answer: 'はい、無料診断だけでも十分な価値があります。現在のWebサイトのLLMO対応度スコア、主要な改善ポイント3-5項目、AI検索での現状評価、優先的に取り組むべき施策をお伝えします。'
    },
    {
      question: '契約期間の縛りはあるでしょうか？',
      answer: 'ウェブ制作サービスのみ最低7ヶ月契約となっています。コンサルティングサービスは月単位でいつでも解約可能です。長期契約の縛りを最小限にし、成果に応じて継続判断いただけるよう設計しています。'
    },
    {
      question: 'DXとLLMOは両方必要でしょうか？',
      answer: 'はい、相乗効果が期待できます。DXは業務のデジタル化全般を指し、LLMOはAI検索時代に対応したWeb戦略です。DXの一環としてLLMOに取り組むことで、内部効率化と外部集客の両面を強化できます。'
    },
  ];

  return (
    <section className="py-20 bg-white" aria-labelledby="questions-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="questions-heading" className="text-3xl md:text-4xl font-black text-primary mb-4">
            よくあるご質問
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            お客様からよく寄せられるご質問にお答えします。
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {questions.map((item, index) => (
            <details key={index} className="bg-gray-50 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
              <summary className="cursor-pointer p-6 font-bold text-gray-900 hover:text-primary transition-colors list-none flex items-start justify-between">
                <span className="flex-1 pr-4">{item.question}</span>
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5 transform transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t border-gray-200 pt-4 mt-2">
                {item.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            その他のご質問は、詳しいFAQページまたはお問い合わせフォームからご連絡ください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/faq"
              className="inline-flex items-center justify-center border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              FAQページを見る
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              お問い合わせする
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
