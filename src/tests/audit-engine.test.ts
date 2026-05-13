import { describe, it, expect } from 'vitest';
import { runAuditEngine } from '@/engine/audit-engine';
import { ToolEntry, UseCase } from '@/types';

describe('Audit Engine Logic', () => {
  it('should calculate 0 savings for an already optimized stack', () => {
    const tools: ToolEntry[] = [
      { id: '1', tool: 'Cursor', plan: 'Pro', seats: 5, monthlySpend: 20 }
    ];
    const result = runAuditEngine(5, 'Coding', tools);
    expect(result.monthlySavings).toBe(0);
    expect(result.isOptimized).toBe(true);
    expect(result.recommendations).toHaveLength(0);
  });

  it('should detect overlapping coding assistants and recommend consolidation', () => {
    const tools: ToolEntry[] = [
      { id: '1', tool: 'Cursor', plan: 'Pro', seats: 5, monthlySpend: 20 },
      { id: '2', tool: 'GitHub Copilot', plan: 'Pro', seats: 5, monthlySpend: 10 }
    ];
    // It should keep Copilot (cheapest total spend) and recommend dropping Cursor
    const result = runAuditEngine(5, 'Coding', tools);
    expect(result.monthlySavings).toBe(100); // dropping Cursor ($20 * 5)
    expect(result.recommendations).toHaveLength(1);
    expect(result.recommendations[0].type).toBe('consolidation');
    expect(result.recommendations[0].confidence).toBe('High');
  });

  it('should flag overkill Team/Enterprise plans for small teams (1-2 users)', () => {
    const tools: ToolEntry[] = [
      { id: '1', tool: 'ChatGPT', plan: 'Team', seats: 2, monthlySpend: 30 }
    ];
    const result = runAuditEngine(2, 'Data', tools);
    expect(result.monthlySavings).toBe(20); // (30 - 20) * 2
    expect(result.recommendations[0].type).toBe('downgrade');
    expect(result.recommendations[0].confidence).toBe('High');
  });

  it('should recommend API migration for large engineering teams heavily using chat UIs', () => {
    const tools: ToolEntry[] = [
      { id: '1', tool: 'Claude', plan: 'Pro', seats: 10, monthlySpend: 20 },
      { id: '2', tool: 'Cursor', plan: 'Pro', seats: 10, monthlySpend: 20 }
    ];
    const result = runAuditEngine(10, 'Coding', tools);
    
    // Total chat cost is 10 * 20 = $200. Rule 3 suggests 50% savings = $100
    const apiRec = result.recommendations.find(r => r.id === 'rule-move-to-api');
    expect(apiRec).toBeDefined();
    expect(apiRec?.monthlySavings).toBe(100);
    expect(apiRec?.confidence).toBe('Medium');
  });

  it('should recommend Claude Pro over ChatGPT Team for Writing/Research', () => {
    const tools: ToolEntry[] = [
      { id: '1', tool: 'ChatGPT', plan: 'Team', seats: 5, monthlySpend: 30 }
    ];
    const result = runAuditEngine(5, 'Research', tools);
    const claudeRec = result.recommendations.find(r => r.id === 'rule-claude-writing');
    expect(claudeRec).toBeDefined();
    // 5 users * ($30 - $20) = $50
    expect(claudeRec?.monthlySavings).toBe(50);
  });

  it('should suggest Credex AI Credits if total monthly spend > $500', () => {
    const tools: ToolEntry[] = [
      { id: '1', tool: 'OpenAI API', plan: 'Pay-as-you-go', seats: 1, monthlySpend: 600 }
    ];
    const result = runAuditEngine(10, 'Coding', tools);
    const creditsRec = result.recommendations.find(r => r.id === 'rule-credex-credits');
    expect(creditsRec).toBeDefined();
    expect(creditsRec?.monthlySavings).toBe(0); // Credits don't reduce immediate 'spend' mathematically in the engine but provide a lead magnet
    expect(creditsRec?.confidence).toBe('High');
  });
});
