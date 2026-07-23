import Link from 'next/link';

import AuthControls from '@/components/AuthControls';
import Logo from '@/components/Logo';

const NavBar = () => {
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

      <AuthControls />
    </nav>
  );
};

export default NavBar;
