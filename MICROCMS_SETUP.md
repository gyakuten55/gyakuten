# microCMS セットアップガイド

このファイルは、GYAKUTENのコラムページでmicroCMSを使用するためのセットアップ手順を説明します。

## 1. microCMSアカウント作成とブログテンプレート

✅ **既に完了**: ブログテンプレートでプロジェクトが作成済み
- **サービスドメイン**: `e19xdwsicc`
- **API エンドポイント**: `https://e19xdwsicc.microcms.io/api/v1/blogs`

## 2. ブログテンプレートの構造

ブログテンプレートには以下が含まれています：

### Blogs API
- **API ID**: `blogs`
- **API名**: ブログ
- **型**: リスト形式

**デフォルトフィールド:**
```
title (テキスト) - 必須
content (リッチエディタ) - 必須
eyecatch (画像) - アイキャッチ画像
category (カテゴリ) - 複数選択可能
```

**カテゴリ:**
- プログラミング
- デザイン
- マーケティング
- ビジネス
- その他

## 3. 環境変数の設定

`.env.local` ファイルを作成し、以下を設定:

```env
# microCMS設定
MICROCMS_SERVICE_DOMAIN=e19xdwsicc
MICROCMS_API_KEY=your-api-key

# Webhook設定（任意の文字列）
MICROCMS_WEBHOOK_SECRET=your-webhook-secret

# サイトURL（本番環境）
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**APIキーの取得方法:**
1. microCMS管理画面にログイン
2. 「API設定」→「APIキー」をクリック
3. 「APIキーを発行」でAPIキーを作成
4. 作成されたAPIキーを上記の `MICROCMS_API_KEY` に設定

## 4. Webhook設定（自動デプロイ用）

1. microCMS管理画面で「API設定」→「Webhook」を開く
2. 新しいWebhookを作成:
   - **URL**: `https://your-domain.com/api/revalidate`
   - **シークレット**: `.env.local`の`MICROCMS_WEBHOOK_SECRET`と同じ値
   - **トリガー**: 記事の作成・更新・削除時

## 5. コンテンツの作成

### ブログ記事の作成例
microCMS管理画面で「コンテンツ」→「ブログ」→「追加」から記事を作成：

```
タイトル: AI検索時代におけるSEO戦略の変化
コンテンツ: 
<h2>はじめに</h2>
<p>ChatGPTやBardなどのAI検索エンジンの普及により、従来のSEO戦略は大きく変わりつつあります...</p>

<h2>LLMOとは何か</h2>
<p>LLMO（Large Language Model Optimization）は、AI検索エンジンに対してコンテンツを最適化する手法です...</p>

アイキャッチ画像: （任意でアップロード）
カテゴリ: マーケティング
```

### 推奨カテゴリ
GYAKUTENのサービスに合わせて以下のカテゴリを使用：
- **マーケティング**: LLMO、SEO関連
- **ビジネス**: DX、コンサルティング関連  
- **プログラミング**: システム開発関連
- **デザイン**: Web制作関連

## 6. ISR（Incremental Static Regeneration）について

- **再検証間隔**: 1時間（3600秒）
- **Webhook**: リアルタイムでコンテンツ更新時に再生成
- **フォールバック**: サーバーサイドレンダリングでエラー処理

## 7. 本番環境での有効化

実装したコードでmicroCMSを有効にするには:

1. `src/app/column/page.tsx` の28-35行目のコメントアウトを解除
2. `src/app/column/[slug]/page.tsx` でmicroCMS APIを有効化
3. 環境変数が正しく設定されていることを確認

## トラブルシューティング

### よくある問題
1. **API キーエラー**: 環境変数が正しく設定されているか確認
2. **CORS エラー**: microCMSの許可ドメイン設定を確認  
3. **Webhook が動作しない**: シークレットキーが一致しているか確認

### ログの確認
- Vercel: Vercel Dashboard → Functions → Logs
- 開発環境: ターミナルでログを確認

## パフォーマンス最適化

1. **画像最適化**: microCMSの画像変換機能を活用
2. **キャッシュ戦略**: ISRで適切な再検証間隔を設定
3. **CDN**: microCMSの画像CDNを活用

## セキュリティ

1. **API キー**: 環境変数で管理、公開リポジトリにコミットしない
2. **Webhook**: シークレットキーで認証
3. **CORS**: 本番ドメインのみ許可

これで microCMS を使用したコラムシステムが完成します。