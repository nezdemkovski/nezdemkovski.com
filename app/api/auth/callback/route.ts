import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { getSafeRedirectPath } from '@/utils/safeRedirect';

export async function GET(request: NextRequest) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const redirectPath = getSafeRedirectPath(
    request.cookies.get('post_auth_redirect')?.value,
    requestUrl.origin,
  );
  let redirectTo = new URL(redirectPath, requestUrl.origin);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      redirectTo = new URL('/', requestUrl.origin);
    }
  } else {
    redirectTo = new URL('/', requestUrl.origin);
  }

  const response = NextResponse.redirect(redirectTo, { status: 303 });
  response.cookies.delete('post_auth_redirect');

  return response;
}
