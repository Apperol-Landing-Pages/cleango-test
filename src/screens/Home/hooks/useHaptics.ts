"use client";

import { useCallback, useEffect, useRef } from "react";
import { sendToIOS } from "@/utils/webkitBridge";

const BRIDGE_HANDLER_NAME = "appBridge";
const HAPTIC_PULSE_DURATION = 45;

type NativePayload = Record<string, unknown>;

declare global {
  interface Window {
    stopPeriodicVibration?: () => void;
  }
}

export function postNativeMessage(payload: NativePayload): boolean {
  try {
    const { trigger, payload: messagePayload } = payload;
    sendToIOS(String(trigger ?? BRIDGE_HANDLER_NAME), messagePayload);
    return true;
  } catch {
    return false;
  }
}

function postHapticAction(action: "start" | "stop"): boolean {
  return postNativeMessage({
    trigger: "haptic",
    payload: { action },
  });
}

export function useHaptics() {
  const vibrationIntervalRef = useRef<number | null>(null);

  const stopPeriodicVibration = useCallback(() => {
    if (vibrationIntervalRef.current !== null) {
      window.clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }

    postHapticAction("stop");
  }, []);

  const triggerHaptic = useCallback(() => {
    postHapticAction("stop");
    postHapticAction("start");

    window.setTimeout(() => {
      postHapticAction("stop");
    }, HAPTIC_PULSE_DURATION);
  }, []);

  const startPeriodicVibration = useCallback(() => {
    stopPeriodicVibration();
    triggerHaptic();

    vibrationIntervalRef.current = window.setInterval(triggerHaptic, 1000);
  }, [stopPeriodicVibration, triggerHaptic]);

  useEffect(() => {
    window.stopPeriodicVibration = stopPeriodicVibration;

    return () => {
      stopPeriodicVibration();
      delete window.stopPeriodicVibration;
    };
  }, [stopPeriodicVibration]);

  return {
    triggerHaptic,
    startPeriodicVibration,
    stopPeriodicVibration,
  };
}
