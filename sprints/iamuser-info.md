# IAM 構成メモ（SSM アクセス用）

## 概要

開発者が EC2 インスタンスへ安全にアクセスできるよう、SSH ではなく AWS Systems Manager (SSM Session Manager) を利用します。IAM ユーザーでの認証＋ MFA により、鍵不要・安全な接続を実現します。

## IAM ロール構成（CommentNowEC2SSMRole）

### 概要

CommentNow 開発用 EC2 インスタンスのアクセス・監視・データ操作を最小権限で安全に実行できるロール構成。

| 項目             | 内容                                                    |
| ---------------- | ------------------------------------------------------- |
| ロール名         | CommentNowEC2SSMRole                                    |
| 用途             | EC2 から SSM・S3・DynamoDB・CloudWatch へ安全にアクセス |
| 対象インスタンス | i-06c328e7748bd5dda（Ubuntu）                           |

### アタッチ済みポリシー

| ポリシー名                   | 目的                        | アクセス範囲                        |
| ---------------------------- | --------------------------- | ----------------------------------- |
| AmazonSSMManagedInstanceCore | EC2 への SSM セッション接続 | SSM / EC2 管理                      |
| CloudWatchAgentServerPolicy  | CloudWatch メトリクス送信   | CloudWatch Agent                    |
| -                            | DynamoDB 操作               | commentnow-dev テーブルのみ         |
| -                            | S3 操作                     | commentnow-app-storage バケットのみ |

## IAM ユーザー構成

| 項目               | 内容                                           |
| ------------------ | ---------------------------------------------- |
| ユーザー名         | arktecher                                      |
| 認証方法           | AWS コンソール / CLI ログイン（MFA 有効化）    |
| グループ           | CommentNowSSMAccess                            |
| カスタムポリシー名 | SSMAccessBasicPolicyForCommentNow              |
| 付与ポリシー       | グループ単位で付与（ユーザーへ直接付与しない） |

## カスタムポリシー内容（SSMAccessBasicPolicyForCommentNow）

- 詳細は確認中

## 接続確認とセッション管理

### 1. インスタンス一覧の確認

SSM に登録されているインスタンスを確認します。
このコマンドで `PingStatus: Online` が表示されていれば接続可能です。

```bash
aws ssm describe-instance-information --region ap-northeast-1
```

**期待される出力:**

- 詳細は確認中

### 2. セッション開始

SSH 不要で直接シェルに入ります。

```bash
aws ssm start-session --target i-06c328e7748bd5dda --region ap-northeast-1
```
