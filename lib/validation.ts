import 'server-only';

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const readRequiredString = (
  formData: FormData,
  name: string,
  maxLength: number,
) => {
  const value = formData.get(name);

  if (typeof value !== 'string') {
    throw new Error(`${name} is required`);
  }

  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength) {
    throw new Error(
      `${name} must contain between 1 and ${maxLength} characters`,
    );
  }

  return normalized;
};

export const parseYear = (value: string) => {
  const year = Number(value);

  if (!Number.isInteger(year) || year < 1950 || year > 2100) {
    throw new Error('release-year must be an integer between 1950 and 2100');
  }

  return year;
};

export const parseIsoDate = (value: string, name: string) => {
  if (!ISO_DATE_PATTERN.test(value)) {
    throw new Error(`${name} must be a valid ISO date`);
  }

  const [year, month, day] = value.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  if (parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(`${name} must be a valid ISO date`);
  }

  return value;
};

export const parseCountryCode = (value: string) => {
  const countryCode = value.trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(countryCode)) {
    throw new Error('country_code must be a two-letter ISO country code');
  }

  return countryCode;
};

export const parseUuid = (value: string) => {
  if (!UUID_PATTERN.test(value)) throw new Error('Invalid record id');
  return value;
};

export const parseTimezone = (value: string) => {
  const timezone = value.trim();

  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
  } catch {
    throw new Error('Invalid timezone');
  }

  return timezone;
};
