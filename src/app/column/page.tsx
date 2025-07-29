import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import { getArticles, getCategories } from '@/lib/microcms';
import ColumnClientPage from './ColumnClientPage';

// SEO メタデータ
export const metadata: Metadata = {
  title: 'コラム | GYAKUTEN - AI検索時代のビジネス戦略',
  description: 'LLMO最適化、Web制作、DXコンサルティングに関する最新情報や実践的なノウハウをお届けします。AI検索時代に対応した戦略でビジネスを成功に導きます。',
  keywords: 'LLMO, AI検索最適化, Web制作, DXコンサルティング, 中小企業, デジタル戦略',
  openGraph: {
    title: 'コラム | GYAKUTEN',
    description: 'AI検索時代に対応したビジネス戦略の最新情報をお届けします。',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'コラム | GYAKUTEN',
    description: 'AI検索時代に対応したビジネス戦略の最新情報をお届けします。',
  },
  alternates: {
    canonical: '/column',
  },
};

// ISR設定: 開発時は短い間隔で再検証（本番では3600に戻す）
export const revalidate = 60;

async function getInitialData() {
  try {
    // microCMSから実際のデータを取得
    const [articlesData, categoriesData] = await Promise.all([
      getArticles({ limit: 100, orders: '-publishedAt' }),
      getCategories({ limit: 100 })
    ]);
    
    console.log('サーバーサイド - カテゴリデータ:', categoriesData.contents);
    console.log('サーバーサイド - カテゴリ数:', categoriesData.contents.length);
    
    return {
      articles: articlesData.contents,
      categories: categoriesData.contents
    };
  } catch (error) {
    console.error('データの取得に失敗しました:', error);
    // エラー時は空配列を返す（クライアント側でサンプルデータにフォールバック）
    return {
      articles: [],
      categories: []
    };
  }
}

export default async function Column() {
  const { articles, categories } = await getInitialData();

  return (
    <Layout>
      <main className="min-h-screen bg-white">
        <Suspense 
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }
        >
          <ColumnClientPage 
            initialArticles={articles}
            initialCategories={categories}
          />
        </Suspense>
      </main>
    </Layout>
  );
}