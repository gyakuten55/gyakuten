import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GYAKUTEN | すべての逆境に、最高の逆転劇を。',
    short_name: 'GYAKUTEN',
    description: '合同会社GYAKUTENは、LLMO（大規模言語モデル最適化）を中心とした、中小企業向けのデジタル支援サービスを提供しています。',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#8f2c34',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}