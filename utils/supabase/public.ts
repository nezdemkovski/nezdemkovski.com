import "server-only";

import { PostgrestClient } from "@supabase/postgrest-js";

import type { Database } from "@/database.types";
import { getSupabaseConfig } from "@/utils/supabase/env";

let publicClient: PostgrestClient<Database> | undefined;

export const createPublicClient = () => {
  if (publicClient) return publicClient;

  const { url, key } = getSupabaseConfig();
  publicClient = new PostgrestClient<Database>(`${url}/rest/v1`, {
    schema: "public",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
  });

  return publicClient;
};
