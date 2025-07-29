import { NextRequest, NextResponse } from 'next/server';
import { sendDiagnosisNotification, sendAnalysisResult, DiagnosisFormData } from '@/lib/email';
import { SiteAnalyzer } from '@/lib/siteAnalyzer';

async function startAsyncAnalysis(url: string, email: string, formData: DiagnosisFormData) {
  try {
    console.log(`[${new Date().toISOString()}] Starting async analysis for: ${url}`);
    
    const analyzer = new SiteAnalyzer();
    console.log(`[${new Date().toISOString()}] SiteAnalyzer initialized`);
    
    const analysisResult = await analyzer.analyzeSite(url);
    console.log(`[${new Date().toISOString()}] Analysis completed for: ${url}, Score: ${analysisResult.overallScore}`);
    
    await analyzer.closeBrowser();
    console.log(`[${new Date().toISOString()}] Browser closed`);

    // 診断結果をメール送信
    console.log(`[${new Date().toISOString()}] Sending analysis result to: ${email}`);
    await sendAnalysisResult(email, analysisResult, {
      name: formData.name,
      company: formData.company
    });
    
    console.log(`[${new Date().toISOString()}] ✅ Analysis result successfully sent to: ${email}`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ Async analysis error:`, error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // エラーの場合も管理者に通知
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      
      await transporter.sendMail({
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: process.env.ADMIN_EMAIL,
        subject: '【GYAKUTEN】診断処理エラー通知',
        text: `診断処理でエラーが発生しました。\n\nURL: ${url}\nEmail: ${email}\nError: ${error instanceof Error ? error.message : String(error)}\nStack: ${error instanceof Error ? error.stack : 'No stack'}`
      });
      
      console.log(`[${new Date().toISOString()}] Error notification sent to admin`);
    } catch (emailError) {
      console.error(`[${new Date().toISOString()}] Failed to send error notification:`, emailError);
    }
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
    console.log(`[${new Date().toISOString()}] Sending diagnosis notification to: ${data.email}`);
    await sendDiagnosisNotification(data);
    console.log(`[${new Date().toISOString()}] Diagnosis notification sent successfully`);

    // 非同期でサイト分析を開始
    console.log(`[${new Date().toISOString()}] Starting async analysis process for: ${data.website}`);
    startAsyncAnalysis(data.website, data.email, data).catch(error => {
      console.error(`[${new Date().toISOString()}] Async analysis failed:`, error);
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