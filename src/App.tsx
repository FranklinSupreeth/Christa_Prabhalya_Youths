import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { EventsSection } from './components/EventsSection';
import { BibleFaithSection } from './components/BibleFaithSection';
import { JoinYouthSection } from './components/JoinYouthSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('cpc_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('cpc_theme', 'dark');
      } catch {
        // ignore
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('cpc_theme', 'light');
      } catch {
        // ignore
      }
    }
  }, [isDarkMode]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'activities', 'events', 'bible', 'join', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleExploreVerse = () => {
    const el = document.getElementById('bible');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      {/* Preloader with smooth exit */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Main App Layout */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        activeSection={activeSection}
      />

      <main className="flex-1">
        <HeroSection onExploreVerse={handleExploreVerse} />
        <AboutSection />
        <ActivitiesSection />
        <EventsSection />
        <BibleFaithSection />
        <JoinYouthSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
