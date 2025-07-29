import { NextResponse } from 'next/server';

// デバッグ用エンドポイント（本番環境では削除する）
export async function GET() {
  return NextResponse.json({
    microcms: {
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ? 'Set' : 'Not set',
      apiKey: process.env.MICROCMS_API_KEY ? 'Set' : 'Not set',
      webhookSecret: process.env.MICROCMS_WEBHOOK_SECRET ? 'Set' : 'Not set',
    },
    email: {
      smtpHost: process.env.SMTP_HOST ? 'Set' : 'Not set',
      smtpUser: process.env.SMTP_USER ? 'Set' : 'Not set',
      fromEmail: process.env.FROM_EMAIL ? 'Set' : 'Not set',
    },
    site: {
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'Not set',
    },
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}