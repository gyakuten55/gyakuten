import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function NotFound() {
  return (
    <Layout>
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 pt-24 pb-12 text-center">
          <h1 className="text-2xl font-bold text-black mb-4">記事が見つかりません</h1>
          <p className="text-gray-600 mb-8">
            お探しの記事は存在しないか、削除された可能性があります。
          </p>
          <Link
            href="/column/"
            className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            コラム一覧に戻る
          </Link>
        </div>
      </main>
    </Layout>
  );
}