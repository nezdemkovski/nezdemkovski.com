'use client';

import { useState, useEffect, useTransition } from 'react';
import { PencilIcon, XIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useLocationSearch, type GeoResult } from '@/hooks/use-location-search';
import { type Location } from '@/utils/location';

interface LocationClockProps {
  location: Location;
  isAdmin: boolean;
  updateLocation: (location: Location) => Promise<void>;
}


function relativeTimeLabel(locationTz: string): string | null {
  try {
    const visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
    const offsetOf = (tz: string) => {
      const a = new Date(now.toLocaleString('en-US', { timeZone: tz }));
      const b = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
      return (a.getTime() - b.getTime()) / 3_600_000;
    };
    const diff =
      Math.round((offsetOf(locationTz) - offsetOf(visitorTz)) * 2) / 2;
    if (Math.abs(diff) < 0.25) return 'same timezone as you';
    const abs = Math.abs(diff);
    const h = Math.floor(abs);
    const m = abs % 1 !== 0 ? ' 30m' : '';
    const label = `${h}h${m}`;
    return diff > 0 ? `${label} ahead of you` : `${label} behind you`;
  } catch {
    return null;
  }
}

const LocationClock = ({
  location,
  isAdmin,
  updateLocation,
}: LocationClockProps) => {
  const [time, setTime] = useState<string | null>(null);
  const [relTime, setRelTime] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState(location);
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const { query, setQuery, results, isSearching, clearSearch } =
    useLocationSearch();

  useEffect(() => {
    const timeFmt = new Intl.DateTimeFormat('en-US', {
      timeZone: currentLocation.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const tick = () => {
      setTime(timeFmt.format(new Date()));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [currentLocation.timezone]);

  useEffect(() => {
    setRelTime(relativeTimeLabel(currentLocation.timezone));
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
    <div className="flex flex-1 items-center">
      <div className="relative z-10 flex w-full items-stretch justify-between">
        {/* Left: location */}
        <div className="flex flex-col justify-between">
          <p className="font-iawriterquattro text-2xl text-white">
            {currentLocation.city}
          </p>
          <div>
            <p className="text-sm text-white/40">{currentLocation.country}</p>
            {relTime && (
              <p className="mt-0.5 text-xs text-white/25">{relTime}</p>
            )}
          </div>
        </div>

        {/* Right: stacked digits */}
        <div className="shrink-0 text-right font-mono">
          <p className="text-[58px] font-bold leading-none text-white">
            {hours ?? '--'}
          </p>
          <p className="text-[58px] font-bold leading-none text-white/50">
            {minutes ?? '--'}
          </p>
          <p className="mt-1 text-sm text-white/30">{period ?? ''}</p>
        </div>
      </div>

      {isAdmin && (

        <div className="absolute inset-x-0 bottom-0 z-10 rounded-b-3xl border-t border-white/10 bg-white/5 px-7 py-3 backdrop-blur-md">
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
    </div>
  );
};

export default LocationClock;
