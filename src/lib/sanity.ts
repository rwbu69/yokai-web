/**
 * src/lib/sanity.ts
 *
 * Single entry point for all Sanity CMS connections.
 * All components should import from here — never directly from @sanity/client.
 *
 * Usage:
 *   import { sanityClient, urlFor, getMembers } from '@lib/sanity';
 *
 * To add a new query:
 *   1. Define a TypeScript interface for the document type below.
 *   2. Write a typed GROQ query function following the existing pattern.
 *   3. Export it from this file.
 */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// ---------------------------------------------------------------------------
// Client Configuration
// ---------------------------------------------------------------------------

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? 'your-project-id',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION ?? '2025-02-19',
  // IMPORTANT: useCdn MUST be false for build-time fetches to always get fresh data.
  // CDN may serve stale content up to ~60 seconds behind Sanity's Content Lake.
  useCdn: false,
  token: import.meta.env.SANITY_API_TOKEN, // only needed for mutations / drafts
});

// ---------------------------------------------------------------------------
// Image URL Builder
// ---------------------------------------------------------------------------

const builder = imageUrlBuilder(sanityClient);

/**
 * Build a Sanity image URL with optional transformations.
 * Example: urlFor(image).width(800).format('webp').url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ---------------------------------------------------------------------------
// TypeScript Interfaces — Sanity Document Types
// ---------------------------------------------------------------------------

/** Sanity image reference with optional alt text */
export interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  hotspot?: { x: number; y: number };
  alt?: string;
}

/** Sanity Portable Text block */
export interface SanityBlock {
  _type: 'block';
  _key: string;
  children: Array<{ _type: 'span'; text: string; marks?: string[] }>;
  markDefs?: Array<{ _type: string; _key: string; href?: string }>;
  style?: string;
}

/** Member document */
export interface SanityMember {
  _id: string;
  _type: 'member';
  name: string;
  role: string;
  image: SanityImage;
  bio: string;
  description?: string;
  joinedDate?: string;
}

/** Live Performance document */
export interface SanityLivePerformance {
  _id: string;
  _type: 'livePerformance';
  title: string;
  youtubeUrl: string;
  date: string;
  location: string;
  description?: string;
}

/** Project document */
export interface SanityProject {
  _id: string;
  _type: 'project';
  title: string;
  youtubeUrl: string;
  description: string;
  releaseDate?: string;
  image?: SanityImage;
}

/** Merch Item document */
export interface SanityMerchItem {
  _id: string;
  _type: 'shopItem';
  title: string;
  category: 'merch';
  price: number;
  image: SanityImage;
  images?: SanityImage[];
  description?: string;
  variants?: string[];
  available: boolean;
  slug: { current: string };
}

/** Cheki Item document */
export interface SanityChekiItem {
  _id: string;
  _type: 'shopItem';
  title: string;
  category: 'cheki';
  price: number;
  image: SanityImage;
  description?: string;
  available: boolean;
  memberName?: string;
}

/** Cheki Config singleton document */
export interface SanityChekiConfig {
  _id: string;
  _type: 'chekiConfig';
  isOpen: boolean;
  closedMessage: string;
}

/** Photo Event document */
export interface SanityPhotoEvent {
  _id: string;
  _type: 'photoEvent';
  eventName: string;
  date: string;
  coverImage: SanityImage;
  images: SanityImage[];
  caption?: string;
}

/** Video Item document */
export interface SanityVideoItem {
  _id: string;
  _type: 'videoItem';
  title: string;
  date: string;
  /** Resolved URL dari videoAsset (file GIF atau WebM yang diupload ke Sanity) */
  videoUrl?: string;
  /** Tipe file animasi: 'gif' atau 'webm'. Null jika tidak diset. */
  videoType?: 'gif' | 'webm';
  /** Gambar statis untuk preview sebelum hover (thumbnail) */
  thumbnail?: SanityImage;
  /** Legacy: GIF image preview (deprecated — gunakan videoAsset + videoType) */
  thumbnailGif?: SanityImage;
  /** URL YouTube untuk video yang hanya punya link eksternal */
  youtubeUrl?: string;
  /** Alias untuk youtubeUrl — digunakan sebagai link href di komponen */
  link?: string;
  caption?: string;
}

/** Waza document (Original Waza & Wotagei Waza) */
export interface SanityWaza {
  _id: string;
  _type: 'waza';
  title: string;
  wazaType: 'originalMember' | 'wotagei';
  slug: { current: string };
  description: string;
  coverImage?: SanityImage;
  date: string;
  tags?: string[];
  body?: SanityBlock[];
}

/** Article document */
export interface SanityArticle {
  _id: string;
  _type: 'article';
  title: string;
  slug: { current: string };
  description: string;
  coverImage?: SanityImage;
  date: string;
  tags?: string[];
  body?: SanityBlock[];
  draft: boolean;
}

/** Update / News document */
export interface SanityUpdate {
  _id: string;
  _type: 'update';
  title: string;
  slug: { current: string };
  excerpt: string;
  date: string;
  category: 'news' | 'event' | 'announcement' | 'performance';
  image?: SanityImage;
  content?: SanityBlock[];
  tags?: string[];
}

/** About Us document */
export interface SanityAboutUs {
  _id: string;
  _type: 'aboutUs';
  title: string;
  heroText?: string;
  content: SanityBlock[];
  image?: SanityImage;
  trackRecord?: Array<{
    eventName: string;
    date: string;
    position?: string;
    image?: SanityImage;
    description?: string;
    youtubeUrl?: string;
  }>;
}

/** Hero Images document */
export interface SanityHeroImages {
  _id: string;
  _type: 'heroImages';
  title: string;
  imageSets: Array<{
    setName: string;
    images: SanityImage[];
  }>;
}

// ---------------------------------------------------------------------------
// GROQ Query Functions
// ---------------------------------------------------------------------------
// All queries are designed to run at BUILD TIME in Astro frontmatter.
// DO NOT call these in client-side <script> blocks.
// ---------------------------------------------------------------------------

/** Fetch all published members */
export async function getMembers(): Promise<SanityMember[]> {
  return sanityClient.fetch<SanityMember[]>(
    `*[_type == "member"] | order(_createdAt asc) {
      _id, _type, name, role, image, bio, description, joinedDate
    }`
  );
}

/** Fetch all live performances, sorted by date descending */
export async function getLivePerformances(): Promise<SanityLivePerformance[]> {
  return sanityClient.fetch<SanityLivePerformance[]>(
    `*[_type == "livePerformance"] | order(date desc) {
      _id, _type, title, youtubeUrl, date, location, description
    }`
  );
}

/** Fetch all projects, sorted by release date descending */
export async function getProjects(): Promise<SanityProject[]> {
  return sanityClient.fetch<SanityProject[]>(
    `*[_type == "project"] | order(releaseDate desc) {
      _id, _type, title, youtubeUrl, description, releaseDate, image
    }`
  );
}

/** Fetch all published merch items */
export async function getMerchItems(): Promise<SanityMerchItem[]> {
  return sanityClient.fetch<SanityMerchItem[]>(
    `*[_type == "shopItem" && category == "merch"] | order(_createdAt asc) {
      _id, _type, title, category, price, image, images, description, variants, available, slug
    }`
  );
}

/** Fetch all cheki items */
export async function getChekiItems(): Promise<SanityChekiItem[]> {
  return sanityClient.fetch<SanityChekiItem[]>(
    `*[_type == "shopItem" && category == "cheki"] | order(_createdAt asc) {
      _id, _type, title, category, price, image, description, available, memberName
    }`
  );
}

/**
 * Fetch cheki open/closed config.
 * This query is designed for real-time fetching (no CDN cache) because
 * the cheki status must always be accurate.
 * Usage: call with { useCdn: false } client override if needed.
 */
export async function getChekiConfig(): Promise<SanityChekiConfig | null> {
  return sanityClient.fetch<SanityChekiConfig | null>(
    `*[_type == "chekiConfig"][0] { _id, _type, isOpen, closedMessage }`
  );
}

/** Fetch all photo events, sorted by date descending */
export async function getPhotoEvents(): Promise<SanityPhotoEvent[]> {
  return sanityClient.fetch<SanityPhotoEvent[]>(
    `*[_type == "photoEvent"] | order(date desc) {
      _id, _type, eventName, date, coverImage, images, caption
    }`
  );
}

/** Fetch all video items, sorted by date descending */
export async function getVideoItems(): Promise<SanityVideoItem[]> {
  return sanityClient.fetch<SanityVideoItem[]>(
    `*[_type == "videoItem"] | order(date desc) {
      _id,
      _type,
      title,
      date,
      "videoUrl": videoAsset.asset->url,
      videoType,
      thumbnail,
      thumbnailGif,
      youtubeUrl,
      caption
    }`
  );
}

/** Fetch all Original Waza entries */
export async function getOriginalWaza(): Promise<SanityWaza[]> {
  return sanityClient.fetch<SanityWaza[]>(
    `*[_type == "waza" && wazaType == "originalMember"] | order(date desc) {
      _id, _type, title, wazaType, slug, description, coverImage, date, tags
    }`
  );
}

/** Fetch all Wotagei Waza entries */
export async function getWotageWaza(): Promise<SanityWaza[]> {
  return sanityClient.fetch<SanityWaza[]>(
    `*[_type == "waza" && wazaType == "wotagei"] | order(date desc) {
      _id, _type, title, wazaType, slug, description, coverImage, date, tags
    }`
  );
}

/** Fetch a single Waza by slug (for detail pages) */
export async function getWazaBySlug(slug: string): Promise<SanityWaza | null> {
  return sanityClient.fetch<SanityWaza | null>(
    `*[_type == "waza" && slug.current == $slug][0] {
      _id, _type, title, wazaType, slug, description, coverImage, date, tags, body
    }`,
    { slug }
  );
}

/** Fetch all published articles */
export async function getArticles(): Promise<SanityArticle[]> {
  return sanityClient.fetch<SanityArticle[]>(
    `*[_type == "article" && draft != true] | order(date desc) {
      _id, _type, title, slug, description, coverImage, date, tags
    }`
  );
}

/** Fetch a single Article by slug */
export async function getArticleBySlug(slug: string): Promise<SanityArticle | null> {
  return sanityClient.fetch<SanityArticle | null>(
    `*[_type == "article" && slug.current == $slug && draft != true][0] {
      _id, _type, title, slug, description, coverImage, date, tags, body, draft
    }`,
    { slug }
  );
}

/** Fetch all published updates, sorted by date descending */
export async function getUpdates(): Promise<SanityUpdate[]> {
  return sanityClient.fetch<SanityUpdate[]>(
    `*[_type == "update"] | order(date desc) {
      _id, _type, title, slug, excerpt, date, category, image, tags
    }`
  );
}

/** Fetch a single Update by slug */
export async function getUpdateBySlug(slug: string): Promise<SanityUpdate | null> {
  return sanityClient.fetch<SanityUpdate | null>(
    `*[_type == "update" && slug.current == $slug][0] {
      _id, _type, title, slug, excerpt, date, category, image, content, tags
    }`,
    { slug }
  );
}

/** Fetch the About Us content */
export async function getAboutUs(): Promise<SanityAboutUs | null> {
  return sanityClient.fetch<SanityAboutUs | null>(
    `*[_type == "aboutUs"][0] {
      _id, _type, title, heroText, content, image, trackRecord
    }`
  );
}

/** Fetch hero image sets */
export async function getHeroImages(): Promise<SanityHeroImages | null> {
  return sanityClient.fetch<SanityHeroImages | null>(
    `*[_type == "heroImages"][0] {
      _id, _type, title, imageSets
    }`
  );
}
