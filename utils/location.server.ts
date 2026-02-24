import { createClient } from '@/utils/supabase/server';
import { handleError } from '@/utils/handleError';
import { type Location, DEFAULT_LOCATION } from '@/utils/location';

export const getLocation = async (): Promise<Location> => {
  const supabase = await createClient();

  try {
    const { data } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'current_location')
      .maybeSingle();

    if (!data?.value) return DEFAULT_LOCATION;

    const parsed = JSON.parse(data.value) as Partial<Location>;
    if (parsed.city && parsed.country && parsed.countryCode && parsed.timezone) {
      return parsed as Location;
    }
    return DEFAULT_LOCATION;
  } catch (error) {
    handleError(error, 'Error from getLocation');
    return DEFAULT_LOCATION;
  }
};

export const updateLocationInDB = async (location: Location) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from('settings')
    .update({ value: JSON.stringify(location), updated_at: new Date().toISOString() })
    .eq('key', 'current_location');
  if (error) handleError(error, 'Error from updateLocationInDB');
};
