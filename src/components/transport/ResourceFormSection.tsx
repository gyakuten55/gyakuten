'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpIcon, FileTextIcon, BarChart3Icon, DownloadIcon } from 'lucide-react';

const ResourceFormSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const response = await fetch('/api/transport-resource-request', {
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
      <section ref={sectionRef} className="py-20 bg-primary" id="resource-form">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              資料請求ありがとうございます！
            </h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              ご請求いただいた資料をメールでお送りいたします。<br />
              メールが届かない場合は、お気軽にお問い合わせください。
            </p>
            <a
              href="/reservation"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors inline-block"
            >
              無料相談を申し込む
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-20 bg-primary" id="resource-form">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              詳細資料を
              <span className="block">無料でお送りします</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              東翔運輸での実証データを含む詳細資料をメールでお送りいたします。<br />
              導入検討に必要な情報をすべて網羅しています。
            </p>
          </div>

          {/* Resource Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <FileTextIcon className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">機能詳細資料</h3>
              <p className="text-white/80 text-sm">6つの主要機能を詳しく解説</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <BarChart3Icon className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">導入効果レポート</h3>
              <p className="text-white/80 text-sm">実測データと導入効果分析</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <DownloadIcon className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">料金・導入ガイド</h3>
              <p className="text-white/80 text-sm">詳細料金表と導入プロセス</p>
            </div>
          </div>

          {/* Request Form */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    氏名 <span className="text-yellow-300">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="山田太郎"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                    会社名 <span className="text-yellow-300">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="株式会社サンプル"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    メールアドレス <span className="text-yellow-300">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="example@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="03-1234-5678"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 rounded-lg font-semibold text-lg transition-colors ${
                  isSubmitting
                    ? 'bg-white/30 text-white/60 cursor-not-allowed'
                    : 'bg-white text-primary hover:bg-gray-50'
                } flex items-center justify-center gap-2`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    送信中...
                  </>
                ) : (
                  <>
                    <DownloadIcon className="w-5 h-5" />
                    詳細資料を請求する
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-white/70 text-sm mt-8 text-center">
            資料請求後の強引な営業は一切いたしません
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResourceFormSection;