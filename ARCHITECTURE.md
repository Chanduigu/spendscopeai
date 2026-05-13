# ARCHITECTURE.md

## Overview
SpendScope AI is built on a modern, robust, and scalable stack using **Next.js 15 (App Router)**. The architecture prioritizes speed, SEO, and extreme UI polish, utilizing React Server Components where beneficial and client components where heavy interactivity (animations, state) is required.

## Folder Structure
```text
spend-scope-ai/
├── src/
│   ├── actions/      # Next.js Server Actions (Lead capture, DB writes)
│   ├── app/          # Next.js App Router (Pages, Layouts, API Routes)
│   ├── components/   # React Components (UI, Forms, Recharts, framer-motion)
│   ├── engine/       # Core Business Logic (Hard-coded Audit Engine)
│   ├── hooks/        # Custom React Hooks
│   ├── lib/          # Utilities (Tailwind merge, shadcn utils)
│   ├── store/        # Zustand global state (Persisted in localStorage)
│   ├── tests/        # Vitest Test Suites
│   └── types/        # TypeScript Interfaces & Types
├── .github/
│   └── workflows/    # CI/CD Pipeline
└── public/           # Static assets (fonts, icons)
```

## Database Schema (Supabase)
To support the robust lead capture and viral reporting loop, we utilize Supabase (PostgreSQL).

### Table: `leads`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary Key |
| `email` | text | Unique user email |
| `company` | text | Company name |
| `role` | text | User role |
| `team_size` | int | Total company/team size |
| `created_at` | timestamp | Timestamp of capture |

### Table: `audits`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary Key |
| `lead_id` | uuid | Foreign key to `leads.id` |
| `total_spend` | decimal | Total monthly spend |
| `optimized_spend`| decimal | Potential new monthly spend |
| `created_at` | timestamp | Audit date |

### Table: `tool_entries`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary Key |
| `audit_id` | uuid | Foreign key to `audits.id` |
| `tool_name` | text | (e.g. Cursor, ChatGPT) |
| `plan` | text | (e.g. Pro, Team) |
| `seats` | int | Quantity |
| `spend` | decimal | Monthly cost |

### Table: `reports`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary Key (also Public URL slug) |
| `audit_id` | uuid | Foreign key to `audits.id` |
| `summary` | text | AI generated summary |
| `is_public` | boolean | Public visibility flag |

## Core Logic: The Audit Engine
The application relies on a hard-coded, heavily tested business logic engine located in `src/engine/audit-engine.ts`. This ensures fast, deterministic, and financially accurate recommendations without relying on unpredictable AI responses for pricing logic. AI is *only* used for generating the personalized text summary at the end.
