import { cookies } from 'next/headers';

import { createClient } from '@/utils/supabase/server';
import { Database } from '@/database.types';

export const getSupabaseServerClient = () => {
  const cookieStore = cookies();
  return createClient(cookieStore);
};

export const handleError = (error: any, message: string) => {
  console.error(message, error);
  if (error instanceof Error) {
    throw new Error(`${message}: ${error.message}`);
  }
  throw new Error(message);
};

export const getUserInfo = async () => {
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export const getUserRights = async () => {
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const { data: userRights } = await supabase
      .from('users')
      .select('user_rights')
      .eq('id', user?.id ?? '')
      .limit(1)
      .maybeSingle();

    return userRights?.user_rights ?? 'USER';
  } catch (error) {
    handleError(error, 'Error from getUserRights');
  }
};

export type Game = Database['public']['Tables']['games']['Row'];

interface GamesByYear {
  [year: number]: Game[];
}

export const getGames = async () => {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('games')
    .select()
    .order('finished_date', { ascending: false });

  if (error) {
    handleError(error, 'Error from getGames');
  }

  const games: GamesByYear = {};

  data?.forEach((game) => {
    const finishedYear = new Date(game.finished_date).getFullYear();

    if (!games[finishedYear]) {
      games[finishedYear] = [];
    }

    games[finishedYear].push(game);
  });

  return { data: games, total: data?.length };
};

export const getLatestGames = async () => {
  const supabase = getSupabaseServerClient();

  try {
    const { data } = await supabase
      .from('games')
      .select()
      .order('finished_date', { ascending: false })
      .limit(3);

    return { data };
  } catch (error) {
    handleError(error, 'Error from getUserRights');
  }
};

export const createGameItem = async ({
  name,
  developer,
  releaseYear,
  platform,
  finishedDate,
}: {
  name: string;
  developer: string;
  releaseYear: number;
  platform: Database['public']['Enums']['platform_type'];
  finishedDate: string;
}) => {
  const supabase = getSupabaseServerClient();

  try {
    await supabase.from('games').insert({
      name: name.toString(),
      developer: developer.toString(),
      release_year: Number(releaseYear),
      platform,
      finished_date: finishedDate.toString(),
    });
  } catch (error) {
    handleError(error, 'Error from createGameItem');
  }
};

export const removeGameItem = async (id: string) => {
  const supabase = getSupabaseServerClient();

  try {
    await supabase.from('games').delete().eq('id', id);
  } catch (error) {
    handleError(error, 'Error from removeGameItem');
  }
};
