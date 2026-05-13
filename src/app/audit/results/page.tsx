import { Navbar } from "@/components/navbar";
import { ResultsView } from "@/components/results-view";

export default function ResultsPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 relative overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500/10 via-background to-background"></div>
        
        <ResultsView />
      </main>
    </div>
  );
}
