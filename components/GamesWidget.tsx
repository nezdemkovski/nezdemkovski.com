import Card from './ui/Card';

const GamesWidget = () => (
  <Card link="/games" cardClass={`bg-[url('/gow.webp')] bg-cover`}>
    <h2 className="flex flex-col pb-4 font-unbounded text-2xl font-bold text-white sm:text-3xl">
      <span>Games I</span>
      <span>beat</span>
    </h2>
  </Card>
);

export default GamesWidget;
