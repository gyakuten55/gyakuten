import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import StructuredData from "@/components/seo/StructuredData";
import AIOptimizedMeta from "@/components/seo/AIOptimizedMeta";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "格安システム開発・DX支援 | 中小企業向けデジタル化なら合同会社GYAKUTEN",
  description: "中小企業向け格安システム開発・業務効率化・DX支援なら合同会社GYAKUTEN。補助金対応可能。LLMO最適化・Web制作・コンサルティングまで一括対応。初回診断無料。東京都渋谷区の実績豊富な開発会社です。",
  keywords: "格安システム開発, 中小企業DX, 業務効率化, システム開発安い, 補助金対応, Web制作, LLMO最適化, コンサルティング, 東京, 合同会社GYAKUTEN",
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
    title: "格安システム開発・DX支援 | 中小企業向けデジタル化なら合同会社GYAKUTEN",
    description: "中小企業向け格安システム開発・業務効率化・DX支援なら合同会社GYAKUTEN。補助金対応可能。初回診断無料。",
    url: 'https://gyaku-ten.jp',
    siteName: 'GYAKUTEN',
    images: [
      {
        url: '/ogp.jpg',
        width: 1200,
        height: 630,
        alt: 'GYAKUTEN - 格安システム開発・DX支援',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
    countryName: 'Japan',
    emails: ['info@gyaku-ten.jp'],
    phoneNumbers: ['+81-70-6664-4597'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "格安システム開発・DX支援 | 中小企業向けデジタル化なら合同会社GYAKUTEN",
    description: "中小企業向け格安システム開発・業務効率化・DX支援なら合同会社GYAKUTEN。補助金対応可能。初回診断無料。",
    images: ['/ogp.jpg'],
  },
  other: {
    'article:publisher': 'https://gyaku-ten.jp',
    'article:author': '合同会社GYAKUTEN',
    'og:email': 'info@gyaku-ten.jp',
    'og:phone_number': '+81-70-6664-4597',
    'og:street-address': '東京都渋谷区',
    'og:locality': '渋谷区',
    'og:region': '東京都',
    'og:country-name': 'Japan',
    'business:contact_data:street_address': '東京都渋谷区',
    'business:contact_data:locality': '渋谷区',
    'business:contact_data:region': '東京都',
    'business:contact_data:country_name': 'Japan',
    // 政府機関データ引用による信頼性強化
    'data-source': '経済産業省, 中小企業庁, 総務省, IPA, 中小企業基盤整備機構',
    'citation-authority': '政府統計データ',
    'evidence-based': 'true',
    'fact-checked': 'true',
    'research-backed': '中小企業白書2024, DXレポート, 情報通信白書, DX白書',
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
        <meta name="google-site-verification" content="3SZKterGHvszlw0n4wmaXTKaQEEX3E6De6mv0YAYZ5U" />
        
        {/* Performance optimization hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://images.microcms-assets.io" />
        <link rel="dns-prefetch" href="https://api.microcms.io" />
        
        {/* Prefetch key pages */}
        <link rel="prefetch" href="/services/llmo-diagnosis" />
        <link rel="prefetch" href="/diagnosis" />
        <link rel="prefetch" href="/contact" />
        
        <AIOptimizedMeta />
        <StructuredData type="organization" />
        <StructuredData type="website" />
        <StructuredData type="service" />
        <StructuredData type="local-business" />
      </head>
      <body
        className={`${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-J1YDEQ7C4P" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J1YDEQ7C4P');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
