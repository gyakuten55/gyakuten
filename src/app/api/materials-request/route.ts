import { NextRequest, NextResponse } from 'next/server';
import { sendMaterialsRequest } from '@/lib/email';
import path from 'path';
import fs from 'fs';

export interface MaterialsRequestData {
  selectedServices: string[];
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  website: string;
  consideration: string;
  challenges: string;
}

// サービスIDとPDFファイル名のマッピング
const serviceFileMap: Record<string, string> = {
  'llmo-diagnosis': 'LLMO診断サービス_説明資料.pdf',
  'web-llmo': 'LLMOウェブ制作サービス_説明資料.pdf',
  'write-llmo': 'LLMOライティングサービス_説明資料.pdf',
  'llmo-consulting': 'LLMOコンサルティングサービス_説明資料.pdf',
  'dx': 'GYAKUTEN_システム開発サービス_説明資料.pdf',
  'bootcamp': 'GYAKUTEN_BOOTCAM_説明資料.pdf'
};

export async function POST(request: NextRequest) {
  try {
    const data: MaterialsRequestData = await request.json();

    // バリデーション
    if (!data.name || !data.email || !data.company || data.selectedServices.length === 0) {
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

    // 選択されたサービスに対応するPDFファイルを取得
    const basePath = '/Users/aoi/Desktop/GYAKUTEN_HP/gyakuten-hp/Business_Information';
    const attachments: Array<{
      filename: string;
      path: string;
      contentType: string;
    }> = [];

    for (const serviceId of data.selectedServices) {
      const filename = serviceFileMap[serviceId];
      if (filename) {
        const filePath = path.join(basePath, filename);
        
        // ファイルの存在確認
        if (fs.existsSync(filePath)) {
          attachments.push({
            filename,
            path: filePath,
            contentType: 'application/pdf'
          });
        } else {
          console.warn(`PDF file not found: ${filePath}`);
        }
      }
    }

    if (attachments.length === 0) {
      return NextResponse.json(
        { error: '選択されたサービスの資料が見つかりません' },
        { status: 404 }
      );
    }

    // メール送信
    await sendMaterialsRequest(data, attachments);

    return NextResponse.json(
      { 
        message: '資料請求を受け付けました。資料をメールでお送りいたします。',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Materials request submission error:', error);
    
    return NextResponse.json(
      { 
        error: 'システムエラーが発生しました。しばらく時間をおいて再度お試しください。',
        success: false 
      },
      { status: 500 }
    );
  }
}