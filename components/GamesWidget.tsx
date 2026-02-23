import Link from 'next/link';
import WidgetCard from '@/components/WidgetCard';

const GamesWidget = () => (
  <Link href="/games">
    <WidgetCard className="bg-[url('/gow.webp')] bg-cover transition duration-300 hover:-translate-y-1">
      <h2 className="font-unbounded flex flex-col pb-4 text-2xl font-bold text-white sm:text-3xl">
        <span>Games I</span>
        <span>beat</span>
      </h2>
    </WidgetCard>
  </Link>
);

export default GamesWidget;
