import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';
import { isDemoAuthenticated } from '@/lib/demoAuth';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [shouldLoadTracker, setShouldLoadTracker] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const trackerDomainId = process.env.NEXT_PUBLIC_TRACKER_DOMAIN_ID || '65281949';

  // const trackerSrc =
  //   process.env.NEXT_PUBLIC_TRACKER_URL ||
  //   `http://localhost:8000/api/v1/crm/tracking/${trackerDomainId}.js`;

  const trackerSrc = process.env.NEXT_PUBLIC_TRACKER_URL || 'https://api.aurray.co.uk/crm247.js';

  const requiresAuth = router.pathname === '/shop/checkout';

  useEffect(() => {
    const hostname = window.location.hostname.toLowerCase();
    const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
    const localTracker =
      trackerSrc.includes('localhost') ||
      trackerSrc.includes('127.0.0.1') ||
      trackerSrc.includes('[::1]');
    setShouldLoadTracker(localTracker || !isLocalHost);
  }, [trackerSrc]);

  useEffect(() => {
    if (!requiresAuth) {
      setAuthChecked(true);
      return;
    }

    if (isDemoAuthenticated()) {
      setAuthChecked(true);
      return;
    }

    setAuthChecked(false);
    const nextPath = encodeURIComponent(router.asPath || '/shop');
    router.replace(`/auth/login?next=${nextPath}`);
  }, [requiresAuth, router]);

  if (requiresAuth && !authChecked) {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {shouldLoadTracker && <script src={trackerSrc} data-crm247-id={trackerDomainId} defer />}
        </Head>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <p className="text-sm font-medium text-slate-600">Checking account session... </p>
        </div>
      </>
    );
  }

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
