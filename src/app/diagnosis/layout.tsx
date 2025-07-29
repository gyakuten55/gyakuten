import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '無料LLMO診断 | AI検索時代のWebサイト最適化診断',
  description: 'AI検索エンジンに対応したWebサイト診断を無料で実施。ChatGPTやBardなどのAI検索で上位表示されるための最適化をご提案します。',
  keywords: 'LLMO, AI検索最適化, SEO, Web診断, 無料診断, 中小企業, デジタル戦略',
  openGraph: {
    title: '無料LLMO診断',
    description: 'AI検索時代に対応したWebサイト最適化診断を無料で実施',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '無料LLMO診断',
    description: 'AI検索時代に対応したWebサイト最適化診断を無料で実施',
  },
  alternates: {
    canonical: '/diagnosis',
  },
};

export default function DiagnosisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}