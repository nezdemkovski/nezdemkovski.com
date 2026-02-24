import Image from 'next/image';

import { getUserRights, UserRights } from '@/app/games/utils';
import { getTravels, type Travel } from '@/app/countries/utils';
import AddTravel from '@/app/countries/AddTravel';
import RemoveTravel from '@/app/countries/RemoveTravel';

export const revalidate = 10;
export const dynamic = 'force-dynamic';

const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });

const TripsByYear = ({
  title,
  trips,
  isAdmin,
}: {
  title: string;
  trips: Travel[];
  isAdmin: boolean;
}) => (
  <div key={title} className="mb-10">
    <h2 className="font-unbounded mb-3 text-2xl font-bold">{title}</h2>
    <ul>
      {trips.map((trip) => (
        <li key={trip.id} className="mb-3">
          <div className="inline-flex items-center gap-2">
            <Image
              src={`https://flagcdn.com/w40/${trip.country_code.toLowerCase()}.png`}
              width={20}
              height={15}
              alt={`${countryNames.of(trip.country_code)} flag`}
              className="rounded-sm"
            />
            <h3>
              {trip.city}, {countryNames.of(trip.country_code) ?? trip.country_code}
            </h3>
            <div className="text-xs leading-relaxed text-gray-400">
              {trip.range_text}
            </div>
            {isAdmin && <RemoveTravel id={trip.id} />}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const CountriesPage = async () => {
  const [{ data, totalCountries }, userRights] = await Promise.all([
    getTravels(),
    getUserRights(),
  ]);

  if (!data) {
    return (
      <main className="m-6 mx-auto max-w-3xl">
        <h1 className="font-unbounded mb-10 text-3xl font-bold">
          Something bad happened. Refresh the page.
        </h1>
      </main>
    );
  }

  const isAdmin = userRights === UserRights.ADMIN;

  const entries = Object.entries(data).sort(
    ([year1], [year2]) => Number(year2) - Number(year1),
  );

  return (
    <main className="m-6 mx-auto max-w-3xl">
      <h1 className="font-unbounded mb-10 text-3xl font-bold">
        Countries I visited:{' '}
        <span className="text-gray-400">{totalCountries}</span>
      </h1>

      {isAdmin && <AddTravel />}

      <div className="grid gap-2 md:grid-cols-2">
        <div>
          {entries.map(([year, trips]) => {
            if (year === 'inProgress') return;

            return (
              <TripsByYear
                key={year}
                title={year}
                trips={trips}
                isAdmin={isAdmin}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default CountriesPage;
