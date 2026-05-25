/**
 * migrate-members.ts — Migrates all 12 members to Sanity with full data.
 *
 * Photos require manual upload via Studio (see MIGRATION-IMAGES.md).
 * Gallery images also require manual upload — script sets placeholder URLs
 * and logs which member needs which photos.
 *
 * Run: bun run scripts/migrations/migrate-members.ts
 */
import { client, log, ok, fail, warn } from './_client';

// Full member data mirrored from src/components/members/members.ts
const members = [
  {
    id: 'member-arata-mizuki', sortOrder: 1,
    name: 'Arata Mizuki', firstName: 'Arata', lastName: 'Mizuki', initials: 'AR',
    role: 'Center / Lead Performer', tenure: '4y', city: 'Yogyakarta',
    tags: ['Wotagei', 'Center'],
    quote: 'The stage is not where I perform. It is where I become.',
    favoriteWaza: 'Roman', favoriteUchishi: 'Ryusei',
    instagram: 'arata.mizuki', twitter: 'arata_mk',
  },
  {
    id: 'member-ryusei-kanda', sortOrder: 2,
    name: 'Ryusei Kanda', firstName: 'Ryusei', lastName: 'Kanda', initials: 'RY',
    role: 'Sub-Leader / Lighting Sync', tenure: '4y', city: 'Sleman',
    tags: ['Light Sync', 'Stage'],
    quote: 'Light is choreography you cannot see — but always feel.',
    favoriteWaza: 'Smile Gakuen', favoriteUchishi: 'Arata',
    instagram: 'ryusei.kanda', twitter: 'ryusei_k',
  },
  {
    id: 'member-kaito-hino', sortOrder: 3,
    name: 'Kaito Hino', firstName: 'Kaito', lastName: 'Hino', initials: 'KT',
    role: 'Sound Designer', tenure: '3y', city: 'Bantul',
    tags: ['Sound', 'Production'],
    quote: "I don't mix tracks. I construct the emotional architecture of a show.",
    favoriteWaza: 'OAD', favoriteUchishi: 'Tomo',
    instagram: 'kaito.hino', twitter: 'kaito_snd',
  },
  {
    id: 'member-sora-yuki', sortOrder: 4,
    name: 'Sora Yuki', firstName: 'Sora', lastName: 'Yuki', initials: 'SR',
    role: 'Visual Director', tenure: '3y', city: 'Yogyakarta',
    tags: ['Visual', 'Costume'],
    quote: 'Every color we wear is a decision. Every silhouette is a statement.',
    favoriteWaza: 'Furifu', favoriteUchishi: 'Nagi',
    instagram: 'sora.yuki',
  },
  {
    id: 'member-haru-nishi', sortOrder: 5,
    name: 'Haru Nishi', firstName: 'Haru', lastName: 'Nishi', initials: 'HR',
    role: 'Performer', tenure: '2y', city: 'Klaten',
    tags: ['Wotagei', 'Formation'],
    quote: 'Raw power is nothing without control. I learned both the hard way.',
    favoriteWaza: 'Densha', favoriteUchishi: 'Ren',
    instagram: 'haru.nishi', twitter: 'haru_wotage',
  },
  {
    id: 'member-nagi-sato', sortOrder: 6,
    name: 'Nagi Sato', firstName: 'Nagi', lastName: 'Sato', initials: 'NG',
    role: 'Performer', tenure: '1y', city: 'Sleman',
    tags: ['Dance', 'Expression'],
    quote: 'Contemporary dance taught me that fluidity is a form of strength.',
    favoriteWaza: 'PPP', favoriteUchishi: 'Sora',
    instagram: 'nagi.sato.dance',
  },
  {
    id: 'member-ren-asahi', sortOrder: 7,
    name: 'Ren Asahi', firstName: 'Ren', lastName: 'Asahi', initials: 'RN',
    role: 'Choreographer', tenure: '3y', city: 'Yogyakarta',
    tags: ['Choreo', 'Formation'],
    quote: 'A formation is a conversation between bodies. I write the sentences.',
    favoriteWaza: '4ya', favoriteUchishi: 'Haru',
    instagram: 'ren.asahi', twitter: 'ren_asahi',
  },
  {
    id: 'member-kei-mori', sortOrder: 8,
    name: 'Kei Mori', firstName: 'Kei', lastName: 'Mori', initials: 'KE',
    role: 'Performer / Prop Designer', tenure: '2y', city: 'Bantul',
    tags: ['Props', 'Design'],
    quote: 'The wand is an extension of intent. If your mind is wrong, the blade knows.',
    favoriteWaza: 'MIX', favoriteUchishi: 'Izuki',
    instagram: 'kei.mori.props', twitter: 'kei_props',
  },
  {
    id: 'member-tomo-abe', sortOrder: 9,
    name: 'Tomo Abe', firstName: 'Tomo', lastName: 'Abe', initials: 'TM',
    role: 'Stage Director', tenure: '4y', city: 'Yogyakarta',
    tags: ['Stage', 'Direction'],
    quote: 'Nothing on our stage is accidental. Every shadow has a reason.',
    favoriteWaza: 'Nagashi', favoriteUchishi: 'Kaito',
    instagram: 'tomo.abe', twitter: 'tomo_stage',
  },
  {
    id: 'member-izuki-hara', sortOrder: 10,
    name: 'Izuki Hara', firstName: 'Izuki', lastName: 'Hara', initials: 'IZ',
    role: 'Performer / Media', tenure: '2y', city: 'Sleman',
    tags: ['Media', 'Documentation'],
    quote: 'My lens chases the moment the body forgets it is being watched.',
    favoriteWaza: 'PPPH', favoriteUchishi: 'Kei',
    instagram: 'izuki.hara', twitter: 'izuki_docs',
  },
  {
    id: 'member-shiro-toda', sortOrder: 11,
    name: 'Shiro Toda', firstName: 'Shiro', lastName: 'Toda', initials: 'SH',
    role: 'Performer', tenure: '1y', city: 'Klaten',
    tags: ['Wotagei', 'Energy'],
    quote: 'Still sharpening. But the edge is already there.',
    favoriteWaza: 'Roman', favoriteUchishi: 'Arata',
    instagram: 'shiro.toda',
  },
  {
    id: 'member-yoru-kase', sortOrder: 12,
    name: 'Yoru Kase', firstName: 'Yoru', lastName: 'Kase', initials: 'YR',
    role: 'Composer / Arranger', tenure: '3y', city: 'Yogyakarta',
    tags: ['Composition', 'Sound'],
    quote: 'Music is invisible choreography. It moves the body before the mind knows.',
    favoriteWaza: 'Sabi', favoriteUchishi: 'Tomo',
    instagram: 'yoru.kase', twitter: 'yoru_kase',
  },
];

export async function migrateMembers() {
  log('\n👥 Migrating: Members (12 total)');
  warn('Strip photo dan 4 gallery photos per member HARUS di-upload manual via Sanity Studio');
  warn('Lihat MIGRATION-IMAGES.md → Members section untuk panduan lengkap');

  for (const m of members) {
    const doc: Record<string, unknown> = {
      _id:  m.id,
      _type: 'member',
      name: m.name,
      firstName: m.firstName,
      lastName: m.lastName,
      initials: m.initials,
      role: m.role,
      tenure: m.tenure,
      city: m.city,
      tags: m.tags,
      quote: m.quote,
      favoriteWaza: m.favoriteWaza,
      favoriteUchishi: m.favoriteUchishi,
      sortOrder: m.sortOrder,
    };

    if (m.instagram) doc.instagram = m.instagram;
    if (m.twitter)   doc.twitter   = m.twitter;

    try {
      await client.createOrReplace(doc);
      ok(`Member [${String(m.sortOrder).padStart(2,'0')}] ${m.name} — tambahkan photo + 4 gallery di Studio`);
    } catch (e: unknown) {
      fail(`Member "${m.name}": ${e instanceof Error ? e.message : e}`);
    }
  }

  log('\n  📋 Manual upload checklist (Studio → Member → klik nama):');
  members.forEach(m => {
    log(`     □ ${m.name.padEnd(20)} → field "Strip Photo" + 4× "Gallery Photos"`);
  });
}

// Allow running standalone
if (import.meta.url === `file://${process.argv[1]}`) {
  import('dotenv/config');
  await migrateMembers();
}
