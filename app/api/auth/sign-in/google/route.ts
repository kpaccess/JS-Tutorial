import { NextRequest, NextResponse } from "next/server";
import { getRequestOrigin, getSafeNextPath } from "@/lib/auth/redirect-url";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const origin = getRequestOrigin(request);
  const next = getSafeNextPath(request.nextUrl.searchParams.get("next"));
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/api/auth/callback?next=${encodeURIComponent(next)}`,
      queryParams: { access_type: "offline", prompt: "consent" },
    },
  });

  if (error || !data.url) {
    const redirectUrl = new URL("/login", origin);
    redirectUrl.searchParams.set("error", "auth");
    redirectUrl.searchParams.set(
      "message",
      error?.message ?? "Unable to start Google sign in"
    );
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.redirect(data.url);
}
