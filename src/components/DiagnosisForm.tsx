'use client';

import React, { useState } from 'react';

interface DiagnosisFormData {
  name: string;
  email: string;
  company: string;
  website: string;
  phone: string;
  industry: string;
  employeeCount: string;
  message: string;
}

export default function DiagnosisForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState<DiagnosisFormData>({
    name: '',
    email: '',
    company: '',
    website: '',
    phone: '',
    industry: '',
    employeeCount: '',
    message: ''
  });

  const totalSteps = 2;

  const handleInputChange = (field: keyof DiagnosisFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.name.trim() !== '' && 
               formData.email.trim() !== '' && 
               formData.company.trim() !== '' &&
               formData.website.trim() !== '';
      case 2:
        const privacyCheckbox = document.getElementById('privacy') as HTMLInputElement;
        const analysisCheckbox = document.getElementById('analysis-agreement') as HTMLInputElement;
        return privacyCheckbox?.checked && analysisCheckbox?.checked;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/diagnosis-form', {
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
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-black mb-2">
            お申し込みありがとうございます！
          </h3>
          <p className="text-gray-600 mb-4">
            診断を開始いたします。結果は2-3営業日以内に<br />
            ご登録いただいたメールアドレスにお送りします。
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h4 className="font-semibold text-blue-800 mb-2">今後の流れ</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• ご入力いただいたWebサイトの自動診断を実行</li>
              <li>• 診断結果をPDFレポートで作成</li>
              <li>• メールにて診断結果をお送り</li>
              <li>• 詳しい改善相談も承ります（任意）</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-3">
            <div className="text-center mb-4">
              <h3 className="font-bold text-lg text-black">基本情報の入力</h3>
              <p className="text-sm text-gray-600">診断に必要な情報をご入力ください</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">お名前 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="山田太郎"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@company.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">会社名 *</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="株式会社サンプル"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">診断対象のWebサイトURL *</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                診断を行うWebサイトのURLをご入力ください
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="03-0000-0000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-3">
            <div className="text-center mb-4">
              <h3 className="font-bold text-lg text-black">詳細情報</h3>
              <p className="text-sm text-gray-600">より詳しい診断のための情報（任意）</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">業界</label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">選択してください</option>
                <option value="製造業">製造業</option>
                <option value="小売業">小売業</option>
                <option value="サービス業">サービス業</option>
                <option value="IT・Web">IT・Web</option>
                <option value="建設・不動産">建設・不動産</option>
                <option value="医療・介護">医療・介護</option>
                <option value="教育">教育</option>
                <option value="金融・保険">金融・保険</option>
                <option value="飲食業">飲食業</option>
                <option value="その他">その他</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">従業員数</label>
              <select
                value={formData.employeeCount}
                onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">選択してください</option>
                <option value="1-10名">1-10名</option>
                <option value="11-50名">11-50名</option>
                <option value="51-100名">51-100名</option>
                <option value="101-300名">101-300名</option>
                <option value="301名以上">301名以上</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">現在の課題やご要望</label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="現在のWebサイトの課題や、診断で特に知りたい点があればお聞かせください"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              />
            </div>

            {/* 同意事項 */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">サイト分析について</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• 公開されているWebサイトの技術的な構造のみを分析します</li>
                  <li>• サイトのコンテンツや個人情報を収集・保存することはありません</li>
                  <li>• 分析結果は診断レポートの作成にのみ使用されます</li>
                  <li>• 診断は完全自動で行われ、人的なサイト閲覧は発生しません</li>
                </ul>
              </div>

              <div className="space-y-3">
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
                
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="analysis-agreement"
                    required
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="analysis-agreement" className="text-sm text-gray-700">
                    <span className="font-medium">サイト分析に関する同意</span><br />
                    ご入力いただいたWebサイトURLに対して、LLMO最適化診断のための自動アクセス・解析を行うことに同意します。分析は技術的な最適化状況の確認のみを目的とし、サイト内容の複製や悪用は一切行いません。 <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="text-center mb-6">
        <div className="bg-primary text-white text-sm font-bold py-2 px-4 rounded-full inline-block mb-2">
          LLMO診断申し込み
        </div>
        <h2 className="text-xl font-bold text-black mb-2">
          簡単2ステップで診断開始
        </h2>
        <p className="text-sm text-gray-600">
          AI検索時代に対応したサイト診断を無料で実施
        </p>
      </div>

      {/* プログレスバー */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          {[1, 2].map((step) => (
            <div
              key={step}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                step <= currentStep
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>基本情報</span>
          <span>詳細情報</span>
        </div>
      </div>

      {/* フォームコンテンツ */}
      <div className="min-h-[300px]">
        {renderStep()}
      </div>

      {/* ナビゲーションボタン */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-2 rounded-md text-sm font-medium ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          戻る
        </button>

        {currentStep === totalSteps ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-8 py-2 rounded-md text-sm font-bold transition-colors ${
              isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                診断開始中...
              </span>
            ) : (
              '診断を開始する'
            )}
          </button>
        ) : (
          <button
            onClick={nextStep}
            disabled={!isStepValid(currentStep)}
            className={`px-8 py-2 rounded-md text-sm font-bold transition-colors ${
              isStepValid(currentStep)
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            次へ
          </button>
        )}
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          診断結果は2-3営業日以内にメールでお送りします
        </p>
      </div>
    </div>
  );
}