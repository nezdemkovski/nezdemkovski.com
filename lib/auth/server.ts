import "server-only";

import { cache } from "react";

import type { Database } from "@/database.types";
import { createClient } from "@/utils/supabase/server";

type UserRights = Database["public"]["Enums"]["user_rights"];

export interface AuthState {
  authenticated: boolean;
  isAdmin: boolean;
  userId: string | null;
  rights: UserRights | null;
}

const ANONYMOUS_AUTH_STATE: AuthState = {
  authenticated: false,
  isAdmin: false,
  userId: null,
  rights: null,
};

export const getAuthState = cache(async (): Promise<AuthState> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims.sub;

  if (error || !userId) return ANONYMOUS_AUTH_STATE;

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("user_rights")
    .eq("id", userId)
    .maybeSingle();

  if (userError) {
    throw new Error(`Unable to load user rights: ${userError.message}`);
  }

  const rights = user?.user_rights ?? "USER";

  return {
    authenticated: true,
    isAdmin: rights === "ADMIN",
    userId,
    rights,
  };
});

export const requireAdmin = async () => {
  const auth = await getAuthState();

  if (!auth.isAdmin || !auth.userId) {
    throw new Error("Unauthorized");
  }

  return auth;
};
