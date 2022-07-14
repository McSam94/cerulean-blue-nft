import Head from 'next/head';
import type { AppProps } from 'next/app';
import Layout from '@components/layout';
import Providers from '@contexts/index';

import '../../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Cerulean Blue NFT</title>
      </Head>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  );
}

export default MyApp;
