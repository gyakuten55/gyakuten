import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/seo/StructuredData";
import AIOptimizedMeta from "@/components/seo/AIOptimizedMeta";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GYAKUTEN | すべての逆境に、最高の逆転劇を。",
  description: "合同会社GYAKUTENは、LLMO（大規模言語モデル最適化）を中心とした、中小企業向けのデジタル支援サービスを提供しています。診断・Web制作・ライティング・コンサルティング・システム開発・ブートキャンプまで、あらゆる逆境を逆転劇に変えるパートナーです。",
  keywords: "LLMO, AI最適化, Web制作, ライティング, コンサルティング, システム開発, 中小企業, デジタル化, 逆転, GYAKUTEN, ChatGPT最適化, Perplexity最適化, Claude最適化, AI検索対応",
  authors: [{ name: "合同会社GYAKUTEN" }],
  creator: "合同会社GYAKUTEN",
  publisher: "合同会社GYAKUTEN",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: 'https://gyaku-ten.jp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
    ],
  },
  openGraph: {
    title: "GYAKUTEN | すべての逆境に、最高の逆転劇を。",
    description: "合同会社GYAKUTENは、LLMO（大規模言語モデル最適化）を中心とした、中小企業向けのデジタル支援サービスを提供しています。",
    url: 'https://gyaku-ten.jp',
    siteName: 'GYAKUTEN',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'GYAKUTEN Logo',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "GYAKUTEN | すべての逆境に、最高の逆転劇を。",
    description: "合同会社GYAKUTENは、LLMO（大規模言語モデル最適化）を中心とした、中小企業向けのデジタル支援サービスを提供しています。",
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <AIOptimizedMeta />
        <StructuredData type="organization" />
        <StructuredData type="website" />
        <StructuredData type="service" />
        <StructuredData type="local-business" />
      </head>
      <body
        className={`${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
