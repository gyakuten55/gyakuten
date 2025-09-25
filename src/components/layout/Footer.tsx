import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { serviceItems, appItems } from '@/types/navigation';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: serviceItems,
    products: appItems,
    company: [
      { name: '会社概要', href: '/company' },
      { name: '特徴', href: '/features' },
      { name: '実績', href: '/results' },
      { name: 'コラム', href: '/column' },
      { name: 'パートナー募集', href: '/partner' },
    ],
    legal: [
      { name: 'プライバシーポリシー', href: '/privacy' },
      { name: '利用規約', href: '/terms' },
    ],
    support: [
      { name: '資料請求', href: '/materials' },
      { name: 'よくある質問', href: '/faq' },
      { name: 'お問い合わせ', href: '/contact' },
      { name: 'LLMOについて', href: '/about-llmo' },
      { name: 'デジタルマーケティング用語集', href: '/glossary' },
    ],
  };

  return (
    <footer
      className="bg-secondary-bg text-white"
      itemScope
      itemType="https://schema.org/Organization"
      role="contentinfo"
      aria-label="サイトフッター"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12">
          {/* 会社情報 */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <Link href="/" itemProp="url">
                <Image
                  src="/logo.png"
                  alt="GYAKUTEN"
                  width={180}
                  height={40}
                  className="h-12 w-auto filter brightness-0 invert"
                  itemProp="logo"
                />
              </Link>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-3" itemProp="name">
                  合同会社GYAKUTEN
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4" itemProp="slogan">
                  すべての逆境に、最高の逆転劇を。
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  AI・LLMOに特化したデジタルマーケティング支援と<br />
                  システム開発により、中小企業の成長を支援します。
                </p>
              </div>

              <div className="pt-4" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <h4 className="text-white font-semibold mb-2">所在地</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <p itemProp="postalCode">〒150-0045</p>
                  <p itemProp="addressRegion">東京都渋谷区神泉町10番15号</p>
                  <p>アネックス神泉301</p>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-white font-semibold mb-2">お問い合わせ</h4>
                <div className="text-sm text-gray-300 space-y-2">
                  <p itemProp="telephone">
                    <span className="inline-block w-12">TEL:</span>
                    <span>070-6664-4597</span>
                  </p>
                  <p>
                    <span className="inline-block w-12">Email:</span>
                    <a
                      href="mailto:info@gyaku-ten.jp"
                      className="text-gray-300 hover:text-white transition-colors"
                      itemProp="email"
                    >
                      info@gyaku-ten.jp
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* サービス */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-600 pb-2">サービス</h3>
            <nav aria-label="サービス一覧">
              <ul className="space-y-3">
                {footerLinks.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors block leading-relaxed"
                      title={`${item.name} - ${item.description}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* 企業情報・プロダクト */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-600 pb-2">企業情報</h3>
            <nav aria-label="企業情報">
              <ul className="space-y-3 mb-8">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <h4 className="text-md font-semibold text-white mb-4">プロダクト</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors block"
                    title={`${item.name} - ${item.description}`}
                  >
                    運送統合管理システム
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サポート・お問い合わせ */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-600 pb-2">サポート</h3>
            <nav aria-label="サポート・お問い合わせ">
              <ul className="space-y-3 mb-8">
                {footerLinks.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="pt-4 border-t border-gray-700">
              <h4 className="text-md font-semibold text-white mb-4">法的情報</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA ボタン */}
            <div className="mt-8 space-y-3">
              <Link
                href="/materials"
                className="block bg-primary text-white text-center px-6 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
                aria-label="サービス資料をダウンロード"
              >
                資料請求・お見積り
              </Link>
              <Link
                href="/contact"
                className="block border-2 border-gray-500 text-gray-300 text-center px-6 py-3 rounded-md text-sm font-semibold hover:bg-white hover:text-secondary-bg hover:border-white transition-colors"
                aria-label="お問い合わせフォームへ"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>

        {/* 下部エリア */}
        <div className="mt-16 pt-8 border-t border-gray-600">
          {/* コピーライト */}
          <div className="text-center space-y-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              © {currentYear} 合同会社GYAKUTEN. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs">
              本サイトに掲載されている全ての情報の無断転載を禁止します。
            </p>
            <div className="pt-2">
              <p className="text-primary font-medium text-sm italic">
                すべての逆境に、最高の逆転劇を。
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;