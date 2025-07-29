import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { TableOfContents } from '@/components/column/TableOfContents';
import { RelatedArticles } from '@/components/column/RelatedArticles';
import { ShareButtons } from '@/components/column/ShareButtons';
import { getArticleBySlug, getRelatedArticles, getPopularArticles } from '@/lib/microcms';
import { Article } from '@/types/cms';

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
    <p>ChatGPTやBardなどのAI検索エンジンの普及により、従来のSEO戦略は大きく変わりつつあります。この記事では、LLMO（大規模言語モデル最適化）の重要性について詳しく解説します。</p>

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
    <p>AI検索エンジンがコンテンツを正しく理解できるよう、以下の点に注意してコンテンツを構造化します：</p>
    <ol>
      <li>明確な見出し構造の採用</li>
      <li>論理的な情報の配置</li>
      <li>具体例の豊富な提供</li>
    </ol>

    <h3 id="meta-optimization">メタデータの最適化</h3>
    <p>従来のメタタグに加えて、構造化データの実装が重要になります。</p>

    <h2 id="future-outlook">今後の展望</h2>
    <p>AI検索の普及はまだ始まったばかりです。今後はより高度なLLMO技術が必要になると予想されます。</p>

    <h2 id="conclusion">まとめ</h2>
    <p>AI検索時代に対応するためには、従来のSEO思考から脱却し、LLMOの観点でコンテンツを見直すことが重要です。早期の対応が競合優位につながるでしょう。</p>
  `,
  excerpt: 'ChatGPTやBardなどのAI検索エンジンの普及により、従来のSEO戦略は大きく変わりつつあります。LLMO（大規模言語モデル最適化）の重要性について解説します。',
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
    description: 'ChatGPTやBardなどのAI検索エンジンの普及により変化するSEO戦略について、LLMO（大規模言語モデル最適化）の観点から詳しく解説します。',
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
        }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        images: article.featuredImage ? [article.featuredImage.url] : undefined,
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

  return (
    <Layout>
      <main className="min-h-screen bg-white">
        {/* パンくずリスト */}
        <nav className="bg-white border-b border-gray-200 pt-5">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-primary">
                  ホーム
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/column/" className="hover:text-primary">
                  コラム
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-black font-medium truncate">
                {article.title}
              </li>
            </ol>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 pt-2 pb-12">
          {/* モバイル用目次 */}
          <div className="lg:hidden mb-8">
            <TableOfContents content={article.content} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* メインコンテンツ */}
            <article className="lg:col-span-3">
              {/* 記事ヘッダー */}
              <header className="mb-8">
                {article.category && (
                  <div className="mb-4">
                    <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded">
                      {article.category.name}
                    </span>
                  </div>
                )}
                
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
                  {article.title}
                </h1>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
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
                  <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
                    <Image
                      src={article.featuredImage.url}
                      alt={article.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

              </header>

              {/* 記事本文 */}
              <div 
                className="prose prose-lg max-w-none
                  [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-black [&>h1]:mt-16 [&>h1]:mb-8 [&>h1]:border-b-2 [&>h1]:border-primary [&>h1]:pb-4
                  [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-primary [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:border-b [&>h2]:border-gray-300 [&>h2]:pb-3
                  [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-10 [&>h3]:mb-5 [&>h3]:relative [&>h3]:pl-4 [&>h3]:before:content-[''] [&>h3]:before:absolute [&>h3]:before:left-0 [&>h3]:before:top-1 [&>h3]:before:w-1 [&>h3]:before:h-6 [&>h3]:before:bg-primary
                  [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-gray-800 [&>h4]:mt-8 [&>h4]:mb-4
                  [&>p]:text-gray-800 [&>p]:leading-loose [&>p]:mb-6 [&>p]:text-base
                  [&>ul]:mb-8 [&>ul]:pl-6 [&>ol]:mb-8 [&>ol]:pl-6
                  [&>ul>li]:text-gray-800 [&>ul>li]:mb-3 [&>ul>li]:leading-relaxed [&>ul>li]:marker:text-primary
                  [&>ol>li]:text-gray-800 [&>ol>li]:mb-3 [&>ol>li]:leading-relaxed [&>ol>li]:marker:text-primary
                  [&>p>strong]:text-black [&>p>strong]:font-bold [&>p>strong]:bg-yellow-100 [&>p>strong]:px-1 [&>p>strong]:py-0.5 [&>p>strong]:rounded
                  [&>li>strong]:text-black [&>li>strong]:font-bold [&>li>strong]:bg-yellow-100 [&>li>strong]:px-1 [&>li>strong]:py-0.5 [&>li>strong]:rounded
                  [&>p>em]:text-gray-700 [&>p>em]:italic [&>p>em]:font-medium
                  [&>p>a]:text-primary [&>p>a]:font-medium [&>p>a]:no-underline [&>p>a]:border-b [&>p>a]:border-primary/30 [&>p>a]:transition-all [&>p>a]:duration-200 hover:[&>p>a]:border-primary hover:[&>p>a]:bg-primary/5
                  [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:bg-gray-50 [&>blockquote]:py-4 [&>blockquote]:px-6 [&>blockquote]:my-8 [&>blockquote]:italic [&>blockquote]:text-gray-700
                  [&>p>code]:bg-gray-100 [&>p>code]:text-primary [&>p>code]:px-2 [&>p>code]:py-1 [&>p>code]:rounded [&>p>code]:text-sm [&>p>code]:font-mono
                  [&>figure]:my-8 [&>figure>img]:rounded-lg [&>figure>img]:shadow-md [&>figure>img]:w-full
                  [&>figure>p]:text-sm [&>figure>p]:text-gray-600 [&>figure>p]:text-center [&>figure>p]:mt-3 [&>figure>p]:italic"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* シェアボタン */}
              <div className="mt-12">
                <ShareButtons title={article.title} />
              </div>

              {/* 関連記事 */}
              <RelatedArticles articles={relatedArticles} />
            </article>

            {/* デスクトップ用サイドバー */}
            <aside className="hidden lg:block lg:col-span-1">
              <TableOfContents content={article.content} />
            </aside>
          </div>
        </div>
      </main>
    </Layout>
  );
}