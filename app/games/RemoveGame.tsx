import { removeGame } from "@/app/games/actions";

const RemoveGame = ({ id }: { id: string }) => {
  const removeGameWithId = removeGame.bind(null, id);

  return (
    <form action={removeGameWithId}>
      <button type="submit" className="text-xs text-white underline decoration-dotted">
        remove
      </button>
    </form>
  );
};

export default RemoveGame;
