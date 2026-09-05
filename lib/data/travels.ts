import "server-only";

import { unstable_cache } from "next/cache";

import type { Database } from "@/database.types";
import { handleError } from "@/utils/handleError";
import { createPublicClient } from "@/utils/supabase/public";

export type Travel = Database["public"]["Tables"]["travels"]["Row"];

interface TripsByYear {
  [year: number]: Travel[];
}

const getUniqueCountries = (trips: TripsByYear) => {
  const visited = new Set();

  Object.values(trips).forEach((trips: Travel[]) => {
    trips.forEach((trip) => {
      visited.add(trip.country_code);
    });
  });

  return visited.size;
};

const getTravelsFromDatabase = async () => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("travels")
    .select()
    .order("start_date", { ascending: false });

  if (error) {
    handleError(error, "Error from getTravels");
  }

  const rows = data ?? [];
  const trips: TripsByYear = {};

  rows.forEach((trip) => {
    const visitedYear = new Date(trip.start_date).getFullYear();

    if (!trips[visitedYear]) {
      trips[visitedYear] = [];
    }

    trips[visitedYear].push(trip);
  });

  return {
    data: trips,
    total: rows.length,
    totalCountries: getUniqueCountries(trips),
  };
};

export const getTravels = unstable_cache(getTravelsFromDatabase, ["public-travels"], {
  revalidate: 3600,
  tags: ["travels"],
});
