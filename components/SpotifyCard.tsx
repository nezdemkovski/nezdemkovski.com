'use client';

// import { useEffect } from 'react';
import Image from 'next/image';
// import { animate } from 'motion';

import { NowPlayingSong } from '@/app/api/now-playing/route';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

// const AnimatedBars = () => {
//   useEffect(() => {
//     animate(
//       '#bar1',
//       {
//         transform: [
//           'scaleY(1.0) translateY(0rem)',
//           'scaleY(1.5) translateY(-0.082rem)',
//           'scaleY(1.0) translateY(0rem)',
//         ],
//       },
//       {
//         duration: 1.0,
//         repeat: Infinity,
//         easing: ['ease-in-out'],
//       },
//     );
//     animate(
//       '#bar2',
//       {
//         transform: [
//           'scaleY(1.0) translateY(0rem)',
//           'scaleY(3) translateY(-0.083rem)',
//           'scaleY(1.0) translateY(0rem)',
//         ],
//       },
//       {
//         delay: 0.2,
//         duration: 1.5,
//         repeat: Infinity,
//         easing: ['ease-in-out'],
//       },
//     );
//     animate(
//       '#bar3',
//       {
//         transform: [
//           'scaleY(1.0)  translateY(0rem)',
//           'scaleY(0.5) translateY(0.37rem)',
//           'scaleY(1.0)  translateY(0rem)',
//         ],
//       },
//       {
//         delay: 0.3,
//         duration: 1.5,
//         repeat: Infinity,
//         easing: ['ease-in-out'],
//       },
//     );
//   }, []);

//   return (
//     <div className="flex w-auto items-end overflow-hidden">
//       <span
//         id="bar1"
//         className="mr-[3px] h-2 w-1 bg-gray-300 opacity-75 dark:bg-gray-500"
//       />
//       <span
//         id="bar2"
//         className="mr-[3px] h-1 w-1 bg-gray-300 dark:bg-gray-500"
//       />
//       <span
//         id="bar3"
//         className="h-3 w-1 bg-gray-300 opacity-80 dark:bg-gray-500"
//       />
//     </div>
//   );
// };

const SpotifyCard = () => {
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher, {
    refreshInterval: 10000,
  });

  return (
    <div className="relative inline-block h-[300px] w-[335px] rounded-3xl bg-gradient-to-br from-[#1db954] to-[#0B4B22] px-7 py-5">
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
            <h2 className="pb-5 font-unbounded text-2xl font-bold text-white sm:text-3xl">
              Spotify
            </h2>

            <div className="flex flex-row gap-4">
              <Image
                src={data?.albumImageUrl}
                alt="Picture of the author"
                width={75}
                height={75}
                className="rounded-xl"
              />

              <div
                className="flex flex-col truncate font-iawriterquattro text-base text-white sm:text-base"
                title={`${data.artist} — ${data.title}`}
              >
                <span className="text-base font-bold">{data.artist}</span>
                <span>{data.title}</span>
              </div>
            </div>

            {/* <div className="hidden self-center md:block">
              <AnimatedBars />
            </div>
            */}
          </div>
        )}
      </>
    </div>
  );
};

export default SpotifyCard;
