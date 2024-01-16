import { ImageResponse } from 'next/og';

import { getLatestGames } from '@/app/games/utils';

export const runtime = 'edge';
export const revalidate = 60;

export default async function CountriesOG() {
  const games = await getLatestGames();

  const unbounded400 = fetch(
    new URL(
      `../../node_modules/@fontsource/unbounded/files/unbounded-latin-ext-400-normal.woff`,
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer());
  const unbounded700 = fetch(
    new URL(
      `../../node_modules/@fontsource/unbounded/files/unbounded-latin-ext-700-normal.woff`,
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        tw="flex p-10 h-full w-full bg-black flex-col"
        style={font('Inter 300')}
      >
        <main tw="flex grow pt-4 w-full items-center">
          <div tw="flex flex-row">
            <div tw="flex flex-col px-10 grow text-[28px] h-120 justify-center text-white">
              <div tw="text-2xl mb-7" style={font('Unbounded 400')}>
                Yuri Nezdemkovski
              </div>

              <div
                tw="text-7xl mb-7 text-white flex"
                style={font('Unbounded 700')}
              >
                Last 3 games I beat
              </div>

              {games?.data?.map((game, index) => (
                <div
                  key={index}
                  tw="flex flex-col mb-5 text-white mb-6 text-3xl"
                  style={font('Unbounded 400')}
                >
                  <div tw="flex">{game.name}</div>
                  <div tw="flex text-xl leading-2 text-gray-400">
                    {game.release_year} · {game.developer} · {game.platform}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Unbounded 400',
          data: await unbounded400,
        },
        {
          name: 'Unbounded 700',
          data: await unbounded700,
        },
      ],
    },
  );
}

function font(fontFamily: string) {
  return { fontFamily };
}
