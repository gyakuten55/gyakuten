import Layout from '@/components/layout/Layout';
import ServicesSection from '@/components/ServicesSection';
import HomePage from '@/components/HomePage';
import KnowledgeSection from '@/components/KnowledgeSection';
import NewsSection from '@/components/NewsSection';
import CTASection from '@/components/CTASection';
import { getKnowledgeArticles, getNewsArticles } from '@/lib/microcms';

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
      <HomePage />
      <ServicesSection />
      <KnowledgeSection articles={knowledgeArticles} />
      <NewsSection articles={newsArticles} />
      <CTASection />
    </Layout>
  );
}
