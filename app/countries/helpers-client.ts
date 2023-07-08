import { Database } from '@/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const getLatestTravels = async () => {
  const supabase = createClientComponentClient<Database>();
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
