'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

interface TimeSlot {
  date: string;
  time: string;
}

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: ''
  });
  
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // 時間スロットの生成（9:00-18:00、30分単位）
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // 今日から30日後までの営業日を生成
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // 土日を除外
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTimeSlot = () => {
    if (selectedDate && selectedTime && selectedSlots.length < 3) {
      const newSlot = { date: selectedDate, time: selectedTime };
      
      // 重複チェック
      const isDuplicate = selectedSlots.some(
        slot => slot.date === newSlot.date && slot.time === newSlot.time
      );
      
      if (!isDuplicate) {
        setSelectedSlots(prev => [...prev, newSlot]);
        setSelectedDate('');
        setSelectedTime('');
      }
    }
  };

  const removeTimeSlot = (index: number) => {
    setSelectedSlots(prev => prev.filter((_, i) => i !== index));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSlots.length === 0) {
      alert('希望日時を最低1つ選択してください。');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timeSlots: selectedSlots
        }),
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

          <div className="max-w-4xl mx-auto px-4 pt-2 pb-6">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  無料相談予約を受け付けました！
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  ご予約いただきありがとうございます。<br />
                  1営業日以内に担当者より日程調整のご連絡をいたします。
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left mb-6">
                  <h4 className="font-semibold text-blue-800 mb-3">ご希望日時</h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    {selectedSlots.map((slot, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        第{index + 1}希望：{formatDate(slot.date)} {slot.time}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">今後の流れ</h4>
                  <ul className="text-sm text-gray-700 space-y-2 text-left">
                    <li>• 担当者よりご希望日時の調整についてご連絡いたします</li>
                    <li>• オンライン（Zoom）または対面での相談が可能です</li>
                    <li>• 相談時間は約30分〜1時間を予定しております</li>
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
                  <Link 
                    href="/contact" 
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors inline-block"
                  >
                    お問い合わせ
                  </Link>
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
                無料相談予約
              </li>
            </ol>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 pt-2 pb-6">
          <header className="mb-16">
            <h1 className="text-4xl font-bold text-black mb-8 tracking-wide">
              無料相談予約
            </h1>
            <p className="text-lg text-gray-800 leading-relaxed">
              GYAKUTENの無料相談をご予約いただけます。<br />
              ご希望の日時を最大3つまで選択し、必要事項をご入力ください。
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
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
              </div>
            </section>

            {/* 希望日時選択 */}
            <section>
              <h2 className="text-xl font-bold text-black mb-6 border-b border-gray-200 pb-2">
                希望日時選択 <span className="text-red-500">*</span>
                <span className="text-sm font-normal text-gray-600 ml-2">（最大3つまで選択可能）</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* 日付選択 */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-black mb-2">
                    希望日
                  </label>
                  <select
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">日付を選択してください</option>
                    {availableDates.map(date => (
                      <option key={date} value={date}>
                        {formatDate(date)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 時間選択 */}
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-black mb-2">
                    希望時間
                  </label>
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">時間を選択してください</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 追加ボタン */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={addTimeSlot}
                  disabled={!selectedDate || !selectedTime || selectedSlots.length >= 3}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedDate && selectedTime && selectedSlots.length < 3
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  希望日時を追加
                </button>
              </div>

              {/* 選択された日時の表示 */}
              {selectedSlots.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-black mb-4">選択された希望日時</h3>
                  <div className="space-y-3">
                    {selectedSlots.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <div>
                          <span className="font-medium text-primary">第{index + 1}希望：</span>
                          <span className="ml-2">{formatDate(slot.date)} {slot.time}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTimeSlot(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedSlots.length === 0 && (
                <p className="text-sm text-red-500">
                  希望日時を最低1つ選択してください
                </p>
              )}
            </section>

            {/* 送信ボタン */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className={`px-8 py-3 rounded-md text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : selectedSlots.length === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
                disabled={selectedSlots.length === 0 || isSubmitting}
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
                  '予約リクエストを送信'
                )}
              </button>
            </div>
          </form>

          {/* 注意事項 */}
          <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-black mb-4">ご利用について</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 営業時間：平日9:00〜18:00（土日祝日除く）</li>
              <li>• 相談時間：約30分〜1時間</li>
              <li>• オンライン（Zoom）または対面での相談が可能です</li>
              <li>• 1営業日以内に担当者よりご連絡いたします</li>
              <li>• お急ぎの場合は直接お電話ください：070-6664-4597</li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}