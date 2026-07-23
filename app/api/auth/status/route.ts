import { NextResponse } from 'next/server';

import { getAuthState } from '@/lib/auth/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { authenticated, isAdmin } = await getAuthState();

    return NextResponse.json(
      { authenticated, isAdmin },
      {
        headers: {
          'Cache-Control': 'private, no-store',
        },
      },
    );
  } catch {
    return NextResponse.json(
      { authenticated: false, isAdmin: false },
      {
        status: 503,
        headers: {
          'Cache-Control': 'private, no-store',
        },
      },
    );
  }
}
