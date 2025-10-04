'use client';

import { useState, useMemo } from 'react';
import type { FAQ } from './page';

interface FAQContentProps {
  faqData: FAQ[];
}

export default function FAQContent({ faqData }: FAQContentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // カテゴリごとにFAQをグループ化
  const faqsByCategory = useMemo(() => {
    return faqData.reduce((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {} as Record<string, FAQ[]>);
  }, [faqData]);

  const categories = Object.keys(faqsByCategory);

  // 検索とカテゴリフィルターを適用
  const filteredFaqs = useMemo(() => {
    let filtered = faqData;

    // カテゴリフィルター
    if (selectedCategory) {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // 検索フィルター
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        faq =>
          faq.question.toLowerCase().includes(term) ||
          faq.answer.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [faqData, searchTerm, selectedCategory]);

  // フィルター後のFAQをカテゴリごとにグループ化
  const filteredByCategory = useMemo(() => {
    return filteredFaqs.reduce((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {} as Record<string, FAQ[]>);
  }, [filteredFaqs]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ヘッダーセクション */}
      <div className="text-center mb-20">
        <p className="text-sm font-medium tracking-wider text-gray-500 uppercase mb-4">
          Frequently Asked Questions
        </p>
        <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
          よくある質問
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
          GYAKUTENの全サービスに関するご質問にお答えします。<br className="hidden sm:block" />
          こちらにないご質問は、お気軽に
          <a href="/contact" className="text-primary hover:text-primary/80 font-medium transition-colors border-b border-primary/30 hover:border-primary/60">
            お問い合わせ
          </a>
          ください。
        </p>
      </div>

      {/* 検索バー */}
      <div className="mb-16">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="キーワードで検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-14 py-5 text-base border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all bg-white shadow-sm hover:shadow-md font-light"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="検索をクリア"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* カテゴリー選択 */}
      <div className="mb-16">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2.5 rounded-full text-sm font-light transition-all ${
              selectedCategory === null
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            すべて
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-light transition-all ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 検索結果件数表示 */}
      {(searchTerm || selectedCategory) && (
        <div className="mb-12 text-center">
          <p className="text-base text-gray-600 font-light">
            {filteredFaqs.length > 0 ? (
              <>
                <span className="font-medium text-gray-900">{filteredFaqs.length}件</span>の質問が見つかりました
              </>
            ) : (
              '該当する質問が見つかりませんでした'
            )}
          </p>
        </div>
      )}

      {/* FAQ セクション */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-24">
          {Object.entries(filteredByCategory).map(([category, faqs]) => (
            <section key={category} id={category} className="scroll-mt-24">
              <h2 className="text-sm font-medium tracking-wider text-gray-500 uppercase mb-8 text-center">
                {category}
              </h2>

              <div className="space-y-0 border-t border-gray-100">
                {faqs.map((faq, index) => (
                  <FAQItem key={`${category}-${index}`} faq={faq} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-8 font-light">検索条件に一致する質問が見つかりませんでした。</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory(null);
            }}
            className="text-primary hover:text-primary/80 font-medium transition-colors border-b border-primary/30 hover:border-primary/60"
          >
            すべての質問を表示
          </button>
        </div>
      )}

      {/* CTAセクション */}
      <div className="mt-32 mb-16">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 md:p-16 border border-gray-100 shadow-sm">
          <p className="text-sm font-medium tracking-wider text-gray-500 uppercase mb-4">
            Get Started
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">
            まずは無料診断から<br className="sm:hidden" />始めませんか？
          </h2>
          <p className="text-base text-gray-600 mb-10 leading-relaxed font-light max-w-xl mx-auto">
            現在のWebサイトがAI時代にどれだけ対応できているかを無料で診断。<br className="hidden sm:block" />
            改善点と具体的な対策をレポートでお届けします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/services/llmo-diagnosis"
              className="inline-flex items-center justify-center bg-gray-900 text-white px-10 py-4 rounded-full font-medium text-base hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
            >
              無料診断を申し込む
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center border border-gray-300 text-gray-900 px-10 py-4 rounded-full font-medium text-base hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              詳しく相談する
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// FAQ個別アイテムコンポーネント
function FAQItem({ faq }: { faq: FAQ }) {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <details className="group/details">
        <summary className="cursor-pointer py-8 hover:bg-gray-50/50 transition-all duration-200 list-none px-6 md:px-8">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <span className="text-primary font-medium text-sm mt-1 flex-shrink-0">Q</span>
                <h3 className="text-lg md:text-xl font-light text-gray-900 leading-relaxed">
                  {faq.question}
                </h3>
              </div>
            </div>
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-gray-400 group-open/details:rotate-180 transition-transform duration-300 mt-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </summary>

        <div className="px-6 md:px-8 pb-8 bg-gradient-to-b from-gray-50/30 to-transparent">
          <div className="pt-4 flex items-start gap-4 max-w-4xl">
            <span className="text-primary font-medium text-sm flex-shrink-0">A</span>
            <div className="text-base text-gray-700 leading-relaxed whitespace-pre-line flex-1 font-light">
              {faq.answer}
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}
