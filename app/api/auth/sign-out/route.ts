import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = await createClient();

  await supabase.auth.signOut();

  const referer = request.headers.get('referer') ?? `${requestUrl.origin}/`;

  return NextResponse.redirect(referer, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
