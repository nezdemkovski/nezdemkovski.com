import Link from 'next/link';

const GamesWidget = () => (
  <Link href="/games">
    <div className="h-[300px] min-h-[300px] w-[335px] min-w-[335px] rounded-3xl bg-black bg-[url('/gow.png')] bg-cover px-7 py-5 transition duration-300 hover:-translate-y-1">
      <h2 className="flex flex-col pb-4 font-unbounded text-2xl font-bold text-white sm:text-3xl">
        <span>Games I</span>
        <span>beat</span>
      </h2>
    </div>
  </Link>
);

export default GamesWidget;
