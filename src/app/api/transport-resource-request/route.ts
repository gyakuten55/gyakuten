import { NextRequest, NextResponse } from 'next/server';
import { sendTransportResourceRequest } from '@/lib/email';
import path from 'path';
import fs from 'fs';

export interface TransportResourceRequestData {
  name: string;
  company: string;
  email: string;
  phone?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: TransportResourceRequestData = await request.json();

    // バリデーション
    if (!data.name || !data.email || !data.company) {
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

    // 運送管理システムのPDFファイルを取得
    const basePath = path.join(process.cwd(), 'Business_Information');
    const filename = 'GYAKUTEN運送統合管理システム.pdf';
    const filePath = path.join(basePath, filename);

    console.log(`Checking transport system PDF: ${filePath}`);

    // ファイルの存在確認
    if (!fs.existsSync(filePath)) {
      console.warn(`Transport system PDF not found: ${filePath}`);

      // ディレクトリの内容を確認
      try {
        const files = fs.readdirSync(basePath);
        console.log('Available files in directory:', files);
      } catch (err) {
        console.error('Error reading directory:', err);
      }

      return NextResponse.json(
        { error: '運送管理システムの資料が見つかりません' },
        { status: 404 }
      );
    }

    const attachment = {
      filename,
      path: filePath,
      contentType: 'application/pdf'
    };

    // メール送信
    await sendTransportResourceRequest(data, attachment);

    return NextResponse.json(
      {
        message: '資料請求を受け付けました。資料をメールでお送りいたします。',
        success: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Transport resource request submission error:', error);

    return NextResponse.json(
      {
        error: 'システムエラーが発生しました。しばらく時間をおいて再度お試しください。',
        success: false
      },
      { status: 500 }
    );
  }
}