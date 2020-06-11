import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core/';
import theme from '../styles/theme';

const muiTheme = createMuiTheme(theme);

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

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>

      <CssBaseline />

      <ThemeProvider theme={muiTheme}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
