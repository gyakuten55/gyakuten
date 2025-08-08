// 診断機能のテストスクリプト
const testUrl = 'https://gyaku-ten.jp';

async function testDiagnosis() {
  try {
    console.log('Testing diagnosis analysis...');
    
    const response = await fetch('http://localhost:3000/api/diagnosis-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: testUrl
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Diagnosis analysis succeeded');
      console.log('Overall Score:', result.analysis.overallScore);
      
      // スコア内訳をチェック
      const breakdown = result.analysis.scoreBreakdown;
      console.log('\n📊 Score Breakdown:');
      
      console.log(`見出し構造: ${breakdown.headingStructure.score}/${breakdown.headingStructure.maxScore}`);
      console.log(`  - H1存在: ${breakdown.headingStructure.details.h1Present.score}/${breakdown.headingStructure.details.h1Present.maxScore}`);
      console.log(`  - 階層構造: ${breakdown.headingStructure.details.headingHierarchy.score}/${breakdown.headingStructure.details.headingHierarchy.maxScore}`);
      
      console.log(`技術的SEO: ${breakdown.technicalSeo.score}/${breakdown.technicalSeo.maxScore}`);
      console.log(`  - Title: ${breakdown.technicalSeo.details.titleTag.score}/${breakdown.technicalSeo.details.titleTag.maxScore}`);
      console.log(`  - Meta Desc: ${breakdown.technicalSeo.details.metaDescription.score}/${breakdown.technicalSeo.details.metaDescription.maxScore}`);
      
      console.log(`パフォーマンス: ${breakdown.performance.score}/${breakdown.performance.maxScore}`);
      console.log(`  - 読み込み速度: ${breakdown.performance.details.loadTime.score}/${breakdown.performance.details.loadTime.maxScore} (${breakdown.performance.details.loadTime.actualValue})`);
      
      console.log(`コンテンツ品質: ${breakdown.contentQuality.score}/${breakdown.contentQuality.maxScore}`);
      console.log(`  - 文字数: ${breakdown.contentQuality.details.wordCount.score}/${breakdown.contentQuality.details.wordCount.maxScore} (${breakdown.contentQuality.details.wordCount.actualValue})`);
      console.log(`  - Alt設定: ${breakdown.contentQuality.details.altTextCoverage.score}/${breakdown.contentQuality.details.altTextCoverage.maxScore} (${breakdown.contentQuality.details.altTextCoverage.actualValue})`);
      
      console.log(`モバイル最適化: ${breakdown.mobileOptimization.score}/${breakdown.mobileOptimization.maxScore}`);
      console.log(`  - Viewport: ${breakdown.mobileOptimization.details.viewportMeta.score}/${breakdown.mobileOptimization.details.viewportMeta.maxScore}`);
      console.log(`  - レスポンシブ: ${breakdown.mobileOptimization.details.responsive.score}/${breakdown.mobileOptimization.details.responsive.maxScore}`);
      
      console.log(`構造化データ: ${breakdown.structuredData.score}/${breakdown.structuredData.maxScore}`);
      console.log(`  - Schema: ${breakdown.structuredData.details.schemaPresent.score}/${breakdown.structuredData.details.schemaPresent.maxScore} (${breakdown.structuredData.details.schemaPresent.actualValue})`);
      
      // 改善提案をチェック
      console.log('\n💡 Recommendations:');
      result.analysis.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec}`);
      });
      
      // 詳細スコアリングが機能しているかチェック
      let detailedScoring = true;
      const categories = [breakdown.headingStructure, breakdown.technicalSeo, breakdown.performance, breakdown.contentQuality, breakdown.mobileOptimization, breakdown.structuredData];
      
      for (const category of categories) {
        if (category.score !== 0 && category.score !== category.maxScore) {
          console.log('✅ Detailed scoring detected for category with partial score:', category.score);
        }
        
        if (Object.values(category.details)) {
          for (const detail of Object.values(category.details)) {
            if (detail.score !== 0 && detail.score !== detail.maxScore) {
              console.log('✅ Detailed scoring working for:', detail.description, `(${detail.score}/${detail.maxScore})`);
              detailedScoring = true;
            }
          }
        }
      }
      
      if (detailedScoring) {
        console.log('\n🎯 Detailed scoring system is working correctly!');
      } else {
        console.log('\n⚠️  Warning: All scores are either 0 or max - detailed scoring may not be working');
      }
      
    } else {
      console.error('❌ Diagnosis failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// サーバーが起動するまで少し待つ
setTimeout(testDiagnosis, 2000);