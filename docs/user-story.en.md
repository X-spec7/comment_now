### Epic 1: Authentication & User Management

#### US-001: Office Admin Authentication

**As an** office administrator  
**I want to** log in securely to manage the comment system  
**So that** I can approve/reject expert comments and manage articles

**Acceptance Criteria:**

- [ ] Admin can log in with email/password
- [ ] JWT access/refresh token system implemented
- [ ] Role-based access control (admin role)
- [ ] Session management with proper token expiration

#### US-002: Expert Authentication

**As an** expert user  
**I want to** log in through invitation-only system  
**So that** I can access my assigned articles and submit comments

**Acceptance Criteria:**

- [ ] Expert login via invitation link only ←is this magic link?
- [ ] Expert login via invitation link only ←is this magic link? can the user request to send the magic link with their email (which I assume pre-registered)?
- [ ] Expert role assignment and validation
- [ ] Secure token-based authentication
- [ ] Invitation system with email verification ←does this mean different from the first one?

### Epic 2: Article Management

#### US-003: Article Registration

**As an** office admin  
**I want to** register articles for expert commenting  
**So that** experts can be invited to comment on specific content <- Professionals wont be invited per article. they are invited to the comment now web with their email and after logging in, they should be able to see the assigned articles to comment.

**Acceptance Criteria:**

- [ ] Admin can input article URL, target h2 text, and memo ← Admin can register URL, h2 texts and memo for the article. Memo is probably misleading.
- [ ] System auto-generates unique section_id ← not just section_id but embbed js codes?
- [ ] Article status tracking (active/inactive) the article should be always active when its registered. is this more like weather the comment is reflected or not after given the permission to the comment?

#### US-004: Expert Article Access <- I am concerned about this section

**As an** expert  
**I want to** see articles I'm invited to comment on <- the professional can check their own comments not other professionals comments  
**So that** I can understand what content needs my expertise <- professional could check their comments or not.

**Acceptance Criteria:**

- [ ] Expert sees only assigned articles <- professionals can view the assined articles (or list of arctiles).
- [ ] Article details display (URL, target section, memo)
- [ ] Clear invitation status and deadlines <- not sure about invitation status?

### Epic 3: Comment System

#### US-005: Expert Comment Submission

**As an** expert  
**I want to** submit comments on assigned articles  
**So that** my expertise can be shared with readers <- admin will be able to check the comments on the article

**Acceptance Criteria:**

- [ ] Comment form with 200-500 character limit
- [ ] Input validation and sanitization
- [ ] Comment status tracking (pending/approved/rejected)
- [ ] No editing capability (delete and resubmit only)

#### US-006: Comment Approval Workflow

**As an** office admin  
**I want to** review and approve/reject expert comments  
**So that** only high-quality content is published

**Acceptance Criteria:**

- [ ] Admin can view all pending comments <-- admin can view the list of comments on each article by professionals.
- [ ] Approve/reject/reject with feedback actions
- [ ] Status updates trigger notifications <--to professionals for the notiftication, professionals status, and even the comments reflection on the media's website.
- [ ] Approved comments become immediately available <-- available on the media website.
