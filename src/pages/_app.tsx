import 'normalize.css';

import '@assets/main.css';
import '@assets/chrome-bug.css';

import React from 'react';
import type { AppProps } from 'next/app';

import { Head } from '@components/common';
import { ManagedUIContext } from '@components/ui/context';

const Noop: React.FC = ({ children }) => <>{children}</>;

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  React.useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  );
}
