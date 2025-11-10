"use client"

import dynamic from 'next/dynamic';

const Lab4 = dynamic(() => import('./index'), {
  ssr: false
});

export default function Page() {
  return <Lab4 />;
}