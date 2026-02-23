import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { createTravelItem } from '@/app/countries/utils';
import DateRangePickerInput from '@/components/DateRangePickerInput';
import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';

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
        <legend className="font-unbounded text-xl font-bold text-white">
          Add new trip
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="city"
              className="text-xs font-bold tracking-wider text-gray-400 uppercase"
            >
              City
            </label>
            <Input
              id="city"
              name="city"
              placeholder="e.g. Prague"
              defaultValue=""
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="country"
              className="text-xs font-bold tracking-wider text-gray-400 uppercase"
            >
              Country
            </label>
            <Input
              id="country"
              name="country"
              placeholder="e.g. Czech Republic"
              defaultValue=""
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="country_flag"
              className="text-xs font-bold tracking-wider text-gray-400 uppercase"
            >
              Country flag
            </label>
            <Input
              id="country_flag"
              name="country_flag"
              placeholder="🇨🇿"
              defaultValue=""
              required
            />
          </div>

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
