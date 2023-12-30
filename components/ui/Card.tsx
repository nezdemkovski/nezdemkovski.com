import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

import Title from './Title';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  link?: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties | undefined;
  children?: React.ReactNode;
};

const Card = ({
  size = 'sm',
  link,
  title,
  className,
  style,
  children,
}: Props) => {
  const commonClasses =
    'relative flex h-auto sm:h-80 w-full flex-col overflow-hidden rounded-3xl bg-black px-7 py-5 transition duration-300';

  const sizeClasses = {
    sm: 'max-w-ful sm:max-w-[20rem]',
    md: 'max-w-full sm:max-w-[41rem] md:max-w-[41.25rem]',
    lg: 'max-w-ful sm:max-w-[83.5rem] md:max-w-[83.75rem]',
  };

  const classes = cn(
    commonClasses,
    sizeClasses[size],
    link && 'cursor-pointer hover:-translate-y-1',
    className,
  );

  const CardContent = () => (
    <>
      {title && (
        <Title order={2} className="pb-6">
          {title}
        </Title>
      )}
      {children}
    </>
  );

  return link ? (
    <Link href={link} style={style} className={classes}>
      <CardContent />
    </Link>
  ) : (
    <div style={style} className={classes}>
      <CardContent />
    </div>
  );
};

export default Card;
