import React from 'react';
import Layout from '@/components/layout/Layout';

export default function Features() {
  return (
    <Layout>
      <main className="min-h-screen bg-white">
        {/* パンくずリスト */}
        <nav className="bg-white border-b border-gray-200 pt-5">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-primary">
                  ホーム
                </a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-black font-medium">
                特徴
              </li>
            </ol>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 pt-2 pb-6">
          <header className="mb-16">
            <h1 className="text-4xl font-bold text-black mb-8 tracking-wide">
              GYAKUTENの特徴
            </h1>
            <div className="text-lg leading-relaxed text-gray-800 space-y-4">
              <h2 className="text-2xl font-bold text-black mb-6">
                AI検索時代における企業の競争優位性構築支援
              </h2>
              <p className="leading-loose">
                GYAKUTENは、AI検索の普及により変化するデジタルマーケティング環境において、中小企業が持続的な成長を実現するための専門的なソリューションを提供します。従来手法の限界を打破し、新時代に対応した戦略的アプローチで企業価値の向上をサポートいたします。
              </p>
            </div>
          </header>

          {/* ページマップ */}
          <nav className="mb-16 p-6 bg-white border border-gray-200">
            <h3 className="text-lg font-semibold text-black mb-4">目次</h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li><a href="#feature01" className="hover:text-primary hover:underline">01. AI検索時代に特化した唯一無二の技術力</a></li>
              <li><a href="#feature02" className="hover:text-primary hover:underline">02. 中小企業の経営課題に特化した実用的ソリューション</a></li>
              <li><a href="#feature03" className="hover:text-primary hover:underline">03. 診断から実装まで一貫したトータルサポート</a></li>
              <li><a href="#feature04" className="hover:text-primary hover:underline">04. 高い顧客満足度と継続率97%の実績</a></li>
              <li><a href="#feature05" className="hover:text-primary hover:underline">05. 投資対効果を重視した柔軟な料金体系</a></li>
              <li><a href="#feature06" className="hover:text-primary hover:underline">06. 手厚いアフターサポートと保守体制</a></li>
              <li><a href="#digital-transformation" className="hover:text-primary hover:underline">戦略的デジタル化の第一歩として</a></li>
            </ol>
          </nav>

          <hr className="border-gray-300 my-16" />

          <section id="feature01" className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-8">
              01. AI検索時代に特化した唯一無二の技術力
            </h2>
            <h3 className="text-xl font-semibold text-black mb-6">
              LLMO（大規模言語モデル最適化）の専門知識
            </h3>
            <p className="text-gray-800 leading-loose mb-8">
              GoogleやChatGPTなどのAI検索が当たり前になった今、従来のSEO対策だけでは不十分です。GYAKUTENは、AI検索エンジンに「見つけられやすく」「引用されやすい」ウェブサイトや文章作りの専門技術を持っています。
            </p>
            <div className="border-l-2 border-gray-300 pl-6">
              <h4 className="text-lg font-medium text-black mb-4">具体的な対応項目</h4>
              <ul className="space-y-2 text-gray-800">
                <li>- AI検索で正しく抽出される構造設計</li>
                <li>- 大規模言語モデルが理解しやすい文章表現</li>
                <li>- 構造化データやメタタグの最適化</li>
                <li>- AI時代に対応したコンテンツ戦略</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-300 my-16" />

          <section id="feature02" className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-8">
              02. 中小企業の経営課題に特化した実用的ソリューション
            </h2>
            <h3 className="text-xl font-semibold text-black mb-6">
              限られたリソースで最大効果を実現
            </h3>
            <p className="text-gray-800 leading-loose mb-8">
              中小企業特有の「限られた予算と人員」「スピード重視の意思決定」「現場主義の経営スタイル」を深く理解し、それに最適化されたサービス設計を行っています。大企業向けの複雑なシステムではなく、即座に成果につながる実用的なアプローチを提供します。
            </p>
            <div className="border-l-2 border-gray-300 pl-6">
              <h4 className="text-lg font-medium text-black mb-4">中小企業最適化の特徴</h4>
              <ul className="space-y-2 text-gray-800">
                <li>- 複雑な専門知識を必要としないシンプルな運用設計</li>
                <li>- 段階的投資による財務リスクの最小化</li>
                <li>- 短期間での効果実感を重視した優先順位付け</li>
                <li>- 既存業務フローに配慮した導入プロセス</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-300 my-16" />

          <section id="feature03" className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-8">
              03. 診断から実装まで一貫したトータルサポート
            </h2>
            <h3 className="text-xl font-semibold text-black mb-6">
              まずは現状把握から始める安心設計
            </h3>
            <p className="text-gray-800 leading-loose mb-8">
              GYAKUTENの特徴は、いきなり高額なサービスを提案するのではなく、「GYAKUTEN LLMO診断」から始めることです。現状を正確に把握した上で、本当に必要な施策だけをご提案します。
            </p>
            <div className="border-l-2 border-gray-300 pl-6">
              <h4 className="text-lg font-medium text-black mb-4">一貫したサポート体制</h4>
              <ol className="space-y-2 text-gray-800">
                <li>1. <strong>無料診断</strong>で現状を把握</li>
                <li>2. <strong>詳細診断</strong>で具体的な課題を明確化</li>
                <li>3. <strong>改善提案</strong>で優先順位付きの対策をご提示</li>
                <li>4. <strong>実装支援</strong>でWebサイト制作・ライティング・システム開発</li>
                <li>5. <strong>継続コンサル</strong>で成果の最大化</li>
              </ol>
            </div>
          </section>

          <hr className="border-gray-300 my-16" />

          <section id="feature04" className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-8">
              04. 高い顧客満足度と継続率97%の実績
            </h2>
            <h3 className="text-xl font-semibold text-black mb-6">
              測定可能な成果創出にこだわる実践的アプローチ
            </h3>
            <p className="text-gray-800 leading-loose mb-8">
              GYAKUTENでは、単なる制作・改善の提供ではなく、お客様のビジネス成果の向上を最重要視しています。97%という高い顧客継続率は、実際の業績向上を実感いただいている証拠です。
            </p>
            <div className="border-l-2 border-gray-300 pl-6">
              <h4 className="text-lg font-medium text-black mb-4">成果重視の取り組み</h4>
              <ul className="space-y-2 text-gray-800">
                <li>- 現場の実情を踏まえた実装可能な改善提案</li>
                <li>- ROIを明確にした投資対効果の可視化</li>
                <li>- 定期的な効果測定と改善サイクルの構築</li>
                <li>- 目標未達成時の保証制度（一部サービス）による安心感</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-300 my-16" />

          <section id="feature05" className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-8">
              05. 投資対効果を重視した柔軟な料金体系
            </h2>
            <h3 className="text-xl font-semibold text-black mb-6">
              段階的投資によるリスク管理と効果最大化
            </h3>
            <p className="text-gray-800 leading-loose mb-8">
              企業の成長段階や予算に応じて最適な投資ができるよう、スケーラブルな料金設定を採用しています。小規模な検証から本格導入まで、各段階で明確なROIを確認しながら進められる設計です。
            </p>
            <div className="border-l-2 border-gray-300 pl-6">
              <h4 className="text-lg font-medium text-black mb-4">合理的な投資プロセス</h4>
              <ul className="space-y-2 text-gray-800">
                <li>- <strong>現状分析（無料〜3.5万円）</strong>：投資判断のための正確な現状把握</li>
                <li>- <strong>効果検証（8,000円〜）</strong>：低リスクでの改善効果テスト</li>
                <li>- <strong>本格導入（10万円〜）</strong>：検証結果を基にした戦略的投資</li>
                <li>- <strong>継続改善（月額制）</strong>：持続的な成長とROI向上</li>
                <li>- <strong>カスタマイズ対応</strong>：企業固有の課題に応じた個別設計</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-300 my-16" />

          <section id="feature06" className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-8">
              06. 手厚いアフターサポートと保守体制
            </h2>
            <h3 className="text-xl font-semibold text-black mb-6">
              「作って終わり」にしない継続的なパートナーシップ
            </h3>
            <p className="text-gray-800 leading-loose mb-8">
              ウェブサイト制作では7ヶ月間のサポート・保守を標準提供。システム開発では運用・改善・追加開発まで自社で一括対応します。長期的なパートナーとして、お客様の成長を支え続けます。
            </p>
            <div className="border-l-2 border-gray-300 pl-6">
              <h4 className="text-lg font-medium text-black mb-4">充実のサポート内容</h4>
              <ul className="space-y-2 text-gray-800">
                <li>- 納品後の運用支援</li>
                <li>- 定期的な効果測定と改善提案</li>
                <li>- 技術的なトラブル対応</li>
                <li>- 追加開発や機能拡張への対応</li>
                <li>- オンライン・オフライン両方での相談体制</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-300 my-16" />

          <section id="digital-transformation" className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-8">
              戦略的デジタル化の第一歩として
            </h2>
            <p className="text-lg font-medium text-black mb-6">
              AI検索時代における自社の競争力を正確に把握しませんか？
            </p>
            <p className="text-gray-800 leading-loose mb-8">
              デジタルマーケティングの投資判断には、現状の正確な分析が不可欠です。GYAKUTENでは、AI・LLMO観点での客観的な現状診断を通じて、投資すべき領域と優先順位を明確にいたします。
            </p>
            <div className="border-l-2 border-gray-300 pl-6">
              <h4 className="text-lg font-medium text-black mb-4">戦略的現状分析サービス</h4>
              <ul className="space-y-2 text-gray-800">
                <li>- データに基づく客観的な競合優位性分析</li>
                <li>- AI検索時代に対応した技術的課題の明確化</li>
                <li>- 投資対効果を考慮した改善優先順位の提示</li>
                <li>- 段階的実装による効果検証プロセスの設計</li>
                <li>- 営業活動は行わず、純粋な分析結果のみご提供</li>
              </ul>
            </div>
            <p className="text-gray-800 leading-loose mt-8">
              現状把握から始まる戦略的アプローチで、確実な成果創出を目指します。
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
}