'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    phone: '',
    consultationType: '',
    inquiry: '',
    website: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '送信に失敗しました');
      }

      setIsCompleted(true);
    } catch (error) {
      console.error('送信エラー:', error);
      alert(error instanceof Error ? error.message : '送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCompleted) {
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
                  お問い合わせ
                </li>
              </ol>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto px-4 pt-2 pb-6">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  お問い合わせありがとうございます！
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  お問い合わせを受け付けいたしました。<br />
                  1営業日以内に担当者よりご返信いたします。
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left mb-6">
                  <h4 className="font-semibold text-blue-800 mb-3">今後の流れ</h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                      </svg>
                      確認メールをお送りしました
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                      </svg>
                      1営業日以内に担当者よりご返信
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-2-4h4m-4 0v-2a2 2 0 00-2-2H9a2 2 0 00-2 2v2m4 0h.01" />
                      </svg>
                      必要に応じて詳細相談・お見積もり
                    </li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-yellow-800 mb-3">お急ぎの場合</h4>
                  <p className="text-sm text-yellow-700 mb-2">
                    お急ぎの場合は、直接お電話ください
                  </p>
                  <p className="text-lg font-bold text-primary">070-6664-4597</p>
                  <p className="text-xs text-gray-600">営業時間：平日 9:00-18:00</p>
                </div>
                <div className="mt-6">
                  <a 
                    href="/" 
                    className="bg-primary text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors inline-block mr-4"
                  >
                    ホームに戻る
                  </a>
                  <a 
                    href="/materials" 
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors inline-block"
                  >
                    資料請求
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

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
                お問い合わせ
              </li>
            </ol>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 pt-2 pb-6">
          <header className="mb-16">
            <h1 className="text-4xl font-bold text-black mb-8 tracking-wide">
              お問い合わせ
            </h1>
            <p className="text-lg text-gray-800 leading-relaxed">
              LLMO最適化・Web制作・システム開発に関するご相談はお気軽にお問い合わせください。<br />
              通常1営業日以内にご返信いたします。
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 基本情報 */}
            <section>
              <h2 className="text-xl font-bold text-black mb-6 border-b border-gray-200 pb-2">
                基本情報
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 名前 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="山田太郎"
                  />
                </div>

                {/* メールアドレス */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="example@company.com"
                  />
                </div>

                {/* 会社名 */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-black mb-2">
                    会社名
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="株式会社サンプル"
                  />
                </div>

                {/* 役職 */}
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-black mb-2">
                    役職
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="代表取締役"
                  />
                </div>

                {/* 電話番号 */}
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="03-1234-5678"
                  />
                </div>
              </div>
            </section>

            {/* 相談内容 */}
            <section>
              <h2 className="text-xl font-bold text-black mb-6 border-b border-gray-200 pb-2">
                ご相談内容
              </h2>
              
              <div className="space-y-6">
                {/* 相談種別 */}
                <div>
                  <label htmlFor="consultationType" className="block text-sm font-medium text-black mb-2">
                    ご相談内容種別 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="consultationType"
                    name="consultationType"
                    required
                    value={formData.consultationType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">選択してください</option>
                    <option value="llmo-diagnosis">GYAKUTEN LLMO診断</option>
                    <option value="web-llmo">GYAKUTEN LLMO ウェブ制作</option>
                    <option value="write-llmo">GYAKUTEN LLMO ライティング</option>
                    <option value="llmo-consulting">GYAKUTEN LLMO コンサル</option>
                    <option value="dx">GYAKUTEN システム開発</option>
                    <option value="bootcamp">逆転ブートキャンプ</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                {/* サイトURL */}
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-black mb-2">
                    サイトURL
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>

                {/* お問い合わせ内容 */}
                <div>
                  <label htmlFor="inquiry" className="block text-sm font-medium text-black mb-2">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="inquiry"
                    name="inquiry"
                    required
                    rows={6}
                    value={formData.inquiry}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                    placeholder="ご相談内容やご質問を詳しくお聞かせください。
現在の課題やお困りごと、期待する成果などをお教えいただけますと、より具体的なご提案が可能です。"
                  />
                </div>
              </div>
            </section>

            {/* プライバシーポリシー */}
            <section className="border-t border-gray-200 pt-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="privacy" className="text-sm text-gray-700">
                  <a href="/privacy" className="text-primary hover:underline" target="_blank">
                    プライバシーポリシー
                  </a>
                  に同意します <span className="text-red-500">*</span>
                </label>
              </div>
            </section>

            {/* 送信ボタン */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className={`px-8 py-3 rounded-md text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    送信中...
                  </span>
                ) : (
                  'お問い合わせを送信'
                )}
              </button>
            </div>
          </form>

          {/* 注意事項 */}
          <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-black mb-4">ご注意事項</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 通常1営業日以内にご返信いたします。</li>
              <li>• お急ぎの場合は、お電話（070-6664-4597）でもお問い合わせいただけます。</li>
              <li>• 営業目的のお問い合わせはご遠慮ください。</li>
              <li>• いただいた個人情報は、お問い合わせへの回答以外の目的では使用いたしません。</li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}