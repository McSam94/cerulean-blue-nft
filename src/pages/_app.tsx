import type { AppProps } from 'next/app';
import Layout from '@components/layout';
import Providers from '@contexts/index';

import '../../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}

export default MyApp;
