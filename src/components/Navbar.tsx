import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Moon,
  Sun,
  BookOpen,
  Calendar,
  Users,
  HeartHandshake,
  Mail,
  Instagram,
  Sparkles
} from 'lucide-react';
import { CHURCH_IMAGES, CHURCH_DETAILS } from '../data/churchData';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onToggleDarkMode,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Activities', href: '#activities' },
    { name: 'Events', href: '#events' },
    { name: 'Bible & Faith', href: '#bible' },
    { name: 'Join Us', href: '#join' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans">
      {/* Top sacred banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-950 to-amber-950 text-amber-200/90 text-xs py-1.5 px-4 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-playfair italic hidden sm:inline">
              "{CHURCH_DETAILS.themeVerse.reference}: {CHURCH_DETAILS.themeVerse.text.slice(0, 75)}..."
            </span>
            <span className="font-playfair italic sm:hidden">
              {CHURCH_DETAILS.themeVerse.reference} — Remember your Creator
            </span>
          </div>
          <div className="flex items-center gap-4 text-amber-300 font-medium shrink-0 ml-2">
            <a
              href={CHURCH_DETAILS.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-amber-100 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden md:inline">{CHURCH_DETAILS.instagramHandle}</span>
            </a>
            <a
              href={`mailto:${CHURCH_DETAILS.email}`}
              className="flex items-center gap-1 hover:text-amber-100 transition-colors hidden lg:flex"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{CHURCH_DETAILS.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav
        id="main-nav"
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-950/95 shadow-md backdrop-blur-md py-2.5 border-b border-amber-500/20'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3.5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 to-amber-300 shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden flex items-center justify-center">
                <img
                  src={CHURCH_IMAGES.logo}
                  alt="Christha Prabhalaya Church Youths"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`font-cinzel font-bold text-sm sm:text-base tracking-wide transition-colors ${
                isScrolled ? 'text-stone-900 dark:text-amber-100' : 'text-white'
              }`}>
                CHRISHTHA PRABHALAYA
              </span>
              <span className="text-[11px] font-semibold tracking-widest text-amber-600 dark:text-amber-400 uppercase -mt-0.5">
                CHURCH YOUTHS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 font-semibold shadow-xs'
                      : isScrolled
                      ? 'text-stone-700 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-slate-900'
                      : 'text-stone-100 hover:text-amber-300 hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Night Reflection (Dark Mode) Toggle */}
            <button
              onClick={onToggleDarkMode}
              aria-label="Toggle Night Reflection mode"
              title={isDarkMode ? 'Switch to Daylight Serenity' : 'Switch to Night Reflection mode'}
              className={`p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'text-stone-700 dark:text-amber-300 hover:bg-stone-100 dark:hover:bg-slate-800'
                  : 'text-amber-200 hover:bg-white/10'
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Quick CTA button */}
            <a
              href="#join"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join the Youth</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled
                  ? 'text-stone-800 dark:text-stone-100 hover:bg-stone-100 dark:hover:bg-slate-800'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Open mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-slate-950/98 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl px-6 py-5 transition-all">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-base font-medium text-stone-800 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-stone-200 dark:border-slate-800 flex flex-col gap-2">
              <a
                href="#join"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-semibold text-sm uppercase tracking-wider bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 shadow-md"
              >
                Join Christha Prabhalaya Youths
              </a>
              <div className="flex justify-center gap-4 pt-2 text-xs text-stone-500 dark:text-stone-400">
                <a href={CHURCH_DETAILS.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-amber-500">
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <span>Instagram</span>
                </a>
                <a href={`mailto:${CHURCH_DETAILS.email}`} className="flex items-center gap-1 hover:text-amber-500">
                  <Mail className="w-4 h-4 text-amber-500" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
