import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types/cms';

interface KnowledgeSectionProps {
  articles: Article[];
}

export default function KnowledgeSection({ articles }: KnowledgeSectionProps) {
  console.log('KnowledgeSection - 受け取った記事数:', articles?.length);
  
  if (!articles || articles.length === 0) {
    return (
      <section className="py-16 bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-primary text-sm font-medium tracking-wide uppercase mb-2">
              ナレッジ・豆知識・メディア掲載
            </p>
            <h2 className="text-4xl font-black text-text-main mb-4">
              Knowledge
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
    <section className="py-16 bg-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-primary text-sm font-medium tracking-wide uppercase mb-2">
            ナレッジ・豆知識・メディア掲載
          </p>
          <h2 className="text-4xl font-black text-text-main mb-4">
            Knowledge
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl">
            最新のビジネス戦略やLLMO関連の知識、メディア掲載情報をお届けします
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {articles.map((article) => (
            <Link 
              href={`/column/${article.slug}`} 
              key={article.id}
              className="group block transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                {article.featuredImage && (
                  <div className="aspect-[16/9] overflow-hidden mb-4">
                    <Image
                      src={article.featuredImage.url}
                      alt={article.title}
                      width={article.featuredImage.width || 800}
                      height={article.featuredImage.height || 450}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>
                )}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-gray-500">
                      {new Date(article.publishedAt || article.createdAt).toLocaleDateString('ja-JP')}
                    </span>
                    {article.category && (
                      <span className="text-primary font-medium">
                        {article.category.name}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-black leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/column"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
          >
            すべての記事を見る
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}