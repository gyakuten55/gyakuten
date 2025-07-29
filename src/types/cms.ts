// microCMS用の型定義

export interface MicroCMSDate {
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
}

export interface Category extends MicroCMSDate {
  id: string;
  name: string;
}

export interface Blog extends MicroCMSDate {
  id: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  category?: Category;
}

// 下位互換のためのエイリアス
export interface Article extends Blog {
  slug: string;
  excerpt: string;
  featuredImage?: {
    url: string;
    height: number;
    width: number;
  };
  tags?: Tag[];
  seo?: {
    title: string;
    description: string;
  };
}

export interface Tag extends MicroCMSDate {
  id: string;
  name: string;
  slug: string;
}

export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface MicroCMSQueries {
  draftKey?: string;
  limit?: number;
  offset?: number;
  orders?: string;
  q?: string;
  fields?: string;
  ids?: string;
  filters?: string;
  depth?: number;
}