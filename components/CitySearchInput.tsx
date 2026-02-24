'use client';

import { useState } from 'react';
import Image from 'next/image';
import { XIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useLocationSearch, type GeoResult } from '@/hooks/use-location-search';

const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });

const CitySearchInput = () => {
  const { query, setQuery, results, isSearching, clearSearch } =
    useLocationSearch();
  const [selected, setSelected] = useState<GeoResult | null>(null);

  const handleSelect = (result: GeoResult) => {
    setSelected(result);
    clearSearch();
  };

  const handleClear = () => {
    setSelected(null);
    clearSearch();
  };

  const showDropdown = results.length > 0 || isSearching;

  return (
    <div className="flex flex-col gap-1 sm:col-span-2">
      <label
        htmlFor="city-search"
        className="text-xs font-bold tracking-wider text-gray-400 uppercase"
      >
        City
      </label>

      {/* Hidden inputs consumed by the server action */}
      <input type="hidden" name="city" value={selected?.name ?? ''} />
      <input
        type="hidden"
        name="country_code"
        value={selected?.country_code ?? ''}
      />

      {selected ? (
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
          <Image
            src={`https://flagcdn.com/w40/${selected.country_code.toLowerCase()}.png`}
            width={20}
            height={15}
            alt=""
            className="rounded-sm"
          />
          <span className="flex-1 text-sm text-white">
            {selected.name},{' '}
            {countryNames.of(selected.country_code) ?? selected.country}
          </span>
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear selection"
            className="text-white/40 transition-colors hover:text-white/80"
          >
            <XIcon className="size-4" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <Input
            id="city-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city…"
            autoComplete="off"
          />
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-[oklch(24%_0.0105_268.16)] shadow-lg">
              {isSearching && results.length === 0 && (
                <p className="px-3 py-2 text-xs text-white/40">Searching…</p>
              )}
              {results.map((result) => (
                <button
                  key={result.id}
                  type="button"
                  onClick={() => handleSelect(result)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-white/10"
                >
                  <Image
                    src={`https://flagcdn.com/w40/${result.country_code.toLowerCase()}.png`}
                    width={20}
                    height={15}
                    alt=""
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
        </div>
      )}
    </div>
  );
};

export default CitySearchInput;
