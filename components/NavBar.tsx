import Link from 'next/link';
import { cookies } from 'next/headers';

import Logo from '@/components/Logo';
import SignOutButton from '@/components/SignOutButton';
import { createClient } from '@/utils/supabase/server';

const NavBar = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex items-center justify-between pb-10 pt-5">
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
