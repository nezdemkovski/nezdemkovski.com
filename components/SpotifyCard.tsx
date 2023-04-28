'use client';

import Image from 'next/image';
import { NowPlayingSong } from '@/app/api/now-playing/route';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

const SpotifyCard = () => {
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher, {
    refreshInterval: 10000,
  });

  return (
    <div className="h-[300px] w-[335px] rounded-3xl bg-gradient-to-bl from-[#1ed760] to-[#0b341a]">
      <div className="relative inline-block h-[300px] w-[335px] rounded-3xl bg-[url('/noise.svg')] bg-cover px-7 py-5">
        <>
          {!data || !data?.isPlaying ? (
            <>
              <h2 className="pb-5 font-unbounded text-2xl font-bold text-white sm:text-3xl">
                Spotify
              </h2>

              <p className="font-iawriterquattro text-sm text-white sm:text-base">
                The music is not currently playing. The beat is taking a break.
              </p>
            </>
          ) : (
            <div>
              <h2 className="pb-9 font-unbounded text-2xl font-bold text-white sm:text-3xl">
                Spotify
              </h2>

              <div className="flex flex-col gap-4">
                <Image
                  src={data?.albumImageUrl}
                  alt="Picture of the author"
                  width={100}
                  height={100}
                  className="self-center"
                />

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
        </>
      </div>
    </div>
  );
};

export default SpotifyCard;
