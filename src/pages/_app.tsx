import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';

// Place this in the pages/_app.js file

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
