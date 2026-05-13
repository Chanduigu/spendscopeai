"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px] opacity-50 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-1/20 rounded-full blur-[128px] opacity-50 animate-pulse delay-1000"></div>

      <div className="container px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          <span>Discover hidden savings in your AI stack</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
        >
          Stop Overspending on <br className="hidden md:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-1">
            AI Tools & Infrastructure
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
        >
          Audit your AI stack in 60 seconds. Uncover overlapping subscriptions, wasteful plans, and get personalized recommendations to optimize your engineering team's spend.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/audit">
            <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-[0_0_30px_-5px_rgba(var(--primary),0.6)] group">
              Start Free Audit
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#demo">
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-lg font-medium backdrop-blur-sm border-border/50 hover:bg-muted/50">
              See Demo Report
            </Button>
          </Link>
        </motion.div>

        {/* Social Proof / Trusted By */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 border-t border-border/40 pt-10 w-full max-w-5xl"
        >
          <p className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-widest">
            Analyzing tools like
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Tool Logos placeholders (Using text/icons for now) */}
            <div className="flex items-center gap-2 text-xl font-bold font-mono tracking-tighter"><span className="text-3xl">⌘</span> Cursor</div>
            <div className="flex items-center gap-2 text-xl font-bold tracking-tight">GitHub Copilot</div>
            <div className="flex items-center gap-2 text-xl font-bold tracking-tight">ChatGPT</div>
            <div className="flex items-center gap-2 text-xl font-bold tracking-tight font-serif italic">Claude</div>
            <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-blue-400">Gemini</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
