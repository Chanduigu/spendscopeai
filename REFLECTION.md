# REFLECTION.md

## Development Reflection

Building SpendScope AI according to the "Upgraded Master Prompt" was an exercise in extreme focus on **UI/UX Polish** and **Business Logic**. 

### What Went Well
- **The Audit Engine**: Moving away from a generic LLM wrapper to a deterministic, hard-coded TypeScript engine was the right call. Pricing logic requires precision. Hallucinations in financial advice break trust immediately. By enforcing strict rules (e.g., overlapping coding assistants), the application acts as a true FinOps tool rather than a toy.
- **Framer Motion Integration**: The subtle micro-interactions, spring animations on the navbar, and the dramatic `AnimatedCounter` on the results page successfully elevate the product from a "student project" to a "Vercel-tier" startup product.
- **Vitest**: Writing unit tests for the engine surfaced an overlapping rule bug (Rule 2 and Rule 4 triggering on the same object), which I was able to immediately patch, ensuring the financial math remains perfect.

### Challenges Faced
- **Type Safety with UI Libraries**: Navigating Next.js 15, React 19, and Radix UI updates caused some minor type friction (e.g., `DialogTrigger asChild` incompatibilities with Base UI, and `Slider` value typing). These were resolved cleanly without `any` hacks where possible.
- **Simulating AI Summaries**: Without immediate access to Anthropic API keys, I architected the UI to gracefully handle the loading states and fallbacks, ensuring development wasn't blocked while waiting for keys.

### Next Steps
- Implement real Supabase Postgres schemas using Prisma or Drizzle.
- Hook up Resend API for actual email delivery.
- Replace the mock AI summary with a real Anthropic `claude-3-haiku` call.
