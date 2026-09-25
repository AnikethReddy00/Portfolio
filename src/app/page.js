'use client';

import dynamic from 'next/dynamic';
import ScrollJourney from '@/components/dom/ScrollJourney';

const Experience = dynamic(() => import('@/components/canvas/Experience'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative w-full bg-[#fcfcfc] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* 1. Hero 3D Character Interactive Experience */}
      <section className="relative w-full h-screen overflow-hidden">
        <Experience />
      </section>

      {/* 2. Organic Scroll-Driven Visual Journey Section */}
      <ScrollJourney />
    </main>
  );
}

