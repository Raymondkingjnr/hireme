// app/auth/callback/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const errorCode = searchParams.get("error_code");
  const errorDescription = searchParams.get("error_description");

  // If there's an error (expired, invalid, etc.)
  if (errorCode || errorDescription) {
    const message = errorDescription || "Authentication failed";

    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(message)}`
    );
  }

  // If there's a code → verify the session
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}/`); // your protected page
    }
  }

  // Default fallback
  return NextResponse.redirect(`${origin}/login?error=Invalid or expired link`);
}
