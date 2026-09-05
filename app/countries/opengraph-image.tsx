import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PostgrestClient } from "@supabase/postgrest-js";

import type { Database } from "@/database.types";

export const revalidate = 60;

const fontDirectory = join(process.cwd(), "node_modules", "@fontsource", "unbounded", "files");
const unbounded400 = readFile(join(fontDirectory, "unbounded-latin-ext-400-normal.woff"));
const unbounded700 = readFile(join(fontDirectory, "unbounded-latin-ext-700-normal.woff"));

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });

export default async function CountriesOG() {
  const travels = await getLatestTravels();

  return new ImageResponse(
    <div tw="flex p-10 h-full w-full bg-black flex-col" style={font("Inter 300")}>
      <main tw="flex grow pt-4 w-full justify-center items-center">
        <div tw="flex flex-row">
          <div tw="flex flex-col px-10 grow text-[28px] h-120 justify-center text-white">
            <div tw="text-2xl mb-7" style={font("Unbounded 400")}>
              Yuri Nezdemkovski
            </div>

            <div tw="text-7xl mb-7 text-white flex" style={font("Unbounded 700")}>
              Last 3 countries I visited
            </div>

            {travels.map((trip, index) => (
              <div
                key={index}
                tw="flex items-center mb-6 text-3xl text-white"
                style={font("Unbounded 400")}
              >
                <img
                  src={`https://flagcdn.com/w40/${trip.country_code.toLowerCase()}.png`}
                  width={36}
                  height={27}
                  alt=""
                  style={{ borderRadius: 3, marginRight: 16 }}
                />
                {trip.city}, {countryNames.of(trip.country_code) ?? trip.country_code}
                <span tw="ml-6 text-xl text-gray-400">{trip.range_text}</span>
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

async function getLatestTravels() {
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
    .from("travels")
    .select("city, country_code, range_text")
    .order("start_date", { ascending: false })
    .limit(3);

  if (error) {
    throw error;
  }

  return data;
}
