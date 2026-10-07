"use client";

const attributionStorageKey = "security-white.marketing-attribution";
const maximumValueLength = 300;

const trackedQueryParameters = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

type TrackedQueryParameter = (typeof trackedQueryParameters)[number];

export type ClickIdSource = "clickid" | "fbclid" | "subid";

export type MarketingAttribution = Partial<
  Record<TrackedQueryParameter, string>
> & {
  captured_at: string;
  click_id_source?: ClickIdSource;
  fbclid?: string;
  landing_page: string;
  referrer?: string;
  subid?: string;
};

export type LeadAttributionPayload = MarketingAttribution & {
  fbc?: string;
  fbp?: string;
};

function sanitizeValue(value: string | null) {
  const sanitizedValue = value?.trim().slice(0, maximumValueLength) ?? "";

  if (
    !sanitizedValue ||
    sanitizedValue.includes("{") ||
    sanitizedValue.includes("}") ||
    /%7b|%7d/i.test(sanitizedValue)
  ) {
    return undefined;
  }

  return sanitizedValue;
}

function readStoredAttribution(): MarketingAttribution | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.sessionStorage.getItem(attributionStorageKey);

    if (!storedValue) {
      return null;
    }

    const attribution = JSON.parse(storedValue) as MarketingAttribution;

    return attribution && typeof attribution === "object" ? attribution : null;
  } catch {
    return null;
  }
}

function readCookie(name: string) {
  if (typeof document === "undefined") {
    return undefined;
  }

  const prefix = `${name}=`;
  const value = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(prefix))
    ?.slice(prefix.length);

  return sanitizeValue(value ? decodeURIComponent(value) : null);
}

function getReferrerOrigin() {
  if (!document.referrer) {
    return undefined;
  }

  try {
    return new URL(document.referrer).origin.slice(0, maximumValueLength);
  } catch {
    return undefined;
  }
}

export function captureMarketingAttribution() {
  if (typeof window === "undefined") {
    return null;
  }

  const existingAttribution = readStoredAttribution();
  const query = new URLSearchParams(window.location.search);
  const clickIdCandidates: ReadonlyArray<[ClickIdSource, string | null]> = [
    ["subid", query.get("subid")],
    ["fbclid", query.get("fbclid")],
    ["clickid", query.get("clickid")],
  ];
  const clickId = clickIdCandidates
    .map(([source, value]) => [source, sanitizeValue(value)] as const)
    .find(([, value]) => Boolean(value));

  const attribution: MarketingAttribution = {
    ...(existingAttribution ?? {}),
    captured_at:
      clickId || !existingAttribution
        ? new Date().toISOString()
        : existingAttribution.captured_at,
    landing_page:
      clickId || !existingAttribution
        ? window.location.pathname.slice(0, maximumValueLength)
        : existingAttribution.landing_page,
  };

  if (clickId?.[1]) {
    attribution.subid = clickId[1];
    attribution.click_id_source = clickId[0];
  }

  const fbclid = sanitizeValue(query.get("fbclid"));

  if (fbclid) {
    attribution.fbclid = fbclid;
  }

  for (const parameter of trackedQueryParameters) {
    const value = sanitizeValue(query.get(parameter));

    if (value) {
      attribution[parameter] = value;
    }
  }

  const referrer = getReferrerOrigin();

  if (!attribution.referrer && referrer && referrer !== window.location.origin) {
    attribution.referrer = referrer;
  }

  try {
    window.sessionStorage.setItem(
      attributionStorageKey,
      JSON.stringify(attribution),
    );
  } catch {
    // The current visit still works when browser storage is unavailable.
  }

  return attribution;
}

export function getLeadAttribution(): LeadAttributionPayload | null {
  const attribution = readStoredAttribution() ?? captureMarketingAttribution();

  if (!attribution) {
    return null;
  }

  const fbc = readCookie("_fbc");
  const fbp = readCookie("_fbp");

  return {
    ...attribution,
    ...(fbc ? { fbc } : {}),
    ...(fbp ? { fbp } : {}),
  };
}
