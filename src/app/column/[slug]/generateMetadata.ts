import { Metadata } from 'next';
import { getArticleBySlug } from '@/lib/microcms';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const article = await getArticleBySlug(params.slug);

    if (!article) {
      return {
        title: '記事が見つかりません | GYAKUTEN',
        description: 'お探しの記事は存在しないか、削除された可能性があります。',
      };
    }

    const title = article.seo?.title || `${article.title} | GYAKUTEN コラム`;
    // LLMO最適化: summary > seo.description > excerpt の優先順位
    // LLM向けのdescriptionは「問題提起→解決策提示」の形式が効果的
    const description = article.summary || article.seo?.description || article.excerpt;
    const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://gyaku-ten.jp'}/column/${article.slug}`;

    return {
      title,
      description,
      keywords: article.tags?.map(tag => tag.name).join(', '),
      openGraph: {
        title,
        description,
        type: 'article',
        url,
        locale: 'ja_JP',
        publishedTime: article.publishedAt,
        modifiedTime: article.updatedAt,
        section: article.category?.name,
        tags: article.tags?.map(tag => tag.name),
        images: article.featuredImage ? [
          {
            url: article.featuredImage.url,
            width: article.featuredImage.width,
            height: article.featuredImage.height,
            alt: article.title,
          }
        ] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: article.featuredImage ? [article.featuredImage.url] : undefined,
      },
      alternates: {
        canonical: url,
      },
    };
  } catch (error) {
    console.error('メタデータの生成に失敗しました:', error);
    return {
      title: 'エラーが発生しました | GYAKUTEN',
      description: 'ページの読み込み中にエラーが発生しました。',
    };
  }
}