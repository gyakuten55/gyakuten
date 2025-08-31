import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import StepForm from '@/components/StepForm';
import PartnerFAQSection from '@/components/PartnerFAQSection';
import ProfitSimulator from '@/components/ProfitSimulator';
import StructuredData from '@/components/seo/StructuredData';

// SEO メタデータ
export const metadata: Metadata = {
  title: 'パートナー募集 | 案件外注・協業企業募集 | 10万円〜対応可能 | GYAKUTEN',
  description: '外注先をお探しの企業様へ。10万円から対応可能な案件募集中。運送・物流業界実績、段階開発対応、継続率97%。NDA対応、24時間以内返信保証。',
  keywords: '案件募集, 外注, システム開発, パートナー募集, 協業, 業務委託, IT外注, 小規模開発, 継続率97%, DX支援',
  authors: [{ name: '合同会社GYAKUTEN' }],
  publisher: '合同会社GYAKUTEN',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'パートナー募集 | 案件外注・協業企業募集',
    description: '10万円から対応可能な案件募集中。運送・物流業界実績、段階開発対応、継続率97%。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://gyaku-ten.jp/partner',
    siteName: 'GYAKUTEN - すべての逆境に、最高の逆転劇を。',
    images: [
      {
        url: 'https://gyaku-ten.jp/og-partner.jpg',
        width: 1200,
        height: 630,
        alt: 'GYAKUTEN パートナー募集 - 10万円から対応可能な案件募集中',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gyakuten55',
    creator: '@gyakuten_aoi',
    title: 'パートナー募集 | 案件外注・協業企業募集',
    description: '10万円から対応可能な案件募集中。運送・物流業界実績、段階開発対応、継続率97%。',
    images: ['https://gyaku-ten.jp/og-partner.jpg'],
  },
  alternates: {
    canonical: '/partner',
  },
  other: {
    'article:author': '合同会社GYAKUTEN',
    'article:publisher': 'https://gyaku-ten.jp',
  },
};

export default function PartnerPage() {
  return (
    <Layout>
      {/* 構造化データ */}
      <StructuredData 
        type="breadcrumb" 
        data={{
          breadcrumb: [
            { name: 'ホーム', item: 'https://gyaku-ten.jp' },
            { name: 'パートナー募集', item: 'https://gyaku-ten.jp/partner' },
          ]
        }}
      />
      <StructuredData 
        type="organization"
      />
      <StructuredData 
        type="service" 
        data={{
          service: {
            '@type': 'ProfessionalService',
            name: '案件パートナー募集',
            description: '10万円から対応可能な案件募集。システム開発・DX支援の外注パートナーサービス',
            provider: {
              '@type': 'Organization',
              name: '合同会社GYAKUTEN'
            },
            offers: {
              '@type': 'Offer',
              price: '100000',
              priceCurrency: 'JPY',
              description: '10万円からの小規模案件対応可能'
            }
          }
        }}
      />
      <main className="min-h-screen bg-white" role="main">
        {/* パンくずリスト */}
        <nav className="bg-white border-b border-gray-200" role="navigation" aria-label="パンくずリスト">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/" className="hover:text-primary" itemProp="item">
                  <span itemProp="name">ホーム</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-black font-medium" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name">パートナー募集</span>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </div>
        </nav>

        {/* ヒーローセクション */}
        <header className="py-8 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* 左側：説明 */}
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-black mb-4 leading-tight">
                  案件パートナー募集
                </h1>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  優秀な外注先をお探しの企業様へ。<span className="text-primary font-bold">10万円〜の案件から対応可能</span>
                </p>
                <p className="text-base text-gray-600 mb-6">
                  中小規模案件大歓迎！運送・物流業界での豊富な実績を持つGYAKUTENが、御社の開発パートナーとして高品質なシステム開発・DX支援をご提供いたします。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3" role="presentation">
                      <span className="text-white text-xs font-bold" aria-label="チェック">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">10万円〜の小規模案件から対応</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3" role="presentation">
                      <span className="text-white text-xs font-bold" aria-label="チェック">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">継続率97%の高品質・安定性</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3" role="presentation">
                      <span className="text-white text-xs font-bold" aria-label="チェック">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">24時間以内返信・最短即日着手</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3" role="presentation">
                      <span className="text-white text-xs font-bold" aria-label="チェック">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">NDA対応・機密情報管理徹底</span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-xl font-bold text-primary">
                    すべての逆境に、最高の逆転劇を。
                  </p>
                </div>
              </div>

              {/* 右側：相談フォーム */}
              <aside role="complementary" aria-label="パートナー申込みフォーム">
                <StepForm serviceId="partner" serviceName="パートナー案件相談" />
              </aside>
            </div>
          </div>
        </header>

        {/* こんな問題ないか？セクション */}
        <article className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                こんな問題、ありませんか？
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "優秀な外注先が見つからない",
                  description: "技術力があり、コミュニケーション力も高い開発会社を探すのに苦労している。"
                },
                {
                  title: "小規模案件を受けてくれない",
                  description: "10-50万円程度の案件は「割に合わない」と断られることが多い。"
                },
                {
                  title: "納期・品質が不安定",
                  description: "外注先によって品質や納期にバラつきがあり、プロジェクト管理が困難。"
                },
                {
                  title: "コミュニケーションコストが高い",
                  description: "要件の伝達や進捗確認に時間がかかり、本来業務に集中できない。"
                }
              ].map((item, index) => (
                <div key={index} className="relative mb-4">
                  <div className="bg-white p-6 rounded-lg shadow-md relative min-h-[140px] flex flex-col">
                    <h3 className="text-lg font-bold text-black mb-3 flex-shrink-0">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 flex-grow">
                      {item.description}
                    </p>
                    {/* 吹き出しの尻尾 */}
                    <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white transform rotate-45 shadow-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* GYAKUTENをパートナーにするとセクション */}
        <article className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                GYAKUTENをパートナーにすると
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "小規模案件も大歓迎",
                  description: "10万円からの小規模案件でも丁寧に対応。むしろ小回りが利く案件を得意としています。"
                },
                {
                  title: "継続率97%の安定性",
                  description: "一度お任せいただいたお客様の97%が継続利用。品質と信頼性を数字で証明しています。"
                },
                {
                  title: "スピード対応",
                  description: "問い合わせから24時間以内に返信。最短即日で開発着手可能な機動力があります。"
                },
                {
                  title: "柔軟な協業スタイル",
                  description: "完全受託から部分支援まで。御社のニーズに合わせて最適な協業形態をご提案します。"
                }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-primary pl-6 py-4">
                  <h3 className="text-lg font-bold text-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* 対応可能案件・技術スタックセクション */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                対応可能案件・技術スタック
              </h2>
            </div>

            <div className="space-y-16">
              {/* 対応案件規模 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    対応可能な案件規模と価格帯
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    10万円〜500万円の中小規模案件が得意領域。大手が受けたがらない小規模案件も、丁寧に対応いたします。分割払いや段階開発にも柔軟に対応。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">小規模案件：10万円〜100万円</div>
                      <div className="text-sm text-gray-600">業務効率化ツール、簡単なWebアプリ等</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">中規模案件：100万円〜300万円</div>
                      <div className="text-sm text-gray-600">基幹システム、ECサイト、CRM等</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">大規模案件：300万円〜500万円</div>
                      <div className="text-sm text-gray-600">統合システム、複数システム連携等</div>
                    </div>
                  </div>
                </div>
                <figure className="bg-white border border-gray-200 p-8">
                  <div className="space-y-4">
                    <figcaption className="text-center pb-4 border-b border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">見積例</div>
                      <div className="text-lg font-bold text-gray-800">簡易管理システム</div>
                    </figcaption>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">基本機能開発</span>
                        <span className="text-sm font-medium">7万円</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">データ連携機能</span>
                        <span className="text-sm font-medium">2万円</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">テスト・導入支援</span>
                        <span className="text-sm font-medium">1万円</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="font-bold">合計</span>
                        <span className="text-2xl font-bold text-primary">10万円</span>
                      </div>
                    </div>
                  </div>
                </figure>
              </div>

              {/* 技術スタック */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <h3 className="text-2xl font-bold text-black mb-6">
                    対応技術スタック
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    モダンな技術スタックから枯れた技術まで幅広く対応。フロントエンド・バックエンド・インフラまで一貫して開発可能です。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">フロントエンド</div>
                      <div className="text-sm text-gray-600">React, Next.js, Vue.js, TypeScript等々</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">バックエンド</div>
                      <div className="text-sm text-gray-600">Node.js, Python, PHP, Java等々</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">データベース・インフラ</div>
                      <div className="text-sm text-gray-600">PostgreSQL, MySQL, AWS, Vercel等々</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8 lg:order-1">
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="text-lg font-bold text-black mb-2">開発対応範囲</div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">要件定義</span>
                        <span className="text-primary font-bold">○</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">設計・開発</span>
                        <span className="text-primary font-bold">○</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">テスト・QA</span>
                        <span className="text-primary font-bold">○</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">運用・保守</span>
                        <span className="text-primary font-bold">○</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 協業実績 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    協業実績：東翔運輸株式会社様
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    運送・物流業界での代表的な成功事例。Excel管理からシステム化により、業務効率を大幅改善。現在も継続的な改善を実施中です。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">開発期間：3ヶ月</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">予算：100万円程度（初期開発）</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">効果：作業時間50%削減</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">継続：7ヶ月無料サポート後、月額保守継続</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Before（Excel管理）</div>
                      <div className="bg-red-50 p-4 rounded border border-red-200">
                        <div className="text-sm text-gray-700">
                          • 配車管理がExcelファイル<br/>
                          • データ入力ミスが頻発<br/>
                          • 情報共有に時間がかかる
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto">
                        <span className="text-sm font-bold">↓</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">After（システム化）</div>
                      <div className="bg-green-50 p-4 rounded border border-green-200">
                        <div className="text-sm text-gray-700">
                          • リアルタイム配車管理<br/>
                          • データ入力ミス大幅削減<br/>
                          • 情報共有の効率化
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 利益シミュレーター */}
        <ProfitSimulator />

        {/* 協業パターンセクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                選べる協業パターン
              </h2>
              <p className="text-lg text-gray-700">
                御社のニーズに合わせて最適な協業形態をご提案
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 完全受託 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-black mb-4">完全受託開発</h3>
                <div className="mb-6">
                  <div className="text-primary font-bold mb-2">要件定義〜運用まで一括対応</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">プロジェクト管理・進行管理</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">要件定義・設計・開発・テスト</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">導入支援・運用保守</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">瑕疵担保・品質保証</span>
                  </li>
                </ul>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    御社のリソースを使わずに完遂
                  </p>
                </div>
              </div>

              {/* 部分支援 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-black mb-4">部分支援・専門技術提供</h3>
                <div className="mb-6">
                  <div className="text-primary font-bold mb-2">特定工程のみのスポット支援</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">実装のみ（設計書から開発）</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">技術コンサルティング</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">コードレビュー・品質改善</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">緊急対応・炎上案件の火消し</span>
                  </li>
                </ul>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    必要な部分だけ効率的に活用
                  </p>
                </div>
              </div>

              {/* 技術顧問 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-black mb-4">技術顧問・継続サポート</h3>
                <div className="mb-6">
                  <div className="text-primary font-bold mb-2">月額制での継続的な技術支援</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">技術選定・アーキテクチャ設計</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">開発チームのメンタリング</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">定期的なコードレビュー</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">技術的な課題解決サポート</span>
                  </li>
                </ul>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    月額5万円〜の継続サポート
                  </p>
                </div>
              </div>

              {/* 相互紹介 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-black mb-4">相互紹介・業務提携</h3>
                <div className="mb-6">
                  <div className="text-primary font-bold mb-2">Win-Winの関係構築</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">お客様の相互紹介</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">技術分野の相互補完</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">大規模案件での協業</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">営業リソースの相互活用</span>
                  </li>
                </ul>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    紹介成功報酬10-20%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 契約条件セクション */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                契約条件・対応体制
              </h2>
              <p className="text-lg text-gray-700">
                安心してお任せいただける契約・サポート体制
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 契約関連 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-black mb-6 text-center">契約・法務対応</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">NDA（機密保持契約）対応</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">請負契約・準委任契約どちらもOK</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">瑕疵担保責任期間：6ヶ月</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">損害保険加入済み</span>
                  </li>
                </ul>
              </div>

              {/* サポート体制 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-black mb-6 text-center">レスポンス・サポート</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">問い合わせ24時間以内返信保証</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">最短即日で開発着手可能</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">リモート対応（全国対応可能）</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">緊急対応・炎上案件の火消し</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* NGな案件セクション */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                対応困難な案件について
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                透明性を重視し、お受けできない案件も明記いたします
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-black mb-2">お受けできない案件</h3>
                <p className="text-gray-600">以下に該当する案件は対応が困難です</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-black mb-3">規模・技術的要因</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 1000万円以上の大規模案件</li>
                    <li>• ゲーム開発・エンターテイメント系</li>
                    <li>• 組み込みシステム・ハードウェア制御</li>
                    <li>• AI・機械学習の専門的開発</li>
                    <li>• ブロックチェーン・仮想通貨関連</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-black mb-3">業務・契約的要因</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 常駐必須の案件</li>
                    <li>• 法的にグレーな案件</li>
                    <li>• 成果物の権利関係が複雑な案件</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  ※上記に該当する場合も、まずは一度ご相談ください。<br />
                  別のアプローチやパートナー会社のご紹介が可能な場合があります。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ セクション */}
        <PartnerFAQSection />

        {/* CTA セクション */}
        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              信頼できる開発パートナーをお探しですか？
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              まずは無料相談で御社の案件についてお聞かせください。<br />
              最適な協業プランをご提案いたします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-white text-primary px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
                aria-label="無料相談・お見積もり依頼ページへ移動"
                title="無料相談・お見積もりを依頼する"
              >
                無料相談・お見積もり依頼
              </Link>
              <Link
                href="/"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-white hover:text-primary transition-colors"
                aria-label="パートナー募集フォームページへ移動"
                title="パートナー募集に申し込む"
              >
                パートナー募集フォーム
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}