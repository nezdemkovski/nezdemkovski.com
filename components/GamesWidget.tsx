import Link from 'next/link';
import Card from './ui/Card';

const GamesWidget = () => (
  <Link href="/games">
    <Card
      cardClass={`bg-[url('/gow.webp')] bg-cover px-7 py-5 transition duration-300 hover:-translate-y-1`}
    >
      <h2 className="flex flex-col pb-4 font-unbounded text-2xl font-bold text-white sm:text-3xl">
        <span>Games I</span>
        <span>beat</span>
      </h2>
    </Card>
  </Link>
);

export default GamesWidget;
