import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import StepForm from '@/components/StepForm';
import FAQSection from '@/components/WebLLMOFAQSection';

// SEO メタデータ
export const metadata: Metadata = {
  title: 'ホームページ制作10万円～ | 補助金対応・格安Web制作 | GYAKUTEN',
  description: '中小企業向けホームページ制作なら10万円から。補助金・助成金対応可能。AI検索時代に最適化。月額5,000円で7ヶ月伴走サポート付き。東京都の実績豊富なWeb制作会社GYAKUTENが格安でサイト制作します。',
  keywords: 'ホームページ制作, Web制作補助金, ホームページ制作補助金, サイト制作助成金, 格安ホームページ制作, 運送会社ホームページ制作, 中小企業ホームページ, 東京ホームページ制作',
  openGraph: {
    title: 'ホームページ制作10万円～ | 補助金対応・格安Web制作',
    description: '中小企業向けホームページ制作なら10万円から。補助金・助成金対応可能。AI検索時代に最適化。',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ホームページ制作10万円～ | 補助金対応・格安Web制作',
    description: '中小企業向けホームページ制作なら10万円から。補助金・助成金対応可能。AI検索時代に最適化。',
  },
  alternates: {
    canonical: '/services/web-llmo',
  },
};

export default function WebLLMOPage() {
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
                LLMOウェブ制作
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
                  GYAKUTEN LLMOウェブ制作
                </h1>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  AI検索時代に対応した<span className="text-primary font-bold">Webサイト制作サービス</span>
                </p>
                <p className="text-base text-gray-600 mb-6">
                  構造化データ・FAQ・E-E-A-T設計を標準実装。AIが「発見し・要約し・引用しやすい」情報構造を持つサイトを低コストで構築します。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">初期10万円＋月額5,000円の明確料金</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">7ヶ月間の伴走型サポート付き</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">2〜3週間でサイト公開</span>
                  </div>
                </div>
              </div>

              {/* 右側：相談フォーム */}
              <StepForm serviceId="web-llmo" serviceName="GYAKUTEN LLMO ウェブ制作" />
            </div>
          </div>
        </section>

        {/* こんな問題ないか？セクション */}
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
                  title: "制作会社の見積もりが高すぎる",
                  description: "数十万〜数百万円の見積もりで、中小企業には手が出せない金額になってしまう。"
                },
                {
                  title: "AI時代のWeb対策が分からない",
                  description: "Perplexity AIやChatGPT Search、Google GeminiなどのAI検索に対応したサイトの作り方が明確でない。"
                },
                {
                  title: "納品後のサポートが期待できない",
                  description: "作って終わりで、運用面でのサポートや相談ができる体制がない。"
                },
                {
                  title: "隠れコストが心配",
                  description: "追加機能や修正で費用が膨らんでいく不安があり、予算管理が困難。"
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

        {/* このサービスを使うとセクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                LLMOウェブ制作を使うと
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "AI引用で競合より先行",
                  description: "構造化データ・FAQ・E-E-A-T設計でAI検索や生成がサイトを引用しやすくなり、競合より一足先にリード獲得。"
                },
                {
                  title: "業界最安値レベルの価格",
                  description: "初期10万円＋月額5,000円×7ヶ月で総額14万5,000円。同業他社の半額以下の価格帯を実現。"
                },
                {
                  title: "安心の伴走サポート",
                  description: "納品後7ヶ月間、修正・質問対応、メール・チャット無制限、軽微改修、運用レクチャーを提供。"
                },
                {
                  title: "専門家による一気通貫サポート",
                  description: "LLM・LLMO・SEOの知識に長けたスタッフが、ヒアリングから実装、その後のサポート・相談まで担当。専門性と継続性を両立。"
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

        {/* LLMOウェブ制作の特徴セクション */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                LLMOウェブ制作の特徴
              </h2>
            </div>

            <div className="space-y-16">
              {/* 特徴1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    AI検索で引用される構造化設計
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    構造化データ・FAQ・E-E-A-T設計を標準実装。Perplexity AIやChatGPT Search、Google GeminiなどのAI検索エンジンがサイトを「発見し・要約し・引用しやすい」情報構造を構築します。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">構造化データマークアップ</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">FAQ形式のコンテンツ設計</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">E-E-A-T（経験・専門性・権威性・信頼性）対応</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">従来のWebサイト</div>
                      <div className="text-lg font-bold text-gray-800">AI検索で見つからない</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">LLMOウェブ制作</div>
                      <div className="text-2xl font-bold text-primary">AI検索で引用される</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 特徴2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <h3 className="text-2xl font-bold text-black mb-6">
                    圧倒的な低価格でスタート可能
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    初期10万円＋月額5,000円で、最低契約期間は7ヶ月。同業他社の半額以下も珍しくない価格帯で、キャッシュフローに余裕がない創業フェーズでも導入しやすい料金設定です。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">明確な料金体系で安心</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">隠れコストなしの透明性</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">創業フェーズでも導入可能</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8 lg:order-1">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">他社Web制作</div>
                      <div className="text-2xl font-bold text-gray-800">30万円〜</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">LLMOウェブ制作</div>
                      <div className="text-3xl font-bold text-primary">14万5,000円</div>
                      <div className="text-xs text-gray-500 mt-1">（7ヶ月サポート込み）</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 特徴3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    継続サポート体制
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    納品後も継続して修正・質問対応、メール・チャット無制限、軽微改修、運用レクチャーを提供。「作って終わり」で放置されない安心感があります。最低契約期間は7ヶ月です。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">専門スタッフによる直接対応</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">メール・チャット無制限対応</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">軽微改修・修正対応</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">効果測定・運用レクチャー</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8">
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">1</div>
                      <div className="text-sm font-medium">制作</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">2</div>
                      <div className="text-sm font-medium">納品</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">3</div>
                      <div className="text-sm font-medium">継続サポート</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 補助金・助成金セクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                補助金・助成金で Web制作費を削減
              </h2>
              <p className="text-lg text-gray-700">
                ホームページ制作は各種補助金・助成金の対象です
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* IT導入補助金 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4">IT導入補助金</h3>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary">最大450万円</div>
                  <div className="text-sm text-gray-600">ウェブサイト制作費用の一部補助</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• ホームページ制作費</li>
                  <li>• CMSシステム導入費</li>
                  <li>• EC機能追加費用</li>
                </ul>
              </div>

              {/* 小規模事業者持続化補助金 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4">小規模事業者持続化補助金</h3>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary">最大200万円</div>
                  <div className="text-sm text-gray-600">販路開拓・Web集客支援</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• ウェブサイト制作費</li>
                  <li>• Web広告運用費</li>
                  <li>• SEO対策費用</li>
                </ul>
              </div>

              {/* 地域雇用開発助成金 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4">地域雇用開発助成金</h3>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary">最大48万円</div>
                  <div className="text-sm text-gray-600">採用・事業拡大支援</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 採用サイト制作費</li>
                  <li>• 求人用Webページ</li>
                  <li>• 会社紹介サイト</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-gray-50 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-black mb-2">補助金申請もサポートします</h3>
                <p className="text-gray-700">複雑な申請手続きもGYAKUTENがお手伝い</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-black mb-3">📋 申請支援サービス</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 事業計画書作成支援</li>
                    <li>• 申請書類の記入指導</li>
                    <li>• 必要書類の準備サポート</li>
                    <li>• 実績報告書作成支援</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-3">💰 費用負担軽減例</h4>
                  <div className="bg-white rounded p-4 border">
                    <div className="text-sm text-gray-600 mb-1">Web制作費用</div>
                    <div className="text-lg font-bold text-gray-800 mb-2">20万円</div>
                    <div className="text-sm text-gray-600 mb-1">補助金適用後</div>
                    <div className="text-2xl font-bold text-primary">実質10万円～</div>
                    <div className="text-xs text-gray-500 mt-1">※補助率・上限は制度により異なります</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 料金セクション */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                料金プラン
              </h2>
              <p className="text-lg text-gray-700">
                明確で分かりやすい料金体系
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-lg border-2 border-primary p-8 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium">
                    最低契約期間7ヶ月
                  </span>
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-4">LLMOウェブ制作</h3>
                  <div className="space-y-2">
                    <div className="text-lg text-gray-700">
                      初期費用：<span className="text-2xl font-black text-primary">¥100,000</span>
                    </div>
                    <div className="text-lg text-gray-700">
                      月額費用：<span className="text-2xl font-black text-primary">¥5,000</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-4">
                      <div className="text-sm text-gray-600 mb-1">最低契約期間7ヶ月の場合</div>
                      <div className="text-xl font-bold text-black">
                        初年度総額：<span className="text-2xl font-black text-primary">¥145,000</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">LLMO最適化設計・制作</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">レスポンシブデザイン</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">基本SEO・構造化データ実装</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">継続サポート（最低7ヶ月契約）</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">メール・チャット無制限</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">軽微改修・修正対応</span>
                  </li>
                </ul>
                
                <div className="text-center">
                  <Link
                    href="/contact"
                    className="w-full bg-primary text-white py-4 px-6 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors inline-block"
                  >
                    無料相談を申し込む
                  </Link>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    支払方法：クレジットカードまたは銀行振込<br />
                    制作期間：2〜3週間でサイト公開<br />
                    最低契約期間：7ヶ月（その後継続可能）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 利用プロセスセクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                利用プロセス
              </h2>
              <p className="text-lg text-gray-700">
                2〜3週間でサイト公開まで完了
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "専門スタッフによるヒアリング",
                  description: "LLM・LLMO・SEOに精通したスタッフが、目的・目標とLLMO対応範囲を詳しくヒアリングします。"
                },
                {
                  step: "2",
                  title: "見積提示・契約",
                  description: "費用確定後にオンラインで契約を締結します。"
                },
                {
                  step: "3",
                  title: "専門知識による設計・制作",
                  description: "LLMO最適化の専門知識を活かし、サイト構造設計 → デザイン → 実装を進めます。"
                },
                {
                  step: "4",
                  title: "納品・専門サポート開始",
                  description: "サイト公開後、同じ専門スタッフによる継続サポートが開始。一貫した品質でお客様をサポートします。"
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
        <FAQSection />

        {/* CTA セクション */}
        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              AI検索時代に対応したWebサイトを
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              まずは無料相談で現状課題を共有してください。<br />
              最適なプランをご提案いたします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                無料相談を申し込む
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