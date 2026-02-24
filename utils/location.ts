export interface Location {
  city: string;
  country: string;
  countryCode: string;
  timezone: string;
}

export const DEFAULT_LOCATION: Location = {
  city: 'Prague',
  country: 'Czechia',
  countryCode: 'CZ',
  timezone: 'Europe/Prague',
};
