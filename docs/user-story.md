### Epic 1: 認証・ユーザー管理

#### US-001: 事務局管理者認証

**As a** 事務局管理者  
**I want to** コメントシステムを管理するために安全にログインする  
**So that** 専門家のコメントを承認/却下し、記事を管理できる

**受け入れ基準:**

- [ ] 管理者はメール/パスワードでログインできる
- [ ] JWT アクセス/リフレッシュトークンシステムが実装されている
- [ ] ロールベースのアクセス制御（管理者ロール）
- [ ] 適切なトークン有効期限でのセッション管理

#### US-002: 専門家認証

**As an** 専門家ユーザー  
**I want to** 招待制システムを通じてログインする  
**So that** 割り当てられた記事にアクセスし、コメントを投稿できる

**受け入れ基準:**

- [ ] 専門家は招待リンクでのみログインできる　 ←is this magic link? can the user request to send the magic link with their email (which I assume pre-registered)?
- [ ] 専門家ロールの割り当てと検証
- [ ] セキュアなトークンベースの認証
- [ ] メール検証を含む招待システム ←does this mean different from the first one?

### Epic 2: 記事管理

#### US-003: 記事登録

**As an** 事務局管理者  
**I want to** 専門家のコメント用に記事を登録する  
**So that** 専門家が特定のコンテンツにコメントするよう招待できる <- Professionals wont be invited per article. they are invited to the comment now web with their email and after logging in, they should be able to see the assigned articles to comment.

**受け入れ基準:**

- [ ] 管理者は記事 URL、対象 h2 テキスト、メモを入力できる　 ←Admin can register URL, h2 texts and memo for the article.
- [ ] システムが一意の section_id を自動生成する ← not just section_id but embbed js codes?
- [ ] 記事ステータスの追跡（アクティブ/非アクティブ）the article should be always active when its registered. is this more like weather the comment is reflected or not after given the permission to the comment?

#### US-004: 専門家記事アクセス <- I am concerned about this section

**As an** 専門家
**I want to** コメントを招待された記事を確認する <- the professional can check their own comments not other professionals comments
**So that** どのコンテンツに専門知識が必要かを理解できる <- professional could check their comments or not.

**受け入れ基準:**

- [ ] 専門家は割り当てられた記事のみを表示する <- professionals can view the assined articles (or list of arctiles).
- [ ] 記事詳細の表示（URL、対象セクション、メモ）
- [ ] 明確な招待ステータスと期限 <- not sure about invitation status?

### Epic 3: コメントシステム

#### US-005: 専門家コメント投稿

**As an** 専門家  
**I want to** 割り当てられた記事にコメントを投稿する  
**So that** 読者と専門知識を共有できる <- admin will be able to check the comments on the article

**受け入れ基準:**

- [ ] 200-500 文字制限のコメントフォーム
- [ ] 入力検証とサニタイゼーション
- [ ] コメントステータスの追跡（保留/承認/却下）
- [ ] 編集機能なし（削除と再投稿のみ）

#### US-006: コメント承認ワークフロー

**As an** 事務局管理者  
**I want to** 専門家のコメントを確認し、承認/却下する  
**So that** 高品質なコンテンツのみが公開される

**受け入れ基準:**

- [ ] 管理者はすべての保留中のコメントを表示できる <-- admin can view the list of comments on each article by professionals.
- [ ] 承認/却下/フィードバック付き却下のアクション
- [ ] ステータス更新が通知をトリガーする <--to professionals for the notiftication, professionals status, and even the comments reflection on the media's website.
- [ ] 承認されたコメントが即座に利用可能になる <-- available on the media website.
