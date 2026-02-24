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
    status: 301,
  });

  response.cookies.set('post_auth_redirect', referer, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 5, // 5 minutes
  });

  return response;
}
