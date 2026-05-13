# PRICING_DATA.md

This document serves as the benchmark reference for the `audit-engine.ts` logic. Prices are subject to change by vendors, but this serves as the foundational heuristic for Q3 2024 / 2025 logic.

## Base Assumptions
- **Standard Pro Seats**: ~$20/user/mo
- **Standard Team Seats**: ~$25-$30/user/mo (usually minimum 2-5 seats)
- **API Usage (BYOK)**: Highly variable, but generally 50-70% cheaper than GUI subscriptions for average developer usage.

## Vendor Pricing (Estimates)

### OpenAI
- **ChatGPT Plus**: $20/mo
- **ChatGPT Team**: $30/user/mo (billed monthly), $25/user/mo (billed annually). Min 2 users.
- **ChatGPT Enterprise**: Custom (typically $60/user/mo)

### Anthropic
- **Claude Pro**: $20/mo
- **Claude Team**: $30/user/mo. Min 5 users.

### Coding Assistants
- **GitHub Copilot**: $10/mo (Individual), $19/user/mo (Business), $39/user/mo (Enterprise)
- **Cursor**: $20/mo (Pro), $40/user/mo (Business)
- **Windsurf**: $20/mo (Pro)

## Logic Engine Thresholds
- **Credit Threshold**: Any total stack cost > `$500/mo` triggers the "Startup Credits" recommendation.
- **Overkill Threshold**: Any plan containing the string "Team" or "Enterprise" with `< 3` seats triggers a downgrade warning.
