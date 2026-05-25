import placeholderGif from '../assets/videos/placeholder.gif';

export interface VideoItem {
  id: string;
  title: string;
  date: string;
  gif: string;
  link: string;
  caption?: string;
}

export const videos: VideoItem[] = [
  {
    id: 'waza-showcase-1',
    title: 'MURAMASA WAZA SHOWCASE',
    date: 'JAN 2027',
    gif: placeholderGif.src,
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    caption: 'Demonstration of the new Muramasa dual-wielding technique.'
  },
  {
    id: 'live-zepp-highlights',
    title: 'ZEPP STAGE HIGHLIGHTS',
    date: 'DEC 2026',
    gif: placeholderGif.src,
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'practice-session-04',
    title: 'STUDIO SESSION #04',
    date: 'NOV 2026',
    gif: placeholderGif.src,
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    caption: 'Raw practice footage preparing for the Tokyo underground circuit.'
  },
  {
    id: 'collab-waza',
    title: 'GUEST COLLAB: TOKYO TEAM',
    date: 'OCT 2026',
    gif: placeholderGif.src,
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  // Duplicates to reach 8 items
  {
    id: 'waza-showcase-2',
    title: 'AMATERASU WAZA SHOWCASE',
    date: 'SEP 2026',
    gif: placeholderGif.src,
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'live-underground-highlights',
    title: 'UNDERGROUND HIGHLIGHTS',
    date: 'AUG 2026',
    gif: placeholderGif.src,
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'practice-session-05',
    title: 'STUDIO SESSION #05',
    date: 'JUL 2026',
    gif: placeholderGif.src,
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'collab-waza-2',
    title: 'GUEST COLLAB: OSAKA TEAM',
    date: 'JUN 2026',
    gif: placeholderGif.src,
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
];
