import { cookies } from 'next/headers';

import { Database } from '@/database.types';
import { createClient } from '@/utils/supabase/server';

export const getSupabaseServerClient = () => {
  const cookieStore = cookies();
  return createClient(cookieStore);
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
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('travels')
    .select()
    .order('start_date', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const trips: TripsByYear = {};

  data.forEach((game) => {
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

export const getLatestTravels = async () => {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('travels')
    .select()
    .order('start_date', { ascending: false })
    .limit(3);

  if (error) {
    throw new Error(error.message);
  }

  return { data };
};
