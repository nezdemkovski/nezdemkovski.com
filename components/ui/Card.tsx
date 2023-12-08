import Link from 'next/link';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  link?: string;
  cardClass?: string;
  children: React.ReactNode;
};

const Card = ({ size = 'sm', link, cardClass, children }: Props) => {
  const commonClasses =
    'h-80 w-full overflow-hidden rounded-3xl bg-black px-7 py-5 transition duration-300';

  const sizeClasses = {
    sm: 'max-w-[20rem]',
    md: 'max-w-[41.25rem]',
    lg: 'max-w-[83.75rem]',
  };
  const sizeClass = sizeClasses[size];

  return link ? (
    <Link
      href={link}
      className={`${commonClasses} ${sizeClass} ${cardClass} cursor-pointer hover:-translate-y-1`}
    >
      {children}
    </Link>
  ) : (
    <div className={`${commonClasses} ${sizeClass} ${cardClass}`}>
      {children}
    </div>
  );
};

export default Card;
