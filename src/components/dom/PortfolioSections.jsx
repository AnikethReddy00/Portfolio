'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Eye,
  Box,
  Binary,
  Compass,
  Laptop,
  GraduationCap,
  Activity,
  ShieldAlert,
  Dumbbell,
  Pill
} from 'lucide-react';
import { smoothDamp, shapeCursorInput } from '@/utils/math';

export default function PortfolioSections({ pointerRef }) {
  const leftSectionRef = useRef();
  const rightSectionRef = useRef();

  // Track Selector: 'web' (Blue Pill) vs 'cv' (Red Pill)
  const [activeTrack, setActiveTrack] = useState('web');

  // Smooth mutable values for RAF loop (zero React re-renders)
  const leftAnim = useRef({ opacity: 0, x: -60 });
  const rightAnim = useRef({ opacity: 0, x: 60 });

  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (time) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (pointerRef.current && leftSectionRef.current && rightSectionRef.current) {
        const pointer = pointerRef.current;
        const rawX = pointer.isOutside ? 0 : shapeCursorInput(pointer.x, 1.25);

        // When cursor is on left (rawX < -0.12): reveal left section
        const targetLeftOpacity = rawX < -0.12 ? Math.min(1.0, (Math.abs(rawX) - 0.12) / 0.45) : 0;
        const targetLeftX = rawX < -0.12 ? (1.0 - targetLeftOpacity) * -60 : -60;

        // When cursor is on right (rawX > +0.12): reveal right section
        const targetRightOpacity = rawX > 0.12 ? Math.min(1.0, (rawX - 0.12) / 0.45) : 0;
        const targetRightX = rawX > 0.12 ? (1.0 - targetRightOpacity) * 60 : 60;

        // Frame-rate-independent smoothing
        leftAnim.current.opacity = smoothDamp(leftAnim.current.opacity, targetLeftOpacity, 8.5, delta);
        leftAnim.current.x = smoothDamp(leftAnim.current.x, targetLeftX, 8.5, delta);

        rightAnim.current.opacity = smoothDamp(rightAnim.current.opacity, targetRightOpacity, 8.5, delta);
        rightAnim.current.x = smoothDamp(rightAnim.current.x, targetRightX, 8.5, delta);

        // Direct style updates (120 FPS performance)
        leftSectionRef.current.style.opacity = leftAnim.current.opacity.toFixed(4);
        leftSectionRef.current.style.transform = `translateX(${leftAnim.current.x.toFixed(2)}px)`;
        leftSectionRef.current.style.pointerEvents = leftAnim.current.opacity > 0.35 ? 'auto' : 'none';

        rightSectionRef.current.style.opacity = rightAnim.current.opacity.toFixed(4);
        rightSectionRef.current.style.transform = `translateX(${rightAnim.current.x.toFixed(2)}px)`;
        rightSectionRef.current.style.pointerEvents = rightAnim.current.opacity > 0.35 ? 'auto' : 'none';
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [pointerRef]);

  // Refined Projects & Research Publications
  const tracks = {
    web: [
      {
        title: 'SplitWMe',
        category: 'Collaborative Financial Systems',
        desc: 'Algorithmic expense allocation engine and shared settlement platform designed for seamless group accounting.',
        link: 'https://github.com/AnikethReddy00/splitwme',
        tags: ['Next.js', 'Tailwind CSS', 'Vercel'],
        icon: Layers,
      },
      {
        title: 'CareerFlow',
        category: 'Workflow Intelligence',
        desc: 'Pipeline architecture and opportunity management ecosystem engineered for career progression workflows.',
        link: 'https://github.com/AnikethReddy00/careerflow',
        tags: ['Next.js', 'MongoDB', 'Zustand'],
        icon: Box,
      },
      {
        title: 'Clipboard4Mac',
        category: 'Native Systems Software',
        desc: 'Low-latency native macOS utility providing seamless system-level memory buffer capture and snippet orchestration.',
        link: 'https://github.com/AnikethReddy00/clipboard4mac',
        tags: ['Swift', 'AppKit', 'macOS Native'],
        icon: Laptop,
      }
    ],
    cv: [
      {
        title: 'Accident Anticipation',
        category: 'Spatial Perception & Temporal Vision',
        desc: 'Deep learning temporal framework predicting imminent traffic collision risks and hazardous patterns prior to impact.',
        link: 'https://github.com/AnikethReddy00',
        tags: ['Computer Vision', 'Temporal Modeling', 'Deep Learning'],
        icon: ShieldAlert,
      },
      {
        title: 'Pushup Evaluation on Custom Dataset',
        category: 'Human Pose & Biomechanical AI',
        desc: 'Computer vision pose estimation and kinematic repetition analysis evaluated on an engineered custom dataset.',
        link: 'https://github.com/AnikethReddy00',
        tags: ['Pose Estimation', 'Custom Dataset', 'Computer Vision'],
        icon: Dumbbell,
      },
      {
        title: 'Physics-Informed Neural Networks',
        category: 'Scientific Machine Learning',
        desc: 'Comparative study modeling viral mutation and T-cell dynamics utilizing PINNs and high-order finite difference methods.',
        link: 'https://scholar.google.com/citations?view_op=view_citation&user=6-QO-fkAAAAJ&citation_for_view=6-QO-fkAAAAJ:u5HHmVD_uO8C',
        tags: ['Published Paper', 'PINNs', 'Neural Dynamics'],
        icon: Activity,
      }
    ]
  };

  return (
    <>
      {/* Mobile Top Fast Nav Pills */}
      <div className="sm:hidden pointer-events-auto absolute top-4 left-0 right-0 z-30 flex items-center justify-center gap-2 px-4">
        <button
          onClick={() => {
            if (pointerRef.current) {
              pointerRef.current.x = pointerRef.current.x < -0.3 ? 0 : -0.85;
              pointerRef.current.isOutside = false;
            }
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-neutral-900/[0.1] text-xs font-semibold text-neutral-800 shadow-sm active:scale-95 transition-all"
        >
          <Compass className="w-3.5 h-3.5 text-neutral-600" />
          <span>Works</span>
        </button>

        <button
          onClick={() => {
            if (pointerRef.current) {
              pointerRef.current.x = pointerRef.current.x > 0.3 ? 0 : 0.85;
              pointerRef.current.isOutside = false;
            }
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-neutral-900/[0.1] text-xs font-semibold text-neutral-800 shadow-sm active:scale-95 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-neutral-600" />
          <span>About</span>
        </button>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between p-3 sm:p-10 lg:p-14 select-none">
        {/* ============================================================ */}
        {/* LEFT SECTION: Blue Pill vs Red Pill Track Selector & Works   */}
        {/* ============================================================ */}
        <div
          ref={leftSectionRef}
          style={{ opacity: 0, transform: 'translateX(-60px)' }}
          className="w-[calc(100vw-1.5rem)] max-w-[340px] sm:w-[420px] lg:w-[460px] max-h-[75vh] sm:max-h-[82vh] rounded-3xl bg-white/90 backdrop-blur-2xl border border-neutral-900/[0.08] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] p-4 sm:p-7 flex flex-col justify-between overflow-y-auto"
        >
          <div>
            {/* Header & Section Tag */}
            <div className="flex items-center justify-between border-b border-neutral-900/[0.06] pb-3 mb-3 sm:pb-3.5 sm:mb-4">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-neutral-700" />
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-neutral-500 uppercase font-sans">
                  Engineering Tracks
                </span>
              </div>
              <button
                onClick={() => {
                  if (pointerRef.current) pointerRef.current.x = 0;
                }}
                className="sm:hidden text-xs font-bold text-neutral-400 hover:text-neutral-900 p-1"
                title="Close"
              >
                ✕
              </button>
              <span className="hidden sm:inline text-[11px] font-medium text-neutral-400 font-sans">
                Select Focus
              </span>
            </div>

            <h2 className="font-display font-bold text-xl sm:text-3xl text-neutral-900 tracking-tight">
              Recent works
            </h2>
            <p className="mt-1 text-[11px] sm:text-xs text-neutral-500 font-sans leading-relaxed">
              Switch disciplines to explore software architectures or computer vision & AI systems.
            </p>

            {/* Track Selector */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-3 sm:mt-4 p-1 rounded-2xl bg-neutral-100/80 border border-neutral-900/[0.05]">
              {/* Software Track */}
              <button
                onClick={() => setActiveTrack('web')}
                className={`flex items-center justify-center gap-2 py-1.5 sm:py-2 px-3 rounded-xl font-sans text-xs font-semibold transition-all duration-200 ${
                  activeTrack === 'web'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-500/20'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/70'
                }`}
              >
                <Pill className={`w-3.5 h-3.5 rotate-45 ${activeTrack === 'web' ? 'text-white' : 'text-blue-500'}`} />
                <span>Software</span>
              </button>

              {/* Vision / AI Track */}
              <button
                onClick={() => setActiveTrack('cv')}
                className={`flex items-center justify-center gap-2 py-1.5 sm:py-2 px-3 rounded-xl font-sans text-xs font-semibold transition-all duration-200 ${
                  activeTrack === 'cv'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-500/30 ring-2 ring-rose-500/20'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/70'
                }`}
              >
                <Pill className={`w-3.5 h-3.5 rotate-45 ${activeTrack === 'cv' ? 'text-white' : 'text-rose-500'}`} />
                <span>Vision / AI</span>
              </button>
            </div>

            {/* Project / Publication Cards for Active Track */}
            <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-2.5">
              {tracks[activeTrack].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group block p-3 sm:p-3.5 rounded-2xl bg-white/70 hover:bg-white/95 border border-neutral-900/[0.06] hover:border-neutral-900/[0.12] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <div className={`p-1.5 sm:p-2 rounded-xl ${activeTrack === 'web' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'}`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-xs sm:text-sm text-neutral-900 group-hover:text-neutral-950 transition-colors">
                            {item.title}
                          </h3>
                          <span className="text-[9px] sm:text-[10px] font-medium text-neutral-400 uppercase tracking-wider font-sans">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0" />
                    </div>

                    <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-neutral-600 font-sans leading-relaxed">
                      {item.desc}
                    </p>

                    {/* High-level tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((t, i) => (
                        <span
                          key={i}
                          className={`px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-medium font-sans rounded-md border ${
                            t === 'Published Paper'
                              ? 'bg-rose-50 text-rose-700 border-rose-200/60'
                              : 'bg-neutral-100 text-neutral-600 border-neutral-900/[0.04]'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Micro Footer Note */}
          <div className="mt-3 pt-2 sm:pt-2.5 border-t border-neutral-900/[0.06] flex items-center justify-between text-[9px] sm:text-[10px] text-neutral-400 font-sans">
            <span>{activeTrack === 'web' ? 'Software & Systems' : 'Computer Vision & AI'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT SECTION: About Aniketh, Vision/AI & Social Connect     */}
        {/* ============================================================ */}
        <div
          ref={rightSectionRef}
          style={{ opacity: 0, transform: 'translateX(60px)' }}
          className="w-[calc(100vw-1.5rem)] max-w-[340px] sm:w-[420px] lg:w-[460px] max-h-[75vh] sm:max-h-[82vh] rounded-3xl bg-white/90 backdrop-blur-2xl border border-neutral-900/[0.08] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] p-4 sm:p-7 flex flex-col justify-between overflow-y-auto"
        >
          <div>
            {/* Header & Section Tag */}
            <div className="flex items-center justify-between border-b border-neutral-900/[0.06] pb-3 mb-3 sm:pb-3.5 sm:mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neutral-700" />
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-neutral-500 uppercase font-sans">
                  Profile Overview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-700 font-sans">Open for Roles</span>
                </div>
                <button
                  onClick={() => {
                    if (pointerRef.current) pointerRef.current.x = 0;
                  }}
                  className="sm:hidden text-xs font-bold text-neutral-400 hover:text-neutral-900 p-1"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <h2 className="font-display font-bold text-xl sm:text-3xl text-neutral-900 tracking-tight">
              About me
            </h2>
            <p className="mt-1 text-[11px] sm:text-sm text-neutral-600 font-sans leading-relaxed">
              Researcher & software engineer specializing in <strong className="text-neutral-900 font-medium">Computer Vision & AI</strong> alongside <strong className="text-neutral-900 font-medium">Interactive Web & Systems Engineering</strong>.
            </p>

            {/* Academic & Engineering Pillars */}
            <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
              <div className="p-2.5 sm:p-3 rounded-xl bg-neutral-50 border border-neutral-900/[0.04] flex items-center gap-2.5 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-rose-100/60 text-rose-700">
                  <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-neutral-900 font-sans">Computer Vision & AI</h4>
                  <p className="text-[9px] sm:text-[10px] text-neutral-500 font-sans">Physics-informed neural networks (PINNs) and temporal risk models.</p>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-neutral-50 border border-neutral-900/[0.04] flex items-center gap-2.5 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-blue-100/60 text-blue-700">
                  <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-neutral-900 font-sans">Full-Stack & Native Systems</h4>
                  <p className="text-[9px] sm:text-[10px] text-neutral-500 font-sans">Cloud architectures, native macOS tooling, and 3D spatial web apps.</p>
                </div>
              </div>
            </div>

            {/* Direct Research & Code Links Strip */}
            <div className="mt-4 pt-3 sm:mt-5 sm:pt-4 border-t border-neutral-900/[0.06]">
              <span className="text-[9px] sm:text-[10px] font-semibold text-neutral-400 uppercase tracking-wider font-sans block mb-2">
                Verified Profiles & Connect
              </span>
              <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
                <a
                  href="https://scholar.google.com/citations?hl=en&user=6-QO-fkAAAAJ"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-xl bg-neutral-100/80 hover:bg-rose-600 hover:text-white text-neutral-700 font-sans text-[10px] sm:text-[11px] font-medium transition-all duration-200 text-center gap-0.5 sm:gap-1"
                >
                  <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Scholar</span>
                </a>

                <a
                  href="https://github.com/AnikethReddy00"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-xl bg-neutral-100/80 hover:bg-neutral-900 hover:text-white text-neutral-700 font-sans text-[10px] sm:text-[11px] font-medium transition-all duration-200 text-center gap-0.5 sm:gap-1"
                >
                  <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com/in/aniketh-reddy"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-xl bg-neutral-100/80 hover:bg-blue-600 hover:text-white text-neutral-700 font-sans text-[10px] sm:text-[11px] font-medium transition-all duration-200 text-center gap-0.5 sm:gap-1"
                >
                  <Linkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="mailto:anikethreddy00@gmail.com"
                  className="flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-xl bg-neutral-100/80 hover:bg-neutral-900 hover:text-white text-neutral-700 font-sans text-[10px] sm:text-[11px] font-medium transition-all duration-200 text-center gap-0.5 sm:gap-1"
                >
                  <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Email</span>
                </a>

                <a
                  href="https://drive.google.com/file/d/1c35Yhdu0JDuLN8EdVoeIOROhlLg1uLpK/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-xl bg-neutral-100/80 hover:bg-emerald-600 hover:text-white text-neutral-700 font-sans text-[10px] sm:text-[11px] font-medium transition-all duration-200 text-center gap-0.5 sm:gap-1"
                >
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </div>

          {/* Micro note for bottom section */}
          <div className="mt-3 pt-2 border-t border-neutral-900/[0.06] flex items-center justify-between text-[9px] sm:text-[10px] text-neutral-400 font-sans">
            <span>Scroll down for timeline</span>
            <ArrowUpRight className="w-3 h-3 text-neutral-400 rotate-90" />
          </div>
        </div>
      </div>
    </>
  );
}
