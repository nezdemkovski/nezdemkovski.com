'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import WidgetCard from '@/components/WidgetCard';

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Europe/Prague',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
});

const CurrentLocationWidget = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatter.format(new Date()));
    const id = setInterval(() => setTime(formatter.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  const [hoursMinutes, period] = time?.split(' ') ?? [];
  const [hours, minutes] = hoursMinutes?.split(':') ?? [];

  return (
    <WidgetCard>
      <h2 className="font-unbounded pb-4 text-2xl font-bold text-white sm:text-3xl">
        Current Location & Time
      </h2>
      <div className="flex flex-row gap-4 rounded-2xl bg-black/40 px-2 py-4">
        <div className="self-center">
          <Image
            width={47}
            height={47}
            src="/flags/cz.svg"
            alt="Czechia flag"
            title="Czechia"
          />
        </div>
        <div>
          <p className="font-iawriterquattro text-base text-white">
            Prague, Czechia
          </p>
          <p className="font-iawriterquattro text-base text-white">
            {hours && minutes && period ? (
              <span className="inline-flex items-center font-mono">
                {hours}
                <span
                  className="inline-flex w-4 items-center justify-center"
                  style={{ animation: 'blink 1s step-start infinite' }}
                  aria-hidden="true"
                >
                  :
                </span>
                {minutes}
                <span className="ml-1">{period}</span>
              </span>
            ) : (
              <span>...</span>
            )}
          </p>
        </div>
      </div>
    </WidgetCard>
  );
};

export default CurrentLocationWidget;
