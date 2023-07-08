import { Game, getGames } from '@/app/games/helpers';

import { PCBuildData } from './data';

export const revalidate = 10;

const PCInfo = ({ data }: { data: typeof PCBuildData }) => (
  <div className="mb-6">
    <h2 className="mb-3 font-unbounded text-2xl font-bold">My PC Build</h2>
    <ul>
      <li className="mb-3">
        <h3>{data.cpu}</h3>
        <div className="text-xs text-gray-400">CPU</div>
      </li>
      <li className="mb-3">
        <h3>{data.gpu}</h3>
        <div className="text-xs text-gray-400">Graphic Card</div>
      </li>
      <li className="mb-3">
        <h3>{data.motherBoard}</h3>
        <div className="text-xs text-gray-400">Motherboard</div>
      </li>
      <li className="mb-3">
        <h3>{data.powerSupply}</h3>
        <div className="text-xs text-gray-400">Power Supply</div>
      </li>
      <li className="mb-3">
        <h3>{data.waterCooling}</h3>
        <div className="text-xs text-gray-400">Water Cooling System</div>
      </li>
      <li className="mb-3">
        <h3>{data.ram}</h3>
        <div className="text-xs text-gray-400">RAM</div>
      </li>
      <li className="mb-3">
        <h3>{data.ssd}</h3>
        <div className="text-xs text-gray-400">SSD</div>
      </li>
      <li className="mb-3">
        <h3>{data.case}</h3>
        <div className="text-xs text-gray-400">Case</div>
      </li>
    </ul>
  </div>
);

const GamesByYear = ({
  title,
  gamesList,
}: {
  title: string;
  gamesList: Game[];
}) => (
  <div key={title} className="mb-10">
    <h2 className="mb-3 font-unbounded text-2xl font-bold">{title}</h2>
    <ul>
      {gamesList.map((game, index) => (
        <li key={index} className="mb-3">
          <h3>{game.name}</h3>
          <div className="text-xs text-gray-400">
            {game.release_year} · {game.developer} · {game.platform}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const GamesPage = async () => {
  const { data, total } = await getGames();

  if (!data) {
    return (
      <main className="m-6 mx-auto max-w-3xl">
        <h1 className="mb-10 font-unbounded text-3xl font-bold">
          Something bad happened. Refresh the page.
        </h1>
      </main>
    );
  }

  const entries = Object.entries(data).sort(
    ([year1], [year2]) => Number(year2) - Number(year1),
  );

  return (
    <main className="m-6 mx-auto max-w-3xl">
      <h1 className="mb-10 font-unbounded text-3xl font-bold">
        Games I beat: <span className="text-gray-400">{total}</span>
      </h1>

      <div className="grid gap-2 md:grid-cols-2">
        <div className="">
          {entries.map(([year, gamesList]) => (
            <GamesByYear key={year} title={year} gamesList={gamesList} />
          ))}
        </div>

        <div>
          <PCInfo data={PCBuildData} />
        </div>
      </div>
    </main>
  );
};

export default GamesPage;
