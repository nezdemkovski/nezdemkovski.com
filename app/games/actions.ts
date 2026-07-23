'use server';

import { revalidatePath, updateTag } from 'next/cache';

import { PLATFORM_TYPES } from '@/app/games/constants';
import type { Database } from '@/database.types';
import { requireAdmin } from '@/lib/auth/server';
import {
  parseIsoDate,
  parseUuid,
  parseYear,
  readRequiredString,
} from '@/lib/validation';
import { createClient } from '@/utils/supabase/server';

type Platform = Database['public']['Enums']['platform_type'];

const isPlatform = (value: string): value is Platform =>
  (PLATFORM_TYPES as readonly string[]).includes(value);

export const addGame = async (formData: FormData) => {
  await requireAdmin();

  const name = readRequiredString(formData, 'name', 200);
  const developer = readRequiredString(formData, 'developer', 200);
  const releaseYear = parseYear(
    readRequiredString(formData, 'release-year', 4),
  );
  const finishedDate = parseIsoDate(
    readRequiredString(formData, 'finished_date', 10),
    'finished_date',
  );
  const platform = readRequiredString(formData, 'platform', 100);

  if (!isPlatform(platform)) {
    throw new Error('Invalid platform');
  }

  const supabase = await createClient();
  const { error } = await supabase.from('games').insert({
    name,
    developer,
    release_year: releaseYear,
    platform,
    finished_date: finishedDate,
  });

  if (error) throw new Error(`Unable to create game: ${error.message}`);

  updateTag('games');
  revalidatePath('/games');
};

export const removeGame = async (id: string) => {
  await requireAdmin();

  const supabase = await createClient();
  const { error } = await supabase
    .from('games')
    .delete()
    .eq('id', parseUuid(id));

  if (error) throw new Error(`Unable to remove game: ${error.message}`);

  updateTag('games');
  revalidatePath('/games');
};
