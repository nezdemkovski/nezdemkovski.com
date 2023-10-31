import { NextResponse } from 'next/server';

import { getNowPlaying } from '@/utils/spotify';

export const runtime = 'edge';

type SpotifyNowPlaying = {
  is_playing: boolean;
  item: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
    external_urls: {
      spotify: string;
    };
  };
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export async function GET(request: Request) {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return NextResponse.json(
      { isPlaying: false },
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  }

  const song: SpotifyNowPlaying = await response.json();

  // console.log({ song });

  if (song.item === null) {
    return NextResponse.json(
      { isPlaying: false },
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((artist) => artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return NextResponse.json(
    {
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    },
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    },
  );
}
