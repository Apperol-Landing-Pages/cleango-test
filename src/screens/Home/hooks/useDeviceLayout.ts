"use client";

import { useLayoutEffect } from "react";

const DEVICE_LAYOUTS = [
  "device-desktop",
  "device-iphone-se",
  "device-iphone-12-pro",
  "device-iphone-17",
  "device-iphone-17-pro-max",
] as const;

type DeviceLayout = (typeof DEVICE_LAYOUTS)[number];
type MobileDeviceLayout = Exclude<DeviceLayout, "device-desktop">;

const LEGACY_DEVICE_LAYOUTS = ["device-iphone-16"] as const;

type ViewportSnapshot = {
  width: number;
  height: number;
  key: string;
};

const DEVICE_QUERY_MAP: Record<string, DeviceLayout> = {
  desktop: "device-desktop",
  "iphone-12-pro": "device-iphone-12-pro",
  iphone12pro: "device-iphone-12-pro",
  "iphone-16": "device-iphone-12-pro",
  iphone16: "device-iphone-12-pro",
  "iphone-17": "device-iphone-17",
  iphone17: "device-iphone-17",
  "iphone-17-pro-max": "device-iphone-17-pro-max",
  iphone17promax: "device-iphone-17-pro-max",
  "iphone-se": "device-iphone-se",
  iphonese: "device-iphone-se",
  se: "device-iphone-se",
};

const MOBILE_LAYOUT_REFERENCES: ReadonlyArray<{
  layout: MobileDeviceLayout;
  width: number;
  height: number;
}> = [
  { layout: "device-iphone-se", width: 375, height: 667 },
  { layout: "device-iphone-12-pro", width: 390, height: 844 },
  { layout: "device-iphone-17", width: 402, height: 874 },
  { layout: "device-iphone-17-pro-max", width: 440, height: 956 },
];

const INITIAL_SETTLE_MIN_MS = 400;
const INITIAL_SETTLE_MAX_MS = 1200;
const POST_READY_MONITOR_MS = 1600;
const REQUIRED_STABLE_SAMPLES = 6;
const RESIZE_SETTLE_DELAY_MS = 180;

function normalizeDevice(value: string): string {
  return value.toLowerCase().replace(/[_\s]+/g, "-");
}

function getRequestedLayoutClass(): DeviceLayout | null {
  const params = new URLSearchParams(window.location.search);
  const explicitDevice = params.get("device") || params.get("layout");

  if (explicitDevice) {
    const explicitLayout = DEVICE_QUERY_MAP[normalizeDevice(explicitDevice)];

    if (explicitLayout) return explicitLayout;
  }

  return null;
}

function getViewportSnapshot(): ViewportSnapshot {
  const viewport = window.visualViewport;
  const width = Math.round(
    viewport?.width || document.documentElement.clientWidth || window.innerWidth,
  );
  const height = Math.round(
    viewport?.height || document.documentElement.clientHeight || window.innerHeight,
  );

  return { width, height, key: `${width}x${height}` };
}

function detectDeviceLayoutClass(
  snapshot: ViewportSnapshot,
  requestedLayout = getRequestedLayoutClass(),
): DeviceLayout {
  if (requestedLayout) return requestedLayout;

  const shortSide = Math.min(snapshot.width, snapshot.height);
  const longSide = Math.max(snapshot.width, snapshot.height);
  const isTouchScreen =
    window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
  const hasPhoneSizedViewport = shortSide <= 500 && longSide <= 1100;

  if (!isTouchScreen && !hasPhoneSizedViewport) return "device-desktop";

  let closestReference = MOBILE_LAYOUT_REFERENCES[0]!;
  let closestDistance = Number.POSITIVE_INFINITY;

  for (const reference of MOBILE_LAYOUT_REFERENCES) {
    const relativeWidthDifference =
      (shortSide - reference.width) / reference.width;
    const relativeHeightDifference =
      (longSide - reference.height) / reference.height;
    const distance =
      relativeWidthDifference ** 2 + relativeHeightDifference ** 2;

    if (distance < closestDistance) {
      closestReference = reference;
      closestDistance = distance;
    }
  }

  return closestReference.layout;
}

function applyLayout(
  layoutClass: DeviceLayout,
  snapshot: ViewportSnapshot,
): void {
  const currentLayout = DEVICE_LAYOUTS.find((className) =>
    document.body.classList.contains(className),
  );

  if (currentLayout !== layoutClass) {
    document.body.classList.remove(...DEVICE_LAYOUTS, ...LEGACY_DEVICE_LAYOUTS);
    document.body.classList.add(layoutClass);
  }

  document.body.dataset.layoutDevice = layoutClass.replace("device-", "");
  const viewportHeight = `${snapshot.height}px`;
  if (
    document.documentElement.style.getPropertyValue("--home-viewport-height") !==
    viewportHeight
  ) {
    document.documentElement.style.setProperty(
      "--home-viewport-height",
      viewportHeight,
    );
  }
}

function markLayoutReady(): void {
  document.body.dataset.homeLayoutReady = "true";
}

declare global {
  interface Window {
    setLayoutDevice?: (device: string) => boolean;
  }
}

export function useDeviceLayout(): void {
  useLayoutEffect(() => {
    let resizeTimer: number | undefined;
    let settleFrame: number | undefined;
    let monitorTimer: number | undefined;
    let lastViewportKey = "";
    let lastAppliedViewportKey = "";
    let lastAppliedLayout: DeviceLayout | null = null;
    let stableSamples = 0;
    let isLayoutReady = false;
    const requestedLayout = getRequestedLayoutClass();
    const initialSettleStartedAt = window.performance.now();

    const updateLayout = () => {
      const snapshot = getViewportSnapshot();
      const layout = detectDeviceLayoutClass(snapshot, requestedLayout);

      if (
        snapshot.key !== lastAppliedViewportKey ||
        layout !== lastAppliedLayout ||
        !document.body.classList.contains(layout)
      ) {
        applyLayout(layout, snapshot);
        lastAppliedViewportKey = snapshot.key;
        lastAppliedLayout = layout;
      }

      return snapshot;
    };

    const finishInitialLayout = () => {
      if (isLayoutReady) return;

      isLayoutReady = true;
      markLayoutReady();
    };

    const monitorSettledViewport = (monitorUntil: number) => {
      updateLayout();

      if (window.performance.now() < monitorUntil) {
        monitorTimer = window.setTimeout(
          () => monitorSettledViewport(monitorUntil),
          100,
        );
      }
    };

    const settleInitialViewport = (timestamp: number) => {
      const snapshot = updateLayout();

      if (snapshot.key === lastViewportKey) {
        stableSamples += 1;
      } else {
        lastViewportKey = snapshot.key;
        stableSamples = 1;
      }

      const elapsed = timestamp - initialSettleStartedAt;
      const isStableLongEnough =
        elapsed >= INITIAL_SETTLE_MIN_MS &&
        stableSamples >= REQUIRED_STABLE_SAMPLES;
      const reachedSettleDeadline = elapsed >= INITIAL_SETTLE_MAX_MS;

      if (isStableLongEnough || reachedSettleDeadline) {
        finishInitialLayout();
        monitorSettledViewport(
          window.performance.now() + POST_READY_MONITOR_MS,
        );
        return;
      }

      settleFrame = window.requestAnimationFrame(settleInitialViewport);
    };

    const scheduleUpdate = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        window.requestAnimationFrame(updateLayout);
      }, RESIZE_SETTLE_DELAY_MS);
    };

    window.setLayoutDevice = (device: string) => {
      const normalizedDevice = String(device || "");
      const layoutClass = DEVICE_QUERY_MAP[normalizeDevice(normalizedDevice)];

      if (!layoutClass) return false;

      const snapshot = getViewportSnapshot();
      applyLayout(layoutClass, snapshot);
      lastAppliedViewportKey = snapshot.key;
      lastAppliedLayout = layoutClass;
      return true;
    };

    settleFrame = window.requestAnimationFrame(settleInitialViewport);
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("orientationchange", scheduleUpdate);
    window.visualViewport?.addEventListener("resize", scheduleUpdate);

    return () => {
      window.clearTimeout(resizeTimer);
      window.clearTimeout(monitorTimer);
      if (settleFrame !== undefined) window.cancelAnimationFrame(settleFrame);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
      window.visualViewport?.removeEventListener("resize", scheduleUpdate);
      delete window.setLayoutDevice;
      document.body.classList.remove(...DEVICE_LAYOUTS, ...LEGACY_DEVICE_LAYOUTS);
      delete document.body.dataset.layoutDevice;
      delete document.body.dataset.homeLayoutReady;
      document.documentElement.style.removeProperty("--home-viewport-height");
    };
  }, []);
}
