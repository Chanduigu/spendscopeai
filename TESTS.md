# TESTS.md

## Testing Strategy
SpendScope AI relies on **Vitest** for unit testing the core business logic (`src/engine/audit-engine.ts`). The philosophy is: UI changes frequently, but financial math must remain perfect.

## Minimum Viable Tests (Completed)
The test suite currently contains 6 robust test cases designed to simulate edge cases and overlapping scenarios:

1. **Perfect Stack Test**: Validates that if a team's stack is already optimized, the engine returns `$0` savings and flags `isOptimized: true`.
2. **Consolidation Logic**: Ensures that if a user has multiple IDE extensions (Cursor + Copilot), the engine correctly keeps the cheapest/standard one and recommends dropping the others.
3. **Plan Downgrade Detection**: Flags when a user enters a "Team" or "Enterprise" plan for a team size of 1 or 2, calculating the delta savings of switching back to "Pro".
4. **API Migration**: Tests the heavy-usage heuristic. If a team > 5 users relies purely on Chat GUI interfaces for coding, the engine suggests an API/BYOK (Bring Your Own Key) migration with a 50% estimated savings.
5. **Model Efficiency**: Specifically targets overlapping research/writing use cases, highlighting Anthropics' cost advantage over OpenAI's Team tiers.
6. **Infrastructure Credits**: Triggers the Credex AI credit lead magnet strictly when monthly spend > $500.

## Running Tests
Tests are integrated into the GitHub Actions CI pipeline, but can be run locally:
```bash
# Run once
npm run test

# Run in watch mode for development
npm run test:watch
```
