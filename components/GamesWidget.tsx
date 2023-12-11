import Card from './ui/Card';

const GamesWidget = () => (
  <Card
    link="/games"
    className={`bg-[url('/gow.webp')] bg-cover`}
    title="Games I beat"
  ></Card>
);

export default GamesWidget;
