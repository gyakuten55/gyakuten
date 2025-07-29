import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';

export default function Company() {
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
                会社情報
              </li>
            </ol>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 pt-2 pb-6">
          <header className="mb-16">
            <h1 className="text-4xl font-bold text-black mb-8 tracking-wide">
              会社情報
            </h1>
          </header>

          {/* 会社概要 */}
          <section id="overview" className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-8">
              会社概要
            </h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-black w-32">
                      会社名
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      合同会社GYAKUTEN
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-black bg-gray-50">
                      所在地
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      東京都渋谷区神泉町10
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-black">
                      設立
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      2025年3月3日
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-black bg-gray-50">
                      代表者名
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      中山蒼 (Nakayama Aoi)
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-black">
                      従業員数
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      6人（業務委託含む）
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-black bg-gray-50">
                      事業内容
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <ul className="space-y-1">
                        <li>• LLMO（大規模言語モデル最適化）コンサルティング</li>
                        <li>• 戦略的Web制作・運用</li>
                        <li>• 業務システム開発</li>
                        <li>• DXコンサルティング</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-gray-300 my-16" />

          {/* ミッション */}
          <section id="mission" className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-8">
              Our Mission / 私たちの使命
            </h2>
            
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-primary mb-4">
                すべての逆境に、最高の逆転劇を。
              </h3>
              <p className="text-lg text-gray-600 italic">
                Turn every setback into the greatest comeback
              </p>
            </div>

            <div className="space-y-6 text-gray-800 leading-relaxed">
              <p className="text-lg">
                「もう無理だ」を「やってやる」に――。
              </p>
              
              <p className="leading-loose">
                GYAKUTENは <strong>LLMO最適化・戦略的Web制作・業務システム開発・DXコンサル</strong> まで幅広く仕掛け、停滞した数字を"バズ"に跳ね上げる。
              </p>
              
              <p className="leading-loose">
                テクノロジーと遊び心で壁をぶち破り、お客様や仲間と共に <strong>逆転のストーリー</strong> を連鎖させること。
              </p>
              
              <p className="text-lg font-medium text-black text-center mt-8">
                それが、私たちの使命です。
              </p>
            </div>
          </section>

          <hr className="border-gray-300 my-16" />

          {/* 代表紹介 */}
          <section id="representative" className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-8">
              代表紹介
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* 写真 */}
              <div className="flex-shrink-0">
                <Image
                  src="/nakayamaaoi.png"
                  alt="中山蒼 代表取締役"
                  width={200}
                  height={200}
                  className="rounded-lg shadow-md"
                />
              </div>
              
              {/* プロフィール */}
              <div className="flex-1 border-l-4 border-primary pl-8">
                <h3 className="text-xl font-semibold text-black mb-2">
                  中山 蒼 | Nakayama Aoi
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  合同会社GYAKUTEN 代表
                </p>
                
                <div className="space-y-4 text-gray-800 leading-relaxed">
                  <p className="text-lg font-medium text-primary">
                    すべての逆境に、最高の逆転劇を。
                  </p>
                  
                  <p>
                    合同会社GYAKUTEN 代表の <strong>中山 蒼</strong> です。
                  </p>
                  
                  <p className="leading-loose">
                    挫折から独学で技術と経営を学び、半年で月収100万円を実現した経験を基に、LLMO最適化・Web制作・業務システム開発・DX支援をワンストップで提供しています。
                  </p>
                  
                  <p className="leading-loose">
                    私たちは <strong>「最小投資で最大成果」</strong> を数字で証明し、現場に即した実装と継続改善で貴社の競争優位を共に築きます。
                  </p>
                  
                  <p className="leading-loose">
                    逆境を成長のチャンスに変えたい時は、ぜひご相談ください。
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}