export interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
}

export interface ServiceItem {
  name: string;
  href: string;
  description: string;
  price?: string;
}

export interface AppItem {
  name: string;
  href: string;
  description: string;
  price?: string;
}

export const navigationItems: NavigationItem[] = [
  { name: "特徴", href: "/features" },
  { name: "コラム", href: "/column" },
  {
    name: "サービス",
    href: "/services",
    children: [
      { name: "GYAKUTEN LLMO診断", href: "/services/llmo-diagnosis" },
      { name: "GYAKUTEN LLMOウェブ制作", href: "/services/web-llmo" },
      { name: "GYAKUTEN LLMOライティング", href: "/services/write-llmo" },
      { name: "GYAKUTEN LLMO Consulting", href: "/services/llmo-consulting" },
      { name: "GYAKUTENシステム開発", href: "/services/dx" },
      { name: "逆転ブートキャンプ", href: "/services/bootcamp" },
    ],
  },
  {
    name: "アプリ",
    href: "/apps",
    children: [
      { name: "アプリ1", href: "#" },
      { name: "アプリ2", href: "#" },
      { name: "アプリ3", href: "#" },
    ],
  },
  { name: "よくある質問", href: "/faq" },
  { name: "会社情報", href: "/company" },
  { name: "資料請求", href: "/materials" },
];

export const serviceItems: ServiceItem[] = [
  {
    name: "GYAKUTEN LLMO診断",
    href: "/services/llmo-diagnosis",
    description: "WebサイトやコラムをLLMO視点で診断",
    price: "無料〜35,000円",
  },
  {
    name: "GYAKUTEN LLMOウェブ制作",
    href: "/services/web-llmo",
    description: "AI検索時代に最適化されたWebサイト制作",
    price: "初期10万円＋月額5,000円（最低7ヶ月契約）",
  },
  {
    name: "GYAKUTEN LLMOライティング",
    href: "/services/write-llmo",
    description: "AI引用に最適化されたプロライティング",
    price: "2.5円/文字（1,000字から）",
  },
  {
    name: "GYAKUTEN LLMO コンサル",
    href: "/services/llmo-consulting",
    description: "AI時代の戦略的伴走コンサルティング",
    price: "スタンダード15万円/月〜",
  },
  {
    name: "GYAKUTENシステム開発",
    href: "/services/dx",
    description: "中小企業向け完全オーダーメイドシステム開発",
    price: "初期開発10万円〜（月額保守0円〜）",
  },
  {
    name: "逆転ブートキャンプ",
    href: "/services/bootcamp",
    description: "180日間代表直伝マンツーマン事業成長プログラム",
    price: "10万円（モニター特別価格）",
  },
];

export const appItems: AppItem[] = [
  {
    name: "FortPlan",
    href: "https://fortplan.vercel.app/",
    description: "大人気ゲームフォートナイトの戦略ボードアプリ",
    price: "月額1,000円",
  },
];