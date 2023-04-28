'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const useCurrentTime = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Prague',
        hour: '2-digit',
        minute: '2-digit',
      });
      const [currentHours, currentMinutes] = formattedTime.split(':');
      setHours(currentHours);
      setMinutes(currentMinutes);
      setBlink(!blink);
    }, 1000);

    return () => clearInterval(interval);
  }, [blink]);

  return { hours, minutes, blink };
};

const CurrentLocation = () => {
  const { hours, minutes, blink } = useCurrentTime();

  return (
    <div className="h-[300px] min-h-[300px] w-[335px] min-w-[335px] rounded-3xl bg-black px-7 py-5">
      <h2 className="pb-4 font-unbounded text-2xl font-bold text-white sm:text-3xl">
        Current Location & Time
      </h2>
      <div className="flex flex-row gap-4 rounded-2xl bg-black bg-opacity-40 px-2 py-4">
        <div className="self-center">
          <p className="justify-center text-center text-5xl">
            <Image
              width={47}
              height={47}
              src="/flags/cz.svg"
              alt="Czechia flag"
              title="Czechia"
            />
          </p>
        </div>
        <div>
          <p className="font-iawriterquattro text-base text-white">
            Prague, Czechia
          </p>
          <p className="font-iawriterquattro text-base text-white">
            {!hours && !minutes ? (
              <span>...</span>
            ) : (
              <>
                <span className="inline-block text-right">{hours}</span>
                <span
                  className={`mx-1 inline-block ${
                    blink ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  :
                </span>
                <span className="inline-block text-left">{minutes}</span>
              </>
            )}
          </p>
        </div>
      </div>

      {/*<div className="gap-4 rounded-2xl bg-stone-900 px-2 py-4">*/}
      {/*  <p className="font-iawriterquattro text-sm text-white sm:text-base">*/}
      {/*    <Clock />*/}
      {/*  </p>*/}
      {/*</div>*/}
    </div>
  );
};

export default CurrentLocation;
