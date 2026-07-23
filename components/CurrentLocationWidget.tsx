import { updateLocation } from '@/app/location/actions';
import WidgetCard from '@/components/WidgetCard';
import LocationClock from '@/components/LocationClock';
import { getLocation } from '@/utils/location.server';

const CurrentLocationWidget = async () => {
  const location = await getLocation();

  return (
    <WidgetCard className="relative flex flex-col overflow-hidden">
      <h2 className="font-unbounded pb-4 text-2xl font-bold text-white sm:text-3xl">
        My Location & Time
      </h2>
      <LocationClock location={location} updateLocation={updateLocation} />
    </WidgetCard>
  );
};

export default CurrentLocationWidget;
