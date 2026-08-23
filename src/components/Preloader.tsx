import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CHURCH_IMAGES, CHURCH_DETAILS } from '../data/churchData';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const verseRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress counter simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Entrance animation
      tl.fromTo(
        logoRef.current,
        { scale: 0.7, opacity: 0, rotation: -10 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.1, ease: 'back.out(1.4)' }
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        verseRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // When progress reaches 100, trigger smooth fade out
  useEffect(() => {
    if (progress === 100 && containerRef.current) {
      const exitTimer = setTimeout(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.03,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: onComplete
        });
      }, 400);

      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      id="cpc-preloader"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-[#0c1524] to-slate-950 text-amber-50 px-6 select-none"
    >
      {/* Background Sacred Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-300/15 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg text-center">
        {/* Emblem Logo */}
        <div ref={logoRef} className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl animate-ping opacity-30" />
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-600 shadow-2xl gold-glow flex items-center justify-center overflow-hidden">
            <img
              src={CHURCH_IMAGES.logo}
              alt="Christha Prabhalaya Church Youths Emblem"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Title */}
        <div ref={textRef} className="space-y-1.5 mb-5">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-400/90 font-sans">
            Welcome to the Sanctuary of Grace
          </span>
          <h1 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-amber-100 uppercase">
            {CHURCH_DETAILS.name}
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs text-amber-300/80 font-medium tracking-widest uppercase">
            <span>Faith</span>
            <span className="text-amber-500">•</span>
            <span>Fellowship</span>
            <span className="text-amber-500">•</span>
            <span>Purpose</span>
          </div>
        </div>

        {/* Theme Verse */}
        <div
          ref={verseRef}
          className="bg-slate-900/60 border border-amber-500/20 rounded-2xl p-4 mb-8 max-w-md backdrop-blur-md shadow-inner"
        >
          <p className="font-playfair text-sm italic text-amber-200/90 leading-relaxed">
            "{CHURCH_DETAILS.themeVerse.text}"
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            — {CHURCH_DETAILS.themeVerse.reference}
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-64 space-y-2">
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-amber-500/20">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 transition-all duration-150 ease-out rounded-full shadow-[0_0_12px_rgba(245,158,11,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-amber-300/70 font-mono">
            <span>Entering fellowship...</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
