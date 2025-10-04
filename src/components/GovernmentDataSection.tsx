'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ChevronDown } from 'lucide-react';

export default function GovernmentDataSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const governmentData = [
    {
      number: '01',
      title: '政府が生成AI利活用を積極推進',
      source: 'デジタル庁「生成AIガイドライン」',
      url: 'https://www.digital.go.jp/news/3579c42d-b11c-4756-b66e-3d3e35175623',
      description: 'デジタル庁は2025年5月27日、「行政の進化と革新のための生成AIの調達・利活用に係るガイドライン」を策定し、政府全体で生成AIの活用を推進しています。民間企業も、この生成AI時代の波に乗り遅れないための対策が必要です。',
      solution: 'LLMO最適化でAI検索時代に対応',
      solutionLink: '/services/llmo-consulting',
      stat: '2025年',
      statLabel: 'AI活用元年',
    },
    {
      number: '02',
      title: 'ネット利用者の70%以上が情報検索を目的',
      source: '総務省「令和5年通信利用動向調査」',
      url: 'https://www.soumu.go.jp/johotsusintokei/whitepaper/ja/r05/html/nd24b210.html',
      description: '総務省の調査によると、ネット利用者の7割以上が情報検索を目的としています。検索がAI主導になる今、従来のSEOだけでなく、LLMO（大規模言語モデル最適化）が不可欠です。',
      solution: 'AI検索エンジンに最適化されたコンテンツ制作',
      solutionLink: '/services/write-llmo',
      stat: '70%',
      statLabel: '情報検索目的',
    },
    {
      number: '03',
      title: '中小企業の多くがDX未実施',
      source: '経済産業省「中小企業白書2024」',
      url: 'https://www.chusho.meti.go.jp/pamflet/hakusyo/',
      description: '経済産業省の調査によると、2024年時点で30.8%の企業がDXに未着手、特に小規模企業（従業員100人以下）では60%以上がDX未実施です。中小企業の多くがDXに取り組む効果として「業務効率化による負担軽減」を期待していますが、実施には至っていない現状があります。',
      solution: '無料LLMO診断から始めて、自社に必要な施策を明確化',
      solutionLink: '/diagnosis',
      stat: '60%+',
      statLabel: '小規模企業未実施',
    },
    {
      number: '04',
      title: 'IT人材不足が最大の課題',
      source: '中小企業基盤整備機構「DX推進に関する調査2024」',
      url: 'https://www.smrj.go.jp/research_case/questionnaire/fbrion0000002pjw-att/202412_DX_report.pdf',
      description: '2024年12月発行の調査報告書によると、中小企業のDX推進における最大の課題は「IT人材不足」(25.4%)であり、「DX推進人材不足」も24.8%と高い水準です。また、期待する支援策として補助金・助成金が41.6%と最多となっています。',
      solution: '外部パートナーとしてIT人材不足を解決、補助金対応も可能',
      solutionLink: '/services/dx',
      stat: '25.4%',
      statLabel: 'IT人材不足',
    },
    {
      number: '05',
      title: '外部連携がDX成功の鍵',
      source: 'IPA「DX白書2025」',
      url: 'https://www.ipa.go.jp/digital/chousa/dx-trend/index.html',
      description: 'IPAの調査では、システム関係の専任者がいない中小企業でも、外部のシステム開発会社との連携により業務効率化を実現した事例が報告されています。',
      solution: '7ヶ月の伴走サポートで確実にDXを推進',
      solutionLink: '/services/llmo-consulting',
      stat: '成功',
      statLabel: '外部連携',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white" aria-labelledby="government-data-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm font-medium text-gray-700 mb-3 md:mb-4">
            GOVERNMENT DATA
          </div>
          <h2 id="government-data-heading" className="text-2xl md:text-4xl lg:text-5xl font-light text-black mb-4 md:mb-6 tracking-tight">
            官公庁データが証明する、<br className="md:hidden" />中小企業のDX・LLMO対策
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto font-light">
            政府機関の公式統計データが示す現実と、GYAKUTENによる解決策
          </p>
        </header>

        {/* LLMO有効性を示す統計チャート */}
        <div className="mb-8 md:mb-12 max-w-5xl mx-auto">
          <div className="border border-gray-200 bg-white p-4 md:p-6 rounded">
            {/* チャートタイトル */}
            <div className="mb-3 md:mb-4">
              <h3 className="text-sm md:text-base font-light text-gray-800 mb-1">生成AI利用率の推移（個人・法人）</h3>
              <p className="text-[10px] md:text-xs text-gray-500 font-light">総務省統計に基づく生成AI普及トレンド</p>
            </div>

            {/* 凡例 */}
            <div className="flex gap-3 md:gap-4 mb-3 text-[10px] md:text-xs">
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-3 md:w-4 h-0.5 bg-primary"></div>
                <span className="text-gray-600 font-light">個人利用率</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-3 md:w-4 h-0.5 bg-blue-600"></div>
                <span className="text-gray-600 font-light">企業業務利用率</span>
              </div>
            </div>

            {/* 主要指標 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-100">
              <div>
                <div className="text-[10px] md:text-xs text-gray-500 font-light mb-1">個人利用率（2024年）</div>
                <div className="flex items-baseline gap-1.5 md:gap-2">
                  <div className="text-xl md:text-2xl font-light text-primary">26.7%</div>
                  <div className="text-[10px] md:text-xs text-gray-400 font-light">前年比+193%</div>
                </div>
              </div>
              <div>
                <div className="text-[10px] md:text-xs text-gray-500 font-light mb-1">法人利用率（2024年）</div>
                <div className="flex items-baseline gap-1.5 md:gap-2">
                  <div className="text-xl md:text-2xl font-light text-blue-600">55.2%</div>
                  <div className="text-[10px] md:text-xs text-gray-400 font-light">業務利用</div>
                </div>
              </div>
              <div>
                <div className="text-[10px] md:text-xs text-gray-500 font-light mb-1">成長トレンド</div>
                <div className="flex items-baseline gap-1.5 md:gap-2">
                  <div className="text-xl md:text-2xl font-light text-gray-700">↗</div>
                  <div className="text-[10px] md:text-xs text-gray-400 font-light">急速に拡大中</div>
                </div>
              </div>
            </div>

            {/* 軸の説明 */}
            <div className="mb-2 text-[10px] md:text-xs text-gray-500 font-light">
              <span>縦軸：生成AI利用率 (%) ／ 横軸：年度（2022-2025年、総務省統計データ）</span>
            </div>

            {/* チャートエリア */}
            <div className="relative pl-10 md:pl-12">
              <div className="relative h-32 border-t border-l border-gray-200">
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  {/* グリッドライン */}
                  <line x1="0" y1="25" x2="300" y2="25" stroke="#f3f4f6" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="#f3f4f6" strokeWidth="0.5" />
                  <line x1="0" y1="75" x2="300" y2="75" stroke="#f3f4f6" strokeWidth="0.5" />

                  {/* エリアチャート - 個人利用率: 2022年0% → 2023年9.1% → 2024年26.7% → 2025年40%推定 */}
                  <path
                    d="M 0,100 L 100,91 L 200,73 L 300,60 L 300,100 L 0,100 Z"
                    fill="#8f2c34"
                    fillOpacity="0.1"
                  />

                  {/* エリアチャート - 法人利用率: 2022年0% → 2023年42.7% → 2024年55.2% → 2025年65%推定 */}
                  <path
                    d="M 0,100 L 100,57 L 200,45 L 300,35 L 300,100 L 0,100 Z"
                    fill="#2563eb"
                    fillOpacity="0.1"
                  />

                  {/* 折れ線 - 個人: 2022年0% → 2023年9.1% → 2024年26.7% → 2025年40%推定 */}
                  <path
                    d="M 0,100 L 100,91 L 200,73 L 300,60"
                    fill="none"
                    stroke="#8f2c34"
                    strokeWidth="2"
                  />

                  {/* 折れ線 - 法人: 2022年0% → 2023年42.7% → 2024年55.2% → 2025年65%推定 */}
                  <path
                    d="M 0,100 L 100,57 L 200,45 L 300,35"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                </svg>

                {/* Y軸目盛り */}
                <div className="absolute -left-8 md:-left-10 top-0 text-[10px] md:text-xs text-gray-400 font-light">100</div>
                <div className="absolute -left-7 md:-left-8 top-1/4 text-[10px] md:text-xs text-gray-400 font-light">75</div>
                <div className="absolute -left-7 md:-left-8 top-1/2 text-[10px] md:text-xs text-gray-400 font-light">50</div>
                <div className="absolute -left-7 md:-left-8 top-3/4 text-[10px] md:text-xs text-gray-400 font-light">25</div>
                <div className="absolute -left-5 md:-left-6 bottom-0 text-[10px] md:text-xs text-gray-400 font-light">0</div>
              </div>

              {/* X軸ラベル */}
              <div className="flex justify-between mt-2 text-[10px] md:text-xs text-gray-400 font-light">
                <span>2022</span>
                <span>2023</span>
                <span>2024</span>
                <span className="text-[9px] md:text-xs">2025 (推定)</span>
              </div>
            </div>
          </div>
        </div>

        {/* データリスト - アコーディオン形式 */}
        <div className="max-w-5xl mx-auto" role="list">
          {governmentData.map((data, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <article
                key={index}
                className="group bg-white border-t border-gray-200"
                role="listitem"
                itemScope
                itemType="https://schema.org/Article"
              >
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full text-left py-4 px-4 md:px-6 hover:bg-gray-50 transition-colors duration-300 flex items-center justify-between gap-3 md:gap-4"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3 md:gap-4 flex-1">
                    {/* ナンバー */}
                    <div className="flex-shrink-0 w-8 md:w-12">
                      <div className="text-xs md:text-sm font-medium text-gray-400">{data.number}</div>
                    </div>

                    {/* タイトル & 統計 */}
                    <div className="flex-1">
                      <h3 className="text-sm md:text-base font-medium text-black mb-1" itemProp="headline">
                        {data.title}
                      </h3>
                      <div className="flex items-baseline gap-1.5 text-xs md:text-sm text-gray-500">
                        <span className="text-lg md:text-xl font-light text-primary">{data.stat}</span>
                        <span>{data.statLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* 展開アイコン */}
                  <ChevronDown
                    className={`w-4 h-4 md:w-5 md:h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* 展開コンテンツ */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 md:px-6 pb-4 md:pb-6 pl-12 md:pl-16">
                    {/* 引用元 */}
                    <blockquote cite={data.url} className="mb-3" itemProp="citation">
                      <footer className="text-xs md:text-sm text-gray-500 mb-2">
                        出典:{' '}
                        <cite>
                          <a
                            href={data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-primary transition-colors inline-flex items-center gap-1"
                            itemProp="url"
                          >
                            {data.source}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </cite>
                      </footer>
                    </blockquote>

                    <p className="text-xs md:text-sm text-gray-600 mb-4 leading-relaxed" itemProp="description">
                      {data.description}
                    </p>

                    {/* GYAKUTENの解決策 */}
                    <div className="border-l-2 border-primary pl-3 md:pl-4 py-1.5 md:py-2">
                      <div className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 mb-1">
                        Solution
                      </div>
                      <div className="text-xs md:text-sm text-gray-700 mb-1.5 md:mb-2">{data.solution}</div>
                      <Link
                        href={data.solutionLink}
                        className="text-xs md:text-sm text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center gap-1"
                      >
                        詳細を見る
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
