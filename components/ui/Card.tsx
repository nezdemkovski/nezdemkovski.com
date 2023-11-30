type Props = {
  cardClass?: string;
  children: React.ReactNode;
};

const Card = ({ cardClass = '', children }: Props) => (
  <div
    className={`h-80 w-80 overflow-hidden rounded-3xl bg-black px-7 py-5 ${cardClass}`}
  >
    {children}
  </div>
);

export default Card;
