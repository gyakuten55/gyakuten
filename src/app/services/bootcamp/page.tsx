import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import StepForm from '@/components/StepForm';
import BootcampFAQSection from '@/components/BootcampFAQSection';
import InfiniteCarousel from '@/components/InfiniteCarousel';

// SEO メタデータ
export const metadata: Metadata = {
  title: '逆転ブートキャンプ | 180日間マンツーマン事業成長プログラム',
  description: '代表・中山蒼が180日間マンツーマンで伴走。半年で月収100万円レベルの事業成長を狙う育成プログラム。成果コミット型で未達なら受講料50%返金。',
  keywords: '逆転ブートキャンプ, 事業成長, マンツーマン指導, 売上向上, 起業支援, 営業戦略',
  openGraph: {
    title: '逆転ブートキャンプ',
    description: '180日間マンツーマン事業成長プログラム',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '逆転ブートキャンプ',
    description: '180日間マンツーマン事業成長プログラム',
  },
  alternates: {
    canonical: '/services/bootcamp',
  },
};

export default function BootcampPage() {
  return (
    <Layout>
      <main className="min-h-screen bg-white">
        {/* パンくずリスト */}
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
                逆転ブートキャンプ
              </li>
            </ol>
          </div>
        </nav>

        {/* ヒーローセクション */}
        <section className="py-8 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* 左側：説明 */}
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-black mb-4 leading-tight">
                  逆転ブートキャンプ
                </h1>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  <span className="text-primary font-bold">180日間マンツーマン</span>事業成長プログラム
                </p>
                <p className="text-base text-gray-600 mb-6">
                  代表・中山蒼が180日間マンツーマンで伴走し、実証済みのノウハウを用いて「半年で月収100万円」レベルの事業成長を狙う育成プログラムです。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">代表直伝の完全個別指導</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">成果コミット型（未達なら50%返金）</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">営業・Web・SNS・LLMO対策を網羅</span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-xl font-bold text-primary">
                    すべての逆境に、最高の逆転劇を。
                  </p>
                </div>
              </div>

              {/* 右側：相談フォーム */}
              <StepForm serviceId="bootcamp" serviceName="逆転ブートキャンプ" />
            </div>
          </div>
        </section>

        {/* スライドセクション */}
        <InfiniteCarousel />

        {/* こんな問題ないか？セクション */
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
                  title: "売上の壁を突破できない",
                  description: "一定レベルまでは成長したが、そこから先の売上向上の方法が分からない。"
                },
                {
                  title: "何から始めれば良いか悩む",
                  description: "起業準備中だが、具体的なアクションプランが描けず迷っている。"
                },
                {
                  title: "汎用的なスクールでは物足りない",
                  description: "画一的なカリキュラムでは自分の状況に合った指導を受けられない。"
                },
                {
                  title: "人脈とスキルを同時に得たい",
                  description: "成長に必要な実践スキルと人的ネットワークを効率的に構築したい。"
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
        </section>

        {/* このプログラムを使うとセクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                逆転ブートキャンプを使うと
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "即効性ある打ち手を獲得",
                  description: "代表直伝の完全個別指導により、汎用的カリキュラムでは得られない状況に合わせた即効性ある戦略を習得。"
                },
                {
                  title: "成果に集中できる環境",
                  description: "事前に具体的売上目標を設定し、未達なら受講料50%返金。本気度を両者が担保し、結果に集中。"
                },
                {
                  title: "生存力のあるスキル体系",
                  description: "営業・人脈構築・Web・SNS・LLMO対策まで網羅。どんな環境変化にも適応できる総合力を獲得。"
                },
                {
                  title: "幅広い攻め方が可能",
                  description: "デジタルとアナログ手段を組み合わせたハイブリッド支援で、オンライン完結型より多角的にアプローチ。"
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

        {/* プログラムの特徴セクション */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                逆転ブートキャンプの特徴
              </h2>
            </div>

            <div className="space-y-16">
              {/* 特徴1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    代表直伝 × 完全個別指導
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    受講生全員を代表・中山蒼が直接指導し、状況に合わせてカスタマイズ。講師複数・画一カリキュラム型スクールとは異なり、一人ひとりの課題に最適化されたアプローチを提供します。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">代表が全指導を直接担当</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">状況に合わせた完全カスタマイズ</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">実証済みノウハウの直伝</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">一般的なスクール</div>
                      <div className="text-lg font-bold text-gray-800">講師複数・画一カリキュラム</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">逆転ブートキャンプ</div>
                      <div className="text-2xl font-bold text-primary">代表直伝・完全個別</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 特徴2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <h3 className="text-2xl font-bold text-black mb-6">
                    成果コミット型保証
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    事前に具体的売上目標を設定し、目標未達成の場合は受講料50%返金。「学習提供」で終わらず、具体的売上目標達成を保証する本気のコミット型プログラムです。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">事前の具体的目標設定</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">未達成時50%返金保証</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">結果に集中できる環境</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8 lg:order-1">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">一般的なスクール</div>
                      <div className="text-lg font-bold text-gray-800">学習提供のみ</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">逆転ブートキャンプ</div>
                      <div className="text-2xl font-bold text-primary">成果コミット・返金保証</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 特徴3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    全方位スキル習得
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    営業・人脈構築・Web・SNS・LLMO対策まで網羅した全方位型スキル体系。デジタルとアナログを組み合わせ、どんな環境変化にも適応できる「生存力」を獲得できます。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">営業・人脈構築スキル</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">Web・SNS戦略</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">LLMO対策・最新手法</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">ハイブリッド型アプローチ</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8">
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">営</div>
                      <div className="text-sm font-medium">営業</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-2"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">人</div>
                      <div className="text-sm font-medium">人脈</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-2"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">Web</div>
                      <div className="text-sm font-medium">Web</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-2"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">AI</div>
                      <div className="text-sm font-medium">LLMO</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 指導内容・サポート範囲セクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                指導内容・サポート範囲
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 定期指導 */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-black mb-4">定期指導・フォロー</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">週1回の定例ミーティング</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">随時チャット・質問サポート</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">課題フィードバック・添削</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">卒業後も続くネットワーク</span>
                  </li>
                </ul>
              </div>

              {/* スキル習得 */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-black mb-4">スキル習得範囲</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">営業スキル・顧客開拓</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">対面・オンライン人脈構築</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">Web・SNS戦略</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">LLMO対策・最新手法</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 推奨対象者セクション */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                推奨対象者
              </h2>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">
                      売上を伸ばしたいフリーランス・個人事業主
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      現在の事業をさらに成長させ、月収100万円レベルを目指したい方
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">
                      何から始めれば良いか悩む起業準備中の方
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      起業したいが具体的なアクションプランが描けない方
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">
                      既存事業の壁を突破したい中小企業経営者
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      一定レベルまでは成長したが、さらなる飛躍を目指す方
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">
                      実践スキルと人脈を同時に得たい成長志向のビジネスパーソン
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      総合的なビジネススキルと人的ネットワークを効率的に構築したい方
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 料金・保証セクション */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                料金・返金保証
              </h2>
            </div>

            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-lg border-2 border-primary p-8 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium">
                    モニター特別価格
                  </span>
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-4">逆転ブートキャンプ</h3>
                  <div className="text-4xl font-black text-primary mb-2">¥100,000</div>
                  <div className="text-sm text-gray-600">税込・180日間（約6ヶ月）</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">代表・中山蒼による直接指導</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">週1回定例ミーティング</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">随時チャット・課題フィードバック</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">営業・Web・SNS・LLMO全方位指導</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">卒業後も続くネットワーク</span>
                  </li>
                </ul>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-bold text-red-800 mb-2">返金保証</h4>
                  <p className="text-xs text-red-700">
                    事前設定した売上目標を未達成の場合、<br />
                    <span className="font-bold">受講料50%返金</span>（条件あり）
                  </p>
                </div>
                
                <div className="text-center">
                  <Link
                    href="/contact"
                    className="w-full bg-primary text-white py-4 px-6 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors inline-block"
                  >
                    無料カウンセリングを申し込む
                  </Link>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    支払方法：クレジットカード・銀行振込
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 参加までの流れセクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                参加までの流れ
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "無料15分カウンセリング",
                  description: "現状・目標をヒアリングし、即時アドバイスを提供"
                },
                {
                  step: "2",
                  title: "個別プラン設計",
                  description: "あなた専用の成長プランを設計し、見積を提示"
                },
                {
                  step: "3",
                  title: "契約手続き",
                  description: "目標設定・返金条件を含む契約を締結"
                },
                {
                  step: "4",
                  title: "キックオフ・正式スタート",
                  description: "体制構築後、アクションプランを確定し開始"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
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

        {/* FAQ セクション */}
        <BootcampFAQSection />

        {/* CTA セクション */}
        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              すべての逆境に、最高の逆転劇を。
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              まずは無料15分カウンセリングで現状をお聞かせください。<br />
              即時アドバイスと共に、あなた専用の成長プランをご提案します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                無料カウンセリングを申し込む
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