import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import StepForm from '@/components/StepForm';
import WriteLLMOFAQSection from '@/components/WriteLLMOFAQSection';
import InfiniteCarousel from '@/components/InfiniteCarousel';

// SEO メタデータ
export const metadata: Metadata = {
  title: 'GYAKUTEN LLMOライティング | AI引用に最適化されたコンテンツ制作',
  description: 'AI検索時代に対応したライティングサービス。文字単価2.5円で、AIに抽出・引用されやすい文章をプロが代行執筆。完全手間ゼロで導入可能。',
  keywords: 'LLMOライティング, AI対応ライティング, SEOライティング, コンテンツ制作, 中小企業',
  openGraph: {
    title: 'GYAKUTEN LLMOライティング',
    description: 'AI検索時代に対応したライティングサービス',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GYAKUTEN LLMOライティング',
    description: 'AI検索時代に対応したライティングサービス',
  },
  alternates: {
    canonical: '/services/write-llmo',
  },
};

export default function WriteLLMOPage() {
  return (
    <Layout>
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
                LLMOライティング
              </li>
            </ol>
          </div>
        </nav>

        <section className="py-8 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-black mb-4 leading-tight">
                  GYAKUTEN LLMOライティング
                </h1>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  AI検索時代に対応した<span className="text-primary font-bold">プロライティングサービス</span>
                </p>
                <p className="text-base text-gray-600 mb-6">
                  生成AI時代に「AIに抽出・引用されやすい」文章をプロが代行執筆。ITが苦手でも手間ゼロ・低コストで導入できます。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">文字単価2.5円の明確料金</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">完全代行で手間ゼロ</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">1,000字から気軽にスタート</span>
                  </div>
                </div>
              </div>

              <StepForm serviceId="write-llmo" serviceName="GYAKUTEN LLMO ライティング" />
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
                  title: "記事を書く時間がない",
                  description: "本業が忙しく、コンテンツ制作に時間を割けない。外注したいが品質や費用が心配。"
                },
                {
                  title: "AI時代のライティングが分からない",
                  description: "Perplexity AIやChatGPT Search、Google GeminiなどのAI検索で引用される文章の書き方が明確でない。"
                },
                {
                  title: "SEOライティングの効果が落ちている",
                  description: "従来のSEO対策だけでは流入が伸び悩み、新しいアプローチが必要。"
                },
                {
                  title: "ライティング外注の予算が高い",
                  description: "プロライターに依頼すると高額で、継続的な発注が難しい。"
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
                LLMOライティングを使うと
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "AI引用で新しい流入確保",
                  description: "meta・内部リンク・FAQ・構造化データを標準実装。最新AI検索やChatGPT Searchで引用されやすくなり、従来のSEOに加えて新しい流入経路を獲得。"
                },
                {
                  title: "完全手間ゼロの運用",
                  description: "ヒアリング→構成→執筆→初稿＋1回修正をワンストップで提供。記事作成の負担ゼロで、完成品を受け取るだけ。"
                },
                {
                  title: "試しやすい小ロット対応",
                  description: "文字単価2.5円、1,000字（2,500円）から開始可能。小さく試して効果を確認してから段階的に拡張できる。"
                },
                {
                  title: "豊富なオプションで柔軟対応",
                  description: "FAQ設計、内部リンク提案、画像選定、特急納品など。目的と予算に合わせて必要なオプションを選択可能。"
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
                LLMOライティングの特徴
              </h2>
            </div>

            <div className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    AI時代専用ノウハウ
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    従来のSEOだけでなく「引用される構造」を徹底。meta・内部リンク・FAQ・構造化データを標準実装し、Perplexity AIやChatGPT Search、Google GeminiなどのAI検索で引用されやすい文章構造を構築します。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">AI引用最適化構造</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">FAQ形式のコンテンツ設計</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">構造化データ実装</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">従来のSEOライティング</div>
                      <div className="text-lg font-bold text-gray-800">Google検索のみ</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">LLMOライティング</div>
                      <div className="text-2xl font-bold text-primary">AI検索でも引用</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <h3 className="text-2xl font-bold text-black mb-6">
                    完全代行で手間ゼロ運用
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    ヒアリングから構成、執筆、修正まで全てを代行。ITが苦手でも安心して利用でき、完成品を受け取るだけで済みます。初稿＋1回修正も標準で含まれています。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">専門ライターによる執筆</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">初稿＋1回修正込み</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">構成案から納品まで一括対応</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8 lg:order-1">
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">1</div>
                      <div className="text-sm font-medium">ヒアリング</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">2</div>
                      <div className="text-sm font-medium">執筆</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">3</div>
                      <div className="text-sm font-medium">納品</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    ミニマムスタートで試しやすい
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    文字単価2.5円、1,000字から気軽に試せる明朗料金。小さく始めて効果を確認してから段階的に拡張可能です。豊富なオプションで目的に合わせてカスタマイズできます。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">1,000字（2,500円）から開始</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">明確な文字単価2.5円</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">豊富なオプション選択</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">他社ライティング</div>
                      <div className="text-2xl font-bold text-gray-800">10万円〜</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">LLMOライティング</div>
                      <div className="text-3xl font-bold text-primary">2,500円〜</div>
                      <div className="text-xs text-gray-500 mt-1">（1,000字の場合）</div>
                    </div>
                  </div>
                </div>
              </div>
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
                明確で分かりやすい文字単価制
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-black mb-6 text-center">基本料金</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-black text-primary mb-2">¥2.5 / 文字</div>
                  <div className="text-sm text-gray-600">最低1,000字から（¥2,500〜）</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">AI引用最適化ライティング</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">構成案作成</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">初稿＋1回修正込み</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">基本SEO・メタデータ設定</span>
                  </li>
                </ul>
                <div className="text-center">
                  <div className="text-sm text-gray-600">
                    追加修正：¥500/回（2回目以降）
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-black mb-6 text-center">オプション料金</h3>
                <ul className="space-y-4 mb-6">
                  <li className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-black">FAQ・構造化設計</span>
                    <span className="text-sm text-primary font-bold">¥5,000〜</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-black">内部リンク提案</span>
                    <span className="text-sm text-primary font-bold">¥1,000〜3,000</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-black">画像選定・編集</span>
                    <span className="text-sm text-primary font-bold">¥2,000〜5,000/枚</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-black">特急納品</span>
                    <span className="text-sm text-primary font-bold">基本料金+30%</span>
                  </li>
                </ul>
                <div className="text-center">
                  <p className="text-xs text-gray-600">
                    オプションは目的に応じて選択可能<br />
                    詳細はお見積もり時にご相談ください
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/contact"
                className="bg-primary text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors inline-block"
              >
                見積もり・相談を申し込む
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                進行フロー
              </h2>
              <p className="text-lg text-gray-700">
                最短5ステップで完成品をお届け
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                {
                  step: "1",
                  title: "初回ヒアリング",
                  description: "目的・ターゲット・文字数を確認"
                },
                {
                  step: "2",
                  title: "見積確定・契約",
                  description: "文字数×2.5円＋オプションを提示"
                },
                {
                  step: "3",
                  title: "構成案すり合わせ",
                  description: "見出し・骨子を共有"
                },
                {
                  step: "4",
                  title: "執筆→初稿提出",
                  description: "AI最適化ライターが執筆"
                },
                {
                  step: "5",
                  title: "修正→納品",
                  description: "要望反映後正式納品"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-sm font-bold text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                質問は無償対応いたします
              </p>
            </div>
          </div>
        </section>

        <WriteLLMOFAQSection />

        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              AI検索時代に対応したコンテンツを
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              まずは1,000字から気軽にお試しください。<br />
              手間ゼロで高品質なコンテンツをお届けします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                見積もり・相談を申し込む
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