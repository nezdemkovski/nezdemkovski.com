'use client';

import { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type Location, LOCATIONS } from '@/utils/location';

interface LocationClockProps {
  location: Location;
  isAdmin: boolean;
  updateLocation: (code: string) => Promise<void>;
}

const LocationClock = ({
  location,
  isAdmin,
  updateLocation,
}: LocationClockProps) => {
  const [time, setTime] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState(location);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: currentLocation.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    setTime(formatter.format(new Date()));
    const id = setInterval(() => setTime(formatter.format(new Date())), 1000);
    return () => clearInterval(id);
  }, [currentLocation.timezone]);

  const [hoursMinutes, period] = time?.split(' ') ?? [];
  const [hours, minutes] = hoursMinutes?.split(':') ?? [];

  const handleLocationChange = (code: string) => {
    const next = LOCATIONS.find((l) => l.code === code);
    if (!next) return;
    setCurrentLocation(next);
    startTransition(async () => {
      await updateLocation(code);
    });
  };

  return (
    <>
      <div className="flex flex-row gap-4 rounded-2xl bg-black/40 px-2 py-4">
        <div className="self-center">
          <Image
            width={47}
            height={47}
            src={currentLocation.flagSrc}
            alt={currentLocation.flagAlt}
            title={currentLocation.country}
          />
        </div>
        <div>
          <p className="font-iawriterquattro text-base text-white">
            {currentLocation.city}, {currentLocation.country}
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

      {isAdmin && (
        <div className="absolute inset-x-0 bottom-0 rounded-b-3xl border-t border-white/10 bg-white/5 px-7 py-4 backdrop-blur-md">
          <Select
            value={currentLocation.code}
            onValueChange={handleLocationChange}
            disabled={isPending}
          >
            <SelectTrigger className="w-full bg-transparent">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {LOCATIONS.map((loc) => (
                <SelectItem key={loc.code} value={loc.code}>
                  {loc.city}, {loc.country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};

export default LocationClock;
