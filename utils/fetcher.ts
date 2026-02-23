const fetcher = async <JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> => {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  }
  return res.json();
};

export default fetcher;
