import { revalidatePath } from 'next/cache';

import { getUserRights, UserRights } from '@/app/games/utils';
import { removeTravelItem } from '@/app/countries/utils';

const RemoveTravel = async ({ id }: { id: string }) => {
  const removeTravel = async () => {
    'use server';
    const rights = await getUserRights();
    if (rights !== UserRights.ADMIN) return;
    await removeTravelItem(id);
    revalidatePath('/countries');
  };

  return (
    <form action={removeTravel}>
      <button
        type="submit"
        className="text-xs text-white underline decoration-dotted"
      >
        remove
      </button>
    </form>
  );
};

export default RemoveTravel;
