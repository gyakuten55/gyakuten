import Layout from '@/components/layout/Layout';
import ServicesSection from '@/components/ServicesSection';
import HomePage from '@/components/HomePage';
import KnowledgeSection from '@/components/KnowledgeSection';
import NewsSection from '@/components/NewsSection';
import CTASection from '@/components/CTASection';
import DefinitionsSection from '@/components/DefinitionsSection';
import { getKnowledgeArticles, getNewsArticles } from '@/lib/microcms';
import StructuredData from '@/components/seo/StructuredData';

// ISR設定: 60秒ごとに再検証
export const revalidate = 60;

export default async function Home() {
  // 各カテゴリの最新記事を取得
  const [knowledgeArticles, newsArticles] = await Promise.all([
    getKnowledgeArticles(5),
    getNewsArticles(10)
  ]);
  
  return (
    <Layout>
      {/* Homepage breadcrumb and WebPage structured data */}
      <StructuredData 
        type="breadcrumb" 
        data={{
          breadcrumb: [
            { name: 'ホーム', item: 'https://gyaku-ten.jp' },
          ]
        }}
      />
      <StructuredData
        type="webpage"
        data={{
          webpage: {
            title: '格安システム開発・DX支援 | 中小企業向けデジタル化なら合同会社GYAKUTEN',
            description: '中小企業向け格安システム開発・業務効率化・DX支援なら合同会社GYAKUTEN。補助金対応可能。LLMO最適化・Web制作・コンサルティングまで一括対応。初回診断無料。',
            url: 'https://gyaku-ten.jp',
            datePublished: '2024-01-15',
            dateModified: new Date().toISOString().split('T')[0]
          }
        }}
      />
      <HomePage />
      <ServicesSection />
      <KnowledgeSection articles={knowledgeArticles} />
      <NewsSection articles={newsArticles} />
      <DefinitionsSection />
      <CTASection />
    </Layout>
  );
}
