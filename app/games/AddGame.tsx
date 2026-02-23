import { revalidatePath } from 'next/cache';
import { createGameItem, getUserInfo } from '@/app/games/utils';

import DatePickerInput from '@/components/DatePickerInput';
import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    const user = await getUserInfo();
    if (!user) return;

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
    <form action={addGame}>
      <fieldset
        disabled={!user}
        className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <legend className="font-unbounded text-xl font-bold text-white">
          Add new game
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-xs font-bold tracking-wider text-gray-400 uppercase"
            >
              Game name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Game's name"
              defaultValue=""
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="developer"
              className="text-xs font-bold tracking-wider text-gray-400 uppercase"
            >
              Developer
            </label>
            <Input
              id="developer"
              name="developer"
              placeholder="Developer's name"
              defaultValue=""
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="release-year"
              className="text-xs font-bold tracking-wider text-gray-400 uppercase"
            >
              Release year
            </label>
            <Input
              id="release-year"
              name="release-year"
              type="number"
              placeholder="Year of the release"
              defaultValue={currentYear}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="platform"
              className="text-xs font-bold tracking-wider text-gray-400 uppercase"
            >
              Platform
            </label>
            <Select name="platform" defaultValue={platformTypes[0]}>
              <SelectTrigger id="platform" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {platformTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Finished date
            </span>
            <DatePickerInput
              name="finished_date"
              defaultValue={currentDate}
              placeholder="Pick finish date"
            />
          </div>
        </div>

        <SubmitButton label="Add new game" />
      </fieldset>
    </form>
  );
};

export default AddGame;
