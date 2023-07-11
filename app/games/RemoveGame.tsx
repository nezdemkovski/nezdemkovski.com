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
    <form action={removeGame}>
      <button
        type="submit"
        className="text-xs text-white underline decoration-dotted"
      >
        remove
      </button>
    </form>
  );
};

export default RemoveGame;
