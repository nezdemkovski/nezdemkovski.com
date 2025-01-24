'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const useCurrentTime = () => {
  const [time, setTime] = useState({ hours: '', minutes: '' });
  const [showSeparator, setShowSeparator] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Prague',
        hour: '2-digit',
        minute: '2-digit',
      });
      const [hours, minutes] = formattedTime.split(':');
      setTime({ hours, minutes });
      setShowSeparator((prev) => !prev);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return { ...time, showSeparator };
};

const CurrentLocationWidget = () => {
  const { hours, minutes, showSeparator } = useCurrentTime();

  return (
    <div className="h-[300px] min-h-[300px] w-[335px] min-w-[335px] rounded-3xl bg-black px-7 py-5">
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
            {hours && minutes ? (
              <span className="inline-flex items-center font-mono">
                {hours}
                <span
                  className={`inline-flex w-4 items-center justify-center transition-opacity duration-300 ${
                    showSeparator ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                >
                  :
                </span>
                {minutes}
              </span>
            ) : (
              <span>...</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentLocationWidget;
