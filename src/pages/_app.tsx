import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core/';
import theme from '../styles/theme';
import LanguageContext from '../contexts/language.context.s';
import Languages from '../models/languages.enum';

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
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
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

      <LanguageContext.Provider value={Languages.en}>
        <ThemeProvider theme={muiTheme}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </ThemeProvider>
      </LanguageContext.Provider>
    </>
  );
}
