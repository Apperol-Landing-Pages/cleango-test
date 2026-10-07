# Payments backend contract

The Security White frontend is complete in two modes:

- `preview`: keeps the design walkthrough operational without a backend.
- `stripe`: uses Stripe Payment Element and the API contract below.

Set `NEXT_PUBLIC_PAYMENTS_MODE=stripe` only after every endpoint is available.

## Environment

Frontend build variables:

```env
NEXT_PUBLIC_PAYMENTS_MODE=stripe
NEXT_PUBLIC_PAYMENTS_API_BASE_URL=https://api.example.com/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

Backend secrets:

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ESSENTIAL=price_...
STRIPE_PRICE_PLUS=price_...
STRIPE_PRICE_COMPLETE=price_...
AMPLITUDE_API_KEY=...
META_CONVERSIONS_API_ACCESS_TOKEN=...
KEITARO_POSTBACK_URL=https://tracker.example.com/postback-key/postback
```

Secret and webhook keys must never use the `NEXT_PUBLIC_` prefix.

## 1. Create lead

`POST /leads`

Request:

```json
{
  "email": "person@example.com",
  "source": "security-white",
  "subid": "keitaro-click-id",
  "click_id_source": "subid",
  "fbclid": "optional-meta-click-id",
  "fbc": "optional-_fbc-cookie",
  "fbp": "optional-_fbp-cookie",
  "utm_source": "facebook",
  "utm_medium": "paid_social",
  "utm_campaign": "campaign-name",
  "utm_content": "creative-name",
  "utm_term": "audience-name",
  "landing_page": "/",
  "referrer": "https://example.com",
  "captured_at": "2026-10-07T12:00:00.000Z"
}
```

Response:

```json
{
  "lead_id": "lead_01J..."
}
```

Requirements:

- Normalize and validate the email.
- Create an opaque `lead_id`; never use the email as the public identifier.
- Store the email only in the backend/customer system.
- Store the attribution fields with the lead. Every field after `source` is optional.
- Treat `subid` as the canonical Keitaro click ID. The frontend accepts URL
  parameters in this order: `subid`, `fbclid`, then legacy `clickid`.
- Use the returned `lead_id` as the Meta `Lead` event ID. This lets the browser
  Pixel event and server Conversions API event deduplicate.
- Apply rate limiting and idempotency to duplicate submissions.
- CORS must allow the production landing origin and credentialed requests.

## 2. Create subscription payment

`POST /payments/subscriptions`

Request:

```json
{
  "lead_id": "lead_01J...",
  "plan_id": "plus"
}
```

Response:

```json
{
  "payment_id": "payment_01J...",
  "client_secret": "pi_..._secret_..."
}
```

Requirements:

- Accept only `essential`, `plus`, or `complete`.
- Map `plan_id` to a Stripe Price ID on the server. Never accept amount or currency from the browser.
- Create or reuse the Stripe Customer associated with `lead_id`.
- Create a Stripe subscription with an incomplete first payment and return the first invoice PaymentIntent client secret.
- Put `lead_id`, `plan_id`, and the internal `payment_id` in Stripe metadata.
- Preserve the internal `payment_id` through webhook processing. The frontend
  uses it as the browser Meta `Purchase` event ID, so CAPI must use the same value.
- Use an idempotency key so retries cannot create duplicate subscriptions.
- The frontend calls `elements.submit()` before this endpoint, then confirms the returned client secret directly with Stripe.

## 3. Read subscription status

`GET /payments/subscriptions/:payment_id`

Response while processing:

```json
{
  "status": "pending",
  "plan_id": "plus",
  "amount": 999,
  "currency": "usd"
}
```

Successful response:

```json
{
  "status": "active",
  "plan_id": "plus",
  "amount": 999,
  "currency": "usd"
}
```

Allowed statuses are `pending`, `active`, `failed`, and `canceled`.

The endpoint must verify that the requested payment belongs to the current lead/session. The confirmation screen polls this endpoint and shows success only after `active`.

## 4. Stripe webhook

Recommended endpoint: `POST /payments/stripe/webhook`.

Requirements:

- Verify the raw request with `Stripe-Signature` and `STRIPE_WEBHOOK_SECRET`.
- Store processed Stripe event IDs and make handling idempotent.
- Do not depend on event delivery order.
- On `invoice.paid`, retrieve the subscription and activate access only when its status is `active`.
- Handle `invoice.payment_failed`, `customer.subscription.updated`, and `customer.subscription.deleted`.
- Also account for refunds, disputes, and fraud events before production launch.
- Return `2xx` quickly; enqueue email and analytics work where possible.

## 5. Amplitude payment event

Send this server-side only after the verified successful webhook:

```json
{
  "event_type": "subscription_payment_succeeded",
  "user_id": "lead_01J...",
  "insert_id": "evt_stripe_event_id",
  "event_properties": {
    "plan_id": "plus",
    "amount": 999,
    "currency": "usd",
    "billing_interval": "month"
  }
}
```

Use the US ingestion endpoint:

```text
https://api2.amplitude.com/2/httpapi
```

Never send email, cardholder name, card number, expiry, CVC, or Stripe client secret to Amplitude. Use the Stripe event ID as `insert_id` to prevent duplicate payment events.

## 6. Confirmation email

After activation, send the confirmation email from the backend or enable Stripe receipts. Email delivery must not delay the webhook response.

## 7. Keitaro postbacks

Never call Keitaro directly from the browser because that exposes the postback
key and lets a visitor forge conversions.

After a lead is stored, send a server-to-server postback when `subid` exists:

```text
GET {KEITARO_POSTBACK_URL}?subid={SUBID}&status=lead
```

After the verified `invoice.paid` webhook, send:

```text
GET {KEITARO_POSTBACK_URL}?subid={SUBID}&status=sale&tid={PAYMENT_ID}&payout={AMOUNT}&currency={CURRENCY}
```

Requirements:

- URL-encode every value.
- Use the real Keitaro click `subid`; synthetic test values will not resolve.
- Use `payment_id` as `tid` so webhook retries cannot create repeat conversions.
- Decide with the media buyer whether `payout` is gross revenue or net revenue.
- Retry transient failures asynchronously and store the response for diagnostics.

## 8. Meta Conversions API

The frontend sends browser `Lead` and verified `Purchase` Pixel events when
`NEXT_PUBLIC_META_PIXEL_ID` is configured. The backend should mirror them through
Conversions API:

- `Lead`: `event_id = lead_id`, `event_time`, hashed email, `fbc`, `fbp`, client
  IP and user agent when lawfully available.
- `Purchase`: `event_id = payment_id`, `value`, `currency`, and `plan_id` only
  after the Stripe webhook confirms payment.

Hash normalized email with SHA-256 before sending it to Meta. Never expose the
Conversions API access token to the frontend. Browser and server events must use
the same `event_name` and `event_id` for Meta deduplication.

Send CAPI requests from the backend to:

```text
POST https://graph.facebook.com/{API_VERSION}/{PIXEL_ID}/events
```

Lead event shape:

```json
{
  "data": [
    {
      "event_name": "Lead",
      "event_time": 1791374400,
      "event_id": "lead_01J...",
      "action_source": "website",
      "event_source_url": "https://app-cleango.com/results",
      "user_data": {
        "em": ["sha256-normalized-email"],
        "fbc": "fb.1...",
        "fbp": "fb.1...",
        "client_ip_address": "request-ip",
        "client_user_agent": "request-user-agent"
      }
    }
  ]
}
```

Purchase event shape:

```json
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1791374400,
      "event_id": "payment_01J...",
      "action_source": "website",
      "event_source_url": "https://app-cleango.com/confirmation",
      "user_data": {
        "em": ["sha256-normalized-email"],
        "fbc": "fb.1...",
        "fbp": "fb.1..."
      },
      "custom_data": {
        "content_ids": ["plus"],
        "content_type": "product",
        "currency": "USD",
        "value": 9.99
      }
    }
  ]
}
```

Use the Meta test event code only in staging. Store delivery attempts and Meta
response IDs so failed events can be retried without changing `event_id`.
