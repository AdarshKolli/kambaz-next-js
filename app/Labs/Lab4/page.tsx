"use client"

import dynamic from 'next/dynamic';

const Lab4 = dynamic(() => import('./index'), {
  ssr: false,
  loading: () => <div>Loading Lab 4...</div>
});

export default function Page() {
  return <Lab4 />;
}