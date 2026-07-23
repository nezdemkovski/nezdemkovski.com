export const getSafeRedirectPath = (
  value: string | null | undefined,
  origin: string,
  fallback = '/',
) => {
  if (!value) return fallback;

  try {
    const url = new URL(value, origin);

    if (url.origin !== origin) return fallback;

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
};
