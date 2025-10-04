'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import InfiniteCarousel from './InfiniteCarousel';
import GovernmentDataSection from './GovernmentDataSection';

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

      {/* 政府機関データセクション */}
      <GovernmentDataSection />
    </>
  );
}