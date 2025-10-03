import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { RelatedArticles } from '@/components/column/RelatedArticles';
import { ShareButtons } from '@/components/column/ShareButtons';
import { FloatingFAQ } from '@/components/column/FloatingFAQ';
import { InlineFAQ } from '@/components/column/InlineFAQ';
import { getArticleBySlug, getRelatedArticles, getPopularArticles, extractFAQFromContent } from '@/lib/microcms';
import { Article } from '@/types/cms';
import StructuredData from '@/components/seo/StructuredData';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// 開発用のサンプルデータ
const sampleArticle: Article = {
  id: '1',
  title: 'AI検索時代におけるSEO戦略の変化',
  slug: 'ai-search-seo-strategy',
  content: `
    <h2 id="introduction">はじめに</h2>
    <p>Perplexity AIやChatGPT Search、Google GeminiなどのAI検索エンジンの普及により、従来のSEO戦略は大きく変わりつつあります。この記事では、LLMO（大規模言語モデル最適化）の重要性について詳しく解説します。</p>

    <h2 id="what-is-llmo">LLMOとは何か</h2>
    <p>LLMO（Large Language Model Optimization）は、AI検索エンジンに対してコンテンツを最適化する手法です。従来のSEOがGoogleなどの検索エンジンのクローラーを対象としていたのに対し、LLMOは大規模言語モデルによる理解と引用を目的としています。</p>

    <h3 id="key-differences">従来のSEOとの違い</h3>
    <ul>
      <li>キーワードの詰め込みではなく、文脈の理解が重要</li>
      <li>構造化されたデータの重要性が増大</li>
      <li>引用されやすいコンテンツ形式の採用</li>
    </ul>

    <h2 id="implementation-strategy">LLMO実装戦略</h2>
    <p>実際にLLMOを実装する際の戦略について説明します。</p>

    <h3 id="content-structure">コンテンツ構造の最適化</h3>
    <p>最新AI検索エンジンがコンテンツを正しく理解できるよう、以下の点に注意してコンテンツを構造化します：</p>
    <ol>
      <li>明確な見出し構造の採用</li>
      <li>論理的な情報の配置</li>
      <li>具体例の豊富な提供</li>
    </ol>

    <h3 id="meta-optimization">メタデータの最適化</h3>
    <p>従来のメタタグに加えて、構造化データの実装が重要になります。</p>

    <h2 id="future-outlook">今後の展望</h2>
    <p>最新AI検索の普及はまだ始まったばかりです。今後はより高度なLLMO技術が必要になると予想されます。</p>

    <h2 id="conclusion">まとめ</h2>
    <p>最新AI検索時代に対応するためには、従来のSEO思考から脱却し、LLMOの観点でコンテンツを見直すことが重要です。早期の対応が競合優位につながるでしょう。</p>
  `,
  excerpt: 'Perplexity AIやChatGPT Search、Google GeminiなどのAI検索エンジンの普及により、従来のSEO戦略は大きく変わりつつあります。LLMO（大規模言語モデル最適化）の重要性について解説します。',
  featuredImage: {
    url: '/hero-image.jpg',
    width: 1200,
    height: 630,
  },
  category: {
    id: 'llmo',
    name: 'LLMO',
    slug: 'llmo',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  tags: [
    { id: 'ai', name: 'AI', slug: 'ai', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 'seo', name: 'SEO', slug: 'seo', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 'llmo', name: 'LLMO', slug: 'llmo', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  ],
  seo: {
    title: 'AI検索時代におけるSEO戦略の変化 | GYAKUTEN コラム',
    description: 'Perplexity AIやChatGPT Search、Google GeminiなどのAI検索エンジンの普及により変化するSEO戦略について、LLMO（大規模言語モデル最適化）の観点から詳しく解説します。',
  },
  createdAt: '2024-01-15',
  updatedAt: '2024-01-15',
  publishedAt: '2024-01-15',
};

const sampleRelatedArticles: Article[] = [
  {
    id: '2',
    title: '中小企業のためのDX推進ガイド',
    slug: 'dx-guide-for-sme',
    content: '',
    excerpt: '限られたリソースでも効果的にDXを推進する方法を、実際の事例とともにご紹介します。',
    category: {
      id: 'dx',
      name: 'DX',
      slug: 'dx',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    publishedAt: '2024-01-10',
  },
  {
    id: '3',
    title: 'Web制作におけるUX/UIデザインのトレンド',
    slug: 'ux-ui-design-trends',
    content: '',
    excerpt: '2024年のWeb制作で押さえておきたいUX/UIデザインのトレンドをまとめました。',
    category: {
      id: 'web',
      name: 'Web制作',
      slug: 'web',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
    publishedAt: '2024-01-05',
  },
];

// ISR設定: 1時間ごとに再検証
export const revalidate = 3600;

// SEO メタデータを動的に生成
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const article = await getArticleBySlug(slug);
    
    if (!article) {
      return {
        title: '記事が見つかりません | GYAKUTEN コラム',
        description: 'お探しの記事は存在しないか、削除された可能性があります。',
      };
    }
    
    return {
      title: article.seo?.title || `${article.title} | GYAKUTEN コラム`,
      description: article.seo?.description || article.excerpt,
      keywords: article.tags?.map(tag => tag.name).join(', '),
      openGraph: {
        title: article.title,
        description: article.excerpt,
        type: 'article',
        locale: 'ja_JP',
        publishedTime: article.publishedAt,
        modifiedTime: article.updatedAt,
        images: article.featuredImage ? [{
          url: article.featuredImage.url,
          width: article.featuredImage.width,
          height: article.featuredImage.height,
          alt: article.title,
        }] : [{
          url: '/ogp.jpg',
          width: 1200,
          height: 630,
          alt: 'GYAKUTEN - 格安システム開発・DX支援',
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        images: article.featuredImage ? [article.featuredImage.url] : ['/ogp.jpg'],
      },
    };
  } catch (error) {
    console.error('メタデータの生成に失敗しました:', error);
    return {
      title: '記事が見つかりません | GYAKUTEN コラム',
      description: 'お探しの記事は存在しないか、削除された可能性があります。',
    };
  }
}

async function getArticleData(slug: string) {
  try {
    // slugでIDとして記事を取得
    const [articleData, popularData] = await Promise.all([
      getArticleBySlug(slug),
      getPopularArticles(3)
    ]);
    
    if (!articleData) {
      return { article: null, relatedArticles: [] };
    }
    
    // 関連記事は同じカテゴリの記事を取得
    let relatedArticles: Article[] = [];
    if (articleData.category) {
      relatedArticles = await getRelatedArticles(articleData.id, articleData.category.id, 3);
    }
    
    // 関連記事が不足している場合は人気記事で補完
    if (relatedArticles.length < 3) {
      const additionalArticles = popularData.filter(
        popular => !relatedArticles.some(related => related.id === popular.id) && popular.id !== articleData.id
      );
      relatedArticles = [...relatedArticles, ...additionalArticles].slice(0, 3);
    }
    
    return {
      article: articleData,
      relatedArticles
    };
  } catch (error) {
    console.error('記事の取得に失敗しました:', error);
    // エラー時はサンプルデータを表示
    if (slug === 'ai-search-seo-strategy') {
      return {
        article: sampleArticle,
        relatedArticles: sampleRelatedArticles
      };
    }
    return { article: null, relatedArticles: [] };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const { article, relatedArticles } = await getArticleData(slug);

  if (!article) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // FAQを抽出（MicroCMSに設定されていない場合は自動抽出）
  const extractedFAQs = article.faq && article.faq.length > 0
    ? article.faq
    : extractFAQFromContent(article.content);

  // 記事要約（MicroCMSに設定されていない場合は excerpt を使用）
  const articleSummary = article.summary || article.excerpt;

  return (
    <Layout>
      {/* Article structured data */}
      <StructuredData 
        type="article" 
        data={{
          article: {
            title: article.title,
            description: article.excerpt || article.seo?.description || '',
            datePublished: article.publishedAt || article.createdAt,
            dateModified: article.updatedAt,
            author: '合同会社GYAKUTEN',
            image: article.featuredImage?.url,
            category: article.category?.name,
            tags: article.tags?.map(tag => tag.name),
          }
        }}
      />
      {/* Breadcrumb structured data */}
      <StructuredData
        type="breadcrumb"
        data={{
          breadcrumb: [
            { name: 'ホーム', item: 'https://gyaku-ten.jp' },
            { name: 'コラム', item: 'https://gyaku-ten.jp/column' },
            { name: article.title, item: `https://gyaku-ten.jp/column/${article.slug}` },
          ]
        }}
      />
      {/* FAQ structured data (LLMO最適化) */}
      {extractedFAQs.length > 0 && (
        <StructuredData
          type="faq"
          data={{
            faq: extractedFAQs
          }}
        />
      )}
      <main className="min-h-screen bg-white overflow-x-hidden">
        {/* パンくずリスト */}
        <nav className="bg-white border-b border-gray-200 pt-5">
          <div className="w-full lg:max-w-6xl lg:mx-auto px-3 sm:px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li className="flex-shrink-0">
                <Link href="/" className="hover:text-primary">
                  ホーム
                </Link>
              </li>
              <li className="flex-shrink-0">
                <span className="text-gray-400">/</span>
              </li>
              <li className="flex-shrink-0">
                <Link href="/column/" className="hover:text-primary">
                  コラム
                </Link>
              </li>
              <li className="flex-shrink-0">
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-black font-medium truncate min-w-0 max-w-[180px] sm:max-w-none">
                {article.title}
              </li>
            </ol>
          </div>
        </nav>

        <div className="w-full lg:max-w-6xl lg:mx-auto px-3 sm:px-4 pt-2 pb-12">

          <div className="w-full lg:max-w-4xl lg:mx-auto">
            {/* メインコンテンツ */}
            <article>
              {/* 記事ヘッダー */}
              <header className="mb-8">
                {article.category && (
                  <div className="mb-4">
                    <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded">
                      {article.category.name}
                    </span>
                  </div>
                )}
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 leading-tight">
                  {article.title}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-6">
                  <time dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt || article.createdAt)}
                  </time>
                  <time dateTime={article.updatedAt}>
                    更新：{formatDate(article.updatedAt)}
                  </time>
                </div>

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {article.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                )}

                {article.featuredImage && (
                  <figure className="aspect-video relative overflow-hidden rounded-lg mb-6">
                    <Image
                      src={article.featuredImage.url}
                      alt={article.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                    <figcaption className="sr-only">{article.title}のメイン画像</figcaption>
                  </figure>
                )}

              </header>

              {/* 記事要約セクション（LLMO最適化） */}
              {articleSummary && (
                <section
                  className="bg-blue-50 border-l-4 border-primary p-4 sm:p-5 md:p-6 mb-8 rounded-r-lg"
                  aria-label="記事の要約"
                  itemProp="abstract"
                  data-llmo-type="summary"
                >
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    この記事の要約
                  </h2>
                  <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{articleSummary}</p>
                </section>
              )}

              {/* 記事本文（LLMO最適化） */}
              <section
                aria-label="記事本文"
                itemProp="articleBody"
                data-llmo-type="content"
                data-llmo-category={article.category?.name}
                data-llmo-difficulty={article.difficultyLevel}
                data-llmo-audience={article.targetAudience}
              >
                <div
                  className="prose prose-lg max-w-none
                    [&>h1]:text-2xl sm:[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-black [&>h1]:mt-12 sm:[&>h1]:mt-16 [&>h1]:mb-6 sm:[&>h1]:mb-8 [&>h1]:border-b-2 [&>h1]:border-primary [&>h1]:pb-3 sm:[&>h1]:pb-4
                    [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-primary [&>h2]:mt-10 sm:[&>h2]:mt-12 [&>h2]:mb-4 sm:[&>h2]:mb-6 [&>h2]:border-b [&>h2]:border-gray-300 [&>h2]:pb-2 sm:[&>h2]:pb-3
                    [&>h3]:text-lg sm:[&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-8 sm:[&>h3]:mt-10 [&>h3]:mb-4 sm:[&>h3]:mb-5 [&>h3]:relative [&>h3]:pl-3 sm:[&>h3]:pl-4 [&>h3]:before:content-[''] [&>h3]:before:absolute [&>h3]:before:left-0 [&>h3]:before:top-1 [&>h3]:before:w-1 [&>h3]:before:h-5 sm:[&>h3]:before:h-6 [&>h3]:before:bg-primary
                    [&>h4]:text-base sm:[&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-gray-800 [&>h4]:mt-6 sm:[&>h4]:mt-8 [&>h4]:mb-3 sm:[&>h4]:mb-4
                    [&>p]:text-sm sm:[&>p]:text-base [&>p]:text-gray-800 [&>p]:leading-relaxed sm:[&>p]:leading-loose [&>p]:mb-5 sm:[&>p]:mb-6
                    [&>ul]:mb-6 sm:[&>ul]:mb-8 [&>ul]:pl-0 [&>ul]:space-y-2 sm:[&>ul]:space-y-3
                    [&>ul>li]:text-sm sm:[&>ul>li]:text-base [&>ul>li]:text-gray-800 [&>ul>li]:leading-relaxed [&>ul>li]:relative [&>ul>li]:pl-5 sm:[&>ul>li]:pl-6
                    [&>ul>li]:before:content-['•'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-0 [&>ul>li]:before:text-primary [&>ul>li]:before:font-bold [&>ul>li]:before:text-base sm:[&>ul>li]:before:text-lg
                    [&>ol]:mb-6 sm:[&>ol]:mb-8 [&>ol]:pl-0 [&>ol]:space-y-2 sm:[&>ol]:space-y-3 [&>ol]:list-none
                    [&>ol>li]:text-sm sm:[&>ol>li]:text-base [&>ol>li]:text-gray-800 [&>ol>li]:leading-relaxed [&>ol>li]:relative [&>ol>li]:pl-7 sm:[&>ol>li]:pl-8
                    [&>ol>li]:before:absolute [&>ol>li]:before:left-0 [&>ol>li]:before:top-0 [&>ol>li]:before:bg-primary [&>ol>li]:before:text-white [&>ol>li]:before:w-5 sm:[&>ol>li]:before:w-6 [&>ol>li]:before:h-5 sm:[&>ol>li]:before:h-6 [&>ol>li]:before:rounded-full [&>ol>li]:before:flex [&>ol>li]:before:items-center [&>ol>li]:before:justify-center [&>ol>li]:before:text-xs sm:[&>ol>li]:before:text-sm [&>ol>li]:before:font-bold
                    [&>p>strong]:text-black [&>p>strong]:font-bold [&>p>strong]:bg-yellow-100 [&>p>strong]:px-1 [&>p>strong]:py-0.5 [&>p>strong]:rounded
                    [&>li>strong]:text-black [&>li>strong]:font-bold [&>li>strong]:bg-yellow-100 [&>li>strong]:px-1 [&>li>strong]:py-0.5 [&>li>strong]:rounded
                    [&>p>em]:text-gray-700 [&>p>em]:italic [&>p>em]:font-medium
                    [&>p>a]:text-primary [&>p>a]:font-medium [&>p>a]:no-underline [&>p>a]:border-b [&>p>a]:border-primary/30 [&>p>a]:transition-all [&>p>a]:duration-200 hover:[&>p>a]:border-primary hover:[&>p>a]:bg-primary/5
                    [&>blockquote]:border-l-3 sm:[&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:bg-gray-50 [&>blockquote]:py-3 sm:[&>blockquote]:py-4 [&>blockquote]:px-4 sm:[&>blockquote]:px-6 [&>blockquote]:my-6 sm:[&>blockquote]:my-8 [&>blockquote]:italic [&>blockquote]:text-sm sm:[&>blockquote]:text-base [&>blockquote]:text-gray-700 [&>blockquote]:rounded-r-md [&>blockquote]:shadow-sm
                    [&>p>code]:bg-gray-100 [&>p>code]:text-primary [&>p>code]:px-1.5 sm:[&>p>code]:px-2 [&>p>code]:py-0.5 sm:[&>p>code]:py-1 [&>p>code]:rounded [&>p>code]:text-xs sm:[&>p>code]:text-sm [&>p>code]:font-mono
                    [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 sm:[&>pre]:p-6 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-6 sm:[&>pre]:my-8 [&>pre]:shadow-lg [&>pre]:border [&>pre]:border-gray-700
                    [&>pre>code]:bg-transparent [&>pre>code]:text-gray-100 [&>pre>code]:p-0 [&>pre>code]:font-mono [&>pre>code]:text-xs sm:[&>pre>code]:text-sm [&>pre>code]:leading-relaxed
                    [&>table]:w-full [&>table]:border-collapse [&>table]:border [&>table]:border-gray-300 [&>table]:my-6 sm:[&>table]:my-8 [&>table]:rounded-lg [&>table]:shadow-sm [&>table]:text-sm sm:[&>table]:text-base
                    [&>table]:block [&>table]:overflow-x-auto [&>table]:whitespace-nowrap sm:[&>table]:table sm:[&>table]:whitespace-normal
                    [&>table>thead]:bg-gray-50 [&>table>thead>tr>th]:border [&>table>thead>tr>th]:border-gray-300 [&>table>thead>tr>th]:px-3 sm:[&>table>thead>tr>th]:px-4 [&>table>thead>tr>th]:py-2 sm:[&>table>thead>tr>th]:py-3 [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:font-semibold [&>table>thead>tr>th]:text-gray-900
                    [&>table>tbody>tr>td]:border [&>table>tbody>tr>td]:border-gray-300 [&>table>tbody>tr>td]:px-3 sm:[&>table>tbody>tr>td]:px-4 [&>table>tbody>tr>td]:py-2 sm:[&>table>tbody>tr>td]:py-3 [&>table>tbody>tr>td]:text-gray-800
                    [&>table>tbody>tr:nth-child(even)]:bg-gray-50 [&>table>tbody>tr:hover]:bg-gray-100
                    [&>figure]:my-6 sm:[&>figure]:my-8 [&>figure>img]:rounded-lg [&>figure>img]:shadow-md [&>figure>img]:w-full
                    [&>figure>p]:text-xs sm:[&>figure>p]:text-sm [&>figure>p]:text-gray-600 [&>figure>p]:text-center [&>figure>p]:mt-2 sm:[&>figure>p]:mt-3 [&>figure>p]:italic"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </section>

              {/* FAQ（モバイル版: インライン表示） */}
              <InlineFAQ faqs={extractedFAQs} />

              {/* シェアボタン */}
              <div className="mt-12">
                <ShareButtons title={article.title} />
              </div>

              {/* 関連記事（LLMO最適化） */}
              <aside
                aria-label="関連記事"
                data-llmo-type="related-content"
                itemProp="relatedLink"
              >
                <RelatedArticles articles={relatedArticles} />
              </aside>
            </article>

          </div>
        </div>
      </main>

      {/* FAQ（PC版: 右下固定表示） */}
      <FloatingFAQ faqs={extractedFAQs} />
    </Layout>
  );
}