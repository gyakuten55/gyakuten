import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types/cms';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      <Link href={`/column/${article.id}`}>
        {article.featuredImage && (
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={article.featuredImage.url}
              alt={article.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
        
        <div className="p-6">
          {article.category && (
            <div className="mb-3">
              <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">
                {article.category.name}
              </span>
            </div>
          )}
          
          <h2 className="text-lg font-bold text-black mb-3 line-clamp-2 hover:text-primary transition-colors">
            {article.title}
          </h2>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt || article.createdAt)}
            </time>
            
            {article.tags && article.tags.length > 0 && (
              <div className="flex gap-1">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                  >
                    #{tag.name}
                  </span>
                ))}
                {article.tags.length > 2 && (
                  <span className="text-gray-400">+{article.tags.length - 2}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};