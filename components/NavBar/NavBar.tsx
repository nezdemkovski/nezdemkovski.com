import Link from 'next/link';

import Logo from 'Logo';

const NavBar = () => (
  <nav className="bg-whisper dark:bg-woodsmoke">
    <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-28">
        <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <a className="transition duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
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
