import Link from 'next/link';

import Logo from 'Logo';

const NavBar = () => (
  <nav className="bg-whisper dark:bg-woodsmoke">
    <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-28">
        <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <a>
                <Logo width={75} height={75} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
