import { createClient, MicroCMSQueries } from 'microcms-js-sdk';
import { Article, Blog, Category, Tag, MicroCMSListResponse, FAQItem } from '@/types/cms';

// microCMSクライアントの作成
const createMicroCMSClient = () => {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!serviceDomain || !apiKey) {
    console.warn('microCMS環境変数が設定されていません。サンプルデータを使用します。');
    return null;
  }

  return createClient({
    serviceDomain,
    apiKey,
  });
};

export const client = createMicroCMSClient();

// ブログ記事一覧を取得
export const getBlogs = async (queries?: MicroCMSQueries): Promise<MicroCMSListResponse<Blog>> => {
  if (!client) {
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
    };
  }
  
  try {
    const listData = await client.getList<Blog>({
      endpoint: 'blogs',
      queries,
    });
    return listData;
  } catch (error) {
    console.error('ブログデータの取得に失敗しました:', error);
    console.error('Environment check:', {
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ? 'Set' : 'Not set',
      apiKey: process.env.MICROCMS_API_KEY ? 'Set' : 'Not set',
    });
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
    };
  }
};

// ブログ記事詳細を取得
export const getBlog = async (contentId: string, queries?: MicroCMSQueries): Promise<Blog | null> => {
  if (!client) {
    return null;
  }
  
  try {
    const detailData = await client.getListDetail<Blog>({
      endpoint: 'blogs',
      contentId,
      queries,
    });
    return detailData;
  } catch (error) {
    console.error('ブログ記事の取得に失敗しました:', error);
    return null;
  }
};

// ブログデータをArticle形式に変換
const convertBlogToArticle = (blog: Blog): Article => {
  return {
    ...blog,
    slug: blog.id, // IDをスラッグとして使用
    excerpt: blog.content ? blog.content.substring(0, 200).replace(/<[^>]*>/g, '') + '...' : '',
    featuredImage: blog.eyecatch,
    tags: [],
    seo: {
      title: blog.title,
      description: blog.content ? blog.content.substring(0, 160).replace(/<[^>]*>/g, '') : '',
    },
  };
};

// 下位互換のための記事一覧取得関数
export const getArticles = async (queries?: MicroCMSQueries): Promise<MicroCMSListResponse<Article>> => {
  const blogData = await getBlogs(queries);
  
  return {
    ...blogData,
    contents: blogData.contents.map(convertBlogToArticle),
  };
};

// 下位互換のための記事詳細取得関数
export const getArticle = async (contentId: string, queries?: MicroCMSQueries): Promise<Article | null> => {
  const blogData = await getBlog(contentId, queries);
  if (!blogData) return null;
  return convertBlogToArticle(blogData);
};

// IDで記事を取得（スラッグの代わりにIDを使用）
export const getArticleBySlug = async (slug: string, queries?: MicroCMSQueries): Promise<Article | null> => {
  try {
    const blogData = await getBlog(slug, queries);
    if (!blogData) return null;
    return convertBlogToArticle(blogData);
  } catch (error) {
    console.error('記事の取得に失敗しました:', error);
    return null;
  }
};

// カテゴリ一覧を取得（専用のcategoriesエンドポイントから）
export const getCategories = async (queries?: MicroCMSQueries): Promise<MicroCMSListResponse<Category>> => {
  if (!client) {
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
    };
  }
  
  try {
    const listData = await client.getList<Category>({
      endpoint: 'categories',
      queries,
    });
    return listData;
  } catch (error) {
    console.error('カテゴリの取得に失敗しました:', error);
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
    };
  }
};

// タグ一覧を取得（ブログテンプレートにはタグがないため空を返す）
export const getTags = async (): Promise<MicroCMSListResponse<Tag>> => {
  return {
    contents: [],
    totalCount: 0,
    offset: 0,
    limit: 0,
  };
};

// 人気記事を取得
export const getPopularArticles = async (limit: number = 5): Promise<Article[]> => {
  const listData = await getArticles({
    limit,
    orders: '-publishedAt',
  });
  return listData.contents;
};

// ナレッジカテゴリ（ナレッジ・豆知識、メディア掲載）の最新記事を取得
export const getKnowledgeArticles = async (limit: number = 5): Promise<Article[]> => {
  try {
    const listData = await getArticles({
      filters: 'category[equals]lxxvy2zcjao[or]category[equals]2qu9s-e28',
      limit,
      orders: '-publishedAt',
    });
    console.log('ナレッジ記事取得結果:', listData.contents.length, '件');
    return listData.contents;
  } catch (error) {
    console.error('ナレッジ記事の取得に失敗しました:', error);
    return [];
  }
};

// Newsカテゴリ（お知らせ、導入実績）の最新記事を取得
export const getNewsArticles = async (limit: number = 10): Promise<Article[]> => {
  try {
    const listData = await getArticles({
      filters: 'category[equals]b2_6yjp8q7i[or]category[equals]plw89y7oixfz',
      limit,
      orders: '-publishedAt',
    });
    console.log('News記事取得結果:', listData.contents.length, '件');
    return listData.contents;
  } catch (error) {
    console.error('News記事の取得に失敗しました:', error);
    return [];
  }
};

// 関連記事を取得
export const getRelatedArticles = async (currentArticleId: string, categoryId?: string, limit: number = 3): Promise<Article[]> => {
  let filters = `id[not_equals]${currentArticleId}`;

  if (categoryId) {
    filters += `[and]category[equals]${categoryId}`;
  }

  const listData = await getArticles({
    filters,
    limit,
    orders: '-publishedAt',
  });

  return listData.contents;
};

// 記事本文からFAQを自動抽出
export const extractFAQFromContent = (htmlContent: string): FAQItem[] => {
  const faqs: FAQItem[] = [];

  // HTMLタグを除去してテキストを抽出するヘルパー関数
  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '').trim();
  };

  // パターン1: h2/h3見出しに「？」「?」が含まれている場合
  const headingPattern = /<h[23][^>]*>([^<]*[？?][^<]*)<\/h[23]>\s*<p[^>]*>([^<]+)<\/p>/gi;
  let match;

  while ((match = headingPattern.exec(htmlContent)) !== null) {
    const question = stripHtml(match[1]);
    const answer = stripHtml(match[2]);

    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  // パターン2: Q: と A: の形式
  const qaPattern = /(?:Q:|質問[:：])\s*([^\n<]+)[\s\S]*?(?:A:|回答[:：])\s*([^\n<]+)/gi;

  while ((match = qaPattern.exec(htmlContent)) !== null) {
    const question = stripHtml(match[1]);
    const answer = stripHtml(match[2]);

    if (question && answer && !faqs.some(f => f.question === question)) {
      faqs.push({ question, answer });
    }
  }

  // パターン3: dt/dd形式
  const dlPattern = /<dt[^>]*>([^<]+)<\/dt>\s*<dd[^>]*>([^<]+)<\/dd>/gi;

  while ((match = dlPattern.exec(htmlContent)) !== null) {
    const question = stripHtml(match[1]);
    const answer = stripHtml(match[2]);

    if (question && answer && !faqs.some(f => f.question === question)) {
      faqs.push({ question, answer });
    }
  }

  return faqs;
};