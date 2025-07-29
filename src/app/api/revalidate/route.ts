import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

// microCMS Webhook用のrevalidateエンドポイント
export async function POST(request: NextRequest) {
  try {
    // Webhook認証
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.MICROCMS_WEBHOOK_SECRET;
    
    if (!expectedToken) {
      console.error('MICROCMS_WEBHOOK_SECRET が設定されていません');
      return NextResponse.json(
        { message: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      console.error('不正なWebhook認証');
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { contents, api } = body;

    console.log('Webhook受信:', { api, contents });

    // APIエンドポイントに応じて再検証
    switch (api) {
      case 'articles':
        // 記事関連の再検証
        await revalidatePath('/column');
        
        // 個別記事ページの再検証（更新・公開の場合）
        if (contents?.new?.slug) {
          await revalidatePath(`/column/${contents.new.slug}`);
        }
        if (contents?.old?.slug) {
          await revalidatePath(`/column/${contents.old.slug}`);
        }
        
        console.log('記事関連ページを再検証しました');
        break;

      case 'categories':
        // カテゴリ関連の再検証
        await revalidatePath('/column');
        console.log('カテゴリ関連ページを再検証しました');
        break;

      case 'tags':
        // タグ関連の再検証
        await revalidatePath('/column');
        console.log('タグ関連ページを再検証しました');
        break;

      default:
        console.log(`未対応のAPI: ${api}`);
        break;
    }

    return NextResponse.json({
      message: 'Revalidation completed',
      timestamp: new Date().toISOString(),
      api,
    });

  } catch (error) {
    console.error('Webhook処理エラー:', error);
    return NextResponse.json(
      { 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET メソッドでのヘルスチェック
export async function GET() {
  return NextResponse.json({
    message: 'Webhook endpoint is ready',
    timestamp: new Date().toISOString(),
  });
}