import { NextRequest, NextResponse } from 'next/server';
import { sendDiagnosisNotification, sendAnalysisResult, DiagnosisFormData } from '@/lib/email';
import { SiteAnalyzer } from '@/lib/siteAnalyzer';
import { performAdvancedSecurityCheck, getClientIP, getSecurityMetrics } from '@/lib/advancedSecurityManager';

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
    const errorId = `ANALYSIS_ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.error(`[${new Date().toISOString()}] ❌ Async analysis error:`, {
      errorId,
      url,
      email,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error,
      timestamp: new Date().toISOString()
    });
    
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
        to: process.env.ADMIN_EMAIL || process.env.FROM_EMAIL,
        subject: `【GYAKUTEN】診断処理エラー通知 (${errorId})`,
        html: `
          <h2>診断処理エラー通知</h2>
          <p><strong>エラーID:</strong> ${errorId}</p>
          <p><strong>発生時刻:</strong> ${new Date().toLocaleString('ja-JP')}</p>
          <p><strong>対象URL:</strong> ${url}</p>
          <p><strong>送信先メール:</strong> ${email}</p>
          <p><strong>お客様情報:</strong> ${formData.name} / ${formData.company}</p>
          <p><strong>エラー内容:</strong></p>
          <pre>${error instanceof Error ? error.message : String(error)}</pre>
          ${error instanceof Error && error.stack ? `<p><strong>スタックトレース:</strong></p><pre>${error.stack}</pre>` : ''}
          <hr>
          <p><em>手動での診断実施を検討してください。</em></p>
        `
      });
      
      console.log(`[${new Date().toISOString()}] Error notification sent to admin with ID: ${errorId}`);
    } catch (emailError) {
      console.error(`[${new Date().toISOString()}] Failed to send error notification:`, emailError);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const clientIP = getClientIP(request);
    console.log(`[${new Date().toISOString()}] Diagnosis request from IP: ${clientIP}`);
    
    const data: DiagnosisFormData = await request.json();
    
    // Check timing constraints first (before advanced security)
    const timingData = data as DiagnosisFormData & { form_fill_time?: number };
    const formFillTime = timingData.form_fill_time || 0;
    if (formFillTime < 10000) {
      console.log(`[${new Date().toISOString()}] Form filled too quickly for IP: ${clientIP}, Time: ${formFillTime}ms`);
      return NextResponse.json(
        { error: 'フォームの入力が早すぎます。もう一度お試しください。' },
        { status: 400 }
      );
    }
    
    if (formFillTime > 30 * 60 * 1000) {
      console.log(`[${new Date().toISOString()}] Form filled too slowly for IP: ${clientIP}, Time: ${formFillTime}ms`);
      return NextResponse.json(
        { error: 'フォームのセッションが期限切れです。ページを更新して再度お試しください。' },
        { status: 400 }
      );
    }
    
    // Check honeypot fields
    const extendedData = data as DiagnosisFormData & { website_confirm?: string; phone_backup?: string };
    if (extendedData.website_confirm || extendedData.phone_backup) {
      console.log(`[${new Date().toISOString()}] Bot detected - honeypot triggered for IP: ${clientIP}`);
      return NextResponse.json(
        { error: 'フォームの送信に失敗しました。' },
        { status: 400 }
      );
    }
    
    // Perform advanced security checks
    const securityResult = performAdvancedSecurityCheck(request, data as unknown as Record<string, unknown>);
    
    // Handle emergency stop
    if (securityResult.emergencyStop) {
      console.error(`[${new Date().toISOString()}] 🚨 EMERGENCY STOP TRIGGERED`);
      return NextResponse.json(
        { 
          error: 'システムメンテナンス中です。しばらくしてから再度お試しください。',
          emergencyStop: true
        },
        { status: 503 }
      );
    }
    
    // Handle blocked requests
    if (!securityResult.allowed) {
      console.log(`[${new Date().toISOString()}] ⚠️ Request blocked - IP: ${clientIP}, Score: ${securityResult.riskScore}, Reason: ${securityResult.reason}`);
      
      const statusCode = securityResult.retryAfter ? 429 : 403;
      const headers: Record<string, string> = {};
      
      if (securityResult.retryAfter) {
        headers['Retry-After'] = securityResult.retryAfter.toString();
      }
      
      return NextResponse.json(
        { 
          error: securityResult.reason || 'リクエストがブロックされました。',
          retryAfter: securityResult.retryAfter,
          remainingRequests: securityResult.remainingRequests
        },
        { 
          status: statusCode,
          headers
        }
      );
    }
    
    // Log security metrics if cost alert
    if (securityResult.costAlert) {
      const metrics = getSecurityMetrics();
      console.warn(`[${new Date().toISOString()}] 💰 COST ALERT - Daily: ${metrics.dailyRequests}, Total: ${metrics.totalRequests}, Suspicious: ${metrics.suspiciousRequests}, Blocked: ${metrics.blockedRequests}`);
    }
    
    console.log(`[${new Date().toISOString()}] ✅ Security check passed - IP: ${clientIP}, Risk Score: ${securityResult.riskScore}, Remaining: ${securityResult.remainingRequests}`);

    // 厳格なバリデーション
    const validationErrors: string[] = [];

    // 必須フィールドチェック
    if (!data.name?.trim()) validationErrors.push('お名前は必須です');
    if (!data.email?.trim()) validationErrors.push('メールアドレスは必須です');
    if (!data.company?.trim()) validationErrors.push('会社名は必須です');
    if (!data.website?.trim()) validationErrors.push('WebサイトURLは必須です');
    if (!data.phone?.trim()) validationErrors.push('電話番号は必須です');

    // メールアドレスの詳細バリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      validationErrors.push('有効なメールアドレスを入力してください');
    }

    // 電話番号のバリデーション（日本の形式）
    if (data.phone) {
      const phoneRegex = /^(\d{2,4}-\d{2,4}-\d{4}|\d{10,11})$/;
      const cleanPhone = data.phone.replace(/[\s-]/g, '');
      const isValidPhone = phoneRegex.test(data.phone) || 
        (cleanPhone.length >= 10 && cleanPhone.length <= 11 && /^\d+$/.test(cleanPhone));
      
      if (!isValidPhone) {
        validationErrors.push('有効な電話番号を入力してください（例: 03-1234-5678）');
      }
    }

    // URLの詳細バリデーション
    if (data.website) {
      try {
        const url = new URL(data.website);
        if (!url.protocol.startsWith('http')) {
          validationErrors.push('WebサイトURLはhttp://またはhttps://で開始する必要があります');
        }
      } catch {
        validationErrors.push('有効なWebサイトURLを入力してください');
      }
    }

    // 名前の長さチェック
    if (data.name && (data.name.length < 2 || data.name.length > 50)) {
      validationErrors.push('お名前は2文字以上50文字以内で入力してください');
    }

    // 会社名の長さチェック
    if (data.company && (data.company.length < 2 || data.company.length > 100)) {
      validationErrors.push('会社名は2文字以上100文字以内で入力してください');
    }

    if (validationErrors.length > 0) {
      console.log(`[${new Date().toISOString()}] ❌ Validation failed for IP: ${clientIP}, Errors: ${validationErrors.join(', ')}`);
      return NextResponse.json(
        { 
          error: '入力に不備があります',
          details: validationErrors 
        },
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
    const clientIP = getClientIP(request);
    const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.error(`[${new Date().toISOString()}] ❌ Diagnosis form submission error:`, {
      errorId,
      clientIP,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error,
      timestamp: new Date().toISOString()
    });
    
    // Send error notification to admin for critical errors
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
        to: process.env.ADMIN_EMAIL || process.env.FROM_EMAIL,
        subject: `【GYAKUTEN】診断フォームでエラーが発生しました (${errorId})`,
        html: `
          <h2>診断フォームエラー通知</h2>
          <p><strong>エラーID:</strong> ${errorId}</p>
          <p><strong>発生時刻:</strong> ${new Date().toLocaleString('ja-JP')}</p>
          <p><strong>クライアントIP:</strong> ${clientIP}</p>
          <p><strong>エラー内容:</strong></p>
          <pre>${error instanceof Error ? error.message : String(error)}</pre>
          ${error instanceof Error && error.stack ? `<p><strong>スタックトレース:</strong></p><pre>${error.stack}</pre>` : ''}
        `
      });
    } catch (emailError) {
      console.error(`[${new Date().toISOString()}] Failed to send error notification:`, emailError);
    }
    
    return NextResponse.json(
      { 
        error: 'システムエラーが発生しました。しばらく時間をおいて再度お試しください。',
        errorId: errorId,
        success: false 
      },
      { status: 500 }
    );
  }
}