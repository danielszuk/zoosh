import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';

// Global styles
import '../styles/base.scss';
import '../styles/components.scss';
import '../styles/utilities.scss';

export default function Container({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Movie Hunter" />
        <meta name="keywords" content="movie, hunt, hunter, find, finder" />
        <title>Movie Hunter</title>

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffc107" />
      </Head>

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </>
  );
}
