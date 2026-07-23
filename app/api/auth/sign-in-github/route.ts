import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { getSafeRedirectPath } from '@/utils/safeRedirect';

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const supabase = await createClient();
  const redirectPath = getSafeRedirectPath(
    request.headers.get('referer'),
    requestUrl.origin,
  );

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${requestUrl.origin}/api/auth/callback`,
    },
  });

  if (error || !data.url) {
    return NextResponse.redirect(new URL(redirectPath, requestUrl.origin), {
      status: 303,
    });
  }

  const response = NextResponse.redirect(data.url, {
    status: 303,
  });

  response.cookies.set('post_auth_redirect', redirectPath, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 5, // 5 minutes
  });

  return response;
}
