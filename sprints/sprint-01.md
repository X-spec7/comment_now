# スプリント 01: 基盤・バックエンドアーキテクチャ

**期間:** 第 1 週（5 日間）  
**フォーカス:** ユーザーストーリー、データベース設計、バックエンド基盤

## スプリント目標

1. 包括的なユーザーストーリーと受け入れ基準の定義
2. DynamoDB を使用したデータベーススキーマの設計と実装
3. NestJS を使用したスケーラブルなバックエンドアーキテクチャの構築
4. JWT ベースの認証システムの実装
5. 適切なバリデーションを含むバージョン管理された API 構造の設定

## ユーザーストーリー

> **注意**: ユーザーストーリーの詳細は後続のスプリントで定義されます。

## データベース設計

### DynamoDB テーブル

#### 1. Users テーブル

> **詳細**: ユーザー情報のスキーマ設計は後続のスプリントで実装されます。

#### 2. Articles テーブル

> **詳細**: 記事管理のスキーマ設計は後続のスプリントで実装されます。

#### 3. Comments テーブル

> **詳細**: コメント機能のスキーマ設計は後続のスプリントで実装されます。

#### 4. Invitations テーブル

> **詳細**: 招待機能のスキーマ設計は後続のスプリントで実装されます。

#### 5. Refresh Token テーブル

> **詳細**: 認証トークン管理のスキーマ設計は後続のスプリントで実装されます。

## バックエンドアーキテクチャ

### プロジェクト構造

```
backend/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── guards/
│   │   ├── strategies/
│   │   └── decorators/
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── dto/
│   ├── articles/
│   │   ├── articles.controller.ts
│   │   ├── articles.service.ts
│   │   ├── articles.module.ts
│   │   └── dto/
│   ├── comments/
│   │   ├── comments.controller.ts
│   │   ├── comments.service.ts
│   │   ├── comments.module.ts
│   │   └── dto/
│   ├── common/
│   │   ├── constants/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── pipes/
│   │   └── utils/
│   ├── database/
│   │   ├── dynamodb.service.ts
│   │   ├── repositories/
│   │   └── schemas/
│   └── app.module.ts
├── prisma/
│   └── schema.prisma
└── package.json
```

### コアコンポーネント

#### 1. 認証モジュール

- JWT アクセス/リフレッシュトークンの実装
- ロールベースの認可ガード
- パスワードハッシュユーティリティ

#### 2. 汎用 API レスポンス

```typescript
interface ApiResponse<T> {
	success: boolean
	data?: T
	message: string
	errors?: string[]
	meta?: {
		timestamp: string
		version: string
		requestId: string
	}
}
```

#### 3. バリデーションスキーマ（Zod）

```typescript
// ユーザーバリデーション
const CreateUserSchema = z.object({
	email: z.string().email(),
	role: z.enum(['admin', 'expert']),
	profile: z.object({
		name: z.string().min(1),
		title: z.string().optional(),
		bio: z.string().optional(),
	}),
})

// 記事バリデーション
const CreateArticleSchema = z.object({
	url: z.string().url(),
	targetH2: z.string().min(1),
	memo: z.string().optional(),
	assignedExperts: z.array(z.string()).optional(),
})
```

#### 4. エラーハンドリング

```typescript
// エラー定数
export const ERROR_MESSAGES = {
	USER_NOT_FOUND: 'ユーザーが見つかりません',
	INVALID_CREDENTIALS: '無効な認証情報',
	UNAUTHORIZED: '認証されていません',
	FORBIDDEN: 'アクセスが禁止されています',
	VALIDATION_ERROR: 'バリデーションエラー',
	INTERNAL_ERROR: '内部サーバーエラー',
} as const

// 成功メッセージ
export const SUCCESS_MESSAGES = {
	USER_CREATED: 'ユーザーが正常に作成されました',
	LOGIN_SUCCESS: 'ログインに成功しました',
	ARTICLE_CREATED: '記事が正常に作成されました',
	COMMENT_SUBMITTED: 'コメントが正常に投稿されました',
} as const
```

## 技術実装

### 1. NestJS セットアップ

- [ ] TypeScript で NestJS プロジェクトを初期化
- [ ] 環境変数の設定
- [ ] データベースマイグレーション用の Prisma 設定
- [ ] DynamoDB 接続の設定

### 2. 認証システム

- [ ] Passport を使用した JWT 戦略の実装
- [ ] アクセス/リフレッシュトークンサービスの作成
- [ ] ロールベースガードの構築（AdminGuard、ExpertGuard）

### 3. API バージョニング

- [ ] バージョン管理されたルートの設定（v1、v2）
- [ ] バージョン固有のコントローラーの実装
- [ ] バージョン対応レスポンスインターセプターの作成

### 4. バリデーション・エラーハンドリング

- [ ] Zod バリデーションパイプの設定
- [ ] グローバル例外フィルターの実装
- [ ] リクエストログの実装
- [ ] エラーレスポンス標準化の構築

### 5. データベース層

- [ ] DynamoDB サービスラッパーの作成
- [ ] リポジトリパターンの実装
- [ ] データアクセスオブジェクト（DAO）の設定
- [ ] マイグレーションスクリプトの作成

## 成功指標

### 技術指標

- [ ] すべての API エンドポイントが標準化されたレスポンスを返す
- [ ] 認証システムが 100+の同時ユーザーを処理する

### 機能指標

- [ ] 管理者が正常にログインし、記事を管理できる
- [ ] 専門家招待システムがエンドツーエンドで動作する
- [ ] 記事登録が一意の section_id を生成する
- [ ] コメント投稿が入力を正しく検証する

## 完了の定義

- [ ] すべてのユーザーストーリーが受け入れ基準を満たす
- [ ] データベーススキーマが実装され、テストされている
- [ ] 認証システムが安全で機能する
- [ ] API エンドポイントが文書化され、テストされている
- [ ] エラーハンドリングがすべてのエッジケースをカバーする
- [ ] コードが確立されたパターンと規約に従う

---

**次のスプリント:** Next.js を使用したフロントエンド基盤、認証統合、UI コンポーネント
