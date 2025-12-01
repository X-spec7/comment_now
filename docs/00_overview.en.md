# Weby MVP Comment_Now Project Overview

When updating this Doc, please make sure to update the corresponding English file using Cursor/relatedAI. (Vice versa)

## Project Purpose

Comment Now is a **service that embeds expert comment functionality into media sites**. The main objectives are SEO improvement and brand authority acquisition, providing high-quality content through an approval-based comment system.

## Hypothesis

- **SEO Improvement**: Expert comments enhance the quality of media articles and contribute to improved search engine rankings
- **Brand Authority Acquisition**: Publishing expert comments increases the credibility and authority of media sites
- **Expert Exposure**: Provides experts with new exposure opportunities, creating mutual benefits

## Personas

### Office (Administrator)

- Media operators (for in-house media)
- Focus on article quality improvement and SEO effects
- Want to control comment quality through approval system

### Experts (Registered in Profile)

- Personnel with expertise in various fields
- Participate by invitation only
- Want to showcase their expertise

### Media Operators (External)

- Existing media site operators
- Want to add comment functionality with simple embedding
- Want to minimize technical burden

### Initial Problem-Solving Prototype

#### ◾️ Will experts comment based on the above needs?

---

## Functional Requirements

### A. Foundation

#### Authentication

- **Office Login**: Email/Passwordless or OTP email authentication (or direct DB authentication)
- **Expert Login**: Same as above, initially invitation-based only (selective invitations)

#### Email Sending

- **Expert Invitation Email**: Login with Magic Link
  - Expert registration (directly in DB (Seed data))
- **Post Approval/Rejection Notification**: Simple template (may be removed)

---

### B. Office Side (Within Weby-Profile Site)

#### Article Registration Form

- **Input Fields**:
  - Article URL
  - Target h2 text (manual copy-paste)
  - Optional memo
- **When Saving**: Auto-generate `section_id`

#### Code Generation & Copy

- Display and copy `[weby_section id="xxx"]` or `<iframe src=...>` immediately

#### Post Approval Flow

- **Expert Post List**: Comment body + poster
- **Status Change**: Approve/Reject/Return?
- **After Approval**: Immediately reflect comment publication on external site (returned from API)

#### Deletion Function (Articles/Comments)

- Can delete expert's incorrect registrations or inappropriate posts

#### Cache Control

- Invalidate cache for target `section_id` when approving posts (immediate reflection)

---

### C. Expert Side (Within Weby-Profile Site)

#### Login

- Invitation only (limited to experts in specific categories)

#### Invited Article List

- No categories/tags, simple list

#### Post Form

- **Input Limit**: 200-500 characters (use Library)
- **Notes**: Checkbox (e.g., no external links)

#### Post History

- Display status for each article: "New/Pending Approval/Approved/Rejected"

#### No Editing

- Handle incorrect posts with "Delete → Repost"

---

### D. Media Side (External)

#### Embedded Display

- Simply paste copied `<script>` to activate
- Actual rendering is completed within `<iframe>` (sandboxed)

#### Display Content

- **Approved**: Top 1 comment (body only)
- **Expert Information**: Name and title (face photo not displayed in MVP or sample image)
- **Unapproved**: Blank (nothing displayed)

#### CSS Application

- MVP uses inline CSS (included in API response) for minimal implementation
- Future structure allows extracting common CSS for external loading

#### Fallback

- When API errors or timeouts occur, iframe remains blank without affecting main article content

---

### E. Effect Measurement

#### Mainly SEO Improvement

- Display number of approved comments
- Display PV count (session count) of approved articles

#### Brand Publication → Authority Acquisition

---

## Architecture (Tentative: To be discussed)

### Infrastructure

- **AWS API Gateway + Lambda** (Node/TypeScript)
- **DynamoDB** (minimal table configuration: experts, sections, comments, moderation, metrics)
- **CloudFront + S3** for distributing `embed.js` / `widget.html` / admin UI
- **SES** for email sending (invitations and approval notifications)

### Authentication

- **Auth0 or Cognito** (MVP uses Magic Link/OTP for minimal implementation)
- **2 Roles**: `admin` (office) / `expert` (expert)

### Embedding

- `<script>` generates `<iframe>`
- iframe → calls API `/sections/{id}/top-comment` to get comments
- Renders HTML with inline CSS (only 1 approved item)
- Uses CloudFront cache, invalidates on approval for immediate updates

### Security

- iframe sandboxing (separated from article side)
- API CORS controlled by whitelist
- Returns blank for unapproved comments (safe fallback)

---

## Success Indicators (KPIs)

### Short-term (MVP Period)

- Expert registrations: 10 or more
- Approved comments: 50 or more
- Embedded sites: 5 or more

### Medium-term (3 months later)

- Approved comments: 200 or more
- Embedded sites: 20 or more
- Monthly PV: 10,000 PV or more

### Long-term (6 months later)

- Approved comments: 500 or more
- Embedded sites: 50 or more
- Monthly PV: 50,000 PV or more
- Quantitative measurement of SEO effects

---

## Risks and Countermeasures

### Technical Risks

- **iframe Restrictions**: Limitations due to CSP policies of each media site
  - Countermeasure: Sandboxing and fallback functionality
- **Performance**: Site speed degradation due to embedding
  - Countermeasure: CloudFront cache and asynchronous loading

### Business Risks

- **Expert Participation Rate**: Limitations due to invitation-only system
  - Countermeasure: Providing attractive exposure opportunities
- **Media Site Adoption Rate**: High technical barriers
  - Countermeasure: Providing simple embedding methods

---

## Development Phases

### Phase 1: MVP Foundation Construction (2 weeks)

- Authentication system construction
- Basic CRUD functionality
- Basic implementation of embedding functionality

### Phase 2: Approval Flow Implementation (2 weeks)

- Admin screens for office and experts
- Approval flow implementation
- Email notification functionality

### Phase 3: Embedding Optimization (1 week)

- iframe optimization
- Cache control
- Performance improvement

### Phase 4: Effect Measurement & Improvement (Ongoing)

- Analytics functionality implementation
- User feedback collection
- Feature improvement

---

Last updated: 2025-01-19
