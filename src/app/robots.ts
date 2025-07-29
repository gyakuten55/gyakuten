import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '*.json',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: [
          '/',
          '/column',
          '/services',
          '/company',
          '/features',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: [
          '/',
          '/column',
          '/services',
          '/company',
          '/features',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'CCBot',
        allow: [
          '/',
          '/column',
          '/services',
          '/company',
          '/features',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Claude-Web',
        allow: [
          '/',
          '/column',
          '/services',
          '/company',
          '/features',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
    ],
    sitemap: 'https://gyaku-ten.jp/sitemap.xml',
  }
}