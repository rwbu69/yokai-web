/**
 * migrate-about.ts — Migrates About Us full content and Track Records to Sanity.
 * Run: bun run scripts/migrations/migrate-about.ts
 */
import { client, log, ok, fail, warn } from './_client';

export async function migrateAbout() {
  log('\n📖 Migrating: About Us');

  try {
    await client.createOrReplace({
      _id:  'about-us-singleton',
      _type: 'aboutUs',

      // Hero Section
      heroLabel: 'About Us',
      heroLine1: 'We Are Not',
      heroLine2: 'Fans.',
      heroSub: 'We are the ceremony. Every waza, every formation, every synchronized breath on stage is a declaration — not a performance.',
      heroFooterText: 'Yogyakarta · Wotagei',

      // Our Story Section
      storyTitle: 'Our Story',
      storyMainStatement: 'Born from the underground Wotagei scene in Yogyakarta, YOKAI was built on a single principle: the wand is not an accessory — it is a weapon.',
      storySubStatement: 'We took the discipline of fanbase culture and turned it into performance art. No shortcuts, no stages handed to us — twelve individuals committed to mastery, and to each other.',

      // Track Record Section
      trackRecordHeader: 'Track Record',
      trackRecords: [
        {
          _key: 'tr-1',
          event: 'Wotagei National Invitational',
          date: 'Dec 2024',
          achievement: 'Finalist — Top 8 Nationally',
          description: 'Competed against 32 teams from across Indonesia. Showcased our signature Roman-Densha combination in both qualifying and elimination rounds, advancing to the final 8.',
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
          _key: 'tr-2',
          event: 'Jogja Idol Festival 2024',
          date: 'Aug 2024',
          achievement: 'Best Formation Award',
          description: 'Recognized for outstanding synchronized formation work in the group performance category. One of three awards distributed among all competing groups.',
        },
        {
          _key: 'tr-3',
          event: 'Wotagei Open Competition',
          date: 'Apr 2024',
          achievement: '2nd Place — Group Division',
          description: 'Open regional competition. Performed a 4-minute original routine combining Roman, Mix, and Smile Gakuen. Narrowly missed 1st place by a single judge vote.',
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
          _key: 'tr-4',
          event: 'Wota Jogja Open',
          date: 'Nov 2023',
          achievement: '1st Place',
          description: 'Home ground victory. Delivered a clean, high-energy performance under pressure and took first place in the main competition category for the first time.',
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
          _key: 'tr-5',
          event: 'Kolaborasi Budaya DIY',
          date: 'Jun 2023',
          achievement: 'Invited Performance',
          description: 'Selected as one of five Yogyakarta-based performance groups for the annual cultural showcase. Performed a 7-minute set bridging traditional and contemporary aesthetics.',
        },
        {
          _key: 'tr-6',
          event: 'Anisong Night Yogyakarta',
          date: 'Feb 2023',
          achievement: 'Invited Performance',
          description: 'Featured as the opening act for the annual anisong concert series. First major indoor venue performance with approximately 800 attendees.',
        },
        {
          _key: 'tr-7',
          event: 'Wotagei Exhibition · Malioboro',
          date: 'Oct 2022',
          achievement: 'Featured Team',
          description: 'One of two teams selected for a public exhibition at Malioboro. Five back-to-back sets across the day, reaching an estimated 2,000+ passersby.',
        },
        {
          _key: 'tr-8',
          event: 'Perdana Showcase Yogyakarta',
          date: 'Mar 2022',
          achievement: 'Debut Performance',
          description: 'The first public appearance of Yokai Wotagei as a unit. A 3-minute set at a local anime community event. The beginning of everything.',
        },
      ],

      // Contact Section
      contactHeading: 'Find Us.',
      contactSub: 'Follow our journey, catch our next performance, or reach out directly.',
      socialLinks: [
        { _key: 'soc-1', platform: 'INSTAGRAM', handle: '@yokaiwotagei', href: 'https://instagram.com/yokaiwotagei' },
        { _key: 'soc-2', platform: 'YOUTUBE', handle: 'Yokai Wotagei Official', href: 'https://youtube.com/@yokaiwotagei' },
        { _key: 'soc-3', platform: 'X / TWITTER', handle: '@yokaiwotagei', href: 'https://x.com/yokaiwotagei' },
        { _key: 'soc-4', platform: 'TIKTOK', handle: '@yokaiwotagei', href: 'https://tiktok.com/@yokaiwotagei' },
      ],
      contactEmail: 'yokai.wotagei@gmail.com',
    });

    ok('About Us singleton created with full content & Track Records');
    warn('JANGAN LUPA: Upload manual 8 gambar Track Record ke Sanity Studio!');
  } catch (err: unknown) {
    fail(`About Us: ${err instanceof Error ? err.message : err}`);
  }
}

// Allow running standalone
if (import.meta.url === `file://${process.argv[1]}`) {
  import('dotenv/config');
  await migrateAbout();
}
