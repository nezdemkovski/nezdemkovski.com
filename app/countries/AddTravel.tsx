import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { createTravelItem } from '@/app/countries/utils';
import CitySearchInput from '@/components/CitySearchInput';
import DateRangePickerInput from '@/components/DateRangePickerInput';
import SubmitButton from '@/components/SubmitButton';

const AddTravel = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const addTravel = async (formData: FormData) => {
    'use server';
    const supabaseAction = await createClient();
    const {
      data: { user: actionUser },
    } = await supabaseAction.auth.getUser();
    if (!actionUser) return;

    const city = formData.get('city');
    const countryCode = formData.get('country_code');
    const startDate = formData.get('start_date');
    const endDate = formData.get('end_date');

    if (city && countryCode && startDate && endDate) {
      await createTravelItem({
        city: city.toString(),
        countryCode: countryCode.toString().toUpperCase().slice(0, 2),
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
        <legend className="font-unbounded text-xl font-bold text-white">
          Add new trip
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CitySearchInput />

          <div className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Trip dates
            </span>
            <DateRangePickerInput
              startName="start_date"
              endName="end_date"
              defaultFrom={today}
              defaultTo={today}
              placeholder="Pick trip dates"
            />
          </div>
        </div>

        <SubmitButton label="Add new trip" />
      </fieldset>
    </form>
  );
};

export default AddTravel;
