declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        appBridge?: {
          postMessage: (message: unknown) => void;
        };
      };
    };
    receiveFromIOS?: (json: string) => void;
  }
}

type IOSMessage = {
  event: string;
  [key: string]: unknown;
};

export function sendToIOS(trigger: string, payload: unknown): void {
  if (typeof window === "undefined") return;
  window.webkit?.messageHandlers?.appBridge?.postMessage({ trigger, payload });
}

export function initIOSMessageReceiver(): void {
  if (typeof window === "undefined") return;
  window.receiveFromIOS = (json: string) => {
    try {
      const data = JSON.parse(json) as IOSMessage;
      window.dispatchEvent(new CustomEvent("ios_message", { detail: data }));
    } catch {
      // malformed message from iOS
    }
  };
}

export function subscribeToIOSMessage(
  event: string,
  callback: (data: IOSMessage) => void,
): () => void {
  const handler = (e: Event) => {
    const { detail } = e as CustomEvent<IOSMessage>;
    if (detail?.event === event) callback(detail);
  };
  window.addEventListener("ios_message", handler);
  return () => window.removeEventListener("ios_message", handler);
}

export function sendHaptic(action: "start" | "stop"): void {
  sendToIOS("haptic", { action });
}
