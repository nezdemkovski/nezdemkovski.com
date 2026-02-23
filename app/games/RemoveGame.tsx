import { revalidatePath } from 'next/cache';

import {
  getUserRights,
  removeGameItem,
  UserRights,
} from '@/app/games/utils';

const RemoveGame = async ({ id }: { id: string }) => {
  const removeGame = async () => {
    'use server';
    const rights = await getUserRights();
    if (rights !== UserRights.ADMIN) return;
    await removeGameItem(id);
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
