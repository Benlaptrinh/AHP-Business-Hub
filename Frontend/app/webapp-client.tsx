'use client';

import dynamic from 'next/dynamic';

const LegacyBrowserApp = dynamic(() => import('./legacy-browser-app'), {
  ssr: false,
  loading: () => null,
});

export default function WebAppClient() {
  return <LegacyBrowserApp />;
}
