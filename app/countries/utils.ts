import { Database } from '@/database.types';
import { createClient } from '@/utils/supabase/server';
import { handleError } from '@/utils/handleError';

export const getSupabaseServerClient = async () => {
  return await createClient();
};

export type Travel = Database['public']['Tables']['travels']['Row'];

interface TripsByYear {
  [year: number]: Travel[];
}

const getUniqueCountries = (trips: TripsByYear) => {
  const visited = new Set();

  Object.values(trips).forEach((trips: Travel[]) => {
    trips.forEach((trip) => {
      visited.add(trip.country);
    });
  });

  return visited.size;
};

export const getTravels = async () => {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from('travels')
    .select()
    .order('start_date', { ascending: false });

  if (error) {
    handleError(error, 'Error from getTravels');
  }

  const trips: TripsByYear = {};

  data?.forEach((game) => {
    const visitedYear = new Date(game.start_date).getFullYear();

    if (!trips[visitedYear]) {
      trips[visitedYear] = [];
    }

    trips[visitedYear].push(game);
  });

  return {
    data: trips,
    total: data?.length,
    totalCountries: getUniqueCountries(trips),
  };
};

export const createTravelItem = async ({
  city,
  country,
  countryFlag,
  startDate,
  endDate,
}: {
  city: string;
  country: string;
  countryFlag: string;
  startDate: string;
  endDate: string;
}) => {
  const supabase = await getSupabaseServerClient();
  try {
    await supabase.from('travels').insert({
      city,
      country,
      country_flag: countryFlag,
      start_date: startDate,
      end_date: endDate,
      range_text: '',
    });
  } catch (error) {
    handleError(error, 'Error from createTravelItem');
  }
};

export const removeTravelItem = async (id: string) => {
  const supabase = await getSupabaseServerClient();
  try {
    await supabase.from('travels').delete().eq('id', id);
  } catch (error) {
    handleError(error, 'Error from removeTravelItem');
  }
};

export const getLatestTravels = async () => {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from('travels')
    .select()
    .order('start_date', { ascending: false })
    .limit(3);

  if (error) {
    handleError(error, 'Error from getLatestTravels');
  }

  return { data };
};
