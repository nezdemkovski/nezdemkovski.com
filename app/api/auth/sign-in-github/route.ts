import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const supabase = await createClient();

  const referer = request.headers.get('referer') ?? requestUrl.origin;

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${requestUrl.origin}/api/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.redirect(requestUrl.origin, {
      status: 301,
    });
  }

  const response = NextResponse.redirect(data.url, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });

  // Store the originating page so the callback can redirect back to it.
  // Using a cookie avoids putting the URL in the OAuth redirectTo, which
  // requires an exact match in Supabase's allowed redirect URL list.
  response.cookies.set('post_auth_redirect', referer, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 5, // 5 minutes — enough to complete the OAuth flow
  });

  return response;
}
