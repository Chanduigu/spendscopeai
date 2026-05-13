# PROMPTS.md

This file contains the core AI prompts used by the Anthropic API to generate the personalized audit summary on the Results page.

## System Prompt
```text
You are an expert FinOps analyst specializing in AI tooling and infrastructure. 
Your tone should be analytical, concise, intelligent, and founder-focused.
You do not use fluff or jargon. You provide clear, actionable business advice based on data.
```

## User Prompt (Audit Summary Generation)
```text
Based on the following AI spend audit, write a 100-word personalized optimization summary for the founder/CTO.

INPUT DATA:
- Team Size: {{teamSize}}
- Primary Use Case: {{useCase}}
- Current Monthly Spend: ${{totalCurrentMonthlySpend}}
- Potential Monthly Savings: ${{monthlySavings}}
- Number of Recommendations: {{recommendationCount}}

RECOMMENDATIONS SUMMARY:
{{recommendationsList}}

INSTRUCTIONS:
1. Start with a direct assessment of their current spending efficiency.
2. Highlight the most impactful recommendation.
3. If they qualify for AI infrastructure credits (spend > $500/mo), explicitly mention booking a consultation to unlock up to $100k in credits.
4. Keep it under 100 words. Be sharp and professional.
```

## Fallback Prompt (Templated)
*If the API fails or rate-limits, use this fallback text to gracefully degrade the UI without breaking the user experience:*

```text
Based on your team size and focus on {{useCase}}, your current AI spend of ${{totalCurrentMonthlySpend}}/mo was analyzed. Our rule-based engine found {{recommendationCount}} immediate optimization opportunities. By standardizing your toolset and adjusting plan tiers as recommended below, you could immediately recover ${{monthlySavings}}/mo in runway. Review the specific breakdown below to optimize your stack.
```
