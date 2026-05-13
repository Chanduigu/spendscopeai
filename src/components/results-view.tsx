"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuditStore } from "@/store/use-audit-store";
import { runAuditEngine } from "@/engine/audit-engine";
import { AuditResult } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Download, Share2, Sparkles, TrendingDown, DollarSign, Mail, Bot } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import Link from "next/link";

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += 1;
      setCount(Math.floor((value / steps) * current));
      if (current >= steps) {
        setCount(value);
        clearInterval(timer);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [value]);

  return <span>${count.toLocaleString()}</span>;
}

import { captureLead } from "@/actions/capture-lead";

export function ResultsView() {
  const { teamSize, useCase, tools } = useAuditStore();
  const [result, setResult] = useState<AuditResult | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (tools.length > 0) {
      const res = runAuditEngine(teamSize, useCase, tools);
      setResult(res);
    }
  }, [teamSize, useCase, tools]);

  const handleCaptureLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("email", email);
    formData.append("auditData", JSON.stringify(result));
    
    const response = await captureLead(formData);
    
    setIsSubmitting(false);
    if (response.success) {
      setShowSuccess(true);
    } else {
      console.error(response.error);
    }
  };

  if (!result) return null; // Or a loading spinner

  const chartData = tools.map(t => ({
    name: t.tool,
    value: t.monthlySpend * t.seats
  }));

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 pb-24">
      {/* Massive Savings Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 pt-10"
      >
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4 backdrop-blur-sm">
          <Sparkles className="mr-2 h-4 w-4" />
          <span>Audit Complete</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          You can save <br className="hidden md:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
            <AnimatedCounter value={result.annualSavings} /> / year
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We found <strong>{result.recommendations.length} optimization opportunities</strong> in your AI stack that could reduce your spend by {result.savingsPercentage.toFixed(0)}%.
        </p>

        <div className="flex justify-center gap-4 pt-6">
          <Dialog>
            <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm h-11 rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_0_30px_-5px_rgba(var(--primary),0.6)]">
              <Share2 className="h-5 w-5" /> Share & Export Report
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-card border-border/50 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle>Unlock Your Full Report</DialogTitle>
                <DialogDescription>
                  Enter your email to receive the full detailed PDF breakdown and a shareable public link.
                </DialogDescription>
              </DialogHeader>
              {!showSuccess ? (
                <form onSubmit={handleCaptureLead} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@company.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background/50"
                    />
                  </div>
                  <DialogFooter className="sm:justify-end">
                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? "Sending..." : "Get My Report"} <Mail className="ml-2 w-4 h-4" />
                    </Button>
                  </DialogFooter>
                </form>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-500 mb-2">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Report Sent!</h3>
                  <p className="text-muted-foreground text-sm">Check your inbox. We've sent the PDF and the public link to {email}.</p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Cards */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card/40 backdrop-blur-md border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Current Monthly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${result.totalCurrentMonthlySpend.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-primary/10 border-primary/20 backdrop-blur-md relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
                <TrendingDown className="w-4 h-4" /> Optimized Monthly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">${result.optimizedMonthlySpend.toLocaleString()}</div>
              <p className="text-sm text-primary/80 mt-1">After applying recommendations</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-card/40 backdrop-blur-md border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Current Annual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${result.totalCurrentAnnualSpend.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Breakdown Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="h-full border-border/50 bg-card/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Spend Breakdown</CardTitle>
              <CardDescription>Where your budget is going every month.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full pb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`var(--chart-${(index % 5) + 1})`} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: any) => [`$${value}`, 'Monthly Spend']}
                    contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Summary Mock */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="h-full border-border/50 bg-card/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" /> AI Audit Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Based on your team size of <strong>{teamSize}</strong> focusing on <strong>{useCase}</strong>, 
                your current AI spend of <strong>${result.totalCurrentMonthlySpend}/mo</strong> is significantly higher than industry benchmarks.
              </p>
              <p>
                The primary inefficiency lies in overlapping subscriptions. Standardizing your toolset and adjusting 
                plan tiers could immediately recover <strong>${result.monthlySavings}/mo</strong> in runway. 
              </p>
              {result.totalCurrentMonthlySpend > 500 && (
                <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20 flex flex-col gap-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" /> Startup Credits Available
                  </h4>
                  <p className="text-sm">You are eligible for AI infrastructure credits. Schedule a consultation to unlock up to $100k in credits.</p>
                  <Button size="sm" className="w-fit">Book Credex Consultation <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="space-y-6">
        <h3 className="text-2xl font-bold">Actionable Recommendations</h3>
        {result.recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.recommendations.map((rec, i) => (
              <Card key={rec.id} className="border-border/50 bg-card/40 backdrop-blur-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                      <CardDescription>{rec.tool}</CardDescription>
                    </div>
                    {rec.monthlySavings > 0 && (
                      <span className="bg-green-500/20 text-green-500 text-sm font-semibold px-3 py-1 rounded-full">
                        Save ${rec.monthlySavings}/mo
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground">{rec.description}</p>
                  <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                    <strong>Reasoning:</strong> {rec.reasoning}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border/50 bg-card/40 backdrop-blur-md">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <Sparkles className="w-12 h-12 text-primary mb-4" />
              <h4 className="text-xl font-bold mb-2">Your stack is perfectly optimized!</h4>
              <p className="text-muted-foreground max-w-md">We didn't find any major inefficiencies in your current AI tooling setup. Keep up the good work!</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
