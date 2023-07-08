'use server';

import { cookies } from 'next/headers';
import { Database } from '@/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export type Game = Database['public']['Tables']['games']['Row'];

interface GamesByYear {
  [year: number]: Game[];
}

export const getGames = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from('games')
    .select()
    .order('finished_date', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const games: GamesByYear = {};

  data.forEach((game) => {
    const finishedYear = new Date(game.finished_date).getFullYear();

    if (!games[finishedYear]) {
      games[finishedYear] = [];
    }

    games[finishedYear].push(game);
  });

  return { data: games, total: data?.length };
};
