import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Place this in the pages/_app.js file

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('./api/calendar');
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
