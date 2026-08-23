import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  CheckCircle2,
  X,
  Ticket,
  ChevronRight,
  Send,
  Download,
  Flame,
  Music,
  Trophy,
  History
} from 'lucide-react';
import { CHURCH_EVENTS, PAST_EVENTS_GALLERY } from '../data/churchData';
import { ChurchEvent } from '../types';

export const EventsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState<{
    event: ChurchEvent;
    fullName: string;
    email: string;
    phone: string;
    ticketId: string;
  } | null>(null);

  // Form State
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    emergencyContact: ''
  });

  const categories = ['All', 'Camp & Retreat', 'Worship Night', 'Bible & Quiz', 'Outreach', 'Sports & Social'];

  const filteredEvents = selectedCategory === 'All'
    ? CHURCH_EVENTS
    : CHURCH_EVENTS.filter(e => e.category === selectedCategory);

  const featuredEvent = CHURCH_EVENTS.find(e => e.featured) || CHURCH_EVENTS[0];

  const handleOpenRegistration = (event: ChurchEvent) => {
    setSelectedEvent(event);
    setRegistrationModalOpen(true);
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !regForm.fullName || !regForm.email || !regForm.phone) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const ticketId = `CPC-${Math.floor(100000 + Math.random() * 900000)}`;

    setTicketData({
      event: selectedEvent,
      fullName: regForm.fullName,
      email: regForm.email,
      phone: regForm.phone,
      ticketId
    });

    // Save in local persistence
    try {
      const existing = JSON.parse(localStorage.getItem('cpc_event_registrations') || '[]');
      existing.push({
        ticketId,
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        ...regForm,
        registeredAt: new Date().toISOString()
      });
      localStorage.setItem('cpc_event_registrations', JSON.stringify(existing));
    } catch {
      // ignore
    }
  };

  const handleCloseModal = () => {
    setRegistrationModalOpen(false);
    setSelectedEvent(null);
    setTicketData(null);
    setRegForm({ fullName: '', email: '', phone: '', age: '', emergencyContact: '' });
  };

  return (
    <section
      id="events"
      className="py-20 bg-stone-100/70 dark:bg-slate-900/60 transition-colors duration-300 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/20">
            <Calendar className="w-3.5 h-3.5" />
            <span>Mark Your Calendar</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            Youth Events & Gatherings
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed">
            Experience life-changing encounters, powerful worship nights, discipleship camps, and joyful community gatherings.
          </p>
        </div>

        {/* Featured Big Event Hero Card */}
        {featuredEvent && (
          <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-[#0e1726] to-amber-950 text-white p-6 sm:p-8 lg:p-10 border border-amber-500/40 shadow-2xl gold-glow mb-14 relative overflow-hidden">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-widest shadow-md">
                    ★ Featured Annual Camp
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-medium border border-amber-400/30 backdrop-blur-md">
                    {featuredEvent.category}
                  </span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-100 tracking-tight leading-tight">
                  {featuredEvent.title}
                </h3>
                
                <p className="font-playfair text-amber-300/90 text-sm sm:text-base italic">
                  Theme: {featuredEvent.theme}
                </p>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  {featuredEvent.description}
                </p>

                {/* Event Highlights strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-stone-200">
                    <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{featuredEvent.formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-stone-200">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{featuredEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-stone-200">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">{featuredEvent.venue}</span>
                  </div>
                </div>
              </div>

              {/* Action Column */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                <div className="w-full max-w-xs p-5 rounded-2xl bg-white/5 border border-amber-500/30 backdrop-blur-md space-y-4 text-center">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-widest text-amber-300/80 font-semibold">
                      Spots Remaining
                    </span>
                    <div className="text-3xl font-extrabold text-white font-cinzel">
                      {featuredEvent.totalSeats && featuredEvent.registeredCount
                        ? `${featuredEvent.totalSeats - featuredEvent.registeredCount} / ${featuredEvent.totalSeats}`
                        : 'Open Enrollment'}
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full"
                        style={{
                          width: `${
                            featuredEvent.totalSeats && featuredEvent.registeredCount
                              ? (featuredEvent.registeredCount / featuredEvent.totalSeats) * 100
                              : 70
                          }%`
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenRegistration(featuredEvent)}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-lg gold-glow transition-all flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Register Now & Reserve</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'bg-white dark:bg-slate-900 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-slate-800 border border-stone-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Upcoming Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    {evt.category}
                  </span>
                  <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    {evt.formattedDate}
                  </span>
                </div>

                <div>
                  <h4 className="font-cinzel text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {evt.title}
                  </h4>
                  <p className="text-xs font-playfair italic text-amber-600 dark:text-amber-400/90 mt-0.5">
                    {evt.theme}
                  </p>
                </div>

                <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed line-clamp-3">
                  {evt.description}
                </p>

                {/* Details */}
                <div className="space-y-1.5 text-xs text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => handleOpenRegistration(evt)}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Register Free</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Previous Events & Memories Showcase */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <History className="w-5 h-5 text-amber-500" />
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
              Previous Events & Youth Memories
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PAST_EVENTS_GALLERY.map((past, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/60 dark:border-slate-700/60 space-y-2 hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    {past.tag}
                  </span>
                  <span className="text-[11px] text-stone-400">{past.date}</span>
                </div>
                <h5 className="font-cinzel font-bold text-sm text-stone-900 dark:text-stone-100">
                  {past.title}
                </h5>
                <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
                  {past.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Event Registration & Ticket Modal */}
      {registrationModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-stone-200 dark:border-slate-800 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-500 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!ticketData ? (
              // Registration Form Step
              <>
                <div className="space-y-1.5 pr-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                    Free Event Registration
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900 dark:text-stone-100">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {selectedEvent.formattedDate} • {selectedEvent.time} • {selectedEvent.venue}
                  </p>
                </div>

                <form onSubmit={handleSubmitRegistration} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={regForm.fullName}
                      onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                      placeholder="e.g. Samuel David"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        placeholder="samuel@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                        placeholder="+91 98450 XXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        min="12"
                        max="40"
                        value={regForm.age}
                        onChange={(e) => setRegForm({ ...regForm, age: e.target.value })}
                        placeholder="e.g. 21"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                        Area / Parish
                      </label>
                      <input
                        type="text"
                        value={regForm.emergencyContact}
                        onChange={(e) => setRegForm({ ...regForm, emergencyContact: e.target.value })}
                        placeholder="e.g. Bengaluru Central"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-md gold-glow transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Confirm & Generate E-Pass</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              // Digital E-Pass Step
              <div className="space-y-5 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-cinzel text-2xl font-bold text-stone-900 dark:text-stone-100">
                    Registration Confirmed!
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Your spot is successfully booked for {ticketData.event.title}.
                  </p>
                </div>

                {/* Digital Ticket Badge */}
                <div className="rounded-2xl p-5 bg-gradient-to-br from-slate-950 to-[#101e35] text-amber-100 border border-amber-500/40 shadow-xl text-left space-y-3 relative overflow-hidden">
                  <div className="flex justify-between items-center border-b border-amber-500/20 pb-2">
                    <span className="font-cinzel font-bold text-xs text-amber-400 uppercase tracking-widest">
                      CHRISHTHA PRABHALAYA YOUTHS
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      {ticketData.ticketId}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-cinzel font-bold text-base text-white">
                      {ticketData.event.title}
                    </h4>
                    <p className="text-xs text-amber-300/80 font-playfair italic">
                      {ticketData.event.formattedDate} • {ticketData.event.time}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-amber-500/20 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-stone-400 block">Attendee</span>
                      <span className="font-semibold text-white">{ticketData.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-stone-400 block">Venue</span>
                      <span className="font-semibold text-white truncate block">{ticketData.event.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleCloseModal}
                    className="w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
