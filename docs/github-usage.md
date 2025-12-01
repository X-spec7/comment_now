# Weby MVP GitHub 運用ガイド

本ドキュメントは、Weby MVP 開発における**GitHub 中心の運用ルールとドキュメント管理方針**をまとめたものです。
Notion など外部ツールは使用せず、**GitHub を唯一の情報源（Single Source of Truth）**として管理します。

この Doc を更新するときは、Cursor/relatedAI にて必ず、対象の英語ファイルを更新してください。（Viceversa)

---

## 運用方針

### 1. GitHub を“唯一の情報源”にする

- コード、仕様、議論、履歴をすべて GitHub 内で完結。
- Slack はリアルタイム議論用。最終決定・成果は GitHub に残す。
- Notion や Google Docs などは使用しない（混乱防止）。

### 2. コードとドキュメントを同列で扱う

- `/docs` フォルダ内に、仕様・構成・進捗・仮説を Markdown で管理。
- コードの変更と同時に、関連するドキュメントも更新する。
- 「ドキュメントの更新＝開発の一部」という扱い。

### 3. シンプルに、リーンに

- ドキュメントは**「後で読むため」ではなく「今開発を進めるため」**に書く。
- 1 ファイル 1 テーマで短く。
- 重要な判断・方針だけを記録する。

---

## リポジトリ構成（概要）

weby/
├── README.md # 開発者向けトップドキュメント
├── docs/ # ドキュメント一元管理
│ ├── 00_overview.md # プロジェクト概要・目的・仮説
│ ├── 10_architecture.md # 技術構成・依存関係
│ ├── 20_db.md # DB スキーマや Prisma モデル
│ ├── 30_api.md # API エンドポイント定義
│ ├── 40_ui.md # Figma リンク・画面設計
│ ├── xx
│ ├── decision-log.md # 主要な意思決定履歴
│ └── tasks/
│ ├── sprint-251014-251018.md
│ └── backlog.md
├── .github/
│ ├── ISSUE_TEMPLATE/
│ ├── PULL_REQUEST_TEMPLATE.md
│ └── workflows/
└── src/
└── ...（実装コード）

yaml
コードをコピーする

---

## ドキュメント運用ルール

| 種類             | ファイル例                 | 内容・用途                               |
| ---------------- | -------------------------- | ---------------------------------------- |
| プロジェクト概要 | `/docs/00_overview.md`     | 目的・仮説・ペルソナなど                 |
| 技術構成         | `/docs/10_architecture.md` | Next.js・Supabase 構成図、依存ライブラリ |
| DB 設計          | `/docs/20_db.md`           | Prisma schema・ER 図                     |
| API 仕様         | `/docs/30_api.md`          | 各エンドポイントと入出力                 |
| UI 仕様          | `/docs/40_ui.md`           | Figma リンク・画面一覧                   |
| 検証・調査       | `/docs/05_research.md`     | リーン検証ログ・比較メモ                 |
| スプリント進行   | `/docs/tasks/sprint-xx.md` | 週単位の進捗・ToDo                       |
| 意思決定履歴     | `/docs/decision-log.md`    | 技術選定・方針変更などの記録             |

---

## ワークフロー

### 1. Issue 駆動開発

- 新しい機能・課題は必ず Issue を作成。  
  タイトル例：`feat: add user login flow`
- 重要な議論は Slack 後に Issue へまとめる。
- 作業完了でクローズし、関連ドキュメントを更新。

### 2. Pull Request 運用

- Branch 命名: `feature/xxx`, `fix/xxx`
- コミットは [Conventional Commits](https://www.conventionalcommits.org/) に準拠。
- PR テンプレートに沿って概要・確認方法を記入。
- コード変更に関係する Docs も同 PR 内で更新。

### 3. ドキュメント更新

- 仕様変更・API 追加時には `/docs` 内を更新する。
- 週末 or スプリント終了時に `/docs/tasks/sprint-yymmdd-dd.md` を更新。
- 調査・判断が発生した場合は `/docs/decision-log.md` に追記。

---

## スプリント運用（例）

1 スプリント＝ 1 週間単位。  
各週の進捗・方針を `/docs/tasks/sprint-yymmdd-dd.md` にまとめる。

```md
# Sprint 00 (251007-251011)

## Focus

- MVP ログイン画面構築
- Supabase Auth 接続

## Tasks

- [x] Supabase 初期設定
- [ ] Login UI / API 接続
- [ ] Deploy to staging

## Notes

- Edge function の認証挙動を確認予定

## 推奨プラクティス

1 PR = 1 トピック。
ドキュメント更新も同時に行う。

小さく頻繁にマージ。
スピード優先、リファクタは後でまとめて。

Slack での決定事項は Doc へ転記。
確定した内容は必ず GitHub に残す。

情報は必ず「近くに置く」。
コードに関するメモはコメント、仕様変更は docs。

## セキュリティと共有ルール

.env.local に個人の環境変数を保持し、Git には Push しない。

機密情報は Slack DM や 1Password 経由で共有。

GitHub 上の Secrets は管理者のみ編集可能。

## このガイドの更新

本ガイド自体も GitHub で管理します。
ルール変更・方針転換があれば、PR を立てて /docs/github-usage.md を更新してください。

Last updated: 2025-10-08
```
