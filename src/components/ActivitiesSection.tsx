import React, { useState } from 'react';
import {
  Sun,
  BookOpen,
  Flame,
  Music,
  Users,
  Globe,
  Heart,
  Trophy,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  X,
  Share2
} from 'lucide-react';
import { YOUTH_ACTIVITIES } from '../data/churchData';
import { YouthActivity } from '../types';

export const ActivitiesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalActivity, setActiveModalActivity] = useState<YouthActivity | null>(null);
  const [reminderSaved, setReminderSaved] = useState<string | null>(null);

  const categories = ['All', 'Worship', 'The Word', 'Prayer', 'Fellowship', 'Outreach', 'Recreation'];

  const filteredActivities = selectedCategory === 'All'
    ? YOUTH_ACTIVITIES
    : YOUTH_ACTIVITIES.filter(act => act.category === selectedCategory);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-amber-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Music': return <Music className="w-5 h-5 text-amber-500" />;
      case 'Users': return <Users className="w-5 h-5 text-amber-500" />;
      case 'Globe': return <Globe className="w-5 h-5 text-amber-500" />;
      case 'Heart': return <Heart className="w-5 h-5 text-amber-500" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-amber-500" />;
      default: return <Sparkles className="w-5 h-5 text-amber-500" />;
    }
  };

  const handleSetReminder = (title: string) => {
    setReminderSaved(title);
    setTimeout(() => setReminderSaved(null), 3000);
  };

  return (
    <section
      id="activities"
      className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spiritual Growth & Fun</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            Youth Activities & Ministries
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed">
            From soul-stirring Sunday worship and deep scripture studies to vibrant sports and compassionate city outreaches, there is a place for you to belong.
          </p>
        </div>

        {/* Filter category pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold scale-105'
                  : 'bg-stone-100 dark:bg-slate-900 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="rounded-2xl p-6 bg-stone-50/80 dark:bg-slate-900/90 border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 dark:bg-amber-950/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getCategoryIcon(act.icon)}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    {act.tag}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-stone-900 dark:text-amber-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {act.title}
                  </h3>
                  <p className="text-xs font-medium text-amber-600 dark:text-amber-400/90 mt-0.5">
                    {act.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed line-clamp-3">
                  {act.description}
                </p>

                {/* Schedule info pills */}
                <div className="pt-2 space-y-1.5 text-xs text-stone-500 dark:text-stone-400 border-t border-stone-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="font-medium text-stone-700 dark:text-stone-300">{act.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{act.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">{act.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-stone-200/60 dark:border-slate-800">
                <button
                  onClick={() => setActiveModalActivity(act)}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>View Details & Schedule</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Routine Snapshot Banner */}
        <div className="mt-16 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-[#0f172a] to-slate-900 text-white border border-amber-500/30 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Weekly Fellowship Rhythm
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-100">
                Never Miss a Divine Gathering
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
                Whether you want to join worship, study the Word, intercede in prayer, or enjoy recreational sports, all youths are cordially invited.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#join"
                className="px-5 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all whitespace-nowrap"
              >
                Join Youth Ministry
              </a>
              <a
                href="#contact"
                className="px-5 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all whitespace-nowrap"
              >
                Contact Coordinators
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Activity Details Modal */}
      {activeModalActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-stone-200 dark:border-slate-800 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalActivity(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-500 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-3.5 pr-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
                {getCategoryIcon(activeModalActivity.icon)}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {activeModalActivity.category} • {activeModalActivity.tag}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-stone-900 dark:text-stone-100">
                  {activeModalActivity.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Led by: {activeModalActivity.leader}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              {activeModalActivity.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2">
              <h4 className="font-semibold text-xs uppercase tracking-wider text-stone-900 dark:text-amber-200">
                Key Highlights & What to Expect:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalActivity.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Box */}
            <div className="rounded-2xl p-4 bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700/60 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-500 dark:text-stone-400">Timing:</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">{activeModalActivity.schedule} ({activeModalActivity.time})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500 dark:text-stone-400">Venue:</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">{activeModalActivity.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500 dark:text-stone-400">Target Group:</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">Teens & Young Adults (13 - 35 yrs)</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleSetReminder(activeModalActivity.title)}
                className="flex-1 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all flex items-center justify-center gap-2"
              >
                {reminderSaved === activeModalActivity.title ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Reminder Added!</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Add to My Calendar</span>
                  </>
                )}
              </button>
              <a
                href="#join"
                onClick={() => setActiveModalActivity(null)}
                className="py-3 px-5 rounded-xl font-semibold text-xs uppercase tracking-wider bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-800 dark:text-stone-200 transition-colors"
              >
                Join This
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
