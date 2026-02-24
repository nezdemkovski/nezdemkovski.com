import { useState, useEffect } from 'react';

export interface GeoResult {
  id: number;
  name: string;
  country: string;
  country_code: string;
  timezone: string;
}

export const useLocationSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`,
        );
        const data = (await res.json()) as { results?: GeoResult[] };
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return { query, setQuery, results, isSearching, clearSearch };
};
