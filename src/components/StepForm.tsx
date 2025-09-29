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
  // パートナー募集専用フィールド
  contactPerson?: string;
  projectDetails?: string;
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
    employeeCount: '',
    contactPerson: '',
    projectDetails: ''
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
    if (serviceId === 'partner') {
      return formData.company.trim() !== '' && 
             formData.email.trim() !== '' && 
             formData.contactPerson?.trim() !== '' && 
             formData.phone.trim() !== '';
    }
    
    return formData.name.trim() !== '' && formData.email.trim() !== '' && formData.company.trim() !== '';
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    
    try {
      if (serviceId === 'partner') {
        // パートナー募集はお問い合わせAPIを使用
        const contactData = {
          name: formData.contactPerson || '',
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          position: formData.department || '',
          consultationType: 'パートナー募集',
          inquiry: `パートナー募集について\n\n部署: ${formData.department}\n備考: ${formData.projectDetails || 'なし'}`,
          website: ''
        };

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || '送信に失敗しました');
        }
      } else {
        // 通常の資料請求
        const materialsData = {
          selectedServices: [serviceId],
          name: formData.name,
          company: formData.company,
          position: formData.department,
          phone: formData.phone,
          email: formData.email,
          website: '',
          consideration: formData.projectDetails || '',
          challenges: '',
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
    const isPartner = serviceId === 'partner';
    
    return (
      <div className="space-y-1">
        <div className="text-center mb-1.5">
          <h3 className="font-bold text-sm text-black">
            {isPartner ? 'パートナー申込み情報' : '基本情報の入力'}
          </h3>
          <p className="text-xs text-gray-600">
            {isPartner ? '案件詳細・ご担当者様情報をご入力ください' : 'お名前、会社名、連絡先をご入力ください'}
          </p>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            会社名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder="貴社名を入力してください"
            className="w-full px-3 py-3 sm:px-2 sm:py-1.5 border border-gray-300 rounded text-base sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary min-h-[44px] sm:min-h-auto"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            部署名 {!isPartner && <span className="text-gray-400 text-xs">(任意)</span>}
          </label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            placeholder="部署名を入力してください"
            className="w-full px-3 py-3 sm:px-2 sm:py-1.5 border border-gray-300 rounded text-base sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary min-h-[44px] sm:min-h-auto"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            ご担当者名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={isPartner ? formData.contactPerson : formData.name}
            onChange={(e) => handleInputChange(isPartner ? 'contactPerson' : 'name', e.target.value)}
            placeholder="ご担当者名を入力してください"
            className="w-full px-3 py-3 sm:px-2 sm:py-1.5 border border-gray-300 rounded text-base sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary min-h-[44px] sm:min-h-auto"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="メールアドレスを入力してください"
            className="w-full px-3 py-3 sm:px-2 sm:py-1.5 border border-gray-300 rounded text-base sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary min-h-[44px] sm:min-h-auto"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            お電話番号 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="お電話番号を入力してください"
            className="w-full px-3 py-3 sm:px-2 sm:py-1.5 border border-gray-300 rounded text-base sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary min-h-[44px] sm:min-h-auto"
            required
          />
        </div>

        {isPartner && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              備考 <span className="text-gray-400 text-xs">(任意)</span>
            </label>
            <textarea
              value={formData.projectDetails}
              onChange={(e) => handleInputChange('projectDetails', e.target.value)}
              placeholder="案件の詳細、予算感、協業形態のご希望などがあればご記入ください"
              rows={3}
              className="w-full px-3 py-3 sm:px-2 sm:py-1.5 border border-gray-300 rounded text-base sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none min-h-[80px]"
            />
          </div>
        )}

        {!isPartner && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">業界</label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-3 py-3 sm:px-2 sm:py-1.5 border border-gray-300 rounded text-base sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary min-h-[44px] sm:min-h-auto"
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
                className="w-full px-3 py-3 sm:px-2 sm:py-1.5 border border-gray-300 rounded text-base sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary min-h-[44px] sm:min-h-auto"
              >
                <option value="">選択してください</option>
                <option value="1-10名">1-10名</option>
                <option value="11-50名">11-50名</option>
                <option value="51-100名">51-100名</option>
                <option value="101-300名">101-300名</option>
                <option value="301名以上">301名以上</option>
              </select>
            </div>
          </>
        )}
      </div>
    );
  };

  if (isCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 sm:p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-black mb-2">
            {serviceId === 'partner' ? 'パートナー申込みありがとうございます！' : '資料請求ありがとうございます！'}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {serviceId === 'partner' 
              ? 'パートナー募集の詳細と協業についてメールでご連絡いたします。'
              : `${serviceName || 'サービス'}の詳細資料をメールでお送りいたします。`}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-left mb-3">
            <p className="text-xs text-blue-700">
              <strong>次のステップ：</strong><br />
              {serviceId === 'partner' ? (
                <>
                  • 24時間以内に担当者からご連絡いたします<br />
                  • 案件の詳細や協業形態についてお話しします<br />
                  • 無料相談・お見積もりも承っております
                </>
              ) : (
                <>
                  • 資料をご確認ください<br />
                  • ご不明な点がございましたらお気軽にお問い合わせください<br />
                  • 無料相談も承っております
                </>
              )}
            </p>
          </div>
          <div className="text-xs text-gray-500">
            メールが届かない場合は、お気軽にお問い合わせください。
          </div>
        </div>
      </div>
    );
  }

  const isPartnerPage = serviceId === 'partner';
  
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 sm:p-3">
      <div className="text-center mb-2">
        <div className="bg-primary text-white text-sm font-bold py-1 px-3 rounded-full inline-block mb-1">
          {isPartnerPage ? 'パートナー募集申込み' : '詳細資料ダウンロード'}
        </div>
        <h2 className="text-lg font-bold text-black mb-1">
          簡単入力で完了
        </h2>
        <p className="text-xs text-gray-600">
          {isPartnerPage ? '案件のご相談・協業のお申込み' : '詳しいサービス内容や事例をご紹介'}
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
          className={`px-8 py-3 sm:px-6 sm:py-2 rounded text-base sm:text-sm font-bold transition-colors min-h-[44px] w-full sm:w-auto ${
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
            isPartnerPage ? 'パートナー申込みをする' : '資料をダウンロードする'
          )}
        </button>
      </div>

      <div className="text-center mt-1.5">
        <p className="text-xs text-gray-500">
          {isPartnerPage ? '24時間以内にご返信いたします' : '資料はメールにて即座にお送りします'}
        </p>
      </div>
    </div>
  );
}