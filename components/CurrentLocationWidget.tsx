import { revalidatePath } from 'next/cache';

import WidgetCard from '@/components/WidgetCard';
import LocationClock from '@/components/LocationClock';
import { getLocation, updateLocationInDB } from '@/utils/location.server';
import { getUserRights, UserRights } from '@/app/games/utils';
import { type Location } from '@/utils/location';

const CurrentLocationWidget = async () => {
  const [location, userRights] = await Promise.all([
    getLocation(),
    getUserRights(),
  ]);

  const isAdmin = userRights === UserRights.ADMIN;

  const updateLocation = async (loc: Location) => {
    'use server';
    const rights = await getUserRights();
    if (rights !== UserRights.ADMIN) return;
    if (!loc.city?.trim() || !loc.country?.trim() || !loc.timezone?.trim())
      return;
    if (!/^[A-Z]{2}$/.test(loc.countryCode)) return;
    try {
      Intl.DateTimeFormat(undefined, { timeZone: loc.timezone });
    } catch {
      return;
    }
    await updateLocationInDB(loc);
    revalidatePath('/');
  };

  return (
    <WidgetCard className="relative overflow-hidden">
      <h2 className="font-unbounded pb-4 text-2xl font-bold text-white sm:text-3xl">
        My Location & Time
      </h2>
      <LocationClock
        location={location}
        isAdmin={isAdmin}
        updateLocation={updateLocation}
      />
    </WidgetCard>
  );
};

export default CurrentLocationWidget;
