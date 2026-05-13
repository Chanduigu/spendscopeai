"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuditStore } from "@/store/use-audit-store";
import { AITool, UseCase } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash2, ArrowRight, ArrowLeft, Bot, Sparkles, Code2, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const TOOLS: AITool[] = [
  "Cursor", "GitHub Copilot", "Claude", "ChatGPT", "Anthropic API", "OpenAI API", "Gemini", "Windsurf", "v0"
];

const USE_CASES: UseCase[] = ["Coding", "Research", "Writing", "Data", "Mixed"];

export function AuditForm() {
  const { 
    currentStep, teamSize, useCase, tools, 
    setTeamSize, setUseCase, addTool, updateTool, removeTool, 
    nextStep, prevStep 
  } = useAuditStore();
  const router = useRouter();

  const handleNext = () => {
    if (currentStep === 1 && (!teamSize || !useCase)) return;
    if (currentStep === 2 && tools.length === 0) return;
    
    if (currentStep === 2) {
      // Proceed to results analysis
      router.push("/audit/analyzing");
    } else {
      nextStep();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex gap-2">
          {[1, 2].map((step) => (
            <div 
              key={step} 
              className={`h-2 w-16 rounded-full transition-all duration-300 ${currentStep >= step ? 'bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]' : 'bg-primary/20'}`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground font-medium">Step {currentStep} of 2</span>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Users className="text-primary" />
                  Team Profile
                </CardTitle>
                <CardDescription>Tell us about your team to help us tailor the recommendations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-lg">Team Size</Label>
                    <span className="text-lg font-bold text-primary">{teamSize} {teamSize === 1 ? 'member' : 'members'}</span>
                  </div>
                  <Slider 
                    value={[teamSize]} 
                    onValueChange={(v) => {
                      const val = Array.isArray(v) ? v[0] : (typeof v === 'number' ? v : 1);
                      setTeamSize(val);
                    }} 
                    max={100} 
                    min={1} 
                    step={1} 
                    className="py-4"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-lg">Primary Use Case</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {USE_CASES.map((uc) => (
                      <Button
                        key={uc}
                        variant={useCase === uc ? "default" : "outline"}
                        className={`h-16 ${useCase === uc ? 'bg-primary/20 text-primary border-primary shadow-[0_0_15px_-3px_rgba(var(--primary),0.4)]' : ''}`}
                        onClick={() => setUseCase(uc)}
                      >
                        {uc === 'Coding' && <Code2 className="mr-2 h-4 w-4" />}
                        {uc === 'Research' && <Bot className="mr-2 h-4 w-4" />}
                        {uc}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-6">
                <Button 
                  onClick={handleNext} 
                  disabled={!useCase} 
                  className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Bot className="text-primary" />
                  Your AI Stack
                </CardTitle>
                <CardDescription>Add all the AI tools, models, and APIs your team currently pays for.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <AnimatePresence>
                  {tools.map((tool, idx) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 rounded-xl border border-border/50 bg-background/50 flex flex-col md:flex-row gap-4 items-end"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 w-full">
                        <div className="space-y-2">
                          <Label>Tool</Label>
                          <Select 
                            value={tool.tool} 
                            onValueChange={(val: any) => {
                              if (val) updateTool(tool.id, { tool: val as AITool });
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Tool" />
                            </SelectTrigger>
                            <SelectContent>
                              {TOOLS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Plan Type</Label>
                          <Input 
                            placeholder="e.g. Pro, Team" 
                            value={tool.plan} 
                            onChange={(e) => updateTool(tool.id, { plan: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Seats</Label>
                          <Input 
                            type="number" 
                            min="1"
                            value={tool.seats} 
                            onChange={(e) => updateTool(tool.id, { seats: parseInt(e.target.value) || 1 })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Spend /mo ($)</Label>
                          <Input 
                            type="number" 
                            min="0"
                            value={tool.monthlySpend} 
                            onChange={(e) => updateTool(tool.id, { monthlySpend: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                      <Button variant="destructive" size="icon" onClick={() => removeTool(tool.id)} className="shrink-0 rounded-full h-10 w-10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <Button 
                  variant="outline" 
                  className="w-full border-dashed border-2 py-8 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                  onClick={() => addTool({ id: Math.random().toString(36).substr(2, 9), tool: "ChatGPT", plan: "Pro", seats: 1, monthlySpend: 20 })}
                >
                  <Plus className="mr-2 h-5 w-5" /> Add Another AI Tool
                </Button>

              </CardContent>
              <CardFooter className="flex justify-between pt-6">
                <Button variant="ghost" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={handleNext} 
                  disabled={tools.length === 0} 
                  className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)]"
                >
                  Analyze My Stack <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
