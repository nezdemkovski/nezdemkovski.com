import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { Database } from '@/database.types';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

const RemoveGame = async ({ id }: { id: string }) => {
  const removeGame = async () => {
    'use server';
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.from('games').delete().eq('id', id);
    revalidatePath('/games');
  };

  return (
    <form action={removeGame} className="text-black">
      <button type="submit" className="bg-amber-400 p-0.5">
        remove
      </button>
    </form>
  );
};

export default RemoveGame;
