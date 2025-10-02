import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import { getArticles, getCategories } from '@/lib/microcms';
import ColumnClientPage from './ColumnClientPage';

// SEO メタデータ（LLMO最適化）
export const metadata: Metadata = {
  title: 'コラム | GYAKUTEN - AI検索時代のビジネス戦略',
  // LLMO最適化: 「何の問題を解決するか」を明確に記述
  description: 'AI検索エンジン（ChatGPT、Perplexity、Google Gemini）での上位表示を実現するLLMO最適化とは？中小企業向けのWeb制作、DXコンサルティングに関する実践的なノウハウと最新情報をお届けします。',
  keywords: 'LLMO, AI検索最適化, ChatGPT検索, Perplexity AI, Web制作, DXコンサルティング, 中小企業DX, デジタル戦略, AI時代のSEO',
  openGraph: {
    title: 'コラム | GYAKUTEN - AI検索時代のビジネス戦略',
    description: 'AI検索エンジンでの上位表示を実現するLLMO最適化とビジネス戦略の最新情報をお届けします。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://gyaku-ten.jp/column',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'コラム | GYAKUTEN',
    description: 'AI検索時代に対応したビジネス戦略とLLMO最適化の実践的なノウハウを公開中',
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