import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  order?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  color?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children: React.ReactNode;
};

const Title = ({
  order = 1,
  size = '2xl',
  color = 'gray-100',
  align = 'left',
  className,
  children,
}: Props) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  };
  const commonClasses = 'font-unbounded font-bold';
  const colorClass = color && `text-${color}`;
  const alignClass = `text-${align}`;

  const classes = cn(
    commonClasses,
    sizeClasses[size],
    colorClass,
    alignClass,
    className,
  );

  const HeadingTag = `h${order}` as keyof JSX.IntrinsicElements;

  return <HeadingTag className={classes}>{children}</HeadingTag>;
};

export default Title;
