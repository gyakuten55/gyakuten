import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import StepForm from '@/components/StepForm';
import DXFAQSection from '@/components/DXFAQSection';

// SEO メタデータ
export const metadata: Metadata = {
  title: '格安システム開発30万円～ | 中小企業向け業務効率化・DX支援 | GYAKUTEN',
  description: '中小企業向け格安システム開発・業務効率化なら30万円から。補助金対応可能。Excel・紙運用から脱却し効率化を実現。東京都の実績豊富な開発会社GYAKUTENが低コストでオーダーメイドシステムを開発します。',
  keywords: '格安システム開発, システム開発安い, 中小企業システム開発, 業務効率化システム開発, 激安システム開発, 小規模システム開発, DX支援費用, システム開発外注, 補助金対応',
  openGraph: {
    title: '格安システム開発30万円～ | 中小企業向け業務効率化・DX支援',
    description: '中小企業向け格安システム開発・業務効率化なら30万円から。補助金対応可能。Excel・紙運用から脱却し効率化を実現。',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '格安システム開発30万円～ | 中小企業向け業務効率化・DX支援',
    description: '中小企業向け格安システム開発・業務効率化なら30万円から。補助金対応可能。Excel・紙運用から脱却し効率化を実現。',
  },
  alternates: {
    canonical: '/services/dx',
  },
};

export default function DXPage() {
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
                システム開発
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
                  格安システム開発・DX支援
                </h1>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  中小企業向け<span className="text-primary font-bold">格安システム開発30万円～</span>
                </p>
                <p className="text-base text-gray-600 mb-6">
                  大手パッケージは高額＆機能過多で現場になじまない。GYAKUTENは必要十分な機能だけを適正価格で開発し、Excel・紙運用からの脱却を支援します。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">初期開発30万円からの低コスト</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">現場主義の直感的UI/UX</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">段階開発で低リスク投資</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">補助金・助成金申請サポート対応</span>
                  </div>
                </div>
              </div>

              {/* 右側：相談フォーム */}
              <StepForm serviceId="dx" serviceName="GYAKUTEN システム開発" />
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
                  title: "Excel・紙運用から抜け出せない",
                  description: "大手パッケージは高額で機能過多。現場の実情に合わず、結局Excel・紙運用が温存されている。"
                },
                {
                  title: "業務が属人化・非効率化している",
                  description: "特定の人にしか分からない業務があり、効率化が進まない。引き継ぎも困難。"
                },
                {
                  title: "システム開発の見積もりが高すぎる",
                  description: "数百万〜数千万円の見積もりで、中小企業には手が出せない金額になってしまう。"
                },
                {
                  title: "ITが苦手なスタッフが使えない",
                  description: "複雑なシステムは現場で定着せず、結局使われなくなってしまう不安がある。"
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
                GYAKUTENシステム開発を使うと
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "現場密着で高い定着率",
                  description: "現場ヒアリングで「本当に使う機能」を厳選。余計な開発コストを削減し、ITが苦手なスタッフでも導入当日から運用可能。"
                },
                {
                  title: "業界最安水準の開発費",
                  description: "初期開発30万円〜の低コスト。大手パッケージの数分の一の価格で、自社専用システムを構築可能。"
                },
                {
                  title: "段階開発で低リスク投資",
                  description: "最小構成でリリース→効果を見ながら拡張。大規模投資のリスクを抑制し、無理のない範囲でシステム化を推進。"
                },
                {
                  title: "継続伴走で長期活用保証",
                  description: "納品後も改修・追加開発を自社一貫で対応。「作って終わり」を防ぎ、業務変化に合わせてシステムを進化。"
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

        {/* システム開発の特徴セクション */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-black mb-6">
                GYAKUTENシステム開発の特徴
              </h2>
            </div>

            <div className="space-y-16">
              {/* 特徴1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    現場主義設計で高い定着率
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    現場ヒアリングで「本当に使う機能」を厳選し、研修不要レベルのシンプル操作を実現。ITが苦手なスタッフでも導入当日から運用でき、システムの定着率を大幅に向上させます。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">現場ヒアリングで機能厳選</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">研修不要レベルのシンプル操作</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">導入当日から運用可能</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">大手パッケージ</div>
                      <div className="text-lg font-bold text-gray-800">機能過多で複雑</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">GYAKUTENシステム</div>
                      <div className="text-2xl font-bold text-primary">必要機能のみシンプル</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 特徴2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <h3 className="text-2xl font-bold text-black mb-6">
                    段階開発方式で低リスク投資
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    最小構成でリリース後、効果を見ながら段階的に拡張。大規模投資のリスクを抑制し、投資対効果を確認しながら無理のない範囲でシステム化を推進できます。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">最小構成から開始</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">効果確認後に段階拡張</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">大規模投資リスク回避</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8 lg:order-1">
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">1</div>
                      <div className="text-sm font-medium">最小構成</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">2</div>
                      <div className="text-sm font-medium">効果確認</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-2">3</div>
                      <div className="text-sm font-medium">段階拡張</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 特徴3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    継続伴走サポート体制
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    納品後も改修・追加開発を自社一貫で対応。月次メンテナンス、質問サポート、軽微な機能改善を含み、業務の変化に伴う追加要件も段階的に反映します。
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">自社一貫の改修・追加開発</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">月次メンテナンス・質問サポート</div>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-semibold text-black">業務変化に合わせたシステム進化</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">一般的なシステム開発</div>
                      <div className="text-lg font-bold text-gray-800">作って終わり</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">GYAKUTENシステム開発</div>
                      <div className="text-2xl font-bold text-primary">継続伴走サポート</div>
                    </div>
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
                料金モデル
              </h2>
              <p className="text-lg text-gray-700">
                業界最安水準の明確料金
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 初期開発 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-black mb-6 text-center">初期開発</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-black text-primary mb-2">¥300,000〜</div>
                  <div className="text-sm text-gray-600">完全オーダーメイドの最小構成</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">要件定義・システム設計</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">カスタム開発・実装</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">テスト・品質保証</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">導入支援・操作説明</span>
                  </li>
                </ul>
              </div>

              {/* 月額保守 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-black mb-6 text-center">月額保守</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-black text-primary mb-2">¥25,000〜</div>
                  <div className="text-sm text-gray-600">必要に応じて選択可能</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">バグ修正・軽微改修</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">質問・操作サポート</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">月次メンテナンス</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">データバックアップ</span>
                  </li>
                </ul>
                <div className="text-center">
                  <p className="text-xs text-gray-600">
                    保守が不要な場合は無理にお付けしません
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-bold text-black mb-3">お支払い方法</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center justify-center p-3 bg-white rounded border">
                    <span className="text-sm font-medium">💳 クレジットカード</span>
                  </div>
                  <div className="flex items-center justify-center p-3 bg-white rounded border">
                    <span className="text-sm font-medium">🏦 銀行振込</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-primary font-bold">分割払いも可能です</p>
                  <p className="text-xs text-gray-600 mt-1">お客様の状況に応じて柔軟に対応いたします</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-4">
                ※第三者ライセンスが必要な場合は別途費用が発生することがあります
              </p>
              <Link
                href="/contact"
                className="bg-primary text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors inline-block"
              >
                無料相談・見積もりを申し込む
              </Link>
            </div>
          </div>
        </section>

        {/* 補助金・助成金セクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                補助金・助成金で さらに負担軽減
              </h2>
              <p className="text-lg text-gray-700">
                システム開発は各種補助金・助成金の対象です
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* IT導入補助金 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4">IT導入補助金</h3>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary">最大450万円</div>
                  <div className="text-sm text-gray-600">ITツール導入費用の一部補助</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• ソフトウェア導入費</li>
                  <li>• クラウド利用料（最大2年分）</li>
                  <li>• 導入関連費用</li>
                </ul>
              </div>

              {/* 小規模事業者持続化補助金 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4">小規模事業者持続化補助金</h3>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary">最大200万円</div>
                  <div className="text-sm text-gray-600">販路開拓・業務効率化支援</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• システム開発費</li>
                  <li>• ウェブサイト制作費</li>
                  <li>• 業務効率化ツール導入費</li>
                </ul>
              </div>

              {/* 事業再構築補助金 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4">事業再構築補助金</h3>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary">最大1.5億円</div>
                  <div className="text-sm text-gray-600">新分野展開・業態転換支援</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• デジタル化投資</li>
                  <li>• システム刷新費用</li>
                  <li>• 新事業システム開発費</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-gray-50 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-black mb-2">補助金申請もお任せください</h3>
                <p className="text-gray-700">複雑な申請手続きもGYAKUTENがサポートします</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">1</div>
                  <h4 className="font-semibold text-black mb-2">申請書類作成</h4>
                  <p className="text-sm text-gray-600">事業計画書・申請書類の作成支援</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">2</div>
                  <h4 className="font-semibold text-black mb-2">申請手続き</h4>
                  <p className="text-sm text-gray-600">複雑な申請手続きを代行・支援</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">3</div>
                  <h4 className="font-semibold text-black mb-2">実績報告</h4>
                  <p className="text-sm text-gray-600">事業完了後の実績報告もサポート</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 進行フローセクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                プロジェクト進行フロー
              </h2>
              <p className="text-lg text-gray-700">
                すべて自社内で完結するワンストップ開発
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "要件定義・課題整理",
                  description: "現場ヒアリングで真の課題を特定し、必要機能を厳選します。"
                },
                {
                  step: "2",
                  title: "システム設計・開発",
                  description: "直感的なUI/UXを重視した設計で、使いやすいシステムを開発。"
                },
                {
                  step: "3",
                  title: "テスト・品質保証",
                  description: "徹底的なテストで品質を担保し、安定稼働を実現。"
                },
                {
                  step: "4",
                  title: "導入支援・操作説明",
                  description: "スムーズな導入をサポートし、現場での定着を支援。"
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
        <DXFAQSection />

        {/* CTA セクション */}
        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Excel・紙運用からの脱却を
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              まずは無料相談で現在の業務課題をお聞かせください。<br />
              最適なシステム化プランをご提案いたします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                無料相談・見積もりを申し込む
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