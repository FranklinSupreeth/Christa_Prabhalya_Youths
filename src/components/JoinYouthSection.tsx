import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  Send,
  Users,
  Music,
  Heart,
  Globe,
  Flame,
  Trophy,
  ShieldCheck,
  Download,
  Calendar
} from 'lucide-react';
import { CHURCH_DETAILS } from '../data/churchData';

export const JoinYouthSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phone: '',
    email: '',
    area: '',
    ministryInterests: [] as string[],
    confirmInterest: false
  });

  const [submittedPass, setSubmittedPass] = useState<{
    memberId: string;
    fullName: string;
    email: string;
    phone: string;
    area: string;
    joinedDate: string;
  } | null>(null);

  const ministryOptions = [
    { id: 'worship', label: 'Worship Band & Choir', icon: Music },
    { id: 'media', label: 'Media & Tech Production', icon: Sparkles },
    { id: 'outreach', label: 'Community Service & Charity', icon: Heart },
    { id: 'prayer', label: 'Prayer & Intercession Team', icon: Flame },
    { id: 'evangelism', label: 'Evangelism & Missions', icon: Globe },
    { id: 'sports', label: 'Sports & Recreational Events', icon: Trophy }
  ];

  const handleCheckboxChange = (optionLabel: string) => {
    setFormData(prev => {
      const exists = prev.ministryInterests.includes(optionLabel);
      if (exists) {
        return {
          ...prev,
          ministryInterests: prev.ministryInterests.filter(i => i !== optionLabel)
        };
      } else {
        return {
          ...prev,
          ministryInterests: [...prev.ministryInterests, optionLabel]
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email || !formData.confirmInterest) {
      return;
    }

    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    const memberId = `CPCY-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const joinedDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const newMember = {
      memberId,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      area: formData.area,
      joinedDate
    };

    setSubmittedPass(newMember);

    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('cpc_youth_members') || '[]');
      existing.push({
        ...formData,
        memberId,
        joinedDate: new Date().toISOString()
      });
      localStorage.setItem('cpc_youth_members', JSON.stringify(existing));
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="join"
      className="py-20 bg-stone-100/70 dark:bg-slate-900/60 transition-colors duration-300 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/20">
            <Users className="w-3.5 h-3.5" />
            <span>Join Our Spiritual Family</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            Join the Youth Community
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed">
            Ready to grow in faith, make lifelong friends, and serve Christ with your talents? We would love to welcome you home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Who Can Join & Benefits */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Who Can Join Box */}
            <div className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-cinzel text-xl font-bold text-stone-900 dark:text-stone-100">
                Who Can Join the Youths?
              </h3>
              <div className="space-y-3 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>All Youths Aged 13 – 35:</strong> High school students, university undergraduates, graduates, job seekers, and young working professionals.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Parishioners & Seekers:</strong> Whether you grew up in Christha Prabhalaya Church or just moved to the city and are looking for a spiritual haven.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Every Background & Talent:</strong> No special qualification needed — just an open heart to know Jesus and love people.</span>
                </div>
              </div>
            </div>

            {/* Why Join Card */}
            <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-slate-950 via-[#0e192c] to-amber-950 text-white border border-amber-500/30 shadow-xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Youth Ministry Pathway
              </span>
              <h4 className="font-cinzel text-lg font-bold text-amber-100">
                What Happens After You Sign Up?
              </h4>
              <ol className="space-y-2.5 text-xs sm:text-sm text-stone-300">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <span>Welcome message & WhatsApp group invitation from our youth coordinator.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <span>Introduction at the next Sunday Youth Fellowship gathering & tea.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                  <span>Connect with music, media, outreach, or prayer team according to your gifts.</span>
                </li>
              </ol>
            </div>

          </div>

          {/* Right Column: Registration Form / Pass */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xl">
              
              {!submittedPass ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-cinzel text-2xl font-bold text-stone-900 dark:text-stone-100">
                      Youth Membership Registration
                    </h3>
                    <p className="text-stone-500 dark:text-stone-400 text-xs">
                      Please fill out your details to connect with Christha Prabhalaya Church Youths.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Timothy Augustine"
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Age & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                        Age *
                      </label>
                      <input
                        type="number"
                        min="12"
                        max="40"
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="e.g. 20"
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98450 XXXXX"
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email & Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="timothy@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                        Area / Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        placeholder="e.g. Indiranagar, Bengaluru"
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Ministry Interests */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                      Areas of Interest & Talents (Select all that apply):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ministryOptions.map(opt => {
                        const Icon = opt.icon;
                        const isChecked = formData.ministryInterests.includes(opt.label);
                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleCheckboxChange(opt.label)}
                            className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center gap-2.5 ${
                              isChecked
                                ? 'bg-amber-500/15 border-amber-500 text-amber-800 dark:text-amber-300 font-bold'
                                : 'bg-stone-50 dark:bg-slate-800/60 border-stone-200 dark:border-slate-700 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="rounded text-amber-500 focus:ring-amber-400 h-4 w-4"
                            />
                            <Icon className="w-4 h-4 text-amber-500 shrink-0" />
                            <span>{opt.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Required Confirmation */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="confirmInterest"
                      required
                      checked={formData.confirmInterest}
                      onChange={(e) => setFormData({ ...formData, confirmInterest: e.target.checked })}
                      className="mt-1 rounded text-amber-500 focus:ring-amber-400 h-4 w-4 shrink-0"
                    />
                    <label htmlFor="confirmInterest" className="text-xs text-stone-700 dark:text-stone-200 cursor-pointer leading-relaxed">
                      <strong>Yes, I confirm my interest in joining the Youth Community</strong> of Christha Prabhalaya Church and would like to receive fellowship updates and gathering notifications.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-lg gold-glow transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit & Join Youth Family</span>
                  </button>
                </form>
              ) : (
                /* Celebratory Membership Pass Preview */
                <div className="space-y-6 text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-10 h-10" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                      Welcome to the Family!
                    </h3>
                    <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm">
                      Praise God! You are now registered with Christha Prabhalaya Church Youths.
                    </p>
                  </div>

                  {/* Digital Pass Card */}
                  <div className="rounded-3xl p-6 bg-gradient-to-br from-slate-950 via-[#101b2e] to-amber-950 text-amber-100 border border-amber-500/50 shadow-2xl text-left space-y-4 relative overflow-hidden gold-glow">
                    <div className="flex justify-between items-center border-b border-amber-500/20 pb-3">
                      <div>
                        <span className="font-cinzel font-bold text-xs text-amber-400 tracking-wider block">
                          CHRISTHA PRABHALAYA CHURCH
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-stone-400">
                          Official Youth Member Card
                        </span>
                      </div>
                      <span className="font-mono text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                        {submittedPass.memberId}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase text-stone-400 block">Member Name</span>
                      <h4 className="font-cinzel text-xl font-bold text-white">
                        {submittedPass.fullName}
                      </h4>
                      <p className="text-xs text-amber-300/90 font-playfair italic">
                        "Remember your Creator in the days of your youth." — Eccl 12:1
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-amber-500/20 text-xs">
                      <div>
                        <span className="text-[10px] uppercase text-stone-400 block">Area</span>
                        <span className="font-medium text-stone-200">{submittedPass.area}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-stone-400 block">Joined</span>
                        <span className="font-medium text-stone-200">{submittedPass.joinedDate}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmittedPass(null);
                      setFormData({
                        fullName: '',
                        age: '',
                        phone: '',
                        email: '',
                        area: '',
                        ministryInterests: [],
                        confirmInterest: false
                      });
                    }}
                    className="px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-800 dark:text-stone-200 transition-colors"
                  >
                    Register Another Youth Member
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
