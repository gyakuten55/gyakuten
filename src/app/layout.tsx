import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GYAKUTEN | すべての逆境に、最高の逆転劇を。",
  description: "合同会社GYAKUTENは、LLMO（大規模言語モデル最適化）を中心とした、中小企業向けのデジタル支援サービスを提供しています。診断・Web制作・ライティング・コンサルティング・システム開発・ブートキャンプまで、あらゆる逆境を逆転劇に変えるパートナーです。",
  keywords: "LLMO, AI最適化, Web制作, ライティング, コンサルティング, システム開発, 中小企業, デジタル化, 逆転, GYAKUTEN",
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
  openGraph: {
    title: "GYAKUTEN | すべての逆境に、最高の逆転劇を。",
    description: "合同会社GYAKUTENは、LLMO（大規模言語モデル最適化）を中心とした、中小企業向けのデジタル支援サービスを提供しています。",
    url: 'https://gyaku-ten.jp',
    siteName: 'GYAKUTEN',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'GYAKUTEN Logo',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "GYAKUTEN | すべての逆境に、最高の逆転劇を。",
    description: "合同会社GYAKUTENは、LLMO（大規模言語モデル最適化）を中心とした、中小企業向けのデジタル支援サービスを提供しています。",
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
