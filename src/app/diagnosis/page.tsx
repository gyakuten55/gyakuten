'use client';

import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DiagnosisPage() {
  const router = useRouter();

  useEffect(() => {
    alert('現在、無料LLMO診断サービスは準備中です。\n\nより高品質な分析結果をお届けするため、システムの最適化を進めております。サービス開始まで今しばらくお待ちください。\n\n個別のご相談については、お問い合わせフォームよりお気軽にお声かけください。');
    router.push('/');
  }, [router]);

  return (
    <Layout>
      <main className="min-h-screen bg-white">
        {/* パンくずリスト */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
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
                無料LLMO診断
              </li>
            </ol>
          </div>
        </nav>

        {/* ヒーローセクション */}
        <section className="py-12 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-black text-black mb-4 leading-tight">
                無料LLMO診断
              </h1>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                AI検索時代に対応した<span className="text-primary font-bold">Webサイト最適化診断</span>を無料で実施
              </p>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                貴社サイトがAIに「選ばれる」状態かを多角的にチェック。ChatGPTやBardなどのAI検索エンジンで上位表示されるための最適化をご提案します。
              </p>
            </div>

            {/* 診断フォーム */}
            <div className="max-w-lg mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-gray-600 mb-4">診断サービスは準備中です</p>
                <p className="text-sm text-gray-500">お問い合わせフォームよりご連絡ください</p>
              </div>
            </div>
          </div>
        </section>


        {/* 診断の流れ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                診断の流れ
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "情報入力",
                  description: "お名前、会社名、WebサイトURLなどの基本情報をご入力いただきます。"
                },
                {
                  step: "2",
                  title: "自動診断",
                  description: "AIが貴社サイトを自動でスキャンし、各種指標を測定・分析します。"
                },
                {
                  step: "3",
                  title: "レポート作成",
                  description: "診断結果を分かりやすいPDFレポートにまとめます。"
                },
                {
                  step: "4",
                  title: "結果送付",
                  description: "2-3営業日以内にメールで診断結果をお送りします。"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              AI検索時代に対応したサイトへ
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              まずは無料診断で現状を把握してみませんか？<br />
              わずか数分で申し込み完了。専門家が貴社サイトを分析します。
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-center max-w-xs sm:max-w-none mx-auto">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-primary px-2 py-1.5 sm:px-8 sm:py-4 rounded text-xs sm:text-lg font-medium hover:bg-gray-100 transition-colors w-full sm:w-auto"
              >
                診断申し込み
              </button>
              <Link
                href="/services/llmo-diagnosis"
                className="bg-transparent border border-white text-white px-2 py-1.5 sm:px-8 sm:py-4 rounded text-xs sm:text-lg font-medium hover:bg-white hover:text-primary transition-colors w-full sm:w-auto"
              >
                詳細を見る
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}