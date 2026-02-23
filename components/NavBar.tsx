import Link from 'next/link';

import Logo from '@/components/Logo';
import SignOutButton from '@/components/SignOutButton';
import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';

const NavBar = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex items-center justify-between px-7 py-5">
      <div className="flex items-center gap-4">
        <div className="text-white">
          <Link href="/">
            <Logo width={50} height={50} />
          </Link>
        </div>

        <h1 className="font-iawriterquattro flex flex-col text-xl leading-tight font-bold text-gray-900 dark:text-white">
          <span>Yuri</span>
          <span>Nezdemkovski</span>
        </h1>
      </div>

      <div>
        {user ? (
          <SignOutButton />
        ) : (
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
        )}
      </div>
    </nav>
  );
};

export default NavBar;
