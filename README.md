# AutoRev Mobilitas Indonesia — Company Website

Production-ready bilingual company website for **AutoRev Mobilitas Indonesia**. The site presents AutoRev's EV rental service, Founding Driver program, corporate mobility offering, and RevAuto operational-system roadmap in one clear customer journey.

Production: [autorev-bisnis.vercel.app](https://autorev-bisnis.vercel.app)

## What is included

- Ten pages in Bahasa Indonesia and English, including AutoRev Driver
- App Router locale structure with `/id` as the default redirect and `/en` alternative
- Simplified rental-first homepage with cinematic scroll storytelling
- Animated mega-menu, page transitions, service marquee, sticky ecosystem journey, network map, and contact dock
- Structured Rev AI demo and code-native product previews
- Native product previews for customer app, business dashboard, ecosystem, and partner network
- Five lead flows: rental, business/fleet, driver, service partner, and strategic partner
- Shared Zod validation, React Hook Form, honeypot, payload limit, in-memory rate limiting, and secure webhook delivery
- One Google Sheets lead tracker with Dashboard plus dedicated tabs for each business line
- Premium registration receipt with reference number, seven-day follow-up expectation, and WhatsApp delivery status
- Meta WhatsApp Business template automation with a safe manual-follow-up fallback
- Server-rendered metadata, canonical URLs, language alternatives, Open Graph, X card, Organization JSON-LD, sitemap, and robots
- Reduced-motion support, keyboard states, semantic structure, and mobile navigation
- Official AutoRev logos supplied by the founder plus an original generated automotive hero
- Official call/WhatsApp `0813 6740 8145` and email `jonathanfarelemanuel@gmail.com`

## Technology

- Next.js `16.2.10` with App Router and Turbopack
- React / React DOM `19.2.7`
- TypeScript `6.0.3`
- Tailwind CSS `4.3.2` with a project-specific token and component layer
- Framer Motion `12.42.2`
- React Hook Form `7.81.0`, Zod `4.4.3`, and `@hookform/resolvers`
- Lucide React icons
- Manrope through `next/font` (self-hosted in the production output)

The lockfile overrides Next.js' nested PostCSS dependency to `8.5.10`, resolving the advisory reported against older PostCSS versions. `npm audit` reports zero known vulnerabilities at handoff.

## Run locally

Requirements: Node.js `20.9.0` or newer and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`; the root redirects to `http://localhost:3000/id`.

Production verification:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Environment variables

Copy [`.env.example`](./.env.example) to `.env.local`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical site origin without a trailing slash |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional override | Digits only; defaults to the confirmed `6281367408145` |
| `LEAD_WEBHOOK_URL` | Production forms | Deployed Google Apps Script `/exec` URL that persists and routes lead submissions |
| `LEAD_WEBHOOK_SECRET` | Production forms | Server-only secret shared with the Apps Script webhook |
| `NEXT_PUBLIC_ANALYTICS_ID` | Optional | Reserved for a consent-aware analytics integration |

### Lead safety behavior

The production API **returns `503` when `LEAD_WEBHOOK_URL` is missing**. This is intentional: it prevents the UI from claiming success when no lead storage is connected. In development, valid requests return `202` for local UI testing. Do not put a webhook secret in any `NEXT_PUBLIC_` variable.

The in-memory rate limiter is suitable as a first layer. For high-volume or multi-region deployment, replace it with a shared rate-limit store such as Vercel KV or Upstash and add Turnstile after a privacy review.

### Lead tracker and WhatsApp

The operating tracker is [AutoRev Lead Tracker](https://docs.google.com/spreadsheets/d/1mr1Ens0FquUOsJcLEG0w8Ekmzp7nlfMElwfE-6deD8I/edit). New submissions enter `Semua Leads`; the other tabs are filtered operational views for Founding Driver, Rental Customer, AutoRev Business, RevAuto, and partnerships.

The deployable bridge lives in [`integrations/google-apps-script`](./integrations/google-apps-script). Configure its Script Properties and deploy it as a Web App before setting `LEAD_WEBHOOK_URL` in Vercel. WhatsApp automation requires a registered Meta WhatsApp Business Platform number, a permanent/system-user access token, Phone Number ID, and approved ID/EN utility templates. Secrets are never committed to Git.

## Project structure

```text
src/
  app/
    [locale]/             # ID/EN pages and locale root layout
      drivers/            # driver interest and app direction
    api/leads/            # validated lead endpoint
    robots.ts             # robots.txt
    sitemap.ts            # bilingual sitemap
  components/             # shared sections, product previews, motion, forms
  lib/                    # copy, locale utilities, metadata, schemas, site config
  proxy.ts                # root -> /id redirect
public/images/            # official and original project assets
integrations/              # Google Sheets and WhatsApp lead-delivery bridge
docs/                     # sitemap, wireframe, design and content guidance
```

## Updating content

- Shared homepage labels: `src/lib/content.ts`
- Navigation, public email, canonical fallback: `src/lib/site.ts`
- Page-specific long-form copy: each route under `src/app/[locale]/.../page.tsx`
- Form options and labels: `src/components/lead-form.tsx`
- Lead fields and validation: `src/lib/lead-schema.ts`
- Legal text: `src/app/[locale]/privacy/page.tsx` and `terms/page.tsx`

Whenever ID copy changes, update the matching English copy in the same file and run `npm run typecheck` plus `npm run build`.

## Assets

| File | Use |
| --- | --- |
| `public/images/autorev-icon.png` | Founder-supplied master square logo |
| `public/images/autorev-icon-300.png` | Required 300 × 300 app icon |
| `public/images/autorev-icon-512.png` | Metadata/favicons and large mark |
| `public/images/autorev-logo-horizontal.png` | Founder-supplied horizontal company logo |
| `public/images/autorev-hero.png` | Original AI-generated cinematic hero |

Keep founder assets unchanged. Add future vehicle, app, or partner photography under `public/images/` and render it through `next/image`. Confirm commercial usage rights before publishing third-party media.

## Vercel deployment

1. Push the repository to a Git provider.
2. Import it into Vercel as a Next.js project.
3. Keep the build command as `npm run build` and output detection as Next.js default.
4. Add production environment variables, especially `NEXT_PUBLIC_SITE_URL` and `LEAD_WEBHOOK_URL`.
5. Deploy a preview and test all five lead types against a non-production destination.
6. Add the final domain and update `NEXT_PUBLIC_SITE_URL`.
7. Redeploy, then verify canonical URLs, `/sitemap.xml`, `/robots.txt`, Open Graph image, and webhook delivery.
8. Only add LinkedIn, Instagram, an address, legal-entity details, or LocalBusiness schema after they are officially confirmed.

## Performance and launch checklist

- [x] Static generation for all content pages
- [x] Dynamic rendering only for Contact and lead API
- [x] `next/image` with AVIF/WebP output support
- [x] Hero image priority loading; product visuals are code-native
- [x] Locally hosted cinematic video with muted autoplay, responsive cropping, and image fallbacks
- [x] Transform/opacity motion with `prefers-reduced-motion`
- [x] No external font request at runtime
- [x] No fabricated metrics, customer logos, reviews, prices, or partner counts
- [x] Production build, lint, and strict TypeScript pass
- [x] Create the persistent multi-tab AutoRev Lead Tracker
- [x] Deploy the Apps Script webhook, add Vercel secrets, and perform a live form delivery test
- [ ] Connect the approved WhatsApp Business templates and perform a live message test
- [ ] Add consent-aware analytics only after choosing a provider
- [ ] Run Lighthouse against the deployed production URL (target: Performance 90+, Accessibility/Best Practices/SEO 95+)
- [ ] Replace social placeholders after official profiles are live
- [ ] Legal review before commercial launch

See [Website blueprint](./docs/website-blueprint.md) for the sitemap, design system, wireframe, content rules, and component map. The image-generation mode, output, and complete prompt are recorded in [Generated hero asset](./docs/generated-asset.md).
