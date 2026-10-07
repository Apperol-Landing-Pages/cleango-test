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
```

Backend secrets:

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ESSENTIAL=price_...
STRIPE_PRICE_PLUS=price_...
STRIPE_PRICE_COMPLETE=price_...
AMPLITUDE_API_KEY=...
```

Secret and webhook keys must never use the `NEXT_PUBLIC_` prefix.

## 1. Create lead

`POST /leads`

Request:

```json
{
  "email": "person@example.com",
  "source": "security-white"
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
