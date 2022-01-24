import { NextPage } from 'next';
import { useQuerySubscription, StructuredText } from 'react-datocms';

import BeautyBox from '@components/BeautyBox';
import NavBar from '@components/NavBar';

import { request } from '../lib/datocms';

interface Props {}

// @ts-ignore
const IndexPage: NextPage<Props> = ({ subscription }) => {
  const {
    data: { rule },
  } = useQuerySubscription(subscription);

  return (
    <div className="relative py-16 overflow-hidden bg-whisper dark:bg-woodsmoke">
      <BeautyBox />
      <NavBar />
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-lg max-w-prose">
          <h1>
            <span className="block text-base font-semibold tracking-wide text-center text-indigo-600 uppercase">
              {rule.subtitle}
            </span>
            <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 dark:text-gray-400 sm:text-4xl">
              {rule.title}
            </span>
          </h1>
        </div>
        <div className="mx-auto mt-6 prose prose-lg text-gray-500 prose-indigo dark:prose-green dark:text-gray-400">
          <StructuredText
            data={rule.content}
            metaTransformer={({ meta }) =>
              meta.reduce((o, key) => ({ ...o, [key.id]: key.value }), {})
            }
          />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
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

  return {
    props: {
      subscription: {
        enabled: false,
        // @ts-ignore
        initialData: await request(graphqlRequest),
      },
    },
    revalidate: 10,
  };
}

export default IndexPage;
