# Advanced Security Configuration for GYAKUTEN Diagnosis System

## 概要
Vercelの従量課金対策として、包括的なセキュリティシステムを実装しました。

## 主要機能

### 1. 多層防御システム
- **IP-based Rate Limiting**: IP毎に時間・日次制限
- **Bot Detection**: 高度なbot検出アルゴリズム
- **Cost Monitoring**: リアルタイムコスト監視
- **Emergency Stop**: 緊急停止機能
- **Geographic Filtering**: 地理的制限（基本実装）

### 2. 制限設定（デフォルト）
```typescript
const COST_LIMITS = {
  maxDailyRequests: 500,           // 全体の1日最大リクエスト数
  maxHourlyRequestsPerIP: 2,       // IP毎1時間最大リクエスト数
  maxDailyRequestsPerIP: 5,        // IP毎1日最大リクエスト数
  emergencyStopThreshold: 1000,    // 緊急停止閾値
  highRiskThreshold: 80            // 高リスク閾値
};
```

### 3. 自動IP管理
- **自動ブラックリスト**: 3回連続違反でIP自動ブラックリスト
- **地理的制限**: 高リスク国からのアクセス制限
- **パターン検出**: 疑わしい行動パターンの検出

## 環境変数設定

### 必須設定
`.env.local`に以下を追加してください：

```bash
# セキュリティ管理用APIキー（強力なキーを生成してください）
ADMIN_API_KEY="your-very-strong-admin-key-here-min-32-chars"

# 既存のSMTP設定（アラート送信用）
SMTP_HOST="your-smtp-host"
SMTP_PORT="465"
SMTP_SECURE="true"
SMTP_USER="your-smtp-user"
SMTP_PASS="your-smtp-password"

# 送信者情報
FROM_NAME="GYAKUTEN System"
FROM_EMAIL="system@gyaku-ten.jp"

# 管理者アラート送信先
ADMIN_EMAIL="admin@gyaku-ten.jp"
```

## セキュリティメトリクス監視

### APIエンドポイント
```bash
# セキュリティメトリクス取得
GET /api/security-metrics
Authorization: Bearer your-admin-api-key

# IP管理（ブラックリスト追加・削除）
POST /api/security-metrics
Authorization: Bearer your-admin-api-key
Content-Type: application/json

{
  "action": "blacklist",  // or "unblacklist"
  "ip": "192.168.1.100",
  "reason": "Malicious bot activity"
}
```

### メトリクス例
```json
{
  "timestamp": "2025-08-08T10:30:00.000Z",
  "metrics": {
    "totalRequests": 1250,
    "dailyRequests": 345,
    "suspiciousRequests": 45,
    "blockedRequests": 23,
    "blacklistedIPCount": 5,
    "trackedIPCount": 234,
    "dailyLimitUtilization": 69.0,
    "emergencyThresholdUtilization": 12.5
  },
  "status": {
    "healthy": true,
    "warning": false,
    "critical": false,
    "emergency": false
  }
}
```

## アラート機能

### 自動アラート条件
1. **IP自動ブラックリスト**: 3回連続違反
2. **高リスクリクエスト**: リスクスコア90以上
3. **制限到達**: 日次制限の80%到達
4. **緊急停止**: 総リクエスト数が緊急閾値到達

### 手動監視推奨
- 日次リクエスト数の確認
- 疑わしいリクエストの傾向分析
- ブラックリストIPの定期確認

## Bot検出アルゴリズム

### 検出パターン
1. **User-Agent分析**: 
   - curl, wget, python等の検出
   - ヘッドレスブラウザ署名の検出

2. **Request Headers**:
   - 必要ヘッダーの欠如
   - 疑わしいヘッダー組み合わせ

3. **Form Data Analysis**:
   - 自動化パターンの検出
   - テストデータの検出
   - 一時メール利用の検出

4. **Behavioral Patterns**:
   - リクエスト間隔の分析
   - 連続アクセスパターンの検出

## コスト最適化

### 推定コスト削減
- **不正リクエスト阻止**: 約70-80%の不正リクエスト削減
- **早期検出**: コストのかかる分析処理前にブロック
- **制限管理**: 予想外の大量アクセスを防止

### 監視推奨値
- **日次制限**: 通常使用量の120-150%に設定
- **緊急停止**: 月額予算を考慮した設定
- **IP制限**: 通常ユーザーに影響しない範囲で厳格に

## トラブルシューティング

### よくある問題

1. **正当なユーザーがブロックされる**
   - IP制限を緩和する
   - ホワイトリスト機能の実装検討

2. **セキュリティメトリクスAPIアクセス不可**
   - ADMIN_API_KEYの確認
   - 認証ヘッダーの形式確認

3. **アラートメールが届かない**
   - SMTP設定の確認
   - ADMIN_EMAIL設定の確認

### ログ確認
```bash
# Vercelログでセキュリティ関連イベントを確認
grep "SECURITY ALERT\|EMERGENCY STOP\|COST ALERT" vercel-logs
```

## 設定のカスタマイズ

### より厳格な設定（高セキュリティ）
```typescript
const STRICT_LIMITS = {
  maxDailyRequests: 200,
  maxHourlyRequestsPerIP: 1,
  maxDailyRequestsPerIP: 2,
  emergencyStopThreshold: 300,
  highRiskThreshold: 60
};
```

### より緩い設定（開発・テスト環境）
```typescript
const RELAXED_LIMITS = {
  maxDailyRequests: 1000,
  maxHourlyRequestsPerIP: 10,
  maxDailyRequestsPerIP: 20,
  emergencyStopThreshold: 2000,
  highRiskThreshold: 90
};
```

## 今後の拡張候補
1. **CAPTCHA統合**: reCAPTCHA v3の実装
2. **ML-based Detection**: より高度な異常検出
3. **CDN Integration**: CloudflareやAWSとの連携
4. **Database Logging**: 永続的なログ保存
5. **Dashboard UI**: Web管理画面の実装