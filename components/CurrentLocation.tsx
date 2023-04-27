'use client';

import { useEffect, useState } from 'react';

const useCurrentTime = () => {
  const [date, setDate] = useState<Date | ''>('');

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return date
    ? date.toLocaleTimeString('en-US', { timeZone: 'Europe/Prague' })
    : '...';
};

const CurrentLocation = () => {
  const currentTime = useCurrentTime();

  return (
    <div className="relative inline-block h-[300px] w-[335px] rounded-3xl bg-black px-7 py-5 transition duration-300">
      <h2 className="pb-5 font-unbounded text-2xl font-bold text-white sm:text-3xl">
        Current Location & Time
      </h2>

      <div className="px-2 py-4 bg-stone-900 rounded-2xl flex flex-row gap-4">
        <div className="self-center">
          <p className="text-center justify-center text-5xl">🇨🇿</p>
        </div>
        <div>
          <p className="font-iawriterquattro text-sm text-white sm:text-base">
            Prague, Czechia
          </p>
          <p className="font-iawriterquattro text-sm text-white sm:text-base">
            {currentTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentLocation;
