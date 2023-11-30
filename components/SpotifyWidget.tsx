'use client';

import Image from 'next/image';
import { NowPlayingSong } from '@/app/api/now-playing/route';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import Card from './ui/Card';

const SpotifyWidget = () => {
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher, {
    refreshInterval: 10000,
  });

  return (
    <Card cardClass="relative bg-gradient-to-b from-[#1ed760] to-[#0b341a]">
      {!data || !data?.isPlaying ? (
        <div className="bg-[url('/noise.svg')]">
          <h2 className="pb-5 font-unbounded text-2xl font-bold text-white sm:text-3xl">
            Spotify
          </h2>

          <p className="font-iawriterquattro text-sm text-white sm:text-base">
            The music is not currently playing. The beat is taking a break.
          </p>
        </div>
      ) : (
        <>
          <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full bg-cover">
            <Image
              src={data?.albumImageUrl}
              alt="Picture of the author"
              layout="fill"
              objectFit="cover"
              className="self-center"
            />
            <div className="absolute z-10 h-full w-full bg-gradient-to-b from-[#1ed76090] to-[#0b341a]"></div>
          </div>
          <div className="relative z-20 flex h-full flex-col justify-end">
            <div
              className="= flex flex-col gap-2 text-center text-white"
              title={`${data.artist} — ${data.title}`}
            >
              <span className="text-3xl font-bold">{data.artist}</span>
              <span>{data.title}</span>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default SpotifyWidget;
