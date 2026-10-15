# Security White Funnel

Mobile-first funnel based on the supplied Figma design. The implementation is
structured as a sequence of focused screens, following the routing and shared
screen-shell approach used by the provided HelloVocal reference.

## Stack

- Next.js App Router
- React + TypeScript in strict mode
- CSS Modules and global design tokens
- ESLint with the Next.js Core Web Vitals rules

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
src/app/                    routes, metadata and global styles
src/components/funnel/      reusable funnel layout primitives
src/features/funnel/        quiz, result, and checkout experiences
public/images/              illustration and payment SVG assets
public/icons/               SVG icon assets
```

## Implementation notes

- The layout is mobile-first and capped at `430px` on larger viewports.
- Shared colors, spacing, radii and typography live in `src/app/globals.css`.
- Every funnel page should render inside `FunnelScreen` and provide a stable
  `screenId` for styling, analytics and end-to-end tests.
- Add a route only when its screen is implemented; the first screen currently
  lives at `/`.

## Result screens

The result routes are kept stable for existing links and analytics. `/results`
is the green email capture (6 correct answers), `/results/medium` is the amber
email capture (3–5 correct), and `/results/red` is the high-risk email capture
(0–2 correct). Each has a matching detailed page under `/results/snapshot`.
The old `/quiz/shared-website-data` URL redirects to the current second-question
screen for compatibility; it is not an extra quiz step.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Payments

The checkout supports a backend-free `preview` mode and a production `stripe`
mode powered by Stripe Payment Element. Backend implementation details and the
exact endpoint payloads are documented in
[`docs/payments-backend-contract.md`](docs/payments-backend-contract.md).

`preview` only simulates card outcomes; it must not be treated as a real payment.
For live payments, deploy with `NEXT_PUBLIC_PAYMENTS_MODE=stripe`, a live Stripe
publishable key, and the working HTTPS payment API. Stripe Payment Element
collects card details; real card numbers, expiry dates, and CVC values never
belong in frontend source or environment variables. These public variables are
embedded during the Next.js build, so changing them requires a rebuild.

Copy `.env.example` to `.env.local` for local configuration. Never commit Stripe
secret keys or webhook secrets.

The welcome footer accepts separate `NEXT_PUBLIC_PRIVACY_POLICY_URL` and
`NEXT_PUBLIC_TERMS_OF_USE_URL` values. Until real URLs are provided, the labels
remain visible but are not clickable.

## Advertising attribution

The root attribution provider captures `subid`, `fbclid`, legacy `clickid`, and
UTM parameters from the entry URL and keeps them for the current browser tab.
The lead request includes that attribution together with Meta `_fbc` and `_fbp`
cookies when available.

Set `NEXT_PUBLIC_META_PIXEL_ID` to enable browser `PageView`, `Lead`, and verified
`Purchase` events. Keitaro postbacks and Meta Conversions API remain backend-only;
their complete payload and deduplication contract is documented in
[`docs/payments-backend-contract.md`](docs/payments-backend-contract.md).
