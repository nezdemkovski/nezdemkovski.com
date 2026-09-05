"use client";

import SignOutButton from "@/components/SignOutButton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

const AuthControls = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div className="h-8 w-[72px]" aria-hidden="true" />;
  }

  if (authenticated) return <SignOutButton />;

  return (
    <form action="/api/auth/sign-in-github" method="post">
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="border border-dotted border-white/10 text-xs text-gray-400 hover:text-gray-300"
      >
        Sign in
      </Button>
    </form>
  );
};

export default AuthControls;
