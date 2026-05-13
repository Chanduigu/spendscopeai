import { Navbar } from "@/components/navbar";
import { AuditForm } from "@/components/audit-form";

export default function AuditPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30">
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-4 md:px-6 relative overflow-hidden flex flex-col">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Audit Your AI Stack
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us about your team and tools. We'll analyze your spending patterns and uncover hidden savings.
          </p>
        </div>

        <div className="flex-1 flex justify-center">
          <AuditForm />
        </div>
      </main>
    </div>
  );
}
