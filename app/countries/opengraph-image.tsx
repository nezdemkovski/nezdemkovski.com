import { ImageResponse } from 'next/server';

import { Trip, countries } from './data';

export const runtime = 'edge';
export const revalidate = 60;

export default async function CountriesOG() {
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

  const findLatestCountries = (): Trip[] => {
    const latestYear = Object.keys(countries).sort().reverse()[0];
    // @ts-ignore
    const latestYearCountries = countries[latestYear];
    return latestYearCountries.slice(-3);
  };

  return new ImageResponse(
    (
      <div
        tw="flex p-10 h-full w-full bg-black flex-col"
        style={font('Inter 300')}
      >
        <main tw="flex grow pt-4 w-full justify-center items-center">
          <div tw="flex flex-row">
            <div tw="flex flex-col px-10 grow text-[28px] h-120 justify-center text-white">
              <div tw="text-2xl mb-7" style={font('Unbounded 400')}>
                Yuri Nezdemkovski
              </div>

              <div
                tw="text-7xl mb-7 text-white flex"
                style={font('Unbounded 700')}
              >
                Last 3 countries I visited
              </div>

              {findLatestCountries().map((trip, index) => (
                <div
                  key={index}
                  tw="flex mb-5 text-white mb-6 text-3xl"
                  style={font('Unbounded 400')}
                >
                  {trip.flag} {trip.city}, {trip.country}{' '}
                  <span tw="ml-6 text-xl leading-2 text-gray-400">
                    {trip.month}
                  </span>
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
