'use client';

import React from 'react';

export default function NewsletterClient() {
  return (
    <main className="min-h-screen bg-white">
      {/* パンくずリスト */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
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
              メルマガ登録
            </li>
          </ol>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4 sm:mb-6">
            メルマガ登録
          </h1>
          <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
            AI検索時代に対応したビジネス戦略やLLMO最適化の最新ノウハウを<br className="hidden sm:block" />
            メールマガジンでお届けします。
          </p>
        </header>

        {/* メルマガの特徴 */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 text-center">メルマガで得られる情報</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
            <ul className="space-y-4 sm:space-y-6">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1">
                  <span className="text-white text-xs sm:text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-black mb-1 sm:mb-2">最新のLLMO技術</h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    AI検索エンジンに対応した最新の最適化手法やアルゴリズムの変化について詳しく解説します。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1">
                  <span className="text-white text-xs sm:text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-black mb-1 sm:mb-2">実践的なビジネス戦略</h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    中小企業でも実践できる具体的なDX推進方法やWeb戦略について事例と共にお届けします。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1">
                  <span className="text-white text-xs sm:text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-black mb-1 sm:mb-2">業界トレンド分析</h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    AI・Web業界の最新動向や今後の展望について、専門的な視点から分析した情報をお届けします。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1">
                  <span className="text-white text-xs sm:text-sm font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-black mb-1 sm:mb-2">限定コンテンツ</h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    メルマガ読者限定の特別コンテンツや先行情報、セミナー・イベントの優先案内をお送りします。
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 登録フォーム */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 text-center">メルマガ登録・退会</h2>
          
          {/* JavaScript関数の追加 */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                function jf_MMWindowOpen101453(ptype){
                  window.open("about:blank","MMSUB","width=500,height=200,scrollbars=yes,status=yes,resizable=yes");
                  document.frmLMM101453.target = "MMSUB";
                  document.frmLMM101453.action = "https://api.lolipop.jp/api/api.php?cmd=mm&type="+ptype;
                  document.frmLMM101453.submit();
                }
              `
            }}
          />

          <form name="frmLMM101453" method="post" className="space-y-4 sm:space-y-6">
            <input type="hidden" name="account" value="journey" />
            <input type="hidden" name="domain" value="mm.gyaku-ten.jp" />
            
            {/* 登録セクション */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">メルマガ登録</h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-end">
                <div className="flex-grow">
                  <label htmlFor="user_mail" className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    name="user_mail"
                    id="user_mail"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base"
                    placeholder="example@email.com"
                    required
                  />
                </div>
                <button
                  type="button"
                  name="join"
                  onClick={() => (window as any).jf_MMWindowOpen101453('join')}
                  className="bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md font-medium hover:bg-primary/90 transition-colors whitespace-nowrap text-sm sm:text-base"
                >
                  登録する
                </button>
              </div>
            </div>

            {/* 退会セクション */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">メルマガ退会</h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-end">
                <div className="flex-grow">
                  <label htmlFor="user_mail_resign" className="block text-sm font-medium text-gray-700 mb-2">
                    退会メールアドレス
                  </label>
                  <input
                    type="email"
                    name="user_mail_resign"
                    id="user_mail_resign"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base"
                    placeholder="example@email.com"
                    required
                  />
                </div>
                <button
                  type="button"
                  name="resign"
                  onClick={() => (window as any).jf_MMWindowOpen101453('resign')}
                  className="bg-gray-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md font-medium hover:bg-gray-700 transition-colors whitespace-nowrap text-sm sm:text-base"
                >
                  退会する
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 text-sm text-gray-600 text-center">
            <p>※ 登録・退会手続きは別ウィンドウで開きます</p>
            <p>※ メルマガの配信停止はいつでも可能です</p>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">ご利用にあたって</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• 配信頻度：週1〜2回程度（重要な情報がある場合は追加配信することがあります）</li>
            <li>• 配信形式：HTMLメール（テキスト版も選択可能）</li>
            <li>• プライバシー：お預かりした個人情報は適切に管理し、弊社のプライバシーポリシーに従って利用いたします</li>
            <li>• 退会：メルマガの配信停止はいつでも可能です。上記の退会フォームまたはメール内のリンクからお手続きください</li>
          </ul>
        </div>
      </div>
    </main>
  );
}