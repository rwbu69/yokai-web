# YOKAI WEB STUDIO

Proprietary web application and content management system for Yokai, an independent Wotagei performance team based in Yogyakarta.

## ARCHITECTURE

- Framework: Astro
- Styling: Tailwind CSS
- Animation: animeJS
- CMS: Sanity
- Runtime Environment: Bun
- Deployment: Cloudflare Pages

## DEVELOPMENT

Ensure you have the required environment variables configured in your `.env` file before starting the development server. Refer to the internal documentation for environment setup details.

```bash
# Install dependencies
bun install

# Start local development server
bun run dev
```

## PRODUCTION BUILD

To build the application for production deployment:

```bash
bun run build
```

The output will be generated in the `dist` directory, optimized for static hosting.

## LICENSE & COPYRIGHT

Copyright (c) 2026 Yokai. All Rights Reserved.

This repository and its contents are proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without explicit written permission from the Yokai administration team. See the LICENSE file for details.
