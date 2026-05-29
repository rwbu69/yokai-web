// src/components/members/members.ts

import img1  from '../../assets/hero-images/1.webp';
import img2  from '../../assets/hero-images/2.webp';
import img3  from '../../assets/hero-images/3.webp';
import img4  from '../../assets/hero-images/4.webp';
import img5  from '../../assets/hero-images/5.webp';
import img6  from '../../assets/hero-images/6.webp';
import img7  from '../../assets/hero-images/7.webp';
import img8  from '../../assets/hero-images/8.webp';
import img9  from '../../assets/hero-images/9.webp';
import img10 from '../../assets/hero-images/10.webp';
import img11 from '../../assets/hero-images/11.webp';
import img12 from '../../assets/hero-images/12.webp';

// ── Internal shape (no socials duplication) ─────────────────────────
interface RawMember {
  id:               number;
  initials:         string;
  firstName:        string;
  
  role:             string;
  tenure:           string;
  city:             string;
  tags:             [string, string];
  quote:            string;
  favoriteWaza: string[];      // teknik wotagei favorit
  favoriteUchishi: string[];      // partner / uchishi favorit
  instagram?:       string;      // handle tanpa @
  twitter?:         string;      // handle tanpa @
  gallery:          [string, string, string, string];
  photo:            string;
}

// ── Public shape: adds computed socials for MembersPage.astro compat ─
export interface Member extends RawMember {
  socials: { instagram?: string; twitter?: string; };
}

// ── Raw data ─────────────────────────────────────────────────────────
const raw: RawMember[] = [
  {
    id: 1, initials: 'AR', firstName: 'Arata', role: 'Center / Lead Performer', tenure: '4y', city: 'Yogyakarta',
    tags: ['Wotagei', 'Center'],
    quote: 'The stage is not where I perform. It is where I become.',
    favoriteWaza: [''], favoriteUchishi: [''],
    instagram: 'arata.mizuki', twitter: 'arata_mk',
    gallery: ['https://picsum.photos/seed/1a/400/600','https://picsum.photos/seed/1b/400/600','https://picsum.photos/seed/1c/400/600','https://picsum.photos/seed/1d/400/600'],
    photo: img1.src,
  },
  {
    id: 2, initials: 'RY', firstName: 'Ryusei', role: 'Sub-Leader / Lighting Sync', tenure: '4y', city: 'Sleman',
    tags: ['Light Sync', 'Stage'],
    quote: 'Light is choreography you cannot see — but always feel.',
    favoriteWaza: [''], favoriteUchishi: [''],
    instagram: 'ryusei.kanda', twitter: 'ryusei_k',
    gallery: ['https://picsum.photos/seed/2a/400/600','https://picsum.photos/seed/2b/400/600','https://picsum.photos/seed/2c/400/600','https://picsum.photos/seed/2d/400/600'],
    photo: img2.src,
  },
  {
    id: 3, initials: 'KT', firstName: 'Kaito', role: 'Sound Designer', tenure: '3y', city: 'Bantul',
    tags: ['Sound', 'Production'],
    quote: "I don't mix tracks. I construct the emotional architecture of a show.",
    favoriteWaza: [''], favoriteUchishi: [''],
    instagram: 'kaito.hino', twitter: 'kaito_snd',
    gallery: ['https://picsum.photos/seed/3a/400/600','https://picsum.photos/seed/3b/400/600','https://picsum.photos/seed/3c/400/600','https://picsum.photos/seed/3d/400/600'],
    photo: img3.src,
  },
  {
    id: 4, initials: 'SR', firstName: 'Sora', role: 'Visual Director', tenure: '3y', city: 'Yogyakarta',
    tags: ['Visual', 'Costume'],
    quote: 'Every color we wear is a decision. Every silhouette is a statement.',
    favoriteWaza: [''], favoriteUchishi: [''],
    instagram: 'sora.yuki',
    gallery: ['https://picsum.photos/seed/4a/400/600','https://picsum.photos/seed/4b/400/600','https://picsum.photos/seed/4c/400/600','https://picsum.photos/seed/4d/400/600'],
    photo: img4.src,
  },
  {
    id: 5, initials: 'HR', firstName: 'Haru', role: 'Performer', tenure: '2y', city: 'Klaten',
    tags: ['Wotagei', 'Formation'],
    quote: 'Raw power is nothing without control. I learned both the hard way.',
    favoriteWaza: [''], favoriteUchishi: [''],
    instagram: 'haru.nishi', twitter: 'haru_wotage',
    gallery: ['https://picsum.photos/seed/5a/400/600','https://picsum.photos/seed/5b/400/600','https://picsum.photos/seed/5c/400/600','https://picsum.photos/seed/5d/400/600'],
    photo: img5.src,
  },
  {
    id: 6, initials: 'NG', firstName: 'Nagi', role: 'Performer', tenure: '1y', city: 'Sleman',
    tags: ['Dance', 'Expression'],
    quote: 'Contemporary dance taught me that fluidity is a form of strength.',
    favoriteWaza: [''], favoriteUchishi: [''],
    instagram: 'nagi.sato.dance',
    gallery: ['https://picsum.photos/seed/6a/400/600','https://picsum.photos/seed/6b/400/600','https://picsum.photos/seed/6c/400/600','https://picsum.photos/seed/6d/400/600'],
    photo: img6.src,
  },
  {
    id: 7, initials: 'RN', firstName: 'Ren', role: 'Choreographer', tenure: '3y', city: 'Yogyakarta',
    tags: ['Choreo', 'Formation'],
    quote: 'A formation is a conversation between bodies. I write the sentences.',
    favoriteWaza: [''], favoriteUchishi: [''],
    instagram: 'ren.asahi', twitter: 'ren_asahi',
    gallery: ['https://picsum.photos/seed/7a/400/600','https://picsum.photos/seed/7b/400/600','https://picsum.photos/seed/7c/400/600','https://picsum.photos/seed/7d/400/600'],
    photo: img7.src,
  },
  {
    id: 8, initials: 'KE', firstName: 'Kei', role: 'Performer / Prop Designer', tenure: '2y', city: 'Bantul',
    tags: ['Props', 'Design'],
    quote: 'The wand is an extension of intent. If your mind is wrong, the blade knows.',
    favoriteWaza: [''], favoriteUchishi: [''],
    instagram: 'kei.mori.props', twitter: 'kei_props',
    gallery: ['https://picsum.photos/seed/8a/400/600','https://picsum.photos/seed/8b/400/600','https://picsum.photos/seed/8c/400/600','https://picsum.photos/seed/8d/400/600'],
    photo: img8.src,
  },
  {
    id: 9, initials: 'TM', firstName: 'Tomo', role: 'Stage Director', tenure: '4y', city: 'Yogyakarta',
    tags: ['Stage', 'Direction'],
    quote: 'Nothing on our stage is accidental. Every shadow has a reason.',
    favoriteWaza: [''], favoriteUchishi: [''],
    instagram: 'tomo.abe', twitter: 'tomo_stage',
    gallery: ['https://picsum.photos/seed/9a/400/600','https://picsum.photos/seed/9b/400/600','https://picsum.photos/seed/9c/400/600','https://picsum.photos/seed/9d/400/600'],
    photo: img9.src,
  },
  {
    id: 10, initials: 'IZ', firstName: 'Izuki', role: 'Performer / Media', tenure: '2y', city: 'Sleman',
    tags: ['Media', 'Documentation'],
    quote: 'My lens chases the moment the body forgets it is being watched.',
    favoriteWaza: [''], favoriteUchishi: [''],
    instagram: 'izuki.hara', twitter: 'izuki_docs',
    gallery: ['https://picsum.photos/seed/10a/400/600','https://picsum.photos/seed/10b/400/600','https://picsum.photos/seed/10c/400/600','https://picsum.photos/seed/10d/400/600'],
    photo: img10.src,
  },
  {
    id: 11, initials: 'SH', firstName: 'Shiro', role: 'Performer', tenure: '1y', city: 'Klaten',
    tags: ['Wotagei', 'Energy'],
    quote: 'Still sharpening. But the edge is already there.',
    favoriteWaza: [''], favoriteUchishi: [''],
    instagram: 'shiro.toda',
    gallery: ['https://picsum.photos/seed/11a/400/600','https://picsum.photos/seed/11b/400/600','https://picsum.photos/seed/11c/400/600','https://picsum.photos/seed/11d/400/600'],
    photo: img11.src,
  },
  {
    id: 12, initials: 'YR', firstName: 'Yoru', role: 'Composer / Arranger', tenure: '3y', city: 'Yogyakarta',
    tags: ['Composition', 'Sound'],
    quote: 'Music is invisible choreography. It moves the body before the mind knows.',
    favoriteWaza: [''], favoriteUchishi: [''],
    instagram: 'yoru.kase', twitter: 'yoru_kase',
    gallery: ['https://picsum.photos/seed/12a/400/600','https://picsum.photos/seed/12b/400/600','https://picsum.photos/seed/12c/400/600','https://picsum.photos/seed/12d/400/600'],
    photo: img12.src,
  },
];

// ── Export: compute socials for MembersPage.astro backward compat ─────
// setSocial('instagram', m.socials.instagram, ...) in the orchestration
// script still works without touching MembersPage.astro.
export const members: Member[] = raw.map(m => ({
  ...m,
  socials: { instagram: m.instagram, twitter: m.twitter },
}));
