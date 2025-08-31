import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import StepForm from '@/components/StepForm';
import FAQSection from '@/components/FAQSection';
import StructuredData from '@/components/seo/StructuredData';
import InfiniteCarousel from '@/components/InfiniteCarousel';

// SEO メタデータ
export const metadata: Metadata = {
  title: 'GYAKUTENクイックサポート | 時間単位業務代行サービス',
  description: '最短1時間から利用可能な業務代行サービス。事務作業からデザイン制作まで、専門スタッフが高品質で代行。中小企業・個人事業主向け。',
  keywords: '業務代行, 時間単位, 事務代行, デザイン制作, Web制作, 中小企業',
  openGraph: {
    title: 'GYAKUTENクイックサポート',
    description: '最短1時間から利用可能な時間単位業務代行サービス',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GYAKUTENクイックサポート',
    description: '最短1時間から利用可能な時間単位業務代行サービス',
  },
  alternates: {
    canonical: '/services/quick-support',
  },
};

export default function QuickSupportPage() {
  return (
    <Layout>
      <StructuredData 
        type="faq" 
        data={{
          faq: [
            {
              question: 'クイックサポートとは何ですか？',
              answer: 'GYAKUTENクイックサポートは、中小企業・個人事業主向けの時間単位業務代行サービスです。最短1時間から必要な業務を委託でき、経営者が本業に集中できる環境を提供します。'
            },
            {
              question: '最小利用時間はどのくらいですか？',
              answer: '最短1時間から利用可能です。都度利用型で月額契約は不要。必要な分だけご利用いただけます。'
            },
            {
              question: '料金はいくらですか？',
              answer: 'ローンチ期間特別価格2,000円/時間（通常価格2,500円/時間）。パッケージプランもご用意しており、20時間パック38,000円が最もお得です。'
            },
            {
              question: 'どのような業務に対応していますか？',
              answer: '資料作成、データ入力、リサーチ、デザイン制作、SNS投稿作成、Webサイト更新など幅広い業務に対応しています。詳しくはお気軽にご相談ください。'
            },
            {
              question: '作業開始までどのくらいかかりますか？',
              answer: '最短即日で作業開始が可能です。公式LINEまたはメールでご相談いただければ、迅速に対応いたします。'
            },
          ]
        }}
      />
      <StructuredData 
        type="breadcrumb" 
        data={{
          breadcrumb: [
            { name: 'ホーム', item: 'https://gyaku-ten.jp' },
            { name: 'サービス', item: 'https://gyaku-ten.jp/services' },
            { name: 'クイックサポート', item: 'https://gyaku-ten.jp/services/quick-support' },
          ]
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
                クイックサポート
              </li>
            </ol>
          </div>
        </nav>

        <section className="py-8 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-black mb-4 leading-tight">
                  GYAKUTENクイックサポート
                </h1>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  <span className="text-primary font-bold">最短1時間から利用可能</span>な時間単位業務代行サービス
                </p>
                <p className="text-base text-gray-600 mb-6">
                  外注管理の煩雑さを解消し、経営者が本業に集中できる環境を提供。事務作業からデザイン制作まで、専任スタッフが高品質で対応します。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">最短1時間から・都度利用型</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">公式LINE・メールで簡潔な発注</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">専任スタッフによる品質管理</span>
                  </div>
                </div>
              </div>

              <StepForm serviceId="quick-support" serviceName="GYAKUTENクイックサポート" />
            </div>
          </div>
        </section>

        <InfiniteCarousel />

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                こんな問題、ありませんか？
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "業務の急な溢れで困っている",
                  description: "繁忙期や急な案件で業務が溢れても、正社員を増やすほどではない。"
                },
                {
                  title: "外注管理が煩雑で本業に集中できない",
                  description: "外注先の選定、交渉、管理にかかる時間とコストが負担になっている。"
                },
                {
                  title: "スポット業務の委託先が見つからない",
                  description: "クラウドソーシングでは発注から作業開始まで時間がかかりすぎる。"
                },
                {
                  title: "クオリティが安定しない",
                  description: "毎回異なる作業者で品質にバラつきがあり、修正対応に時間を取られる。"
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
                    <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white transform rotate-45 shadow-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                クイックサポートを使うと
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "最短1時間から利用可能",
                  description: "必要な分だけスポットで利用。都度利用型で月額契約不要。"
                },
                {
                  title: "専任スタッフで品質安定",
                  description: "継続利用により作業精度が向上。品質の一貫性を確保。"
                },
                {
                  title: "外注管理コスト80%削減",
                  description: "発注先の選定・交渉・管理にかかる時間とコストを大幅削減。"
                },
                {
                  title: "即日対応可能",
                  description: "最短30分で作業開始。緊急案件にも迅速に対応します。"
                },
                {
                  title: "包括的なサービス提供",
                  description: "納品前の品質チェックから修正対応まで一体的にサポート。"
                },
                {
                  title: "継続利用で精度向上",
                  description: "御社の業務内容を理解し、継続利用により作業効率が向上。"
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
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                クイックサポートの特徴
              </h2>
            </div>

            <div className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    業界トップクラスの柔軟性
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    最小利用時間1時間から、都度利用型で月額契約不要。必要な時に必要な分だけご利用いただける完全従量課金制。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">最小1時間から対応</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">都度利用型（月額契約不要）</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">完全従量課金制</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">一般的な業務代行</div>
                      <div className="text-2xl font-bold text-gray-800">月額契約必須</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">クイックサポート</div>
                      <div className="text-3xl font-bold text-primary">1時間から</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <h3 className="text-2xl font-bold text-black mb-6">
                    シンプルな発注プロセス
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    公式LINEまたはメールでの簡潔な依頼フロー。事前の複雑な契約手続き不要で、最短即日での作業開始が可能です。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">公式LINE・メールで簡潔依頼</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">事前契約手続き不要</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">最短即日作業開始</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-6 lg:order-1">
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <div className="font-semibold text-sm">STEP 1</div>
                      <div className="text-gray-700">LINE・メールで依頼</div>
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-4 py-2">
                      <div className="font-semibold text-sm">STEP 2</div>
                      <div className="text-gray-700">見積もり提示</div>
                    </div>
                    <div className="border-l-4 border-green-400 pl-4 py-2">
                      <div className="font-semibold text-sm">STEP 3</div>
                      <div className="text-gray-700">作業開始</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    品質管理体制
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    全作業を自社管理下のプロフェッショナルスタッフが対応。納品前の品質チェック体制により、修正対応を含む包括的なサービスを提供します。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">自社管理プロフェッショナルスタッフ</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">納品前品質チェック体制</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">修正対応を含む包括サービス</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8">
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">✓</div>
                      <div className="text-sm font-medium">専任スタッフ</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">✓</div>
                      <div className="text-sm font-medium">品質チェック</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">✓</div>
                      <div className="text-sm font-medium">修正対応</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                対応業務範囲
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-black mb-4">
                  事務・管理業務
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">資料作成（プレゼン・報告書等）</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">データ入力・集計作業</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">リサーチ・市場調査</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">議事録作成・文字起こし</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-black mb-4">
                  デザイン・制作業務
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">SNS用画像・バナー制作</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">ブログ用サムネイル作成</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">簡易動画編集</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">販促物デザイン（名刺・チラシ等）</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-black mb-4">
                  Web・デジタルマーケティング業務
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">Webサイト更新・保守作業</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">SNS投稿コンテンツ作成</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">ECサイト商品登録・更新</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">メールマガジン原稿作成</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600">※上記以外の業務にも対応可能です。お気軽にご相談ください。</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                料金体系
              </h2>
              <p className="text-lg text-gray-700">
                ローンチ期間特別価格でご提供中（2025年2月末まで）
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-lg border-2 border-primary p-6 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    特別価格
                  </span>
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-black mb-2">基本料金</h3>
                  <div className="text-2xl font-black text-primary mb-1">¥2,000/時間</div>
                  <div className="text-sm text-gray-600 line-through">通常¥2,500/時間</div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  2025年2月末まで
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-black mb-2">5時間パック</h3>
                  <div className="text-2xl font-black text-black mb-1">¥11,000</div>
                  <div className="text-sm text-gray-600">単価¥2,200/時間</div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  有効期限3ヶ月
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-black mb-2">10時間パック</h3>
                  <div className="text-2xl font-black text-black mb-1">¥20,000</div>
                  <div className="text-sm text-gray-600">単価¥2,000/時間</div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  有効期限3ヶ月
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-black mb-2">20時間パック</h3>
                  <div className="text-2xl font-black text-black mb-1">¥38,000</div>
                  <div className="text-sm text-primary font-bold">単価¥1,900/時間</div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  有効期限3ヶ月・最もお得
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8">
              <h3 className="text-xl font-bold text-black mb-6 text-center">オプションサービス</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="font-bold text-black mb-2">特急対応</div>
                  <div className="text-sm text-gray-600">24時間以内納品</div>
                  <div className="text-primary font-bold">基本料金の50%加算</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-black mb-2">土日祝日対応</div>
                  <div className="text-sm text-gray-600">土日祝での作業</div>
                  <div className="text-primary font-bold">基本料金の30%加算</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-black mb-2">大量発注割引</div>
                  <div className="text-sm text-gray-600">10時間以上の案件</div>
                  <div className="text-primary font-bold">10%割引</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-black mb-2">継続契約割引</div>
                  <div className="text-sm text-gray-600">3ヶ月以上継続</div>
                  <div className="text-primary font-bold">15%割引</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">支払条件：25日締め当月月末払い</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6 text-center">
                サービス利用フロー
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                {
                  step: "1",
                  title: "問い合わせ・相談",
                  description: "公式LINEまたはメールにて作業内容をご連絡いただきます。"
                },
                {
                  step: "2", 
                  title: "見積もり提示",
                  description: "作業内容を確認後、概算時間と料金をご提示します。"
                },
                {
                  step: "3",
                  title: "作業実施",
                  description: "ご了承いただき次第、作業を開始します。必要に応じて進捗を共有します。"
                },
                {
                  step: "4",
                  title: "納品・検収",
                  description: "成果物を納品し、ご確認いただきます。修正が必要な場合は迅速に対応します。"
                },
                {
                  step: "5",
                  title: "請求・支払い",
                  description: "月末締めにて請求書を発行し、翌月末までにお支払いいただきます。"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary/10 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-black mb-4">
                詳細資料ダウンロード
              </h2>
              <p className="text-gray-700 mb-6">
                GYAKUTENクイックサポートの詳細な説明資料をご用意しました。<br />
                サービス内容、料金体系、導入効果などを詳しくご確認いただけます。
              </p>
              <Link
                href="/Business_Information/GYAKUTENクイックサポートサービス説明資料.pdf"
                target="_blank"
                className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                説明資料をダウンロード
              </Link>
            </div>
          </div>
        </section>

        <FAQSection />

        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              本業に集中できる環境を手に入れませんか？
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              最短1時間から利用可能な業務代行サービス。<br />
              まずはお気軽にご相談ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                お問い合わせ・ご相談
              </Link>
              <Link
                href="/materials"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-white hover:text-primary transition-colors"
              >
                詳細資料をダウンロード
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}