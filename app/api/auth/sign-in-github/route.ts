import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${requestUrl.origin}/api/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      },
    );
  }

  return NextResponse.redirect(data.url, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
