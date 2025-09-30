import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Layout from '@/components/layout/Layout';

export default function Reservation() {
  return (
    <Layout>
      <main className="min-h-screen bg-white">
        {/* パンくずリスト */}
        <nav className="bg-white border-b border-gray-200 pt-5">
          <div className="max-w-6xl mx-auto px-4 py-3">
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
                無料相談予約
              </li>
            </ol>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 pt-2 pb-12">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-4 tracking-wide">
              無料相談予約
            </h1>
            <p className="text-lg text-gray-800 leading-relaxed">
              GYAKUTENの無料相談をご予約いただけます。<br />
              下記のカレンダーから、ご希望の日時を選択してください。
            </p>
          </header>

          {/* Lark Scheduler Inline Embed */}
          <div className="mb-12">
            <div
              className="scheduler-inline-widget"
              data-url="https://ujpdc2arypfz.jp.larksuite.com/scheduler/embed/db712006ca71f4e7?hideEventDetail=true"
              style={{ width: '100%', height: '626px' }}
            />
          </div>

          {/* 注意事項 */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-black mb-4">ご利用について</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 営業時間：平日9:00〜18:00（土日祝日除く）</li>
              <li>• 相談時間：約30分〜1時間</li>
              <li>• オンライン（Zoom）または対面での相談が可能です</li>
              <li>• お急ぎの場合は直接お電話ください：070-6664-4597</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Lark Scheduler Script */}
      <Script
        src="https://ujpdc2arypfz.jp.larksuite.com/scheduler/embed/scheduler-widget.js"
        strategy="lazyOnload"
      />
    </Layout>
  );
}