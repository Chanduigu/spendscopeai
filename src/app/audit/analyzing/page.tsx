"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bot, Loader2 } from "lucide-react";

const steps = [
  "Analyzing tool subscriptions...",
  "Calculating overlaps in team usage...",
  "Evaluating API alternatives...",
  "Generating cost-saving recommendations...",
  "Finalizing your audit report..."
];

export default function AnalyzingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(() => {
          router.push("/audit/results");
        }, 1000);
        return prev;
      });
    }, 1200); // Change text every 1.2s

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-background selection:bg-primary/30 relative overflow-hidden">
      {/* Animated Pulse */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <motion.div
          animate={{ scale: [1, 2, 2.5], opacity: [0.5, 0.2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="w-64 h-64 bg-primary/20 rounded-full"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          <Bot className="w-20 h-20 text-primary" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 rounded-full border-2 border-primary border-t-transparent border-l-transparent"
          />
        </div>

        <div className="h-8 overflow-hidden flex items-center justify-center relative w-80 text-center">
          <motion.p
            key={currentStep}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="text-lg font-medium text-foreground absolute"
          >
            {steps[currentStep]}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
