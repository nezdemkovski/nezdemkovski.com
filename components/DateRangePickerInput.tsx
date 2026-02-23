'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateRangePickerInputProps {
  startName: string;
  endName: string;
  defaultFrom?: string;
  defaultTo?: string;
  placeholder?: string;
}

const DateRangePickerInput = ({
  startName,
  endName,
  defaultFrom,
  defaultTo,
  placeholder = 'Pick a date range',
}: DateRangePickerInputProps) => {
  const [range, setRange] = React.useState<DateRange | undefined>(
    defaultFrom
      ? { from: new Date(defaultFrom), to: defaultTo ? new Date(defaultTo) : undefined }
      : undefined,
  );

  const label = range?.from
    ? range.to
      ? `${format(range.from, 'MMM d, yyyy')} – ${format(range.to, 'MMM d, yyyy')}`
      : `${format(range.from, 'MMM d, yyyy')} – ...`
    : null;

  return (
    <>
      <input
        type="hidden"
        name={startName}
        value={range?.from ? format(range.from, 'yyyy-MM-dd') : ''}
      />
      <input
        type="hidden"
        name={endName}
        value={range?.to ? format(range.to, 'yyyy-MM-dd') : ''}
      />
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'inline-flex w-full items-center rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm transition focus:border-white/30 focus:outline-none',
              label ? 'text-white' : 'text-gray-600',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            {label ?? <span>{placeholder}</span>}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DateRangePickerInput;
