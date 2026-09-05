import "server-only";

import { unstable_cache } from "next/cache";

import type { Database } from "@/database.types";
import { handleError } from "@/utils/handleError";
import { createPublicClient } from "@/utils/supabase/public";

export type Game = Database["public"]["Tables"]["games"]["Row"];

interface GamesByYear {
  [year: number]: Game[];
}

const getGamesFromDatabase = async () => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("games")
    .select()
    .order("finished_date", { ascending: false });

  if (error) {
    handleError(error, "Error from getGames");
  }

  const rows = data ?? [];
  const games: GamesByYear = {};

  rows.forEach((game) => {
    const finishedYear = new Date(game.finished_date).getFullYear();

    if (!games[finishedYear]) {
      games[finishedYear] = [];
    }

    games[finishedYear].push(game);
  });

  return { data: games, total: rows.length };
};

export const getGames = unstable_cache(getGamesFromDatabase, ["public-games"], {
  revalidate: 3600,
  tags: ["games"],
});
