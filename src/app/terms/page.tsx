import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

// SEO メタデータ
export const metadata: Metadata = {
  title: '利用規約 | GYAKUTEN - AI検索時代のビジネス戦略',
  description: '合同会社GYAKUTENの利用規約ページです。サービス利用時の規約・条件について詳しく説明しています。',
  robots: 'noindex, nofollow',
};

export default function Terms() {
  return (
    <Layout>
      <main className="min-h-screen bg-white">
        {/* パンくずリスト */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-primary">
                  ホーム
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-black font-medium">
                利用規約
              </li>
            </ol>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              利用規約
            </h1>
            <p className="text-gray-600">
              最終更新日：2024年8月1日
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            
            {/* 第1条 適用 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第1条（適用）</h2>
              <p className="text-gray-800 leading-relaxed">
                本利用規約（以下「本規約」）は、合同会社GYAKUTEN（以下「当社」）が提供するWebサイト、各種サービス（LLMO診断、Web制作、DXコンサルティング、逆転ブートキャンプ等）の利用に関する条件を定めるものです。ユーザーは、本規約に同意の上、当社のサービスをご利用ください。
              </p>
            </section>

            {/* 第2条 定義 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第2条（定義）</h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                本規約において、以下の用語は次の通り定義します：
              </p>
              <ul className="space-y-2 text-gray-800">
                <li>1. 「サービス」とは、当社が提供するWebサイト、LLMO診断、Web制作、DXコンサルティング、逆転ブートキャンプ、メールマガジン等の全サービスを指します。</li>
                <li>2. 「ユーザー」とは、当社のサービスを利用する個人または法人を指します。</li>
                <li>3. 「コンテンツ」とは、文章、画像、動画、音声、プログラム等の情報を指します。</li>
                <li>4. 「知的財産権」とは、著作権、特許権、実用新案権、商標権、意匠権等の知的財産に関する権利を指します。</li>
              </ul>
            </section>

            {/* 第3条 サービスの利用 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第3条（サービスの利用）</h2>
              <ol className="space-y-3 text-gray-800">
                <li>1. ユーザーは、本規約および当社が別途定める個別規約に従ってサービスを利用するものとします。</li>
                <li>2. 未成年者がサービスを利用する場合は、親権者の同意を得るものとします。</li>
                <li>3. 法人としてサービスを利用する場合は、利用申込者が当該法人の代表者またはサービス利用についての決定権限を有することを表明・保証するものとします。</li>
              </ol>
            </section>

            {/* 第4条 アカウント管理 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第4条（アカウント管理）</h2>
              <ol className="space-y-3 text-gray-800">
                <li>1. ユーザーは、サービス利用時に提供する情報について、正確かつ最新の情報を提供するものとします。</li>
                <li>2. ユーザーは、登録情報に変更が生じた場合、速やかに当社に通知するものとします。</li>
                <li>3. ユーザーは、メールアドレス等のアカウント情報を適切に管理し、第三者に利用させてはならないものとします。</li>
                <li>4. アカウント情報の管理不十分により生じた損害について、当社は一切責任を負いません。</li>
              </ol>
            </section>

            {/* 第5条 禁止事項 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第5条（禁止事項）</h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                ユーザーは、サービスの利用にあたり、以下の行為を行ってはならないものとします：
              </p>
              <ul className="space-y-2 text-gray-800">
                <li>1. 法令または公序良俗に違反する行為</li>
                <li>2. 犯罪行為に関連する行為</li>
                <li>3. 当社、他のユーザー、または第三者の知的財産権を侵害する行為</li>
                <li>4. 当社、他のユーザー、または第三者の名誉、信用を毀損する行為</li>
                <li>5. 当社、他のユーザー、または第三者に不利益、損害、不快感を与える行為</li>
                <li>6. 虚偽情報の流布や詐欺的行為</li>
                <li>7. サービスの運営を妨害する行為</li>
                <li>8. 不正アクセスやコンピュータウイルスの送信等</li>
                <li>9. 営業、宣伝、広告、勧誘、その他営利を目的とする行為（当社が認めたものを除く）</li>
                <li>10. その他、当社が不適切と判断する行為</li>
              </ul>
            </section>

            {/* 第6条 サービス内容の変更・停止 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第6条（サービス内容の変更・停止）</h2>
              <ol className="space-y-3 text-gray-800">
                <li>1. 当社は、ユーザーへの事前通知なく、サービスの内容を変更または停止することができるものとします。</li>
                <li>2. 当社は、以下の場合にサービスを一時的に停止することができるものとします：
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>• システムメンテナンスを行う場合</li>
                    <li>• 天災、事変、その他の非常事態が発生した場合</li>
                    <li>• コンピュータや通信回線等が事故により停止した場合</li>
                    <li>• その他サービスの運営が困難と判断した場合</li>
                  </ul>
                </li>
                <li>3. サービスの変更・停止により生じた損害について、当社は一切責任を負いません。</li>
              </ol>
            </section>

            {/* 第7条 料金・支払い */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第7条（料金・支払い）</h2>
              <ol className="space-y-3 text-gray-800">
                <li>1. 有料サービスの料金は、当社のWebサイトに記載された金額とします。</li>
                <li>2. 料金は、当社が指定する方法により、指定された期日までにお支払いください。</li>
                <li>3. 支払期日を過ぎた場合、遅延損害金として年14.6%の割合で計算した金額をお支払いいただきます。</li>
                <li>4. 一度お支払いいただいた料金は、当社に責任がある場合を除き、返金いたしません。</li>
                <li>5. 料金の改定を行う場合は、事前にユーザーに通知いたします。</li>
              </ol>
            </section>

            {/* 第8条 知的財産権 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第8条（知的財産権）</h2>
              <ol className="space-y-3 text-gray-800">
                <li>1. 当社のサービスに関する知的財産権は、当社または当社にライセンスを許諾している者に帰属します。</li>
                <li>2. ユーザーは、当社から提供されるコンテンツを、当社が許諾する範囲でのみ利用することができます。</li>
                <li>3. ユーザーが当社に提供するコンテンツについては、ユーザーが必要な権利を有していることを表明・保証するものとします。</li>
                <li>4. 前項のコンテンツについて、当社はサービス提供に必要な範囲で利用することができるものとします。</li>
              </ol>
            </section>

            {/* 第9条 個人情報の取扱い */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第9条（個人情報の取扱い）</h2>
              <p className="text-gray-800 leading-relaxed">
                当社は、ユーザーの個人情報を、当社のプライバシーポリシーに従って適切に取り扱います。プライバシーポリシーは、
                <a href="/privacy" className="text-primary hover:underline">こちら</a>
                をご確認ください。
              </p>
            </section>

            {/* 第10条 免責・責任制限 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第10条（免責・責任制限）</h2>
              <ol className="space-y-3 text-gray-800">
                <li>1. 当社は、サービスが完全性、正確性、安全性等を有することを保証するものではありません。</li>
                <li>2. 当社は、サービスの利用により生じた損害について、当社に故意または重大な過失がある場合を除き、一切責任を負いません。</li>
                <li>3. 前項ただし書きの場合であっても、当社の責任は、損害の原因となったサービスの対価として当社が受領した金額を上限とします。</li>
                <li>4. 当社は、他のユーザーまたは第三者との間で生じた紛争について、一切責任を負いません。</li>
              </ol>
            </section>

            {/* 第11条 契約解除 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第11条（契約解除）</h2>
              <ol className="space-y-3 text-gray-800">
                <li>1. ユーザーは、当社に事前通知することにより、いつでもサービスの利用を停止することができます。</li>
                <li>2. 当社は、ユーザーが以下のいずれかに該当する場合、事前通知なくサービスの提供を停止し、契約を解除することができます：
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>• 本規約に違反した場合</li>
                    <li>• 料金の支払いを怠った場合</li>
                    <li>• 虚偽の情報を提供した場合</li>
                    <li>• 反社会的勢力に該当すると判明した場合</li>
                    <li>• その他契約の継続が困難と判断した場合</li>
                  </ul>
                </li>
                <li>3. 契約解除後も、解除前に生じた当社の債権は有効に存続します。</li>
              </ol>
            </section>

            {/* 第12条 秘密保持 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第12条（秘密保持）</h2>
              <ol className="space-y-3 text-gray-800">
                <li>1. 当社およびユーザーは、相手方から開示された秘密情報を、相手方の事前の書面による同意なく第三者に開示または漏洩してはならないものとします。</li>
                <li>2. 前項の義務は、契約終了後も3年間継続するものとします。</li>
                <li>3. 秘密情報とは、技術上、営業上、その他業務に関する情報であって、相手方が秘密である旨を明示したものをいいます。</li>
              </ol>
            </section>

            {/* 第13条 分離可能性 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第13条（分離可能性）</h2>
              <p className="text-gray-800 leading-relaxed">
                本規約のいずれかの条項が法令により無効または執行不能と判断された場合でも、本規約の他の条項は引き続き有効に存続するものとします。
              </p>
            </section>

            {/* 第14条 準拠法・管轄裁判所 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第14条（準拠法・管轄裁判所）</h2>
              <ol className="space-y-3 text-gray-800">
                <li>1. 本規約は、日本法に準拠し、日本法に従って解釈されるものとします。</li>
                <li>2. 当社とユーザーとの間で紛争が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
              </ol>
            </section>

            {/* 第15条 規約の変更 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">第15条（規約の変更）</h2>
              <ol className="space-y-3 text-gray-800">
                <li>1. 当社は、必要と判断した場合、ユーザーに事前通知することにより、本規約を変更することができるものとします。</li>
                <li>2. 変更後の規約は、当社のWebサイトに掲載した時点から効力を生じるものとします。</li>
                <li>3. ユーザーが変更後も継続してサービスを利用した場合、変更後の規約に同意したものとみなします。</li>
              </ol>
            </section>

            {/* お問い合わせ */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">お問い合わせ</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-gray-800 leading-relaxed mb-4">
                  本規約に関するお問い合わせは、以下までご連絡ください：
                </p>
                <div className="text-gray-800 space-y-2">
                  <p><strong>合同会社GYAKUTEN</strong></p>
                  <p>住所：東京都渋谷区神泉町10番15号 アネックス神泉301</p>
                  <p>電話：070-6664-4597</p>
                  <p>メール：info@gyaku-ten.jp</p>
                  <p>受付時間：平日 9:00〜18:00</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </Layout>
  );
}