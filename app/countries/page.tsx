import { Trip, countries } from './data';

const TripsByYear = ({
  title,
  gamesList,
}: {
  title: string;
  gamesList: Trip[];
}) => (
  <div key={title} className="mb-10">
    <h2 className="mb-3 font-unbounded text-2xl font-bold">{title}</h2>
    <ul>
      {gamesList.map((trip, index) => (
        <li key={index} className="mb-3">
          <div className="inline-flex items-end gap-2">
            <h3>
              {trip.flag} {trip.city}, {trip.country}
            </h3>
            <div className="text-xs leading-relaxed text-gray-400">
              {trip.month}
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const CountriesPage = async () => {
  const entries = Object.entries(countries).sort(
    ([year1], [year2]) => Number(year2) - Number(year1),
  );
  const visited = new Set();

  Object.values(countries).forEach((trips) => {
    trips.forEach((trip) => {
      visited.add(trip.country);
    });
  });

  const totalCountries = visited.size;

  return (
    <main className="m-6 mx-auto max-w-3xl">
      <h1 className="mb-10 font-unbounded text-3xl font-bold">
        Countries I visited:{' '}
        <span className="text-gray-400">{totalCountries}</span>
      </h1>

      <div className="grid gap-2 md:grid-cols-2">
        <div className="">
          {entries.map(([year, gamesList]) => {
            if (year === 'inProgress') return;

            return (
              <TripsByYear key={year} title={year} gamesList={gamesList} />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default CountriesPage;
