import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Share2,
  Copy,
  Check,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Search,
  Flame,
  Heart,
  MessageSquare,
  Send,
  Download,
  BookMarked,
  Quote,
  Eye,
  RefreshCw,
  X
} from 'lucide-react';
import {
  BIBLE_VERSES,
  DEVOTIONAL_RESOURCES,
  PRAYER_TOPICS,
  INITIAL_PRAYER_REQUESTS
} from '../data/churchData';
import { BibleVerse, DevotionalResource, UserPrayerRequest } from '../types';
import {
  getDailyVerse,
  getRandomVerse,
  fetchOnlineScripture,
  speakVerse,
  stopSpeaking
} from '../utils/bibleService';

export const BibleFaithSection: React.FC = () => {
  const [dayOffset, setDayOffset] = useState<number>(0);
  const [currentVerse, setCurrentVerse] = useState<BibleVerse>(() => getDailyVerse(0));
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'verse' | 'devotional' | 'prayerWall'>('verse');
  
  // Custom Bible API Lookup state
  const [searchBook, setSearchBook] = useState('John');
  const [searchChapter, setSearchChapter] = useState(3);
  const [searchVerseNum, setSearchVerseNum] = useState(16);
  const [isSearchingOnline, setIsSearchingOnline] = useState(false);
  const [onlineLookupError, setOnlineLookupError] = useState<string | null>(null);

  // Devotional reader modal
  const [activeDevotional, setActiveDevotional] = useState<DevotionalResource | null>(null);

  // Prayer Wall state
  const [prayerRequests, setPrayerRequests] = useState<UserPrayerRequest[]>(() => {
    try {
      const saved = localStorage.getItem('cpc_user_prayers');
      return saved ? JSON.parse(saved) : INITIAL_PRAYER_REQUESTS;
    } catch {
      return INITIAL_PRAYER_REQUESTS;
    }
  });
  const [newPrayer, setNewPrayer] = useState({ name: '', request: '', category: 'Spiritual Walk', isAnonymous: false });
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);

  // Wallpaper / Share card modal
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const verseContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const refLabelRef = useRef<HTMLSpanElement>(null);

  // Categories
  const verseThemes = ['All', 'Youth & Purpose', 'Faith & Courage', 'Hope & Healing', 'Wisdom & Guidance', 'Love & Unity', 'Peace & Comfort'];

  // Animate verse switch using GSAP
  const transitionToVerse = (newVerse: BibleVerse) => {
    stopSpeaking();
    setIsPlayingAudio(false);

    if (verseContainerRef.current) {
      gsap.to(verseContainerRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentVerse(newVerse);
          gsap.fromTo(
            verseContainerRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
          );
        }
      });
    } else {
      setCurrentVerse(newVerse);
    }
  };

  const handleNextDay = () => {
    const nextOffset = dayOffset + 1;
    setDayOffset(nextOffset);
    transitionToVerse(getDailyVerse(nextOffset));
  };

  const handlePrevDay = () => {
    const prevOffset = dayOffset - 1;
    setDayOffset(prevOffset);
    transitionToVerse(getDailyVerse(prevOffset));
  };

  const handleToday = () => {
    setDayOffset(0);
    transitionToVerse(getDailyVerse(0));
  };

  const handleRandomVerse = () => {
    const random = getRandomVerse(currentVerse.id);
    transitionToVerse(random);
  };

  const handleThemeFilter = (theme: string) => {
    setSelectedTheme(theme);
    if (theme === 'All') {
      transitionToVerse(getDailyVerse(dayOffset));
    } else {
      const match = BIBLE_VERSES.find(v => v.theme === theme) || BIBLE_VERSES[0];
      transitionToVerse(match);
    }
  };

  const handleOnlineLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchingOnline(true);
    setOnlineLookupError(null);

    try {
      const text = await fetchOnlineScripture(searchBook, searchChapter, searchVerseNum);
      if (text) {
        const fetchedVerse: BibleVerse = {
          id: `online-${Date.now()}`,
          reference: `${searchBook} ${searchChapter}:${searchVerseNum}`,
          book: searchBook,
          chapter: searchChapter,
          verse: searchVerseNum,
          text: text,
          translation: 'ASV (Online API)',
          theme: 'Wisdom & Guidance',
          reflection: `Scripture retrieved directly via the Holy Bible API repository (${searchBook} ${searchChapter}:${searchVerseNum}).`
        };
        transitionToVerse(fetchedVerse);
      } else {
        setOnlineLookupError(`Could not find ${searchBook} ${searchChapter}:${searchVerseNum} on online Bible API. Switching to curated scripture.`);
      }
    } catch {
      setOnlineLookupError('Unable to reach Bible API server. Loaded verified local scripture.');
    } finally {
      setIsSearchingOnline(false);
    }
  };

  const handleAudioToggle = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speakVerse(currentVerse.text, currentVerse.reference, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleCopyVerse = () => {
    navigator.clipboard.writeText(`"${currentVerse.text}" — ${currentVerse.reference} (${currentVerse.translation})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Prayer Wall Actions
  const handlePrayFor = (id: string) => {
    const updated = prayerRequests.map(req => {
      if (req.id === id) {
        return { ...req, prayCount: req.prayCount + 1 };
      }
      return req;
    });
    setPrayerRequests(updated);
    try {
      localStorage.setItem('cpc_user_prayers', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSubmitPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayer.request.trim()) return;

    const newEntry: UserPrayerRequest = {
      id: `pr-req-${Date.now()}`,
      name: newPrayer.isAnonymous ? 'Anonymous Youth' : (newPrayer.name.trim() || 'Youth Friend'),
      isAnonymous: newPrayer.isAnonymous,
      category: newPrayer.category,
      request: newPrayer.request.trim(),
      date: 'Just now',
      prayCount: 1
    };

    const updated = [newEntry, ...prayerRequests];
    setPrayerRequests(updated);
    try {
      localStorage.setItem('cpc_user_prayers', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setNewPrayer({ name: '', request: '', category: 'Spiritual Walk', isAnonymous: false });
    setPrayerSubmitted(true);
    setTimeout(() => setPrayerSubmitted(false), 3500);
  };

  return (
    <section
      id="bible"
      className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sacred Scriptures & Growth</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            Bible & Youth Faith Hub
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed">
            Feed your spirit daily with the Word of God, explore youth devotionals, study guides, and lift up prayer requests in unity.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-2xl bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setActiveTab('verse')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'verse'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Verse of the Day</span>
            </button>

            <button
              onClick={() => setActiveTab('devotional')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'devotional'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <BookMarked className="w-4 h-4" />
              <span>Youth Devotionals</span>
            </button>

            <button
              onClick={() => setActiveTab('prayerWall')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'prayerWall'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Prayer Wall</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Verse of the Day Interactive Module */}
        {activeTab === 'verse' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Main Interactive Verse Sanctuary Card */}
            <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-slate-950 via-[#0d1727] to-amber-950 text-white border border-amber-500/40 shadow-2xl gold-glow relative overflow-hidden">
              
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Card Controls Header */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-5 mb-6">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Daily Scripture</span>
                  </span>
                  <span className="text-xs text-amber-200/80 font-medium">
                    {currentVerse.dateKey || 'Today\'s Manna'}
                  </span>
                </div>

                {/* Day Navigation & Shuffle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevDay}
                    title="Previous Day's Verse"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleToday}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                      dayOffset === 0
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-white/10 hover:bg-white/20 text-amber-200'
                    }`}
                  >
                    Today
                  </button>

                  <button
                    onClick={handleNextDay}
                    title="Next Day's Verse"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleRandomVerse}
                    title="Random Inspiring Verse"
                    className="p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-colors flex items-center gap-1.5 text-xs font-semibold px-3"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Surprise Me</span>
                  </button>
                </div>
              </div>

              {/* Central Animated Verse Box */}
              <div ref={verseContainerRef} className="relative z-10 py-4 max-w-3xl mx-auto text-center space-y-6">
                <Quote className="w-10 h-10 text-amber-400/40 mx-auto" />
                
                <p
                  ref={textRef}
                  className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-3xl italic text-amber-100 font-medium leading-relaxed"
                >
                  "{currentVerse.text}"
                </p>

                <div className="space-y-1">
                  <span
                    ref={refLabelRef}
                    className="font-cinzel text-lg sm:text-xl font-bold text-amber-400 gold-text-gradient tracking-widest"
                  >
                    — {currentVerse.reference}
                  </span>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-stone-400">
                    Translation: {currentVerse.translation} • Theme: {currentVerse.theme}
                  </span>
                </div>

                {/* Practical youth reflection */}
                {currentVerse.reflection && (
                  <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/20 max-w-xl mx-auto backdrop-blur-md">
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                      <strong className="text-amber-300">Youth Reflection: </strong>
                      {currentVerse.reflection}
                    </p>
                  </div>
                )}
              </div>

              {/* Verse Action Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t border-amber-500/20">
                <div className="flex items-center gap-2">
                  {/* Listen Read-Aloud */}
                  <button
                    onClick={handleAudioToggle}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      isPlayingAudio
                        ? 'bg-amber-400 text-slate-950 shadow-lg animate-pulse'
                        : 'bg-white/10 hover:bg-white/20 text-amber-200'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Stop Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>Listen to Verse</span>
                      </>
                    )}
                  </button>

                  {/* Copy Verse */}
                  <button
                    onClick={handleCopyVerse}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-stone-200 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {/* Share Card Modal */}
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Verse Card</span>
                  </button>
                </div>

                <div className="text-xs text-amber-300/70 font-mono">
                  Scripture Ref: {currentVerse.book} {currentVerse.chapter}:{currentVerse.verse}
                </div>
              </div>

            </div>

            {/* Theme Categorization Filter Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Scriptures by Youth Life Themes:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {verseThemes.map(t => (
                  <button
                    key={t}
                    onClick={() => handleThemeFilter(t)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedTheme === t
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-stone-100 dark:bg-slate-900 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Online Bible API Integration Search Panel */}
            <div className="rounded-2xl p-6 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-amber-500" />
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                    Live Holy Bible API Scripture Fetcher
                  </h4>
                </div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                  github: wldeh/bible-api
                </span>
              </div>

              <form onSubmit={handleOnlineLookup} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1">
                    Book
                  </label>
                  <input
                    type="text"
                    value={searchBook}
                    onChange={(e) => setSearchBook(e.target.value)}
                    placeholder="e.g. John, Psalms"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1">
                    Chapter
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={searchChapter}
                    onChange={(e) => setSearchChapter(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1">
                    Verse
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={searchVerseNum}
                    onChange={(e) => setSearchVerseNum(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isSearchingOnline}
                    className="w-full py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center justify-center gap-1.5 h-[38px]"
                  >
                    {isSearchingOnline ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Search className="w-3.5 h-3.5" />
                    )}
                    <span>Fetch Verse</span>
                  </button>
                </div>
              </form>

              {onlineLookupError && (
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  {onlineLookupError}
                </p>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: Youth Devotionals & Bible Study Resources */}
        {activeTab === 'devotional' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DEVOTIONAL_RESOURCES.map((dev) => (
                <div
                  key={dev.id}
                  className="rounded-2xl p-6 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400">
                        {dev.category}
                      </span>
                      <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                        {dev.readTime}
                      </span>
                    </div>

                    <h4 className="font-cinzel text-lg font-bold text-stone-900 dark:text-stone-100">
                      {dev.title}
                    </h4>

                    <p className="text-xs font-playfair italic text-amber-600 dark:text-amber-400">
                      {dev.passage}
                    </p>

                    <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed line-clamp-3">
                      {dev.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      By {dev.author}
                    </span>
                    <button
                      onClick={() => setActiveDevotional(dev)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                    >
                      Read Study
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Interactive Prayer Topics & Prayer Wall */}
        {activeTab === 'prayerWall' && (
          <div className="space-y-12 animate-fade-in">
            
            {/* Guided Youth Prayer Topics Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <h3 className="font-cinzel text-xl font-bold text-stone-900 dark:text-stone-100">
                  Generational Prayer Focus
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRAYER_TOPICS.map((pt) => (
                  <div
                    key={pt.id}
                    className="p-5 rounded-2xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400">
                        {pt.category}
                      </span>
                      <span className="text-xs font-playfair italic text-stone-500">
                        {pt.scripture}
                      </span>
                    </div>
                    <h5 className="font-cinzel font-bold text-sm text-stone-900 dark:text-stone-100">
                      {pt.title}
                    </h5>
                    <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Community Prayer Wall */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Submit a Prayer Request */}
              <div className="lg:col-span-5 rounded-3xl p-6 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Intercessory Wall
                    </span>
                  </div>
                  <h4 className="font-cinzel text-xl font-bold text-stone-900 dark:text-stone-100">
                    Post a Prayer Request
                  </h4>
                  <p className="text-stone-600 dark:text-stone-400 text-xs">
                    Our youth intercession circle prays over every submitted petition.
                  </p>
                </div>

                <form onSubmit={handleSubmitPrayer} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Your Name (or Leave Blank for Anonymous)
                    </label>
                    <input
                      type="text"
                      disabled={newPrayer.isAnonymous}
                      value={newPrayer.name}
                      onChange={(e) => setNewPrayer({ ...newPrayer, name: e.target.value })}
                      placeholder="e.g. Rachel S."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-sm text-stone-900 dark:text-stone-100 disabled:opacity-50"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="anonCheck"
                      checked={newPrayer.isAnonymous}
                      onChange={(e) => setNewPrayer({ ...newPrayer, isAnonymous: e.target.checked })}
                      className="rounded text-amber-500 focus:ring-amber-400 h-4 w-4"
                    />
                    <label htmlFor="anonCheck" className="text-xs text-stone-600 dark:text-stone-400 cursor-pointer">
                      Keep my name confidential (Post anonymously)
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Prayer Category
                    </label>
                    <select
                      value={newPrayer.category}
                      onChange={(e) => setNewPrayer({ ...newPrayer, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-sm text-stone-900 dark:text-stone-100"
                    >
                      <option value="Spiritual Walk">Spiritual Walk & Purity</option>
                      <option value="Exams & Studies">Exams & Higher Studies</option>
                      <option value="Career & Job">Career, Job & Finances</option>
                      <option value="Family & Healing">Family Peace & Physical Healing</option>
                      <option value="Mental Peace">Mental Peace & Overcoming Anxiety</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Prayer Request Petition *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newPrayer.request}
                      onChange={(e) => setNewPrayer({ ...newPrayer, request: e.target.value })}
                      placeholder="Share what is on your heart..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-sm text-stone-900 dark:text-stone-100 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Petition</span>
                  </button>

                  {prayerSubmitted && (
                    <p className="text-xs text-center text-emerald-600 dark:text-emerald-400 font-semibold">
                      ✓ Your prayer request has been placed on the youth prayer altar.
                    </p>
                  )}
                </form>
              </div>

              {/* Right Column: Live Prayer Stream */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel text-lg font-bold text-stone-900 dark:text-stone-100">
                    Live Community Petitions ({prayerRequests.length})
                  </h4>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Click 🙏 to stand in prayer
                  </span>
                </div>

                <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                  {prayerRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-2.5 transition-all hover:border-amber-500/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold">
                            {req.name.slice(0, 1).toUpperCase()}
                          </div>
                          <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                            {req.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-400">{req.date}</span>
                      </div>

                      <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                        "{req.request}"
                      </p>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
                          {req.category}
                        </span>

                        <button
                          onClick={() => handlePrayFor(req.id)}
                          className="px-3 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-1.5 transition-transform active:scale-95"
                        >
                          <span>🙏 I Prayed</span>
                          <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-[11px]">
                            {req.prayCount}
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Devotional Full Reader Modal */}
      {activeDevotional && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveDevotional(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-500 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5 pr-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {activeDevotional.category} • {activeDevotional.readTime}
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-stone-900 dark:text-stone-100">
                {activeDevotional.title}
              </h3>
              <p className="font-playfair text-sm italic text-amber-600 dark:text-amber-400">
                Scripture: {activeDevotional.passage}
              </p>
            </div>

            <div className="space-y-3 text-stone-600 dark:text-stone-300 text-sm leading-relaxed border-y border-stone-200 dark:border-slate-800 py-4">
              {activeDevotional.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="space-y-2">
              <h5 className="font-cinzel font-bold text-xs uppercase text-stone-900 dark:text-amber-200">
                Questions for Personal Reflection:
              </h5>
              <ul className="list-disc pl-5 space-y-1 text-xs text-stone-600 dark:text-stone-300">
                {activeDevotional.reflectionQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                Guided Prayer
              </span>
              <p className="font-playfair italic text-xs sm:text-sm text-stone-800 dark:text-stone-200">
                "{activeDevotional.prayer}"
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveDevotional(null)}
                className="py-2.5 px-5 rounded-xl font-semibold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share / Verse Wallpaper Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-stone-200 dark:border-slate-800 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setShareModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-500 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 text-center">
              <h4 className="font-cinzel text-lg font-bold text-stone-900 dark:text-stone-100">
                Scripture Share Card
              </h4>
              <p className="text-xs text-stone-500">
                Share this divine inspiration with friends and family
              </p>
            </div>

            {/* Aesthetic Card Preview */}
            <div className="p-7 rounded-2xl bg-gradient-to-tr from-slate-950 via-[#132238] to-amber-950 text-amber-100 border border-amber-500/40 shadow-xl text-center space-y-4">
              <span className="font-cinzel text-[10px] tracking-widest text-amber-400 uppercase font-bold block">
                CHRISHTHA PRABHALAYA CHURCH YOUTHS
              </span>
              <p className="font-playfair text-lg italic leading-relaxed text-white">
                "{currentVerse.text}"
              </p>
              <span className="font-cinzel text-sm font-bold text-amber-300 block">
                — {currentVerse.reference}
              </span>
              <span className="text-[10px] text-stone-400 block">
                Ecclesiastes 12:1 Generation
              </span>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCopyVerse}
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Quote to Clipboard!' : 'Copy Quote Text'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
