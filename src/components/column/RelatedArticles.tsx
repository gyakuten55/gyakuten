import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types/cms';

interface RelatedArticlesProps {
  articles: Article[];
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
  if (articles.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  return (
    <section className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-xl font-bold text-black mb-6">関連記事</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/column/${article.id}`}
            className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {article.featuredImage && (
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={article.featuredImage.url}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              {article.category && (
                <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded mb-2">
                  {article.category.name}
                </span>
              )}
              <h4 className="font-semibold text-black text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
                {article.title}
              </h4>
              <time className="text-xs text-gray-500" dateTime={article.publishedAt}>
                {formatDate(article.publishedAt || article.createdAt)}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};