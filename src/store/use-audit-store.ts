import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AITool, UseCase, ToolEntry } from "@/types";

interface AuditState {
  teamSize: number;
  useCase: UseCase | "";
  tools: ToolEntry[];
  currentStep: number;
  setTeamSize: (size: number) => void;
  setUseCase: (useCase: UseCase) => void;
  addTool: (tool: ToolEntry) => void;
  updateTool: (id: string, tool: Partial<ToolEntry>) => void;
  removeTool: (id: string) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetAudit: () => void;
}

export const useAuditStore = create<AuditState>()(
  persist(
    (set) => ({
      teamSize: 1,
      useCase: "",
      tools: [],
      currentStep: 1,
      setTeamSize: (size) => set({ teamSize: size }),
      setUseCase: (useCase) => set({ useCase }),
      addTool: (tool) => set((state) => ({ tools: [...state.tools, tool] })),
      updateTool: (id, updatedTool) =>
        set((state) => ({
          tools: state.tools.map((t) => (t.id === id ? { ...t, ...updatedTool } : t)),
        })),
      removeTool: (id) =>
        set((state) => ({ tools: state.tools.filter((t) => t.id !== id) })),
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
      resetAudit: () => set({ teamSize: 1, useCase: "", tools: [], currentStep: 1 }),
    }),
    {
      name: "spendscope-audit-storage",
    }
  )
);
