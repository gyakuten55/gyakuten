import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import StepForm from '@/components/StepForm';
import ConsultingFAQSection from '@/components/ConsultingFAQSection';

// SEO メタデータ
export const metadata: Metadata = {
  title: 'GYAKUTEN LLMOコンサルティング | AI時代の戦略的伴走コンサル',
  description: 'AI検索・生成AI時代に選ばれるWeb・コンテンツ体制を構築する伴走型コンサルティング。専門用語ゼロ、現場で即使える改善策を実装まで一貫サポート。',
  keywords: 'LLMOコンサルティング, AI時代コンサル, Webコンサルティング, 中小企業支援, デジタル戦略',
  openGraph: {
    title: 'GYAKUTEN LLMOコンサルティング',
    description: 'AI時代の戦略的伴走コンサル',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GYAKUTEN LLMOコンサルティング',
    description: 'AI時代の戦略的伴走コンサル',
  },
  alternates: {
    canonical: '/services/llmo-consulting',
  },
};

export default function LLMOConsultingPage() {
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
                GYAKUTEN LLMOコンサルティング
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
                  GYAKUTEN LLMOコンサルティング
                </h1>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  <span className="text-primary font-bold">AI検索・生成AI時代</span>に選ばれるWeb・コンテンツ体制を構築
                </p>
                <p className="text-base text-gray-600 mb-6">
                  専門用語を排し、現場で即使える改善策を提案・実装・検証まで一貫サポート。ITが得意でなくても安心して導入可能な伴走型コンサルティングです。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">専門用語ゼロの現場主義コンサル</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">月単位解約可・成果主義プライシング</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">中小企業特化・97%継続率の実績</span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-xl font-bold text-primary">
                    ビジネス全体をAI時代の最適解へ導く&ldquo;泥臭い成果主義&rdquo;
                  </p>
                </div>
              </div>

              {/* 右側：相談フォーム */}
              <StepForm serviceId="llmo-consulting" serviceName="GYAKUTEN LLMO コンサル" />
            </div>
          </div>
        </section>

        {/* こんな課題ありませんか？セクション */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                こんな課題、ありませんか？
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "AI時代に取り残される不安",
                  description: "ChatGPTなどのAI検索が普及する中、従来のSEO対策だけで大丈夫なのか心配。"
                },
                {
                  title: "具体的な改善策が分からない",
                  description: "LLMO対策の必要性は感じるが、何から手をつけて良いか分からず迷っている。"
                },
                {
                  title: "高額コンサルは手が出ない",
                  description: "大手コンサルは月50万円超で予算に合わず、中小企業向けの現実的な支援が欲しい。"
                },
                {
                  title: "専門用語が多くて理解できない",
                  description: "ITやマーケティングの専門用語が多く、現場で実際に何をすれば良いか分からない。"
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

        {/* LLMOコンサルティングを使うとセクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                LLMOコンサルティングを使うと
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "社内で確実に改善が進む",
                  description: "現状分析→優先度付け→施策実装→効果測定まで月次で伴走。社内リソースだけでも確実に改善が進む仕組みを構築。"
                },
                {
                  title: "ITに不慣れでも迷わず実行",
                  description: "専門用語ゼロ、実務直結の提案でITに不慣れでも迷わず実行できる現場主義コンサルティング。"
                },
                {
                  title: "効果が薄ければすぐ停止可能",
                  description: "月単位で解約可・小さく始めて拡大。効果が薄ければすぐに止められる安心設計の成果主義プライシング。"
                },
                {
                  title: "大手より実務的・現実的",
                  description: "従業員5〜50名規模の課題を熟知。大手コンサルより実務的・コストも現実的な中小企業特化型。"
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

        {/* プラン・料金セクション */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                プラン・料金
              </h2>
              <p className="text-gray-600">
                月単位でいつでも解約可能。小さく始めて効果を確認しながら拡大できます。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* スタンダードプラン */}
              <div className="bg-white rounded-lg border-2 border-gray-200 p-8 relative">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-4">スタンダード</h3>
                  <div className="text-4xl font-black text-primary mb-2">¥150,000</div>
                  <div className="text-sm text-gray-600 mb-4">月額・税込</div>
                  <div className="text-sm text-gray-500">スポット：17万円/回</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">月次ミーティング最大4回</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">LLMO診断レポート</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">実装指導・効果測定</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">社内報告書作成</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">メール・チャットサポート</span>
                  </li>
                </ul>
                
                <div className="text-center">
                  <Link
                    href="/contact"
                    className="w-full bg-primary text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors inline-block"
                  >
                    無料相談を申し込む
                  </Link>
                </div>
              </div>

              {/* プレミアムプラン */}
              <div className="bg-white rounded-lg border-2 border-primary p-8 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium">
                    おすすめ
                  </span>
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-4">プレミアム</h3>
                  <div className="text-4xl font-black text-primary mb-2">¥250,000</div>
                  <div className="text-sm text-gray-600 mb-4">月額・税込</div>
                  <div className="text-sm text-gray-500">スポット：27万円/回</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">月次ミーティング最大8回</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">スタンダード全内容</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">経営戦略会議</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">競合分析・市場調査</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">事業戦略レベルのLLMO設計</span>
                  </li>
                </ul>
                
                <div className="text-center">
                  <Link
                    href="/contact"
                    className="w-full bg-primary text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors inline-block"
                  >
                    無料相談を申し込む
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                支払方法：クレジットカード・銀行振込 / 月単位でいつでも解約可能
              </p>
            </div>
          </div>
        </section>

        {/* 差別化ポイントセクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                4つの差別化ポイント
              </h2>
            </div>

            <div className="space-y-16">
              {/* ポイント1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    実務直結の中小企業特化型
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    誰でも実行できるレベルまで落とし込む中小企業特化型コンサルティング。専門用語を排し、現場ですぐに使える具体的な改善策を提供します。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">専門用語ゼロの分かりやすい説明</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">現場で即実行可能な具体策</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">中小企業の課題を熟知</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-8">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">大手コンサル</div>
                      <div className="text-lg font-bold text-gray-800">理論重視・専門用語多用</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">LLMOコンサルティング</div>
                      <div className="text-2xl font-bold text-primary">実務直結・現場主義</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ポイント2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <h3 className="text-2xl font-bold text-black mb-6">
                    現実的価格設定
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    月15/25万円で本格コンサルティングを提供。他社相場50万円超を大幅に下回る現実的な価格で、中小企業でも導入しやすい料金体系を実現しています。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">業界最安値レベルの明確料金</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">中小企業でも導入可能</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">隠れた費用は一切なし</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-8 lg:order-1">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">他社相場</div>
                      <div className="text-lg font-bold text-gray-800">月50万円超</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">LLMOコンサルティング</div>
                      <div className="text-2xl font-bold text-primary">月15万円〜</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ポイント3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    解約自由度の高さ
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    月単位でいつでも解約可能。成果に自信があるからこその設計で、効果が感じられない場合はすぐに停止できる安心のサービス設計です。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">月単位でいつでも解約可</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">長期契約の縛りなし</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">成果に自信があるからこその設計</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-8">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">一般的なコンサル</div>
                      <div className="text-lg font-bold text-gray-800">年間契約・解約制限</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">LLMOコンサルティング</div>
                      <div className="text-2xl font-bold text-primary">月単位解約・自由度高</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ポイント4 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <h3 className="text-2xl font-bold text-black mb-6">
                    97%継続率の実績
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    実践的支援で高い満足度を維持し、97%の継続率を実現。机上の論理ではなく、現場で本当に使える改善策を提供し続けているからこその数字です。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">自社全サービス97%継続率</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">実践的支援による高満足度</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">継続したくなる成果創出</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-8 lg:order-1">
                  <div className="text-center">
                    <div className="text-6xl font-black text-primary mb-4">97%</div>
                    <div className="text-lg font-bold text-black">継続率</div>
                    <div className="text-sm text-gray-600 mt-2">自社全サービス実績</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 進行フローセクション */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                進行フロー
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "無料ヒアリング",
                  description: "課題・目標整理とLLMO必要性診断"
                },
                {
                  step: "2",
                  title: "見積提示・契約",
                  description: "目的に応じてプラン決定"
                },
                {
                  step: "3",
                  title: "体制構築・キックオフ",
                  description: "担当窓口整備、初期指標設定"
                },
                {
                  step: "4",
                  title: "月次サイクル",
                  description: "診断→実装支援→効果測定→次月計画"
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

        {/* 推奨対象者セクション */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                推奨対象者
              </h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">
                      AI時代に取り残される不安を抱える中小企業経営者
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      ChatGPTなどのAI検索普及で従来手法に限界を感じ、新時代に対応した戦略を求める方
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">
                      事業拡大を本気で狙う成長志向の経営者
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      現状に満足せず、Web・デジタル戦略で更なる事業成長を目指す方
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">
                      経営戦略レベルの相談を求める方
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      単なる技術支援ではなく、事業全体を俯瞰した戦略的アドバイスを求める方
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">
                      投資対効果を最大化したい効率重視の経営者
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      限られた予算で最大の効果を求め、無駄のない効率的な投資を重視する方
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ セクション */}
        <ConsultingFAQSection />

        {/* CTA セクション */}
        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              AI時代に取り残されない戦略を、今すぐ構築しませんか？
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              まずは無料ヒアリングで現状の課題とLLMO必要性を診断。<br />
              あなたの事業に最適な戦略をご提案いたします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                無料ヒアリングを申し込む
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