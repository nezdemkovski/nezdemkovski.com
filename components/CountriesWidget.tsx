import Image from 'next/image';

import Card from './ui/Card';

const countryList = [
  {
    countryCode: 'cz',
    countryName: 'Czechia',
  },
  {
    countryCode: 'de',
    countryName: 'Germany',
  },
  {
    countryCode: 'pl',
    countryName: 'Poland',
  },
  {
    countryCode: 'at',
    countryName: 'Austria',
  },
  {
    countryCode: 'nl',
    countryName: 'Netherlands',
  },
  {
    countryCode: 'be',
    countryName: 'Belgium',
  },
  {
    countryCode: 'tr',
    countryName: 'Turkey',
  },
  {
    countryCode: 'bg',
    countryName: 'Bulgaria',
  },
  {
    countryCode: 'it',
    countryName: 'Italy',
  },
  {
    countryCode: 'es',
    countryName: 'Spain',
  },
  {
    countryCode: 'gr',
    countryName: 'Greece',
  },
  {
    countryCode: 'hr',
    countryName: 'Croatia',
  },
];
const Flag = ({
  countryCode,
  countryName,
}: {
  countryCode: string;
  countryName: string;
}) => (
  <Image
    width={54}
    height={36}
    src={`/flags/${countryCode}.svg`}
    alt={`${countryName} flag`}
    title={countryName}
  />
);

const CountriesWidget = () => (
  <Card link="/countries" title="Countries I visited">
    <div className="inline-flex flex-wrap gap-4">
      {countryList.map((country) => (
        <Flag {...country} key={country.countryCode} />
      ))}
    </div>
  </Card>
);

export default CountriesWidget;
