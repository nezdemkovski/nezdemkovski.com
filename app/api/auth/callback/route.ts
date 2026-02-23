import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Read the page the user was on before sign-in (set as a cookie in sign-in-github/route.ts)
  const redirectCookie = request.cookies.get('post_auth_redirect');
  const redirectTo = redirectCookie?.value ?? requestUrl.origin;

  const response = NextResponse.redirect(redirectTo);
  response.cookies.delete('post_auth_redirect');

  return response;
}
