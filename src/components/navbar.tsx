"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/60 border-b border-border/40"
    >
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-primary/20 p-2 rounded-xl">
          <Activity className="w-5 h-5 text-primary" />
        </div>
        <span className="font-bold text-xl tracking-tight">SpendScope AI</span>
      </Link>
      
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
        <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</Link>
        <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link href="/audit">
          <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-full shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)]">
            Start Free Audit
          </Button>
        </Link>
      </div>
    </motion.header>
  );
}
