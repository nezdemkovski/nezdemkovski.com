import { cache } from 'react';
import { cookies } from 'next/headers';
import { Database } from '@/database.types';
import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies }),
);

export const createServerActionSupabaseClient = cache(() =>
  createServerActionClient<Database>({ cookies }),
);

export const getUserInfo = async () => {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export const getUserRights = async () => {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const { data: userRights } = await supabase
      .from('users')
      .select('user_rights')
      .eq('id', user?.id)
      .limit(1)
      .maybeSingle();

    return userRights?.user_rights ?? 'USER';
  } catch (error) {
    console.error('Error from getUserRights:', error);
    return 'USER';
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
  const supabase = createServerActionSupabaseClient();

  try {
    await supabase.from('games').insert({
      name: name.toString(),
      developer: developer.toString(),
      release_year: Number(releaseYear),
      platform,
      finished_date: finishedDate.toString(),
    });
  } catch (error) {
    console.error('Error from createGameItem:', error);
    if (error instanceof Error) {
      throw new Error(`Something happened: ${error.message}`);
    }
    throw new Error('Something happened');
  }
};

export const removeGameItem = async (id: string) => {
  const supabase = createServerActionSupabaseClient();

  try {
    await supabase.from('games').delete().eq('id', id);
  } catch (error) {
    console.error('Error from removeGameItem:', error);
    if (error instanceof Error) {
      throw new Error(`Something happened: ${error.message}`);
    }
    throw new Error('Something happened');
  }
};
