"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  initializeAmplitude,
  trackAmplitudeEvent,
} from "@/lib/analytics/amplitude";

const pageViewEvents: Readonly<Record<string, string>> = {
  "/": "quiz_screen1_view",
  "/quiz/browsing-habits": "quiz_screen2_view",
  "/quiz/network-privacy": "quiz_screen3_view",
  "/quiz/shared-website-data": "quiz_screen3_view",
  "/quiz/private-mode-sign-in": "quiz_screen3_view",
  "/quiz/account-security": "quiz_screen4_view",
  "/quiz/two-factor-auth": "quiz_screen5_view",
  "/quiz/app-permissions": "quiz_screen6_view",
  "/quiz/device-security": "quiz_screen7_view",
  "/quiz/progress": "quiz_screen8_view",
  "/results": "quiz_screen9_view",
  "/results/lite": "quiz_screen9_view",
  "/results/medium": "quiz_screen9_view",
  "/results/red": "quiz_screen9_view",
  "/results/snapshot": "quiz_screen10_view",
  "/results/snapshot/lite": "quiz_screen10_view",
  "/results/snapshot/medium": "quiz_screen10_view",
  "/results/snapshot/red": "quiz_screen10_view",
};

let lastPageView: { pathname: string; trackedAt: number } | null = null;

function readEventName(target: EventTarget | null, attribute: string) {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest<HTMLElement>(`[${attribute}]`)?.getAttribute(attribute) ?? null;
}

export function AmplitudeProvider() {
  const pathname = usePathname();

  useEffect(() => {
    void initializeAmplitude();
  }, []);

  useEffect(() => {
    const eventName = pageViewEvents[pathname];
    const now = Date.now();

    if (
      eventName &&
      (!lastPageView ||
        lastPageView.pathname !== pathname ||
        now - lastPageView.trackedAt > 1000)
    ) {
      lastPageView = { pathname, trackedAt: now };
      trackAmplitudeEvent(eventName);
    }
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const eventName = readEventName(event.target, "data-amplitude-event");

      if (eventName) {
        trackAmplitudeEvent(eventName);
      }
    }

    function handleChange(event: Event) {
      const eventName = readEventName(
        event.target,
        "data-amplitude-change-event",
      );

      if (eventName) {
        trackAmplitudeEvent(eventName);
      }
    }

    function handleSubmit(event: SubmitEvent) {
      const eventName = readEventName(
        event.target,
        "data-amplitude-submit-event",
      );

      if (eventName) {
        trackAmplitudeEvent(eventName);
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("change", handleChange);
    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("change", handleChange);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}
