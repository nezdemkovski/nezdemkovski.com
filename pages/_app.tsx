import { AppProps } from 'next/app';
import Head from 'next/head';

import '@styles';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>yuri.works</title>
      <meta name="description" content="yuri.works website" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    <Component {...pageProps} />
  </>
);

export default MyApp;
