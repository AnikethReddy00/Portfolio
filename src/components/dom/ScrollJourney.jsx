'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  ShieldAlert,
  Layers,
  Activity,
  Dumbbell,
  Laptop,
  Box,
  GraduationCap,
  ChevronDown,
  Briefcase,
  Heart,
  Lock,
  Copy,
  Check,
  Send
} from 'lucide-react';
import { smoothDamp, clamp } from '@/utils/math';

export default function ScrollJourney() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const bgPathRef = useRef(null);
  const headRef = useRef(null);
  const cardRefs = useRef([]);

  // Smooth scroll state
  const scrollState = useRef({
    targetProgress: 0,
    currentProgress: 0,
    smoothedAngle: 0,
    headX: 500,
    headY: 0,
  });

  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  const [totalPathLength, setTotalPathLength] = useState(4000);

  // Contact form & email state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (email) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  // Organic S-curved path coordinate string (SVG 1000 x 4800 coordinate space)
  const pathD = useMemo(() => {
    return [
      'M 500 0',
      'C 500 180, 518 340, 515 580',
      'C 512 820, 482 980, 485 1220',
      'C 488 1460, 518 1620, 515 1860',
      'C 512 2100, 482 2260, 485 2500',
      'C 488 2740, 518 2900, 515 3140',
      'C 512 3380, 482 3540, 485 3780',
      'C 488 4000, 482 4140, 485 4320',
      'C 490 4400, 500 4480, 500 4520'
    ].join(' ');
  }, []);

  // Cards dataset with asymmetric layout and journey positions
  const journeyCards = useMemo(() => [
    {
      id: 'bny-mellon-internship',
      title: 'BNY Mellon',
      subtitle: 'Software Development Engineer Intern',
      category: 'Work Experience • May 2026 – Jul 2026',
      desc: 'Built and deployed a record-and-replay automation tool for QE’s, reducing UI test authoring from 20 minutes to 3 minutes per testcase. Created an MCP server for auto-generating API test suites across multiple testing dimensions.',
      tags: ['React + TypeScript', 'FastAPI', 'WebSockets', 'OracleDB', 'Automation'],
      links: [
        { label: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin }
      ],
      icon: Briefcase,
      side: 'right',
      yPercent: 7.0,
      horizontalOffset: '-right-3 sm:-right-6 lg:right-10',
      accentColor: 'from-sky-500/15 to-blue-600/10',
      iconColor: 'text-sky-700 bg-sky-50 border-sky-200/60'
    },
    {
      id: 'accident-anticipation',
      title: 'Accident Anticipation',
      subtitle: 'Spatial Perception & Temporal Vision',
      category: 'Computer Vision / Deep Learning',
      desc: 'Deep learning temporal framework predicting imminent traffic collision risks and hazardous patterns prior to impact with spatial attention.',
      tags: ['Computer Vision', 'Temporal Modeling', 'Deep Learning'],
      links: [
        { label: 'GitHub Repository', url: 'https://github.com/AnikethReddy00', icon: Github }
      ],
      icon: ShieldAlert,
      side: 'left',
      yPercent: 19.0,
      horizontalOffset: '-left-3 sm:-left-6 lg:left-8',
      accentColor: 'from-amber-500/15 to-orange-500/10',
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200/60'
    },
    {
      id: 'splitwme',
      title: 'SplitWMe',
      subtitle: 'Collaborative Financial Systems',
      category: 'Software Architecture & Web Systems',
      desc: 'Algorithmic expense allocation engine and shared settlement platform designed for seamless multi-party group accounting and balances.',
      tags: ['Next.js', 'Tailwind CSS', 'Vercel'],
      iframeUrl: 'https://splitwme.vercel.app/',
      links: [
        { label: 'Live App', url: 'https://splitwme.vercel.app/', icon: ExternalLink },
        { label: 'Explore Code', url: 'https://github.com/AnikethReddy00/splitwme', icon: Github }
      ],
      icon: Layers,
      side: 'right',
      yPercent: 31.0,
      horizontalOffset: '-right-3 sm:-right-6 lg:right-10',
      accentColor: 'from-blue-500/15 to-indigo-500/10',
      iconColor: 'text-blue-600 bg-blue-50 border-blue-200/60'
    },
    {
      id: 'pinns-research',
      title: 'Physics-Informed Neural Networks',
      subtitle: 'Scientific Machine Learning Publication',
      category: 'Research Publication',
      desc: 'Comparative study modeling viral mutation and T-cell dynamics utilizing PINNs and high-order finite difference methods.',
      tags: ['Published Paper', 'PINNs', 'Neural Dynamics'],
      links: [
        { label: 'Google Scholar Publication', url: 'https://scholar.google.com/citations?view_op=view_citation&user=6-QO-fkAAAAJ&citation_for_view=6-QO-fkAAAAJ:u5HHmVD_uO8C', icon: GraduationCap }
      ],
      icon: Activity,
      side: 'left',
      yPercent: 43.0,
      horizontalOffset: '-left-2 sm:-left-4 lg:left-6',
      accentColor: 'from-violet-500/15 to-purple-500/10',
      iconColor: 'text-violet-600 bg-violet-50 border-violet-200/60'
    },
    {
      id: 'pushup-evaluation',
      title: 'Pushup Kinematic Evaluation',
      subtitle: 'Human Pose & Biomechanical AI',
      category: 'Pose Estimation & Kinetic Metrics',
      desc: 'Computer vision pose estimation and real-time kinematic repetition analysis evaluated on an engineered custom biomechanical dataset.',
      tags: ['Pose Estimation', 'Custom Dataset', 'Computer Vision'],
      links: [
        { label: 'GitHub Project', url: 'https://github.com/AnikethReddy00', icon: Github }
      ],
      icon: Dumbbell,
      side: 'right',
      yPercent: 55.0,
      horizontalOffset: '-right-2 sm:-right-4 lg:right-12',
      accentColor: 'from-emerald-500/15 to-teal-500/10',
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200/60'
    },
    {
      id: 'careerflow-clipboard',
      title: 'CareerFlow & Clipboard4Mac',
      subtitle: 'Workflow Intelligence & Native macOS Utility',
      category: 'Systems Software & Productivity',
      desc: 'Engineered opportunity management ecosystem alongside low-latency native macOS memory buffer capture and snippet orchestration.',
      tags: ['Next.js', 'Swift', 'AppKit', 'Zustand'],
      links: [
        { label: 'CareerFlow', url: 'https://github.com/AnikethReddy00/careerflow', icon: Github },
        { label: 'Clipboard4Mac', url: 'https://github.com/AnikethReddy00/clipboard4mac', icon: Laptop }
      ],
      icon: Box,
      side: 'left',
      yPercent: 66.0,
      horizontalOffset: '-left-3 sm:-left-5 lg:left-10',
      accentColor: 'from-cyan-500/15 to-blue-500/10',
      iconColor: 'text-cyan-600 bg-cyan-50 border-cyan-200/60'
    },
    {
      id: 'liveinlabs-outreach',
      title: 'Live-in-Labs • Assam',
      subtitle: 'Rural Immersion & Community Research',
      category: 'Giving Back',
      desc: 'Participated in Amrita\'s Live-in-Labs program in rural Assam, surveying a village community and conducting in-depth research to identify key challenges and co-design sustainable, actionable solutions.',
      tags: ['Rural Research', 'Community Impact', 'Amrita University'],
      links: [
        { label: 'Research Paper', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5659450', icon: GraduationCap }
      ],
      icon: Heart,
      side: 'right',
      yPercent: 77.0,
      horizontalOffset: '-right-2 sm:-right-5 lg:right-8',
      accentColor: 'from-rose-500/15 to-pink-500/10',
      iconColor: 'text-rose-600 bg-rose-50 border-rose-200/60'
    },
    {
      id: 'collaboration-milestone',
      title: "Let's Build Something Exceptional",
      subtitle: 'Research, Systems & Product Collaborations',
      category: 'Milestone & Connect',
      desc: 'Open for Computer Vision / Deep Learning research initiatives, high-performance software engineering, and innovative product builds.',
      tags: ['Open for Roles', 'AI Research', 'Engineering'],
      emailId: 'anikethreddy7890@gmail.com',
      showContactForm: true,
      links: [
        { label: 'Resume', url: 'https://drive.google.com/file/d/1c35Yhdu0JDuLN8EdVoeIOROhlLg1uLpK/view?usp=sharing', icon: ExternalLink },
        { label: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
        { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=6-QO-fkAAAAJ', icon: GraduationCap }
      ],
      icon: Sparkles,
      side: 'left',
      yPercent: 87.0,
      horizontalOffset: '-left-3 sm:-left-5 lg:left-10',
      accentColor: 'from-neutral-900/10 to-neutral-800/5',
      iconColor: 'text-neutral-800 bg-neutral-100 border-neutral-300'
    }
  ], []);

  const [nodePositions, setNodePositions] = useState([]);

  // Initialize total SVG path length & exact milestone node coordinates on organic path
  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) {
          setTotalPathLength(len);

          // Calculate exact X and Y coordinates on the SVG path for each milestone dot
          const positions = journeyCards.map((card) => {
            const targetY = (card.yPercent / 100) * 4800;
            let low = 0;
            let high = len;
            let bestPt = pathRef.current.getPointAtLength(0);

            for (let i = 0; i < 25; i++) {
              const mid = (low + high) / 2;
              const pt = pathRef.current.getPointAtLength(mid);
              bestPt = pt;
              if (pt.y < targetY) {
                low = mid;
              } else {
                high = mid;
              }
            }
            return { x: bestPt.x, y: targetY };
          });

          setNodePositions(positions);
        }
      } catch (e) {
        // Fallback
      }
    }
  }, [pathD, journeyCards]);

  // Main high-performance Animation Frame loop tracking scroll & path tangents
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const updateScrollAndHead = (time) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (containerRef.current && pathRef.current && headRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate progress from 0 (when top of section enters viewport) to 1 (when bottom reaches bottom)
        const totalScrollableDistance = rect.height - windowHeight;
        const currentScrolled = -rect.top;
        const rawProgress = clamp(
          totalScrollableDistance > 0 ? currentScrolled / totalScrollableDistance : 0,
          0,
          1
        );

        scrollState.current.targetProgress = rawProgress;

        // Spring-like critically damped easing for ultra-smooth head travel
        scrollState.current.currentProgress = smoothDamp(
          scrollState.current.currentProgress,
          scrollState.current.targetProgress,
          7.5,
          delta
        );

        const currentProg = scrollState.current.currentProgress;
        const pathLength = pathRef.current.getTotalLength() || totalPathLength;
        const currentDistance = currentProg * pathLength;

        // Position on SVG Path (0 to 1000 x, 0 to 4800 y)
        const pt = pathRef.current.getPointAtLength(clamp(currentDistance, 0, pathLength));
        
        // Sample slight tangent points to get smooth natural rotation
        const deltaSample = 8;
        const ptAhead = pathRef.current.getPointAtLength(clamp(currentDistance + deltaSample, 0, pathLength));
        const ptBehind = pathRef.current.getPointAtLength(clamp(currentDistance - deltaSample, 0, pathLength));

        const targetAngle = (Math.atan2(ptAhead.y - ptBehind.y, ptAhead.x - ptBehind.x) * 180) / Math.PI - 90;
        
        // Damp angle to prevent jitter
        scrollState.current.smoothedAngle = smoothDamp(
          scrollState.current.smoothedAngle,
          targetAngle,
          6.5,
          delta
        );

        // Update active SVG stroke dash offset (extends tail with head)
        const activeDashOffset = pathLength * (1 - currentProg);
        pathRef.current.style.strokeDashoffset = activeDashOffset.toFixed(2);

        // Map SVG coordinate space (0-1000 x, 0-4800 y) to Container % position
        const posXPercent = (pt.x / 1000) * 100;
        const posYPercent = (pt.y / 4800) * 100;

        // Apply smooth transform to Traveling Character Head
        headRef.current.style.left = `${posXPercent.toFixed(3)}%`;
        headRef.current.style.top = `${posYPercent.toFixed(3)}%`;
        headRef.current.style.transform = `translate(-50%, -50%) rotate(${scrollState.current.smoothedAngle.toFixed(2)}deg)`;

        // Check proximity for cards reveal and highlight
        const headProgPercent = currentProg * 100;
        let closestIndex = -1;
        let minDiff = 999;

        journeyCards.forEach((card, idx) => {
          const cardEl = cardRefs.current[idx];
          if (cardEl) {
            const diff = Math.abs(headProgPercent - card.yPercent);
            
            // Progressive Scroll Reveal: Trigger reveal as head gets within 14% of the card
            const isRevealed = headProgPercent >= card.yPercent - 12;
            const isDirectlyAdjacent = diff < 6.0;

            if (isRevealed) {
              cardEl.style.opacity = '1';
              cardEl.style.transform = 'translateY(0) scale(1)';
            } else {
              const distanceAhead = (card.yPercent - 12) - headProgPercent;
              const fadeOutProg = clamp(1 - distanceAhead / 10, 0, 1);
              cardEl.style.opacity = (fadeOutProg * 0.3).toFixed(3);
              cardEl.style.transform = `translateY(${((1 - fadeOutProg) * 35).toFixed(1)}px) scale(0.96)`;
            }

            if (isDirectlyAdjacent && diff < minDiff) {
              minDiff = diff;
              closestIndex = idx;
            }
          }
        });

        if (closestIndex !== activeCardIndex) {
          setActiveCardIndex(closestIndex);
        }
      }

      animId = requestAnimationFrame(updateScrollAndHead);
    };

    animId = requestAnimationFrame(updateScrollAndHead);
    return () => cancelAnimationFrame(animId);
  }, [journeyCards, totalPathLength, activeCardIndex]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[4600px] sm:min-h-[4800px] bg-[#fcfcfc] overflow-hidden select-none py-20 px-4 sm:px-8 lg:px-16 pb-32"
    >
      {/* Section Header & Subtitle */}
      <div className="relative max-w-4xl mx-auto text-center mb-16 sm:mb-24 z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/[0.04] border border-neutral-900/[0.08] backdrop-blur-md mb-4">
          <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
          <span className="text-[11px] sm:text-xs font-medium tracking-wider text-neutral-600 uppercase font-sans">
            Interactive Journey
          </span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight">
          Selected Works & Milestones
        </h2>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 font-sans max-w-xl mx-auto">
          An organic timeline tracing computer vision research, algorithmic systems, and engineering ventures.
        </p>
      </div>

      {/* SVG Container holding the organic rat-tail curves */}
      <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
        <svg
          ref={svgRef}
          viewBox="0 0 1000 4800"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Subtle Gradient for the Organic Rat-Tail Path */}
            <linearGradient id="ratTailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#111111" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#262626" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#525252" stopOpacity="0.7" />
            </linearGradient>

            {/* Glowing filter for nodes */}
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Background subtle guide path (faint organic line) */}
          <path
            ref={bgPathRef}
            d={pathD}
            fill="none"
            stroke="rgba(0, 0, 0, 0.06)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 6"
          />

          {/* 2. Active Drawn Rat-Tail Path (Dynamic stroke length tied to scroll progress) */}
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="url(#ratTailGradient)"
            strokeWidth="3.0"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: totalPathLength,
              strokeDashoffset: totalPathLength,
              transition: 'none'
            }}
          />

          {/* 3. Milestone dots perfectly positioned on the organic curve path */}
          {journeyCards.map((card, i) => {
            const ptY = (card.yPercent / 100) * 4800;
            const nodePos = nodePositions[i];
            const nodeX = nodePos ? nodePos.x : (card.side === 'left' ? 440 : card.side === 'right' ? 580 : 500);
            const nodeY = nodePos ? nodePos.y : ptY;
            const isActive = activeCardIndex === i;

            return (
              <g key={card.id}>
                {/* Node Ring */}
                <circle
                  cx={nodeX}
                  cy={nodeY}
                  r={isActive ? 8 : 4.5}
                  fill={isActive ? '#111111' : '#ffffff'}
                  stroke="#111111"
                  strokeWidth={isActive ? '3' : '2'}
                  className="transition-all duration-300"
                />
                {isActive && (
                  <circle
                    cx={nodeX}
                    cy={nodeY}
                    r={16}
                    fill="none"
                    stroke="rgba(17, 17, 17, 0.25)"
                    strokeWidth="1.5"
                    className="animate-ping"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* 4. Traveling Character Head along the rat-tail path */}
        <div
          ref={headRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '0%',
            transform: 'translate(-50%, -50%)',
            willChange: 'transform, left, top',
            pointerEvents: 'none'
          }}
          className="z-30 flex items-center justify-center"
        >
          {/* Pulsing Aura */}
          <div className="absolute -inset-3 rounded-full bg-neutral-900/[0.08] animate-pulse blur-sm" />

          {/* 3D Character Avatar Badge */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-1 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.18)] border border-neutral-900/[0.12] flex items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-110">
            {/* 3D Character Head Image */}
            <img
              src="/character/master_head_4k.png"
              alt="Character Head"
              className="w-full h-full object-contain scale-110 translate-y-0.5"
              loading="eager"
            />
            {/* Small active status dot on head */}
            <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
          </div>
        </div>
      </div>

      {/* Asymmetric Organic Cards Container */}
      <div className="relative w-full max-w-6xl mx-auto h-full min-h-[4400px]">
        {journeyCards.map((card, index) => {
          const IconComponent = card.icon;
          const isActive = activeCardIndex === index;
          const isCenter = card.side === 'center';

          return (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[index] = el)}
              style={{
                top: `${card.yPercent}%`,
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: 0,
                transform: 'translateY(35px) scale(0.96)',
              }}
              className={`absolute z-20 ${
                isCenter
                  ? 'left-1/2 -translate-x-1/2 w-[92%] sm:w-[540px] max-w-xl px-2'
                  : card.side === 'left'
                  ? 'left-3 sm:left-auto sm:right-[58%] w-[calc(100%-1.5rem)] sm:w-[360px] lg:w-[420px]'
                  : 'left-3 sm:left-[58%] w-[calc(100%-1.5rem)] sm:w-[360px] lg:w-[420px]'
              }`}
            >
              <div
                className={`relative rounded-3xl bg-white/85 backdrop-blur-2xl border transition-all duration-500 p-6 sm:p-7 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-1 ${
                  isActive
                    ? 'border-neutral-900/30 ring-2 ring-neutral-900/[0.08] shadow-[0_25px_60px_-10px_rgba(0,0,0,0.12)]'
                    : 'border-neutral-900/[0.08]'
                }`}
              >
                {/* Ambient Card Background Glow */}
                <div
                  className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${card.accentColor} opacity-50 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  {/* Card Header & Icon */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm ${card.iconColor}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 font-sans">
                          {card.category}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold font-display text-neutral-900 leading-tight">
                          {card.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Subtitle / Focus Area */}
                  <div className="text-xs sm:text-sm font-medium text-neutral-700 mb-2.5">
                    {card.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed mb-4 font-sans">
                    {card.desc}
                  </p>

                  {/* Gmail ID Display Badge (Non-Hyperlink) */}
                  {card.emailId && (
                    <div className="flex items-center justify-between p-2.5 px-3 rounded-2xl bg-neutral-900/[0.03] border border-neutral-900/[0.08] mb-3">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-sans">Gmail ID:</span>
                        <span className="text-xs font-mono font-semibold text-neutral-800 truncate select-all">{card.emailId}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyEmail(card.emailId)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white text-[11px] font-medium text-neutral-700 hover:text-neutral-900 border border-neutral-200 shadow-2xs transition-all active:scale-95 shrink-0"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-neutral-500" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Embedded Interactive Contact Form */}
                  {card.showContactForm && (
                    <form onSubmit={handleFormSubmit} className="space-y-2 mb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 font-sans text-neutral-900 placeholder:text-neutral-400 transition-all shadow-2xs"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Your Email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 font-sans text-neutral-900 placeholder:text-neutral-400 transition-all shadow-2xs"
                        />
                      </div>
                      <textarea
                        required
                        rows={3}
                        placeholder="Your Message..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 font-sans text-neutral-900 placeholder:text-neutral-400 transition-all resize-none shadow-2xs"
                      />
                      <button
                        type="submit"
                        disabled={formSubmitted}
                        className="w-full py-2 px-4 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.98] text-xs font-semibold font-sans transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                      >
                        {formSubmitted ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Message Sent! Thank you.</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 text-neutral-300" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  {/* Optional Live Browser Frame iframe Preview */}
                  {card.iframeUrl && (
                    <div className="mb-4 overflow-hidden rounded-2xl border border-neutral-900/10 shadow-sm bg-neutral-900/[0.02]">
                      {/* Browser Mock Header */}
                      <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-100/90 border-b border-neutral-900/10 text-[11px] font-sans text-neutral-500">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-neutral-200 text-[10px] text-neutral-600 font-mono">
                          <Lock className="w-2.5 h-2.5 text-emerald-600" />
                          <span>splitwme.vercel.app</span>
                        </div>
                        <a
                          href={card.iframeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-neutral-900 transition-colors"
                          title="Open live app"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      {/* Live Iframe Viewport */}
                      <div className="relative w-full h-52 sm:h-64 bg-white overflow-hidden">
                        <iframe
                          src={card.iframeUrl}
                          title={`${card.title} Live Web App`}
                          className="w-full h-full border-0"
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin allow-forms"
                        />
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {card.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-full bg-neutral-900/[0.04] border border-neutral-900/[0.06] text-[11px] font-medium text-neutral-600 font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-900/[0.06]">
                    {card.links.map((link, lIdx) => {
                      const LinkIcon = link.icon;
                      return (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 text-xs font-medium font-sans transition-all duration-200 shadow-sm"
                        >
                          <LinkIcon className="w-3.5 h-3.5 text-neutral-300" />
                          <span>{link.label}</span>
                          <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Clean Independent Footer Section */}
      <div className="relative max-w-md mx-auto text-center mt-32 pt-10 border-t border-neutral-900/[0.08] z-20 pb-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 text-xs font-semibold font-sans shadow-md transition-all duration-200"
        >
          <span>Back to Top</span>
          <ArrowUpRight className="w-3.5 h-3.5 -rotate-45 text-neutral-300" />
        </button>
        <p className="mt-4 text-[12px] text-neutral-500 font-sans tracking-wide">
          © {new Date().getFullYear()} Aniketh Reddy • Built with Three.js & Next.js
        </p>
      </div>
    </section>
  );
}
