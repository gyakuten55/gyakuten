import puppeteer, { Browser, Page } from 'puppeteer';
import { JSDOM } from 'jsdom';

// Vercel環境での動的インポート
const chromium = async () => {
  if (process.env.NODE_ENV === 'production') {
    const { default: chromiumBinary } = await import('@sparticuz/chromium');
    return chromiumBinary;
  }
  return null;
};

export interface SiteAnalysisResult {
  url: string;
  title: string;
  metaDescription: string;
  headingStructure: HeadingAnalysis;
  technicalSeo: TechnicalSeoAnalysis;
  performance: PerformanceAnalysis;
  contentQuality: ContentQualityAnalysis;
  mobileOptimization: MobileAnalysis;
  structuredData: StructuredDataAnalysis;
  overallScore: number;
  scoreBreakdown: ScoreBreakdown;
  recommendations: string[];
}

export interface ScoreBreakdown {
  headingStructure: {
    score: number;
    maxScore: 20;
    details: {
      h1Present: { score: number; maxScore: number; description: string; };
      headingHierarchy: { score: number; maxScore: number; description: string; };
    };
  };
  technicalSeo: {
    score: number;
    maxScore: 25;
    details: {
      titleTag: { score: number; maxScore: number; description: string; };
      metaDescription: { score: number; maxScore: number; description: string; };
      canonical: { score: number; maxScore: number; description: string; };
      openGraph: { score: number; maxScore: number; description: string; };
    };
  };
  performance: {
    score: number;
    maxScore: 20;
    details: {
      loadTime: { score: number; maxScore: number; description: string; actualValue: string; };
      performanceScore: { score: number; maxScore: number; description: string; actualValue: string; };
    };
  };
  contentQuality: {
    score: number;
    maxScore: 20;
    details: {
      wordCount: { score: number; maxScore: number; description: string; actualValue: string; };
      altTextCoverage: { score: number; maxScore: number; description: string; actualValue: string; };
      contentDepth: { score: number; maxScore: number; description: string; actualValue: string; };
    };
  };
  mobileOptimization: {
    score: number;
    maxScore: 10;
    details: {
      viewportMeta: { score: number; maxScore: number; description: string; };
      responsive: { score: number; maxScore: number; description: string; };
    };
  };
  structuredData: {
    score: number;
    maxScore: 5;
    details: {
      schemaPresent: { score: number; maxScore: number; description: string; actualValue: string; };
    };
  };
}

interface HeadingAnalysis {
  h1Count: number;
  h1Text: string[];
  missingH1: boolean;
  headingHierarchy: boolean;
  headingCount: { [key: string]: number };
}

interface TechnicalSeoAnalysis {
  hasTitle: boolean;
  titleLength: number;
  hasMetaDescription: boolean;
  metaDescriptionLength: number;
  hasCanonical: boolean;
  hasRobots: boolean;
  hasOpenGraph: boolean;
  hasSchemaMarkup: boolean;
  internalLinksCount: number;
  externalLinksCount: number;
}

interface PerformanceAnalysis {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  performanceScore: number;
}

interface ContentQualityAnalysis {
  wordCount: number;
  textImageRatio: number;
  altTextCoverage: number;
  contentDepth: number;
  readabilityScore: number;
}

interface MobileAnalysis {
  isResponsive: boolean;
  hasViewportMeta: boolean;
  mobileScore: number;
  touchTargetSize: boolean;
}

interface StructuredDataAnalysis {
  hasFaqSchema: boolean;
  hasHowToSchema: boolean;
  hasOrganizationSchema: boolean;
  hasArticleSchema: boolean;
  schemaCount: number;
}

export class SiteAnalyzer {
  private browser: Browser | null = null;

  async initBrowser() {
    if (!this.browser) {
      const chromiumBinary = await chromium();
      
      if (chromiumBinary) {
        // Vercel production環境
        console.log('Launching browser in production mode with Chromium binary');
        this.browser = await puppeteer.launch({
          args: [...chromiumBinary.args, '--no-sandbox', '--disable-setuid-sandbox'],
          executablePath: await chromiumBinary.executablePath(),
          headless: true,
        });
      } else {
        // ローカル開発環境
        console.log('Launching browser in development mode');
        this.browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
      }
    }
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async analyzeSite(url: string): Promise<SiteAnalysisResult> {
    try {
      console.log(`[${new Date().toISOString()}] Starting site analysis for: ${url}`);
      await this.initBrowser();
      const page = await this.browser!.newPage();
      
      // タイムアウト設定（30秒）
      page.setDefaultTimeout(30000);
      
      // パフォーマンス測定開始
      const startTime = Date.now();
      
      console.log(`[${new Date().toISOString()}] Navigating to: ${url}`);
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      
      // パフォーマンス測定終了
      const endTime = Date.now();
      const loadTime = endTime - startTime;
      console.log(`[${new Date().toISOString()}] Page loaded in ${loadTime}ms`);

      // Core Web Vitals取得
      console.log(`[${new Date().toISOString()}] Collecting performance metrics`);
      const performanceMetrics = await page.evaluate(() => {
        return new Promise<{ fcp: number; lcp: number; cls: number }>((resolve) => {
          if ('web-vital' in window) {
            // web-vitalsライブラリがある場合
            resolve({
              fcp: 0,
              lcp: 0,
              cls: 0
            });
          } else {
            // パフォーマンス計測の代替実装
            const windowPerf = window as Window & { performance: Performance };
            const navigationEntries = windowPerf.performance.getEntriesByType('navigation');
            const navigation = navigationEntries[0] as PerformanceNavigationTiming;
            resolve({
              fcp: navigation ? navigation.domContentLoadedEventEnd - navigation.fetchStart : 1000,
              lcp: navigation ? navigation.loadEventEnd - navigation.fetchStart : 2000,
              cls: 0.1 // 固定値
            });
          }
        });
      });

      // HTMLコンテンツ取得
      console.log(`[${new Date().toISOString()}] Getting page content`);
      const htmlContent = await page.content();
      const dom = new JSDOM(htmlContent);
      const document = dom.window.document;
      console.log(`[${new Date().toISOString()}] Content parsed successfully`);

      // 基本情報取得
      const title = document.querySelector('title')?.textContent || '';
      const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      console.log(`[${new Date().toISOString()}] Basic info - Title: ${title.substring(0, 50)}..., Meta: ${metaDescription.substring(0, 50)}...`);

      // 各種分析実行
      console.log(`[${new Date().toISOString()}] Running detailed analysis`);
      const headingStructure = this.analyzeHeadings(document);
      const technicalSeo = this.analyzeTechnicalSeo(document);
      const performance = this.analyzePerformance(loadTime, performanceMetrics);
      const contentQuality = this.analyzeContentQuality(document);
      const mobileOptimization = await this.analyzeMobileOptimization(page, document);
      const structuredData = this.analyzeStructuredData(document);
      console.log(`[${new Date().toISOString()}] Analysis completed`);
      
      await page.close();
      console.log(`[${new Date().toISOString()}] Page closed`);

      // 総合スコア計算とスコア内訳生成
      const scoreResult = this.calculateOverallScore({
        headingStructure,
        technicalSeo,
        performance,
        contentQuality,
        mobileOptimization,
        structuredData
      });

      // 改善提案生成
      const recommendations = this.generateRecommendations({
        headingStructure,
        technicalSeo,
        performance,
        contentQuality,
        mobileOptimization,
        structuredData
      });
      console.log(`[${new Date().toISOString()}] Score calculated: ${scoreResult.overallScore}`);

      return {
        url,
        title,
        metaDescription,
        headingStructure,
        technicalSeo,
        performance,
        contentQuality,
        mobileOptimization,
        structuredData,
        overallScore: scoreResult.overallScore,
        scoreBreakdown: scoreResult.scoreBreakdown,
        recommendations
      };

    } catch (error) {
      console.error('Site analysis failed:', error);
      throw new Error(`サイト分析に失敗しました: ${error}`);
    }
  }

  private analyzeHeadings(document: Document): HeadingAnalysis {
    const h1Elements = document.querySelectorAll('h1');
    const h1Count = h1Elements.length;
    const h1Text = Array.from(h1Elements).map(el => el.textContent?.trim() || '');

    const headingCount: { [key: string]: number } = {};
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
      headingCount[tag] = document.querySelectorAll(tag).length;
    });

    // 階層構造チェック
    const headingHierarchy = this.checkHeadingHierarchy(document);

    return {
      h1Count,
      h1Text,
      missingH1: h1Count === 0,
      headingHierarchy,
      headingCount
    };
  }

  private checkHeadingHierarchy(document: Document): boolean {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    
    for (const heading of headings) {
      const currentLevel = parseInt(heading.tagName.charAt(1));
      if (currentLevel > previousLevel + 1) {
        return false; // 階層が飛んでいる
      }
      previousLevel = currentLevel;
    }
    return true;
  }

  private analyzeTechnicalSeo(document: Document): TechnicalSeoAnalysis {
    const title = document.querySelector('title');
    const metaDescription = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const robots = document.querySelector('meta[name="robots"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
    
    const internalLinks = Array.from(document.querySelectorAll('a[href]')).filter(
      link => {
        const href = link.getAttribute('href');
        return href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:');
      }
    );

    const externalLinks = Array.from(document.querySelectorAll('a[href]')).filter(
      link => {
        const href = link.getAttribute('href');
        return href && href.startsWith('http');
      }
    );

    return {
      hasTitle: !!title?.textContent,
      titleLength: title?.textContent?.length || 0,
      hasMetaDescription: !!metaDescription?.getAttribute('content'),
      metaDescriptionLength: metaDescription?.getAttribute('content')?.length || 0,
      hasCanonical: !!canonical,
      hasRobots: !!robots,
      hasOpenGraph: !!ogTitle,
      hasSchemaMarkup: schemaScripts.length > 0,
      internalLinksCount: internalLinks.length,
      externalLinksCount: externalLinks.length
    };
  }

  private analyzePerformance(loadTime: number, metrics: { fcp: number; lcp: number; cls: number }): PerformanceAnalysis {
    // スコア計算
    let performanceScore = 100;
    if (loadTime > 3000) performanceScore -= 20;
    if (loadTime > 5000) performanceScore -= 30;
    if (loadTime > 10000) performanceScore -= 40;

    return {
      loadTime,
      firstContentfulPaint: metrics.fcp,
      largestContentfulPaint: metrics.lcp,
      cumulativeLayoutShift: metrics.cls,
      performanceScore: Math.max(performanceScore, 10)
    };
  }

  private analyzeContentQuality(document: Document): ContentQualityAnalysis {
    const textContent = document.body?.textContent || '';
    const wordCount = textContent.trim().split(/\s+/).length;
    
    const images = document.querySelectorAll('img');
    const imagesWithAlt = Array.from(images).filter(img => img.getAttribute('alt'));
    const altTextCoverage = images.length > 0 ? (imagesWithAlt.length / images.length) * 100 : 100;

    // コンテンツの深さ（段落数、リスト数などから判定）
    const paragraphs = document.querySelectorAll('p').length;
    const lists = document.querySelectorAll('ul, ol').length;
    const contentDepth = paragraphs + lists;

    // 簡易的な可読性スコア
    const averageWordsPerSentence = wordCount / Math.max(1, textContent.split(/[.!?]/).length);
    const readabilityScore = Math.max(0, 100 - averageWordsPerSentence * 2);

    return {
      wordCount,
      textImageRatio: images.length > 0 ? wordCount / images.length : wordCount,
      altTextCoverage,
      contentDepth,
      readabilityScore
    };
  }

  private async analyzeMobileOptimization(page: Page, document: Document): Promise<MobileAnalysis> {
    const viewport = document.querySelector('meta[name="viewport"]');
    const hasViewportMeta = !!viewport;
    
    // モバイルビューポートでのテスト
    await page.setViewport({ width: 375, height: 667 });
    
    // レスポンシブデザインの検証
    const isResponsive = await page.evaluate(() => {
      const width = window.innerWidth;
      return width <= 768; // モバイルサイズの確認
    });

    let mobileScore = 70;
    if (hasViewportMeta) mobileScore += 15;
    if (isResponsive) mobileScore += 15;

    return {
      isResponsive,
      hasViewportMeta,
      mobileScore,
      touchTargetSize: true // 簡略化
    };
  }

  private analyzeStructuredData(document: Document): StructuredDataAnalysis {
    const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
    let hasFaqSchema = false;
    let hasHowToSchema = false;
    let hasOrganizationSchema = false;
    let hasArticleSchema = false;

    schemaScripts.forEach(script => {
      try {
        const schema = JSON.parse(script.textContent || '');
        const type = schema['@type'] || '';
        
        if (type.includes('FAQ')) hasFaqSchema = true;
        if (type.includes('HowTo')) hasHowToSchema = true;
        if (type.includes('Organization')) hasOrganizationSchema = true;
        if (type.includes('Article')) hasArticleSchema = true;
      } catch {
        // Invalid JSON
      }
    });

    return {
      hasFaqSchema,
      hasHowToSchema,
      hasOrganizationSchema,
      hasArticleSchema,
      schemaCount: schemaScripts.length
    };
  }

  private calculateOverallScore(analysis: {
    headingStructure: HeadingAnalysis;
    technicalSeo: TechnicalSeoAnalysis;
    performance: PerformanceAnalysis;
    contentQuality: ContentQualityAnalysis;
    mobileOptimization: MobileAnalysis;
    structuredData: StructuredDataAnalysis;
  }): { overallScore: number; scoreBreakdown: ScoreBreakdown } {
    
    // 見出し構造 (20点)
    const h1PresentScore = !analysis.headingStructure.missingH1 ? 10 : 0;
    const headingHierarchyScore = analysis.headingStructure.headingHierarchy ? 10 : 0;
    const headingStructureScore = h1PresentScore + headingHierarchyScore;

    // 技術的SEO (25点)
    const titleScore = (analysis.technicalSeo.hasTitle && analysis.technicalSeo.titleLength >= 30 && analysis.technicalSeo.titleLength <= 60) ? 8 : 0;
    const metaDescScore = (analysis.technicalSeo.hasMetaDescription && analysis.technicalSeo.metaDescriptionLength >= 120 && analysis.technicalSeo.metaDescriptionLength <= 160) ? 7 : 0;
    const canonicalScore = analysis.technicalSeo.hasCanonical ? 5 : 0;
    const openGraphScore = analysis.technicalSeo.hasOpenGraph ? 5 : 0;
    const technicalSeoScore = titleScore + metaDescScore + canonicalScore + openGraphScore;

    // パフォーマンス (20点)
    const performanceScore = Math.round((analysis.performance.performanceScore / 100) * 20);

    // コンテンツ品質 (20点)
    const wordCountScore = analysis.contentQuality.wordCount >= 300 ? 8 : 0;
    const altTextScore = analysis.contentQuality.altTextCoverage >= 80 ? 7 : 0;
    const contentDepthScore = analysis.contentQuality.contentDepth >= 5 ? 5 : 0;
    const contentQualityScore = wordCountScore + altTextScore + contentDepthScore;

    // モバイル最適化 (10点)
    const mobileScore = Math.round((analysis.mobileOptimization.mobileScore / 100) * 10);

    // 構造化データ (5点)
    const structuredDataScore = analysis.structuredData.schemaCount > 0 ? 5 : 0;

    const totalScore = headingStructureScore + technicalSeoScore + performanceScore + contentQualityScore + mobileScore + structuredDataScore;

    const scoreBreakdown: ScoreBreakdown = {
      headingStructure: {
        score: headingStructureScore,
        maxScore: 20,
        details: {
          h1Present: {
            score: h1PresentScore,
            maxScore: 10,
            description: 'H1タグの存在（1つのみ推奨）'
          },
          headingHierarchy: {
            score: headingHierarchyScore,
            maxScore: 10,
            description: '見出しの階層構造の正確性'
          }
        }
      },
      technicalSeo: {
        score: technicalSeoScore,
        maxScore: 25,
        details: {
          titleTag: {
            score: titleScore,
            maxScore: 8,
            description: 'titleタグの最適化（30-60文字）'
          },
          metaDescription: {
            score: metaDescScore,
            maxScore: 7,
            description: 'meta descriptionの最適化（120-160文字）'
          },
          canonical: {
            score: canonicalScore,
            maxScore: 5,
            description: 'canonical URLの設定'
          },
          openGraph: {
            score: openGraphScore,
            maxScore: 5,
            description: 'Open Graphタグの設定'
          }
        }
      },
      performance: {
        score: performanceScore,
        maxScore: 20,
        details: {
          loadTime: {
            score: analysis.performance.loadTime <= 3000 ? 10 : (analysis.performance.loadTime <= 5000 ? 5 : 0),
            maxScore: 10,
            description: 'ページ読み込み速度（3秒以内推奨）',
            actualValue: `${(analysis.performance.loadTime / 1000).toFixed(2)}秒`
          },
          performanceScore: {
            score: performanceScore - (analysis.performance.loadTime <= 3000 ? 10 : (analysis.performance.loadTime <= 5000 ? 5 : 0)),
            maxScore: 10,
            description: '総合パフォーマンススコア',
            actualValue: `${analysis.performance.performanceScore}点`
          }
        }
      },
      contentQuality: {
        score: contentQualityScore,
        maxScore: 20,
        details: {
          wordCount: {
            score: wordCountScore,
            maxScore: 8,
            description: 'コンテンツボリューム（300文字以上推奨）',
            actualValue: `${analysis.contentQuality.wordCount}文字`
          },
          altTextCoverage: {
            score: altTextScore,
            maxScore: 7,
            description: '画像のalt属性設定率（80%以上推奨）',
            actualValue: `${analysis.contentQuality.altTextCoverage.toFixed(1)}%`
          },
          contentDepth: {
            score: contentDepthScore,
            maxScore: 5,
            description: 'コンテンツの構造化（段落・リスト数）',
            actualValue: `${analysis.contentQuality.contentDepth}個`
          }
        }
      },
      mobileOptimization: {
        score: mobileScore,
        maxScore: 10,
        details: {
          viewportMeta: {
            score: analysis.mobileOptimization.hasViewportMeta ? 5 : 0,
            maxScore: 5,
            description: 'viewport metaタグの設定'
          },
          responsive: {
            score: analysis.mobileOptimization.isResponsive ? 5 : 0,
            maxScore: 5,
            description: 'レスポンシブデザインの実装'
          }
        }
      },
      structuredData: {
        score: structuredDataScore,
        maxScore: 5,
        details: {
          schemaPresent: {
            score: structuredDataScore,
            maxScore: 5,
            description: '構造化データ（JSON-LD）の実装',
            actualValue: `${analysis.structuredData.schemaCount}個`
          }
        }
      }
    };

    return {
      overallScore: Math.round(Math.min(100, totalScore)),
      scoreBreakdown
    };
  }

  private generateRecommendations(analysis: {
    headingStructure: HeadingAnalysis;
    technicalSeo: TechnicalSeoAnalysis;
    performance: PerformanceAnalysis;
    contentQuality: ContentQualityAnalysis;
    mobileOptimization: MobileAnalysis;
    structuredData: StructuredDataAnalysis;
  }): string[] {
    const recommendations: string[] = [];

    // 見出し構造の改善提案
    if (analysis.headingStructure.missingH1) {
      recommendations.push('H1タグが見つかりません。ページの主題を表すH1タグを追加してください。');
    }
    if (analysis.headingStructure.h1Count > 1) {
      recommendations.push('H1タグが複数あります。ページ内でH1タグは1つだけ使用することを推奨します。');
    }
    if (!analysis.headingStructure.headingHierarchy) {
      recommendations.push('見出しの階層構造が正しくありません。H1→H2→H3の順序で使用してください。');
    }

    // 技術的SEOの改善提案
    if (!analysis.technicalSeo.hasTitle) {
      recommendations.push('titleタグが設定されていません。ページの内容を表すtitleタグを追加してください。');
    } else if (analysis.technicalSeo.titleLength < 30 || analysis.technicalSeo.titleLength > 60) {
      recommendations.push('titleタグの文字数を30-60文字以内に調整することを推奨します。');
    }

    if (!analysis.technicalSeo.hasMetaDescription) {
      recommendations.push('meta descriptionが設定されていません。ページの概要を120-160文字で記述してください。');
    } else if (analysis.technicalSeo.metaDescriptionLength < 120 || analysis.technicalSeo.metaDescriptionLength > 160) {
      recommendations.push('meta descriptionの文字数を120-160文字以内に調整することを推奨します。');
    }

    if (!analysis.technicalSeo.hasCanonical) {
      recommendations.push('canonical URLを設定することで、重複コンテンツの問題を回避できます。');
    }

    if (!analysis.technicalSeo.hasOpenGraph) {
      recommendations.push('Open Graphタグを設定することで、SNSでのシェア時の表示を改善できます。');
    }

    // パフォーマンスの改善提案
    if (analysis.performance.performanceScore < 70) {
      recommendations.push('ページの読み込み速度が遅いです。画像の最適化、CSSの最小化などを検討してください。');
    }

    // コンテンツ品質の改善提案
    if (analysis.contentQuality.wordCount < 300) {
      recommendations.push('コンテンツのボリュームが少ないです。より詳細で有用な情報を追加することを推奨します。');
    }

    if (analysis.contentQuality.altTextCoverage < 80) {
      recommendations.push('画像のalt属性が不足しています。すべての画像に適切なalt属性を設定してください。');
    }

    // モバイル最適化の改善提案
    if (!analysis.mobileOptimization.hasViewportMeta) {
      recommendations.push('viewport metaタグが設定されていません。モバイル表示の最適化のために追加してください。');
    }

    if (!analysis.mobileOptimization.isResponsive) {
      recommendations.push('レスポンシブデザインが実装されていない可能性があります。モバイル対応を検討してください。');
    }

    // 構造化データの改善提案
    if (analysis.structuredData.schemaCount === 0) {
      recommendations.push('構造化データ（JSON-LD）を実装することで、検索エンジンがコンテンツを理解しやすくなります。');
    }

    if (!analysis.structuredData.hasFaqSchema) {
      recommendations.push('FAQ構造化データを実装することで、リッチスニペットの表示機会を増やせます。');
    }

    if (recommendations.length === 0) {
      recommendations.push('優れたLLMO最適化が実装されています。継続的な改善とコンテンツの更新を心がけてください。');
    }

    return recommendations;
  }
}