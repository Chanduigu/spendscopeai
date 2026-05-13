import { ToolEntry, UseCase, AuditResult, AuditRecommendation } from "@/types";

export function runAuditEngine(teamSize: number, useCase: UseCase | "", tools: ToolEntry[]): AuditResult {
  let totalCurrentMonthlySpend = tools.reduce((acc, t) => acc + (t.monthlySpend * t.seats), 0);
  let optimizedMonthlySpend = totalCurrentMonthlySpend;
  const recommendations: AuditRecommendation[] = [];

  // RULE 1: Overlapping Coding Assistants
  const codingTools = tools.filter(t => ["Cursor", "GitHub Copilot", "Windsurf"].includes(t.tool));
  if (codingTools.length > 1) {
    const sorted = [...codingTools].sort((a, b) => (a.monthlySpend * a.seats) - (b.monthlySpend * b.seats));
    const toolsToDrop = sorted.slice(1);
    
    let overlapSavings = toolsToDrop.reduce((acc, t) => acc + (t.monthlySpend * t.seats), 0);

    recommendations.push({
      id: "rule-overlap-coding",
      tool: "General",
      type: "consolidation",
      title: "Consolidate Coding Assistants",
      description: `You are paying for multiple AI coding tools (${codingTools.map(t => t.tool).join(", ")}). Standardize on one.`,
      monthlySavings: overlapSavings,
      reasoning: "Engineers rarely use two AI coding assistants simultaneously. Standardizing reduces redundant licensing.",
      confidence: "High"
    });
    optimizedMonthlySpend -= overlapSavings;
  }

  // RULE 2: Overkill Plans (Team/Enterprise for small teams)
  tools.forEach(t => {
    const planLower = t.plan.toLowerCase();
    if ((planLower.includes("team") || planLower.includes("enterprise")) && t.seats < 3) {
      const estimatedIndividualPlanCost = 20;
      const potentialSavings = (t.monthlySpend - estimatedIndividualPlanCost) * t.seats;
      
      if (potentialSavings > 0) {
        recommendations.push({
          id: `rule-overkill-${t.id}`,
          tool: t.tool,
          type: "downgrade",
          title: `Downgrade ${t.tool} Plan`,
          description: `Your team size (${t.seats}) does not justify the ${t.plan} plan for ${t.tool}.`,
          monthlySavings: potentialSavings,
          reasoning: "Team plans offer centralized billing unnecessary for 1-2 users. Pro plans are more cost-effective.",
          confidence: "High"
        });
        optimizedMonthlySpend -= potentialSavings;
      }
    }
  });

  // RULE 3: API vs GUI for Heavy Use Cases
  const chatTools = tools.filter(t => ["ChatGPT", "Claude", "Gemini"].includes(t.tool));
  if (chatTools.length > 0 && useCase === "Coding" && teamSize > 5) {
    const totalChatCost = chatTools.reduce((acc, t) => acc + (t.monthlySpend * t.seats), 0);
    const apiSavings = totalChatCost * 0.5;
    
    recommendations.push({
      id: "rule-move-to-api",
      tool: "General",
      type: "alternative",
      title: "Switch to API / BYOK Interfaces",
      description: "Replace individual $20/mo GUI subscriptions with API-based clients like TypingMind or an internal tool.",
      monthlySavings: apiSavings,
      reasoning: "API consumption is typically 50% cheaper than flat $20/user/mo fees for developers using IDEs concurrently.",
      confidence: "Medium"
    });
    optimizedMonthlySpend -= apiSavings;
  }

  // RULE 4: Claude Pro vs ChatGPT Team for Writing/Research
  const chatGPT = tools.find(t => t.tool === "ChatGPT" && t.plan.toLowerCase().includes("team"));
  if (chatGPT && (useCase === "Writing" || useCase === "Research")) {
    // ChatGPT Team is typically $30/user/mo vs Claude Pro at $20/mo
    const savings = (chatGPT.monthlySpend - 20) * chatGPT.seats;
    if (savings > 0) {
      recommendations.push({
        id: "rule-claude-writing",
        tool: "ChatGPT",
        type: "alternative",
        title: "Switch to Claude Pro for Writing/Research",
        description: "Anthropic's models often outperform GPT-4 for long-form writing and research at a lower cost.",
        monthlySavings: savings,
        reasoning: "Claude 3.5 Sonnet provides superior context windows for research, saving $10/user/mo over ChatGPT Team.",
        confidence: "Medium"
      });
      optimizedMonthlySpend -= savings;
    }
  }

  // RULE 5: Credex AI Infrastructure Credits
  if (totalCurrentMonthlySpend > 500) {
    recommendations.push({
      id: "rule-credex-credits",
      tool: "General",
      type: "credits",
      title: "Unlock AI Infrastructure Credits",
      description: "You qualify for startup credits through Credex for OpenAI, Anthropic, or cloud providers.",
      monthlySavings: 0,
      reasoning: "Startups spending >$500/mo on AI often qualify for partner credit programs (up to $100k) via Credex.",
      confidence: "High"
    });
  }

  optimizedMonthlySpend = Math.max(0, optimizedMonthlySpend);
  const monthlySavings = totalCurrentMonthlySpend - optimizedMonthlySpend;
  
  return {
    totalCurrentMonthlySpend,
    totalCurrentAnnualSpend: totalCurrentMonthlySpend * 12,
    optimizedMonthlySpend,
    optimizedAnnualSpend: optimizedMonthlySpend * 12,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    savingsPercentage: totalCurrentMonthlySpend > 0 ? (monthlySavings / totalCurrentMonthlySpend) * 100 : 0,
    recommendations,
    isOptimized: recommendations.length === 0
  };
}
