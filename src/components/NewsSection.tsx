import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/cms';

interface NewsSectionProps {
  articles: Article[];
}

export default function NewsSection({ articles }: NewsSectionProps) {
  console.log('NewsSection - 受け取った記事数:', articles?.length);
  
  if (!articles || articles.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-primary text-sm font-medium tracking-wide uppercase mb-2">
              お知らせ・導入実績・メディア掲載
            </p>
            <h2 className="text-4xl font-black text-text-main mb-4">
              News
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl">
              記事を読み込み中...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-primary text-sm font-medium tracking-wide uppercase mb-2">
            お知らせ・導入実績・メディア掲載
          </p>
          <h2 className="text-4xl font-black text-text-main mb-4">
            News
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl">
            最新のお知らせや導入実績、メディア掲載情報をお届けします
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="space-y-4">
            {articles.map((article, index) => (
              <Link 
                href={`/column/${article.slug}`} 
                key={article.id}
                className="group block"
              >
                <div className={`flex items-center justify-between py-4 ${
                  index !== articles.length - 1 ? 'border-b border-gray-200' : ''
                } hover:bg-white rounded-lg px-4 transition-colors duration-200`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
                      </span>
                      {article.category && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {article.category.name}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-black group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/column"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
          >
            すべてのニュースを見る
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}