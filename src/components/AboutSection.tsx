import React from 'react';
import {
  HeartHandshake,
  Compass,
  Cross,
  Users,
  Target,
  Sparkles,
  History,
  Quote,
  Flame,
  Award
} from 'lucide-react';
import { CHURCH_IMAGES, YOUTH_PILLARS } from '../data/churchData';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 bg-stone-100/70 dark:bg-slate-900/60 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Decorative ambient background aura */}
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Our Story</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            About Church Youths
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed">
            United under the banner of Christ, we are a generation consecrated to remember our Creator, cultivate deep spiritual roots, and transform our world through genuine love and service.
          </p>
        </div>

        {/* Purpose, Vision, Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          
          {/* Purpose */}
          <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-slate-900/90 border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Cross className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-stone-900 dark:text-amber-100 mb-2">
              Our Purpose
            </h3>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              To glorify God by creating a Christ-centered sanctuary where young people encounter the living Savior, discover their unique spiritual gifts, and anchor their identity in eternal truth.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-slate-900/90 border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-stone-900 dark:text-amber-100 mb-2">
              Our Vision
            </h3>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              To raise an unshakeable, passionate, and spiritually grounded youth generation that shines as bright ambassadors of Jesus Christ in academia, professions, homes, and global missions.
            </p>
          </div>

          {/* Mission */}
          <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-slate-900/90 border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-stone-900 dark:text-amber-100 mb-2">
              Our Mission
            </h3>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              Through vibrant worship, systematic Bible study, fervent prayer, joyful fellowship, and hands-on community service, we empower every youth to live boldly for God's kingdom.
            </p>
          </div>

        </div>

        {/* Group Photo & History Narrative */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-lg overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left: Fellowship Photo */}
            <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-full min-h-[340px] overflow-hidden group">
              <img
                src={CHURCH_IMAGES.youthGroup}
                alt="Christha Prabhalaya Church Youths Group Fellowship"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                  Fellowship in Christ
                </span>
                <p className="font-cinzel text-base sm:text-lg font-bold">
                  Christha Prabhalaya Youth Family
                </p>
              </div>
            </div>

            {/* Right: History & Background */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 space-y-5">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <History className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Our Background & Journey
                </span>
              </div>
              
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
                Nurturing Young Believers with Passion and Purpose
              </h3>

              <div className="space-y-3.5 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                <p>
                  Established as an integral ministry of <strong>Christha Prabhalaya Church</strong>, the youth group began as a small prayer gathering of high schoolers and college students hungry for God's Word and authentic Christian friendship.
                </p>
                <p>
                  Over the years, God has graciously multiplied our family into a dynamic ministry encompassing choir ensembles, campus evangelism, seasonal retreats, sports leagues, and impactful charitable outreach initiatives across the city.
                </p>
                <p>
                  Today, we continue to uphold the eternal mandate of <em>Ecclesiastes 12:1</em> — creating an inclusive, joyful, and spiritually vibrant environment where young souls thrive in faith and fellowship.
                </p>
              </div>

              {/* Fellowship quote */}
              <div className="pt-2 border-t border-stone-200 dark:border-slate-800 flex items-start gap-3">
                <Quote className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="font-playfair italic text-xs sm:text-sm text-stone-700 dark:text-amber-200/90">
                  "No one stands alone in this family. Together we seek His face, together we serve His people, and together we run the race."
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
