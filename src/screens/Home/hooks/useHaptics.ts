"use client";

import { useCallback, useEffect, useRef } from "react";
import { sendToIOS } from "@/utils/webkitBridge";

const HAPTIC_PULSE_DURATION = 45;

type NativeMessage = {
  trigger: string;
  payload?: unknown;
};

declare global {
  interface Window {
    stopPeriodicVibration?: () => void;
  }
}

export function postNativeMessage(message: NativeMessage): boolean {
  try {
    sendToIOS(message.trigger, message.payload);
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
