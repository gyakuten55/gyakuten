import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import FAQStructuredData from '@/components/seo/FAQStructuredData';

export const metadata: Metadata = {
  title: 'よくある質問 | GYAKUTEN - LLMO（AI最適化）に関するFAQ',
  description: 'GYAKUTENのLLMO（大規模言語モデル最適化）サービスに関するよくある質問をまとめました。料金、効果、実装方法、技術的な疑問まで詳しく解説しています。',
  keywords: 'FAQ, よくある質問, LLMO, AI最適化, 料金, 効果, 実装, サポート, GYAKUTEN',
  openGraph: {
    title: 'よくある質問 | GYAKUTEN - LLMO（AI最適化）に関するFAQ',
    description: 'GYAKUTENのLLMO（大規模言語モデル最適化）サービスに関するよくある質問をまとめました。料金、効果、実装方法、技術的な疑問まで詳しく解説しています。',
    url: 'https://gyaku-ten.jp/faq',
  },
  alternates: {
    canonical: 'https://gyaku-ten.jp/faq',
  },
};

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQ[] = [
  // LLMOについて
  {
    category: 'LLMOについて',
    question: 'LLMOとは何ですか？',
    answer: 'LLMO（Large Language Model Optimization）とは、Perplexity AIやChatGPT Search、Google Gemini等の大規模言語モデル（AI）に対して最適化することです。従来のSEOがGoogleなどの検索エンジンを対象としていたのに対し、LLMOはAI検索時代に対応した新しい最適化手法です。AIが理解しやすく、引用しやすいコンテンツ構造にすることで、AI検索結果での露出を高めます。'
  },
  {
    category: 'LLMOについて',
    question: 'LLMOとSEOの違いは何ですか？',
    answer: '従来のSEOは主にGoogleなどの検索エンジンのアルゴリズムを対象としていますが、LLMOはPerplexity AIやChatGPT Search、Google GeminiなどのAI・大規模言語モデルに最適化することを目的としています。AIが理解しやすい構造や内容にすることで、AI検索時代における情報発見性を高めます。SEOとLLMOは補完的な関係にあり、両方を実施することで包括的なデジタル戦略が可能になります。'
  },
  {
    category: 'LLMOについて',
    question: 'なぜ今LLMOが重要なのですか？',
    answer: 'AI検索の利用が急速に拡大しており、特にビジネス領域での情報収集において、Perplexity AIやChatGPT Search、Google Gemini等のAIツールが頻繁に使われるようになっています。従来の検索エンジン経由の流入だけでなく、AI経由での情報発見・引用が重要な集客チャネルとなりつつあります。早期にLLMO対応することで、競合他社に先んじてAI検索時代の優位性を確保できます。'
  },

  // サービス全般
  {
    category: 'サービス全般',
    question: 'どのようなサービスを提供していますか？',
    answer: 'GYAKUTENでは、①LLMO診断（無料〜35,000円）、②LLMOウェブ制作（初期10万円＋月額5,000円）、③LLMOライティング（2.5円/文字）、④LLMOコンサルティング（15万円/月〜）、⑤システム開発（30万円〜）、⑥逆転ブートキャンプ（10万円）の6つのサービスを提供しています。すべてLLMO視点を取り入れたAI時代対応のサービスです。'
  },
  {
    category: 'サービス全般',
    question: 'どのような業界・企業規模が対象ですか？',
    answer: '特に中小企業様（従業員5〜50名規模）を中心に、Web集客を強化したい全ての企業様が対象です。業界は問いません。これまで製造業、サービス業、小売業、士業など幅広い業界でのお手伝いをしています。ITリテラシーが高くなくても安心してご利用いただけるよう、専門用語を極力排し、分かりやすい説明を心がけています。'
  },
  {
    category: 'サービス全般',
    question: '最初にどのサービスから始めればよいですか？',
    answer: 'まずは無料の「LLMO診断」から始めることをお勧めします。現在のWebサイトの状況を客観的に把握し、改善点を明確にできます。その診断結果を基に、必要に応じてウェブ制作、ライティング、コンサルティングなどの具体的なサービスをご検討いただくのが効率的です。'
  },

  // 料金・契約
  {
    category: '料金・契約',
    question: '料金はどのように設定されていますか？',
    answer: 'サービスごとに明確な料金設定をしています。LLMO診断は無料〜35,000円、ウェブ制作は初期10万円＋月額5,000円（最低7ヶ月契約）、ライティングは2.5円/文字（1,000字から）、コンサルティングは15万円/月〜となっています。追加費用は事前にご相談し、明確にお伝えします。'
  },
  {
    category: '料金・契約',
    question: '支払い方法は何がありますか？',
    answer: '銀行振込、クレジットカード決済に対応しています。月額サービスの場合は月末締めの翌月払い、単発サービスの場合は契約時に50%、納品時に50%の分割払いも可能です。詳細な支払い条件については契約時にご相談させていただきます。'
  },
  {
    category: '料金・契約',
    question: '契約期間の縛りはありますか？',
    answer: 'ウェブ制作サービスのみ最低7ヶ月契約となっています。コンサルティングサービスは月単位でいつでも解約可能です。その他のサービスは単発契約です。長期契約の縛りを最小限にし、成果に応じて継続判断いただけるよう設計しています。'
  },

  // 実装・技術
  {
    category: '実装・技術',
    question: '技術的な知識がなくても大丈夫ですか？',
    answer: 'はい、全く問題ありません。専門用語を一切使わず、ITが苦手な方でも理解できる日本語で説明いたします。実装作業についても、詳しい手順書の提供や継続的なサポートにより、社内で対応できるようお手伝いします。必要に応じて実装代行も承ります。'
  },
  {
    category: '実装・技術',
    question: '実装サポートは含まれていますか？',
    answer: '診断・指導までがLLMO診断サービスの範囲です。実装が必要な場合は、別途「LLMOウェブ制作」「LLMOライティング」などのサービスで対応いたします。ただし、診断レポートには詳細な実装手順も含まれているため、貴社での実装も十分可能です。'
  },
  {
    category: '実装・技術',
    question: '改善効果はどの程度期待できますか？',
    answer: 'サイトの現状により異なりますが、これまでの実績では流入数10-30%、コンバージョン率5-15%の改善を実現しています。効果は改善を実行された後1-3ヶ月で現れることが多いです。ただし、市場環境や競合状況により結果は変動するため、継続的な改善が重要です。'
  },
  {
    category: '実装・技術',
    question: '効果測定はどのように行いますか？',
    answer: 'Google Analytics、Search Console等の標準的なツールに加え、最新AI検索での言及状況や引用率などのLLMO特有の指標も測定します。月次レポートで具体的な数値と改善提案をお届けし、次のアクションを明確にします。'
  },

  // 診断について
  {
    category: '診断について',
    question: '診断にはどのくらい時間がかかりますか？',
    answer: '無料簡易診断は2-3営業日、シンプル診断は5-7営業日、伴走改善パッケージは10-14営業日でお届けします。お急ぎの場合はご相談ください。診断の精度と実用性を重視し、十分な時間をかけて分析いたします。'
  },
  {
    category: '診断について',
    question: '診断で具体的に何を調べますか？',
    answer: 'コンテンツ構造、キーワード戦略、技術的要素（サイト速度、モバイル対応等）、LLMO対応度（AI理解度、引用しやすさ）、競合比較分析を行います。単なる問題点の指摘ではなく、具体的な改善手順と優先順位も含めた実践的なレポートを提供します。'
  },

  // 会社・サポート
  {
    category: '会社・サポート',
    question: 'どのような会社ですか？',
    answer: '合同会社GYAKUTENは、LLMO（大規模言語モデル最適化）を専門とする中小企業向けデジタル支援会社です。「すべての逆境に、最高の逆転劇を。」をミッションに、AI時代に対応したWeb戦略で企業の成長をサポートしています。'
  },
  {
    category: '会社・サポート',
    question: 'サポート体制はどうなっていますか？',
    answer: 'メール、電話、オンライン会議での対応が可能です。営業時間は平日9:00-18:00ですが、緊急時は営業時間外でも対応いたします。専任担当者制により、継続的で一貫したサポートを提供しています。'
  },
  {
    category: '会社・サポート',
    question: '地方の企業でも対応可能ですか？',
    answer: 'はい、全国どこでも対応可能です。オンラインでのミーティングやサポートが中心となりますが、必要に応じて訪問も承ります。これまでも北海道から沖縄まで、全国の企業様にサービスを提供しています。'
  }
];

// カテゴリごとにFAQをグループ化
const faqsByCategory = faqData.reduce((acc, faq) => {
  if (!acc[faq.category]) {
    acc[faq.category] = [];
  }
  acc[faq.category].push(faq);
  return acc;
}, {} as Record<string, FAQ[]>);

export default function FAQPage() {
  return (
    <Layout>
      <FAQStructuredData faqs={faqData} />
      
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ヘッダーセクション */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-primary mb-6">
              よくある質問
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              GYAKUTENのLLMO（大規模言語モデル最適化）サービスに関するよくある質問をまとめました。<br />
              こちらにない質問がございましたら、お気軽に<a href="/contact" className="text-primary hover:underline font-medium">お問い合わせ</a>ください。
            </p>
          </div>

          {/* FAQ セクション */}
          {Object.entries(faqsByCategory).map(([category, faqs]) => (
            <section key={category} className="mb-16">
              <h2 className="text-2xl font-black text-primary mb-8 border-b-2 border-primary pb-2">
                {category}
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <FAQItem key={`${category}-${index}`} faq={faq} />
                ))}
              </div>
            </section>
          ))}

          {/* CTAセクション */}
          <div className="mt-20 text-center">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-black text-primary mb-6">
                まずは無料診断から始めませんか？
              </h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                現在のWebサイトがAI時代にどれだけ対応できているかを無料で診断いたします。<br />
                改善点と具体的な対策をレポートでお届けします。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/diagnosis"
                  className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors"
                >
                  無料診断を申し込む
                </a>
                <a
                  href="/contact"
                  className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary hover:text-white transition-colors"
                >
                  詳しく相談する
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

// FAQ個別アイテムコンポーネント
function FAQItem({ faq }: { faq: FAQ }) {
  return (
    <div className="bg-white border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow duration-200">
      <details className="group/details">
        <summary className="cursor-pointer p-8 hover:bg-gray-50 transition-colors duration-200 list-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="text-primary font-black text-lg">Q</span>
              <h3 className="text-lg font-bold text-gray-900 leading-relaxed">
                {faq.question}
              </h3>
            </div>
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-gray-400 group-open/details:rotate-180 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </summary>
        
        <div className="px-8 pb-8 bg-gray-50 border-t border-gray-200">
          <div className="pt-6 flex items-start space-x-6">
            <span className="text-primary font-black text-lg">A</span>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {faq.answer}
            </p>
          </div>
        </div>
      </details>
    </div>
  );
}