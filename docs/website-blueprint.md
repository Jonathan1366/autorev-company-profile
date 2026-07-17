# AutoRev Website Blueprint

## 1. Sitemap

```text
/{locale}
├── /rental       Rental & Mobility
├── /business     AutoRev Business
├── /drivers      AutoRev Driver and registration interest
├── /partners     AutoRev Partner
├── /technology   Rev AI & Technology
├── /about        Company story, vision, mission, roadmap
├── /contact      Five lead journeys
├── /privacy      Privacy Policy
└── /terms        Terms of Use
```

Both `id` and `en` are statically generated where possible. `/` redirects to `/id`. Canonical and alternate-language metadata are generated for every content route.

## 2. Design system

### Brand tokens

| Token | Value | Primary role |
| --- | --- | --- |
| Midnight Navy | `#020A18` | Cinematic hero and deep footer surfaces |
| Deep Navy | `#06142E` | Enterprise credibility and major dark sections |
| Dark Surface | `#0B1933` | Dashboard/AI panels |
| Electric Blue | `#0866FF` | Primary actions and active states |
| Bright Blue | `#119BFF` | Supporting motion/data accents |
| Cyan Accent | `#10D9E8` | Sparse status and intelligence highlights |
| Off White | `#F5F8FC` | Section rhythm and product surfaces |
| Neutral Gray | `#9AA8BA` | Secondary copy and metadata |

### Typography

- Family: Manrope, variable weight, loaded through `next/font`
- Display: 54–114 px, tight tracking, 0.91–1.03 line height
- Section heading: 38–68 px
- Body: 15–20 px for primary explanatory copy
- UI labels: 7–13 px with high weight and controlled uppercase spacing

### Layout and motion

- Max content width: 1240 px with fluid viewport gutters
- Core radius: 22 px; CTA radius: pill
- Sections: 90–150 px vertical rhythm
- Motion: opacity/translate/path only; one-time viewport reveals; reduced-motion respected
- Breakpoints: 1100 px, 900 px, 620 px plus fluid wide-desktop scaling

### Accessibility rules

- Persistent focus-visible rings
- Skip link and semantic navigation landmarks
- 44–50 px target heights for key controls
- No motion-dependent information
- Native labels, validation feedback, live status, and error roles in forms
- Dark-surface body copy uses light neutral tones; cyan is never the sole status indicator

## 3. Homepage wireframe

```text
┌──────────────────────────────────────────────────────┐
│ Sticky nav · Animated menus · Call · EN/ID · Rent   │
├──────────────────────────────────────────────────────┤
│ Full-viewport rental-first cinematic hero            │
│ Rent a Car + For Business            Scroll motion  │
├──────────────────────────────────────────────────────┤
│ Animated service marquee                              │
├──────────────────────────────────────────────────────┤
│ Rental | Driver App | Business System gateways       │
├──────────────────────────────────────────────────────┤
│ Five-step rental experience                          │
├──────────────────────────────────────────────────────┤
│ Business control tower · illustrative dashboard      │
├──────────────────────────────────────────────────────┤
│ Sticky Rent → Drive → Care → Grow narrative          │
├──────────────────────────────────────────────────────┤
│ Animated workshop / towing / parts network map       │
├──────────────────────────────────────────────────────┤
│ Rev AI structured workflow demo                      │
├──────────────────────────────────────────────────────┤
│ Onsite operations · not app-only                     │
├──────────────────────────────────────────────────────┤
│ Three-path final CTA                                 │
├──────────────────────────────────────────────────────┤
│ Footer · product/company/contact/legal               │
└──────────────────────────────────────────────────────┘
```

On mobile, all split sections become single-column; the hero image shifts right so copy sits over the dark field; dashboard previews become horizontally contained; network visuals are statically scaled; and CTAs become full-width.

## 4. Final copy strategy

- Default language: Bahasa Indonesia; English is a complete alternative, not an automatic translation layer.
- Headings are outcome-led, concise, and understandable without technology knowledge.
- Primary narrative order: real rental → driver/customer apps → fleet system → service network → Rev AI.
- Operational detail explains credibility without claiming live scale.
- Every early product area uses status language such as *Dalam pengembangan*, *Product preview*, *Illustrative data*, *Founding program*, or *Vision*.
- Rev AI always assists. It never guarantees diagnosis, repair cost, claim result, or return-to-service time.
- No “PT” prefix appears until the founder confirms the legal entity.
- No address, partner logo, vehicle count, customer count, price, saving percentage, or testimonial is invented. Phone and email are founder-confirmed.

## 5. Component map

| Component | Responsibility |
| --- | --- |
| `Navbar` | Sticky state, locale switch, full-screen mobile navigation |
| `Hero` | Generated visual, text reveal, light trails, primary conversions |
| `EcosystemMap` | Eight connected AutoRev modules |
| `ProductModeSwitcher` | Personal and Business product narratives |
| `ServiceGateway` | Three immediate entry points: Rental, Driver, and Business |
| `EcosystemStory` | Scroll-led Rent → Drive → Care → Grow narrative |
| `WorkshopNetwork` | Animated preview of workshop, towing, and parts routing |
| `ContactDock` | Persistent WhatsApp and call access |
| `RentalFlow` | Five-stage customer journey |
| `BusinessDashboardPreview` | Illustrative fleet control tower |
| `RevAIDemo` | Four structured operational scenarios |
| `UptimeTimeline` | Issue-to-return-to-service sequence |
| `PartnerCards` | Five provider categories and registration entry points |
| `Roadmap` | Now/Next/Future vision without delivery promises |
| `ContactHub` / `LeadForm` | Five validated conversion flows |
| `FinalCTA` | Rental, fleet, partner, and strategic conversation handoff |

## 6. SEO content map

- Home: AutoRev Mobilitas Indonesia, mobility ecosystem, vehicle uptime platform
- Rental: rental mobil, rental EV, digital handover, delivery/pickup
- Business: fleet management Indonesia, rental management system, maintenance armada
- Partners: bengkel partner, towing, parts supplier, automotive service network
- Technology: AI fleet management, vehicle uptime, maintenance planning, downtime analytics
- About: brand entity, vision, mission, Jabodetabek development context

LocalBusiness schema is intentionally omitted until a verified address and operating details exist. Product/software schema should be added only when the relevant product is live.
