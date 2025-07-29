import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';

// SEO メタデータ
export const metadata: Metadata = {
  title: 'プライバシーポリシー | GYAKUTEN - AI検索時代のビジネス戦略',
  description: '合同会社GYAKUTENのプライバシーポリシーページです。個人情報の取り扱いについて詳しく説明しています。',
  robots: 'noindex, nofollow',
};

export default function Privacy() {
  return (
    <Layout>
      <main className="min-h-screen bg-white">
        {/* パンくずリスト */}
        <nav className="bg-white border-b border-gray-200">
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
                プライバシーポリシー
              </li>
            </ol>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              プライバシーポリシー
            </h1>
            <p className="text-gray-600">
              最終更新日：2024年8月1日
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            
            {/* 1. 基本方針 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">1. 基本方針</h2>
              <p className="text-gray-800 leading-relaxed">
                合同会社GYAKUTEN（以下「当社」）は、LLMO最適化、Web制作、DXコンサルティング等の事業を通じて、お客様の個人情報を適切に保護することを重要な責務と考えております。本プライバシーポリシーは、当社がどのような個人情報を収集し、どのように利用・保護するかを明記したものです。
              </p>
            </section>

            {/* 2. 個人情報の定義 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">2. 個人情報の定義</h2>
              <p className="text-gray-800 leading-relaxed">
                本プライバシーポリシーにおいて「個人情報」とは、個人情報保護法に定める個人情報を指し、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、メールアドレス等により特定の個人を識別できる情報を意味します。
              </p>
            </section>

            {/* 3. 個人情報の収集 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">3. 個人情報の収集</h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                当社は、以下の場合に個人情報を収集いたします：
              </p>
              <ul className="space-y-2 text-gray-800">
                <li>• お問い合わせフォームからのご連絡時</li>
                <li>• 資料請求フォームからのお申し込み時</li>
                <li>• メールマガジンのご登録時</li>
                <li>• 各種サービスへのお申し込み時</li>
                <li>• LLMO診断サービスのご利用時</li>
                <li>• セミナーやイベントへのご参加時</li>
                <li>• 逆転ブートキャンプへのお申し込み時</li>
              </ul>
            </section>

            {/* 4. 収集する個人情報の項目 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">4. 収集する個人情報の項目</h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                当社は、以下の個人情報を収集する場合があります：
              </p>
              <ul className="space-y-2 text-gray-800">
                <li>• 氏名、会社名、部署名、役職</li>
                <li>• 電話番号、メールアドレス</li>
                <li>• 住所（必要に応じて）</li>
                <li>• WebサイトURL</li>
                <li>• お問い合わせ内容、ご相談内容</li>
                <li>• サービス利用履歴</li>
                <li>• IPアドレス、Cookie情報</li>
              </ul>
            </section>

            {/* 5. 個人情報の利用目的 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">5. 個人情報の利用目的</h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                収集した個人情報は、以下の目的で利用いたします：
              </p>
              <ul className="space-y-2 text-gray-800">
                <li>• お問い合わせへの回答および資料の送付</li>
                <li>• サービスの提供、運営、改善</li>
                <li>• LLMO診断結果の提供</li>
                <li>• メールマガジンの配信</li>
                <li>• セミナーやイベントのご案内</li>
                <li>• 新サービスや重要なお知らせの配信</li>
                <li>• 契約の履行および代金の決済</li>
                <li>• 顧客サポートの提供</li>
                <li>• 統計データの作成（個人を特定できない形式）</li>
                <li>• 法令に基づく対応</li>
              </ul>
            </section>

            {/* 6. 個人情報の第三者提供 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">6. 個人情報の第三者提供</h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                当社は、以下の場合を除き、個人情報を第三者に提供いたしません：
              </p>
              <ul className="space-y-2 text-gray-800">
                <li>• ご本人の同意がある場合</li>
                <li>• 法令に基づく場合</li>
                <li>• 人の生命、身体または財産の保護のために必要がある場合</li>
                <li>• 公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
                <li>• 国の機関等の法令の定める事務に協力する必要がある場合</li>
              </ul>
            </section>

            {/* 7. 業務委託 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">7. 業務委託</h2>
              <p className="text-gray-800 leading-relaxed">
                当社は、サービス提供のために必要な範囲で、個人情報の取り扱いを外部業者に委託する場合があります。この場合、委託先に対して適切な監督を行い、個人情報の安全管理を徹底いたします。
              </p>
            </section>

            {/* 8. Cookie等の利用 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">8. Cookie等の利用</h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                当社のWebサイトでは、より良いサービス提供のためにCookieを使用しています：
              </p>
              <ul className="space-y-2 text-gray-800">
                <li>• サイトの利用状況の分析</li>
                <li>• ユーザー体験の向上</li>
                <li>• 適切な広告の表示</li>
              </ul>
              <p className="text-gray-800 leading-relaxed mt-4">
                Cookieの使用を望まない場合は、ブラウザの設定で無効にすることができますが、一部機能が利用できなくなる場合があります。
              </p>
            </section>

            {/* 9. 個人情報の安全管理 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">9. 個人情報の安全管理</h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                当社は、個人情報の紛失、破壊、改ざん、漏洩等を防止するため、以下の安全管理措置を講じています：
              </p>
              <ul className="space-y-2 text-gray-800">
                <li>• SSL暗号化通信の導入</li>
                <li>• アクセス権限の管理</li>
                <li>• 定期的なセキュリティチェック</li>
                <li>• 従業員への教育・研修</li>
                <li>• 物理的セキュリティの確保</li>
              </ul>
            </section>

            {/* 10. 個人情報の開示・訂正・削除 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">10. 個人情報の開示・訂正・削除</h2>
              <p className="text-gray-800 leading-relaxed">
                ご本人から個人情報の開示、訂正、削除、利用停止等の求めがあった場合には、ご本人であることを確認の上、法令に従って対応いたします。お問い合わせは、本ページ末尾の連絡先までご連絡ください。
              </p>
            </section>

            {/* 11. メールマガジン */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">11. メールマガジン</h2>
              <p className="text-gray-800 leading-relaxed">
                メールマガジンの配信停止をご希望の場合は、メール内の配信停止リンクをクリックするか、当社までご連絡ください。速やかに配信を停止いたします。
              </p>
            </section>

            {/* 12. プライバシーポリシーの変更 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">12. プライバシーポリシーの変更</h2>
              <p className="text-gray-800 leading-relaxed">
                当社は、必要に応じて本プライバシーポリシーの内容を変更することがあります。変更後のプライバシーポリシーは、当社のWebサイトに掲載した時点から効力を生じるものとします。
              </p>
            </section>

            {/* 13. お問い合わせ窓口 */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">13. お問い合わせ窓口</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-gray-800 leading-relaxed mb-4">
                  個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください：
                </p>
                <div className="text-gray-800 space-y-2">
                  <p><strong>合同会社GYAKUTEN</strong></p>
                  <p>個人情報お問い合わせ窓口</p>
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