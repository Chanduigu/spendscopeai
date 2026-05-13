import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30">
      <Navbar />
      <main className="flex-1">
        <Hero />
        {/* Placeholder for other sections */}
        <div id="features" className="h-screen bg-background flex items-center justify-center border-t border-border/40">
          <h2 className="text-3xl font-bold text-muted-foreground">Features Section Coming Soon</h2>
        </div>
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/40">
        <p>© 2026 SpendScope AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
