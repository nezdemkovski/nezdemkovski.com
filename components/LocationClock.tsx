"use client";

import { useState, useEffect, useTransition } from "react";
import { PencilIcon, XIcon } from "lucide-react";

import { useAuth } from "@/components/AuthProvider";
import { Input } from "@/components/ui/input";
import { useLocationSearch, type GeoResult } from "@/hooks/use-location-search";
import { type Location } from "@/utils/location";

interface LocationClockProps {
  location: Location;
  updateLocation: (location: Location) => Promise<void>;
}

function relativeTimeLabel(locationTz: string): string | null {
  try {
    const visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
    const offsetOf = (tz: string) => {
      const a = new Date(now.toLocaleString("en-US", { timeZone: tz }));
      const b = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
      return (a.getTime() - b.getTime()) / 3_600_000;
    };
    const diff = Math.round((offsetOf(locationTz) - offsetOf(visitorTz)) * 2) / 2;
    if (Math.abs(diff) < 0.25) return "same timezone as you";
    const abs = Math.abs(diff);
    const h = Math.floor(abs);
    const m = abs % 1 !== 0 ? " 30m" : "";
    const label = `${h}h${m}`;
    return diff > 0 ? `${label} ahead of you` : `${label} behind you`;
  } catch {
    return null;
  }
}

const LocationClock = ({ location, updateLocation }: LocationClockProps) => {
  const { isAdmin } = useAuth();
  const [time, setTime] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState(location);
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const { query, setQuery, results, isSearching, clearSearch } = useLocationSearch();

  useEffect(() => {
    const timeFmt = new Intl.DateTimeFormat("en-US", {
      timeZone: currentLocation.timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const updateTime = () => {
      setTime(timeFmt.format(new Date()));
    };

    const frameId = window.requestAnimationFrame(updateTime);
    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(
      () => {
        updateTime();
        intervalId = window.setInterval(updateTime, 60_000);
      },
      60_000 - (Date.now() % 60_000),
    );

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [currentLocation.timezone]);

  const selectResult = (result: GeoResult) => {
    const previous = currentLocation;
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
      try {
        await updateLocation(next);
      } catch {
        setCurrentLocation(previous);
      }
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    clearSearch();
  };

  const [hoursMinutes, period] = time?.split(" ") ?? [];
  const [hours, minutes] = hoursMinutes?.split(":") ?? [];
  const relTime = relativeTimeLabel(currentLocation.timezone);

  const showDropdown = isEditing && (results.length > 0 || isSearching);

  return (
    <div className="flex flex-1 items-center">
      <div className="relative z-10 flex w-full items-stretch justify-between">
        {/* Left: location */}
        <div className="flex min-w-0 flex-1 flex-col justify-between pr-3">
          <p className="font-iawriterquattro text-2xl text-white">{currentLocation.city}</p>
          <div>
            <p className="text-sm text-white/40">{currentLocation.country}</p>
            {relTime && <p className="mt-0.5 text-xs text-white/25">{relTime}</p>}
          </div>
        </div>

        {/* Right: stacked digits */}
        <div
          className="grid w-[4.5rem] shrink-0 grid-rows-[58px_58px_24px] justify-items-end text-right font-mono"
          role="timer"
          aria-label={time ? `Local time ${time}` : "Loading local time"}
          aria-live="off"
        >
          <p className="w-[2ch] text-[58px] leading-none font-bold text-white tabular-nums">
            {hours ?? "--"}
          </p>
          <p className="w-[2ch] text-[58px] leading-none font-bold text-white/50 tabular-nums">
            {minutes ?? "--"}
          </p>
          <p className="mt-1 h-5 text-sm leading-5 text-white/30">
            <span className={period ? undefined : "invisible"}>{period ?? "AM"}</span>
          </p>
        </div>
      </div>

      {isAdmin && (
        <div className="absolute inset-x-0 bottom-0 z-10 rounded-b-3xl border-t border-white/10 bg-white/5 px-7 py-3 backdrop-blur-md">
          {showDropdown && (
            <div className="absolute right-0 bottom-full left-0 mb-1 max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-[oklch(24%_0.0105_268.16)] shadow-lg">
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
                  <span className="shrink-0 text-xs text-white/40">{result.timezone}</span>
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
