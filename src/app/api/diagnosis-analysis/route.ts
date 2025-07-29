import { NextRequest, NextResponse } from 'next/server';
import { SiteAnalyzer } from '@/lib/siteAnalyzer';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URLが指定されていません' },
        { status: 400 }
      );
    }

    // URLの妥当性チェック
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: '有効なURLを指定してください' },
        { status: 400 }
      );
    }

    console.log(`Starting analysis for: ${url}`);

    const analyzer = new SiteAnalyzer();
    
    try {
      const analysisResult = await analyzer.analyzeSite(url);
      
      console.log(`Analysis completed for: ${url}, Score: ${analysisResult.overallScore}`);

      return NextResponse.json({
        success: true,
        analysis: analysisResult
      });

    } catch (analysisError) {
      console.error('Analysis error:', analysisError);
      
      return NextResponse.json(
        { 
          error: 'サイト分析中にエラーが発生しました。サイトがアクセス可能か確認してください。',
          details: analysisError instanceof Error ? analysisError.message : 'Unknown error'
        },
        { status: 500 }
      );
    } finally {
      await analyzer.closeBrowser();
    }

  } catch (error) {
    console.error('API error:', error);
    
    return NextResponse.json(
      { 
        error: 'システムエラーが発生しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}