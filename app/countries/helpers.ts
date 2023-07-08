import { cookies } from 'next/headers';
import { Database } from '@/database.types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export type Travel = Database['public']['Tables']['travels']['Row'];

interface TravelsByYear {
  [year: number]: Travel[];
}

export const getTravels = async () => {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data, error } = await supabase
    .from('travels')
    .select()
    .order('start_date', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const travels: TravelsByYear = {};

  data.forEach((game) => {
    const visitedYear = new Date(game.start_date).getFullYear();

    if (!travels[visitedYear]) {
      travels[visitedYear] = [];
    }

    travels[visitedYear].push(game);
  });

  return { data: travels, total: data?.length };
};
