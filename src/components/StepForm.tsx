'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  company: string;
  department: string;
  phone: string;
  industry: string;
  employeeCount: string;
}

interface StepFormProps {
  serviceId: string;
  serviceName?: string;
}

export default function StepForm({ serviceId, serviceName }: StepFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    department: '',
    phone: '',
    industry: '',
    employeeCount: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = (): boolean => {
    return formData.name.trim() !== '' && formData.email.trim() !== '' && formData.company.trim() !== '';
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    
    try {
      const materialsData = {
        selectedServices: [serviceId], // サービスIDを配列で送信
        name: formData.name,
        company: formData.company,
        position: formData.department,
        phone: formData.phone,
        email: formData.email,
        website: '',
        consideration: '',
        challenges: '',
        // 追加情報
        industry: formData.industry,
        employeeCount: formData.employeeCount
      };

      const response = await fetch('/api/materials-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(materialsData),
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

  const renderStep = () => {
    return (
      <div className="space-y-1">
        <div className="text-center mb-1.5">
          <h3 className="font-bold text-sm text-black">基本情報の入力</h3>
          <p className="text-xs text-gray-600">お名前、会社名、連絡先をご入力ください</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">お名前 *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="山田太郎"
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">メールアドレス *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="example@company.com"
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">会社名 *</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder="株式会社サンプル"
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">部署名・役職</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            placeholder="営業部 課長"
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">電話番号</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="03-0000-0000"
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">業界</label>
          <select
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
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
          <label className="block text-xs font-medium text-gray-700 mb-1">従業員数</label>
          <select
            value={formData.employeeCount}
            onChange={(e) => handleInputChange('employeeCount', e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          >
            <option value="">選択してください</option>
            <option value="1-10名">1-10名</option>
            <option value="11-50名">11-50名</option>
            <option value="51-100名">51-100名</option>
            <option value="101-300名">101-300名</option>
            <option value="301名以上">301名以上</option>
          </select>
        </div>
      </div>
    );
  };

  if (isCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-black mb-2">
            資料請求ありがとうございます！
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {serviceName || 'サービス'}の詳細資料をメールでお送りいたします。
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-left mb-3">
            <p className="text-xs text-blue-700">
              <strong>次のステップ：</strong><br />
              • 資料をご確認ください<br />
              • ご不明な点がございましたらお気軽にお問い合わせください<br />
              • 無料相談も承っております
            </p>
          </div>
          <div className="text-xs text-gray-500">
            メールが届かない場合は、お気軽にお問い合わせください。
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
      <div className="text-center mb-2">
        <div className="bg-primary text-white text-sm font-bold py-1 px-3 rounded-full inline-block mb-1">
          詳細資料ダウンロード
        </div>
        <h2 className="text-lg font-bold text-black mb-1">
          簡単入力で完了
        </h2>
        <p className="text-xs text-gray-600">
          詳しいサービス内容や事例をご紹介
        </p>
      </div>

      {/* フォームコンテンツ */}
      <div className="min-h-[120px]">
        {renderStep()}
      </div>

      {/* 送信ボタン */}
      <div className="text-center mt-3">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid() || isSubmitting}
          className={`px-6 py-2 rounded text-sm font-bold transition-colors ${
            isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isFormValid()
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              送信中...
            </span>
          ) : (
            '資料をダウンロードする'
          )}
        </button>
      </div>

      <div className="text-center mt-1.5">
        <p className="text-xs text-gray-500">
          資料はメールにて即座にお送りします
        </p>
      </div>
    </div>
  );
}