import AddGame from '@/app/games/AddGame';
import RemoveGame from '@/app/games/RemoveGame';
import { AdminOnly } from '@/components/AuthProvider';
import { type Game, getGames } from '@/lib/data/games';
import formatDate from '@/utils/formatDate';

const GamesByYear = ({
  title,
  gamesList,
}: {
  title: string;
  gamesList: Game[];
}) => (
  <div key={title} className="mb-10">
    <h2 className="font-unbounded mb-3 text-2xl font-bold">{title}</h2>
    <ul>
      {gamesList.map((game) => (
        <li key={game.id} className="mb-3 flex flex-col gap-1">
          <h3>{game.name}</h3>

          <div className="text-xs text-gray-400">
            {game.release_year} · {game.developer} · {game.platform}
          </div>

          <span className="text-xs text-gray-400">
            {formatDate(new Date(game.finished_date))}
          </span>
          <AdminOnly>
            <RemoveGame id={game.id} />
          </AdminOnly>
        </li>
      ))}
    </ul>
  </div>
);

const GamesPage = async () => {
  const { data, total } = await getGames();

  const entries = Object.entries(data).sort(
    ([year1], [year2]) => Number(year2) - Number(year1),
  );

  return (
    <main className="m-6 mx-auto max-w-3xl">
      <h1 className="font-unbounded mb-10 text-3xl font-bold">
        Games I beat: <span className="text-gray-400">{total}</span>
      </h1>

      <AdminOnly>
        <AddGame />
      </AdminOnly>

      <div className="grid gap-2 md:grid-cols-2">
        <div className="">
          {entries.map(([year, gamesList]) => (
            <GamesByYear key={year} title={year} gamesList={gamesList} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default GamesPage;
