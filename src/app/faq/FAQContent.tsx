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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ヘッダーセクション */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-6">
          よくある質問
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          GYAKUTENのLLMO（大規模言語モデル最適化）サービスに関する50以上のよくある質問をまとめました。<br />
          こちらにない質問がございましたら、お気軽に<a href="/contact" className="text-primary hover:underline font-medium">お問い合わせ</a>ください。
        </p>
      </div>

      {/* 検索バー */}
      <div className="mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="質問を検索... (例: 料金、AI検索、補助金、セキュリティ)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="検索をクリア"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* カテゴリー目次 */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">カテゴリーから探す</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            すべて ({faqData.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category} ({faqsByCategory[category].length})
            </button>
          ))}
        </div>
      </div>

      {/* 検索結果件数表示 */}
      {(searchTerm || selectedCategory) && (
        <div className="mb-8 text-gray-600">
          <p className="text-lg">
            {filteredFaqs.length > 0 ? (
              <>
                <span className="font-bold text-primary">{filteredFaqs.length}件</span>の質問が見つかりました
              </>
            ) : (
              '該当する質問が見つかりませんでした'
            )}
          </p>
        </div>
      )}

      {/* FAQ セクション */}
      {filteredFaqs.length > 0 ? (
        Object.entries(filteredByCategory).map(([category, faqs]) => (
          <section key={category} id={category} className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-black text-primary mb-8 border-b-2 border-primary pb-2">
              {category}
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={`${category}-${index}`} faq={faq} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-6">検索条件に一致する質問が見つかりませんでした。</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory(null);
            }}
            className="text-primary hover:underline font-medium"
          >
            すべての質問を表示
          </button>
        </div>
      )}

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
              href="/services/llmo-diagnosis"
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
  );
}

// FAQ個別アイテムコンポーネント
function FAQItem({ faq }: { faq: FAQ }) {
  return (
    <div className="bg-white border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow duration-200">
      <details className="group/details">
        <summary className="cursor-pointer p-6 md:p-8 hover:bg-gray-50 transition-colors duration-200 list-none">
          <div className="flex items-start md:items-center justify-between gap-4">
            <div className="flex items-start md:items-center space-x-4 md:space-x-6 flex-1">
              <span className="text-primary font-black text-lg flex-shrink-0 mt-0.5 md:mt-0">Q</span>
              <h3 className="text-base md:text-lg font-bold text-gray-900 leading-relaxed">
                {faq.question}
              </h3>
            </div>
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-open/details:rotate-180 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </summary>

        <div className="px-6 md:px-8 pb-6 md:pb-8 bg-gray-50 border-t border-gray-200">
          <div className="pt-6 flex items-start space-x-4 md:space-x-6">
            <span className="text-primary font-black text-lg flex-shrink-0">A</span>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line flex-1">
              {faq.answer}
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}
