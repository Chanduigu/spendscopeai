# SpendScope AI

SpendScope AI is an AI Spend Audit platform for startups and engineering teams to discover how much money they are wasting on AI tools and get optimized alternative recommendations.

## Tech Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Zustand
- shadcn/ui
- Recharts

## Getting Started
First, install the dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture Highlights
- Multi-step form with persistent state management (Zustand)
- Custom optimization engine (`src/lib/audit-engine.ts`)
- Highly visual data representation with Recharts and Framer Motion.
- Fully typed application with TypeScript.
