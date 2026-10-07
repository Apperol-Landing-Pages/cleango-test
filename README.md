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
src/features/funnel/        step types, configuration and future state logic
public/images/              raster assets exported from Figma
public/icons/               SVG and icon assets exported from Figma
```

## Implementation notes

- The design source uses a 393 px-wide mobile frame, so the base container is
  mobile-first and capped at `393px` on larger viewports.
- Shared colors, spacing, radii and typography live in `src/app/globals.css`.
- Every funnel page should render inside `FunnelScreen` and provide a stable
  `screenId` for styling, analytics and end-to-end tests.
- Add a route only when its screen is implemented; the first screen currently
  lives at `/`.

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

Copy `.env.example` to `.env.local` for local configuration. Never commit Stripe
secret keys or webhook secrets.
