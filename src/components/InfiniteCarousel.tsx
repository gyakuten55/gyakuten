'use client';

import Image from 'next/image';
import Link from 'next/link';

interface CarouselItem {
  image: string;
  alt: string;
  title: string;
  description: string;
  link: string;
  ariaLabel: string;
  isExternal?: boolean;
}

const carouselItems: CarouselItem[] = [
  {
    image: '/top-slide/陸送会社統合管理システム.png',
    alt: '東翔運輸株式会社様 統合管理システム開発事例',
    title: '東翔運輸株式会社様向け統合管理システム開発事例',
    description: '陸送業界のDXを実現した統合管理システムの開発コラム',
    link: 'https://gyaku-ten.jp/column/50fsnjxlzxd',
    ariaLabel: '東翔運輸株式会社様に納品した統合管理システムの詳細コラムを読む'
  },
  {
    image: '/top-slide/有料プロンプトnote.png',
    alt: '次元転換プロンプト完全攻略法',
    title: 'AIの知能を爆発的に向上させる次元転換プロンプト',
    description: '未流出の革新的プロンプト技術を完全公開',
    link: 'https://note.com/aoitech/n/na009e1a631e5',
    ariaLabel: 'AIの知能を爆発的に向上させる次元転換プロンプト完全攻略法の有料noteを購入',
    isExternal: true
  },
  {
    image: '/top-slide/メルマガ訴求.png',
    alt: 'AI時代の生存戦略メルマガ',
    title: 'GYAKUTEN メールマガジン登録',
    description: 'AI時代の生存戦略・最新技術・ビジネス戦略・限定コンテンツ配信',
    link: 'https://gyaku-ten.jp/newsletter',
    ariaLabel: 'AI時代の生存戦略や最新技術を配信するメルマガに登録'
  },
  {
    image: '/top-slide/無料診断訴求.png',
    alt: 'SEO/LLMO無料診断ツール',
    title: '1分でできる！SEO/LLMO最適化診断',
    description: '完全無料でサイトのSEO・LLMO最適化状況を即座に診断',
    link: 'https://gyaku-ten.jp/diagnosis',
    ariaLabel: 'SEOとLLMOの観点でサイトを1分で無料診断するツールを使用'
  }
];

export default function InfiniteCarousel() {
  // スムーズな無限スクロールのために2セット分のアイテムを作成
  const duplicatedItems = [...carouselItems, ...carouselItems];

  // JSON-LD構造化データ
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "GYAKUTEN おすすめサービス・コンテンツ",
    "description": "合同会社GYAKUTENが提供する主要サービスと情報コンテンツ",
    "numberOfItems": carouselItems.length,
    "itemListElement": carouselItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": item.title,
        "description": item.description,
        "url": item.link,
        "image": `https://gyaku-ten.jp${item.image}`
      }
    }))
  };

  return (
    <section className="infinite-carousel-container bg-white py-4" aria-label="サービス紹介バナー">
      {/* SEO用構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* セマンティックヘッダー */}
      <h2 className="sr-only">おすすめサービス・コンテンツ</h2>
      <div className="ai-context">
        合同会社GYAKUTENが提供する4つの主要サービス：
        東翔運輸様向け統合管理システム開発事例、
        AI活用の次元転換プロンプト有料教材、
        AI時代のビジネス戦略メルマガ、
        無料SEO/LLMO診断ツール
      </div>
      
      <div className="infinite-carousel-track">
        {/* 最初のセット */}
        <div className="carousel-set">
          {duplicatedItems.map((item, index) => (
            <Link
              key={`set1-${index}`}
              href={item.link}
              className="carousel-item"
              aria-label={item.ariaLabel}
              title={item.title}
              {...(item.isExternal && { rel: "noopener noreferrer", target: "_blank" })}
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={350}
                height={200}
                className="w-full h-full object-contain"
                priority={index < 3}
              />
            </Link>
          ))}
        </div>
        
        {/* 2番目のセット（完全に同じ内容でシームレスなループを実現）*/}
        <div className="carousel-set">
          {duplicatedItems.map((item, index) => (
            <Link
              key={`set2-${index}`}
              href={item.link}
              className="carousel-item"
              aria-label={item.ariaLabel}
              title={item.title}
              {...(item.isExternal && { rel: "noopener noreferrer", target: "_blank" })}
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={350}
                height={200}
                className="w-full h-full object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}