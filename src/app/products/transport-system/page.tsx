import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import HeroSection from '@/components/transport/HeroSection';
import PainPointsSection from '@/components/transport/PainPointsSection';
import CoreFeaturesSection from '@/components/transport/CoreFeaturesSection';
import CompetitiveAdvantageSection from '@/components/transport/CompetitiveAdvantageSection';
import CaseStudySection from '@/components/transport/CaseStudySection';
import PricingSection from '@/components/transport/PricingSection';
import ImplementationSection from '@/components/transport/ImplementationSection';
import InfiniteCarousel from '@/components/InfiniteCarousel';

export const metadata: Metadata = {
  title: '【東翔運輸監修】GYAKUTEN運送統合管理システム | 43台実証・管理業務50%削減',
  description: '東翔運輸株式会社監修・43台53名で実証済み。管理業務時間50%削減・点検漏れゼロ・電話連絡80%削減を実現。運送業界専用統合管理システム。初期費用0円・月額3万円〜・最短3日導入・60代でも即日利用可能。業界唯一の出庫時間管理機能搭載。',
  keywords: '運送管理システム, 車両管理システム, ドライバー管理, 運送業DX, 業務効率化システム, 管理業務削減, 点検管理システム, 出庫時間管理, 東翔運輸, 運送統合管理, 車両稼働管理, 休暇管理システム, リアルタイム車両管理, 運送業界デジタル化, 配車管理システム, 運行管理システム',
  openGraph: {
    title: '【東翔運輸監修】GYAKUTEN運送統合管理システム | 43台実証・管理業務50%削減',
    description: '東翔運輸株式会社監修・43台53名で実証済み。管理業務時間50%削減・点検漏れゼロ・電話連絡80%削減を実現。運送業界専用統合管理システム。初期費用0円・最短3日導入。',
    type: 'website',
    locale: 'ja_JP',
    siteName: '合同会社GYAKUTEN',
    images: [
      {
        url: '/top-slide/陸送会社統合管理システム.png',
        width: 1200,
        height: 630,
        alt: 'GYAKUTEN運送統合管理システム - 東翔運輸監修・43台実証済み',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gyakuten_llc',
    title: '【東翔運輸監修】GYAKUTEN運送統合管理システム | 43台実証・管理業務50%削減',
    description: '東翔運輸株式会社監修・43台53名で実証済み。管理業務時間50%削減・点検漏れゼロ・電話連絡80%削減を実現。運送業界専用統合管理システム。',
    images: ['/top-slide/陸送会社統合管理システム.png'],
  },
  alternates: {
    canonical: '/products/transport-system',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TransportSystemPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "Product"],
    "name": "GYAKUTEN運送統合管理システム",
    "description": "東翔運輸株式会社監修・43台53名で実証済み。管理業務時間50%削減・点検漏れゼロ・電話連絡80%削減を実現する運送業界専用統合管理システム。",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": ["Web", "iOS", "Android"],
    "offers": {
      "@type": "Offer",
      "price": "30000",
      "priceCurrency": "JPY",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Organization",
        "name": "東翔運輸株式会社"
      },
      "reviewBody": "43台以上の車両と53名以上のドライバーで実証。管理業務時間が半減し、ミスがゼロになりました。"
    },
    "featureList": [
      "車両リアルタイム管理",
      "ドライバー勤務状況管理",
      "点検スケジュール自動通知",
      "出庫時刻記録管理",
      "休暇申請ワンタッチ",
      "CSV出力機能"
    ],
    "publisher": {
      "@type": "Organization",
      "@id": "https://gyaku-ten.jp/#organization",
      "name": "合同会社GYAKUTEN",
      "url": "https://gyaku-ten.jp/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gyaku-ten.jp/logo.png"
      }
    }
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://gyaku-ten.jp/#organization",
    "name": "合同会社GYAKUTEN",
    "description": "運送業界に特化したDXソリューションを提供する会社",
    "url": "https://gyaku-ten.jp/",
    "telephone": "+81-XX-XXXX-XXXX",
    "email": "partner@gyaku-ten.jp",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "JP",
      "addressLocality": "日本"
    },
    "areaServed": "JP",
    "serviceArea": {
      "@type": "Country",
      "name": "日本"
    },
    "knowsAbout": ["運送管理システム", "車両管理", "ドライバー管理", "運送業DX"],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "GYAKUTEN運送統合管理システム",
        "description": "運送業界専用統合管理システム"
      }
    }
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "導入期間はどのくらいかかりますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "最短3日で導入完了します。簡単操作で60代でも即日利用可能です。"
        }
      },
      {
        "@type": "Question",
        "name": "初期費用はかかりますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "初期費用は0円です。月額3万円〜4.5万円のみで全機能をご利用いただけます。"
        }
      },
      {
        "@type": "Question",
        "name": "どのような効果が期待できますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "東翔運輸株式会社での実証では、管理業務時間50%削減、点検漏れゼロ化、電話連絡80%削減を実現しました。"
        }
      },
      {
        "@type": "Question",
        "name": "他社システムとの違いは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "業界唯一の出庫時間管理機能を搭載し、車両管理・ドライバー管理・勤務管理を1つのシステムで統合管理できます。運送業界の現場が作った使いやすさが特徴です。"
        }
      }
    ]
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData),
        }}
      />
      <main className="min-h-screen bg-white">
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-primary">
                  ホーム
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary">
                  サービス
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-black font-medium">
                運送統合管理システム
              </li>
            </ol>
          </div>
        </nav>

        {/* ファーストビュー */}
        <HeroSection />

        {/* おすすめサービス・コンテンツ */}
        <InfiniteCarousel />

        {/* 課題提示セクション */}
        <PainPointsSection />

        {/* 6大機能詳細 */}
        <CoreFeaturesSection />

        {/* 競合優位性 */}
        <CompetitiveAdvantageSection />

        {/* 導入事例（東翔運輸） */}
        <CaseStudySection />

        {/* 料金体系 */}
        <PricingSection />

        {/* 導入プロセス */}
        <ImplementationSection />
      </main>
    </Layout>
  );
}