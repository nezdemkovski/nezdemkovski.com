import Link from 'next/link';
import WidgetCard from '@/components/WidgetCard';

const GamesWidget = () => (
  <Link href="/games">
    <WidgetCard className="bg-[url('/gow.webp')] bg-cover transition-opacity duration-300 hover:opacity-80">
      <h2 className="font-unbounded flex flex-col pb-4 text-2xl font-bold text-white sm:text-3xl">
        <span>Games I</span>
        <span>beat</span>
      </h2>
    </WidgetCard>
  </Link>
);

export default GamesWidget;
