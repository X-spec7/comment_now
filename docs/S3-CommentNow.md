# S3 ドキュメント — commentnow-app-storage

## 概要

CommentNow プロジェクト専用の S3 バケット。
アプリで扱う静的ファイル、アップロードデータ、ログなどを安全に保管。
アクセスは IAM ロール CommentNowEC2SSMRole に限定されており、
他バケットへの操作は不可。

## 基本情報

| 項目         | 内容                   |
| ------------ | ---------------------- |
| バケット名   | commentnow-app-storage |
| リージョン   | ap-northeast-1（東京） |
| 暗号化       | -                      |
| 公開設定     | -                      |
| アクセス権限 | -                      |

## セキュリティ設定

| 項目                            | 設定値 |
| ------------------------------- | ------ |
| パブリックアクセスブロック      | -      |
| → 新しいパブリック ACL          | -      |
| → パブリック ACL のアップロード | -      |
| → 任意のパブリック書き込み      | -      |
| → パブリック読み取りアクセス    | -      |
| バケットポリシー                | -      |
| 暗号化                          | -      |
| バージョニング                  | -      |
| MFA 削除                        | -      |

## IAM アクセス制御

### 関連ポリシー

| ポリシー名           | 用途                   | アクセス範囲                        |
| -------------------- | ---------------------- | ----------------------------------- |
| -                    | S3 操作                | commentnow-app-storage バケットのみ |
| CommentNowEC2SSMRole | EC2 インスタンスロール | 上記ポリシーをアタッチ              |

### アクセス許可内容

- 詳細は確認中

## CLI アクセス方法（EC2 / SSM セッション内）

### 前提条件

- EC2 インスタンス（i-06c328e7748bd5dda）に SSM セッションで接続済み
- IAM ロール CommentNowEC2SSMRole がアタッチ済み
- AWS CLI がインストール・設定済み

### 基本操作コマンド

#### バケット内ファイル一覧

```bash
aws s3 ls s3://commentnow-app-storage --region ap-northeast-1
```

#### ディレクトリ別ファイル一覧

```bash
# uploads ディレクトリ内のファイル
aws s3 ls s3://commentnow-app-storage/uploads/ --region ap-northeast-1

# logs ディレクトリ内のファイル
aws s3 ls s3://commentnow-app-storage/logs/ --region ap-northeast-1
```

#### ファイルアップロード

```bash
# 単一ファイルアップロード
aws s3 cp ./localfile.txt s3://commentnow-app-storage/uploads/localfile.txt --region ap-northeast-1

# ディレクトリ全体アップロード
aws s3 cp ./local-directory/ s3://commentnow-app-storage/uploads/ --recursive --region ap-northeast-1

# メタデータ付きアップロード
aws s3 cp ./image.jpg s3://commentnow-app-storage/uploads/image.jpg \
  --metadata "content-type=image/jpeg,uploaded-by=app" \
  --region ap-northeast-1
```

#### ファイルダウンロード

```bash
# 単一ファイルダウンロード
aws s3 cp s3://commentnow-app-storage/uploads/localfile.txt ./downloaded.txt --region ap-northeast-1

# ディレクトリ全体ダウンロード
aws s3 cp s3://commentnow-app-storage/uploads/ ./local-backup/ --recursive --region ap-northeast-1
```

#### ファイル削除

```bash
# 単一ファイル削除
aws s3 rm s3://commentnow-app-storage/uploads/localfile.txt --region ap-northeast-1

# ディレクトリ全体削除
aws s3 rm s3://commentnow-app-storage/temp/ --recursive --region ap-northeast-1
```
