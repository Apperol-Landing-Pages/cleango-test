"use client";

export const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

type MetaPixelArguments = [
  command: "init" | "track" | "trackCustom",
  eventOrPixelId: string,
  parameters?: Record<string, unknown>,
  options?: { eventID?: string },
];

type MetaPixelFunction = {
  (...args: MetaPixelArguments): void;
  callMethod?: (...args: MetaPixelArguments) => void;
  loaded?: boolean;
  push?: (...args: MetaPixelArguments) => void;
  queue?: MetaPixelArguments[];
  version?: string;
};

declare global {
  interface Window {
    _fbq?: MetaPixelFunction;
    fbq?: MetaPixelFunction;
  }
}

type PendingMetaEvent = {
  eventId?: string;
  eventName: "Lead" | "Purchase";
  parameters: Record<string, unknown>;
};

const pendingEvents: PendingMetaEvent[] = [];
let initialized = false;

export function initializeMetaPixel() {
  if (!metaPixelId || typeof window === "undefined" || !window.fbq) {
    return false;
  }

  if (!initialized) {
    window.fbq("init", metaPixelId);
    initialized = true;
  }

  while (pendingEvents.length > 0) {
    const event = pendingEvents.shift();

    if (event) {
      sendMetaEvent(event);
    }
  }

  return true;
}

function sendMetaEvent({ eventId, eventName, parameters }: PendingMetaEvent) {
  if (!window.fbq) {
    return;
  }

  window.fbq(
    "track",
    eventName,
    parameters,
    eventId ? { eventID: eventId } : undefined,
  );
}

function trackMetaEvent(event: PendingMetaEvent) {
  if (!metaPixelId || typeof window === "undefined") {
    return;
  }

  if (!initializeMetaPixel()) {
    pendingEvents.push(event);
    return;
  }

  sendMetaEvent(event);
}

export function trackMetaPageView() {
  if (!initializeMetaPixel() || !window.fbq) {
    return;
  }

  window.fbq("track", "PageView");
}

export function trackMetaLead(eventId: string) {
  trackMetaEvent({
    eventId,
    eventName: "Lead",
    parameters: {
      content_name: "security_white",
    },
  });
}

export function trackMetaPurchase({
  currency,
  eventId,
  planId,
  value,
}: {
  currency: string;
  eventId: string;
  planId: string;
  value: number;
}) {
  trackMetaEvent({
    eventId,
    eventName: "Purchase",
    parameters: {
      content_ids: [planId],
      content_name: planId,
      content_type: "product",
      currency: currency.toUpperCase(),
      value,
    },
  });
}
