import { createClient } from '@/utils/supabase/server';
import { handleError } from '@/utils/handleError';
import { type Location, LOCATIONS, DEFAULT_LOCATION } from '@/utils/location';

export const getLocation = async (): Promise<Location> => {
  const supabase = await createClient();

  try {
    const { data } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'current_location')
      .maybeSingle();

    const code = data?.value ?? 'cz';
    return LOCATIONS.find((l) => l.code === code) ?? DEFAULT_LOCATION;
  } catch (error) {
    handleError(error, 'Error from getLocation');
    return DEFAULT_LOCATION;
  }
};

export const updateLocationInDB = async (code: string) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from('settings')
    .update({ value: code, updated_at: new Date().toISOString() })
    .eq('key', 'current_location');
  if (error) handleError(error, 'Error from updateLocationInDB');
};
