export type AITool = "Cursor" | "GitHub Copilot" | "Claude" | "ChatGPT" | "Anthropic API" | "OpenAI API" | "Gemini" | "Windsurf" | "v0";
export type UseCase = "Coding" | "Research" | "Writing" | "Data" | "Mixed";
export type ConfidenceLevel = "High" | "Medium" | "Low";
export type RecommendationType = "downgrade" | "alternative" | "consolidation" | "credits";

export interface ToolEntry {
  id: string;
  tool: AITool;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditRecommendation {
  id: string;
  tool: AITool | "General";
  type: RecommendationType;
  title: string;
  description: string;
  monthlySavings: number;
  reasoning: string;
  confidence: ConfidenceLevel;
}

export interface AuditResult {
  totalCurrentMonthlySpend: number;
  totalCurrentAnnualSpend: number;
  optimizedMonthlySpend: number;
  optimizedAnnualSpend: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPercentage: number;
  recommendations: AuditRecommendation[];
  isOptimized: boolean;
}
