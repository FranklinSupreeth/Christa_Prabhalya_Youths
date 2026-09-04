import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Calendar,
  Sparkles,
  PhoneCall,
  BookOpen,
  ArrowDown,
  ShieldCheck,
  Users,
  Flame,
  Heart
} from 'lucide-react';
import { CHURCH_IMAGES, CHURCH_DETAILS } from '../data/churchData';

interface HeroSectionProps {
  onExploreVerse: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreVerse }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const verseCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle floating animation for emblem
      gsap.to(emblemRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Entry animation for hero components
      gsap.from(contentRef.current?.children ? Array.from(contentRef.current.children) : [], {
        y: 35,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from(verseCardRef.current, {
        scale: 0.92,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.2)',
        delay: 0.6
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Church Image with Soothing Spiritual Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={CHURCH_IMAGES.hero}
          alt="Christha Prabhalaya Church Sanctuary"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Divine Gradient Overlay Layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/80 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        {/* Subtle Sacred Gold Radiance */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Tagline, Theme Verse & CTAs */}
          <div ref={contentRef} className="lg:col-span-8 flex flex-col items-start text-left space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Youth Ministry Portal</span>
            </div>

            {/* Main Grand Title */}
            <div className="space-y-2">
              <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                CHRISTHA PRABHALAYA
                <span className="block text-amber-400 gold-text-gradient font-black mt-1">
                  CHURCH YOUTHS
                </span>
              </h1>
              
              {/* Tagline */}
              <div className="flex items-center gap-3 pt-2 text-sm sm:text-base md:text-lg font-medium text-amber-200/90 tracking-widest uppercase">
                <span>Faith</span>
                <span className="text-amber-400 font-bold">•</span>
                <span>Fellowship</span>
                <span className="text-amber-400 font-bold">•</span>
                <span>Purpose</span>
              </div>
            </div>

            {/* Theme Verse Feature Card */}
            <div
              ref={verseCardRef}
              className="w-full max-w-2xl relative rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-amber-950/40 p-5 sm:p-6 border border-amber-500/30 shadow-2xl backdrop-blur-md gold-glow"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-1">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                      Theme Scripture
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {CHURCH_DETAILS.themeVerse.translation}
                    </span>
                  </div>
                  <p className="font-playfair text-base sm:text-lg italic text-amber-100/95 leading-relaxed">
                    "{CHURCH_DETAILS.themeVerse.text}"
                  </p>
                  <p className="text-xs font-semibold text-amber-300 tracking-wider">
                    — {CHURCH_DETAILS.themeVerse.reference}
                  </p>
                </div>
              </div>
            </div>

            {/* Welcome message */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {CHURCH_DETAILS.welcomeMessage}
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              {/* Join Us */}
              <a
                href="#join"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-lg gold-glow hover:scale-[1.03] active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Join Us</span>
              </a>

              {/* Events */}
              <a
                href="#events"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wider bg-slate-900/80 hover:bg-slate-800 text-amber-100 border border-amber-500/30 hover:border-amber-400 transition-all backdrop-blur-md shadow-sm"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Upcoming Events</span>
              </a>

              {/* Verse of the Day */}
              <button
                onClick={onExploreVerse}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wider bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-400/30 transition-all backdrop-blur-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Verse of the Day</span>
              </button>

              {/* Contact */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Contact</span>
              </a>
            </div>

          </div>

          {/* Right Column: Church Photo Showcase & Highlights */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            {/* Church Photo Bento Showcase */}
            <div
              ref={emblemRef}
              className="w-full max-w-sm relative group cursor-pointer"
            >
              {/* Outer Radiant Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber-600/30 via-amber-400/20 to-amber-300/30 blur-xl group-hover:blur-2xl transition-all opacity-80" />
              
              {/* Main Photo Card Frame */}
              <div className="relative rounded-2xl p-2 bg-gradient-to-tr from-amber-700/80 via-amber-300/80 to-amber-600/80 shadow-2xl gold-glow flex flex-col overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-900">
                  <img
                    src={CHURCH_IMAGES.hero}
                    alt="CSI KCD Christha Prabhalaya Church Sanctuary"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Top Floating Mini Youth Emblem */}
                  <div className="absolute top-2.5 right-2.5 w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 to-amber-300 shadow-lg flex items-center justify-center">
                    <img
                      src={CHURCH_IMAGES.logo}
                      alt="Youth Emblem"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Church Sanctuary Caption */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-left">
                    <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                      Sanctuary & Campus
                    </p>
                    <p className="text-xs font-semibold text-white truncate font-cinzel">
                      CSI KCD Christha Prabhalaya
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Floating Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-900/95 border border-amber-400/50 text-amber-300 text-xs font-cinzel font-bold tracking-widest uppercase shadow-xl backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Eccl. 12:1 Generation</span>
              </div>
            </div>

            {/* Quick Mini Stats */}
            <div className="grid grid-cols-2 gap-3 mt-7 w-full max-w-sm">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-amber-500/20 backdrop-blur-md text-center">
                <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="font-bold text-lg text-white">120+</span>
                </div>
                <span className="text-[11px] text-stone-400 uppercase tracking-wider font-medium">
                  Active Youths
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-amber-500/20 backdrop-blur-md text-center">
                <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
                  <Flame className="w-4 h-4" />
                  <span className="font-bold text-lg text-white">Weekly</span>
                </div>
                <span className="text-[11px] text-stone-400 uppercase tracking-wider font-medium">
                  Word & Worship
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Smooth Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <a
            href="#about"
            aria-label="Scroll down to About Us section"
            className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 animate-bounce transition-colors"
          >
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
