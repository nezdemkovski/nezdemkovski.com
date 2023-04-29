export default async function sitemap() {
  const routes = ['', '/contact', '/countries', '/games'].map((route) => ({
    url: `https://nezdemkovski.com${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes];
}
