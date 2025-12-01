# DynamoDB ドキュメント — commentnow-dev

## 概要

CommentNow アプリのメインデータ（ユーザー、セッション、コメント等）を格納。
テーブルアクセスは CommentNowEC2SSMRole のみに許可され、
他テーブル（例：circus-ad）は完全にブロック済み。

## テーブル基本情報

| 項目         | 内容                                                       |
| ------------ | ---------------------------------------------------------- |
| テーブル名   | commentnow-dev                                             |
| リージョン   | ap-northeast-1                                             |
| キー構造     | パーティションキー：PK（String）／ソートキー：SK（String） |
| 容量モード   | -                                                          |
| 暗号化       | -                                                          |
| アクセス権限 | -                                                          |

## セキュリティ設定

| 項目               | 内容                                                     |
| ------------------ | -------------------------------------------------------- |
| アクセス制御       | CommentNowEC2SSMRole のみアクセス許可                    |
| 他テーブルブロック | circus-ad 等の他プロジェクトテーブルは完全にブロック済み |
| 最小権限の原則     | 必要最小限の DynamoDB 操作権限のみ付与                   |
| 監査ログ           | -                                                        |

## CLI アクセス方法（EC2 / SSM セッション内）

### 1. テーブル一覧確認（接続確認）

```bash
aws dynamodb list-tables --region ap-northeast-1
```

**期待される出力:**

```json
{
	"TableNames": ["commentnow-dev"]
}
```

### 2. アイテム登録

```bash
aws dynamodb put-item \
  --table-name commentnow-dev \
  --item '{
    "PK": {"S": "YOUR_PARTITION_KEY"},
    "SK": {"S": "YOUR_SORT_KEY"},
    "attribute1": {"S": "value1"},
    "attribute2": {"S": "value2"}
  }' \
  --region ap-northeast-1
```

### 3. アイテム取得

```bash
aws dynamodb get-item \
  --table-name commentnow-dev \
  --key '{"PK": {"S": "YOUR_PARTITION_KEY"}, "SK": {"S": "YOUR_SORT_KEY"}}' \
  --region ap-northeast-1
```

### 4. クエリ実行（パーティションキー指定）

```bash
aws dynamodb query \
  --table-name commentnow-dev \
  --key-condition-expression "PK = :pk" \
  --expression-attribute-values '{":pk": {"S": "YOUR_PARTITION_KEY"}}' \
  --region ap-northeast-1
```

### 5. スキャン実行（全アイテム検索）

```bash
aws dynamodb scan \
  --table-name commentnow-dev \
  --limit 10 \
  --region ap-northeast-1
```

## アクセス権限詳細

### ポリシー詳細

- 詳細は確認中
