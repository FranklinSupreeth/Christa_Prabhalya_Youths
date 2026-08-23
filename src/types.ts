export interface BibleVerse {
  id: string;
  reference: string;
  book: string;
  chapter: number;
  verse: number | string;
  text: string;
  translation: string;
  theme: 'Youth & Purpose' | 'Faith & Courage' | 'Hope & Healing' | 'Wisdom & Guidance' | 'Love & Unity' | 'Peace & Comfort';
  reflection?: string;
  dateKey?: string;
}

export interface YouthActivity {
  id: string;
  title: string;
  subtitle: string;
  category: 'Worship' | 'The Word' | 'Prayer' | 'Fellowship' | 'Outreach' | 'Recreation';
  schedule: string;
  time: string;
  location: string;
  leader: string;
  description: string;
  highlights: string[];
  icon: string;
  tag: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  theme: string;
  date: string;
  formattedDate: string;
  time: string;
  venue: string;
  category: 'Camp & Retreat' | 'Worship Night' | 'Bible & Quiz' | 'Outreach' | 'Sports & Social';
  description: string;
  agenda: { time: string; activity: string }[];
  isUpcoming: boolean;
  featured: boolean;
  registrationOpen: boolean;
  totalSeats?: number;
  registeredCount?: number;
  speakers?: string[];
  imagePlaceholder?: string;
}

export interface DevotionalResource {
  id: string;
  title: string;
  passage: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  content: string[];
  reflectionQuestions: string[];
  prayer: string;
}

export interface PrayerTopic {
  id: string;
  title: string;
  scripture: string;
  category: 'Youth Revival' | 'Exams & Careers' | 'Families & Healing' | 'Church & Nations' | 'Spiritual Growth';
  description: string;
  prayCount: number;
}

export interface UserPrayerRequest {
  id: string;
  name: string;
  isAnonymous: boolean;
  category: string;
  request: string;
  date: string;
  prayCount: number;
}

export interface YouthMemberRegistration {
  id: string;
  fullName: string;
  age: number;
  phone: string;
  email: string;
  area: string;
  ministryInterests: string[];
  confirmInterest: boolean;
  registeredAt: string;
}

export interface LeadershipMember {
  name: string;
  role: string;
  favoriteVerse: string;
  bio: string;
  contactHint: string;
}
