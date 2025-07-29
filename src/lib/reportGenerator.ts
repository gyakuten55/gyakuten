import { SiteAnalysisResult } from './siteAnalyzer';

interface CategoryDetail {
  description: string;
  actualValue?: string;
  score: number;
  maxScore: number;
  suggestion?: string;
}

interface Category {
  score: number;
  maxScore: number;
  details: Record<string, CategoryDetail>;
}

export function generateHtmlReport(analysis: SiteAnalysisResult): string {
  const scoreColor = (score: number, maxScore: number): string => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return '#28a745';
    if (percentage >= 60) return '#ffc107';
    return '#dc3545';
  };

  const getScoreGrade = (score: number): string => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  return `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LLMO診断レポート</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'メイリオ', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #fff;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: linear-gradient(135deg, #8f2c34 0%, #a53d45 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .overall-score {
            background: #f8f9fa;
            border: 2px solid #8f2c34;
            border-radius: 8px;
            padding: 30px;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .score-circle {
            width: 120px;
            height: 120px;
            border: 8px solid #8f2c34;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            background: white;
        }
        
        .score-number {
            font-size: 36px;
            font-weight: bold;
            color: #8f2c34;
        }
        
        .score-grade {
            font-size: 24px;
            font-weight: bold;
            color: #8f2c34;
            margin-bottom: 10px;
        }
        
        .site-info {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
        }
        
        .site-info h2 {
            color: #8f2c34;
            margin-bottom: 15px;
            border-bottom: 2px solid #8f2c34;
            padding-bottom: 5px;
        }
        
        .site-info table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .site-info td {
            padding: 8px;
            border: 1px solid #dee2e6;
        }
        
        .site-info td:first-child {
            background: #e9ecef;
            font-weight: bold;
            width: 30%;
        }
        
        .category {
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            margin-bottom: 20px;
            overflow: hidden;
        }
        
        .category-header {
            background: #8f2c34;
            color: white;
            padding: 15px 20px;
            font-size: 18px;
            font-weight: bold;
        }
        
        .category-content {
            padding: 20px;
        }
        
        .category-score {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 5px;
        }
        
        .score-bar {
            width: 200px;
            height: 20px;
            background: #e9ecef;
            border-radius: 10px;
            overflow: hidden;
        }
        
        .score-fill {
            height: 100%;
            border-radius: 10px;
            transition: width 0.3s ease;
        }
        
        .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .detail-item:last-child {
            border-bottom: none;
        }
        
        .detail-description {
            flex: 1;
            margin-right: 20px;
        }
        
        .detail-score {
            font-weight: bold;
            margin-right: 10px;
        }
        
        .detail-value {
            font-size: 14px;
            color: #666;
            margin-left: 10px;
        }
        
        .recommendations {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin-top: 30px;
        }
        
        .recommendations h2 {
            color: #333;
            margin-bottom: 15px;
            border-bottom: 2px solid #8f2c34;
            padding-bottom: 5px;
        }
        
        .recommendations ul {
            list-style: none;
            padding: 0;
        }
        
        .recommendations li {
            padding: 10px;
            margin-bottom: 10px;
            background: white;
            border-radius: 5px;
            border-left: 4px solid #8f2c34;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: #333;
            color: white;
            border-radius: 8px;
        }
        
        .footer h3 {
            margin-bottom: 10px;
        }
        
        .footer p {
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- ヘッダー -->
        <div class="header">
            <h1>GYAKUTEN LLMO診断レポート</h1>
            <p>AI検索時代に対応したWebサイト最適化診断</p>
            <p>診断日時: ${new Date().toLocaleDateString('ja-JP', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
        </div>

        <!-- 総合スコア -->
        <div class="overall-score">
            <div class="score-circle">
                <div class="score-number">${analysis.overallScore}</div>
            </div>
            <div class="score-grade">グレード: ${getScoreGrade(analysis.overallScore)}</div>
            <p>100点満点中 ${analysis.overallScore}点</p>
        </div>

        <!-- サイト情報 -->
        <div class="site-info">
            <h2>診断対象サイト情報</h2>
            <table>
                <tr>
                    <td>URL</td>
                    <td>${analysis.url}</td>
                </tr>
                <tr>
                    <td>サイトタイトル</td>
                    <td>${analysis.title || '未設定'}</td>
                </tr>
                <tr>
                    <td>meta description</td>
                    <td>${analysis.metaDescription || '未設定'}</td>
                </tr>
            </table>
        </div>

        <!-- スコア詳細 -->
        ${generateCategorySection('見出し構造', analysis.scoreBreakdown.headingStructure)}
        ${generateCategorySection('技術的SEO', analysis.scoreBreakdown.technicalSeo)}
        ${generateCategorySection('パフォーマンス', analysis.scoreBreakdown.performance)}
        ${generateCategorySection('コンテンツ品質', analysis.scoreBreakdown.contentQuality)}
        ${generateCategorySection('モバイル最適化', analysis.scoreBreakdown.mobileOptimization)}
        ${generateCategorySection('構造化データ', analysis.scoreBreakdown.structuredData)}

        <!-- 改善提案 -->
        <div class="recommendations">
            <h2>改善提案</h2>
            <ul>
                ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>

        <!-- フッター -->
        <div class="footer">
            <h3>合同会社GYAKUTEN</h3>
            <p>すべての逆境に、最高の逆転劇を。</p>
            <p>メール: info@gyaku-ten.jp | 電話: 070-6664-4597</p>
            <p>サイト: https://gyaku-ten.jp</p>
        </div>
    </div>
</body>
</html>
  `;

  function generateCategorySection(title: string, category: Category): string {
    const percentage = (category.score / category.maxScore) * 100;
    const color = scoreColor(category.score, category.maxScore);
    
    return `
        <div class="category">
            <div class="category-header">${title}</div>
            <div class="category-content">
                <div class="category-score">
                    <span><strong>${category.score}/${category.maxScore}点</strong></span>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${percentage}%; background-color: ${color};"></div>
                    </div>
                    <span>${percentage.toFixed(1)}%</span>
                </div>
                
                ${Object.entries(category.details).map(([, detail]: [string, CategoryDetail]) => `
                    <div class="detail-item">
                        <div class="detail-description">
                            ${detail.description}
                            ${detail.actualValue ? `<span class="detail-value">(${detail.actualValue})</span>` : ''}
                        </div>
                        <div class="detail-score" style="color: ${scoreColor(detail.score, detail.maxScore)};">
                            ${detail.score}/${detail.maxScore}点
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
  }
}