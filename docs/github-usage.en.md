# Weby MVP GitHub Operations Guide

This document outlines the **GitHub-centric operational rules and documentation management policies** for Weby MVP development.  
We do not use external tools like Notion, managing everything with **GitHub as the single source of truth**.

---

## Operational Policy

### 1. Make GitHub the "Single Source of Truth"

- Complete all code, specifications, discussions, and history within GitHub.
- Use Slack for real-time discussions. Final decisions and outcomes are recorded in GitHub.
- Do not use Notion, Google Docs, etc. (to prevent confusion).

### 2. Treat Code and Documentation Equally

- Manage specifications, architecture, progress, and hypotheses in Markdown within the `/docs` folder.
- Update related documentation simultaneously with code changes.
- Treat "documentation updates as part of development."

### 3. Keep it Simple and Lean

- Write documentation **"to advance development now"** rather than "to read later."
- One file, one theme, keep it short.
- Record only important decisions and policies.

---

## Repository Structure (Overview)

```
weby/
├── README.md # Top-level documentation for developers
├── docs/ # Centralized documentation management
│ ├── 00_overview.md # Project overview, objectives, hypotheses
│ ├── 10_architecture.md # Technical architecture, dependencies
│ ├── 20_db.md # DB schema and Prisma models
│ ├── 30_api.md # API endpoint definitions
│ ├── 40_ui.md # Figma links, screen designs
│ ├── 50_research.md # Competitor analysis, validation notes
│ ├── decision-log.md # Major decision history
│ └── tasks/
│ ├── sprint-01.md
│ └── backlog.md
├── .github/
│ ├── ISSUE_TEMPLATE/
│ ├── PULL_REQUEST_TEMPLATE.md
│ └── workflows/
└── src/
└── ... (implementation code)
```

---

## Documentation Operations Rules

| Type                   | File Example               | Content & Purpose                                              |
| ---------------------- | -------------------------- | -------------------------------------------------------------- |
| Project Overview       | `/docs/00_overview.md`     | Objectives, hypotheses, personas, etc.                         |
| Technical Architecture | `/docs/01_architecture.md` | Next.js, Supabase configuration diagrams, dependency libraries |
| DB Design              | `/docs/02_db.md`           | Prisma schema, ER diagrams                                     |
| API Specifications     | `/docs/03_api.md`          | Each endpoint and input/output                                 |
| UI Specifications      | `/docs/04_ui.md`           | Figma links, screen listings                                   |
| Research & Validation  | `/docs/05_research.md`     | Lean validation logs, comparison notes                         |
| Sprint Progress        | `/docs/tasks/sprint-xx.md` | Weekly progress, ToDos                                         |
| Decision History       | `/docs/decision-log.md`    | Records of technical selections, policy changes                |

---

## Workflow

### 1. Issue-Driven Development

- Always create an Issue for new features and problems.  
  Title example: `feat: add user login flow`
- Summarize important discussions in Issues after Slack discussions.
- Close when work is complete and update related documentation.

### 2. Pull Request Operations

- Branch naming: `feature/xxx`, `fix/xxx`, `chore/xxx`
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/).
- Fill in overview and verification methods according to PR template.
- Update related Docs in the same PR when code changes.

### 3. Documentation Updates

- Update `/docs` when specifications change or APIs are added.
- Update `/docs/tasks/sprint-xx.md` at weekend or sprint end.
- Add to `/docs/decision-log.md` when research or decisions occur.

---

## Sprint Operations (Example)

1 sprint = 1 week unit.  
Summarize each week's progress and policies in `/docs/tasks/sprint-xx.md`.

```md
# Sprint 01 (2025-10-07 ~ 2025-10-14)

## Focus

- MVP login screen construction
- Supabase Auth connection

## Tasks

- [x] Supabase initial setup
- [ ] Login UI / API connection
- [ ] Deploy to staging

## Notes

- Planning to verify Edge function authentication behavior

## Recommended Practices

1 PR = 1 topic.
Update documentation simultaneously.

Merge small and frequently.
Speed priority, refactor later in batches.

Transfer Slack decisions to Docs.
Always leave confirmed content in GitHub.

Always place information "nearby".
Code-related notes in comments, specification changes in docs.

## Security and Sharing Rules

Keep personal environment variables in .env.local and do not push to Git.

Share confidential information via Slack DM or 1Password.

Only administrators can edit GitHub Secrets.

## This Guide Updates

This guide itself is also managed on GitHub.
When rules change or policies shift, create a PR and update /docs/github-usage.md.

Last updated: 2025-10-08
```
