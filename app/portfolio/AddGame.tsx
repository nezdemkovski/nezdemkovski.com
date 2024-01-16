import { revalidatePath } from 'next/cache';
import { createGameItem, getUserInfo } from '@/app/games/utils';

const platformTypes = [
  'PC',
  'Macbook',
  'PlayStation 4',
  'PlayStation 5',
  'Steam Deck',
  'Yuzu Nintendo Switch Emulator',
];

const AddGame = async () => {
  const user = await getUserInfo();

  const addGame = async (formData: FormData) => {
    'use server';
    const name = formData.get('name');
    const developer = formData.get('developer');
    const releaseYear = formData.get('release-year');
    const finishedDate = formData.get('finished_date');
    const platform = formData.get('platform') as any;

    if (name && developer && releaseYear && finishedDate) {
      await createGameItem({
        name: name.toString(),
        developer: developer.toString(),
        releaseYear: Number(releaseYear),
        platform,
        finishedDate: finishedDate.toString(),
      });
      revalidatePath('/games');
    }
  };

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentDate = date.toISOString().slice(0, 10);

  return (
    <form action={addGame} className="text-black">
      <fieldset disabled={!user}>
        <input name="name" placeholder="Game's name" defaultValue="" />
        <input
          name="developer"
          placeholder="Developer's name"
          defaultValue=""
        />
        <input
          name="release-year"
          type="number"
          placeholder="Year of the release"
          defaultValue={currentYear}
        />
        <select name="platform" id="platform">
          {platformTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          name="finished_date"
          type="date"
          placeholder="Date when I finished the game"
          defaultValue={currentDate}
        />

        <button type="submit" className="bg-amber-400">
          add new game
        </button>
      </fieldset>
    </form>
  );
};

export default AddGame;
