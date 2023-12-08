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
  <li className="h-[31px] w-[47px]">
    <Image
      width={47}
      height={31}
      src={`/flags/${countryCode}.svg`}
      alt={`${countryName} flag`}
      title={countryName}
    />
  </li>
);

const CountriesWidget = () => (
  <Card link="/countries">
    <h2 className="pb-8 font-unbounded text-3xl font-bold text-white sm:text-3xl">
      Countries I visited
    </h2>

    <ul className="inline-flex flex-wrap gap-7">
      {countryList.map((country) => (
        <Flag {...country} key={country.countryCode} />
      ))}
    </ul>
  </Card>
);

export default CountriesWidget;
