'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function Materials() {
  const [formData, setFormData] = useState({
    selectedServices: [] as string[],
    name: '',
    company: '',
    position: '',
    phone: '',
    email: '',
    website: '',
    consideration: '',
    challenges: ''
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

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: checked 
        ? [...prev.selectedServices, service]
        : prev.selectedServices.filter(s => s !== service)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/materials-request', {
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

  const services = [
    {
      id: 'llmo-diagnosis',
      name: 'GYAKUTEN LLMO診断',
      description: 'WebサイトやコラムをLLMO視点で診断',
      price: '無料〜35,000円'
    },
    {
      id: 'web-llmo',
      name: 'GYAKUTEN LLMO ウェブ制作',
      description: 'AI検索時代に最適化されたWebサイト制作',
      price: '制作費10万円 + 維持費5,000円/月'
    },
    {
      id: 'write-llmo',
      name: 'GYAKUTEN LLMO ライティング',
      description: '大規模言語モデル最適化ライティング',
      price: '2.5円/文字'
    },
    {
      id: 'llmo-consulting',
      name: 'GYAKUTEN LLMO コンサル',
      description: 'LLMO視点でのトータルコンサルティング',
      price: 'スタンダード25万円/月〜'
    },
    {
      id: 'dx',
      name: 'GYAKUTEN システム開発',
      description: '完全オーダーメイドシステム開発',
      price: '要相談'
    },
    {
      id: 'quick-support',
      name: 'GYAKUTENクイックサポート',
      description: '時間単位業務代行サービス',
      price: '2,500円/時間'
    },
    {
      id: 'bootcamp',
      name: '逆転ブートキャンプ',
      description: '180日間完全マンツーマンプログラム',
      price: '15万円'
    },
    {
      id: 'transport-system',
      name: 'GYAKUTEN運送統合管理システム',
      description: '管理業務50%削減を実証済みの運送業界専用システム',
      price: '月額3万円〜4.5万円'
    }
  ];

  if (isCompleted) {
    return (
      <Layout>
        <main className="min-h-screen bg-white">
          {/* パンくずリスト */}
          <nav className="bg-white border-b border-gray-200 pt-5">
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
                  資料請求
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
                  資料請求ありがとうございます！
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  ご請求いただいた資料をメールでお送りいたします。<br />
                  メールが届かない場合は、お気軽にお問い合わせください。
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left mb-6">
                  <h4 className="font-semibold text-blue-800 mb-3">お送りした資料</h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    {formData.selectedServices.map(serviceId => {
                      const service = services.find(s => s.id === serviceId);
                      return service ? (
                        <li key={serviceId} className="flex items-center">
                          <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                          </svg>
                          {service.name} サービス説明資料
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">次のステップ</h4>
                  <ul className="text-sm text-gray-700 space-y-2 text-left">
                    <li>• 資料をご確認いただき、ご不明な点がございましたらお気軽にお問い合わせください</li>
                    <li>• 無料相談・お見積もりも承っております</li>
                    <li>• お急ぎの場合は直接お電話ください：070-6664-4597</li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Link 
                    href="/" 
                    className="bg-primary text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors inline-block mr-4"
                  >
                    ホームに戻る
                  </Link>
                  <a 
                    href="/contact" 
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors inline-block"
                  >
                    お問い合わせ
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
                <Link href="/" className="hover:text-primary">
                  ホーム
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-black font-medium">
                資料請求
              </li>
            </ol>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 pt-2 pb-6">
          <header className="mb-16">
            <h1 className="text-4xl font-bold text-black mb-8 tracking-wide">
              資料請求
            </h1>
            <p className="text-lg text-gray-800 leading-relaxed">
              GYAKUTENのサービス資料をご請求いただけます。<br />
              ご興味のあるサービスを選択して、必要事項をご入力ください。
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* サービス選択 */}
            <section>
              <h2 className="text-xl font-bold text-black mb-6 border-b border-gray-200 pb-2">
                資料をご希望のサービス <span className="text-red-500">*</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.selectedServices.includes(service.id)}
                        onChange={(e) => handleServiceChange(service.id, e.target.checked)}
                        className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-black text-sm mb-1">
                          {service.name}
                        </div>
                        <div className="text-xs text-gray-600 mb-2">
                          {service.description}
                        </div>
                        <div className="text-xs text-primary font-medium">
                          {service.price}
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              
              {formData.selectedServices.length === 0 && (
                <p className="text-sm text-red-500 mt-2">
                  少なくとも1つのサービスを選択してください
                </p>
              )}
            </section>

            {/* 基本情報 */}
            <section>
              <h2 className="text-xl font-bold text-black mb-6 border-b border-gray-200 pb-2">
                基本情報
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 氏名 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                    氏名 <span className="text-red-500">*</span>
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

                {/* 会社名 */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-black mb-2">
                    会社名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
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
                <div>
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

                {/* メールアドレス */}
                <div className="md:col-span-2">
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

                {/* WEBサイトURL */}
                <div className="md:col-span-2">
                  <label htmlFor="website" className="block text-sm font-medium text-black mb-2">
                    WEBサイトURL
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
              </div>
            </section>

            {/* 検討状況・課題 */}
            <section>
              <h2 className="text-xl font-bold text-black mb-6 border-b border-gray-200 pb-2">
                検討状況・課題について
              </h2>
              
              <div className="space-y-6">
                {/* サービスの検討状況 */}
                <div>
                  <label htmlFor="consideration" className="block text-sm font-medium text-black mb-2">
                    サービスの検討状況
                  </label>
                  <select
                    id="consideration"
                    name="consideration"
                    value={formData.consideration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">選択してください</option>
                    <option value="情報収集">情報収集段階</option>
                    <option value="比較検討">比較検討中</option>
                    <option value="導入前提">導入前提で検討</option>
                    <option value="予算確保済">予算確保済み</option>
                    <option value="緊急対応">緊急対応が必要</option>
                    <option value="その他">その他</option>
                  </select>
                </div>

                {/* お困りごと・課題点 */}
                <div>
                  <label htmlFor="challenges" className="block text-sm font-medium text-black mb-2">
                    お困りごと・課題点
                  </label>
                  <textarea
                    id="challenges"
                    name="challenges"
                    rows={5}
                    value={formData.challenges}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                    placeholder="現在お困りのことや課題がございましたら、お聞かせください。
例：
・AI検索で自社が見つからない
・Webサイトからの問い合わせが減っている
・競合他社に差をつけられている
・業務効率化を図りたい
・システム開発のパートナーを探している"
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
                    : formData.selectedServices.length === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
                disabled={formData.selectedServices.length === 0 || isSubmitting}
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
                  '資料請求を送信'
                )}
              </button>
            </div>
          </form>

          {/* 注意事項 */}
          <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-black mb-4">ご注意事項</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 資料は24時間以内にメールでお送りいたします。</li>
              <li>• 営業目的での資料請求はご遠慮ください。</li>
              <li>• ご不明な点がございましたら、お気軽にお問い合わせください。</li>
              <li>• 弊社に関する情報を配信する可能性があります。</li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}