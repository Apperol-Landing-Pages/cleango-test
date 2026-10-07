"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  initializeAmplitude,
  trackAmplitudeEvent,
} from "@/lib/analytics/amplitude";

const pageViewEvents: Readonly<Record<string, string>> = {
  "/": "quiz_startscreen_viewed",
  "/quiz/browsing-habits": "quiz_screen1_viewed",
  "/quiz/network-privacy": "quiz_screen21_viewed",
  "/quiz/shared-website-data": "quiz_screen22_viewed",
  "/quiz/private-mode-sign-in": "quiz_screen2_option3_viewed",
  "/quiz/account-security": "quiz_screen3_viewed",
  "/quiz/two-factor-auth": "quiz_screen4_viewed",
  "/quiz/app-permissions": "quiz_screen5_viewed",
  "/quiz/device-security": "quiz_screen6_viewed",
  "/quiz/progress": "quiz_loader_viewed",
  "/results": "quiz_email_6_6_viewed",
  "/results/lite": "quiz_email_45_6_viewed",
  "/results/medium": "quiz_email_23_6_viewed",
  "/results/red": "quiz_email_01_6_viewed",
  "/results/snapshot": "quiz_snapshot_green_viewed",
  "/results/snapshot/lite": "quiz_snapshot_lite_viewed",
  "/results/snapshot/medium": "quiz_snapshot_medium_viewed",
  "/results/snapshot/red": "quiz_snapshot_red_viewed",
  "/plans": "paywall_viewed",
  "/confirmation": "download_app_screen_viewed",
};

let lastPageView: { pathname: string; trackedAt: number } | null = null;

function readEvent(target: EventTarget | null, attribute: string) {
  if (!(target instanceof Element)) {
    return null;
  }

  const element = target.closest<HTMLElement>(`[${attribute}]`);
  const eventName = element?.getAttribute(attribute);

  if (!element || !eventName) {
    return null;
  }

  const properties: Record<string, string> = {};
  const screenName = element.dataset.amplitudeScreenName;
  const planType = element.dataset.amplitudePlanType;

  if (screenName) {
    properties.screen_name = screenName;
  }

  if (planType) {
    properties.plan_type = planType;
  }

  return { eventName, properties };
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
      const trackedEvent = readEvent(event.target, "data-amplitude-event");

      if (trackedEvent) {
        trackAmplitudeEvent(trackedEvent.eventName, trackedEvent.properties);
      }
    }

    function handleChange(event: Event) {
      const trackedEvent = readEvent(
        event.target,
        "data-amplitude-change-event",
      );

      if (trackedEvent) {
        trackAmplitudeEvent(trackedEvent.eventName, trackedEvent.properties);
      }
    }

    function handleSubmit(event: SubmitEvent) {
      const trackedEvent = readEvent(
        event.target,
        "data-amplitude-submit-event",
      );

      if (trackedEvent) {
        trackAmplitudeEvent(trackedEvent.eventName, trackedEvent.properties);
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
