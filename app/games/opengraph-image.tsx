import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PostgrestClient } from "@supabase/postgrest-js";

import type { Database } from "@/database.types";

export const revalidate = 60;

const fontDirectory = join(process.cwd(), "node_modules", "@fontsource", "unbounded", "files");
const unbounded400 = readFile(join(fontDirectory, "unbounded-latin-400-normal.woff"));
const unbounded700 = readFile(join(fontDirectory, "unbounded-latin-700-normal.woff"));

export default async function GamesOG() {
  const games = await getLatestGames();

  return new ImageResponse(
    <div tw="flex p-10 h-full w-full bg-black flex-col" style={font("Inter 300")}>
      <main tw="flex grow pt-4 w-full items-center">
        <div tw="flex flex-row">
          <div tw="flex flex-col px-10 grow text-[28px] h-120 justify-center text-white">
            <div tw="text-2xl mb-7" style={font("Unbounded 400")}>
              Yuri Nezdemkovski
            </div>

            <div tw="text-7xl mb-7 text-white flex" style={font("Unbounded 700")}>
              Last 3 games I beat
            </div>

            {games.map((game, index) => (
              <div
                key={index}
                tw="flex flex-col mb-5 text-white mb-6 text-3xl"
                style={font("Unbounded 400")}
              >
                <div tw="flex">{game.name}</div>
                <div tw="flex text-xl leading-2 text-gray-400">
                  {game.release_year} · {game.developer} · {game.platform}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Unbounded 400",
          data: await unbounded400,
        },
        {
          name: "Unbounded 700",
          data: await unbounded700,
        },
      ],
    },
  );
}

function font(fontFamily: string) {
  return { fontFamily };
}

async function getLatestGames() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are not configured");
  }

  const postgrest = new PostgrestClient<Database>(`${supabaseUrl}/rest/v1`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
    schema: "public",
  });

  const { data, error } = await postgrest
    .from("games")
    .select("name, release_year, developer, platform")
    .order("finished_date", { ascending: false })
    .limit(3);

  if (error) {
    throw error;
  }

  return data;
}
