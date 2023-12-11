'use client';

import Image from 'next/image';
import { NowPlayingSong } from '@/app/api/now-playing/route';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

import Card from './ui/Card';
import Text from './ui/Text';

const SpotifyWidget = () => {
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher, {
    refreshInterval: 10000,
  });

  return !data || !data?.isPlaying ? (
    <Card
      style={{
        backgroundImage: `url('/noise.svg'), linear-gradient(to bottom, #1ed760, #0b341a)`,
      }}
      title="Spotify"
    >
      <Text>
        The music is not currently playing. The beat is taking a break.
      </Text>
    </Card>
  ) : (
    <Card>
      <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full bg-cover">
        <Image
          src={data?.albumImageUrl}
          alt="Picture of the author"
          layout="fill"
          objectFit="cover"
          className="self-center rounded-3xl border border-black"
        />
        <div className="absolute z-10 h-full w-full bg-gradient-to-b from-[#1ed76090] to-[#0b341a]"></div>
      </div>
      <div className="relative z-20 flex h-full flex-col justify-end">
        <div
          className="flex flex-col gap-2"
          title={`${data.artist} — ${data.title}`}
        >
          <Text weight="bold" size="3xl" align="center">
            {data.artist}
          </Text>
          <Text align="center">{data.title}</Text>
        </div>
      </div>
    </Card>
  );
};

export default SpotifyWidget;
