import Link from 'next/link';
import { cookies } from 'next/headers';

import Logo from '@/components/Logo';
import SignOutButton from '@/components/SignOutButton';
import { createClient } from '@/utils/supabase/server';

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
        {user && (
          <div className="flex flex-col items-center gap-1 border-dotted text-xs text-gray-300">
            <SignOutButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
