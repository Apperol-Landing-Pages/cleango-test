"use client";

import { useEffect } from "react";

const DEVICE_LAYOUTS = [
  "device-desktop",
  "device-iphone-12-pro",
  "device-iphone-16",
  "device-iphone-17",
  "device-iphone-17-pro-max",
  "device-iphone-se",
] as const;

const DEVICE_QUERY_MAP: Record<string, (typeof DEVICE_LAYOUTS)[number]> = {
  desktop: "device-desktop",
  "iphone-12-pro": "device-iphone-12-pro",
  iphone12pro: "device-iphone-12-pro",
  "iphone-16": "device-iphone-16",
  iphone16: "device-iphone-16",
  "iphone-17": "device-iphone-17",
  iphone17: "device-iphone-17",
  "iphone-17-pro-max": "device-iphone-17-pro-max",
  iphone17promax: "device-iphone-17-pro-max",
  "iphone-se": "device-iphone-se",
  iphonese: "device-iphone-se",
  se: "device-iphone-se",
};

function normalizeDevice(value: string): string {
  return value.toLowerCase().replace(/[_\s]+/g, "-");
}

function getForcedLayoutClass(): (typeof DEVICE_LAYOUTS)[number] | null {
  const params = new URLSearchParams(window.location.search);
  const device = params.get("device") || params.get("layout");

  return device ? DEVICE_QUERY_MAP[normalizeDevice(device)] ?? null : null;
}

function detectDeviceLayoutClass(): (typeof DEVICE_LAYOUTS)[number] {
  const forcedLayout = getForcedLayoutClass();

  if (forcedLayout) return forcedLayout;

  const width = Math.round(window.innerWidth);
  const height = Math.round(window.innerHeight);
  const shortSide = Math.min(width, height);
  const longSide = Math.max(width, height);
  const isTouchScreen = window.matchMedia("(pointer: coarse)").matches;

  if (!isTouchScreen && shortSide >= 700) return "device-desktop";
  if (shortSide <= 375 && longSide <= 700) return "device-iphone-se";
  if (shortSide >= 428 && longSide >= 900) return "device-iphone-17-pro-max";

  if (
    shortSide >= 390 &&
    shortSide <= 391 &&
    longSide >= 820 &&
    longSide <= 860
  ) {
    return "device-iphone-12-pro";
  }

  if (
    shortSide >= 392 &&
    shortSide <= 414 &&
    longSide >= 830 &&
    longSide <= 900
  ) {
    return "device-iphone-17";
  }

  return isTouchScreen ? "device-iphone-16" : "device-desktop";
}

function applyLayout(layoutClass: (typeof DEVICE_LAYOUTS)[number]): void {
  document.body.classList.remove(...DEVICE_LAYOUTS);
  document.body.classList.add(layoutClass);
  document.body.dataset.layoutDevice = layoutClass.replace("device-", "");
}

declare global {
  interface Window {
    setLayoutDevice?: (device: string) => boolean;
  }
}

export function useDeviceLayout(): void {
  useEffect(() => {
    let resizeTimer: number | undefined;

    const updateLayout = () => {
      applyLayout(detectDeviceLayoutClass());
    };

    const scheduleUpdate = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(updateLayout, 120);
    };

    window.setLayoutDevice = (device: string) => {
      const layoutClass = DEVICE_QUERY_MAP[normalizeDevice(String(device || ""))];

      if (!layoutClass) return false;

      applyLayout(layoutClass);
      return true;
    };

    updateLayout();
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("orientationchange", scheduleUpdate);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
      delete window.setLayoutDevice;
      document.body.classList.remove(...DEVICE_LAYOUTS);
      delete document.body.dataset.layoutDevice;
    };
  }, []);
}
