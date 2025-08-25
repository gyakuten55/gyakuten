import { NextRequest, NextResponse } from 'next/server';
import { sendReservationRequest } from '@/lib/email';

export interface ReservationFormData {
  name: string;
  company: string;
  email: string;
  timeSlots: Array<{
    date: string;
    time: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const data: ReservationFormData = await request.json();

    // バリデーション
    if (!data.name || !data.email || !data.company || !data.timeSlots || data.timeSlots.length === 0) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // メールアドレスの簡単なバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    // 希望日時が3つ以下かチェック
    if (data.timeSlots.length > 3) {
      return NextResponse.json(
        { error: '希望日時は最大3つまで選択可能です' },
        { status: 400 }
      );
    }

    // 各希望日時のバリデーション
    for (const slot of data.timeSlots) {
      if (!slot.date || !slot.time) {
        return NextResponse.json(
          { error: '無効な日時が選択されています' },
          { status: 400 }
        );
      }

      // 過去の日付をチェック
      const selectedDate = new Date(slot.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        return NextResponse.json(
          { error: '過去の日付は選択できません' },
          { status: 400 }
        );
      }
    }

    // メール送信
    await sendReservationRequest(data);

    return NextResponse.json(
      { 
        message: '無料相談予約を受け付けました。1営業日以内に担当者よりご連絡いたします。',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Reservation submission error:', error);
    
    return NextResponse.json(
      { 
        error: 'システムエラーが発生しました。しばらく時間をおいて再度お試しください。',
        success: false 
      },
      { status: 500 }
    );
  }
}