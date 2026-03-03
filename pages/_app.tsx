import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [shouldLoadTracker, setShouldLoadTracker] = useState(false);
  const trackerDomainId = process.env.NEXT_PUBLIC_TRACKER_DOMAIN_ID || '15235628';
  const trackerSrc = process.env.NEXT_PUBLIC_TRACKER_URL || 'https://api.auray.net/crm247.js';

  useEffect(() => {
    const hostname = window.location.hostname.toLowerCase();
    const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
    setShouldLoadTracker(!isLocalHost);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {shouldLoadTracker && <script src={trackerSrc} data-crm247-id={trackerDomainId} defer />}
      </Head>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0f172a',
            color: '#fff',
          },
        }}
      />
    </>
  );
}
