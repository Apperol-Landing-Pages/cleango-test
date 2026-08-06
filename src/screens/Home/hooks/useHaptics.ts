"use client";

import { useCallback, useEffect, useRef } from "react";
import { sendToIOS } from "@/utils/webkitBridge";

type NativeMessage = {
  trigger: string;
  payload?: unknown;
};

type HapticStyle = "light" | "medium";

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

function postHapticAction(
  action: "start" | "stop",
  style?: HapticStyle,
  isSingular?: boolean,
): boolean {
  return postNativeMessage({
    trigger: "haptic",
    payload:
      action === "start" ? { action, style, isSingular } : { action },
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

  const triggerHaptic = useCallback(
    (style: HapticStyle = "light", isSingular = true) => {
      postHapticAction("start", style, isSingular);
    },
    [],
  );

  const clearPeriodicVibration = useCallback(() => {
    if (vibrationIntervalRef.current !== null) {
      window.clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }
  }, []);

  const startPeriodicVibration = useCallback(() => {
    clearPeriodicVibration();
    triggerHaptic("medium");

    vibrationIntervalRef.current = window.setInterval(
      () => triggerHaptic("medium", false),
      1000,
    );
  }, [clearPeriodicVibration, triggerHaptic]);

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
