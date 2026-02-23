import { type PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

const WidgetCard = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={cn(
      'h-[300px] min-h-[300px] w-[335px] min-w-[335px] rounded-3xl bg-black px-7 py-5',
      className,
    )}
  >
    {children}
  </div>
);

export default WidgetCard;
