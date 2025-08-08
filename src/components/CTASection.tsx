'use client';

import React from 'react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-[#8f2c34] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 左側：無料診断 */}
          <div className="text-left">
            <h2 className="text-2xl font-bold text-white mb-3">
              まずは無料診断から<br />お試しください
            </h2>
            <p className="text-base text-gray-200 mb-6">
              「とりあえず話を聞いてみたい」という気軽な気持ちで構いません。あなたのビジネスにどのような改善点があるか、診断いたします。
            </p>
            <Link
              href="/diagnosis"
              className="bg-white text-primary px-6 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors inline-block"
            >
              無料診断を行う
            </Link>
          </div>

          {/* 右側：資料請求 */}
          <div className="text-left">
            <h2 className="text-2xl font-bold text-white mb-3">
              詳しい資料を<br />ダウンロード
            </h2>
            <p className="text-base text-gray-200 mb-6">
              サービス内容や導入事例、料金体系など、詳しい情報をまとめた資料をご用意しています。検討材料としてお役立てください。
            </p>
            <Link
              href="/materials"
              className="bg-white text-primary px-6 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors inline-block"
            >
              資料をダウンロード
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}