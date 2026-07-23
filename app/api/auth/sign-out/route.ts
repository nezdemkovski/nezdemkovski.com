import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { getSafeRedirectPath } from '@/utils/safeRedirect';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = await createClient();

  await supabase.auth.signOut();

  const redirectPath = getSafeRedirectPath(
    request.headers.get('referer'),
    requestUrl.origin,
  );

  return NextResponse.redirect(new URL(redirectPath, requestUrl.origin), {
    status: 303,
  });
}
