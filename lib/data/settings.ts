import "server-only";

import { unstable_cache } from "next/cache";

import type { Json } from "@/database.types";
import { handleError } from "@/utils/handleError";
import { type Location, DEFAULT_LOCATION } from "@/utils/location";
import { createPublicClient } from "@/utils/supabase/public";
import { createClient } from "@/utils/supabase/server";

const isLocation = (value: unknown): value is Location => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const location = value as Partial<Location>;

  return (
    typeof location.city === "string" &&
    typeof location.country === "string" &&
    typeof location.countryCode === "string" &&
    typeof location.timezone === "string"
  );
};

const getLocationFromDatabase = async (): Promise<Location> => {
  const supabase = createPublicClient();

  try {
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "current_location")
      .maybeSingle();

    if (error) throw error;
    if (!data?.value) return DEFAULT_LOCATION;

    const value: unknown = typeof data.value === "string" ? JSON.parse(data.value) : data.value;

    return isLocation(value) ? value : DEFAULT_LOCATION;
  } catch (error) {
    return handleError(error, "Error from getLocation");
  }
};

export const getLocation = unstable_cache(getLocationFromDatabase, ["public-location"], {
  revalidate: 3600,
  tags: ["location"],
});

export const updateLocationInDB = async (location: Location) => {
  const supabase = await createClient();
  const value: Json = {
    city: location.city,
    country: location.country,
    countryCode: location.countryCode,
    timezone: location.timezone,
  };
  const { error } = await supabase
    .from("settings")
    .update({ value, updated_at: new Date().toISOString() })
    .eq("key", "current_location");
  if (error) handleError(error, "Error from updateLocationInDB");
};
