import { NextResponse } from 'next/server';

import { getData } from '@/lib/datocms';

export const config = {
  runtime: 'edge',
};

export type DatoCMSData = {
  data: {
    rule: {
      id: string;
      title: string;
      subtitle: string;
      content: Record<string, string>;
    };
  };
};

export async function GET(request: Request) {
  const response = await getData();

  if (response.status > 400) {
    return NextResponse.json(
      { error: 'Something happened!' },
      {
        status: response.status,
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  }

  const data: DatoCMSData = await response.json();

  return NextResponse.json(data, {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
  });
}
