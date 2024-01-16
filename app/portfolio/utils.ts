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

export type Game = Database['public']['Tables']['portfolio']['Row'];

export const getPortfolioItems = async () => {
  const supabase = getSupabaseServerClient();

  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('id, title, description, image, status, tags, url, project_mdx');

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    console.error('Error fetching portfolio items', error);
    return { data: [] };
  }
};
