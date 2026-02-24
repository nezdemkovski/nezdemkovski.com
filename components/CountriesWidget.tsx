import Link from 'next/link';
import WidgetCard from '@/components/WidgetCard';
import { getTravels, Travel } from '@/app/countries/utils';
import CountriesQuiz from '@/components/CountriesQuiz';

export interface QuizQuestion {
  question: string;
  answer: string;
  options: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function nearbyNumbers(n: number): string[] {
  const offsets = shuffle([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
  const result: string[] = [];
  for (const off of offsets) {
    const val = n + off;
    if (val > 0) {
      result.push(String(val));
      if (result.length === 3) break;
    }
  }
  return result;
}

const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });

// Q1: Where was I in [Month Year]?
function genWhereWasI(trips: Travel[]): QuizQuestion | null {
  const allCities = Array.from(new Set(trips.map((t) => t.city)));
  if (allCities.length < 4) return null;

  const trip = pick(trips);
  const city = trip.city;
  const monthYear = new Date(trip.start_date).toLocaleString('en', {
    month: 'long',
    year: 'numeric',
  });

  const others = shuffle(allCities.filter((c) => c !== city)).slice(0, 3);

  return {
    question: `Where was I in ${monthYear}?`,
    answer: city,
    options: shuffle([city, ...others]),
  };
}

// Q2: How many countries did I visit in [Year]?
function genCountriesInYear(trips: Travel[]): QuizQuestion | null {
  const years = Array.from(
    new Set(trips.map((t) => new Date(t.start_date).getFullYear())),
  );
  if (years.length === 0) return null;

  const year = pick(years);
  const count = new Set(
    trips
      .filter((t) => new Date(t.start_date).getFullYear() === year)
      .map((t) => t.country_code),
  ).size;

  const wrong = nearbyNumbers(count);
  if (wrong.length < 3) return null;

  return {
    question: `Countries visited in ${year}?`,
    answer: String(count),
    options: shuffle([String(count), ...wrong]),
  };
}

// Q3: Which city have I visited most often?
function genMostVisitedCity(trips: Travel[]): QuizQuestion | null {
  const cityCount = new Map<string, number>();
  for (const trip of trips) {
    cityCount.set(trip.city, (cityCount.get(trip.city) ?? 0) + 1);
  }

  const sorted = Array.from(cityCount.entries()).sort((a, b) => b[1] - a[1]);
  if (sorted.length < 4) return null;
  // Only ask if there's a clear winner (visited more than once)
  if (sorted[0][1] < 2) return null;

  const answer = sorted[0][0];
  const others = sorted.slice(1, 4).map(([city]) => city);

  return {
    question: 'My most visited city?',
    answer,
    options: shuffle([answer, ...others]),
  };
}

// Q4: How many trips did I take in [Year]?
function genTripsInYear(trips: Travel[]): QuizQuestion | null {
  const years = Array.from(
    new Set(trips.map((t) => new Date(t.start_date).getFullYear())),
  );
  if (years.length === 0) return null;

  const year = pick(years);
  const count = trips.filter(
    (t) => new Date(t.start_date).getFullYear() === year,
  ).length;

  const wrong = nearbyNumbers(count);
  if (wrong.length < 3) return null;

  return {
    question: `Trips taken in ${year}?`,
    answer: String(count),
    options: shuffle([String(count), ...wrong]),
  };
}

// Q5: Which country did I visit most recently?
function genMostRecent(trips: Travel[]): QuizQuestion | null {
  const sorted = [...trips].sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
  );
  const latestCode = sorted[0].country_code;
  const latest = countryNames.of(latestCode) ?? latestCode;

  const allCountries = Array.from(
    new Set(
      trips.map((t) => countryNames.of(t.country_code) ?? t.country_code),
    ),
  );
  if (allCountries.length < 4) return null;

  const others = shuffle(allCountries.filter((c) => c !== latest)).slice(0, 3);

  return {
    question: 'My most recent country?',
    answer: latest,
    options: shuffle([latest, ...others]),
  };
}

// Q6: In what year did I first visit [Country]?
function genFirstVisitYear(trips: Travel[]): QuizQuestion | null {
  const countries = Array.from(new Set(trips.map((t) => t.country_code)));
  if (countries.length === 0) return null;

  const country = pick(countries);
  const firstTrip = trips
    .filter((t) => t.country_code === country)
    .sort(
      (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
    )[0];
  const firstYear = new Date(firstTrip.start_date).getFullYear();

  const allYears = Array.from(
    new Set(trips.map((t) => new Date(t.start_date).getFullYear())),
  );
  const otherYears = shuffle(allYears.filter((y) => y !== firstYear)).slice(
    0,
    3,
  );
  if (otherYears.length < 3) return null;

  const name = countryNames.of(country) ?? country;
  return {
    question: `When did I first visit ${name}?`,
    answer: String(firstYear),
    options: shuffle([String(firstYear), ...otherYears.map(String)]),
  };
}

// Q7: Which of these cities have I never been to?
const WORLD_CITIES = [
  'Tokyo',
  'Seoul',
  'Beijing',
  'Mumbai',
  'Bangkok',
  'Singapore',
  'Dubai',
  'Cairo',
  'Lagos',
  'São Paulo',
  'Mexico City',
  'Los Angeles',
  'Chicago',
  'Toronto',
  'Sydney',
  'Auckland',
  'Nairobi',
  'Jakarta',
  'Kuala Lumpur',
  'Riyadh',
  'Casablanca',
  'Accra',
  'Bogotá',
  'Lima',
];

function genNeverBeen(trips: Travel[]): QuizQuestion | null {
  const visitedCities = new Set(trips.map((t) => t.city));
  const unvisited = WORLD_CITIES.filter((c) => !visitedCities.has(c));
  if (unvisited.length < 1) return null;

  const allCities = Array.from(visitedCities);
  if (allCities.length < 3) return null;

  const answer = pick(unvisited);
  const realCities = shuffle(allCities).slice(0, 3);

  return {
    question: "Which city haven't I visited?",
    answer,
    options: shuffle([answer, ...realCities]),
  };
}

const Fallback = ({
  totalCountries,
  totalTrips,
  message,
}: {
  totalCountries?: number;
  totalTrips?: number;
  message: string;
}) => (
  <WidgetCard>
    <Link
      href="/countries"
      className="font-unbounded flex items-center justify-between pb-3 text-2xl font-bold text-white hover:opacity-80 sm:text-3xl"
    >
      <span>Countries I visited</span>
    </Link>
    {totalCountries !== undefined && (
      <p className="mt-1 text-sm text-white/40">
        {totalCountries} countries · {totalTrips} trips
      </p>
    )}
    <p className="mt-4 text-sm text-white/40">{message}</p>
  </WidgetCard>
);

const CountriesWidget = async () => {
  const { data, total, totalCountries } = await getTravels();
  const trips = Object.values(data)
    .flat()
    .sort(
      (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
    );
  const totalTrips = total ?? 0;

  if (trips.length === 0) {
    return <Fallback message="No trips yet." />;
  }

  const pool: QuizQuestion[] = [
    genWhereWasI(trips),
    genCountriesInYear(trips),
    genMostVisitedCity(trips),
    genTripsInYear(trips),
    genMostRecent(trips),
    genFirstVisitYear(trips),
    genNeverBeen(trips),
  ].filter((q): q is QuizQuestion => q !== null);

  if (pool.length === 0) {
    return (
      <Fallback
        totalCountries={totalCountries}
        totalTrips={totalTrips}
        message="Not enough data for a quiz."
      />
    );
  }

  return (
    <WidgetCard className="flex flex-col">
      <Link
        href="/countries"
        className="font-unbounded flex items-center justify-between pb-3 text-2xl font-bold text-white hover:opacity-80 sm:text-3xl"
      >
        <span>Countries I visited</span>
      </Link>
      <p className="text-sm text-white/40">
        {totalCountries} countries · {totalTrips} trips
      </p>
      <CountriesQuiz
        questions={pool}
        totalCountries={totalCountries}
        totalTrips={totalTrips}
      />
    </WidgetCard>
  );
};

export default CountriesWidget;
