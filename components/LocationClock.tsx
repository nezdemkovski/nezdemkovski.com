'use client';

import { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import { PencilIcon, XIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useLocationSearch, type GeoResult } from '@/hooks/use-location-search';
import { type Location } from '@/utils/location';

interface LocationClockProps {
  location: Location;
  isAdmin: boolean;
  updateLocation: (location: Location) => Promise<void>;
}

const LocationClock = ({
  location,
  isAdmin,
  updateLocation,
}: LocationClockProps) => {
  const [time, setTime] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState(location);
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const { query, setQuery, results, isSearching, clearSearch } =
    useLocationSearch();

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

  const selectResult = (result: GeoResult) => {
    const next: Location = {
      city: result.name,
      country: result.country,
      countryCode: result.country_code,
      timezone: result.timezone,
    };
    setCurrentLocation(next);
    setIsEditing(false);
    clearSearch();
    startTransition(async () => {
      await updateLocation(next);
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    clearSearch();
  };

  const [hoursMinutes, period] = time?.split(' ') ?? [];
  const [hours, minutes] = hoursMinutes?.split(':') ?? [];

  const showDropdown = isEditing && (results.length > 0 || isSearching);

  return (
    <>
      <div className="flex flex-row gap-4 rounded-2xl bg-black/40 px-2 py-4">
        <div className="self-center">
          <Image
            src={`https://flagcdn.com/w80/${currentLocation.countryCode.toLowerCase()}.png`}
            width={47}
            height={35}
            alt={`${currentLocation.country} flag`}
            title={currentLocation.country}
            className="rounded-sm"
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
        <div className="absolute inset-x-0 bottom-0 rounded-b-3xl border-t border-white/10 bg-white/5 px-7 py-3 backdrop-blur-md">
          {showDropdown && (
            <div className="absolute bottom-full left-0 right-0 mb-1 max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-[oklch(24%_0.0105_268.16)] shadow-lg">
              {isSearching && results.length === 0 && (
                <p className="px-3 py-2 text-xs text-white/40">Searching…</p>
              )}
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => selectResult(result)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-white/10"
                >
                  <Image
                    src={`https://flagcdn.com/w40/${result.country_code.toLowerCase()}.png`}
                    width={20}
                    height={15}
                    alt={`${result.country} flag`}
                    className="rounded-sm"
                  />
                  <span className="flex-1 truncate text-sm text-white">
                    {result.name}, {result.country}
                  </span>
                  <span className="shrink-0 text-xs text-white/40">
                    {result.timezone}
                  </span>
                </button>
              ))}
            </div>
          )}

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex w-full items-center justify-between text-sm text-white/50 transition-colors hover:text-white/80"
            >
              <span>
                {currentLocation.city}, {currentLocation.country}
              </span>
              <PencilIcon className="size-3.5 shrink-0" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <label htmlFor="loc-search" className="sr-only">
                Search city
              </label>
              <Input
                id="loc-search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city…"
                className="h-7 flex-1 px-2 text-xs"
                disabled={isPending}
              />
              <button
                onClick={cancelEdit}
                aria-label="Cancel"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30 transition-colors hover:bg-white/10"
              >
                <XIcon className="size-3.5 text-white/60" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LocationClock;
