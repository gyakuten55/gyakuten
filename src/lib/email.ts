import nodemailer from 'nodemailer';
import { SiteAnalysisResult } from './siteAnalyzer';
import { generateHtmlReport } from './reportGenerator';

export interface DiagnosisFormData {
  name: string;
  email: string;
  company: string;
  website: string;
  phone: string;
  industry: string;
  employeeCount: string;
  message: string;
}

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

export interface ReservationFormData {
  name: string;
  company: string;
  email: string;
  timeSlots: Array<{
    date: string;
    time: string;
  }>;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendDiagnosisNotification(data: DiagnosisFormData) {
  const userMailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: data.email,
    subject: '【GYAKUTEN】AI検索時代対応の無料診断を開始いたします',
    html: `
      <div style="font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- ヘッダー -->
        <div style="background: linear-gradient(135deg, #8f2c34 0%, #a53d45 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: bold;">
            GYAKUTEN LLMO診断
          </h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">
            AI検索時代に対応したWebサイト最適化診断
          </p>
        </div>

        <!-- メインコンテンツ -->
        <div style="padding: 30px 20px;">
          <div style="background-color: #f8f9fa; border-left: 4px solid #8f2c34; padding: 20px; margin-bottom: 30px;">
            <h2 style="color: #8f2c34; font-size: 20px; margin: 0 0 10px 0;">
              ${data.name}様、お申し込みありがとうございます！
            </h2>
            <p style="margin: 0; color: #333333; line-height: 1.6;">
              この度は、GYAKUTEN LLMO診断にお申し込みいただき、誠にありがとうございます。<br>
              <strong>すべての逆境に、最高の逆転劇を。</strong>
            </p>
          </div>

          <!-- 申し込み内容確認 -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #8f2c34; padding-bottom: 5px;">
              お申し込み内容確認
            </h3>
            <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa;">
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e9ecef; font-weight: bold; width: 30%;">診断対象サイト</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">
                  <a href="${data.website}" target="_blank" style="color: #8f2c34; text-decoration: none;">${data.website}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e9ecef; font-weight: bold;">会社名</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${data.company}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e9ecef; font-weight: bold;">業界</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${data.industry || '未選択'}</td>
              </tr>
            </table>
          </div>

          <!-- 診断開始の流れ -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333333; font-size: 18px; margin-bottom: 20px; border-bottom: 2px solid #8f2c34; padding-bottom: 5px;">
              診断開始から結果送付までの流れ
            </h3>
            
            <div style="display: flex; flex-direction: column; gap: 20px;">
              <div style="display: flex; align-items: flex-start; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <div style="background-color: #8f2c34; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</div>
                <div>
                  <h4 style="margin: 0 0 5px 0; color: #333333; font-size: 16px;">自動診断実行（開始済み）</h4>
                  <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5;">
                    ご入力いただいたWebサイトの自動診断を実行中です。AI検索時代に最適化された多角的な分析を行います。
                  </p>
                </div>
              </div>

              <div style="display: flex; align-items: flex-start; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <div style="background-color: #8f2c34; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</div>
                <div>
                  <h4 style="margin: 0 0 5px 0; color: #333333; font-size: 16px;">独自アルゴリズムによる解析</h4>
                  <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5;">
                    完全自動でありながら、LLMO最適化の専門知識を組み込んだ独自のロジックで詳細な解析を実行します。
                  </p>
                </div>
              </div>

              <div style="display: flex; align-items: flex-start; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <div style="background-color: #8f2c34; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</div>
                <div>
                  <h4 style="margin: 0 0 5px 0; color: #333333; font-size: 16px;">診断レポート作成</h4>
                  <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5;">
                    診断結果を分かりやすいPDFレポートで作成。具体的な改善提案も含まれます。
                  </p>
                </div>
              </div>

              <div style="display: flex; align-items: flex-start; padding: 15px; background-color: #e8f5e8; border-radius: 8px; border: 2px solid #28a745;">
                <div style="background-color: #28a745; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">4</div>
                <div>
                  <h4 style="margin: 0 0 5px 0; color: #333333; font-size: 16px;">結果送付（最短即日）</h4>
                  <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5;">
                    <strong>このメールアドレス宛に診断結果をお送りします。</strong>お見逃しのないようご注意ください。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 追加サービスのご案内 -->
          <div style="margin-bottom: 30px; background-color: #e3f2fd; border: 1px solid #bbdefb; border-radius: 8px; padding: 20px;">
            <h3 style="color: #1976d2; font-size: 18px; margin-bottom: 15px;">
              診断後の改善サポートもお任せください
            </h3>
            <p style="margin-bottom: 15px; color: #333333; line-height: 1.6;">
              診断結果をもとに、さらなる最適化をご希望の場合は以下のサービスもご利用いただけます：
            </p>
            <ul style="margin: 0; padding-left: 20px; color: #333333; line-height: 1.8;">
              <li><strong>GYAKUTEN LLMO ウェブ制作</strong>：AI最適化されたサイト制作・リニューアル</li>
              <li><strong>GYAKUTEN LLMO ライティング</strong>：AIに選ばれるコンテンツライティング</li>
              <li><strong>GYAKUTEN LLMO コンサル</strong>：包括的なLLMO戦略コンサルティング</li>
            </ul>
          </div>

          <!-- よくある質問 -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #8f2c34; padding-bottom: 5px;">
              よくあるご質問
            </h3>
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
              <div style="margin-bottom: 15px;">
                <strong style="color: #8f2c34;">Q. 診断にはどれくらい時間がかかりますか？</strong><br>
                <span style="color: #666666;">A. 最短即日で結果をお送りします。サイトの規模により多少前後する場合があります。</span>
              </div>
              <div>
                <strong style="color: #8f2c34;">Q. 診断結果はどのような形で届きますか？</strong><br>
                <span style="color: #666666;">A. 分かりやすいPDFレポート形式でお送りします。具体的な改善提案も含まれています。</span>
              </div>
            </div>
          </div>
        </div>

        <!-- フッター -->
        <div style="background-color: #333333; color: #ffffff; padding: 30px 20px; text-align: center;">
          <div style="margin-bottom: 20px;">
            <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 10px 0;">合同会社GYAKUTEN</h3>
            <p style="margin: 0; opacity: 0.9;">すべての逆境に、最高の逆転劇を。</p>
          </div>
          
          <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 20px; flex-wrap: wrap;">
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">メール</strong><br>
              <a href="mailto:info@gyaku-ten.jp" style="color: #ffffff; text-decoration: none;">info@gyaku-ten.jp</a>
            </div>
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">電話</strong><br>
              <a href="tel:070-6664-4597" style="color: #ffffff; text-decoration: none;">070-6664-4597</a>
            </div>
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">サイト</strong><br>
              <a href="https://gyaku-ten.jp" target="_blank" style="color: #ffffff; text-decoration: none;">gyaku-ten.jp</a>
            </div>
          </div>
          
          <p style="margin: 0; font-size: 12px; opacity: 0.7;">
            このメールは自動送信されています。ご不明な点がございましたらお気軽にお問い合わせください。
          </p>
        </div>
      </div>
    `,
  };

  // 会社宛の通知メール
  const adminMailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: process.env.FROM_EMAIL,
    subject: '【GYAKUTEN】新規LLMO診断申し込みがありました',
    html: `
      <div style="font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8f2c34;">新規LLMO診断申し込み</h2>
        <p>以下のお客様からLLMO診断の申し込みがありました：</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">氏名</td><td style="border: 1px solid #ddd; padding: 8px;">${data.name}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">メール</td><td style="border: 1px solid #ddd; padding: 8px;">${data.email}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">会社名</td><td style="border: 1px solid #ddd; padding: 8px;">${data.company}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">診断対象サイト</td><td style="border: 1px solid #ddd; padding: 8px;"><a href="${data.website}" target="_blank">${data.website}</a></td></tr>
          ${data.phone ? `<tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">電話</td><td style="border: 1px solid #ddd; padding: 8px;">${data.phone}</td></tr>` : ''}
          ${data.industry ? `<tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">業界</td><td style="border: 1px solid #ddd; padding: 8px;">${data.industry}</td></tr>` : ''}
          ${data.employeeCount ? `<tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">従業員数</td><td style="border: 1px solid #ddd; padding: 8px;">${data.employeeCount}</td></tr>` : ''}
        </table>
        
        ${data.message ? `
        <h3 style="color: #8f2c34;">課題・要望:</h3>
        <p style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${data.message}</p>
        ` : ''}
        
        <p style="margin-top: 20px; padding: 10px; background: #e3f2fd; border-radius: 5px;">
          <strong>自動診断が開始されました。</strong><br>
          診断完了後、結果がお客様に自動送信されます。
        </p>
      </div>
    `
  };

  try {
    // お客様宛と会社宛の両方を送信
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);
    
    console.log(`Diagnosis application received from: ${data.email} for ${data.website}`);
    console.log(`Admin notification sent for diagnosis request from: ${data.email}`);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('メール送信に失敗しました');
  }
}

export async function sendAnalysisResult(email: string, analysis: SiteAnalysisResult, formData?: DiagnosisFormData) {
  const getScoreGrade = (score: number): string => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  const htmlReport = generateHtmlReport(analysis);

  const userMailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: `【GYAKUTEN】LLMO診断結果をお送りします（スコア: ${analysis.overallScore}点・グレード${getScoreGrade(analysis.overallScore)}）`,
    html: `
      <div style="font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- ヘッダー -->
        <div style="background: linear-gradient(135deg, #8f2c34 0%, #a53d45 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: bold;">
            GYAKUTEN LLMO診断結果
          </h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">
            診断が完了いたしました
          </p>
        </div>

        <!-- メインコンテンツ -->
        <div style="padding: 30px 20px;">
          <div style="background-color: #f8f9fa; border-left: 4px solid #8f2c34; padding: 20px; margin-bottom: 30px;">
            <h2 style="color: #8f2c34; font-size: 20px; margin: 0 0 10px 0;">
              ${formData?.name || 'お客'}様、診断が完了いたしました
            </h2>
            <p style="margin: 0; color: #333333; line-height: 1.6;">
              GYAKUTEN LLMO診断の結果をお送りいたします。<br>
              <strong>すべての逆境に、最高の逆転劇を。</strong>
            </p>
          </div>

          <!-- 診断結果サマリー -->
          <div style="text-align: center; margin-bottom: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
            <h3 style="color: #333333; margin-bottom: 20px;">診断結果サマリー</h3>
            
            <div style="display: inline-block; width: 100px; height: 100px; border: 6px solid #8f2c34; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; background: white;">
              <span style="font-size: 28px; font-weight: bold; color: #8f2c34;">${analysis.overallScore}</span>
            </div>
            
            <p style="margin: 0; font-size: 18px; font-weight: bold; color: #8f2c34;">
              グレード: ${getScoreGrade(analysis.overallScore)} （100点満点中 ${analysis.overallScore}点）
            </p>
            
            <table style="width: 100%; margin-top: 20px; border-collapse: collapse; background-color: white;">
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6; background-color: #e9ecef; font-weight: bold;">診断対象サイト</td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">
                  <a href="${analysis.url}" target="_blank" style="color: #8f2c34; text-decoration: none;">${analysis.url}</a>
                </td>
              </tr>
              ${formData?.company ? `
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6; background-color: #e9ecef; font-weight: bold;">会社名</td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${formData.company}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <!-- スコア内訳 -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #8f2c34; padding-bottom: 5px;">
              カテゴリ別スコア
            </h3>
            
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 15px;">
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #dee2e6;">
                <span>見出し構造</span>
                <span><strong>${analysis.scoreBreakdown.headingStructure.score}/${analysis.scoreBreakdown.headingStructure.maxScore}点</strong></span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #dee2e6;">
                <span>技術的SEO</span>
                <span><strong>${analysis.scoreBreakdown.technicalSeo.score}/${analysis.scoreBreakdown.technicalSeo.maxScore}点</strong></span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #dee2e6;">
                <span>パフォーマンス</span>
                <span><strong>${analysis.scoreBreakdown.performance.score}/${analysis.scoreBreakdown.performance.maxScore}点</strong></span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #dee2e6;">
                <span>コンテンツ品質</span>
                <span><strong>${analysis.scoreBreakdown.contentQuality.score}/${analysis.scoreBreakdown.contentQuality.maxScore}点</strong></span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #dee2e6;">
                <span>モバイル最適化</span>
                <span><strong>${analysis.scoreBreakdown.mobileOptimization.score}/${analysis.scoreBreakdown.mobileOptimization.maxScore}点</strong></span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                <span>構造化データ</span>
                <span><strong>${analysis.scoreBreakdown.structuredData.score}/${analysis.scoreBreakdown.structuredData.maxScore}点</strong></span>
              </div>
            </div>
          </div>

          <!-- 主要な改善提案 -->
          <div style="margin-bottom: 30px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px;">
            <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px;">
              主要な改善提案（上位3項目）
            </h3>
            <ul style="margin: 0; padding-left: 20px; color: #333333; line-height: 1.8;">
              ${analysis.recommendations.slice(0, 3).map(rec => `<li style="margin-bottom: 8px;">${rec}</li>`).join('')}
            </ul>
          </div>

          <!-- 詳細レポートのご案内 -->
          <div style="margin-bottom: 30px; background-color: #e3f2fd; border: 1px solid #bbdefb; border-radius: 8px; padding: 20px;">
            <h3 style="color: #1976d2; font-size: 18px; margin-bottom: 15px;">
              詳細診断レポート
            </h3>
            <p style="margin-bottom: 15px; color: #333333; line-height: 1.6;">
              添付のHTMLファイルには、さらに詳細な診断結果と具体的な改善提案が含まれています。<br>
              ブラウザで開いてご確認ください。
            </p>
          </div>

          <!-- 追加サービスのご案内 -->
          <div style="margin-bottom: 30px; background-color: #e3f2fd; border: 1px solid #bbdefb; border-radius: 8px; padding: 20px;">
            <h3 style="color: #1976d2; font-size: 18px; margin-bottom: 15px;">
              診断後の改善サポートもお任せください
            </h3>
            <p style="margin-bottom: 15px; color: #333333; line-height: 1.6;">
              診断結果をもとに、さらなる最適化をご希望の場合は以下のサービスもご利用いただけます：
            </p>
            <ul style="margin: 0; padding-left: 20px; color: #333333; line-height: 1.8;">
              <li><strong>GYAKUTEN LLMO ウェブ制作</strong>：AI最適化されたサイト制作・リニューアル</li>
              <li><strong>GYAKUTEN LLMO ライティング</strong>：AIに選ばれるコンテンツライティング</li>
              <li><strong>GYAKUTEN LLMO コンサル</strong>：包括的なLLMO戦略コンサルティング</li>
            </ul>
            <p style="margin-top: 15px; color: #333333;">
              <strong>ご相談・お見積もりは無料です。</strong>お気軽にお問い合わせください。
            </p>
          </div>
        </div>

        <!-- フッター -->
        <div style="background-color: #333333; color: #ffffff; padding: 30px 20px; text-align: center;">
          <div style="margin-bottom: 20px;">
            <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 10px 0;">合同会社GYAKUTEN</h3>
            <p style="margin: 0; opacity: 0.9;">すべての逆境に、最高の逆転劇を。</p>
          </div>
          
          <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 20px; flex-wrap: wrap;">
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">メール</strong><br>
              <a href="mailto:info@gyaku-ten.jp" style="color: #ffffff; text-decoration: none;">info@gyaku-ten.jp</a>
            </div>
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">電話</strong><br>
              <a href="tel:070-6664-4597" style="color: #ffffff; text-decoration: none;">070-6664-4597</a>
            </div>
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">サイト</strong><br>
              <a href="https://gyaku-ten.jp" target="_blank" style="color: #ffffff; text-decoration: none;">gyaku-ten.jp</a>
            </div>
          </div>
          
          <p style="margin: 0; font-size: 12px; opacity: 0.7;">
            このメールは自動送信されています。ご不明な点がございましたらお気軽にお問い合わせください。
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `LLMO診断レポート_${analysis.url.replace(/https?:\/\//, '').replace(/[^\w\-]/g, '_')}_${new Date().toISOString().split('T')[0]}.html`,
        content: htmlReport,
        contentType: 'text/html'
      }
    ]
  };

  // 会社宛の診断完了通知メール（詳細版）
  const adminResultMailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: process.env.ADMIN_EMAIL || process.env.FROM_EMAIL,
    subject: `【GYAKUTEN】LLMO診断完了・顧客対応用データ（${formData?.company || 'N/A'}・スコア: ${analysis.overallScore}点）`,
    html: `
      <div style="font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif; max-width: 800px; margin: 0 auto;">
        <!-- ヘッダー -->
        <div style="background: linear-gradient(135deg, #8f2c34 0%, #a53d45 100%); padding: 20px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0;">🎯 LLMO診断完了通知</h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">顧客対応・フォローアップ用データ</p>
        </div>

        <!-- 顧客情報セクション -->
        <div style="background-color: #f8f9fa; border-left: 4px solid #8f2c34; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #8f2c34; margin: 0 0 15px 0;">📋 顧客情報</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="border: 1px solid #ddd; padding: 10px; background: #e9ecef; font-weight: bold; width: 30%;">氏名</td><td style="border: 1px solid #ddd; padding: 10px;">${formData?.name || 'N/A'}</td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 10px; background: #e9ecef; font-weight: bold;">会社名</td><td style="border: 1px solid #ddd; padding: 10px;">${formData?.company || 'N/A'}</td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 10px; background: #e9ecef; font-weight: bold;">メールアドレス</td><td style="border: 1px solid #ddd; padding: 10px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 10px; background: #e9ecef; font-weight: bold;">電話番号</td><td style="border: 1px solid #ddd; padding: 10px;">${formData?.phone || 'N/A'}</td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 10px; background: #e9ecef; font-weight: bold;">業界</td><td style="border: 1px solid #ddd; padding: 10px;">${formData?.industry || '未選択'}</td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 10px; background: #e9ecef; font-weight: bold;">従業員数</td><td style="border: 1px solid #ddd; padding: 10px;">${formData?.employeeCount || '未選択'}</td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 10px; background: #e9ecef; font-weight: bold;">診断対象サイト</td><td style="border: 1px solid #ddd; padding: 10px;"><a href="${analysis.url}" target="_blank">${analysis.url}</a></td></tr>
          </table>
          ${formData?.message ? `
          <div style="margin-top: 15px; padding: 10px; background: white; border-radius: 5px;">
            <strong>お客様からの課題・要望:</strong><br>
            <p style="margin: 5px 0 0 0; font-style: italic;">"${formData.message}"</p>
          </div>
          ` : ''}
        </div>

        <!-- 診断結果サマリー -->
        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #8f2c34; margin: 0 0 15px 0;">📊 診断結果サマリー</h2>
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="display: inline-block; width: 80px; height: 80px; border: 4px solid #8f2c34; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: white; margin-right: 20px;">
              <span style="font-size: 24px; font-weight: bold; color: #8f2c34;">${analysis.overallScore}</span>
            </div>
            <div style="display: inline-block; vertical-align: top; margin-top: 10px;">
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #8f2c34;">グレード: ${getScoreGrade(analysis.overallScore)}</p>
              <p style="margin: 5px 0 0 0; color: #333;">診断完了時刻: ${new Date().toLocaleString('ja-JP')}</p>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px;">
            <div style="background: white; padding: 10px; border-radius: 5px; text-align: center;">
              <strong>見出し構造</strong><br>${analysis.scoreBreakdown.headingStructure.score}/${analysis.scoreBreakdown.headingStructure.maxScore}点
            </div>
            <div style="background: white; padding: 10px; border-radius: 5px; text-align: center;">
              <strong>技術的SEO</strong><br>${analysis.scoreBreakdown.technicalSeo.score}/${analysis.scoreBreakdown.technicalSeo.maxScore}点
            </div>
            <div style="background: white; padding: 10px; border-radius: 5px; text-align: center;">
              <strong>パフォーマンス</strong><br>${analysis.scoreBreakdown.performance.score}/${analysis.scoreBreakdown.performance.maxScore}点
            </div>
            <div style="background: white; padding: 10px; border-radius: 5px; text-align: center;">
              <strong>コンテンツ品質</strong><br>${analysis.scoreBreakdown.contentQuality.score}/${analysis.scoreBreakdown.contentQuality.maxScore}点
            </div>
            <div style="background: white; padding: 10px; border-radius: 5px; text-align: center;">
              <strong>モバイル最適化</strong><br>${analysis.scoreBreakdown.mobileOptimization.score}/${analysis.scoreBreakdown.mobileOptimization.maxScore}点
            </div>
            <div style="background: white; padding: 10px; border-radius: 5px; text-align: center;">
              <strong>構造化データ</strong><br>${analysis.scoreBreakdown.structuredData.score}/${analysis.scoreBreakdown.structuredData.maxScore}点
            </div>
          </div>
        </div>

        <!-- 主要改善提案（営業用） -->
        <div style="background-color: #e3f2fd; border: 1px solid #bbdefb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #1976d2; margin: 0 0 15px 0;">💡 主要改善提案（営業・フォローアップ用）</h2>
          <ol style="margin: 0; padding-left: 20px; line-height: 1.8;">
            ${analysis.recommendations.slice(0, 5).map((rec, index) => `
              <li style="margin-bottom: 10px;">
                <strong>提案${index + 1}:</strong> ${rec}
              </li>
            `).join('')}
          </ol>
        </div>

        <!-- フォローアップ推奨アクション -->
        <div style="background-color: #f3e5f5; border: 1px solid #ce93d8; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #7b1fa2; margin: 0 0 15px 0;">🎯 推奨フォローアップアクション</h2>
          <div style="background: white; padding: 15px; border-radius: 5px;">
            ${analysis.overallScore < 60 ? `
            <p style="margin-bottom: 10px;"><strong>🔴 緊急度：高</strong></p>
            <ul style="margin: 0; padding-left: 20px;">
              <li><strong>GYAKUTEN Web LLMO</strong> - サイト全面改修提案（改善余地が大きい）</li>
              <li><strong>GYAKUTEN LLMO Consulting</strong> - 包括的戦略コンサルティング</li>
              <li>無料相談の積極的な提案を推奨</li>
            </ul>
            ` : analysis.overallScore < 80 ? `
            <p style="margin-bottom: 10px;"><strong>🟡 緊急度：中</strong></p>
            <ul style="margin: 0; padding-left: 20px;">
              <li><strong>GYAKUTEN Write LLMO</strong> - コンテンツ改善提案</li>
              <li><strong>GYAKUTEN LLMO診断</strong> - 部分的改修提案</li>
              <li>具体的な改善点の詳細説明を実施</li>
            </ul>
            ` : `
            <p style="margin-bottom: 10px;"><strong>🟢 緊急度：低</strong></p>
            <ul style="margin: 0; padding-left: 20px;">
              <li><strong>保守・運用サービス</strong> - 現状維持サポート</li>
              <li><strong>GYAKUTEN DX</strong> - さらなる機能拡張提案</li>
              <li>長期的なパートナーシップ提案</li>
            </ul>
            `}
          </div>
        </div>

        <!-- 顧客対応メモ -->
        <div style="background-color: #fff8e1; border: 1px solid #ffcc02; border-radius: 8px; padding: 20px;">
          <h2 style="color: #f57c00; margin: 0 0 15px 0;">📝 顧客対応時の参考情報</h2>
          <div style="background: white; padding: 15px; border-radius: 5px;">
            <p style="margin: 0 0 10px 0;"><strong>✅ 診断結果送信完了:</strong> ${new Date().toLocaleString('ja-JP')}</p>
            <p style="margin: 0 0 10px 0;"><strong>📧 顧客連絡先:</strong> ${email} / ${formData?.phone || 'N/A'}</p>
            <p style="margin: 0 0 10px 0;"><strong>🏢 企業規模:</strong> ${formData?.employeeCount || '不明'}・${formData?.industry || '業界不明'}</p>
            <p style="margin: 0;"><strong>📋 HTMLレポート:</strong> 添付ファイルに同梱（顧客にも同じものを送信済み）</p>
          </div>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `【管理者用】LLMO診断レポート_${formData?.company?.replace(/[^\w\s]/g, '') || 'NoCompany'}_${new Date().toISOString().split('T')[0]}.html`,
        content: htmlReport,
        contentType: 'text/html'
      }
    ]
  };

  try {
    console.log(`[${new Date().toISOString()}] Preparing to send analysis result emails...`);
    console.log(`[${new Date().toISOString()}] User email: ${email}`);
    console.log(`[${new Date().toISOString()}] Admin email: ${process.env.FROM_EMAIL}`);
    
    // お客様宛と会社宛の両方を送信
    console.log(`[${new Date().toISOString()}] Sending emails...`);
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminResultMailOptions)
    ]);
    
    console.log(`[${new Date().toISOString()}] ✅ Analysis result sent to: ${email} (Score: ${analysis.overallScore})`);
    console.log(`[${new Date().toISOString()}] ✅ Admin result notification sent for: ${email}`);
    return { success: true };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ Analysis result email sending failed:`, error);
    console.error('Email error details:', error instanceof Error ? error.stack : 'No stack trace');
    throw new Error(`診断結果メール送信に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function sendMaterialsRequest(
  data: MaterialsRequestData, 
  attachments: Array<{ filename: string; path: string; contentType: string }>
) {
  const serviceNames: Record<string, string> = {
    'llmo-diagnosis': 'GYAKUTEN LLMO診断',
    'web-llmo': 'GYAKUTEN LLMO ウェブ制作', 
    'write-llmo': 'GYAKUTEN LLMO ライティング',
    'llmo-consulting': 'GYAKUTEN LLMO コンサル',
    'dx': 'GYAKUTEN システム開発',
    'bootcamp': '逆転ブートキャンプ',
    'quick-support': 'GYAKUTENクイックサポート'
  };

  const selectedServiceNames = data.selectedServices.map(id => serviceNames[id] || id);

  const userMailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: data.email,
    subject: '【GYAKUTEN】サービス資料をお送りいたします',
    html: `
      <div style="font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- ヘッダー -->
        <div style="background: linear-gradient(135deg, #8f2c34 0%, #a53d45 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: bold;">
            GYAKUTEN サービス資料
          </h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">
            ご請求いただいた資料をお送りいたします
          </p>
        </div>

        <!-- メインコンテンツ -->
        <div style="padding: 30px 20px;">
          <div style="background-color: #f8f9fa; border-left: 4px solid #8f2c34; padding: 20px; margin-bottom: 30px;">
            <h2 style="color: #8f2c34; font-size: 20px; margin: 0 0 10px 0;">
              ${data.name}様、資料をお送りいたします
            </h2>
            <p style="margin: 0; color: #333333; line-height: 1.6;">
              この度は、GYAKUTENのサービス資料をご請求いただき、誠にありがとうございます。<br>
              <strong>すべての逆境に、最高の逆転劇を。</strong>
            </p>
          </div>

          <!-- 請求内容確認 -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #8f2c34; padding-bottom: 5px;">
              ご請求いただいた資料
            </h3>
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
              <ul style="margin: 0; padding-left: 20px; color: #333333; line-height: 1.8;">
                ${selectedServiceNames.map(name => `<li><strong>${name}</strong> サービス説明資料</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- お客様情報 -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #8f2c34; padding-bottom: 5px;">
              お客様情報
            </h3>
            <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa;">
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e9ecef; font-weight: bold; width: 30%;">会社名</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${data.company}</td>
              </tr>
              ${data.position ? `
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e9ecef; font-weight: bold;">役職</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${data.position}</td>
              </tr>
              ` : ''}
              ${data.website ? `
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e9ecef; font-weight: bold;">WEBサイト</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">
                  <a href="${data.website}" target="_blank" style="color: #8f2c34; text-decoration: none;">${data.website}</a>
                </td>
              </tr>
              ` : ''}
              ${data.consideration ? `
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e9ecef; font-weight: bold;">検討状況</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${data.consideration}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <!-- 次のステップ -->
          <div style="margin-bottom: 30px; background-color: #e3f2fd; border: 1px solid #bbdefb; border-radius: 8px; padding: 20px;">
            <h3 style="color: #1976d2; font-size: 18px; margin-bottom: 15px;">
              次のステップ
            </h3>
            <p style="margin-bottom: 15px; color: #333333; line-height: 1.6;">
              資料をご確認いただき、ご不明な点やご相談がございましたら、お気軽にお問い合わせください。
            </p>
            <ul style="margin: 0; padding-left: 20px; color: #333333; line-height: 1.8;">
              <li><strong>無料相談</strong>：サービス内容について詳しくご説明いたします</li>
              <li><strong>お見積もり</strong>：具体的なご要望に基づいたお見積もりを作成</li>
              <li><strong>デモンストレーション</strong>：実際のサービス内容をご体験いただけます</li>
            </ul>
          </div>

        </div>

        <!-- フッター -->
        <div style="background-color: #333333; color: #ffffff; padding: 30px 20px; text-align: center;">
          <div style="margin-bottom: 20px;">
            <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 10px 0;">合同会社GYAKUTEN</h3>
            <p style="margin: 0; opacity: 0.9;">すべての逆境に、最高の逆転劇を。</p>
          </div>
          
          <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 20px; flex-wrap: wrap;">
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">メール</strong><br>
              <a href="mailto:info@gyaku-ten.jp" style="color: #ffffff; text-decoration: none;">info@gyaku-ten.jp</a>
            </div>
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">電話</strong><br>
              <a href="tel:070-6664-4597" style="color: #ffffff; text-decoration: none;">070-6664-4597</a>
            </div>
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">サイト</strong><br>
              <a href="https://gyaku-ten.jp" target="_blank" style="color: #ffffff; text-decoration: none;">gyaku-ten.jp</a>
            </div>
          </div>
          
          <p style="margin: 0; font-size: 12px; opacity: 0.7;">
            このメールは自動送信されています。ご不明な点がございましたらお気軽にお問い合わせください。
          </p>
        </div>
      </div>
    `,
    attachments: attachments.map(attachment => ({
      filename: attachment.filename,
      path: attachment.path,
      contentType: attachment.contentType
    }))
  };

  // 会社宛の通知メール
  const adminMailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: process.env.FROM_EMAIL,
    subject: '【GYAKUTEN】新規資料請求がありました',
    html: `
      <div style="font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8f2c34;">新規資料請求</h2>
        <p>以下のお客様から資料請求がありました：</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">氏名</td><td style="border: 1px solid #ddd; padding: 8px;">${data.name}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">メール</td><td style="border: 1px solid #ddd; padding: 8px;">${data.email}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">会社名</td><td style="border: 1px solid #ddd; padding: 8px;">${data.company}</td></tr>
          ${data.position ? `<tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">役職</td><td style="border: 1px solid #ddd; padding: 8px;">${data.position}</td></tr>` : ''}
          ${data.phone ? `<tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">電話</td><td style="border: 1px solid #ddd; padding: 8px;">${data.phone}</td></tr>` : ''}
          ${data.website ? `<tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">サイト</td><td style="border: 1px solid #ddd; padding: 8px;">${data.website}</td></tr>` : ''}
          ${data.consideration ? `<tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">検討状況</td><td style="border: 1px solid #ddd; padding: 8px;">${data.consideration}</td></tr>` : ''}
        </table>
        
        <h3 style="color: #8f2c34;">請求された資料:</h3>
        <ul>
          ${selectedServiceNames.map(name => `<li>${name}</li>`).join('')}
        </ul>
        
        ${data.challenges ? `
        <h3 style="color: #8f2c34;">課題・要望:</h3>
        <p style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${data.challenges}</p>
        ` : ''}
      </div>
    `
  };

  try {
    // お客様宛と会社宛の両方を送信
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);
    
    console.log(`Materials sent to: ${data.email} (${attachments.length} files)`);
    console.log(`Admin notification sent for materials request from: ${data.email}`);
    return { success: true };
  } catch (error) {
    console.error('Materials request email sending failed:', error);
    throw new Error('資料送信メール送信に失敗しました');
  }
}

export async function sendContactInquiry(data: ContactFormData) {
  const consultationTypeNames: Record<string, string> = {
    'llmo-diagnosis': 'GYAKUTEN LLMO診断',
    'web-llmo': 'GYAKUTEN LLMO ウェブ制作',
    'write-llmo': 'GYAKUTEN LLMO ライティング',
    'llmo-consulting': 'GYAKUTEN LLMO コンサル',
    'dx': 'GYAKUTEN システム開発',
    'bootcamp': '逆転ブートキャンプ',
    'quick-support': 'GYAKUTENクイックサポート',
    'other': 'その他'
  };

  const consultationTypeName = consultationTypeNames[data.consultationType] || data.consultationType;

  // お客様宛の確認メール
  const userMailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: data.email,
    subject: '【GYAKUTEN】お問い合わせを受け付けいたしました',
    html: `
      <div style="font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- ヘッダー -->
        <div style="background: linear-gradient(135deg, #8f2c34 0%, #a53d45 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: bold;">
            GYAKUTEN お問い合わせ
          </h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">
            お問い合わせを受け付けいたしました
          </p>
        </div>

        <!-- メインコンテンツ -->
        <div style="padding: 30px 20px;">
          <div style="background-color: #f8f9fa; border-left: 4px solid #8f2c34; padding: 20px; margin-bottom: 30px;">
            <h2 style="color: #8f2c34; font-size: 20px; margin: 0 0 10px 0;">
              ${data.name}様、お問い合わせありがとうございます
            </h2>
            <p style="margin: 0; color: #333333; line-height: 1.6;">
              この度は、GYAKUTENにお問い合わせいただき、誠にありがとうございます。<br>
              <strong>すべての逆境に、最高の逆転劇を。</strong>
            </p>
          </div>

          <!-- お問い合わせ内容確認 -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #8f2c34; padding-bottom: 5px;">
              お問い合わせ内容確認
            </h3>
            <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa;">
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e9ecef; font-weight: bold; width: 30%;">ご相談内容種別</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${consultationTypeName}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e9ecef; font-weight: bold;">会社名</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${data.company || '未入力'}</td>
              </tr>
              ${data.website ? `
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e9ecef; font-weight: bold;">サイトURL</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">
                  <a href="${data.website}" target="_blank" style="color: #8f2c34; text-decoration: none;">${data.website}</a>
                </td>
              </tr>
              ` : ''}
            </table>
          </div>

          <!-- お問い合わせ内容 -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #8f2c34; padding-bottom: 5px;">
              お問い合わせ内容
            </h3>
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
              <p style="margin: 0; color: #333333; line-height: 1.6; white-space: pre-wrap;">${data.inquiry}</p>
            </div>
          </div>

          <!-- 今後の流れ -->
          <div style="margin-bottom: 30px; background-color: #e3f2fd; border: 1px solid #bbdefb; border-radius: 8px; padding: 20px;">
            <h3 style="color: #1976d2; font-size: 18px; margin-bottom: 15px;">
              今後の流れ
            </h3>
            <ul style="margin: 0; padding-left: 20px; color: #333333; line-height: 1.8;">
              <li><strong>ご返信</strong>：1営業日以内に担当者よりご回答いたします</li>
              <li><strong>詳細相談</strong>：必要に応じてお電話やオンライン面談をご提案いたします</li>
              <li><strong>お見積もり</strong>：具体的なご要望に基づいたお見積もりを作成いたします</li>
            </ul>
          </div>

          <!-- 緊急時の連絡先 -->
          <div style="margin-bottom: 30px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px;">
            <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px;">
              お急ぎの場合
            </h3>
            <p style="margin: 0; color: #333333; line-height: 1.6;">
              お急ぎの場合は、以下まで直接お電話ください：<br>
              <strong style="color: #8f2c34; font-size: 18px;">070-6664-4597</strong><br>
              <span style="font-size: 14px; color: #666;">営業時間：平日 9:00-18:00</span>
            </p>
          </div>
        </div>

        <!-- フッター -->
        <div style="background-color: #333333; color: #ffffff; padding: 30px 20px; text-align: center;">
          <div style="margin-bottom: 20px;">
            <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 10px 0;">合同会社GYAKUTEN</h3>
            <p style="margin: 0; opacity: 0.9;">すべての逆境に、最高の逆転劇を。</p>
          </div>
          
          <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 20px; flex-wrap: wrap;">
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">メール</strong><br>
              <a href="mailto:info@gyaku-ten.jp" style="color: #ffffff; text-decoration: none;">info@gyaku-ten.jp</a>
            </div>
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">電話</strong><br>
              <a href="tel:070-6664-4597" style="color: #ffffff; text-decoration: none;">070-6664-4597</a>
            </div>
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">サイト</strong><br>
              <a href="https://gyaku-ten.jp" target="_blank" style="color: #ffffff; text-decoration: none;">gyaku-ten.jp</a>
            </div>
          </div>
          
          <p style="margin: 0; font-size: 12px; opacity: 0.7;">
            このメールは自動送信されています。ご不明な点がございましたらお気軽にお問い合わせください。
          </p>
        </div>
      </div>
    `
  };

  // 会社宛の通知メール
  const adminMailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: process.env.FROM_EMAIL,
    subject: '【GYAKUTEN】新規お問い合わせがありました',
    html: `
      <div style="font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8f2c34;">新規お問い合わせ</h2>
        <p>以下のお客様からお問い合わせがありました：</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">氏名</td><td style="border: 1px solid #ddd; padding: 8px;">${data.name}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">メール</td><td style="border: 1px solid #ddd; padding: 8px;">${data.email}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">会社名</td><td style="border: 1px solid #ddd; padding: 8px;">${data.company || '未入力'}</td></tr>
          ${data.position ? `<tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">役職</td><td style="border: 1px solid #ddd; padding: 8px;">${data.position}</td></tr>` : ''}
          ${data.phone ? `<tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">電話</td><td style="border: 1px solid #ddd; padding: 8px;">${data.phone}</td></tr>` : ''}
          <tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">相談種別</td><td style="border: 1px solid #ddd; padding: 8px;">${consultationTypeName}</td></tr>
          ${data.website ? `<tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">サイト</td><td style="border: 1px solid #ddd; padding: 8px;"><a href="${data.website}" target="_blank">${data.website}</a></td></tr>` : ''}
        </table>
        
        <h3 style="color: #8f2c34;">お問い合わせ内容:</h3>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${data.inquiry}</div>
        
        <p style="margin-top: 20px; padding: 10px; background: #fff3cd; border-radius: 5px;">
          <strong>要対応：</strong>1営業日以内にご返信をお願いします。
        </p>
      </div>
    `
  };

  try {
    // お客様宛と会社宛の両方を送信
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);
    
    console.log(`Contact inquiry sent to: ${data.email}`);
    console.log(`Admin notification sent for contact inquiry from: ${data.email}`);
    return { success: true };
  } catch (error) {
    console.error('Contact inquiry email sending failed:', error);
    throw new Error('お問い合わせメール送信に失敗しました');
  }
}

export async function sendReservationRequest(data: ReservationFormData) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
  };

  // お客様宛の確認メール
  const userMailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: data.email,
    subject: '【GYAKUTEN】無料相談予約を受け付けました',
    html: `
      <div style="font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- ヘッダー -->
        <div style="background: linear-gradient(135deg, #8f2c34 0%, #a53d45 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: bold;">
            GYAKUTEN 無料相談予約
          </h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">
            ご予約を受け付けました
          </p>
        </div>

        <!-- メインコンテンツ -->
        <div style="padding: 30px 20px;">
          <div style="background-color: #f8f9fa; border-left: 4px solid #8f2c34; padding: 20px; margin-bottom: 30px;">
            <h2 style="color: #8f2c34; font-size: 20px; margin: 0 0 10px 0;">
              ${data.name}様、ご予約ありがとうございます
            </h2>
            <p style="margin: 0; color: #333333; line-height: 1.6;">
              この度は、GYAKUTENの無料相談をご予約いただき、誠にありがとうございます。<br>
              <strong>すべての逆境に、最高の逆転劇を。</strong>
            </p>
          </div>

          <!-- 予約内容確認 -->}
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #8f2c34; padding-bottom: 5px;">
              ご予約内容確認
            </h3>
            <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa;">
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e9ecef; font-weight: bold; width: 30%;">会社名</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${data.company}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; background-color: #e9ecef; font-weight: bold;">ご希望日時</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">
                  ${data.timeSlots.map((slot, index) => 
                    `第${index + 1}希望：${formatDate(slot.date)} ${slot.time}`
                  ).join('<br>')}
                </td>
              </tr>
            </table>
          </div>

          <!-- 今後の流れ -->
          <div style="margin-bottom: 30px; background-color: #e3f2fd; border: 1px solid #bbdefb; border-radius: 8px; padding: 20px;">
            <h3 style="color: #1976d2; font-size: 18px; margin-bottom: 15px;">
              今後の流れ
            </h3>
            <ul style="margin: 0; padding-left: 20px; color: #333333; line-height: 1.8;">
              <li><strong>日程調整</strong>：1営業日以内に担当者よりご希望日時の調整についてご連絡いたします</li>
              <li><strong>相談方法</strong>：オンライン（Zoom）または対面での相談が可能です</li>
              <li><strong>相談時間</strong>：約30分〜1時間を予定しております</li>
              <li><strong>事前準備</strong>：現在の課題やご質問がございましたら事前にお知らせください</li>
            </ul>
          </div>

          <!-- 緊急時の連絡先 -->
          <div style="margin-bottom: 30px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px;">
            <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px;">
              お急ぎの場合
            </h3>
            <p style="margin: 0; color: #333333; line-height: 1.6;">
              お急ぎの場合は、以下まで直接お電話ください：<br>
              <strong style="color: #8f2c34; font-size: 18px;">070-6664-4597</strong><br>
              <span style="font-size: 14px; color: #666;">営業時間：平日 9:00-18:00</span>
            </p>
          </div>
        </div>

        <!-- フッター -->
        <div style="background-color: #333333; color: #ffffff; padding: 30px 20px; text-align: center;">
          <div style="margin-bottom: 20px;">
            <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 10px 0;">合同会社GYAKUTEN</h3>
            <p style="margin: 0; opacity: 0.9;">すべての逆境に、最高の逆転劇を。</p>
          </div>
          
          <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 20px; flex-wrap: wrap;">
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">メール</strong><br>
              <a href="mailto:info@gyaku-ten.jp" style="color: #ffffff; text-decoration: none;">info@gyaku-ten.jp</a>
            </div>
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">電話</strong><br>
              <a href="tel:070-6664-4597" style="color: #ffffff; text-decoration: none;">070-6664-4597</a>
            </div>
            <div style="text-align: center;">
              <strong style="color: #8f2c34;">サイト</strong><br>
              <a href="https://gyaku-ten.jp" target="_blank" style="color: #ffffff; text-decoration: none;">gyaku-ten.jp</a>
            </div>
          </div>
          
          <p style="margin: 0; font-size: 12px; opacity: 0.7;">
            このメールは自動送信されています。ご不明な点がございましたらお気軽にお問い合わせください。
          </p>
        </div>
      </div>
    `
  };

  // 会社宛の通知メール
  const adminMailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: 'info@gyaku-ten.jp',
    subject: '【GYAKUTEN】新規無料相談予約がありました',
    html: `
      <div style="font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8f2c34;">新規無料相談予約</h2>
        <p>以下のお客様から無料相談の予約がありました：</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">氏名</td><td style="border: 1px solid #ddd; padding: 8px;">${data.name}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">メール</td><td style="border: 1px solid #ddd; padding: 8px;">${data.email}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">会社名</td><td style="border: 1px solid #ddd; padding: 8px;">${data.company}</td></tr>
        </table>
        
        <h3 style="color: #8f2c34;">ご希望日時:</h3>
        <ul>
          ${data.timeSlots.map((slot, index) => 
            `<li>第${index + 1}希望：${formatDate(slot.date)} ${slot.time}</li>`
          ).join('')}
        </ul>
        
        <p style="margin-top: 20px; padding: 10px; background: #e3f2fd; border-radius: 5px;">
          <strong>要対応：</strong>1営業日以内に日程調整のご連絡をお願いします。
        </p>
        
        <div style="margin-top: 20px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
          <p><strong>予約受付時刻：</strong>${new Date().toLocaleString('ja-JP')}</p>
        </div>
      </div>
    `
  };

  try {
    // お客様宛と会社宛の両方を送信
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);
    
    console.log(`Reservation request sent to: ${data.email}`);
    console.log(`Admin notification sent for reservation request from: ${data.email}`);
    return { success: true };
  } catch (error) {
    console.error('Reservation email sending failed:', error);
    throw new Error('予約確認メール送信に失敗しました');
  }
}

export interface TransportResourceRequestData {
  name: string;
  company: string;
  email: string;
  phone?: string;
}

export async function sendTransportResourceRequest(
  data: TransportResourceRequestData,
  attachment: { filename: string; path: string; contentType: string }
) {
  const userMailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: data.email,
    subject: '【GYAKUTEN】運送統合管理システムの資料をお送りいたします',
    html: `
      <div style="font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- ヘッダー -->
        <div style="background: linear-gradient(135deg, #8f2c34 0%, #a53d45 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: bold;">
            GYAKUTEN運送統合管理システム
          </h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">
            詳細資料をお送りいたします
          </p>
        </div>

        <!-- メインコンテンツ -->
        <div style="padding: 30px 20px;">
          <div style="background-color: #f8f9fa; border-left: 4px solid #8f2c34; padding: 20px; margin-bottom: 30px;">
            <h2 style="color: #8f2c34; font-size: 20px; margin: 0 0 10px 0;">
              ${data.name}様、資料をお送りいたします
            </h2>
            <p style="margin: 0; color: #333333; line-height: 1.6;">
              この度は、GYAKUTEN運送統合管理システムの資料をご請求いただき、誠にありがとうございます。<br>
              <strong>管理業務50%削減を実証済み</strong>のシステム詳細資料をお送りいたします。
            </p>
          </div>

          <!-- システム特徴 -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #8f2c34; padding-bottom: 5px;">
              システムの特徴
            </h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 20px;">
              <div style="background-color: #e8f5e8; padding: 10px; border-radius: 5px; text-align: center;">
                <strong style="color: #2d5a2d;">初期費用0円</strong>
              </div>
              <div style="background-color: #e8f3ff; padding: 10px; border-radius: 5px; text-align: center;">
                <strong style="color: #1a5490;">最短3日導入</strong>
              </div>
              <div style="background-color: #f3e8ff; padding: 10px; border-radius: 5px; text-align: center;">
                <strong style="color: #6a1b9a;">業界唯一機能</strong>
              </div>
              <div style="background-color: #fff3e0; padding: 10px; border-radius: 5px; text-align: center;">
                <strong style="color: #e65100;">60代でも使用可</strong>
              </div>
            </div>
          </div>

          <!-- 実証データ -->
          <div style="background-color: #f0f8ff; border: 1px solid #ddeeff; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="color: #1a5490; font-size: 18px; margin: 0 0 15px 0; text-align: center;">
              🚛 東翔運輸株式会社での実証結果
            </h3>
            <div style="text-align: center;">
              <p style="font-size: 16px; color: #333; margin: 10px 0;">
                <strong>管理業務時間：50%削減</strong><br>
                <strong>点検漏れ：ゼロ化達成</strong><br>
                <strong>車両台数：43台で実証済み</strong>
              </p>
            </div>
          </div>

          <!-- 添付資料説明 -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #8f2c34; padding-bottom: 5px;">
              添付資料の内容
            </h3>
            <ul style="color: #333333; line-height: 1.8; padding-left: 20px;">
              <li><strong>6大主要機能</strong>の詳細解説</li>
              <li><strong>東翔運輸での実証データ</strong>と導入効果分析</li>
              <li><strong>詳細料金表</strong>と導入プロセス</li>
              <li><strong>競合優位性</strong>と業界唯一の機能紹介</li>
              <li><strong>導入スケジュール</strong>と運用サポート内容</li>
            </ul>
          </div>

          <!-- お問い合わせ案内 -->
          <div style="background-color: #fff9c4; border: 1px solid #f0e68c; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="color: #8b6914; font-size: 18px; margin: 0 0 15px 0;">
              次のステップ
            </h3>
            <p style="color: #333333; line-height: 1.6; margin: 0;">
              資料をご確認いただき、ご不明な点やご質問がございましたら、お気軽にお問い合わせください。<br>
              <strong>無料相談・お見積もり</strong>も承っております。<br>
              お急ぎの場合は直接お電話ください：<strong>070-6664-4597</strong>
            </p>
          </div>

          <!-- 会社情報 -->
          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #666;">
            <p style="margin: 5px 0; font-size: 14px;">
              <strong>合同会社GYAKUTEN</strong><br>
              〒460-0008 愛知県名古屋市中区栄3-15-33 栄ガスビル7F<br>
              TEL: 070-6664-4597 | Email: info@gyakuten.com
            </p>
            <p style="margin: 15px 0 0 0; font-size: 12px; color: #999;">
              ※このメールは送信専用です。返信はできませんのでご了承ください。<br>
              ※資料請求後の強引な営業は一切いたしません。
            </p>
          </div>
        </div>
      </div>
    `,
    attachments: [attachment]
  };

  const adminMailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: process.env.ADMIN_EMAIL,
    subject: '【運送システム】資料請求がありました',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">運送統合管理システム 資料請求</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h3>お客様情報</h3>
          <p><strong>氏名：</strong>${data.name}</p>
          <p><strong>会社名：</strong>${data.company}</p>
          <p><strong>メールアドレス：</strong>${data.email}</p>
          ${data.phone ? `<p><strong>電話番号：</strong>${data.phone}</p>` : ''}

          <div style="margin-top: 20px; padding: 10px; background: #e8f4f8; border-radius: 5px;">
            <p><strong>資料請求日時：</strong>${new Date().toLocaleString('ja-JP')}</p>
          </div>
        </div>
      </div>
    `
  };

  try {
    // お客様宛と会社宛の両方を送信
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    console.log(`Transport system resource sent to: ${data.email}`);
    console.log(`Admin notification sent for transport resource request from: ${data.email}`);
    return { success: true };
  } catch (error) {
    console.error('Transport resource email sending failed:', error);
    throw new Error('資料送信メール送信に失敗しました');
  }
}