import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Send,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { CHURCH_DETAILS } from '../data/churchData';

export const ContactSection: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/20">
            <Mail className="w-3.5 h-3.5" />
            <span>We'd Love to Hear From You</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            Contact Church Youths
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed">
            Have questions about gatherings, prayer requests, or want to collaborate on outreach? Reach out to us through any channel below.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Google Maps / Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Church Info & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Details Card */}
            <div className="rounded-3xl p-6 sm:p-7 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  Church Sanctuary
                </span>
                <h3 className="font-cinzel text-xl font-bold text-stone-900 dark:text-stone-100">
                  {CHURCH_DETAILS.churchName}
                </h3>
              </div>

              <div className="space-y-4 text-sm text-stone-600 dark:text-stone-300">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 block">Address</span>
                    <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                      {CHURCH_DETAILS.location}
                    </p>
                    <a
                      href={CHURCH_DETAILS.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline mt-1.5"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 block">Official Youth Email</span>
                    <a
                      href={`mailto:${CHURCH_DETAILS.email}`}
                      className="text-xs sm:text-sm text-amber-600 dark:text-amber-400 hover:underline font-mono"
                    >
                      {CHURCH_DETAILS.email}
                    </a>
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 block">Phone & WhatsApp</span>
                    <a
                      href={`https://wa.me/${CHURCH_DETAILS.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 hover:text-amber-500 transition-colors"
                    >
                      {CHURCH_DETAILS.phone} (WhatsApp Helpdesk)
                    </a>
                  </div>
                </div>

                {/* Service Timings */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 block">Sunday Youth Service</span>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {CHURCH_DETAILS.gatheringTimes.sundayService}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-slate-950 to-[#0f1b2d] text-white border border-amber-500/30 shadow-xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Connect on Social Media
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Instagram */}
                <a
                  href={CHURCH_DETAILS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-pink-500/30 hover:border-pink-400 transition-all flex items-center gap-3 group"
                >
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Instagram</span>
                    <span className="text-[11px] text-pink-300 group-hover:text-pink-200">
                      {CHURCH_DETAILS.instagramHandle}
                    </span>
                  </div>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-red-500/30 hover:border-red-400 transition-all flex items-center gap-3 group"
                >
                  <div className="p-2 rounded-xl bg-red-600 text-white shrink-0">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">YouTube</span>
                    <span className="text-[11px] text-stone-400 group-hover:text-stone-200">
                      CPC Youths TV
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Embedded Google Map Preview */}
            <div className="bento-card overflow-hidden h-64 sm:h-72 relative">
              <iframe
                title="CSI KCD Christha Prabhalaya Church Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0421856503867!2d77.58240157454844!3d13.096513012128437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae190052ff86d9%3A0x8a7bc47b9b811806!2sCSI%20KCD%20Christha%20Prabhalaya%20Church!5e0!3m2!1sen!2sin!4v1787506117803!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full"
              />
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-8 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xl">
              
              <div className="space-y-1 mb-6">
                <h3 className="font-cinzel text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Send a Message to Youth Leaders
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs">
                  We reply to all inquiries, prayer requests, and fellowship questions within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Maria Joseph"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="maria@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="+91 98450 XXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Subject Topic
                  </label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm"
                  >
                    <option value="General Inquiry">General Youth Inquiry</option>
                    <option value="Joining Fellowship">Joining the Youth Fellowship</option>
                    <option value="Worship Band Auditions">Worship Band & Choir</option>
                    <option value="Event Registration Help">Upcoming Events & Camp Details</option>
                    <option value="Pastoral Guidance">Confidential Pastoral Guidance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Write your query or message here..."
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-lg gold-glow transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

                {isSubmitted && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Thank you! Your message has been sent to the youth coordinators.</span>
                  </div>
                )}
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
