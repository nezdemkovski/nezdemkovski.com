'use client';

import { FormEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const GithubLogin = () => {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleGithubSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/api/auth/callback?path=${pathname}`,
      },
    });
    router.refresh();
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 sm:max-w-md">
      <form
        className="text-foreground flex w-full flex-1 flex-col justify-center gap-2"
        onSubmit={handleGithubSignIn}
      >
        <button className="border-dotted text-xs text-gray-400">Login</button>
      </form>
    </div>
  );
};

export default GithubLogin;
