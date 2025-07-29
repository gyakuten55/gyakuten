'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArticleCard } from '@/components/column/ArticleCard';
import { CategoryFilter } from '@/components/column/CategoryFilter';
import { SearchBox } from '@/components/column/SearchBox';
import { Pagination } from '@/components/column/Pagination';
import { Article, Category } from '@/types/cms';

// 開発用のサンプルデータ
const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'AI検索時代におけるSEO戦略の変化',
    slug: 'ai-search-seo-strategy',
    content: '',
    excerpt: 'ChatGPTやBardなどのAI検索エンジンの普及により、従来のSEO戦略は大きく変わりつつあります。LLMO（大規模言語モデル最適化）の重要性について解説します。',
    featuredImage: {
      url: '/hero-image.jpg',
      width: 800,
      height: 400,
    },
    category: {
      id: 'llmo',
      name: 'LLMO',
      slug: 'llmo',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    tags: [
      { id: 'ai', name: 'AI', slug: 'ai', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 'seo', name: 'SEO', slug: 'seo', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    publishedAt: '2024-01-15',
  },
  {
    id: '2',
    title: '中小企業のためのDX推進ガイド',
    slug: 'dx-guide-for-sme',
    content: '',
    excerpt: '限られたリソースでも効果的にDXを推進する方法を、実際の事例とともにご紹介します。まずは小さなステップから始めることが重要です。',
    category: {
      id: 'dx',
      name: 'DX',
      slug: 'dx',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    tags: [
      { id: 'dx', name: 'DX', slug: 'dx', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 'sme', name: '中小企業', slug: 'sme', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    ],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    publishedAt: '2024-01-10',
  },
  {
    id: '3',
    title: 'Web制作におけるUX/UIデザインのトレンド',
    slug: 'ux-ui-design-trends',
    content: '',
    excerpt: '2024年のWeb制作で押さえておきたいUX/UIデザインのトレンドをまとめました。ユーザビリティを重視したデザインのポイントを解説します。',
    category: {
      id: 'web',
      name: 'Web制作',
      slug: 'web',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    tags: [
      { id: 'ux', name: 'UX', slug: 'ux', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 'ui', name: 'UI', slug: 'ui', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    ],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
    publishedAt: '2024-01-05',
  },
];

const sampleCategories: Category[] = [
  { id: 'llmo', name: 'LLMO', slug: 'llmo', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 'dx', name: 'DX', slug: 'dx', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 'web', name: 'Web制作', slug: 'web', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 'consulting', name: 'コンサルティング', slug: 'consulting', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
];

interface ColumnClientPageProps {
  initialArticles?: Article[];
  initialCategories?: Category[];
}

export default function ColumnClientPage({ 
  initialArticles,
  initialCategories
}: ColumnClientPageProps) {
  // microCMSからデータが取得できた場合はそれを使用、できなかった場合のみサンプルデータを使用
  const articles = initialArticles && initialArticles.length > 0 ? initialArticles : sampleArticles;
  
  // カテゴリはmicroCMSのデータを優先し、データがない場合のみサンプルを使用
  const categories = (initialCategories && initialCategories.length >= 0) ? initialCategories : sampleCategories;
  
  console.log('クライアントサイド - 受け取ったカテゴリ:', initialCategories);
  console.log('クライアントサイド - 使用するカテゴリ:', categories);
  
  const [articlesState] = useState<Article[]>(articles);
  const [categoriesState] = useState<Category[]>(categories);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading] = useState<boolean>(false);

  const articlesPerPage = 6;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // フィルタリング処理
  useEffect(() => {
    let filtered = articlesState;

    // カテゴリフィルター
    if (selectedCategory) {
      filtered = filtered.filter(article => article.category?.id === selectedCategory);
    }

    // 検索フィルター
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
    setCurrentPage(1); // ページをリセット
  }, [articlesState, selectedCategory, searchQuery]);

  // ページネーション用の記事取得
  const getCurrentPageArticles = () => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return filteredArticles.slice(startIndex, endIndex);
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* パンくずリスト */}
      <nav className="bg-white border-b border-gray-200 pt-5">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary">
                ホーム
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li className="text-black font-medium">
              コラム
            </li>
          </ol>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 pt-2 pb-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-6 tracking-wide">
            コラム
          </h1>
          <p className="text-lg text-gray-800 leading-relaxed">
            AI検索時代に対応したLLMO最適化、Web制作、DXコンサルティングに関する<br />
            最新情報や実践的なノウハウをお届けします。
          </p>
        </header>

        {/* 検索・フィルター */}
        <div className="mb-8">
          <SearchBox onSearch={handleSearch} />
          <CategoryFilter
            categories={categoriesState}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* 記事一覧 */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {searchQuery || selectedCategory 
                ? '条件に一致する記事が見つかりませんでした。'
                : '記事がまだありません。'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {getCurrentPageArticles().map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

      </div>
    </>
  );
}