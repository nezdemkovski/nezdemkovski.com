const DATOCMS_API_TOKEN = process.env.DATOCMS_API_TOKEN ?? '';

const DATOCMS_URL = `https://graphql.datocms.com`;

export const getData = async () => {
  const graphqlRequest = {
    query: `
    {
      rule {
        id
        subtitle
        title
        content {
          value
        }
      }
    }
    `,
  };

  return fetch(DATOCMS_URL, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({
      ...graphqlRequest,
      variables: {},
    }),
    next: { revalidate: 5 },
  });
};
