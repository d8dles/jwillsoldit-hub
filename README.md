# JWILLSOLDIT Hub

Root ecosystem hub for **jwillsoldit.com** — the front door to the JWILLSOLDIT Houston real estate ecosystem: moves, furnished stays, rentals, property management, and owner/investor services.

Built with Vite + React + TypeScript. **Static site — no backend, no API routes, no secrets.**

> **This repo is NOT Smart Move.** The Smart Move intake product lives in
> `d8dles/jwillsoldit-smart-move`, deploys separately, and serves
> `move.jwillsoldit.com`. This hub links to it and never posts to its API.

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build check:

```bash
npm run build      # type-checks (tsc) then builds to dist/
npm run preview    # serves the production build locally
```

## Editing content

All page content is data-driven. To change copy, add a stay unit, or add a service, edit the files in `src/data/` — no component changes needed:

| File | Controls |
|---|---|
| `src/data/routes.ts` | Route Board intent cards (01–07) |
| `src/data/properties.ts` | Stay/rental/managed property previews. Add unit #9, #10, #50 here. Only entries with `publicVisible: true` and `featured: true` appear on the homepage. |
| `src/data/services.ts` | Service ledger rows (management, STR ops, moves, etc.) |
| `src/data/proof.ts` | Trust/status tiles |
| `src/data/contact.ts` | Phone, email, Smart Move URL, prefilled email subjects |

**Content rules (do not break):**
- No invented pricing, availability, or booking claims. Allowed statuses: `Available by inquiry`, `Coming soon`, `Managed stay`, `Owner-managed`, `Private inventory`, `Details being finalized`.
- Fair housing: describe **properties**, never people or protected classes (no "great for families", no school-quality claims, no neighborhood "safety" language).
- No "book now" unless a real booking link exists (it does not in Phase 1).

## Deploy to Vercel

1. Push this repo to GitHub (e.g. `d8dles/jwillsoldit-hub`).
2. Vercel → **New Project** → import `jwillsoldit-hub`. Framework preset: **Vite** (auto-detected). No environment variables are needed — this project has none.
3. Deploy.
4. Project → Settings → **Domains**: add `jwillsoldit.com` and `www.jwillsoldit.com`, with `www` redirecting to the apex.

## DNS

**Use the exact DNS records Vercel provides in the project dashboard** when you add the domains — do not assume record values from documentation or old projects; Vercel shows the current required A/ALIAS/CNAME values per domain.

Hard rules:

- **Do NOT touch the existing `move` CNAME record.** `move.jwillsoldit.com` belongs to the Smart Move project and must keep working untouched.
- **Do NOT add `jwillsoldit.com` to the Smart Move Vercel project.** The hub has its own Vercel project.
- **Do NOT change any environment variable on the Smart Move project** (including `ALLOWED_ORIGIN`).

## Relationship to Smart Move

- Consumer intents (rent / buy / sell / relocate / not sure) route to `https://move.jwillsoldit.com`. Links may carry `?intent=` params — these are currently **inert** and safely ignored by Smart Move; they exist for forward compatibility only.
- Guest/owner/investor intents (stays, management, investing) resolve to direct contact (call / text / email with prefilled subjects).
- This hub never calls `/api/smart-move`.

## Phase 2+ (planned, not built)

`/stays` + `/stays/[slug]`, `/rentals`, `/manage`, `/invest`, admin + Supabase-backed operations (properties, owners, leases, turnovers, maintenance, vendors, owner reports), PMS/channel-manager integration for any real booking. `src/data/properties.ts` is intentionally shaped to seed that future schema.
