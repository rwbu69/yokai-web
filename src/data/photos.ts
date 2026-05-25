// src/data/photos.ts
import p1 from '../assets/photos/1.webp';
import p2 from '../assets/photos/2.webp';
import p3 from '../assets/photos/3.webp';
import p4 from '../assets/photos/4.webp';

export interface PhotoEvent {
  id: string;
  eventName: string;
  date: string;
  coverImage: string;
  images: string[];
  caption?: string;
}

export const photoEvents: PhotoEvent[] = [
  {
    id: 'zepp-jakarta-2026',
    eventName: 'ZEPP JAKARTA: THE FIRST RITUAL',
    date: 'DEC 2026',
    coverImage: p1.src,
    images: [p2.src, p3.src, p4.src],
    caption: 'Our biggest solo stage. A culmination of sweat, tears, and unfiltered emotion.'
  },
  {
    id: 'underground-fes-4',
    eventName: 'UNDERGROUND FES VOL.4',
    date: 'SEP 2026',
    coverImage: p2.src,
    images: [p1.src, p3.src, p4.src],
    caption: 'Taking over Shibuya. The raw energy of the underground scene in Tokyo.'
  },
  {
    id: 'anisong-matsuri-26',
    eventName: 'ANISONG MATSURI',
    date: 'MAY 2026',
    coverImage: p3.src,
    images: [p1.src, p2.src, p4.src],
    caption: 'JIExpo Kemayoran shook with the light of a thousand blades.'
  },
  {
    id: 'waza-shoot-1',
    eventName: 'WAZA SHOOTING #01',
    date: 'FEB 2026',
    coverImage: p4.src,
    images: [p1.src, p2.src, p3.src],
  },
  // Duplicates to reach 8 items for pagination testing
  {
    id: 'zepp-jakarta-2026-pt2',
    eventName: 'ZEPP JAKARTA: BACKSTAGE',
    date: 'DEC 2026',
    coverImage: p2.src,
    images: [p1.src, p3.src, p4.src],
  },
  {
    id: 'underground-fes-4-pt2',
    eventName: 'UNDERGROUND FES: AFTERPARTY',
    date: 'SEP 2026',
    coverImage: p3.src,
    images: [p1.src, p2.src, p4.src],
  },
  {
    id: 'anisong-matsuri-26-pt2',
    eventName: 'ANISONG MATSURI: MEET & GREET',
    date: 'MAY 2026',
    coverImage: p4.src,
    images: [p1.src, p2.src, p3.src],
  },
  {
    id: 'waza-shoot-1-pt2',
    eventName: 'WAZA SHOOTING: B-ROLL',
    date: 'FEB 2026',
    coverImage: p1.src,
    images: [p2.src, p3.src, p4.src],
  }
];
