import Link from 'next/link';

import Logo from '@/components/Logo';

const NavBar = () => (
  <nav className="px-7 py-5">
    <div className="col-span-3 flex items-center gap-4 md:col-span-1">
      <div className="text-white">
        <Link href="/">
          <Logo width={50} height={50} />
        </Link>
      </div>

      <h1 className="flex flex-col font-iawriterquattro text-xl font-bold leading-tight text-white">
        <span>Yuri</span>
        <span>Nezdemkovski</span>
      </h1>
    </div>
  </nav>
);

export default NavBar;
