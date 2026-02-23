import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { createTravelItem } from '@/app/countries/utils';

const AddTravel = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const addTravel = async (formData: FormData) => {
    'use server';
    const city = formData.get('city');
    const country = formData.get('country');
    const countryFlag = formData.get('country_flag');
    const startDate = formData.get('start_date');
    const endDate = formData.get('end_date');

    if (city && country && countryFlag && startDate && endDate) {
      await createTravelItem({
        city: city.toString(),
        country: country.toString(),
        countryFlag: countryFlag.toString(),
        startDate: startDate.toString(),
        endDate: endDate.toString(),
      });
      revalidatePath('/countries');
    }
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={addTravel}>
      <fieldset
        disabled={!user}
        className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <legend className="font-unbounded mb-5 text-xl font-bold text-white">
          Add new trip
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="city"
              className="text-xs font-bold uppercase tracking-wider text-gray-400"
            >
              City
            </label>
            <input
              id="city"
              name="city"
              placeholder="e.g. Prague"
              defaultValue=""
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-white/30 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="country"
              className="text-xs font-bold uppercase tracking-wider text-gray-400"
            >
              Country
            </label>
            <input
              id="country"
              name="country"
              placeholder="e.g. Czech Republic"
              defaultValue=""
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-white/30 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="country_flag"
              className="text-xs font-bold uppercase tracking-wider text-gray-400"
            >
              Country flag
            </label>
            <input
              id="country_flag"
              name="country_flag"
              placeholder="🇨🇿"
              defaultValue=""
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-white/30 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="start_date"
              className="text-xs font-bold uppercase tracking-wider text-gray-400"
            >
              Start date
            </label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              defaultValue={today}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:border-white/30 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2">
            <label
              htmlFor="end_date"
              className="text-xs font-bold uppercase tracking-wider text-gray-400"
            >
              End date
            </label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              defaultValue={today}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:border-white/30 focus:outline-none transition"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 rounded-lg bg-white px-6 py-2 font-unbounded text-sm font-bold text-black hover:bg-gray-200 transition disabled:opacity-40"
        >
          Add new trip
        </button>
      </fieldset>
    </form>
  );
};

export default AddTravel;
