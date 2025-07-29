import { Organization, LocalBusiness, WebSite, Service } from 'schema-dts';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'service' | 'local-business';
}

export default function StructuredData({ type }: StructuredDataProps) {
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
            name: 'GYAKUTEN LLMO診断',
            description: 'WebサイトやコラムをLLMO視点で診断。無料から有料まで幅広いプランを提供',
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
            name: 'GYAKUTEN LLMOウェブ制作',
            description: 'AI検索時代に最適化されたWebサイト制作',
            provider: { '@id': `${baseUrl}/#organization` },
            serviceType: 'Web Development',
            offers: {
              '@type': 'Offer',
              price: '100000',
              priceCurrency: 'JPY',
            },
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
            name: 'GYAKUTEN LLMO コンサル',
            description: 'AI時代の戦略的伴走コンサルティング',
            provider: { '@id': `${baseUrl}/#organization` },
            serviceType: 'Business Consulting',
            offers: {
              '@type': 'Offer',
              price: '150000',
              priceCurrency: 'JPY',
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
              price: '300000',
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
          priceRange: '¥0-¥300,000',
        };
        return localBusiness;

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