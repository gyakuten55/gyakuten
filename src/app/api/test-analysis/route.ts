import { NextRequest, NextResponse } from 'next/server';
import { SiteAnalyzer } from '@/lib/siteAnalyzer';

// テスト用のエンドポイント
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url') || 'https://example.com';
  
  try {
    console.log(`Testing analysis for: ${url}`);
    
    const analyzer = new SiteAnalyzer();
    const analysisResult = await analyzer.analyzeSite(url);
    await analyzer.closeBrowser();

    return NextResponse.json({
      success: true,
      url,
      score: analysisResult.overallScore,
      analysis: analysisResult
    });

  } catch (error) {
    console.error('Test analysis error:', error);
    
    return NextResponse.json(
      { 
        error: 'Analysis failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}