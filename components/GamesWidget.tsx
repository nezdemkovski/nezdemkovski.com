import Card from './ui/Card';

const GamesWidget = () => (
  <Card
    link="/games"
    className={`h-80 bg-[url('/gow.webp')] bg-cover`}
    title="Games I beat"
  ></Card>
);

export default GamesWidget;
