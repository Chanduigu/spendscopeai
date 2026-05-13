# ECONOMICS.md

## Unit Economics of SpendScope AI

### Cost per User (Audit Generation)
- **Frontend Hosting**: Vercel (Virtually $0 on Edge network for MVP).
- **Database**: Supabase Free Tier initially, scaling to $25/mo Pro tier.
- **Email Delivery**: Resend ($0.001 per email after free tier).
- **AI Summary Generation**: Anthropic API (`claude-3-haiku`).
  - Average prompt tokens: ~300
  - Average completion tokens: ~150
  - Cost per audit: `$0.00015`

Total Marginal Cost per Audit: **~$0.00115**

### Revenue Model
SpendScope AI operates as a **Lead Generation Asset**, not a direct SaaS subscription.

#### 1. The "Credex" Partnership Lead Gen
- Users spending >$500/mo on AI are highly qualified leads for infrastructure credit consulting.
- SpendScope AI funnels these users to "Book a Credex Consultation".
- Assume a 2% conversion rate from Audit -> Booked Call.
- Value of a booked call to Credex: ~$500.
- Value per Audit: `$10.00`

#### 2. Affiliate Links (Future)
- Recommend cheaper alternatives (e.g., TypingMind, specific Cloud providers).
- If the user clicks and subscribes, we take a 10-20% affiliate cut.

### ROI
Given the incredibly low marginal cost per user (< $0.01), SpendScope AI is highly profitable as a top-of-funnel marketing tool, provided organic acquisition (Product Hunt, Twitter) keeps CAC (Customer Acquisition Cost) near zero.
