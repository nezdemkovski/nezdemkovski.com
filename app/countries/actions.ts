"use server";

import { revalidatePath, updateTag } from "next/cache";

import { requireAdmin } from "@/lib/auth/server";
import { parseCountryCode, parseIsoDate, parseUuid, readRequiredString } from "@/lib/validation";
import { createClient } from "@/utils/supabase/server";

export const addTravel = async (formData: FormData) => {
  await requireAdmin();

  const city = readRequiredString(formData, "city", 200);
  const countryCode = parseCountryCode(readRequiredString(formData, "country_code", 2));
  const startDate = parseIsoDate(readRequiredString(formData, "start_date", 10), "start_date");
  const endDate = parseIsoDate(readRequiredString(formData, "end_date", 10), "end_date");

  if (endDate < startDate) {
    throw new Error("end_date must not be before start_date");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("travels").insert({
    city,
    country_code: countryCode,
    start_date: startDate,
    end_date: endDate,
    range_text: "",
  });

  if (error) throw new Error(`Unable to create trip: ${error.message}`);

  updateTag("travels");
  revalidatePath("/");
  revalidatePath("/countries");
};

export const removeTravel = async (id: string) => {
  await requireAdmin();

  const supabase = await createClient();
  const { error } = await supabase.from("travels").delete().eq("id", parseUuid(id));

  if (error) throw new Error(`Unable to remove trip: ${error.message}`);

  updateTag("travels");
  revalidatePath("/");
  revalidatePath("/countries");
};
