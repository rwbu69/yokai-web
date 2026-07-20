import { createClient } from '@sanity/client';
import { sanityClient } from './sanity';

// ---------------------------------------------------------------------------
// Server-Only Sanity Client Configuration
// ---------------------------------------------------------------------------
// Use this client ONLY for server-side mutations or fetching draft content
// that requires the SANITY_API_TOKEN. Never import this in client-side code.

export const sanityServerClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? 'your-project-id',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION ?? '2025-02-19',
  useCdn: false,
  token: import.meta.env.SANITY_API_TOKEN,
});
