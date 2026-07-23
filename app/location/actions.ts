'use server';

import { revalidatePath, updateTag } from 'next/cache';

import { requireAdmin } from '@/lib/auth/server';
import { parseCountryCode, parseTimezone } from '@/lib/validation';
import { updateLocationInDB } from '@/utils/location.server';
import type { Location } from '@/utils/location';

export const updateLocation = async (location: Location) => {
  await requireAdmin();

  const nextLocation: Location = {
    city: location.city?.trim(),
    country: location.country?.trim(),
    countryCode: parseCountryCode(location.countryCode ?? ''),
    timezone: parseTimezone(location.timezone ?? ''),
  };

  if (
    !nextLocation.city ||
    nextLocation.city.length > 200 ||
    !nextLocation.country ||
    nextLocation.country.length > 200
  ) {
    throw new Error('Invalid location');
  }

  await updateLocationInDB(nextLocation);

  updateTag('location');
  revalidatePath('/');
};
