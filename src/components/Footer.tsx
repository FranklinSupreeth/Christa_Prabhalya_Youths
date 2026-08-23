import React from 'react';
import {
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Heart,
  Sparkles
} from 'lucide-react';
import { CHURCH_IMAGES, CHURCH_DETAILS } from '../data/churchData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-stone-300 border-t border-amber-500/20 pt-16 pb-12 font-sans relative overflow-hidden">
      {/* Sacred ambient background glow */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Logo, Brand & Verse */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 to-amber-300 shadow-md overflow-hidden flex items-center justify-center">
                <img
                  src={CHURCH_IMAGES.logo}
                  alt="Christha Prabhalaya Church Youths Emblem"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-cinzel font-bold text-base text-white tracking-wide">
                  CHRISHTHA PRABHALAYA
                </h3>
                <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
                  CHURCH YOUTHS
                </span>
              </div>
            </div>

            <p className="font-playfair text-amber-200/90 text-sm italic max-w-md">
              "{CHURCH_DETAILS.themeVerse.text}"
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              — {CHURCH_DETAILS.themeVerse.reference}
            </p>

            <div className="flex items-center gap-3 text-xs text-stone-400 font-semibold tracking-widest uppercase pt-1">
              <span>Faith</span>
              <span className="text-amber-500">•</span>
              <span>Fellowship</span>
              <span className="text-amber-500">•</span>
              <span>Purpose</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">Home Sanctuary</a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">About Church Youths</a>
              </li>
              <li>
                <a href="#activities" className="hover:text-amber-400 transition-colors">Youth Activities & Routine</a>
              </li>
              <li>
                <a href="#events" className="hover:text-amber-400 transition-colors">Upcoming Events & Camps</a>
              </li>
              <li>
                <a href="#bible" className="hover:text-amber-400 transition-colors">Verse of the Day & Bible Hub</a>
              </li>
              <li>
                <a href="#join" className="hover:text-amber-400 transition-colors">Join the Youth Community</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">Contact Coordinators</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              Fellowship Connect
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{CHURCH_DETAILS.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${CHURCH_DETAILS.email}`} className="text-amber-300 hover:underline">
                  {CHURCH_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a href={CHURCH_DETAILS.instagram} target="_blank" rel="noreferrer" className="text-pink-300 hover:underline">
                  {CHURCH_DETAILS.instagramHandle}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Christha Prabhalaya Church Youths. All rights reserved. Soli Deo Gloria.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-stone-300 hover:text-amber-400 transition-colors border border-slate-800"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
