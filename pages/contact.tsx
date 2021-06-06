import { NextPage } from 'next';
import { useQuerySubscription, StructuredText } from 'react-datocms';

import { request } from '../lib/datocms';

interface Props {}

const BeautyBox = () => (
  <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
    <div
      className="relative h-full mx-auto text-lg max-w-prose"
      aria-hidden="true"
    >
      <svg
        className="absolute transform translate-x-32 top-12 left-full"
        width="404"
        height="384"
        fill="none"
        viewBox="0 0 404 384"
      >
        <defs>
          <pattern
            id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              className="text-gray-300"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="384"
          fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
        />
      </svg>
      <svg
        className="absolute transform -translate-x-32 -translate-y-1/2 top-1/2 right-full"
        width="404"
        height="384"
        fill="none"
        viewBox="0 0 404 384"
      >
        <defs>
          <pattern
            id="f210dbf6-a58d-4871-961e-36d5016a0f49"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              className="text-gray-300"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="384"
          fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
        />
      </svg>
      <svg
        className="absolute transform translate-x-32 bottom-12 left-full"
        width="404"
        height="384"
        fill="none"
        viewBox="0 0 404 384"
      >
        <defs>
          <pattern
            id="d3eb07ae-5182-43e6-857d-35c643af9034"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              className="text-gray-300"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="384"
          fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
        />
      </svg>
    </div>
  </div>
);

// @ts-ignore
// eslint-disable-next-line react/prop-types
const IndexPage: NextPage<Props> = ({ subscription }) => {
  const {
    data: { rule },
  } = useQuerySubscription(subscription);

  return (
    <div className="relative py-16 overflow-hidden bg-whisper dark:bg-woodsmoke">
      <BeautyBox></BeautyBox>

      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-lg max-w-prose">
          <h1>
            <span className="block text-base font-semibold tracking-wide text-center text-indigo-600 uppercase">
              {rule.subtitle}
            </span>
            <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
              {rule.title}
            </span>
          </h1>
        </div>
        <div className="mx-auto mt-6 prose prose-lg text-gray-500 prose-indigo">
          <StructuredText data={rule.content} />
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
  };
}

export default IndexPage;
