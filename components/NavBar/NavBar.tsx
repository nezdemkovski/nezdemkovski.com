import Link from 'next/link';

import Logo from 'Logo';

const NavBar = () => (
  <nav className="bg-whisper dark:bg-woodsmoke">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-28 items-center justify-between">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <Link href="/">
              <a className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
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
