export interface Location {
  code: string;
  city: string;
  country: string;
  timezone: string;
  flagSrc: string;
  flagAlt: string;
}

export const LOCATIONS: Location[] = [
  {
    code: 'at',
    city: 'Vienna',
    country: 'Austria',
    timezone: 'Europe/Vienna',
    flagSrc: '/flags/at.svg',
    flagAlt: 'Austria flag',
  },
  {
    code: 'be',
    city: 'Brussels',
    country: 'Belgium',
    timezone: 'Europe/Brussels',
    flagSrc: '/flags/be.svg',
    flagAlt: 'Belgium flag',
  },
  {
    code: 'bg',
    city: 'Sofia',
    country: 'Bulgaria',
    timezone: 'Europe/Sofia',
    flagSrc: '/flags/bg.svg',
    flagAlt: 'Bulgaria flag',
  },
  {
    code: 'cz',
    city: 'Prague',
    country: 'Czechia',
    timezone: 'Europe/Prague',
    flagSrc: '/flags/cz.svg',
    flagAlt: 'Czechia flag',
  },
  {
    code: 'de',
    city: 'Berlin',
    country: 'Germany',
    timezone: 'Europe/Berlin',
    flagSrc: '/flags/de.svg',
    flagAlt: 'Germany flag',
  },
  {
    code: 'es',
    city: 'Madrid',
    country: 'Spain',
    timezone: 'Europe/Madrid',
    flagSrc: '/flags/es.svg',
    flagAlt: 'Spain flag',
  },
  {
    code: 'gr',
    city: 'Athens',
    country: 'Greece',
    timezone: 'Europe/Athens',
    flagSrc: '/flags/gr.svg',
    flagAlt: 'Greece flag',
  },
  {
    code: 'hr',
    city: 'Zagreb',
    country: 'Croatia',
    timezone: 'Europe/Zagreb',
    flagSrc: '/flags/hr.svg',
    flagAlt: 'Croatia flag',
  },
  {
    code: 'it',
    city: 'Rome',
    country: 'Italy',
    timezone: 'Europe/Rome',
    flagSrc: '/flags/it.svg',
    flagAlt: 'Italy flag',
  },
  {
    code: 'nl',
    city: 'Amsterdam',
    country: 'Netherlands',
    timezone: 'Europe/Amsterdam',
    flagSrc: '/flags/nl.svg',
    flagAlt: 'Netherlands flag',
  },
  {
    code: 'pl',
    city: 'Warsaw',
    country: 'Poland',
    timezone: 'Europe/Warsaw',
    flagSrc: '/flags/pl.svg',
    flagAlt: 'Poland flag',
  },
  {
    code: 'tr',
    city: 'Istanbul',
    country: 'Turkey',
    timezone: 'Europe/Istanbul',
    flagSrc: '/flags/tr.svg',
    flagAlt: 'Turkey flag',
  },
];

export const DEFAULT_LOCATION = LOCATIONS.find((l) => l.code === 'cz')!;
