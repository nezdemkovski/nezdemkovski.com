import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  color?: string;
  weight?: 'normal' | 'bold';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  lineClamp?: number;
  backlight?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Text = ({
  size = 'md',
  color = 'gray-100',
  weight = 'normal',
  align = 'left',
  truncate,
  lineClamp,
  backlight,
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
  const commonClasses = 'font-iawriterquattro';
  const colorClass = color && `text-${color}`;
  const weightClass = weight && `font-${weight}`;
  const alignClass = `text-${align}`;
  const truncateClass = truncate && 'truncate';
  const lineClampClass = lineClamp && `line-clamp-${lineClamp}`;
  const backlightClass =
    backlight && 'rounded-md bg-white bg-opacity-20 px-2 py-0.5';

  const classes = cn(
    commonClasses,
    sizeClasses[size],
    colorClass,
    weightClass,
    alignClass,
    truncateClass,
    lineClampClass,
    backlightClass,
    className,
  );

  return backlight ? (
    <span className={classes}>{children}</span>
  ) : (
    <p className={classes}>{children}</p>
  );
};

export default Text;
