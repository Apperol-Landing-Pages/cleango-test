"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";

// Amplitude project API keys are public browser identifiers. An explicit empty
// environment value still disables analytics for local development.
const apiKey =
  process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY === undefined
    ? "4d1c0bed1941a640c62db40d583fee6c"
    : process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
const serverZone = process.env.NEXT_PUBLIC_AMPLITUDE_SERVER_ZONE === "EU" ? "EU" : "US";
const replayRateValue = Number(
  process.env.NEXT_PUBLIC_AMPLITUDE_SESSION_REPLAY_RATE ?? "1",
);
const replayRate = Number.isFinite(replayRateValue)
  ? Math.min(1, Math.max(0, replayRateValue))
  : 1;

let initialization: Promise<void> | null = null;

export function initializeAmplitude() {
  if (initialization) {
    return initialization;
  }

  if (!apiKey || typeof window === "undefined") {
    initialization = Promise.resolve();
    return initialization;
  }

  initialization = (async () => {
    const replay = sessionReplayPlugin({
      sampleRate: replayRate,
      forceSessionTracking: true,
      privacyConfig: {
        defaultMaskLevel: "medium",
        maskSelector: [".amp-mask", "[data-amp-mask]"],
        blockSelector: [".amp-block", "[data-amp-block]"],
      },
    });

    await amplitude.add(replay).promise;
    await amplitude.init(apiKey, undefined, {
      serverZone,
      autocapture: {
        attribution: true,
        sessions: true,
        pageViews: false,
        fileDownloads: false,
        formInteractions: false,
        elementInteractions: false,
        frustrationInteractions: false,
        networkTracking: false,
        webVitals: false,
        performanceTracking: false,
      },
    }).promise;
  })().catch((error: unknown) => {
    initialization = null;

    if (process.env.NODE_ENV !== "production") {
      console.error("Amplitude initialization failed", error);
    }
  });

  return initialization;
}

export function trackAmplitudeEvent(
  eventName: string,
  properties: Record<string, string | number | boolean> = {},
) {
  if (!apiKey || typeof window === "undefined") {
    return;
  }

  void initializeAmplitude().then(() => {
    amplitude.track(eventName, {
      funnel_id: "security_white",
      funnel_version: 1,
      route: window.location.pathname,
      ...properties,
    });
  });
}
