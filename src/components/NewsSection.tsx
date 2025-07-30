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

        <div className="bg-gray-50 rounded-lg p-3 sm:p-6">
          <div className="space-y-2 sm:space-y-4">
            {articles.map((article, index) => (
              <Link 
                href={`/column/${article.slug}`} 
                key={article.id}
                className="group block"
              >
                <div className={`flex items-center justify-between py-1.5 sm:py-3 ${
                  index !== articles.length - 1 ? 'border-b border-gray-200' : ''
                } hover:bg-white rounded-lg px-1.5 sm:px-3 transition-colors duration-200`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-4 mb-1 sm:mb-2">
                      <span className="text-xs sm:text-sm text-gray-500">
                        {new Date(article.publishedAt || article.createdAt).toLocaleDateString('ja-JP')}
                      </span>
                      {article.category && (
                        <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {article.category.name}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-lg font-semibold text-black group-hover:text-primary transition-colors duration-200 line-clamp-2 sm:line-clamp-2 leading-tight sm:leading-normal">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 line-clamp-1 sm:line-clamp-2 hidden sm:block">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="ml-2 sm:ml-4 flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-primary transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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