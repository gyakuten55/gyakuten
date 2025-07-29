import { NextRequest, NextResponse } from 'next/server';
import { sendContactInquiry } from '@/lib/email';

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  position: string;
  phone: string;
  consultationType: string;
  inquiry: string;
  website: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // バリデーション
    if (!data.name || !data.email || !data.consultationType || !data.inquiry) {
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

    // メール送信
    await sendContactInquiry(data);

    return NextResponse.json(
      { 
        message: 'お問い合わせを受け付けました。1営業日以内にご返信いたします。',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return NextResponse.json(
      { 
        error: 'システムエラーが発生しました。しばらく時間をおいて再度お試しください。',
        success: false 
      },
      { status: 500 }
    );
  }
}