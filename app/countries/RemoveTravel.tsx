import { revalidatePath } from 'next/cache';
import { removeTravelItem } from '@/app/countries/utils';

const RemoveTravel = async ({ id }: { id: string }) => {
  const removeTravel = async () => {
    'use server';
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
