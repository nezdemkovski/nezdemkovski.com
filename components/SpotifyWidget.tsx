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
    <Card cardClass="bg-gradient-to-bl from-[#1ed760] to-[#0b341a]">
      {!data || !data?.isPlaying ? (
        <>
          <div className="relative inline-block h-[300px] w-[335px] rounded-3xl bg-[url('/noise.svg')] bg-cover px-7 py-5">
            <h2 className="pb-5 font-unbounded text-2xl font-bold text-white sm:text-3xl">
              Spotify
            </h2>

            <p className="font-iawriterquattro text-sm text-white sm:text-base">
              The music is not currently playing. The beat is taking a break.
            </p>
          </div>
        </>
      ) : (
        <div className="relative bg-[url('/noise.svg')] bg-cover">
          <div className="flex flex-col gap-4">
            <div className="absolute bottom-0 left-0 right-0 top-0">
              <Image
                src={data?.albumImageUrl}
                alt="Picture of the author"
                layout="fill"
                objectFit="cover"
                className="self-center"
              />
            </div>

            <div
              className="flex flex-col truncate text-center text-base text-white sm:text-base"
              title={`${data.artist} — ${data.title}`}
            >
              <span className="text-xl font-bold">{data.artist}</span>
              <span>{data.title}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SpotifyWidget;
