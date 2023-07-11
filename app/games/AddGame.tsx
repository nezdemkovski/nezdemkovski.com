import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { Database } from '@/database.types';
import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';

const AddGame = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const addGame = async (formData: FormData) => {
    'use server';
    const name = formData.get('name');
    const developer = formData.get('developer');
    const releaseYear = formData.get('release-year');
    const finishedDate = formData.get('finished_date');

    if (name && developer && releaseYear && finishedDate) {
      const supabase = createServerActionClient<Database>({ cookies });

      await supabase.from('games').insert({
        name: name.toString(),
        developer: developer.toString(),
        release_year: Number(releaseYear),
        platform: 'PC',
        finished_date: finishedDate.toString(),
      });
      revalidatePath('/games');
    }
  };

  console.log({ user });

  return (
    <form action={addGame} className="text-black">
      <fieldset disabled={!user}>
        <input name="name" defaultValue="askdjaslkjdjaksd" />
        <input name="developer" defaultValue="akshdjasdhkjasdhkajsd" />
        <input name="release-year" type="number" defaultValue={2025} />
        <input name="finished_date" type="date" defaultValue="2087-01-04" />

        <button type="submit" className="bg-amber-400">
          add new game
        </button>
      </fieldset>
    </form>
  );
};

export default AddGame;
