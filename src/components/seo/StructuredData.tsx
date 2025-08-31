import { Organization, LocalBusiness, WebSite, Service, Article, FAQPage, BreadcrumbList, WebPage } from 'schema-dts';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'service' | 'local-business' | 'article' | 'faq' | 'breadcrumb' | 'webpage';
  data?: {
    article?: {
      title: string;
      description: string;
      datePublished: string;
      dateModified: string;
      author: string;
      image?: string;
      category?: string;
      tags?: string[];
    };
    faq?: Array<{
      question: string;
      answer: string;
    }>;
    breadcrumb?: Array<{
      name: string;
      item: string;
    }>;
    webpage?: {
      title: string;
      description: string;
      url: string;
    };
    organization?: {
      name: string;
      url: string;
      logo: string;
      contactPoint: {
        '@type': string;
        telephone: string;
        contactType: string;
        availableLanguage: string;
      };
    };
  };
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = 'https://gyaku-ten.jp';
    
    switch (type) {
      case 'organization':
        const organization: Organization = {
          '@type': 'Organization',
          '@id': `${baseUrl}/#organization`,
          name: '合同会社GYAKUTEN',
          alternateName: 'GYAKUTEN',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
            width: '400',
            height: '200',
          },
          sameAs: [
            // SNSアカウントがあれば追加
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+81-70-6664-4597',
            contactType: 'customer service',
            availableLanguage: 'Japanese',
            areaServed: 'JP',
          },
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'JP',
            addressLocality: '東京都',
          },
          foundingDate: '2024',
          description: 'LLMO（大規模言語モデル最適化）を中心とした、中小企業向けのデジタル支援サービスを提供する会社',
          keywords: 'LLMO, AI最適化, Web制作, ライティング, コンサルティング, システム開発',
        };
        return organization;

      case 'website':
        const website: WebSite = {
          '@type': 'WebSite',
          '@id': `${baseUrl}/#website`,
          url: baseUrl,
          name: 'GYAKUTEN | すべての逆境に、最高の逆転劇を。',
          description: 'LLMO（大規模言語モデル最適化）を中心とした、中小企業向けのデジタル支援サービス',
          publisher: {
            '@id': `${baseUrl}/#organization`,
          },
          inLanguage: 'ja-JP',
        };
        return website;

      case 'service':
        const services: Service[] = [
          {
            '@type': 'Service',
            name: '格安システム開発・業務効率化',
            description: '中小企業向け格安システム開発10万円から。Excel・紙運用から脱却し業務効率化を実現。補助金対応可能。',
            provider: { '@id': `${baseUrl}/#organization` },
            serviceType: 'Software Development',
            offers: {
              '@type': 'Offer',
              price: '100000',
              priceCurrency: 'JPY',
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: '100000',
                priceCurrency: 'JPY',
              },
            },
            areaServed: 'JP',
          },
          {
            '@type': 'Service',
            name: 'ホームページ制作・Web制作',
            description: '中小企業向けホームページ制作10万円から。補助金・助成金対応可能。運送会社向けサイト制作実績多数。',
            provider: { '@id': `${baseUrl}/#organization` },
            serviceType: 'Web Development',
            offers: {
              '@type': 'Offer',
              price: '100000',
              priceCurrency: 'JPY',
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: '100000',
                priceCurrency: 'JPY',
              },
            },
            areaServed: 'JP',
          },
          {
            '@type': 'Service',
            name: 'LLMO診断・AI診断',
            description: 'WebサイトのAI検索最適化診断。GoogleやChatGPT検索での評価を無料診断。改善点を明確化。',
            provider: { '@id': `${baseUrl}/#organization` },
            serviceType: 'Website Analysis',
            offers: [
              {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'JPY',
                name: '無料診断プラン',
              },
              {
                '@type': 'Offer',
                price: '35000',
                priceCurrency: 'JPY',
                name: '詳細診断プラン',
              },
            ],
            areaServed: 'JP',
          },
          {
            '@type': 'Service',
            name: 'GYAKUTEN LLMOライティング', 
            description: 'AI引用に最適化されたプロライティング（1,000字から）',
            provider: { '@id': `${baseUrl}/#organization` },
            serviceType: 'Content Writing',
            offers: {
              '@type': 'Offer',
              price: '2.5',
              priceCurrency: 'JPY',
            },
            areaServed: 'JP',
          },
          {
            '@type': 'Service',
            name: 'LLMOコンサルティング・DX支援',
            description: '中小企業向けLLMOコンサルティング・DX支援15万円から。AI検索最適化・売上拡大・業務効率化を継続サポート。',
            provider: { '@id': `${baseUrl}/#organization` },
            serviceType: 'Business Consulting',
            offers: {
              '@type': 'Offer',
              price: '150000',
              priceCurrency: 'JPY',
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: '150000',
                priceCurrency: 'JPY',
              },
            },
            areaServed: 'JP',
          },
          {
            '@type': 'Service',
            name: 'GYAKUTENシステム開発',
            description: '中小企業向け完全オーダーメイドシステム開発',
            provider: { '@id': `${baseUrl}/#organization` },
            serviceType: 'Software Development',
            offers: {
              '@type': 'Offer',
              price: '100000',
              priceCurrency: 'JPY',
            },
            areaServed: 'JP',
          },
          {
            '@type': 'Service',
            name: '逆転ブートキャンプ',
            description: '180日間代表直伝マンツーマン事業成長プログラム',
            provider: { '@id': `${baseUrl}/#organization` },
            serviceType: 'Business Training',
            offers: {
              '@type': 'Offer',
              price: '100000',
              priceCurrency: 'JPY',
            },
            areaServed: 'JP',
          },
        ];
        return services;

      case 'local-business':
        const localBusiness: LocalBusiness = {
          '@type': 'LocalBusiness',
          '@id': `${baseUrl}/#local-business`,
          name: '合同会社GYAKUTEN',
          image: `${baseUrl}/logo.png`,
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'JP',
            addressLocality: '東京都',
          },
          telephone: '+81-70-6664-4597',
          email: 'info@gyaku-ten.jp',
          url: baseUrl,
          openingHours: 'Mo-Fr 09:00-18:00',
          priceRange: '¥0-¥100,000',
        };
        return localBusiness;

      case 'article':
        if (!data?.article) return null;
        const article: Article = {
          '@type': 'Article',
          headline: data.article.title,
          description: data.article.description,
          datePublished: data.article.datePublished,
          dateModified: data.article.dateModified,
          author: {
            '@type': 'Organization',
            name: data.article.author || '合同会社GYAKUTEN',
            url: baseUrl,
          },
          publisher: {
            '@id': `${baseUrl}/#organization`,
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': baseUrl,
          },
          ...(data.article.image && {
            image: {
              '@type': 'ImageObject',
              url: data.article.image,
              width: '1200',
              height: '630',
            },
          }),
          articleSection: data.article.category,
          keywords: data.article.tags?.join(', '),
          inLanguage: 'ja-JP',
        };
        return article;

      case 'faq':
        if (!data?.faq || data.faq.length === 0) return null;
        const faqPage: FAQPage = {
          '@type': 'FAQPage',
          mainEntity: data.faq.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        };
        return faqPage;

      case 'breadcrumb':
        if (!data?.breadcrumb || data.breadcrumb.length === 0) return null;
        const breadcrumbList: BreadcrumbList = {
          '@type': 'BreadcrumbList',
          itemListElement: data.breadcrumb.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.item,
          })),
        };
        return breadcrumbList;

      case 'webpage':
        if (!data?.webpage) return null;
        const webPage: WebPage = {
          '@type': 'WebPage',
          name: data.webpage.title,
          description: data.webpage.description,
          url: data.webpage.url,
          inLanguage: 'ja-JP',
          isPartOf: {
            '@id': `${baseUrl}/#website`,
          },
          about: {
            '@id': `${baseUrl}/#organization`,
          },
        };
        return webPage;

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();
  
  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}