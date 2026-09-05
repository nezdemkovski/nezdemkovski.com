import { removeTravel } from "@/app/countries/actions";

const RemoveTravel = ({ id }: { id: string }) => {
  const removeTravelWithId = removeTravel.bind(null, id);

  return (
    <form action={removeTravelWithId}>
      <button type="submit" className="text-xs text-white underline decoration-dotted">
        remove
      </button>
    </form>
  );
};

export default RemoveTravel;
