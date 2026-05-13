"use server";

import { z } from "zod";

const LeadSchema = z.object({
  email: z.string().email(),
  auditData: z.any() // Mocking the full audit structure for now
});

export async function captureLead(formData: FormData) {
  try {
    const rawEmail = formData.get("email");
    const rawAudit = formData.get("auditData");

    const parsed = LeadSchema.safeParse({
      email: rawEmail,
      auditData: rawAudit ? JSON.parse(rawAudit as string) : {}
    });

    if (!parsed.success) {
      return { success: false, error: "Invalid data format" };
    }

    // TODO: Supabase integration
    // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    // await supabase.from('leads').insert({ email: parsed.data.email, ... })

    // TODO: Resend integration
    // await resend.emails.send({ to: parsed.data.email, subject: "Your SpendScope AI Audit", ... })

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return { success: true, message: "Lead captured and email sent." };
  } catch (error) {
    console.error("Failed to capture lead:", error);
    return { success: false, error: "Internal server error" };
  }
}
