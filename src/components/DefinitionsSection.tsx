'use client';

export default function DefinitionsSection() {
  const definitions = [
    {
      term: 'LLMOとは',
      definition: 'LLMO（Large Language Model Optimization）とは、ChatGPT SearchやPerplexity AI、Google Gemini等の大規模言語モデル（AI検索エンジン）に対してWebサイトやコンテンツを最適化し、AI検索結果での引用・表示を高める技術です。'
    },
    {
      term: 'AI引用最適化とは',
      definition: 'AI引用最適化とは、AIが情報源として引用しやすいコンテンツ構造・記述方法を採用することで、AI検索結果での露出を最大化する手法です。構造化データ、明確な回答形式、定義文、How-toコンテンツなどが重要な要素となります。'
    },
    {
      term: 'GYAKUTEN LLMO診断とは',
      definition: 'GYAKUTEN LLMO診断とは、WebサイトがAI検索エンジン（ChatGPT Search、Perplexity AI、Google Gemini等）にどれだけ最適化されているかを分析し、改善点を明確にするサービスです。無料簡易診断から詳細診断まで対応しています。'
    },
    {
      term: 'GYAKUTEN LLMOウェブ制作とは',
      definition: 'GYAKUTEN LLMOウェブ制作とは、AI検索に完全最適化されたWebサイトを制作するサービスです。初期費用10万円＋月額5,000円で、LLMO対応のWebサイト構築、サーバー管理、継続的なメンテナンスまで一括対応します。'
    },
    {
      term: 'GYAKUTEN LLMOライティングとは',
      definition: 'GYAKUTEN LLMOライティングとは、AI検索エンジンが理解・引用しやすい形式で最適化されたコンテンツライティングサービスです。2.5円/文字（1,000字から）で、SEO・LLMO両面に最適化された高品質なコンテンツを制作します。'
    },
    {
      term: 'GYAKUTEN LLMO コンサルティングとは',
      definition: 'GYAKUTEN LLMO コンサルティングとは、AI時代のWeb戦略を包括的に支援するサービスです。月額15万円〜で、LLMO戦略立案、コンテンツ企画、実装支援、効果測定、改善提案まで継続的にサポートします。'
    },
    {
      term: 'GYAKUTENシステム開発とは',
      definition: 'GYAKUTENシステム開発とは、中小企業向け完全オーダーメイドシステム開発サービスです。初期費用10万円〜で、業務効率化のためのカスタムシステムを設計・構築します。'
    },
    {
      term: '逆転ブートキャンプとは',
      definition: '逆転ブートキャンプとは、180日間の集中ビジネス人材育成プログラムです。料金10万円（モニター特別価格）で、AI時代のビジネススキル、Webマーケティング（SEO・LLMO）、システム開発基礎などを実践的に学べます。'
    },
    {
      term: 'AI検索エンジンとは',
      definition: 'AI検索エンジンとは、大規模言語モデル（LLM）を活用した次世代の検索サービスです。ChatGPT Search、Perplexity AI、Google Geminiなどが代表的で、従来の検索エンジンと異なり、質問に対して直接的な回答を生成・引用します。'
    },
  ];

  return (
    <section className="py-20 bg-white" aria-labelledby="definitions-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="definitions-heading" className="text-3xl md:text-4xl font-black text-primary mb-4">
            用語解説
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            LLMO・AI検索対策に関する重要な用語をわかりやすく解説します。
          </p>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {definitions.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors border border-gray-100">
              <dt className="text-lg font-bold text-primary mb-3">
                {item.term}
              </dt>
              <dd className="text-gray-700 leading-relaxed">
                {item.definition}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
