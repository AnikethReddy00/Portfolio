'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroText({ pointerRef }) {
  const containerRef = useRef();
  const textRef = useRef();
  const subtextRef = useRef();
  const dotRef = useRef();

  useEffect(() => {
    // Cinematic entrance animation pulling up from the bottom
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        containerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, delay: 0.2 }
      )
      .fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1 },
        '-=1.0'
      )
      .fromTo(
        subtextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.7'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute bottom-12 sm:bottom-16 left-0 right-0 z-10 flex flex-col items-center justify-center text-center px-6 select-none opacity-0"
    >
      {/* Interactive Status Pill */}
      <div
        ref={subtextRef}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/[0.04] border border-neutral-900/[0.08] backdrop-blur-md mb-3"
      >
        <span ref={dotRef} className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[11px] sm:text-xs font-medium tracking-wide text-neutral-600 uppercase font-sans">
          Interactive 3D Experience
        </span>
      </div>

      {/* Main Headline */}
      <h1
        ref={textRef}
        className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight leading-none"
      >
        Hi, this is <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-600 bg-clip-text text-transparent">Aniketh</span>
      </h1>

      <p className="mt-2 text-xs sm:text-sm text-neutral-600 font-sans tracking-normal">
        Move your cursor to look around
      </p>

      {/* Subtle Scroll Indicator */}
      <div className="mt-4 flex flex-col items-center gap-1 opacity-70 animate-bounce">
        <span className="text-[10px] font-medium tracking-widest uppercase text-neutral-500 font-sans">
          Scroll Down
        </span>
        <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
