import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { serviceItems } from '@/types/navigation';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: serviceItems,
    company: [
      { name: '会社概要', href: '/company' },
      { name: '代表挨拶', href: '/company#message' },
      { name: 'プライバシーポリシー', href: '/privacy' },
      { name: '利用規約', href: '/terms' },
    ],
    support: [
      { name: '資料請求', href: '/materials' },
      { name: 'よくある質問', href: '/faq' },
      { name: '無料診断', href: '/services/llmo-diagnosis' },
    ],
  };

  return (
    <footer className="bg-secondary-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 会社情報 */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="GYAKUTEN"
                  width={180}
                  height={40}
                  className="h-10 w-auto filter brightness-0 invert"
                />
              </Link>
            </div>
            <div className="text-sm text-gray-300 space-y-2">
              <p>合同会社GYAKUTEN</p>
              <p>すべての逆境に、最高の逆転劇を。</p>
              <div className="mt-4">
                <p>〒150-0045</p>
                <p>東京都渋谷区神泉町10番15号</p>
                <p>アネックス神泉301</p>
                <p>TEL: 070-6664-4597</p>
                <p>Email: info@gyaku-ten.jp</p>
              </div>
            </div>
          </div>

          {/* サービス */}
          <div>
            <h3 className="text-lg font-semibold mb-4">サービス</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 会社・サポート */}
          <div>
            <h3 className="text-lg font-semibold mb-4">会社情報</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サポート・CTA */}
          <div>
            <h3 className="text-lg font-semibold mb-4">サポート</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* CTA ボタン */}
            <div className="space-y-3">
              <Link
                href="/services/llmo-diagnosis"
                className="block bg-white text-primary text-center px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                無料診断申込
              </Link>
              <Link
                href="/newsletter"
                className="block border border-white text-white text-center px-4 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-primary transition-colors"
              >
                メルマガ登録
              </Link>
              <Link
                href="/contact"
                className="block border border-white text-white text-center px-4 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-primary transition-colors"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>

        {/* 追加リンク */}
        <div className="mt-8 pt-8 border-t border-gray-600">
          <div className="flex justify-center">
            <div className="text-sm text-gray-300">
              <Link href="/column" className="hover:text-white">
                コラム
              </Link>
              <span className="mx-2">|</span>
              <Link href="/features" className="hover:text-white">
                特徴
              </Link>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-6 pt-6 border-t border-gray-600 text-center">
          <p className="text-sm text-gray-300">
            © {currentYear} 合同会社GYAKUTEN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;