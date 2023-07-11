import { cookies } from 'next/headers';
import Link from 'next/link';
import { Database } from '@/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import GithubLogin from '@/components/GithubLogin';
import Logo from '@/components/Logo';
import LogoutButton from '@/components/LogoutButton';

const NavBar = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
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

        <h1 className="flex flex-col font-iawriterquattro text-xl font-bold leading-tight text-gray-900 dark:text-white">
          <span>Yuri</span>
          <span>Nezdemkovski</span>
        </h1>
      </div>

      <div>
        {user ? (
          <div className="flex flex-col items-center gap-1 border-dotted text-xs text-gray-300">
            <LogoutButton />
          </div>
        ) : (
          <GithubLogin />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
