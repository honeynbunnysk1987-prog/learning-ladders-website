import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const schema = z.object({
  child_name: z.string().min(1),
  dob: z.string().min(1),
  program: z.enum(["Day Care", "Play Group", "Nursery", "LKG", "UKG"]),
  parent_name: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase.from("admissions").insert({
      ...parsed.data,
      email: parsed.data.email || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Could not save enquiry" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Admission API error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
