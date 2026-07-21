# CleanGo landing and Home flow

Next.js application with two entry flows:

- `/` and `/scan/*` — landing funnel without an AppsFlyer ID.
- `/home?appsflyer_id=...` — Home flow with Stripe Apple Pay and the iOS WebView bridge.

## Local development

```bash
npm ci
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Cloudflare Workers

The project uses the official OpenNext Cloudflare adapter.

```bash
npm run preview
npm run deploy
```

Cloudflare configuration is stored in `wrangler.json`. Build output is generated
in `.open-next` and is intentionally excluded from Git.

## Public environment variables

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
NEXT_PUBLIC_API_BASE_URL=https://api.example.com/api/v1
NEXT_PUBLIC_HOME_PACKAGE_SLUG=protection-499
```

Stripe secret keys and webhook secrets must only be configured on the backend.
