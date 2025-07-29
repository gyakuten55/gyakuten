import { NextRequest, NextResponse } from 'next/server';
import { sendDiagnosisNotification, sendAnalysisResult, DiagnosisFormData } from '@/lib/email';
import { SiteAnalyzer } from '@/lib/siteAnalyzer';

async function startAsyncAnalysis(url: string, email: string, formData: DiagnosisFormData) {
  try {
    console.log(`Starting async analysis for: ${url}`);
    
    const analyzer = new SiteAnalyzer();
    const analysisResult = await analyzer.analyzeSite(url);
    await analyzer.closeBrowser();

    console.log(`Analysis completed for: ${url}, Score: ${analysisResult.overallScore}`);

    // 診断結果をメール送信
    await sendAnalysisResult(email, analysisResult, {
      name: formData.name,
      company: formData.company
    });
    
    console.log(`Analysis result sent to: ${email}`);
  } catch (error) {
    console.error('Async analysis error:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: DiagnosisFormData = await request.json();

    // バリデーション
    if (!data.name || !data.email || !data.company || !data.website) {
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

    // URLの簡単なバリデーション
    try {
      new URL(data.website);
    } catch {
      return NextResponse.json(
        { error: '有効なWebサイトURLを入力してください' },
        { status: 400 }
      );
    }

    // メール送信
    await sendDiagnosisNotification(data);

    // 非同期でサイト分析を開始
    startAsyncAnalysis(data.website, data.email, data).catch(error => {
      console.error('Async analysis failed:', error);
    });

    return NextResponse.json(
      { 
        message: '診断申し込みを受け付けました。確認メールをお送りしました。',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Diagnosis form submission error:', error);
    
    return NextResponse.json(
      { 
        error: 'システムエラーが発生しました。しばらく時間をおいて再度お試しください。',
        success: false 
      },
      { status: 500 }
    );
  }
}