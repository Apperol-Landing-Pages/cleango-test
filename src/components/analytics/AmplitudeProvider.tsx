"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  initializeAmplitude,
  trackAmplitudeEvent,
} from "@/lib/analytics/amplitude";

const pageViewEvents: Readonly<Record<string, string>> = {
  "/": "quiz_landing_viewed",
  "/quiz/browsing-habits": "quiz_browsing_habits_viewed",
  "/quiz/network-privacy": "quiz_network_privacy_viewed",
  "/quiz/shared-website-data": "quiz_shared_website_data_viewed",
  "/quiz/private-mode-sign-in": "quiz_private_mode_sign_in_viewed",
  "/quiz/account-security": "quiz_account_security_viewed",
  "/quiz/two-factor-auth": "quiz_two_factor_auth_viewed",
  "/quiz/app-permissions": "quiz_app_permissions_viewed",
  "/quiz/device-security": "quiz_device_security_viewed",
  "/quiz/progress": "quiz_progress_viewed",
  "/results": "quiz_results_green_viewed",
  "/results/lite": "quiz_results_lite_viewed",
  "/results/medium": "quiz_results_medium_viewed",
  "/results/red": "quiz_results_red_viewed",
  "/results/snapshot": "quiz_snapshot_green_viewed",
  "/results/snapshot/lite": "quiz_snapshot_lite_viewed",
  "/results/snapshot/medium": "quiz_snapshot_medium_viewed",
  "/results/snapshot/red": "quiz_snapshot_red_viewed",
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
