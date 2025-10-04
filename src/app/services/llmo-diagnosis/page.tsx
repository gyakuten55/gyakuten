import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import StepForm from '@/components/StepForm';
import DiagnosisButton from '@/components/DiagnosisButton';
import FAQSection from '@/components/FAQSection';
import StructuredData from '@/components/seo/StructuredData';
import InfiniteCarousel from '@/components/InfiniteCarousel';

// SEO メタデータ
export const metadata: Metadata = {
  title: 'GYAKUTEN LLMO診断 | AI検索時代のWebサイト最適化診断',
  description: 'AI検索エンジンに対応したWebサイト診断サービス。LLMO最適化で貴社サイトをAIフレンドリーに。無料診断から伴走改善まで。',
  keywords: 'LLMO, AI検索最適化, SEO, Web診断, 中小企業, デジタル戦略',
  authors: [{ name: '合同会社GYAKUTEN' }],
  openGraph: {
    title: 'GYAKUTEN LLMO診断',
    description: 'AI検索時代に対応したWebサイト最適化診断サービス',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://gyaku-ten.jp/services/llmo-diagnosis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GYAKUTEN LLMO診断',
    description: 'AI検索時代に対応したWebサイト最適化診断サービス',
  },
  alternates: {
    canonical: 'https://gyaku-ten.jp/services/llmo-diagnosis',
  },
  other: {
    'article:published_time': '2024-03-03T00:00:00Z',
    'article:modified_time': new Date().toISOString(),
    'article:author': '合同会社GYAKUTEN',
  },
};

export default function LLMODiagnosisPage() {
  return (
    <Layout>
      <StructuredData 
        type="faq" 
        data={{
          faq: [
            {
              question: 'LLMO診断とは何ですか？',
              answer: 'LLMO（大規模言語モデル最適化）診断は、AI検索エンジンに対するWebサイトの最適化状況を評価するサービスです。ChatGPTやPerplexity AI、Google Geminiなどの最新AI検索エンジンで上位表示されるための改善点を明確にします。'
            },
            {
              question: '無料診断と有料診断の違いは何ですか？',
              answer: '無料診断では基本的な問題点と改善の方向性をお伝えします。有料診断（35,000円）では、詳細な改善提案、実装方法、優先順位まで含めた包括的なレポートをご提供します。'
            },
            {
              question: '診断にはどのくらいの時間がかかりますか？',
              answer: '無料診断は1-2営業日、詳細診断は3-5営業日でご報告いたします。お急ぎの場合はご相談ください。'
            },
            {
              question: 'AI検索最適化は本当に効果がありますか？',
              answer: 'AI検索エンジンの利用者は急速に増加しており、早期対応することで競合優位を築けます。特にB2Bビジネスでは、AI検索での露出が新規顧客獲得に直結します。'
            },
            {
              question: '診断後のサポートはありますか？',
              answer: 'はい。診断後の改善実装、効果測定、継続的な最適化まで一貫してサポートいたします。月額15万円からのLLMOコンサルティングプランもご用意しています。'
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
            { name: 'LLMO診断', item: 'https://gyaku-ten.jp/services/llmo-diagnosis' },
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
                LLMO診断
              </li>
            </ol>
          </div>
        </nav>

        <section className="py-8 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-black mb-4 leading-tight">
                  GYAKUTEN LLMO診断
                </h1>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  AI検索時代に対応した<span className="text-primary font-bold">Webサイト最適化診断</span>
                </p>
                <p className="text-base text-gray-600 mb-6">
                  貴社サイトがAIに「選ばれる」状態かを多角的にチェック。Perplexity AIやChatGPT Search、Google Geminiなどの最新AI検索エンジンで上位表示されるための最適化をご提案します。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">無料診断でまずは現状把握</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">専門用語なしの分かりやすいレポート</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">改善から効果測定まで一体サポート</span>
                  </div>
                </div>
              </div>

              <StepForm serviceId="llmo-diagnosis" serviceName="GYAKUTEN LLMO診断" />
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
                  title: "検索順位は悪くないのに問い合わせが来ない",
                  description: "従来のSEOだけでは、AI検索エンジンに適切に認識されない可能性があります。"
                },
                {
                  title: "AI時代のWeb対策が分からない",
                  description: "ChatGPTやBardなどのAI検索に対応した最適化手法が明確でない。"
                },
                {
                  title: "Web制作会社に高額な見積もりを出された",
                  description: "本当に必要な改善箇所が分からず、無駄な投資をしてしまう危険性。"
                },
                {
                  title: "自社サイトの現状が分からない",
                  description: "何から手をつけて良いか分からず、改善の優先順位が見えない。"
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
                LLMO診断を使うと
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "改善余地が数字で見える",
                  description: "どこを直せば流入・CVが伸びるかが可視化され、効果的な施策を特定できます。"
                },
                {
                  title: "コスト効率が高い",
                  description: "低価格でも専門家レポートが得られ、施策優先度が分かるため無駄な投資を防げます。"
                },
                {
                  title: "AI対策が明確になる",
                  description: "LLM最適化の具体的な改善指示で、AI検索時代に対応したサイトに。"
                },
                {
                  title: "売上インパクトを試算",
                  description: "改善による売上向上の見込みを数値化し、投資対効果を明確に把握。"
                },
                {
                  title: "実行しやすい指示",
                  description: "専門用語を排し、現場で理解しやすいアクションプランを提供。"
                },
                {
                  title: "ワンストップ支援",
                  description: "診断→改善指導→効果測定まで一体的にサポート。"
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
                LLMO診断の特徴
              </h2>
            </div>

            <div className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    業界トップクラスの低価格
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    無料／8,000円／35,000円の三段階で試しやすい料金設定。他社では数十万円するような専門診断を、手の届く価格で提供します。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">無料診断でまずは現状把握</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">段階的にサービスを選択可能</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">予算に応じた最適なプラン</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">従来の診断サービス</div>
                      <div className="text-2xl font-bold text-gray-800">10万円〜</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">LLMO診断</div>
                      <div className="text-3xl font-bold text-primary">0円〜35,000円</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <h3 className="text-2xl font-bold text-black mb-6">
                    現場主義レポート
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    専門用語を排し、貴社で実行しやすいアクションを提案。ITが苦手な方でも分かる日本語で、具体的な改善指示をお届けします。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">専門用語なしの分かりやすい表現</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">優先順位付きのアクションリスト</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">実装手順も詳しく解説</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-6 lg:order-1">
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <div className="font-semibold text-sm">優先度：高</div>
                      <div className="text-gray-700">トップページのh1タグを修正</div>
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-4 py-2">
                      <div className="font-semibold text-sm">優先度：中</div>
                      <div className="text-gray-700">FAQページの構造化データ追加</div>
                    </div>
                    <div className="border-l-4 border-gray-400 pl-4 py-2">
                      <div className="font-semibold text-sm">優先度：低</div>
                      <div className="text-gray-700">画像のalt属性最適化</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    診断から効果測定まで継続サポート
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    診断だけでなく、改善指導から効果測定まで一体的にサポート。実装は貴社にて行っていただくか、別途LLMOウェブ制作・LLMOライティングサービスとして承ります。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">診断→改善指導→測定の一貫サポート</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">実装手順の詳細指導</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">実装代行も別途対応可能</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">定期的な効果測定・追加提案</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8">
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">1</div>
                      <div className="text-sm font-medium">診断</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">2</div>
                      <div className="text-sm font-medium">改善</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">3</div>
                      <div className="text-sm font-medium">測定</div>
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
                料金プラン
              </h2>
              <p className="text-lg text-gray-700">
                ニーズに合わせて選べる3つのプラン
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-black mb-2">無料簡易診断</h3>
                  <div className="text-3xl font-black text-black mb-2">¥0</div>
                  <div className="text-sm text-gray-600">1人1回/1媒体</div>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">LLM視点の概要チェック</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">基本評価</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">概要レポート</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <div className="text-center">
                    <DiagnosisButton className="w-full bg-gray-100 text-black py-3 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors inline-block">
                      無料診断を行う
                    </DiagnosisButton>
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    まず現在地を知りたい方におすすめ
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border-2 border-primary p-6 relative flex flex-col">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    人気
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-black mb-2">シンプル診断</h3>
                  <div className="text-3xl font-black text-primary mb-2">¥8,000</div>
                  <div className="text-sm text-gray-600">税込価格</div>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">構造最適化評価</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">コンテンツ最適化度</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">課題箇条書き</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">詳細レポート</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <div className="text-center">
                    <Link
                      href="/contact"
                      className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors inline-block"
                    >
                      シンプル診断を行う
                    </Link>
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    社内で改善できる指針が欲しい方
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-black mb-2">伴走改善パッケージ</h3>
                  <div className="text-3xl font-black text-black mb-2">¥35,000</div>
                  <div className="text-sm text-gray-600">税込価格</div>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">シンプル診断の全内容</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">キーワード追加案</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">内部リンク新設指示</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">改善シート</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">担当者向け指導</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">実装後フォロー</span>
                  </li>
                  <li className="flex items-start text-xs text-gray-500 mt-2">
                    <span className="mr-2">※</span>
                    <span>実装代行は別途LLMOウェブ制作・ライティングサービスとして承ります</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <div className="text-center">
                    <Link
                      href="/contact"
                      className="w-full bg-gray-100 text-black py-3 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors inline-block"
                    >
                      伴走プランを行う
                    </Link>
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    詳細な指導とフォローが欲しい方
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FAQSection />

        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              AI検索時代に対応したサイトへ
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              まずは無料診断で現状を把握してみませんか？<br />
              わずか数分で申し込み完了。専門家が貴社サイトを分析します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <DiagnosisButton className="bg-white text-primary px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors">
                無料診断を行う
              </DiagnosisButton>
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