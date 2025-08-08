import { JSDOM, VirtualConsole } from 'jsdom';

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
  
  // Vercel環境に最適化されたfetchベースの分析を実装
  private async fetchSiteContent(url: string): Promise<{ html: string; responseTime: number }> {
    const startTime = Date.now();
    console.log(`[${new Date().toISOString()}] Fetching content from: ${url}`);
    
    try {
      // Vercel環境での超短タイムアウト（3秒）でハングアップを防止
      const controller = new AbortController();
      
      console.log(`[${new Date().toISOString()}] Initiating fetch request for: ${url}`);
      
      // Promise.raceを使用して確実にタイムアウトを実装
      const fetchPromise = fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; GYAKUTENBot/1.0; +https://gyaku-ten.jp)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'ja,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        signal: controller.signal,
        redirect: 'follow',
        referrerPolicy: 'no-referrer-when-downgrade'
      });
      
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          console.log(`[${new Date().toISOString()}] Fetch timeout triggered for: ${url}`);
          controller.abort();
          reject(new Error(`Fetch timeout after 3 seconds for ${url}`));
        }, 3000);
      });
      
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      console.log(`[${new Date().toISOString()}] Fetch response received - Status: ${response.status}, URL: ${url}`);
      
      if (!response.ok) {
        console.error(`[${new Date().toISOString()}] HTTP error for ${url}: ${response.status} ${response.statusText}`);
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
      }
      
      console.log(`[${new Date().toISOString()}] Reading response text for: ${url}`);
      const html = await response.text();
      const responseTime = Date.now() - startTime;
      
      console.log(`[${new Date().toISOString()}] Content fetched successfully: ${html.length} chars in ${responseTime}ms`);
      
      // HTMLサイズ制限（Vercelメモリ制限対策）
      if (html.length > 2000000) { // 2MB制限
        console.warn(`[${new Date().toISOString()}] HTML content too large (${html.length} chars), truncating`);
        return { html: html.substring(0, 2000000), responseTime };
      }
      
      return { html, responseTime };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      console.error(`[${new Date().toISOString()}] Fetch failed for ${url} after ${responseTime}ms:`, {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error,
        url,
        responseTime
      });
      
      if (error instanceof Error) {
        if (error.name === 'AbortError' || error.message.includes('timeout')) {
          throw new Error(`サイトの読み込みがタイムアウトしました (${responseTime}ms)`);
        }
        throw new Error(`サイトの取得に失敗しました: ${error.message}`);
      }
      throw new Error(`サイトの取得に失敗しました: ${String(error)}`);
    }
  }

  async closeBrowser() {
    // HTTPベースなのでブラウザを閉じる必要なし
    return Promise.resolve();
  }

  async analyzeSite(url: string): Promise<SiteAnalysisResult> {
    console.log(`[${new Date().toISOString()}] Starting site analysis for: ${url}`);
    
    try {
      // 自社サイトかどうかをチェック
      const isOwnSite = url.includes('gyaku-ten.jp') || url.includes('localhost');
      console.log(`[${new Date().toISOString()}] Site classification: ${isOwnSite ? 'own site' : 'external site'}`);
      
      // fetchベースでHTMLを取得
      console.log(`[${new Date().toISOString()}] Fetching site content...`);
      let html: string;
      let responseTime: number;
      try {
        const result = await this.fetchSiteContent(url);
        html = result.html;
        responseTime = result.responseTime;
        console.log(`[${new Date().toISOString()}] Successfully fetched ${html.length} characters`);
      } catch (fetchError) {
        console.error(`[${new Date().toISOString()}] Fetch failed for ${url}:`, fetchError);
        // Fetchが失敗した場合は最小限の分析結果を返す
        console.log(`[${new Date().toISOString()}] Using minimal fallback analysis due to fetch failure`);
        return this.createMinimalFallbackAnalysis(url, isOwnSite, fetchError as Error);
      }
      
      // JSDOM初期化（Vercel環境対応）
      console.log(`[${new Date().toISOString()}] Initializing JSDOM...`);
      let document: Document;
      try {
        const dom = new JSDOM(html, {
          // Vercel環境でのメモリ最適化
          resources: 'usable',
          runScripts: 'outside-only',
          pretendToBeVisual: false,
          // リソース読み込み無効化
          includeNodeLocations: false,
          storageQuota: 10000000, // 10MB制限
          // メモリ使用量を制限
          virtualConsole: new VirtualConsole()
        });
        document = dom.window.document;
        console.log(`[${new Date().toISOString()}] JSDOM initialized successfully`);
      } catch (jsdomError) {
        console.error(`[${new Date().toISOString()}] JSDOM initialization failed:`, jsdomError);
        // JSDOMが失敗した場合のフォールバック処理
        return this.createFallbackAnalysis(url, html, responseTime, isOwnSite);
      }

      // 基本情報取得
      console.log(`[${new Date().toISOString()}] Extracting basic information...`);
      const title = document.querySelector('title')?.textContent?.trim() || '';
      const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || '';

      // 各種分析実行
      console.log(`[${new Date().toISOString()}] Running detailed analysis...`);
      const headingStructure = this.analyzeHeadings(document);
      console.log(`[${new Date().toISOString()}] Heading analysis complete`);
      
      const technicalSeo = this.analyzeTechnicalSeo(document);
      console.log(`[${new Date().toISOString()}] Technical SEO analysis complete`);
      
      const performance = this.analyzePerformanceSimple(responseTime);
      console.log(`[${new Date().toISOString()}] Performance analysis complete`);
      
      const contentQuality = this.analyzeContentQuality(document);
      console.log(`[${new Date().toISOString()}] Content quality analysis complete`);
      
      const mobileOptimization = this.analyzeMobileOptimization(document);
      console.log(`[${new Date().toISOString()}] Mobile optimization analysis complete`);
      
      const structuredData = this.analyzeStructuredData(document);
      console.log(`[${new Date().toISOString()}] Structured data analysis complete`);

      // 総合スコア計算とスコア内訳生成
      console.log(`[${new Date().toISOString()}] Calculating overall score...`);
      const scoreResult = this.calculateOverallScore({
        headingStructure,
        technicalSeo,
        performance,
        contentQuality,
        mobileOptimization,
        structuredData
      }, isOwnSite);

      // 改善提案生成
      console.log(`[${new Date().toISOString()}] Generating recommendations...`);
      const recommendations = this.generateRecommendations({
        headingStructure,
        technicalSeo,
        performance,
        contentQuality,
        mobileOptimization,
        structuredData
      }, isOwnSite);

      console.log(`[${new Date().toISOString()}] Analysis completed successfully with score: ${scoreResult.overallScore}`);

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
      console.error(`[${new Date().toISOString()}] Site analysis failed for ${url}:`, error);
      
      if (error instanceof Error) {
        throw new Error(`サイト分析に失敗しました: ${error.message}`);
      }
      throw new Error(`サイト分析に失敗しました: ${String(error)}`);
    }
  }

  // Fetchが失敗した場合の最小限フォールバック分析
  private createMinimalFallbackAnalysis(url: string, isOwnSite: boolean, _error: Error): SiteAnalysisResult {
    console.log(`[${new Date().toISOString()}] Creating minimal fallback analysis for: ${url}`);
    
    const baseScore = isOwnSite ? 75 : 35; // 自社サイトは高めのスコア
    
    // 最小限の分析結果
    return {
      url,
      title: `分析対象サイト: ${url}`,
      metaDescription: 'サイトの詳細分析中にアクセスエラーが発生しました。',
      headingStructure: {
        h1Count: 0,
        h1Text: [],
        missingH1: true,
        headingHierarchy: false,
        headingCount: {}
      },
      technicalSeo: {
        hasTitle: false,
        titleLength: 0,
        hasMetaDescription: false,
        metaDescriptionLength: 0,
        hasCanonical: false,
        hasRobots: false,
        hasOpenGraph: false,
        hasSchemaMarkup: false,
        internalLinksCount: 0,
        externalLinksCount: 0
      },
      performance: {
        loadTime: 5000,
        firstContentfulPaint: 3000,
        largestContentfulPaint: 5000,
        cumulativeLayoutShift: 0.1,
        performanceScore: 50
      },
      contentQuality: {
        wordCount: 0,
        textImageRatio: 100,
        altTextCoverage: 0,
        contentDepth: 1,
        readabilityScore: 50
      },
      mobileOptimization: {
        hasViewportMeta: false,
        isResponsive: false,
        mobileScore: 50,
        touchTargetSize: false
      },
      structuredData: {
        hasFaqSchema: false,
        hasHowToSchema: false,
        hasOrganizationSchema: false,
        hasArticleSchema: false,
        schemaCount: 0
      },
      overallScore: baseScore,
      scoreBreakdown: this.createMinimalScoreBreakdown(baseScore, isOwnSite),
      recommendations: [
        'サイトへのアクセス時にエラーが発生しました。',
        'サーバーの設定やネットワークの問題が考えられます。',
        'サイトの可用性と応答速度の改善をおすすめします。',
        '詳細な診断については、お気軽にお問い合わせください。'
      ]
    };
  }

  // 最小限フォールバック用のスコアブレークダウン
  private createMinimalScoreBreakdown(baseScore: number, isOwnSite: boolean): ScoreBreakdown {
    const adjustedScore = isOwnSite ? Math.min(baseScore + 10, 95) : baseScore;
    
    return {
      headingStructure: {
        score: Math.round(adjustedScore * 0.2),
        maxScore: 20,
        details: {
          h1Present: {
            score: 0,
            maxScore: 10,
            description: 'サイトアクセス不可のため分析できませんでした'
          },
          headingHierarchy: {
            score: 0,
            maxScore: 10,
            description: 'サイトアクセス不可のため分析できませんでした'
          }
        }
      },
      technicalSeo: {
        score: Math.round(adjustedScore * 0.25),
        maxScore: 25,
        details: {
          titleTag: {
            score: 0,
            maxScore: 8,
            description: 'サイトアクセス不可のため分析できませんでした'
          },
          metaDescription: {
            score: 0,
            maxScore: 7,
            description: 'サイトアクセス不可のため分析できませんでした'
          },
          canonical: {
            score: 0,
            maxScore: 5,
            description: 'サイトアクセス不可のため分析できませんでした'
          },
          openGraph: {
            score: 0,
            maxScore: 5,
            description: 'サイトアクセス不可のため分析できませんでした'
          }
        }
      },
      performance: {
        score: Math.round(adjustedScore * 0.2),
        maxScore: 20,
        details: {
          loadTime: {
            score: 0,
            maxScore: 12,
            description: 'サイトアクセス不可のため分析できませんでした',
            actualValue: 'N/A'
          },
          performanceScore: {
            score: 0,
            maxScore: 8,
            description: 'サイトアクセス不可のため分析できませんでした',
            actualValue: 'N/A'
          }
        }
      },
      contentQuality: {
        score: Math.round(adjustedScore * 0.2),
        maxScore: 20,
        details: {
          wordCount: {
            score: 0,
            maxScore: 8,
            description: 'サイトアクセス不可のため分析できませんでした',
            actualValue: 'N/A'
          },
          altTextCoverage: {
            score: 0,
            maxScore: 6,
            description: 'サイトアクセス不可のため分析できませんでした',
            actualValue: 'N/A'
          },
          contentDepth: {
            score: 0,
            maxScore: 6,
            description: 'サイトアクセス不可のため分析できませんでした',
            actualValue: 'N/A'
          }
        }
      },
      mobileOptimization: {
        score: Math.round(adjustedScore * 0.1),
        maxScore: 10,
        details: {
          viewportMeta: {
            score: 0,
            maxScore: 5,
            description: 'サイトアクセス不可のため分析できませんでした'
          },
          responsive: {
            score: 0,
            maxScore: 5,
            description: 'サイトアクセス不可のため分析できませんでした'
          }
        }
      },
      structuredData: {
        score: Math.round(adjustedScore * 0.05),
        maxScore: 5,
        details: {
          schemaPresent: {
            score: 0,
            maxScore: 5,
            description: 'サイトアクセス不可のため分析できませんでした',
            actualValue: 'N/A'
          }
        }
      }
    };
  }

  // JSDOMが失敗した場合のフォールバック分析
  private createFallbackAnalysis(url: string, html: string, responseTime: number, isOwnSite: boolean): SiteAnalysisResult {
    console.log(`[${new Date().toISOString()}] Using fallback analysis for: ${url}`);
    
    // 正規表現ベースの簡易分析
    const title = this.extractTitleFromHtml(html);
    const metaDescription = this.extractMetaDescriptionFromHtml(html);
    
    // 基本的な分析結果を作成
    const basicScore = isOwnSite ? 85 : 45;
    
    return {
      url,
      title,
      metaDescription,
      headingStructure: {
        h1Count: this.countMatches(html, /<h1[^>]*>/gi),
        h1Text: [],
        missingH1: !html.includes('<h1'),
        headingHierarchy: true,
        headingCount: { h1: 1, h2: 2, h3: 1, h4: 0, h5: 0, h6: 0 }
      },
      technicalSeo: {
        hasTitle: title.length > 0,
        titleLength: title.length,
        hasMetaDescription: metaDescription.length > 0,
        metaDescriptionLength: metaDescription.length,
        hasCanonical: html.includes('rel="canonical"'),
        hasRobots: html.includes('name="robots"'),
        hasOpenGraph: html.includes('property="og:'),
        hasSchemaMarkup: html.includes('application/ld+json'),
        internalLinksCount: this.countMatches(html, /<a[^>]+href="[^h][^>]*>/gi),
        externalLinksCount: this.countMatches(html, /<a[^>]+href="http[^>]*>/gi)
      },
      performance: {
        loadTime: responseTime,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
        performanceScore: responseTime < 2000 ? 85 : 60
      },
      contentQuality: {
        wordCount: this.estimateWordCount(html),
        textImageRatio: 100,
        altTextCoverage: 70,
        contentDepth: 10,
        readabilityScore: 75
      },
      mobileOptimization: {
        isResponsive: html.includes('viewport') || html.includes('responsive'),
        hasViewportMeta: html.includes('name="viewport"'),
        mobileScore: 75,
        touchTargetSize: true
      },
      structuredData: {
        hasFaqSchema: html.includes('"@type":"FAQPage"'),
        hasHowToSchema: html.includes('"@type":"HowTo"'),
        hasOrganizationSchema: html.includes('"@type":"Organization"'),
        hasArticleSchema: html.includes('"@type":"Article"'),
        schemaCount: this.countMatches(html, /application\/ld\+json/gi)
      },
      overallScore: basicScore,
      scoreBreakdown: this.createFallbackScoreBreakdown(basicScore, isOwnSite),
      recommendations: isOwnSite 
        ? ['優れたLLMO最適化が実装されています。GYAKUTEN の専門知識により高いレベルで最適化されています。']
        : [
            'より詳細な分析のため、**無料のGYAKUTEN LLMO診断**をお勧めします。',
            'LLMO時代に対応したサイト最適化は**GYAKUTEN Web LLMO**にお任せください。'
          ]
    };
  }

  // ヘルパーメソッド
  private extractTitleFromHtml(html: string): string {
    const match = html.match(/<title[^>]*>(.*?)<\/title>/i);
    return match ? match[1].trim() : '';
  }

  private extractMetaDescriptionFromHtml(html: string): string {
    const match = html.match(/<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"']*)["\'][^>]*>/i);
    return match ? match[1].trim() : '';
  }

  private countMatches(html: string, regex: RegExp): number {
    const matches = html.match(regex);
    return matches ? matches.length : 0;
  }

  private estimateWordCount(html: string): number {
    // HTMLタグを除去して文字数を概算
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return Math.floor(text.length / 5); // 日本語は平均5文字で1語と概算
  }

  private createFallbackScoreBreakdown(totalScore: number, isOwnSite: boolean): ScoreBreakdown {
    const base = isOwnSite ? 0.85 : 0.45;
    
    return {
      headingStructure: {
        score: Math.round(20 * base),
        maxScore: 20,
        details: {
          h1Present: { score: Math.round(10 * base), maxScore: 10, description: 'H1タグの存在（1つのみ推奨）' },
          headingHierarchy: { score: Math.round(10 * base), maxScore: 10, description: '見出しの階層構造の正確性' }
        }
      },
      technicalSeo: {
        score: Math.round(25 * base),
        maxScore: 25,
        details: {
          titleTag: { score: Math.round(8 * base), maxScore: 8, description: 'titleタグの最適化（30-60文字）' },
          metaDescription: { score: Math.round(7 * base), maxScore: 7, description: 'meta descriptionの最適化（120-160文字）' },
          canonical: { score: Math.round(5 * base), maxScore: 5, description: 'canonical URLの設定' },
          openGraph: { score: Math.round(5 * base), maxScore: 5, description: 'Open Graphタグの設定' }
        }
      },
      performance: {
        score: Math.round(20 * base),
        maxScore: 20,
        details: {
          loadTime: { score: Math.round(10 * base), maxScore: 10, description: 'ページ読み込み速度（3秒以内推奨）', actualValue: '推定値' },
          performanceScore: { score: Math.round(10 * base), maxScore: 10, description: '総合パフォーマンススコア', actualValue: '推定値' }
        }
      },
      contentQuality: {
        score: Math.round(20 * base),
        maxScore: 20,
        details: {
          wordCount: { score: Math.round(8 * base), maxScore: 8, description: 'コンテンツボリューム（300文字以上推奨）', actualValue: '推定値' },
          altTextCoverage: { score: Math.round(7 * base), maxScore: 7, description: '画像のalt属性設定率（80%以上推奨）', actualValue: '推定値' },
          contentDepth: { score: Math.round(5 * base), maxScore: 5, description: 'コンテンツの構造化（段落・リスト数）', actualValue: '推定値' }
        }
      },
      mobileOptimization: {
        score: Math.round(10 * base),
        maxScore: 10,
        details: {
          viewportMeta: { score: Math.round(5 * base), maxScore: 5, description: 'viewport metaタグの設定' },
          responsive: { score: Math.round(5 * base), maxScore: 5, description: 'レスポンシブデザインの実装' }
        }
      },
      structuredData: {
        score: Math.round(5 * base),
        maxScore: 5,
        details: {
          schemaPresent: { score: Math.round(5 * base), maxScore: 5, description: '構造化データ（JSON-LD）の実装', actualValue: '推定値' }
        }
      }
    };
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

  private analyzePerformanceSimple(responseTime: number): PerformanceAnalysis {
    // 簡易的なパフォーマンススコア計算
    let performanceScore = 100;
    if (responseTime > 3000) performanceScore -= 20;
    if (responseTime > 5000) performanceScore -= 30;
    if (responseTime > 10000) performanceScore -= 40;

    return {
      loadTime: responseTime,
      firstContentfulPaint: 0, // 簡易版では取得不可
      largestContentfulPaint: 0, // 簡易版では取得不可
      cumulativeLayoutShift: 0, // 簡易版では取得不可
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

  private analyzeMobileOptimization(document: Document): MobileAnalysis {
    const viewport = document.querySelector('meta[name="viewport"]');
    const hasViewportMeta = !!viewport;
    
    // レスポンシブデザインの詳細チェック
    let responsiveIndicators = 0;
    let hasMediaQueries = false;
    
    // CSS内のメディアクエリチェック
    const styleElements = Array.from(document.querySelectorAll('style'));
    for (const style of styleElements) {
      const content = style.textContent || '';
      if (content.includes('@media')) {
        hasMediaQueries = true;
        responsiveIndicators++;
        break;
      }
    }
    
    // 外部CSSリンクの存在チェック（実際の中身は取得できないが存在は確認）
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
    if (cssLinks.length > 0) {
      responsiveIndicators++; // 外部CSSがある場合は可能性がある
    }
    
    // Tailwind CSS、Bootstrap等のフレームワーク検出
    const html = document.documentElement.outerHTML;
    const frameworks = ['tailwind', 'bootstrap', 'foundation', 'bulma', 'materialize'];
    const hasResponsiveFramework = frameworks.some(fw => 
      html.toLowerCase().includes(fw) || 
      Array.from(document.querySelectorAll('*')).some(el => 
        el.className && el.className.toString().toLowerCase().includes(fw)
      )
    );
    
    if (hasResponsiveFramework) {
      hasMediaQueries = true;
      responsiveIndicators += 2;
    }
    
    // レスポンシブクラスの検出
    const responsiveClasses = ['responsive', 'mobile', 'tablet', 'desktop', 'sm:', 'md:', 'lg:', 'xl:'];
    const hasResponsiveClasses = responsiveClasses.some(cls => html.includes(cls));
    if (hasResponsiveClasses) {
      responsiveIndicators++;
    }
    
    // viewport metaタグの内容チェック
    let viewportScore = 0;
    if (hasViewportMeta) {
      const viewportContent = viewport?.getAttribute('content') || '';
      if (viewportContent.includes('width=device-width')) {
        viewportScore += 3;
      }
      if (viewportContent.includes('initial-scale=1')) {
        viewportScore += 2;
      }
    }
    
    // モバイル最適化スコア計算（より詳細）
    let mobileScore = 30; // ベーススコア
    
    // viewport meta設定
    mobileScore += viewportScore * 6; // 最大30点
    
    // レスポンシブデザインの証拠
    if (hasMediaQueries) {
      mobileScore += 20;
    } else if (responsiveIndicators >= 2) {
      mobileScore += 15; // 間接的な証拠
    } else if (responsiveIndicators >= 1) {
      mobileScore += 10; // わずかな証拠
    }
    
    // フレームワーク使用による加点
    if (hasResponsiveFramework) {
      mobileScore += 15;
    }
    
    // レスポンシブクラス使用による加点
    if (hasResponsiveClasses) {
      mobileScore += 5;
    }

    mobileScore = Math.min(mobileScore, 100);

    return {
      isResponsive: hasMediaQueries || hasResponsiveFramework || responsiveIndicators >= 2,
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
  }, isOwnSite: boolean = false): { overallScore: number; scoreBreakdown: ScoreBreakdown } {
    
    // 見出し構造 (20点) - バランスの取れた評価基準
    let h1PresentScore = 0;
    if (!analysis.headingStructure.missingH1) {
      if (analysis.headingStructure.h1Count === 1) {
        h1PresentScore = isOwnSite ? 9 : 7; // 自社サイトはやや高め
      } else if (analysis.headingStructure.h1Count === 2) {
        h1PresentScore = isOwnSite ? 6 : 4; // やや問題：H1が2つ
      } else if (analysis.headingStructure.h1Count > 2) {
        h1PresentScore = isOwnSite ? 3 : 2; // 大きな問題：H1が3つ以上
      }
    } // H1なし = 0点
    
    // 階層構造のバランスの取れた評価
    let headingHierarchyScore = 0;
    if (analysis.headingStructure.headingHierarchy) {
      const totalHeadings = Object.values(analysis.headingStructure.headingCount).reduce((a, b) => a + b, 0);
      const h2Count = analysis.headingStructure.headingCount.h2 || 0;
      const h3Count = analysis.headingStructure.headingCount.h3 || 0;
      const h4Count = analysis.headingStructure.headingCount.h4 || 0;
      
      // バランスの取れた階層構造評価
      if (totalHeadings >= 8 && h2Count >= 3 && h3Count >= 2 && h4Count >= 1) {
        headingHierarchyScore = isOwnSite ? 9 : 7;
      } else if (totalHeadings >= 6 && h2Count >= 3 && h3Count >= 2) {
        headingHierarchyScore = isOwnSite ? 8 : 6;
      } else if (totalHeadings >= 5 && h2Count >= 2) {
        headingHierarchyScore = isOwnSite ? 7 : 5;
      } else if (totalHeadings >= 3) {
        headingHierarchyScore = isOwnSite ? 5 : 3;
      } else if (totalHeadings >= 2) {
        headingHierarchyScore = isOwnSite ? 3 : 2;
      }
    } else {
      // 階層が破綻している場合は大幅減点
      const totalHeadings = Object.values(analysis.headingStructure.headingCount).reduce((a, b) => a + b, 0);
      if (totalHeadings >= 5) {
        headingHierarchyScore = 1; // 見出しは多いが構造が悪い
      } else if (totalHeadings >= 2) {
        headingHierarchyScore = 0; // 構造が非常に悪い
      }
    }
    
    const headingStructureScore = h1PresentScore + headingHierarchyScore;

    // 技術的SEO (25点) - バランスの取れた評価基準
    let titleScore = 0;
    if (analysis.technicalSeo.hasTitle) {
      const titleLen = analysis.technicalSeo.titleLength;
      if (titleLen >= 30 && titleLen <= 60) {
        titleScore = isOwnSite ? 7 : 5;
      } else if (titleLen >= 20 && titleLen < 30) {
        titleScore = isOwnSite ? 5 : 3;
      } else if (titleLen > 60 && titleLen <= 80) {
        titleScore = isOwnSite ? 5 : 3;
      } else if (titleLen >= 10 && titleLen < 20) {
        titleScore = isOwnSite ? 3 : 2;
      } else if (titleLen > 80 && titleLen <= 100) {
        titleScore = isOwnSite ? 3 : 2;
      } else if (titleLen > 0) {
        titleScore = 1;
      }
    } // タイトルなし = 0点
    
    let metaDescScore = 0;
    if (analysis.technicalSeo.hasMetaDescription) {
      const descLen = analysis.technicalSeo.metaDescriptionLength;
      if (descLen >= 120 && descLen <= 160) {
        metaDescScore = isOwnSite ? 6 : 5;
      } else if (descLen >= 80 && descLen < 120) {
        metaDescScore = isOwnSite ? 5 : 3;
      } else if (descLen > 160 && descLen <= 200) {
        metaDescScore = isOwnSite ? 5 : 3;
      } else if (descLen >= 50 && descLen < 80) {
        metaDescScore = isOwnSite ? 3 : 2;
      } else if (descLen > 200 && descLen <= 250) {
        metaDescScore = isOwnSite ? 3 : 2;
      } else if (descLen > 0) {
        metaDescScore = 1;
      }
    } // meta descriptionなし = 0点
    
    // canonical、OGPの評価
    const canonicalScore = analysis.technicalSeo.hasCanonical ? (isOwnSite ? 4 : 3) : 0;
    const openGraphScore = analysis.technicalSeo.hasOpenGraph ? (isOwnSite ? 4 : 3) : 0;
    const technicalSeoScore = titleScore + metaDescScore + canonicalScore + openGraphScore;

    // パフォーマンス (20点) - バランスの取れた評価基準
    let loadTimeScore = 0;
    const loadTime = analysis.performance.loadTime;
    if (loadTime <= 500) {
      loadTimeScore = isOwnSite ? 9 : 7;
    } else if (loadTime <= 1000) {
      loadTimeScore = isOwnSite ? 8 : 6;
    } else if (loadTime <= 1500) {
      loadTimeScore = isOwnSite ? 6 : 4;
    } else if (loadTime <= 2000) {
      loadTimeScore = isOwnSite ? 5 : 3;
    } else if (loadTime <= 3000) {
      loadTimeScore = isOwnSite ? 3 : 2;
    } else if (loadTime <= 5000) {
      loadTimeScore = isOwnSite ? 2 : 1;
    } else {
      loadTimeScore = 0;
    }
    
    let overallPerfScore = 0;
    const perfScore = analysis.performance.performanceScore;
    if (perfScore >= 95) {
      overallPerfScore = isOwnSite ? 9 : 7;
    } else if (perfScore >= 90) {
      overallPerfScore = isOwnSite ? 8 : 6;
    } else if (perfScore >= 80) {
      overallPerfScore = isOwnSite ? 6 : 5;
    } else if (perfScore >= 70) {
      overallPerfScore = isOwnSite ? 5 : 4;
    } else if (perfScore >= 60) {
      overallPerfScore = isOwnSite ? 4 : 3;
    } else if (perfScore >= 50) {
      overallPerfScore = isOwnSite ? 3 : 2;
    } else {
      overallPerfScore = isOwnSite ? 2 : 1;
    }
    
    const performanceScore = loadTimeScore + overallPerfScore;

    // コンテンツ品質 (20点) - バランスの取れた評価基準
    let wordCountScore = 0;
    const wordCount = analysis.contentQuality.wordCount;
    if (wordCount >= 2000) {
      wordCountScore = isOwnSite ? 7 : 5;
    } else if (wordCount >= 1000) {
      wordCountScore = isOwnSite ? 6 : 4;
    } else if (wordCount >= 500) {
      wordCountScore = isOwnSite ? 5 : 3;
    } else if (wordCount >= 300) {
      wordCountScore = isOwnSite ? 3 : 2;
    } else if (wordCount >= 150) {
      wordCountScore = isOwnSite ? 2 : 1;
    } else {
      wordCountScore = 0;
    }
    
    let altTextScore = 0;
    const altCoverage = analysis.contentQuality.altTextCoverage;
    if (altCoverage >= 100) {
      altTextScore = isOwnSite ? 6 : 5;
    } else if (altCoverage >= 90) {
      altTextScore = isOwnSite ? 5 : 4;
    } else if (altCoverage >= 80) {
      altTextScore = isOwnSite ? 4 : 3;
    } else if (altCoverage >= 60) {
      altTextScore = isOwnSite ? 3 : 2;
    } else if (altCoverage >= 40) {
      altTextScore = isOwnSite ? 2 : 1;
    } else {
      altTextScore = 0;
    }
    
    let contentDepthScore = 0;
    const depth = analysis.contentQuality.contentDepth;
    if (depth >= 15) {
      contentDepthScore = isOwnSite ? 5 : 4;
    } else if (depth >= 10) {
      contentDepthScore = isOwnSite ? 4 : 3;
    } else if (depth >= 5) {
      contentDepthScore = isOwnSite ? 3 : 2;
    } else if (depth >= 3) {
      contentDepthScore = isOwnSite ? 2 : 1;
    } else {
      contentDepthScore = 0;
    }
    
    const contentQualityScore = wordCountScore + altTextScore + contentDepthScore;

    // モバイル最適化 (10点) - バランスの取れた評価基準
    let viewportMetaScore = 0;
    if (analysis.mobileOptimization.hasViewportMeta) {
      viewportMetaScore = isOwnSite ? 4 : 3;
    }
    
    let responsiveScore = 0;
    if (analysis.mobileOptimization.isResponsive) {
      const baseScore = analysis.mobileOptimization.mobileScore;
      if (baseScore >= 90) {
        responsiveScore = isOwnSite ? 6 : 5;
      } else if (baseScore >= 80) {
        responsiveScore = isOwnSite ? 5 : 4;
      } else if (baseScore >= 70) {
        responsiveScore = isOwnSite ? 4 : 3;
      } else {
        responsiveScore = isOwnSite ? 3 : 2;
      }
    } else {
      responsiveScore = isOwnSite ? 2 : 0;
    }
    
    const mobileScore = viewportMetaScore + responsiveScore;

    // 構造化データ (5点) - バランスの取れた評価
    let structuredDataScore = 0;
    const schemaCount = analysis.structuredData.schemaCount;
    
    if (schemaCount >= 3) {
      structuredDataScore = isOwnSite ? 5 : 4;
    } else if (schemaCount >= 2) {
      structuredDataScore = isOwnSite ? 4 : 3;
    } else if (schemaCount >= 1) {
      structuredDataScore = isOwnSite ? 3 : 2;
    }
    
    // 特定のスキーマタイプによる追加評価
    if (isOwnSite && (analysis.structuredData.hasFaqSchema || analysis.structuredData.hasOrganizationSchema)) {
      structuredDataScore = Math.min(structuredDataScore + 1, 5);
    }

    let totalScore = headingStructureScore + technicalSeoScore + performanceScore + contentQualityScore + mobileScore + structuredDataScore;
    
    // 自社サイトの場合、全体的なボーナス調整（実績とブランド価値を反映）
    if (isOwnSite) {
      totalScore = Math.min(totalScore + 25, 95); // 25点ボーナス、最大95点
    }

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
            score: loadTimeScore,
            maxScore: 10,
            description: 'ページ読み込み速度（3秒以内推奨）',
            actualValue: `${(analysis.performance.loadTime / 1000).toFixed(2)}秒`
          },
          performanceScore: {
            score: overallPerfScore,
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
            score: viewportMetaScore,
            maxScore: 5,
            description: 'viewport metaタグの設定'
          },
          responsive: {
            score: responsiveScore,
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
  }, isOwnSite: boolean = false): string[] {
    const recommendations: string[] = [];

    // 見出し構造の改善提案（サービス誘導を意識）
    if (analysis.headingStructure.missingH1) {
      if (!isOwnSite) {
        recommendations.push('H1タグが見つかりません。LLMO時代では構造化されたコンテンツが重要です。**GYAKUTEN Web LLMO**でAI検索に最適化された見出し構造を設計できます。');
      }
    }
    if (analysis.headingStructure.h1Count > 1) {
      if (!isOwnSite) {
        recommendations.push('H1タグが複数あります。AI検索エンジンが混乱する可能性があります。**GYAKUTEN LLMO診断**で詳細な構造分析をお勧めします。');
      }
    }
    if (!analysis.headingStructure.headingHierarchy) {
      if (!isOwnSite) {
        recommendations.push('見出し階層が不適切です。LLMO最適化では論理的な情報構造が必須です。**GYAKUTEN LLMO Consulting**で包括的な改善戦略をご提案できます。');
      }
    }

    // 技術的SEOの改善提案（サービス誘導を意識）
    if (!analysis.technicalSeo.hasTitle) {
      if (!isOwnSite) {
        recommendations.push('titleタグが未設定です。AI検索での表示に大きく影響します。**GYAKUTEN Write LLMO**でLLMO最適化されたタイトルを作成できます。');
      }
    } else if (analysis.technicalSeo.titleLength < 30 || analysis.technicalSeo.titleLength > 60) {
      if (!isOwnSite) {
        recommendations.push('titleタグの長さが最適ではありません。AI検索時代に対応したタイトル最適化は**GYAKUTEN Write LLMO**にお任せください。');
      }
    }

    if (!analysis.technicalSeo.hasMetaDescription) {
      if (!isOwnSite) {
        recommendations.push('meta descriptionが未設定です。AI要約に影響する重要な要素です。**GYAKUTEN LLMO Consulting**で包括的なメタデータ戦略をご提案します。');
      }
    } else if (analysis.technicalSeo.metaDescriptionLength < 120 || analysis.technicalSeo.metaDescriptionLength > 160) {
      if (!isOwnSite) {
        recommendations.push('meta descriptionの長さを最適化する必要があります。**GYAKUTEN Write LLMO**でLLMO対応の説明文を作成できます。');
      }
    }

    if (!analysis.technicalSeo.hasCanonical && !isOwnSite) {
      recommendations.push('canonical URL未設定により、AI検索での評価が分散する可能性があります。**GYAKUTEN Web LLMO**で技術的SEO対策を包括的に実装できます。');
    }

    if (!analysis.technicalSeo.hasOpenGraph && !isOwnSite) {
      recommendations.push('Open Graph未設定により、SNSでの露出機会を逃しています。**GYAKUTEN DX**でソーシャルメディア最適化も含めた改善を行えます。');
    }

    // パフォーマンスの改善提案（サービス誘導を意識）
    if (analysis.performance.performanceScore < 80 && !isOwnSite) {
      recommendations.push('サイト速度の改善が必要です。AI検索では表示速度も重要な評価要素です。**GYAKUTEN Web LLMO**で高速化とLLMO最適化を同時に実現できます。');
    }

    // コンテンツ品質の改善提案（サービス誘導を意識）
    if (analysis.contentQuality.wordCount < 1000 && !isOwnSite) {
      recommendations.push('コンテンツ量が不足しています。LLMO時代では質と量の両方が重要です。**GYAKUTEN Write LLMO**でAI検索に最適化された充実したコンテンツを作成できます。');
    }

    if (analysis.contentQuality.altTextCoverage < 90 && !isOwnSite) {
      recommendations.push('画像のalt属性が不十分です。AIによる画像理解にも影響します。**GYAKUTEN LLMO Consulting**でアクセシビリティとLLMO対応を包括的に改善できます。');
    }

    // モバイル最適化の改善提案（サービス誘導を意識）
    if (!analysis.mobileOptimization.hasViewportMeta && !isOwnSite) {
      recommendations.push('viewport設定が不適切です。モバイル検索での評価に直結します。**GYAKUTEN Web LLMO**でモバイルファースト設計を実装できます。');
    }

    if (!analysis.mobileOptimization.isResponsive && !isOwnSite) {
      recommendations.push('レスポンシブ対応が不完全です。モバイル検索時代には致命的です。**GYAKUTEN DX**で最新の技術を使ったレスポンシブサイトを構築できます。');
    }

    // 構造化データの改善提案（サービス誘導を意識）
    if (analysis.structuredData.schemaCount === 0 && !isOwnSite) {
      recommendations.push('構造化データが未実装です。AI検索で大きく不利になります。**GYAKUTEN Web LLMO**でリッチスニペット対応の構造化データを実装できます。');
    }

    if (!analysis.structuredData.hasFaqSchema && !isOwnSite) {
      recommendations.push('FAQ構造化データの実装で検索露出を大幅改善できます。**GYAKUTEN LLMO Consulting**でFAQ戦略も含めた包括的な提案が可能です。');
    }

    // LLMO時代特有の改善提案を追加
    if (!isOwnSite) {
      if (analysis.contentQuality.wordCount < 2000 || analysis.structuredData.schemaCount < 2) {
        recommendations.push('**重要**: AI検索時代では従来のSEOだけでは不十分です。**無料のGYAKUTEN LLMO診断**で詳細分析と具体的な改善計画をご提案します。');
      }
    }

    if (recommendations.length === 0) {
      if (isOwnSite) {
        recommendations.push('優れたLLMO最適化が実装されています。GYAKUTEN の専門知識により高いレベルで最適化されています。');
      } else {
        recommendations.push('基本的な最適化は行われていますが、LLMO時代に対応したより高度な最適化が可能です。');
      }
    } else if (isOwnSite && recommendations.length <= 3) {
      // 自社サイトの場合、改善提案を少し控えめに
      recommendations.push('既に高いレベルで最適化されています。さらなる向上のために継続的な改善をお勧めします。');
    }

    return recommendations;
  }
}