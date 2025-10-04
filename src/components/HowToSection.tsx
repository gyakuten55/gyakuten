'use client';

import Link from 'next/link';

export default function HowToSection() {
  const howToSteps = [
    {
      title: 'LLMO診断の受け方・手順',
      steps: [
        '公式サイトから無料診断フォームにアクセス',
        'WebサイトのURLと企業情報を入力',
        '2-3営業日で診断レポートを受け取り',
        '改善点を確認し、必要なサービスを検討'
      ],
      link: '/services/llmo-diagnosis'
    },
    {
      title: 'AI検索対策の始め方',
      steps: [
        'まず無料LLMO診断で現状を把握',
        '定義文（〜とは）を10個以上追加',
        'How-toコンテンツを6個以上作成',
        '構造化データ（Schema.org）を実装',
        '継続的に効果測定し改善'
      ],
      link: '/about-llmo'
    },
    {
      title: '補助金申請の方法',
      steps: [
        'IT導入補助金の公式サイトで対象を確認',
        'GYAKUTENに申請サポートを依頼',
        '必要書類の準備（見積書、事業計画等）',
        'オンラインで申請書類を提出',
        '採択後、サービス導入を開始'
      ],
      link: '/contact'
    },
    {
      title: 'Webサイト改善の手順',
      steps: [
        '無料診断で改善点を明確化',
        '優先順位の高い項目から着手',
        '定義文・How-to・質問形式を追加',
        'ページ読み込み速度を最適化',
        '1-3ヶ月ごとに効果を測定'
      ],
      link: '/services/web-llmo'
    },
    {
      title: 'DXの進め方',
      steps: [
        '現状の業務プロセスを整理・可視化',
        '課題と目標を明確に設定',
        '段階的に小規模なツールから導入',
        '社内での運用・定着を推進',
        '継続的に改善と拡張を実施'
      ],
      link: '/services/dx'
    },
    {
      title: '無料相談の申し込み方法',
      steps: [
        'お問い合わせフォームにアクセス',
        '相談内容と希望日時を入力',
        '1営業日以内に担当者から連絡',
        'オンライン会議で詳細をヒアリング',
        '最適なプランをご提案'
      ],
      link: '/contact'
    },
  ];

  return (
    <section className="py-20 bg-gray-50" aria-labelledby="howto-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="howto-heading" className="text-3xl md:text-4xl font-black text-primary mb-4">
            サービス利用の手順
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            GYAKUTENのサービスを利用するための具体的な手順をご紹介します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {howToSteps.map((howTo, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {howTo.title}
              </h3>
              <ol className="space-y-3 mb-6">
                {howTo.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {stepIndex + 1}
                    </span>
                    <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
              <Link
                href={howTo.link}
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-colors"
              >
                詳しく見る
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
