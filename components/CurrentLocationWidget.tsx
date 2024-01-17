'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Card from './ui/Card';
import Text from './ui/Text';

const useCurrentTime = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Prague',
        hour: '2-digit',
        minute: '2-digit',
      });
      const [currentHours, currentMinutes] = formattedTime.split(':');
      setHours(currentHours);
      setMinutes(currentMinutes);
    };

    const interval = setInterval(() => {
      updateClock();
      setBlink(b => !b); 
    }, 1000);

    updateClock(); 

    return () => clearInterval(interval);
  }, []); 

  return { hours, minutes, blink };
};

const CurrentLocationWidget = () => {
  const { hours, minutes, blink } = useCurrentTime();

  return (
    <Card title="Current Location & Time">
      <div className="flex items-center gap-4">
        <Image
          width={60}
          height={40}
          src="/flags/cz.svg"
          alt="Czechia flag"
          title="Czechia"
        />
        <div>
          <Text>Prague, Czechia</Text>
          <Text>
            {!hours && !minutes ? (
              <span>...</span>
            ) : (
              <>
                <span>{hours}</span>
                <span className={`mx-1 ${blink ? 'opacity-0' : 'opacity-100'}`}>:</span>
                <span>{minutes}</span>
              </>
            )}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default CurrentLocationWidget;
