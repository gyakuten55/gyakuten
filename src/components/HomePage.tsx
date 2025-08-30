'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import InfiniteCarousel from './InfiniteCarousel';

const AnimatedSphere = dynamic(() => import('./AnimatedSphere'), { ssr: false });

export default function HomePage() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="py-8 min-h-[35vh]" aria-labelledby="hero-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          {/* 右カラム：新規 Canvas 埋め込み */}
          <div className="md:w-1/2 w-full md:order-2 order-1 md:mt-0 mb-6 md:mb-0 flex justify-center">
            <div className="w-[55vw] min-w-[350px] aspect-square">
              <AnimatedSphere />
            </div>
          </div>

          {/* 左カラム：既存コンテンツ */}
          <div className="md:w-1/2 w-full md:order-1 order-2">
          <h2 className="text-4xl md:text-6xl font-bold text-black/20 mb-4">Mission</h2>
          <div className="mb-6">
            <h1 id="hero-heading" className="text-3xl md:text-6xl font-black text-primary mb-2 leading-tight">
              <span className="tagline-font-genkai">すべての逆境に、</span><br />
              <span className="tagline-font-soukou">最高の逆転劇を。</span>
            </h1>
            <p className="text-base md:text-xl text-gray-600 mt-4">
              LLMの力で、あなたのビジネスを<span className="text-primary font-semibold">最適化</span>する。
            </p>
          </div>
          <nav aria-label="主要なアクション">
            <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start justify-center sm:justify-start">
              <Link
                href="/diagnosis"
                className="w-60 bg-primary text-white px-6 py-3 rounded-lg text-base font-semibold text-center shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-200 inline-block"
                aria-describedby="diagnosis-description"
              >
                無料診断を行う
              </Link>
              <Link
                href="/contact"
                className="w-60 bg-transparent border border-primary text-primary px-6 py-3 rounded-lg text-base font-semibold text-center shadow-lg hover:shadow-xl hover:bg-primary hover:text-white transition-all duration-200"
              >
                お問い合わせする
              </Link>
            </div>
            <div id="diagnosis-description" className="sr-only">
              WebサイトのAI検索最適化状況を無料で診断いたします
            </div>
          </nav>
        </div>
        </div>
      </section>

      {/* 無限カルーセルセクション */}
      <InfiniteCarousel />

      {/* キーワード最適化セクション */}
      <section className="py-12 bg-gray-50" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-8">
            <h2 id="services-heading" className="text-2xl md:text-3xl font-bold text-black mb-4">
              中小企業向け格安システム開発・DX支援
            </h2>
            <p className="text-lg text-gray-700">
              補助金対応可能な業務効率化・Web制作サービス
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {/* 格安システム開発 */}
            <article className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow" role="listitem">
              <h3 className="text-lg font-bold text-black mb-3">
                <Link href="/services/dx" className="hover:text-primary">
                  格安システム開発
                </Link>
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                中小企業向け10万円からの業務効率化システム開発。Excel・紙運用から脱却。
              </p>
              <div className="text-primary font-semibold text-sm">
                10万円～ | 補助金対応
              </div>
            </article>

            {/* ホームページ制作 */}
            <article className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow" role="listitem">
              <h3 className="text-lg font-bold text-black mb-3">
                <Link href="/services/web-llmo" className="hover:text-primary">
                  ホームページ制作
                </Link>
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                補助金対応可能な格安Web制作。運送会社・中小企業向けサイト制作。
              </p>
              <div className="text-primary font-semibold text-sm">
                10万円～ | 助成金対応
              </div>
            </article>

            {/* LLMOコンサルティング */}
            <article className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow" role="listitem">
              <h3 className="text-lg font-bold text-black mb-3">
                <Link href="/services/llmo-consulting" className="hover:text-primary">
                  LLMO対策・DX支援
                </Link>
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                AI検索最適化・売上拡大のためのLLMOコンサルティング。
              </p>
              <div className="text-primary font-semibold text-sm">
                15万円～ | 継続支援
              </div>
            </article>

            {/* LLMO診断 */}
            <article className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow" role="listitem">
              <h3 className="text-lg font-bold text-black mb-3">
                <Link href="/services/llmo-diagnosis" className="hover:text-primary">
                  AI診断・無料
                </Link>
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                GoogleやChatGPT検索でのサイト評価を無料診断。改善点を明確化。
              </p>
              <div className="text-primary font-semibold text-sm">
                無料～ | 即日対応
              </div>
            </article>
          </div>

          <footer className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              東京都の実績豊富な開発会社が、小規模から大規模まで幅広くサポート。<br />
              <strong>格安システム開発</strong>・<strong>業務効率化</strong>・<strong>ホームページ制作補助金</strong>対応可能。
            </p>
          </footer>
        </div>
      </section>
    </>
  );
}