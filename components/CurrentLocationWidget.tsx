import { revalidatePath } from 'next/cache';

import WidgetCard from '@/components/WidgetCard';
import LocationClock from '@/components/LocationClock';
import { getLocation, updateLocationInDB } from '@/utils/location.server';
import { LOCATIONS } from '@/utils/location';
import { getUserRights, UserRights } from '@/app/games/utils';

const CurrentLocationWidget = async () => {
  const [location, userRights] = await Promise.all([
    getLocation(),
    getUserRights(),
  ]);

  const isAdmin = userRights === UserRights.ADMIN;

  const updateLocation = async (code: string) => {
    'use server';
    const rights = await getUserRights();
    if (rights !== UserRights.ADMIN) return;
    if (!LOCATIONS.find((l) => l.code === code)) return;
    await updateLocationInDB(code);
    revalidatePath('/');
  };

  return (
    <WidgetCard className="relative overflow-hidden">
      <h2 className="font-unbounded pb-4 text-2xl font-bold text-white sm:text-3xl">
        Current Location & Time
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
