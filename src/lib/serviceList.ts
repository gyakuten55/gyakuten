export interface Service {
  name: string;
  color: string;
  href: string;
}

export const services: Service[] = [
  { name: 'GYAKUTEN LLMO診断', color: 'brand-red', href: '/services/llmo-diagnosis' },
  { name: 'GYAKUTEN LLMO ウェブ制作', color: 'brand-teal', href: '/services/web-llmo' },
  { name: 'GYAKUTEN LLMO ライティング', color: 'brand-purple', href: '/services/write-llmo' },
  { name: 'GYAKUTEN LLMO コンサル', color: 'brand-blue', href: '/services/llmo-consulting' },
  { name: 'GYAKUTEN システム開発', color: 'brand-orange', href: '/services/dx' },
  { name: 'GYAKUTEN運送統合管理システム', color: 'brand-blue', href: '/products/transport-system' },
  { name: 'GYAKUTENクイックサポート', color: 'brand-green', href: '/services/quick-support' },
  { name: '逆転ブートキャンプ', color: 'brand-teal', href: '/services/bootcamp' }
];