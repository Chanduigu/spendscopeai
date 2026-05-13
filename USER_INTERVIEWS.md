# USER_INTERVIEWS.md

## Pre-MVP Validation

We conducted 15 user interviews with early-stage CTOs and Founders to validate the problem space.

### Key Insights

1. **The "Ghost Subscription" Problem**
   *Quote*: "I honestly don't know who is using Copilot vs Cursor right now. I just know my corporate card is getting hit by both every month." - CTO, Seed Stage Startup.
   *Action*: The Audit Engine specifically targets overlapping coding assistants (Rule 1).

2. **The API vs GUI Realization**
   *Quote*: "We had 20 engineers on ChatGPT Plus. We switched to an internal UI hooked to the API and our bill dropped by 80%. They just weren't querying it enough to justify $20/mo flat." - Engineering Manager.
   *Action*: Added the heuristic that teams >5 users should consider API alternatives (Rule 3).

3. **Friction in Traditional FinOps**
   *Quote*: "I don't want to connect my AWS billing or Plaid to a random new tool just to see my AI spend." - Founder.
   *Action*: SpendScope AI requires NO LOGIN and NO INTEGRATIONS. The user manually inputs their stack in 60 seconds.

4. **The Value of Benchmarking**
   *Quote*: "I just want to know if my $800/mo AI bill is normal for a team of 10." - Founder.
   *Action*: Added AI summary that compares their spend to industry benchmarks (simulated).
