'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerInputProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}

const DatePickerInput = ({
  name,
  defaultValue,
  placeholder = 'Pick a date',
}: DatePickerInputProps) => {
  const [date, setDate] = React.useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined,
  );

  return (
    <>
      <input
        type="hidden"
        name={name}
        value={date ? format(date, 'yyyy-MM-dd') : ''}
      />
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'inline-flex w-full items-center rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm transition focus:border-white/30 focus:outline-none',
              date ? 'text-white' : 'text-gray-600',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            {date ? format(date, 'PPP') : <span>{placeholder}</span>}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DatePickerInput;
