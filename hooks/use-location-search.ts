import { useState, useEffect } from "react";

export interface GeoResult {
  id: number;
  name: string;
  country: string;
  country_code: string;
  timezone: string;
}

export const useLocationSearch = () => {
  const [query, setQueryState] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.length < 2) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`,
          { signal: controller.signal },
        );
        const data = (await res.json()) as { results?: GeoResult[] };
        setResults(data.results ?? []);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setResults([]);
      } finally {
        if (!controller.signal.aborted) setIsSearching(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const setQuery = (value: string) => {
    setQueryState(value);
    if (value.length < 2) {
      setResults([]);
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setQueryState("");
    setResults([]);
    setIsSearching(false);
  };

  return { query, setQuery, results, isSearching, clearSearch };
};
