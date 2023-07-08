import { Database } from '@/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const getLatestGames = async () => {
  const supabase = createClientComponentClient<Database>();
  const { data, error } = await supabase
    .from('games')
    .select()
    .order('finished_date', { ascending: false })
    .limit(3);

  if (error) {
    throw new Error(error.message);
  }

  return { data };
};
