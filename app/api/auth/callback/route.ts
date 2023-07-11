import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Database } from '@/database.types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const pathname = requestUrl.searchParams.get('path');

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to the same page after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}/${pathname}`);
}
