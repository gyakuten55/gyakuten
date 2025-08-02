import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import NewsletterClient from './NewsletterClient';

// SEO メタデータ
export const metadata: Metadata = {
  title: 'メルマガ登録 | GYAKUTEN - AI検索時代のビジネス戦略',
  description: 'AI検索時代に対応したLLMO最適化、Web制作、DXコンサルティングに関する最新情報や実践的なノウハウをメールマガジンでお届けします。',
  keywords: 'メルマガ, ニュースレター, LLMO, AI検索最適化, Web制作, DXコンサルティング',
  openGraph: {
    title: 'メルマガ登録 | GYAKUTEN',
    description: 'AI検索時代に対応したビジネス戦略の最新情報をメールマガジンでお届けします。',
    type: 'website',
    locale: 'ja_JP',
    images: ['/newsletter-ogp.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'メルマガ登録 | GYAKUTEN',
    description: 'AI検索時代に対応したビジネス戦略の最新情報をメールマガジンでお届けします。',
    images: ['/newsletter-ogp.jpg'],
  },
};

export default function Newsletter() {
  return (
    <Layout>
      <NewsletterClient />
    </Layout>
  );
}