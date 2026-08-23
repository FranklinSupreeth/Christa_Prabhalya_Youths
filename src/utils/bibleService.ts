import { BibleVerse } from '../types';
import { BIBLE_VERSES } from '../data/churchData';

// Normalized book mapping for wldeh/bible-api
const BOOK_MAP: Record<string, string> = {
  'genesis': 'genesis',
  'exodus': 'exodus',
  'psalms': 'psalms',
  'psalm': 'psalms',
  'proverbs': 'proverbs',
  'ecclesiastes': 'ecclesiastes',
  'isaiah': 'isaiah',
  'jeremiah': 'jeremiah',
  'matthew': 'matthew',
  'mark': 'mark',
  'luke': 'luke',
  'john': 'john',
  'acts': 'acts',
  'romans': 'romans',
  '1 corinthians': '1-corinthians',
  '2 corinthians': '2-corinthians',
  'galatians': 'galatians',
  'ephesians': 'ephesians',
  'philippians': 'philippians',
  'colossians': 'colossians',
  '1 thessalonians': '1-thessalonians',
  '2 thessalonians': '2-thessalonians',
  '1 timothy': '1-timothy',
  '2 timothy': '2-timothy',
  'hebrews': 'hebrews',
  'james': 'james',
  '1 peter': '1-peter',
  '2 peter': '2-peter',
  '1 john': '1-john',
  'revelation': 'revelation',
  'joshua': 'joshua'
};

export async function fetchOnlineScripture(
  bookName: string,
  chapter: number,
  verse: number | string,
  version: 'en-asv' | 'en-kjv' | 'en-bbe' = 'en-asv'
): Promise<string | null> {
  try {
    const normalizedBook = BOOK_MAP[bookName.toLowerCase()] || bookName.toLowerCase().replace(/\s+/g, '-');
    const verseNum = typeof verse === 'string' ? parseInt(verse.split('-')[0], 10) || 1 : verse;
    const url = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${version}/books/${normalizedBook}/chapters/${chapter}/verses/${verseNum}.json`;
    
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.text || data.verse || null;
  } catch (err) {
    console.warn('Online bible-api fetch failed or timed out, using fallback scripture.', err);
    return null;
  }
}

export function getDailyVerse(dayOffset = 0): BibleVerse {
  const today = new Date();
  today.setDate(today.getDate() + dayOffset);
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const index = Math.abs(dayOfYear) % BIBLE_VERSES.length;
  
  const selected = { ...BIBLE_VERSES[index] };
  selected.dateKey = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  return selected;
}

export function getRandomVerse(excludeId?: string): BibleVerse {
  const filtered = excludeId ? BIBLE_VERSES.filter(v => v.id !== excludeId) : BIBLE_VERSES;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}

export function speakVerse(text: string, reference: string, onEnd?: () => void) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(`${reference}. "${text}"`);
  utterance.rate = 0.92;
  utterance.pitch = 1.02;
  utterance.onend = () => {
    if (onEnd) onEnd();
  };
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
