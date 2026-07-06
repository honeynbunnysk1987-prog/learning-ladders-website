import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  subject: z.string().optional(),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from("contact_enquiries").insert({
      ...parsed.data,
      email: parsed.data.email || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Could not save message" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
